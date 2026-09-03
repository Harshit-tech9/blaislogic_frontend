/**
 * Absolute URL of the Agentic AI Architect app (project009).
 * Local default serves from the project009 FastAPI process.
 * Override in .env with VITE_ARCHITECT_APP_URL for staging/production.
 */
export const ARCHITECT_APP_URL =
  import.meta.env.VITE_ARCHITECT_APP_URL || 'http://127.0.0.1:8000/agentic-ai-architect'
