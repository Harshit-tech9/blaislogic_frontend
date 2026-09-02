const CALENDAR_URL = 'https://calendar.app.google/LsSjs7YWcX5VCKRVA'

export default function Footer({ openModal }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="/#top" style={{display:'inline-block', marginBottom:'14px'}}>
              <img src="/assets/Blaiselogic_lbg.png" alt="Blaiselogic" style={{maxWidth:'150px', maxHeight:'40px', objectFit:'contain', mixBlendMode:'multiply'}} />
            </a>
            <p style={{color:'var(--ink-faint)', fontSize:'14.5px', maxWidth:'220px'}}>Make AI work as a business.</p>
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li><a href="/#metricai">MetricAI</a></li>
              <li><a href="/#advisory">AI Economics Advisory</a></li>
              <li><a href="/#systems">AI Systems Studio</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="/#insights">Insights</a></li>
              <li><a href="/#company">Company</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openModal(); }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href="https://www.linkedin.com/company/metricai-ai-finops/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={CALENDAR_URL} target="_blank" rel="noreferrer">Book a call</a></li>
              <li><a href="#">India / Global</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Blaiselogic. All rights reserved.</span>
          <span className="status-dot"><span className="d"></span>Building measurable AI systems.</span>
        </div>
      </div>
    </footer>
  )
}
