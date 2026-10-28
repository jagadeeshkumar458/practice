import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { QUIZZES } from '../data/quizzes'
import { useExamStore } from '../store/useExamStore'
import QuestionNavigator from '../components/QuestionNavigator'
import QuestionCard from '../components/QuestionCard'
import ScorePanel from '../components/ScorePanel'

export default function QuizPage() {
  const { techId } = useParams()
  const tech = getTech(techId)
  const loadQuiz = useExamStore((s) => s.loadQuiz)
  const loadedTechId = useExamStore((s) => s.techId)

  useEffect(() => {
    if (!tech) return
    const questions = QUIZZES[tech.id as TechId] ?? []
    if (loadedTechId !== tech.id) {
      loadQuiz(tech.id as TechId, questions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech?.id])

  if (!tech || !tech.available) return <Navigate to={`/${techId ?? ''}`} replace />
  if (loadedTechId !== tech.id) return null

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Link to={`/${tech.id}`} className="text-sm text-indigo-600">
          &larr; {tech.label} hub
        </Link>
        <div className="grid grid-cols-12 gap-6 mt-2">
          <aside className="col-span-3 bg-white rounded shadow">
            <QuestionNavigator />
          </aside>

          <main className="col-span-6">
            <QuestionCard />
          </main>

          <aside className="col-span-3 bg-white rounded shadow">
            <ScorePanel />
          </aside>
        </div>
      </div>
    </div>
  )
}
