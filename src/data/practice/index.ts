import { TechId } from '../../lib/techs'
import { PracticeProblem } from './types'
import { PYTHON_PRACTICE } from './python'
import { TYPESCRIPT_PRACTICE } from './typescript'

export const PRACTICE_BY_TECH: Partial<Record<TechId, PracticeProblem[]>> = {
  python: PYTHON_PRACTICE,
  typescript: TYPESCRIPT_PRACTICE,
}
