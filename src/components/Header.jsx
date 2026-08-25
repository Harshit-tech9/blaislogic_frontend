import { useState, useEffect } from 'react'

export default function Header({ openModal }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bl-theme')
        if (saved) return saved
      } catch(e) {}
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('bl-theme', theme) } catch(e) {}
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <>
      <header className={`site${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="wordmark"><span className="dot"></span>Blaiselogic</a>
          <nav className="main-nav" aria-label="Primary">
            <a href="#metricai">MetricAI</a>
            <a href="#advisory">Advisory</a>
            <a href="#systems">AI Systems</a>
            <a href="#insights">Insights</a>
            <a href="#company">Company</a>
          </nav>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={openModal}>Talk to us</button>
            <button className="btn btn-primary btn-sm" onClick={openModal}>Book a strategy call →</button>
            <button className="burger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><span></span></button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <div className="top">
          <a href="#top" className="wordmark"><span className="dot"></span>Blaiselogic</a>
          <button className="close-x" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          {['metricai','advisory','systems','insights','company'].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} style={{textTransform:'capitalize'}}>{id === 'metricai' ? 'MetricAI' : id.charAt(0).toUpperCase() + id.slice(1)}</a>
          ))}
        </nav>
        <div className="ctas">
          <button className="btn btn-ghost" onClick={() => { setMobileOpen(false); openModal(); }}>Talk to us</button>
          <button className="btn btn-primary" onClick={() => { setMobileOpen(false); openModal(); }}>Book a strategy call →</button>
        </div>
      </div>
    </>
  )
}
