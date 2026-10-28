export type PracticeDifficulty = 'Easy' | 'Medium' | 'Hard'

export type PracticeExample = {
  label: string
  output: string
  explanation: string
}

export type PracticeProblem = {
  id: string
  name: string
  category: string
  difficulty: PracticeDifficulty
  /** May contain `backtick` inline-code spans, rendered via CodeText. */
  intro: string
  /** Numbered instruction steps (instructions + hints), may contain `backtick` spans. */
  steps: string[]
  example: PracticeExample
  starterCode: string
  /** Reference solution used only for grading - never shown to the user by default. */
  solution: string
  defaultInput: string
  testInputs: string[]
}
