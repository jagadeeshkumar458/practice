import React, { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { INTERVIEW_QA_BY_TECH } from '../data/interview'
import { InterviewQA as InterviewQAType } from '../data/interview/types'
import { CodeText } from '../lib/pythonHighlight'
import { useProgressStore, techProgress } from '../lib/progress'

export default function InterviewQA() {
  const { techId } = useParams()
  const tech = getTech(techId)
  const byTech = useProgressStore((s) => s.byTech)
  const markInterviewViewed = useProgressStore((s) => s.markInterviewViewed)
  const [openId, setOpenId] = useState<string | null>(null)

  if (!tech || !tech.available) return <Navigate to={`/${techId ?? ''}`} replace />

  const QA_LIST = INTERVIEW_QA_BY_TECH[tech.id as TechId] ?? []
  const viewed = new Set(techProgress(byTech, tech.id).interview.viewed)

  const byCategory = useMemo(() => {
    const map = new Map<string, InterviewQAType[]>()
    for (const qa of QA_LIST) {
      if (!map.has(qa.category)) map.set(qa.category, [])
      map.get(qa.category)!.push(qa)
    }
    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech.id])

  function toggle(id: string) {
    const next = openId === id ? null : id
    setOpenId(next)
    if (next) markInterviewViewed(tech!.id, id, QA_LIST.length)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Link to={`/${tech.id}`} className="text-sm text-indigo-600">
          &larr; {tech.label} hub
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-3xl font-bold">Interview Q&amp;A</h1>
          <span className="text-sm text-gray-500">
            {viewed.size} / {QA_LIST.length} reviewed
          </span>
        </div>

        <div className="mt-6 space-y-8">
          {[...byCategory.entries()].map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">{category}</h2>
              <div className="space-y-2">
                {items.map((qa) => {
                  const open = openId === qa.id
                  return (
                    <div key={qa.id} className="bg-white rounded-lg shadow">
                      <button
                        onClick={() => toggle(qa.id)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3"
                      >
                        <div className="font-medium">
                          <CodeText text={qa.question} />
                        </div>
                        <span className="flex items-center gap-2 shrink-0">
                          {viewed.has(qa.id) && <span className="text-green-500 text-xs">✓</span>}
                          <span className="text-gray-400">{open ? '−' : '+'}</span>
                        </span>
                      </button>
                      {open && (
                        <div className="px-4 pb-4 text-sm text-gray-600">
                          <CodeText text={qa.answer} />
                        </div>
                      )}
                    </div>
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
