// Pyodide (WASM CPython) is loaded from the CDN on first use, not bundled - it's
// only needed on the Practice Problems pages, and downloading it eagerly would
// bloat every other page's load time for no reason.
const PYODIDE_VERSION = '0.26.4'
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>
  }
}

export type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>
  globals: { get: (name: string) => unknown; set: (name: string, value: unknown) => void }
}

let pyodidePromise: Promise<PyodideInterface> | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

/** Loads (once) and returns the shared Pyodide runtime instance. */
export function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = loadScript(`${PYODIDE_CDN}pyodide.js`).then(() => {
      if (!window.loadPyodide) throw new Error('Pyodide failed to load')
      return window.loadPyodide({ indexURL: PYODIDE_CDN })
    })
  }
  return pyodidePromise
}
