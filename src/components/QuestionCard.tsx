import React from 'react'
import { useExamStore } from '../store/useExamStore'
import { emptyAnswer, FillAnswer, DragDropAnswer } from '../lib/answers'
import McqQuestionView from './McqQuestionView'
import FillQuestionView from './FillQuestionView'
import DragDropQuestionView from './DragDropQuestionView'

const TYPE_LABEL: Record<string, string> = {
  mcq: 'Multiple choice',
  fill: 'Fill in the blank',
  dragdrop: 'Drag and drop',
}

export default function QuestionCard() {
  const { questions, currentIndex, setAnswer, answers, setCurrent } = useExamStore()
  const q = questions[currentIndex]
  const sel = answers[q.id]

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold">Question {currentIndex + 1}</h2>
        <div className="text-right">
          <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide">{TYPE_LABEL[q.type]}</div>
          <div className="text-sm text-gray-500">ID: {q.id}</div>
        </div>
      </div>

      {q.type === 'mcq' && (
        <McqQuestionView
          q={q}
          value={typeof sel === 'number' ? sel : null}
          onChange={(choice) => setAnswer(q.id, choice)}
        />
      )}

      {q.type === 'fill' && (
        <FillQuestionView
          q={q}
          value={(sel as FillAnswer) ?? (emptyAnswer(q) as FillAnswer)}
          onChange={(next) => setAnswer(q.id, next)}
        />
      )}

      {q.type === 'dragdrop' && (
        <DragDropQuestionView
          q={q}
          value={(sel as DragDropAnswer) ?? (emptyAnswer(q) as DragDropAnswer)}
          onChange={(next) => setAnswer(q.id, next)}
        />
      )}

      <div className="mt-6 flex justify-between">
        <div>
          <button
            onClick={() => setCurrent(Math.max(0, currentIndex - 1))}
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrent(Math.min(questions.length - 1, currentIndex + 1))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
