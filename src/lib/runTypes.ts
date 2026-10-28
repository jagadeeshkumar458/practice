export type RunError = { message: string; line: number | null }
export type RunResult = { stdout: string; error: RunError | null }
