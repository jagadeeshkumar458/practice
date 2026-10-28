import { defineConfig } from 'vite'

export default async ({ command }: { command: string }) => {
  const react = (await import('@vitejs/plugin-react')).default
  return defineConfig({
    // GitHub Pages serves the production build from
    // https://<user>.github.io/w3-practice-hub/, so every asset URL needs that path
    // prefix baked in at build time - but keep local `npm run dev` at the root.
    base: command === 'build' ? '/w3-practice-hub/' : '/',
    plugins: [react()],
  })
}
