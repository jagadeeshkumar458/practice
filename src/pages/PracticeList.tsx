import React, { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { PRACTICE_BY_TECH } from '../data/practice'
import { PracticeProblem } from '../data/practice/types'
import { useProgressStore, techProgress } from '../lib/progress'

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
}

export default function PracticeList() {
  const { techId } = useParams()
  const tech = getTech(techId)
  const byTech = useProgressStore((s) => s.byTech)
  if (!tech || !tech.available) return <Navigate to={`/${techId ?? ''}`} replace />

  const problems = PRACTICE_BY_TECH[tech.id as TechId] ?? []
  const progress = techProgress(byTech, tech.id)
  const completed = new Set(progress.practice.completed)

  const byCategory = useMemo(() => {
    const map = new Map<string, PracticeProblem[]>()
    for (const p of problems) {
      if (!map.has(p.category)) map.set(p.category, [])
      map.get(p.category)!.push(p)
    }
    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech.id])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Link to={`/${tech.id}`} className="text-sm text-indigo-600">
          &larr; {tech.label} hub
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-3xl font-bold">Practice Problems</h1>
          <span className="text-sm text-gray-500">
            {completed.size} / {problems.length} completed
          </span>
        </div>

        <div className="mt-6 space-y-8">
          {[...byCategory.entries()].map(([category, problems]) => (
            <div key={category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {problems.map((p) => {
                  const done = completed.has(p.id)
                  return (
                    <Link
                      key={p.id}
                      to={`/${tech.id}/practice/${p.id}`}
                      className={`bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow ${
                        done ? 'ring-1 ring-green-400' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm">{p.name}</h3>
                        {done && <span className="text-green-500 text-sm font-bold shrink-0">✓</span>}
                      </div>
                      <span
                        className={`inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[p.difficulty]}`}
                      >
                        {p.difficulty}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
