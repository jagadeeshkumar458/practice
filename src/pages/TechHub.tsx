import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTech, TechId } from '../lib/techs'
import { QUIZZES } from '../data/quizzes'
import { CHALLENGES_BY_TECH } from '../data/challenges'
import { INTERVIEW_QA_BY_TECH } from '../data/interview'
import { PRACTICE_BY_TECH } from '../data/practice'
import { useProgressStore, techProgress, completionRatio } from '../lib/progress'

export default function TechHub() {
  const { techId } = useParams()
  const tech = getTech(techId)
  const byTech = useProgressStore((s) => s.byTech)

  if (!tech) return <Navigate to="/" replace />

  if (!tech.available) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-sm text-indigo-600">
            &larr; Back
          </Link>
          <h1 className="text-3xl font-bold mt-2">{tech.label}</h1>
          <div className="mt-8 bg-white rounded-xl shadow p-10 text-center text-gray-500">
            {tech.label} content is coming in a future update.
          </div>
        </div>
      </div>
    )
  }

  const id = tech.id as TechId
  const questions = QUIZZES[id] ?? []
  const challenges = CHALLENGES_BY_TECH[id] ?? []
  const interviewQA = INTERVIEW_QA_BY_TECH[id] ?? []
  const practice = PRACTICE_BY_TECH[id] ?? []

  const progress = techProgress(byTech, tech.id)
  const pct = Math.round(completionRatio(progress) * 100)

  const cards = [
    {
      to: `/${tech.id}/quiz`,
      title: 'Quiz',
      desc: `${questions.length} multiple choice, fill-in-the-blank, and drag-and-drop questions.`,
      status: progress.quiz.submitted
        ? `Score: ${progress.quiz.correct} / ${progress.quiz.total}`
        : `${progress.quiz.answered} / ${questions.length} answered`,
    },
    challenges.length > 0 && {
      to: `/${tech.id}/code`,
      title: 'Code Challenges',
      desc: `${challenges.length} hands-on coding tasks with instructions and instant feedback.`,
      status: `${progress.challenges.completed.length} / ${challenges.length} completed`,
    },
    {
      to: `/${tech.id}/interview`,
      title: 'Interview Q&A',
      desc: `${interviewQA.length} common interview questions with clear answers.`,
      status: `${progress.interview.viewed.length} / ${interviewQA.length} reviewed`,
    },
    practice.length > 0 && {
      to: `/${tech.id}/practice`,
      title: 'Practice Problems',
      desc: `${practice.length} real coding problems, graded by actually running your code.`,
      status: `${progress.practice.completed.length} / ${practice.length} completed`,
    },
  ].filter((c): c is Exclude<typeof c, false> => Boolean(c))

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-sm text-indigo-600">
          &larr; Back
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-3xl font-bold">{tech.label}</h1>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color: tech.color }}>
              {pct}%
            </div>
            <div className="text-xs text-gray-500">overall</div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{c.title}</h2>
                <span className="text-sm text-gray-500">{c.status}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
