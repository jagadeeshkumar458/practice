import React, { useRef } from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { errorLineExtension, highlightErrorLine } from '../lib/errorLineExtension'

export type PracticeLanguage = 'python' | 'typescript'

function languageExtension(language: PracticeLanguage) {
  return language === 'typescript' ? javascript({ typescript: true }) : python()
}

const darkTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#1e1e1e', color: '#d4d4d4', height: '20rem' },
    '.cm-content': { caretColor: '#d4d4d4' },
    '.cm-gutters': { backgroundColor: '#1e1e1e', color: '#6e7681', border: 'none' },
    '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,0.05)' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(255,255,255,0.05)' },
  },
  { dark: true }
)

export type PracticeEditorHandle = { highlightErrorLine: (line: number | null) => void }

const PracticeEditor = React.forwardRef<
  PracticeEditorHandle,
  { value: string; onChange: (v: string) => void; language?: PracticeLanguage }
>(function PracticeEditor({ value, onChange, language = 'python' }, ref) {
  const cmRef = useRef<ReactCodeMirrorRef>(null)

  React.useImperativeHandle(ref, () => ({
    highlightErrorLine(line) {
      const view = cmRef.current?.view
      if (view) highlightErrorLine(view, line)
    },
  }))

  return (
    <CodeMirror
      ref={cmRef}
      value={value}
      onChange={onChange}
      extensions={[languageExtension(language), darkTheme, errorLineExtension]}
      basicSetup={{ lineNumbers: true, tabSize: 4 }}
      className="rounded-lg overflow-hidden border font-mono text-sm"
      style={{ borderColor: '#3c3c3c' }}
    />
  )
})

export default PracticeEditor
