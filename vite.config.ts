import { defineConfig } from 'vite'

export default async ({ command }: { command: string }) => {
  const react = (await import('@vitejs/plugin-react')).default
  return defineConfig({
    // GitHub Pages serves the production build from
    // https://jagadeeshkumar458.github.io/practice/, so every asset URL needs that
    // path prefix baked in at build time - but keep local `npm run dev` at the root.
    base: command === 'build' ? '/practice/' : '/',
    plugins: [react()],
  })
}
