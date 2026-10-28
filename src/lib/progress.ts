import create from 'zustand'
import { persist } from 'zustand/middleware'
import { TechId } from './techs'

export type QuizProgress = {
  answered: number
  correct: number
  total: number
  submitted: boolean
}

export type TechProgress = {
  quiz: QuizProgress
  challenges: { completed: string[]; total: number }
  interview: { viewed: string[]; total: number }
  practice: { completed: string[]; total: number }
}

function emptyTechProgress(): TechProgress {
  return {
    quiz: { answered: 0, correct: 0, total: 0, submitted: false },
    challenges: { completed: [], total: 0 },
    interview: { viewed: [], total: 0 },
    practice: { completed: [], total: 0 },
  }
}

type State = {
  byTech: Partial<Record<TechId, TechProgress>>
  recordQuizResult: (tech: TechId, result: QuizProgress) => void
  markChallengeComplete: (tech: TechId, challengeId: string, total: number) => void
  markInterviewViewed: (tech: TechId, qaId: string, total: number) => void
  markPracticeComplete: (tech: TechId, problemId: string, total: number) => void
  resetTech: (tech: TechId) => void
}

function getOrInit(byTech: Partial<Record<TechId, TechProgress>>, tech: TechId): TechProgress {
  return byTech[tech] ?? emptyTechProgress()
}

export const useProgressStore = create<State>()(
  persist(
    (set) => ({
      byTech: {},
      recordQuizResult(tech, result) {
        set((state) => ({
          byTech: { ...state.byTech, [tech]: { ...getOrInit(state.byTech, tech), quiz: result } },
        }))
      },
      markChallengeComplete(tech, challengeId, total) {
        set((state) => {
          const cur = getOrInit(state.byTech, tech)
          if (cur.challenges.completed.includes(challengeId)) return state
          return {
            byTech: {
              ...state.byTech,
              [tech]: { ...cur, challenges: { completed: [...cur.challenges.completed, challengeId], total } },
            },
          }
        })
      },
      markInterviewViewed(tech, qaId, total) {
        set((state) => {
          const cur = getOrInit(state.byTech, tech)
          if (cur.interview.viewed.includes(qaId)) return state
          return {
            byTech: {
              ...state.byTech,
              [tech]: { ...cur, interview: { viewed: [...cur.interview.viewed, qaId], total } },
            },
          }
        })
      },
      markPracticeComplete(tech, problemId, total) {
        set((state) => {
          const cur = getOrInit(state.byTech, tech)
          if (cur.practice.completed.includes(problemId)) return state
          return {
            byTech: {
              ...state.byTech,
              [tech]: { ...cur, practice: { completed: [...cur.practice.completed, problemId], total } },
            },
          }
        })
      },
      resetTech(tech) {
        set((state) => ({ byTech: { ...state.byTech, [tech]: emptyTechProgress() } }))
      },
    }),
    { name: 'examapp:progress:v1' }
  )
)

export function techProgress(byTech: Partial<Record<TechId, TechProgress>>, tech: TechId): TechProgress {
  return byTech[tech] ?? emptyTechProgress()
}

/** 0..1 completion fraction for a single tech, averaged across quiz/challenges/interview. */
export function completionRatio(p: TechProgress): number {
  const quizRatio = p.quiz.total === 0 ? 0 : p.quiz.submitted ? p.quiz.correct / p.quiz.total : p.quiz.answered / p.quiz.total
  const challengesRatio = p.challenges.total === 0 ? 0 : p.challenges.completed.length / p.challenges.total
  const interviewRatio = p.interview.total === 0 ? 0 : p.interview.viewed.length / p.interview.total
  const practiceRatio = p.practice.total === 0 ? 0 : p.practice.completed.length / p.practice.total
  const parts = [quizRatio, challengesRatio, interviewRatio, practiceRatio]
  return parts.reduce((a, b) => a + b, 0) / parts.length
}
