import React from 'react'
import { Link } from 'react-router-dom'
import { TECHS } from '../lib/techs'
import { useProgressStore, techProgress, completionRatio } from '../lib/progress'

export default function LandingPage() {
  const byTech = useProgressStore((s) => s.byTech)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Pick a track</h1>
        <p className="text-gray-500 mb-8">Quiz, code challenges, and interview prep in one place.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {TECHS.map((tech) => {
            const progress = techProgress(byTech, tech.id)
            const pct = Math.round(completionRatio(progress) * 100)
            return (
              <Link
                key={tech.id}
                to={`/${tech.id}`}
                className="relative bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col gap-3 border-t-4"
                style={{ borderTopColor: tech.color }}
              >
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold">{tech.label}</h2>
                  {!tech.available && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      Coming soon
                    </span>
                  )}
                </div>

                {tech.available ? (
                  <div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: tech.color }} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{pct}% complete</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">Content coming in a future update.</div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
