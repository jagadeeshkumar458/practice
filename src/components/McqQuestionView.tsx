import React from 'react'
import { MCQQuestion } from '../data/quizzes/types'
import { CodeText } from '../lib/pythonHighlight'

export default function McqQuestionView({
  q,
  value,
  onChange,
}: {
  q: MCQQuestion
  value: number | null
  onChange: (choice: number) => void
}) {
  return (
    <div>
      <div className="mt-4 text-lg">
        <CodeText text={q.question} />
      </div>

      <div className="mt-4 space-y-3">
        {q.options.map((opt, idx) => {
          const selected = value === idx
          return (
            <button
              key={idx}
              onClick={() => onChange(idx)}
              className={`w-full text-left p-3 rounded border ${selected ? 'bg-indigo-500 text-white' : 'bg-gray-50'}`}
            >
              <div className="font-medium flex gap-2">
                <span>{String.fromCharCode(65 + idx)}.</span>
                <CodeText text={opt} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
