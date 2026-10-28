import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { PRACTICE_BY_TECH } from '../data/practice'
import { CodeText } from '../lib/pythonHighlight'
import { validatePractice, PracticeResult } from '../lib/practiceValidate'
import { useProgressStore, techProgress } from '../lib/progress'
import PracticeEditor, { PracticeEditorHandle } from '../components/PracticeEditor'

function codeStorageKey(techId: string, problemId: string) {
  return `examapp:practice-code:${techId}:${problemId}`
}

type RunState = 'idle' | 'loading-runtime' | 'running' | 'done'

export default function PracticeDetail() {
  const { techId, problemId } = useParams()
  const tech = getTech(techId)
  const problems = tech ? PRACTICE_BY_TECH[tech.id as TechId] ?? [] : []
  const problem = problems.find((p) => p.id === problemId)
  const byTech = useProgressStore((s) => s.byTech)
  const markPracticeComplete = useProgressStore((s) => s.markPracticeComplete)
  const editorRef = useRef<PracticeEditorHandle>(null)

  const [code, setCode] = useState('')
  const [runState, setRunState] = useState<RunState>('idle')
  const [result, setResult] = useState<PracticeResult | null>(null)

  useEffect(() => {
    if (!problem || !tech) return
    const saved = window.localStorage.getItem(codeStorageKey(tech.id, problem.id))
    setCode(saved ?? problem.starterCode)
    setResult(null)
    setRunState('idle')
  }, [problem?.id, tech?.id])

  const isCompleted = useMemo(() => {
    if (!tech || !problem) return false
    return techProgress(byTech, tech.id).practice.completed.includes(problem.id)
  }, [byTech, tech, problem])

  if (!tech || !tech.available) return <Navigate to={`/${techId ?? ''}`} replace />
  if (!problem) return <Navigate to={`/${tech.id}/practice`} replace />

  function updateCode(next: string) {
    setCode(next)
    window.localStorage.setItem(codeStorageKey(tech!.id, problem!.id), next)
  }

  async function handleRun() {
    editorRef.current?.highlightErrorLine(null)
    setRunState('loading-runtime')
    setResult(null)
    try {
      const r = await validatePractice(tech!.id as TechId, problem!, code)
      setRunState('done')
      setResult(r)
      if (r.error?.line) {
        editorRef.current?.highlightErrorLine(r.error.line)
      }
      if (r.allPassed) {
        markPracticeComplete(tech!.id, problem!.id, problems.length)
      }
    } catch (e) {
      setRunState('done')
      setResult({ tests: [], allPassed: false, error: { message: String(e), line: null } })
    }
  }

  function handleReset() {
    updateCode(problem!.starterCode)
    setResult(null)
    editorRef.current?.highlightErrorLine(null)
  }

  const runLabel =
    runState === 'loading-runtime'
      ? tech.id === 'python'
        ? 'Loading Python…'
        : 'Compiling…'
      : runState === 'running'
        ? 'Running…'
        : 'Run'

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Link to={`/${tech.id}/practice`} className="text-sm text-indigo-600">
          &larr; All practice problems
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-2xl font-bold">{problem.name}</h1>
          {isCompleted && (
            <span className="text-xs font-semibold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Completed
            </span>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-4">
          <div className="col-span-5 bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-2">Instructions</h2>
            <div className="text-sm text-gray-600 mb-3">
              <CodeText text={problem.intro} />
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {problem.steps.map((step, i) => (
                <li key={i} className={step.startsWith('Hint: ') ? 'text-gray-400 italic' : ''}>
                  <CodeText text={step} className="inline" />
                </li>
              ))}
            </ol>

            <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm">
              <div className="font-semibold mb-1">Example</div>
              <div className="text-gray-600">
                <CodeText text={problem.example.label} />
              </div>
              <pre className="mt-1 text-xs bg-white rounded p-2 border overflow-x-auto">{problem.example.output}</pre>
              {problem.example.explanation && (
                <div className="text-gray-500 text-xs mt-1">
                  <CodeText text={problem.example.explanation} />
                </div>
              )}
            </div>
          </div>

          <div className="col-span-7 bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Your code</h2>
              <div className="flex gap-2">
                <button onClick={handleReset} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
                  Reset to starter
                </button>
                <button
                  onClick={handleRun}
                  disabled={runState === 'loading-runtime' || runState === 'running'}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                  {runLabel}
                </button>
              </div>
            </div>

            <PracticeEditor ref={editorRef} value={code} onChange={updateCode} language={tech.id as 'python' | 'typescript'} />

            {result && (
              <div className="mt-4">
                {result.error ? (
                  <div className="text-sm bg-red-50 border border-red-200 text-red-700 rounded p-3">
                    <div className="font-semibold mb-1">
                      {result.error.line ? `Error on line ${result.error.line}` : 'Error'}
                    </div>
                    <code className="text-xs">{result.error.message}</code>
                  </div>
                ) : (
                  <div>
                    <div className={`text-sm font-semibold mb-2 ${result.allPassed ? 'text-green-600' : 'text-gray-700'}`}>
                      {result.allPassed
                        ? 'All tests passed! 🎉'
                        : `${result.tests.filter((t) => t.passed).length} / ${result.tests.length} tests passed`}
                    </div>
                    <div className="space-y-2">
                      {result.tests.map((t, i) => (
                        <div
                          key={i}
                          className={`text-xs rounded p-2 border ${t.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                        >
                          <div className="font-medium mb-1">
                            {t.passed ? '✅' : '❌'} Test {i + 1}
                          </div>
                          {!t.passed && (
                            <div className="font-mono space-y-1">
                              <div>
                                <span className="text-gray-500">input:</span> {JSON.stringify(t.input)}
                              </div>
                              <div>
                                <span className="text-gray-500">expected:</span> {JSON.stringify(t.expected)}
                              </div>
                              <div>
                                <span className="text-gray-500">yours:</span> {JSON.stringify(t.actual)}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
