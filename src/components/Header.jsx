import { useState, useEffect } from 'react'

export default function Header({ openModal }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blaiselogic-theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('blaiselogic-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="site-header">
      <a className="brand" href="#">
        <img src="assets/Blaiselogic_lbg.png" alt="Blaiselogic" />
      </a>

      <nav className="nav">
        <a href="#products">Products</a>
        <a href="#solutions">Solutions</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#company">Company</a>
      </nav>

      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span>{theme === 'dark' ? '☀' : '☾'}</span>
        </button>
        <button className="header-cta" onClick={openModal}>Talk to us →</button>
      </div>
    </header>
  )
}
