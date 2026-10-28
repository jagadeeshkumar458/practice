import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { CHALLENGES_BY_TECH } from '../data/challenges'
import { useProgressStore, techProgress } from '../lib/progress'

export default function ChallengeList() {
  const { techId } = useParams()
  const tech = getTech(techId)
  const byTech = useProgressStore((s) => s.byTech)
  if (!tech || !tech.available) return <Navigate to={`/${techId ?? ''}`} replace />

  const CHALLENGES = CHALLENGES_BY_TECH[tech.id as TechId] ?? []
  const progress = techProgress(byTech, tech.id)
  const completed = new Set(progress.challenges.completed)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link to={`/${tech.id}`} className="text-sm text-indigo-600">
          &larr; {tech.label} hub
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-3xl font-bold">Code Challenges</h1>
          <span className="text-sm text-gray-500">
            {completed.size} / {CHALLENGES.length} completed
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {CHALLENGES.map((c) => {
            const done = completed.has(c.id)
            return (
              <Link
                key={c.id}
                to={`/${tech.id}/code/${c.id}`}
                className={`relative bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow ${
                  done ? 'ring-1 ring-green-400' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{c.title}</h3>
                  {done && <span className="text-green-500 text-sm font-bold">✓</span>}
                </div>
                <p className="text-xs text-gray-500 mt-1">{c.requirements.length} requirements</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
