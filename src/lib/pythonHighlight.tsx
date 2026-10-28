import React from 'react'

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class',
  'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global',
  'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
  'try', 'while', 'with', 'yield', 'match', 'case', 'self',
])

const BUILTINS = new Set([
  'print', 'len', 'range', 'type', 'int', 'float', 'str', 'bool', 'list', 'dict', 'set',
  'tuple', 'input', 'open', 'sorted', 'sum', 'min', 'max', 'abs', 'enumerate', 'zip', 'map',
  'filter', 'isinstance', 'super', 'repr', 'format', 'round', 'pow', 'frozenset', 'object',
])

const TOKEN_RE = /(#.*$)|(f?'(?:[^'\\]|\\.)*'|f?"(?:[^"\\]|\\.)*")|(\b\d+\.?\d*\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)|([+\-*/%=<>!&|^~:]+)/gm

const COLORS = {
  comment: '#6a9955',
  string: '#ce9178',
  number: '#b5cea8',
  keyword: '#569cd6',
  builtin: '#dcdcaa',
  operator: '#d4d4d4',
  plain: '#d4d4d4',
}

/** Tokenizes a single string of Python-ish code into colored spans. */
export function highlightPython(code: string, keyPrefix = ''): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  TOKEN_RE.lastIndex = 0
  while ((match = TOKEN_RE.exec(code))) {
    if (match.index > lastIndex) {
      nodes.push(code.slice(lastIndex, match.index))
    }
    const [full, comment, string, number, word, operator] = match
    let color = COLORS.plain
    if (comment) color = COLORS.comment
    else if (string) color = COLORS.string
    else if (number) color = COLORS.number
    else if (word) {
      if (KEYWORDS.has(word)) color = COLORS.keyword
      else if (BUILTINS.has(word)) color = COLORS.builtin
      else {
        nodes.push(full)
        lastIndex = match.index + full.length
        continue
      }
    } else if (operator) color = COLORS.operator

    nodes.push(
      <span key={`${keyPrefix}${i++}`} style={{ color }}>
        {full}
      </span>
    )
    lastIndex = match.index + full.length
  }
  if (lastIndex < code.length) nodes.push(code.slice(lastIndex))
  return nodes
}

/** An editor-style dark code block with light Python syntax highlighting. */
export function CodeBlock({ code, className = '' }: { code: string; className?: string }) {
  return (
    <pre
      className={`rounded-lg overflow-x-auto text-sm leading-relaxed p-3 font-mono ${className}`}
      style={{ background: '#1e1e1e', color: COLORS.plain }}
    >
      <code>{highlightPython(code)}</code>
    </pre>
  )
}

/** Inline code chip, styled like an editor tooltip rather than plain markdown. */
export function InlineCode({ code }: { code: string }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-[0.9em] font-mono"
      style={{ background: '#1e1e1e', color: COLORS.plain }}
    >
      {highlightPython(code, 'i')}
    </code>
  )
}

/**
 * Renders text containing `backtick` spans: a span with an internal newline
 * becomes a full editor code block, a single-line span becomes an inline code chip.
 */
export function CodeText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(`[^`]*`)/g)
  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          const inner = part.slice(1, -1)
          if (inner.includes('\n')) {
            return <CodeBlock key={i} code={inner} className="my-2" />
          }
          return <InlineCode key={i} code={inner} />
        }
        return (
          <span key={i} className="whitespace-pre-wrap">
            {part}
          </span>
        )
      })}
    </div>
  )
}
