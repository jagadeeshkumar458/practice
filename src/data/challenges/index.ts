import { TechId } from '../../lib/techs'
import { Challenge } from './types'
import { CHALLENGES as PYTHON_CHALLENGES } from './python'
import { CSS_CHALLENGES } from './css'

// TypeScript has no equivalent "Code Challenges" section on the source site -
// an empty array here means TechHub simply doesn't render that card for it.
export const CHALLENGES_BY_TECH: Partial<Record<TechId, Challenge[]>> = {
  python: PYTHON_CHALLENGES,
  typescript: [],
  css: CSS_CHALLENGES,
}
