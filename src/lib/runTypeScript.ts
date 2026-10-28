import * as ts from 'typescript'
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping'
import { RunResult } from './runTypes'

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2017,
  module: ts.ModuleKind.None,
  sourceMap: true,
  inlineSources: false,
}

/** Minimal shim for the process.stdin EventEmitter surface the scraped practice
 * problems use (stdin.resume/setEncoding/on('data'|'end', cb)) - after the script's
 * top-level code finishes registering handlers, we synchronously replay the whole
 * test input through them. No real async I/O needed for these single-shot scripts. */
function makeProcessShim() {
  let dataHandler: ((chunk: string) => void) | null = null
  let endHandler: (() => void) | null = null
  const stdin = {
    resume() {},
    setEncoding() {},
    on(event: string, cb: (chunk?: string) => void) {
      if (event === 'data') dataHandler = cb as (chunk: string) => void
      if (event === 'end') endHandler = cb as () => void
      return stdin
    },
  }
  return {
    process: { stdin },
    trigger(input: string) {
      dataHandler?.(input)
      endHandler?.()
    },
  }
}

// `new Function(params, body)` always prepends "function anonymous(params\n) {\n"
// before the body (per spec, regardless of whether there are any params), so a
// stack line pointing into the body is always 2 higher than the body's own line
// numbering. Verified empirically against V8 (Node and Chromium share the same
// CreateDynamicFunction source assembly).
const FUNCTION_CONSTRUCTOR_LINE_OFFSET = 2

function extractRuntimeErrorLine(err: unknown, traceMap: TraceMap | null): number | null {
  if (!(err instanceof Error) || !err.stack) return null
  const match = err.stack.match(/<user_code>:(\d+):(\d+)/)
  if (!match) return null
  const genLine = parseInt(match[1], 10) - FUNCTION_CONSTRUCTOR_LINE_OFFSET
  const genCol = parseInt(match[2], 10)
  if (genLine < 1) return null
  if (!traceMap) return genLine
  const pos = originalPositionFor(traceMap, { line: genLine, column: genCol - 1 })
  return pos.line ?? genLine
}

/** Transpiles `code` (TypeScript) to JS and runs it, feeding `inputLines.join('\n')`
 * through a process.stdin shim. Mirrors runPython's RunResult shape. */
export async function runTypeScript(code: string, inputLines: string[]): Promise<RunResult> {
  const output = ts.transpileModule(code, {
    compilerOptions: COMPILER_OPTIONS,
    reportDiagnostics: true,
    fileName: '<user_code>.ts',
  })

  const syntaxError = output.diagnostics?.find((d) => d.category === ts.DiagnosticCategory.Error)
  if (syntaxError && syntaxError.file && syntaxError.start !== undefined) {
    const { line } = ts.getLineAndCharacterOfPosition(syntaxError.file, syntaxError.start)
    return {
      stdout: '',
      error: { message: ts.flattenDiagnosticMessageText(syntaxError.messageText, '\n'), line: line + 1 },
    }
  }

  let traceMap: TraceMap | null = null
  if (output.sourceMapText) {
    try {
      traceMap = new TraceMap(output.sourceMapText)
    } catch {
      traceMap = null
    }
  }

  const logs: string[] = []
  const shim = makeProcessShim()
  const sandboxConsole = {
    log: (...args: unknown[]) => logs.push(args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')),
    error: (...args: unknown[]) => logs.push(args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')),
  }

  try {
    // eslint-disable-next-line no-new-func
    const runner = new Function('console', 'process', `${output.outputText}\n//# sourceURL=<user_code>`)
    runner(sandboxConsole, shim.process)
    shim.trigger(inputLines.join('\n'))
    return { stdout: logs.join('\n'), error: null }
  } catch (err) {
    const line = extractRuntimeErrorLine(err, traceMap)
    const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
    return { stdout: logs.join('\n'), error: { message, line } }
  }
}
