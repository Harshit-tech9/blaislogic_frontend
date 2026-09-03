import { Link } from 'react-router-dom'

export default function ArticleWorkflowCta({ tag, line }) {
  return (
    <aside className="article-workflow-cta" aria-label="Agentic AI Architect">
      <div className="article-workflow-cta-tag">
        <span className="article-workflow-cta-pulse" aria-hidden="true" />
        Agentic AI Architect
      </div>
      <h3 className="article-workflow-cta-headline">Examine your workflow</h3>
      <p className="article-workflow-cta-line">{line}</p>
      <div className="article-workflow-cta-meta">Related to: {tag}</div>
      <Link to="/assess" className="btn btn-accent article-workflow-cta-btn">
        Analyse my workflow
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </Link>
    </aside>
  )
}
