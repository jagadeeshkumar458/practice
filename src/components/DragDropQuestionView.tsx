import React, { useState } from 'react'
import { DragDropQuestion } from '../data/quizzes/types'
import { CodeText, highlightPython } from '../lib/pythonHighlight'
import { DragDropAnswer } from '../lib/answers'

export default function DragDropQuestionView({
  q,
  value,
  onChange,
}: {
  q: DragDropQuestion
  value: DragDropAnswer
  onChange: (next: DragDropAnswer) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const usedIndices = new Set(value.filter((v): v is number => v !== null))
  const bankIndices = q.options.map((_, i) => i).filter((i) => !usedIndices.has(i))

  function placeInSlot(slotIndex: number, optionIndex: number) {
    const next = [...value]
    const prevSlot = next.indexOf(optionIndex)
    if (prevSlot !== -1) next[prevSlot] = null
    next[slotIndex] = optionIndex
    onChange(next)
    setSelected(null)
  }

  function clearSlot(slotIndex: number) {
    const next = [...value]
    next[slotIndex] = null
    onChange(next)
  }

  function handleSlotClick(slotIndex: number) {
    if (value[slotIndex] !== null) {
      clearSlot(slotIndex)
      return
    }
    if (selected !== null) placeInSlot(slotIndex, selected)
  }

  return (
    <div>
      <div className="mt-4 text-lg">
        <CodeText text={q.prompt} />
      </div>
      <pre
        className="rounded-lg overflow-x-auto text-sm leading-relaxed p-3 font-mono mt-4"
        style={{ background: '#1e1e1e', color: '#d4d4d4' }}
      >
        <code>
          {q.codeParts.map((part, i) => (
            <React.Fragment key={i}>
              {highlightPython(part, `p${i}-`)}
              {i < q.codeParts.length - 1 && (
                <span
                  role="button"
                  aria-label={`blank ${i + 1}`}
                  onClick={() => handleSlotClick(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const optIdx = Number(e.dataTransfer.getData('text/plain'))
                    if (!Number.isNaN(optIdx)) placeInSlot(i, optIdx)
                  }}
                  className="inline-flex items-center justify-center mx-0.5 px-2 min-w-[2.5em] rounded border-2 border-dashed cursor-pointer align-middle select-none"
                  style={{
                    borderColor: value[i] !== null ? '#007acc' : '#6b6b6b',
                    background: value[i] !== null ? '#254b5a' : 'transparent',
                    color: '#4fc1ff',
                  }}
                >
                  {value[i] !== null ? q.options[value[i] as number] : '   '}
                </span>
              )}
            </React.Fragment>
          ))}
        </code>
      </pre>

      <p className="mt-3 text-xs text-gray-500">Drag a word into a blank, or click a word then click a blank.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {bankIndices.map((optIdx) => (
          <span
            key={optIdx}
            role="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', String(optIdx))}
            onClick={() => setSelected((cur) => (cur === optIdx ? null : optIdx))}
            className={`px-2 py-1 rounded font-mono text-sm cursor-grab border select-none ${
              selected === optIdx ? 'ring-2 ring-indigo-400' : ''
            }`}
            style={{ background: '#1e1e1e', color: '#dcdcaa', borderColor: '#3c3c3c' }}
          >
            {q.options[optIdx]}
          </span>
        ))}
      </div>
    </div>
  )
}
