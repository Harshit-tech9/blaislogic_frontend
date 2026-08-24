export default function CTA({ openModal }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-box">
          <h2>Have an AI problem worth solving?</h2>
          <p>
            Tell us what you are trying to build. We can help determine whether
            an existing product, a custom solution, or a combination of both is
            the right approach.
          </p>
          <button className="btn btn-primary" onClick={openModal}>Start a conversation →</button>
          <button className="btn btn-secondary" onClick={() => window.location.href='#products'}>Explore our products</button>
        </div>
      </div>
    </section>
  )
}
