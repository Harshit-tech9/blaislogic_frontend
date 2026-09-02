import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import './ArticlePage.css'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'

function renderSection(section, idx) {
  switch (section.type) {
    case 'heading':
      return <h2 key={idx} className="a-h2">{section.text}</h2>

    case 'subheading':
      return <h3 key={idx} className="a-h3">{section.text}</h3>

    case 'text':
      return <p key={idx}>{section.text}</p>

    case 'blockquote':
      return (
        <blockquote key={idx}>
          <p>{section.text}</p>
        </blockquote>
      )

    case 'formula':
      return (
        <div key={idx} className="article-formula">
          {section.text}
        </div>
      )

    case 'callout':
      return (
        <div key={idx} className="article-callout">
          {section.text}
        </div>
      )

    case 'list':
      return (
        <ul key={idx} className="a-list">
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )

    case 'definitions':
      return (
        <div key={idx} className="article-definitions">
          {section.items.map((item, i) => (
            <div key={i} className="article-def-item">
              <div className="article-def-term">{item.term}</div>
              <div className="article-def-desc">{item.definition}</div>
            </div>
          ))}
        </div>
      )

    case 'table':
      return (
        <div key={idx} className="article-table-wrap">
          <table className="article-table">
            <thead>
              <tr>
                {section.headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'image':
      return (
        <div key={idx}>
          <img className="article-image" src={section.src} alt={section.alt || ''} loading="lazy" />
          {section.caption && <div className="article-image-caption">{section.caption}</div>}
        </div>
      )

    case 'split':
      return (
        <div key={idx} className="article-split">
          <div className="article-split-image">
            <img className="article-image" src={section.image.src} alt={section.image.alt || ''} loading="lazy" />
            {section.image.caption && <div className="article-image-caption">{section.image.caption}</div>}
          </div>
          <div className="article-split-content">
            {section.content.map((subSection, i) => renderSection(subSection, i))}
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function ArticlePage() {
  const { articleId } = useParams()
  const [progress, setProgress] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const article = ARTICLES.find(a => a.id === articleId)

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [articleId])

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setProgress(Math.min(100, pct))
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!article) return <Navigate to="/" replace />

  return (
    <>
      <div className="article-page">
        {/* Progress bar */}
        <div className="article-progress">
          <div className="article-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="article-reader">
          {/* Sticky header */}
          <div className="article-header">
            <Link to="/" className="article-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Blaiselogic
            </Link>
            <div className="article-header-tag">{article.tag}</div>
          </div>

          {/* Body and Sidebar Layout */}
          <div className="article-layout">
            <div className="article-main">
              <div className="article-body">
                <div className="article-eyebrow">{article.tag}</div>
                <h1>{article.title}</h1>
                <p className="article-subtitle">{article.subtitle}</p>

                {/* Hero image */}
                <img
                  className="article-hero-image"
                  src={article.heroImage}
                  alt={article.heroAlt}
                  style={{ marginBottom: '40px', borderRadius: '12px', border: '1px solid var(--line)' }}
                />

                {/* Executive Summary */}
                <div className="article-exec-summary">
                  <h3>Executive Summary</h3>
                  <ul>
                    {article.executiveSummary.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Article sections */}
                {article.sections.map((section, idx) => renderSection(section, idx))}

                {/* Sources */}
                {article.sources && article.sources.length > 0 && (
                  <div className="article-sources">
                    <h3>Sources</h3>
                    <ol>
                      {article.sources.map((src, i) => (
                        <li key={i}>
                          <a href={src.url} target="_blank" rel="noopener noreferrer">
                            {src.ref}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Back button */}
                <Link to="/" className="article-back-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar">
              <div className="sidebar-heading">Explore other articles</div>
              <div className="sidebar-list">
                {ARTICLES.filter(a => a.id !== articleId).map(otherArticle => (
                  <Link key={otherArticle.id} to={`/insights/${otherArticle.id}`} className="sidebar-item">
                    <img 
                      src={otherArticle.heroImage} 
                      alt="" 
                      className="sidebar-img" 
                      loading="lazy" 
                    />
                    <div className="sidebar-title">{otherArticle.title}</div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
      
      <Footer openModal={() => setIsModalOpen(true)} />
      {isModalOpen && <ContactModal closeModal={() => setIsModalOpen(false)} />}
    </>
  )
}
