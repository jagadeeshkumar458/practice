export type MCQQuestion = {
  id: number
  type: 'mcq'
  /** May contain `backtick` spans: single-line = inline code chip, multi-line = editor code block. */
  question: string
  options: string[]
  answer: number
}

export type FillBlank = {
  /** Character-width hint for the blank's input box, not a strict length requirement. */
  size: number
  answer: string
}

export type FillQuestion = {
  id: number
  type: 'fill'
  prompt: string
  /** Code text split around each blank; codeParts.length === blanks.length + 1. */
  codeParts: string[]
  blanks: FillBlank[]
}

export type DragDropQuestion = {
  id: number
  type: 'dragdrop'
  prompt: string
  /** Code text split around each blank; codeParts.length === options-used-per-blank + 1. */
  codeParts: string[]
  /** Word bank; may contain duplicate labels as distinct draggable entries. */
  options: string[]
  /** Acceptable option index (or indices, when duplicates make several choices valid) per blank, in order. */
  correct: (number | number[])[]
}

export type Question = MCQQuestion | FillQuestion | DragDropQuestion
