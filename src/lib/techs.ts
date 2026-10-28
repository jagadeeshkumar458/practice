export type TechId = 'python' | 'typescript' | 'javascript' | 'css' | 'react' | 'sql'

export type Tech = {
  id: TechId
  label: string
  color: string
  available: boolean
}

export const TECHS: Tech[] = [
  { id: 'python', label: 'Python', color: '#3776AB', available: true },
  { id: 'typescript', label: 'TypeScript', color: '#3178C6', available: true },
  { id: 'javascript', label: 'JavaScript', color: '#F0DB4F', available: false },
  { id: 'css', label: 'CSS', color: '#264DE4', available: true },
  { id: 'react', label: 'React', color: '#61DAFB', available: false },
  { id: 'sql', label: 'SQL', color: '#00758F', available: false },
]

export function getTech(id: string | undefined): Tech | undefined {
  return TECHS.find((t) => t.id === id)
}
