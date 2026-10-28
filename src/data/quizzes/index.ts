import { TechId } from '../../lib/techs'
import { Question } from './types'
import { PYTHON_QUESTIONS } from './python'
import { TYPESCRIPT_QUESTIONS } from './typescript'
import { CSS_QUESTIONS } from './css'

export const QUIZZES: Partial<Record<TechId, Question[]>> = {
  python: PYTHON_QUESTIONS,
  typescript: TYPESCRIPT_QUESTIONS,
  css: CSS_QUESTIONS,
}
