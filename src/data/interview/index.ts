import { TechId } from '../../lib/techs'
import { InterviewQA } from './types'
import { PYTHON_INTERVIEW_QA } from './python'
import { TYPESCRIPT_INTERVIEW_QA } from './typescript'
import { CSS_INTERVIEW_QA } from './css'

export const INTERVIEW_QA_BY_TECH: Partial<Record<TechId, InterviewQA[]>> = {
  python: PYTHON_INTERVIEW_QA,
  typescript: TYPESCRIPT_INTERVIEW_QA,
  css: CSS_INTERVIEW_QA,
}
