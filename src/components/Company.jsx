export default function Company() {
  return (
    <section className="section" id="company">
      <div className="container">

        <div className="section-head center">
          <div className="kicker">Why Blaiselogic</div>
          <h2>Technology depth without the one-size-fits-all pitch.</h2>
          <p>
            Whether you need a product or a custom build, the focus stays on
            useful technology, dependable engineering, and measurable outcomes.
          </p>
        </div>

        <div className="why-grid">
          <article className="why-card">
            <div className="icon">◈</div>
            <h3>Product + engineering</h3>
            <p>We understand both reusable products and the engineering work required when your problem does not fit a template.</p>
          </article>

          <article className="why-card">
            <div className="icon">↗</div>
            <h3>Built for production</h3>
            <p>Architecture decisions are made with reliability, observability, integrations, and long-term operation in mind.</p>
          </article>

          <article className="why-card">
            <div className="icon">◎</div>
            <h3>Practical AI</h3>
            <p>We focus on where AI creates actual value rather than adding AI simply because the technology is available.</p>
          </article>
        </div>

      </div>
    </section>
  )
}
