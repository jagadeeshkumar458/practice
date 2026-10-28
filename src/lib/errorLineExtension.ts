import { RangeSetBuilder, StateEffect, StateField } from '@codemirror/state'
import { Decoration, DecorationSet, EditorView, GutterMarker, gutter } from '@codemirror/view'

export const setErrorLine = StateEffect.define<number | null>()

const errorLineDeco = Decoration.line({ attributes: { class: 'cm-error-line' } })

const errorMarker = new (class extends GutterMarker {
  toDOM() {
    const span = document.createElement('span')
    span.textContent = '●'
    span.style.color = '#f14c4c'
    return span
  }
})()

const errorLineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(deco, tr) {
    deco = deco.map(tr.changes)
    for (const effect of tr.effects) {
      if (effect.is(setErrorLine)) {
        if (effect.value === null || effect.value < 1 || effect.value > tr.state.doc.lines) {
          deco = Decoration.none
        } else {
          const line = tr.state.doc.line(effect.value)
          deco = Decoration.set([errorLineDeco.range(line.from)])
        }
      }
    }
    return deco
  },
  provide: (field) => EditorView.decorations.from(field),
})

const errorGutter = gutter({
  class: 'cm-error-gutter',
  markers: (view) => {
    const deco = view.state.field(errorLineField)
    const builder = new RangeSetBuilder<GutterMarker>()
    deco.between(0, view.state.doc.length, (from) => builder.add(from, from, errorMarker))
    return builder.finish()
  },
})

export const errorLineExtension = [
  errorLineField,
  errorGutter,
  EditorView.theme({
    '.cm-error-line': { backgroundColor: 'rgba(241, 76, 76, 0.15)' },
    '.cm-error-gutter': { width: '1em' },
  }),
]

export function highlightErrorLine(view: EditorView, line: number | null) {
  view.dispatch({ effects: setErrorLine.of(line) })
}
