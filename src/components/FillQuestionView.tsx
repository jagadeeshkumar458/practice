import React from 'react'
import { FillQuestion } from '../data/quizzes/types'
import { CodeText, highlightPython } from '../lib/pythonHighlight'
import { FillAnswer } from '../lib/answers'

export default function FillQuestionView({
  q,
  value,
  onChange,
}: {
  q: FillQuestion
  value: FillAnswer
  onChange: (next: FillAnswer) => void
}) {
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
              {i < q.blanks.length && (
                <input
                  value={value[i] ?? ''}
                  onChange={(e) => {
                    const next = [...value]
                    next[i] = e.target.value
                    onChange(next)
                  }}
                  style={{
                    width: `${Math.max(q.blanks[i].size, 2)}ch`,
                    background: '#2d2d2d',
                    color: '#4fc1ff',
                    borderColor: '#007acc',
                  }}
                  className="mx-0.5 px-1 rounded border font-mono text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  spellCheck={false}
                  autoComplete="off"
                />
              )}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}
