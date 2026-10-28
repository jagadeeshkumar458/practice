# W3 Practice Hub

A multi-track learning app: a landing page of tech tracks (Python, TypeScript, and
CSS so far), each with a Quiz, Code Challenges (where available), Interview Q&A,
and real Practice Problems graded by actually running your code in the browser.

- **Quiz** — multiple choice, fill-in-the-blank, and drag-and-drop questions with
  editor-style code highlighting.
- **Code Challenges** — write code against numbered instructions, checked against
  a requirements checklist with inline hints.
- **Interview Q&A** — an accordion of common interview questions and answers.
- **Practice Problems** — real input/output coding problems. Python runs via
  [Pyodide](https://pyodide.org) (WebAssembly CPython) in the browser; TypeScript is
  transpiled and run in a sandboxed JS context. Both report the exact line a runtime
  or syntax error occurred on, highlighted directly in the editor.

Progress (scores, completion, in-progress code) persists in the browser's
`localStorage`, independently per track.

## Stack

React + TypeScript + Vite, Zustand for state, Tailwind for styling, CodeMirror 6
for the practice-problem editor, React Router (hash-based, for static hosting).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

Deploys automatically to GitHub Pages on every push to `main` via
`.github/workflows/deploy.yml`.
