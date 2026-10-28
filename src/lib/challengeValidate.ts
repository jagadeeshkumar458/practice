import { Challenge } from '../data/challenges/types'

export type RequirementResult = {
  id: string
  label: string
  passed: boolean
}

export type ValidationResult = {
  results: RequirementResult[]
  allPassed: boolean
  hint: string | null
}

/** Mirrors the source site's own client-side check: plain regex matching against the submitted code text. */
export function validateChallenge(challenge: Challenge, code: string): ValidationResult {
  const results = challenge.requirements.map((r) => ({
    id: r.id,
    label: r.label,
    passed: new RegExp(r.pattern, r.flags).test(code),
  }))

  let hint: string | null = null
  for (const m of challenge.commonMistakes) {
    if (new RegExp(m.pattern, m.flags).test(code)) {
      hint = m.msg
      break
    }
  }

  return { results, allPassed: results.every((r) => r.passed), hint }
}
