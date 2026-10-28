import React from 'react'
import { useExamStore } from '../store/useExamStore'

export default function ScorePanel() {
  const { questions, answers, submit, submitted, score, reset } = useExamStore()
  const answeredCount = Object.values(answers).filter((v) => v !== null).length

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Review & Score</h3>
      <div className="mb-4">Answered: {answeredCount} / {questions.length}</div>
      {!submitted ? (
        <button onClick={() => submit()} className="px-4 py-2 bg-indigo-600 text-white rounded">Submit Exam</button>
      ) : (
        <div>
          <div className="text-2xl font-bold mb-2">Score: {score()} / {questions.length}</div>
          <button onClick={() => reset()} className="px-3 py-1 bg-gray-200 rounded">Reset</button>
        </div>
      )}
    </div>
  )
}
