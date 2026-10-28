import { getPyodide } from './pyodide'
import { RunResult } from './runTypes'

// Sets up a fresh input()/stdout sandbox, then execs the target code ON ITS OWN so
// any traceback line number is exactly the line number in the user's editor (no
// offset from this harness code).
const HARNESS = `
import sys, io, json, traceback

def _run_one(_code, _input_lines):
    _queue = list(_input_lines)
    def _fake_input(prompt=""):
        if not _queue:
            raise EOFError("no more input")
        return _queue.pop(0)

    _g = {"__name__": "__main__", "input": _fake_input}
    _stdout = io.StringIO()
    _old_stdout = sys.stdout
    sys.stdout = _stdout
    _error = None
    try:
        exec(compile(_code, "<user_code>", "exec"), _g)
    except SyntaxError as e:
        _error = {"message": str(e), "line": e.lineno}
    except Exception as e:
        _tb = traceback.extract_tb(e.__traceback__)
        _line = None
        for _frame in _tb:
            if _frame.filename == "<user_code>":
                _line = _frame.lineno
        _error = {"message": type(e).__name__ + ": " + str(e), "line": _line}
    finally:
        sys.stdout = _old_stdout
    return json.dumps({"stdout": _stdout.getvalue(), "error": _error})
`

let harnessReady: Promise<void> | null = null

async function ensureHarness() {
  if (!harnessReady) {
    harnessReady = getPyodide().then(async (pyodide) => {
      await pyodide.runPythonAsync(HARNESS)
    })
  }
  return harnessReady
}

/** Runs `code` in a fresh Python namespace, feeding `inputLines` to input() calls in order. */
export async function runPython(code: string, inputLines: string[]): Promise<RunResult> {
  await ensureHarness()
  const pyodide = await getPyodide()
  pyodide.globals.set('_target_code', code)
  pyodide.globals.set('_target_input', inputLines)
  const resultJson = (await pyodide.runPythonAsync('_run_one(_target_code, list(_target_input))')) as string
  return JSON.parse(resultJson) as RunResult
}
