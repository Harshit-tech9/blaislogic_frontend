export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src="assets/Blaiselogic_lbg.png" alt="Blaiselogic" />
            </div>
            <p className="footer-desc">
              Technology, AI products, infrastructure, and custom solutions
              for teams building practical AI systems.
            </p>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <a href="#products">MetricAI</a>
            <a href="#products">AIAdeFactory</a>
            <a href="#products">Solutions</a>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <a href="#solutions">AI Agents</a>
            <a href="#solutions">AI Applications</a>
            <a href="#solutions">Infrastructure</a>
            <a href="#solutions">Custom Systems</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <a href="#company">About</a>
            <a href="#">Contact</a>
            <a href="#">Security</a>
            <a href="#">Status</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Blaiselogic. All rights reserved.</span>
          <span className="status"><span className="status-dot"></span> all systems operational</span>
        </div>
      </div>
    </footer>
  )
}
