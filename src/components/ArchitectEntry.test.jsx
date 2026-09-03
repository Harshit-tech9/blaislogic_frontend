import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Header from './Header'

describe('Agentic Architect marketing entry', () => {
  it('links to the embedded assess route from desktop and mobile navigation', () => {
    render(<MemoryRouter><Header /></MemoryRouter>)
    const architectLinks = screen.getAllByRole('link', { name: /Agent Architect/i })
    architectLinks.forEach(link => expect(link).toHaveAttribute('href', '/assess'))
    expect(screen.getAllByRole('link', { name: /Analyse my workflow/i }).length).toBeGreaterThan(0)
  })
})
