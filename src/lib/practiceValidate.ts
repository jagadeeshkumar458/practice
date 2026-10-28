import { PracticeProblem } from '../data/practice/types'
import { TechId } from './techs'
import { RunError, RunResult } from './runTypes'
import { runPython } from './runPython'
import { runTypeScript } from './runTypeScript'

export type TestResult = { input: string; expected: string; actual: string; passed: boolean }
export type PracticeResult = { tests: TestResult[]; allPassed: boolean; error: RunError | null }

type Runner = (code: string, inputLines: string[]) => Promise<RunResult>

const RUNNERS: Partial<Record<TechId, Runner>> = {
  python: runPython,
  typescript: runTypeScript,
}

function runnerFor(techId: TechId): Runner {
  const runner = RUNNERS[techId]
  if (!runner) throw new Error(`No code runner configured for "${techId}"`)
  return runner
}

const solutionCache = new Map<string, string[]>()

async function solutionOutputs(techId: TechId, problem: PracticeProblem, inputs: string[]): Promise<string[]> {
  const cacheKey = `${techId}:${problem.id}`
  const cached = solutionCache.get(cacheKey)
  if (cached) return cached
  const run = runnerFor(techId)
  const outputs: string[] = []
  for (const input of inputs) {
    const result = await run(problem.solution, input.split('\n'))
    outputs.push(result.stdout.trim())
  }
  solutionCache.set(cacheKey, outputs)
  return outputs
}

export async function validatePractice(techId: TechId, problem: PracticeProblem, code: string): Promise<PracticeResult> {
  const run = runnerFor(techId)
  const inputs = [problem.defaultInput, ...problem.testInputs]
  const expected = await solutionOutputs(techId, problem, inputs)

  const tests: TestResult[] = []
  let error: RunError | null = null

  for (let i = 0; i < inputs.length; i++) {
    const result = await run(code, inputs[i].split('\n'))
    if (result.error) {
      error = result.error
      break
    }
    const actual = result.stdout.trim()
    tests.push({ input: inputs[i], expected: expected[i], actual, passed: actual === expected[i] })
  }

  return { tests, allPassed: !error && tests.length === inputs.length && tests.every((t) => t.passed), error }
}
