import { Question } from '../data/quizzes/types'

export type McqAnswer = number
export type FillAnswer = string[]
export type DragDropAnswer = (number | null)[]
export type AnswerValue = McqAnswer | FillAnswer | DragDropAnswer

export function emptyAnswer(q: Question): AnswerValue | null {
  if (q.type === 'fill') return q.blanks.map(() => '')
  if (q.type === 'dragdrop') return q.codeParts.slice(1).map(() => null)
  return null
}

export function isAnswered(q: Question, ans: AnswerValue | null | undefined): boolean {
  if (ans === null || ans === undefined) return false
  if (q.type === 'mcq') return typeof ans === 'number'
  if (q.type === 'fill') return Array.isArray(ans) && (ans as FillAnswer).every((v) => typeof v === 'string' && v.trim() !== '')
  if (q.type === 'dragdrop') return Array.isArray(ans) && (ans as DragDropAnswer).every((v) => v !== null && v !== undefined)
  return false
}

function normalizeFillText(s: string): string {
  return s.trim().replace(/"/g, "'").replace(/\s+/g, ' ')
}

export function isCorrect(q: Question, ans: AnswerValue | null | undefined): boolean {
  if (!isAnswered(q, ans)) return false
  if (q.type === 'mcq') return (ans as McqAnswer) === q.answer
  if (q.type === 'fill') {
    const a = ans as FillAnswer
    return q.blanks.every((b, i) => normalizeFillText(a[i] ?? '') === normalizeFillText(b.answer))
  }
  if (q.type === 'dragdrop') {
    const a = ans as DragDropAnswer
    return q.correct.every((accepted, i) => {
      const picked = a[i]
      if (picked === null || picked === undefined) return false
      return Array.isArray(accepted) ? accepted.includes(picked) : accepted === picked
    })
  }
  return false
}
