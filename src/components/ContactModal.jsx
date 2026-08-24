import { useState, useEffect } from 'react'

export default function ContactModal({ closeModal }) {
  const [status, setStatus] = useState('idle') // 'idle', 'submitting', 'success'
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    interest: '',
    requirement: ''
  })

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closeModal])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        alert('Something went wrong. Please try again.')
        setStatus('idle')
      }
    } catch (err) {
      alert('An error occurred. Please check your connection and try again.')
      setStatus('idle')
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  return (
    <div 
      className="modal-overlay active" 
      id="contactModalOverlay" 
      onClick={(e) => {
        if (e.target.id === 'contactModalOverlay') closeModal()
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>×</button>
        
        {status !== 'success' ? (
          <div id="modalFormState">
            <div className="modal-header">
              <h2>Talk to Blaiselogic</h2>
              <p>Let's discuss what you're building and how we can help.</p>
            </div>

            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="Your name" 
                  required 
                  minLength="2" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="workEmail">Work Email</label>
                <input 
                  type="email" 
                  id="workEmail" 
                  placeholder="you@company.com" 
                  required 
                  value={formData.workEmail} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  placeholder="Company name" 
                  required 
                  minLength="2" 
                  value={formData.company} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="interest">What can we help with?</label>
                <select 
                  id="interest" 
                  required 
                  value={formData.interest} 
                  onChange={handleChange}
                >
                  <option value="" disabled>Select an area</option>
                  <option value="AI Infrastructure">AI Infrastructure</option>
                  <option value="AI Observability & Monitoring">AI Observability & Monitoring</option>
                  <option value="AI Cost Management">AI Cost Management</option>
                  <option value="Custom AI Solutions">Custom AI Solutions</option>
                  <option value="Enterprise AI Integration">Enterprise AI Integration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="requirement">Tell us about your requirement</label>
                <textarea 
                  id="requirement" 
                  placeholder="Tell us briefly about your project..." 
                  required 
                  minLength="20" 
                  value={formData.requirement} 
                  onChange={handleChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="modal-btn" 
                id="submitBtn" 
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Inquiry →'}
              </button>
              <div className="modal-response-time">Usually responds within 1 day</div>
            </form>
          </div>
        ) : (
          <div className="success-state" id="modalSuccessState" style={{ display: 'block' }}>
            <h2>Thanks for reaching out</h2>
            <p>We've received your inquiry. Our team will review your requirements and get back to you shortly.</p>
            <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '25px' }}>
              <strong>Expected response:</strong> Within 1 business day
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ borderRadius: '8px' }} 
              onClick={closeModal}
            >
              Back to website
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
