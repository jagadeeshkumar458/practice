export type ChallengeRequirement = {
  id: string
  /** May contain `backtick` inline-code spans, rendered via CodeText. */
  label: string
  pattern: string
  flags: string
}

export type ChallengeMistake = {
  pattern: string
  flags: string
  /** May contain `backtick` inline-code spans, rendered via CodeText. */
  msg: string
}

export type Challenge = {
  id: string
  title: string
  lead: string
  /** Numbered instruction steps; may contain `backtick` inline-code spans. */
  steps: string[]
  starter: string
  solution: string
  requirements: ChallengeRequirement[]
  commonMistakes: ChallengeMistake[]
}
