import React, { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { CHALLENGES_BY_TECH } from '../data/challenges'
import { CodeText } from '../lib/pythonHighlight'
import { validateChallenge, ValidationResult } from '../lib/challengeValidate'
import { useProgressStore, techProgress } from '../lib/progress'

const TAB = '  '

function codeStorageKey(techId: string, challengeId: string) {
  return `examapp:code:${techId}:${challengeId}`
}

export default function ChallengeDetail() {
  const { techId, challengeId } = useParams()
  const tech = getTech(techId)
  const CHALLENGES = tech ? CHALLENGES_BY_TECH[tech.id as TechId] ?? [] : []
  const challenge = CHALLENGES.find((c) => c.id === challengeId)
  const byTech = useProgressStore((s) => s.byTech)
  const markChallengeComplete = useProgressStore((s) => s.markChallengeComplete)

  const [code, setCode] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)

  useEffect(() => {
    if (!challenge || !tech) return
    const saved = window.localStorage.getItem(codeStorageKey(tech.id, challenge.id))
    setCode(saved ?? challenge.starter)
    setResult(null)
  }, [challenge?.id, tech?.id])

  const isCompleted = useMemo(() => {
    if (!tech || !challenge) return false
    return techProgress(byTech, tech.id).challenges.completed.includes(challenge.id)
  }, [byTech, tech, challenge])

  if (!tech || !tech.available) return <Navigate to={`/${techId ?? ''}`} replace />
  if (!challenge) return <Navigate to={`/${tech.id}/code`} replace />

  function updateCode(next: string) {
    setCode(next)
    window.localStorage.setItem(codeStorageKey(tech!.id, challenge!.id), next)
  }

  function handleCheck() {
    const r = validateChallenge(challenge!, code)
    setResult(r)
    if (r.allPassed) {
      markChallengeComplete(tech!.id, challenge!.id, CHALLENGES.length)
    }
  }

  function handleReset() {
    updateCode(challenge!.starter)
    setResult(null)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== 'Tab') return
    e.preventDefault()
    const ta = e.currentTarget
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const next = code.slice(0, start) + TAB + code.slice(end)
    updateCode(next)
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + TAB.length
    })
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Link to={`/${tech.id}/code`} className="text-sm text-indigo-600">
          &larr; All challenges
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-2xl font-bold">{challenge.title}</h1>
          {isCompleted && (
            <span className="text-xs font-semibold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Completed
            </span>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-4">
          <div className="col-span-5 bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-2">Instructions</h2>
            {challenge.lead && (
              <div className="text-sm text-gray-600 mb-2">
                <CodeText text={challenge.lead} />
              </div>
            )}
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {challenge.steps.map((step, i) => (
                <li key={i}>
                  <CodeText text={step} className="inline" />
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-7 bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Your code</h2>
              <div className="flex gap-2">
                <button onClick={handleReset} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
                  Reset to starter
                </button>
                <button
                  onClick={handleCheck}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Check my code
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => updateCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="w-full h-64 rounded-lg p-3 font-mono text-sm resize-y outline-none border"
              style={{ background: '#1e1e1e', color: '#d4d4d4', borderColor: '#3c3c3c' }}
            />

            {result && (
              <div className="mt-4">
                <div
                  className={`text-sm font-semibold mb-2 ${result.allPassed ? 'text-green-600' : 'text-gray-700'}`}
                >
                  {result.allPassed ? 'All requirements passed! 🎉' : 'Requirements'}
                </div>
                <ul className="space-y-1">
                  {result.results.map((r) => (
                    <li key={r.id} className={`text-sm flex gap-2 ${r.passed ? 'text-green-600' : 'text-gray-500'}`}>
                      <span>{r.passed ? '✅' : '⬜'}</span>
                      <CodeText text={r.label} className="inline" />
                    </li>
                  ))}
                </ul>
                {result.hint && (
                  <div className="mt-3 text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded p-2">
                    <CodeText text={result.hint} className="inline" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
