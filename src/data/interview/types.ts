export type InterviewQA = {
  id: string
  category: string
  question: string
  /** May contain `backtick` inline-code spans, rendered via CodeText. */
  answer: string
}
