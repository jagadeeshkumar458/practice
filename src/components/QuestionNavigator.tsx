import React from 'react'
import { useExamStore } from '../store/useExamStore'
import { Question } from '../data/quizzes/types'
import { isAnswered, isCorrect } from '../lib/answers'

function titleFor(q: Question): string {
  if (q.type === 'mcq') return q.question.replace(/`/g, '')
  return q.prompt.replace(/`/g, '')
}

export default function QuestionNavigator() {
  const { questions, answers, submitted, setCurrent, currentIndex } = useExamStore()

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Questions</h3>
      <div className="grid grid-cols-5 gap-2 max-h-[75vh] overflow-y-auto pr-1">
        {questions.map((q, i) => {
          const ans = answers[q.id]
          const answered = isAnswered(q, ans)
          let bg = 'bg-gray-200 text-gray-700'
          if (answered) bg = 'bg-green-400 text-white'
          if (submitted && answered && !isCorrect(q, ans)) bg = 'bg-red-500 text-white'

          const active = i === currentIndex
          return (
            <button
              key={q.id}
              onClick={() => setCurrent(i)}
              className={`${bg} p-2 rounded shadow-sm border ${active ? 'ring-2 ring-indigo-400' : ''}`}
              title={titleFor(q)}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
