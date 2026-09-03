import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Header from './Header'
import { ARCHITECT_APP_URL } from '../lib/architectAppUrl'

describe('Agentic Architect marketing entry', () => {
  it('links to the separate architect app from desktop and mobile navigation', () => {
    render(<MemoryRouter><Header openModal={vi.fn()} /></MemoryRouter>)
    const links = screen.getAllByRole('link', { name: 'AI Architect' })
    expect(links).toHaveLength(2)
    links.forEach(link => {
      expect(link).toHaveAttribute('href', ARCHITECT_APP_URL)
      expect(link).toHaveAttribute('target', '_blank')
    })
  })
})
