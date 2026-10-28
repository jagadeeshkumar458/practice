import create from 'zustand'
import { TechId } from '../lib/techs'
import { Question } from '../data/quizzes/types'
import { AnswerValue, isCorrect } from '../lib/answers'
import { useProgressStore } from '../lib/progress'

type State = {
  techId: TechId | null
  questions: Question[]
  currentIndex: number
  answers: Record<number, AnswerValue | null>
  submitted: boolean
  loadQuiz: (techId: TechId, questions: Question[]) => void
  setCurrent: (i: number) => void
  setAnswer: (id: number, value: AnswerValue | null) => void
  submit: () => void
  score: () => number
  reset: () => void
}

function initialAnswers(questions: Question[]): Record<number, AnswerValue | null> {
  return questions.reduce((acc, q) => ({ ...acc, [q.id]: null }), {} as Record<number, AnswerValue | null>)
}

export const useExamStore = create<State>((set, get) => ({
  techId: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  submitted: false,
  loadQuiz(techId, questions) {
    set({ techId, questions, answers: initialAnswers(questions), currentIndex: 0, submitted: false })
  },
  setCurrent(i) {
    const idx = Math.max(0, Math.min(i, get().questions.length - 1))
    set({ currentIndex: idx })
  },
  setAnswer(id, value) {
    set((state) => ({ answers: { ...state.answers, [id]: value } }))
  },
  submit() {
    set({ submitted: true })
    const s = get()
    if (!s.techId) return
    const correct = s.score()
    const answered = Object.values(s.answers).filter((v) => v !== null && v !== undefined).length
    useProgressStore.getState().recordQuizResult(s.techId, {
      answered,
      correct,
      total: s.questions.length,
      submitted: true,
    })
  },
  score() {
    const s = get()
    return s.questions.reduce((acc, q) => acc + (isCorrect(q, s.answers[q.id]) ? 1 : 0), 0)
  },
  reset() {
    const s = get()
    set({
      answers: initialAnswers(s.questions),
      submitted: false,
      currentIndex: 0,
    })
    if (s.techId) {
      useProgressStore.getState().recordQuizResult(s.techId, {
        answered: 0,
        correct: 0,
        total: s.questions.length,
        submitted: false,
      })
    }
  },
}))
