import { useState, useEffect } from 'react'

export default function ContactModal({ closeModal }) {
  const [step, setStep] = useState(1) // 1 = choice, 2 = form, 3 = success
  const [choice, setChoice] = useState('')
  const [status, setStatus] = useState('idle') // 'idle', 'submitting'
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    requirement: ''
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closeModal])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          workEmail: formData.workEmail,
          company: formData.company,
          interest: choice,
          requirement: formData.requirement
        }),
      })
      if (response.ok) {
        setStep(3)
      } else {
        alert('Something went wrong. Please try again.')
        setStatus('idle')
      }
    } catch (err) {
      alert('An error occurred. Please check your connection and try again.')
      setStatus('idle')
    }
  }

  const options = [
    'Measure AI cost, margin or pricing',
    'Build an AI agent or workflow',
    'Evaluate AI ROI for our business',
    'Improve an existing AI system',
    'Partnership or other',
  ]

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target.classList.contains('modal-overlay')) closeModal() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <button className="modal-close" onClick={closeModal} aria-label="Close dialog">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        {/* Step 1: Choose goal */}
        {step === 1 && (
          <div>
            <div className="modal-step-label">Step 1 of 2</div>
            <h3>What are you looking to achieve?</h3>
            <div className="modal-options">
              {options.map(opt => (
                <button key={opt} className="modal-option" onClick={() => { setChoice(opt); setStep(2) }}>
                  {opt}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Contact form */}
        {step === 2 && (
          <div>
            <button className="modal-back" onClick={() => setStep(1)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
              Back
            </button>
            <div className="modal-step-label">Step 2 of 2 — {choice}</div>
            <h3>Tell us where to reach you.</h3>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName">Full name</label>
                <input type="text" id="fullName" required placeholder="Jordan Lee" value={formData.fullName} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="workEmail">Work email</label>
                <input type="email" id="workEmail" required placeholder="jordan@company.com" value={formData.workEmail} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input type="text" id="company" placeholder="Company name" value={formData.company} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="requirement">What should we know before we talk?</label>
                <textarea id="requirement" rows="3" placeholder="A short note on context or timing" value={formData.requirement} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="btn btn-accent" style={{justifyContent:'center', marginTop:'8px'}} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit →'}
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="modal-success">
            <div className="check">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h3>Request received.</h3>
            <p>We will follow up within one business day to schedule your conversation.</p>
            <button className="btn btn-primary" style={{justifyContent:'center', width:'100%'}} onClick={closeModal}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}
