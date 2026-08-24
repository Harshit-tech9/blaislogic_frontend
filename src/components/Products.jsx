export default function Products() {
  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head">
          <div className="kicker">INFRASTRUCTURE COMPONENTS</div>
        </div>

        <div className="products">

          <article className="product featured" onClick={() => window.open('https://metricai.co.in/', '_blank')} style={{ cursor: 'pointer' }}>
            <div className="product-number">01 / PRODUCT</div>
            <h3>MetricAI</h3>
            <p>
              Track AI usage and performance across providers. Monitor inputs, outputs, latency, and cost in real time with clear, actionable visibility.
            </p>
            <a className="product-link" href="https://metricai.co.in/" target="_blank" rel="noreferrer">Explore MetricAI ↗</a>
          </article>

          <article className="product">
            <div className="product-number">02 / PRODUCT</div>
            <h3>AIAdeFactory</h3>
            <p>
              Generate high-quality ads directly from WhatsApp. Chat with AI, answer simple prompts, and receive ready-to-launch campaign content instantly.
            </p>
            <a className="product-link" href="#">Visit AIAdeFactory</a>
          </article>

          <article className="product">
            <div className="product-number">03 / SERVICE</div>
            <h3>Solutions</h3>
            <p>
              Custom AI systems designed around your needs. We build practical, reliable AI setups that solve real-world problems effectively.
            </p>
            <a className="product-link" href="#solutions">Explore Solutions ↗</a>
          </article>

        </div>
      </div>
    </section>
  )
}
