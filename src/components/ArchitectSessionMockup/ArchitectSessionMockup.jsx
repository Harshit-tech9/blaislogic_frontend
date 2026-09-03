import { useState, useEffect } from 'react'
import './ArchitectSessionMockup.css'

const STAGES = [
  { id: 'start', num: 1, label: 'Start', sub: 'Lead & workflow intake' },
  { id: 'research', num: 2, label: 'Company research', sub: 'Public sources' },
  { id: 'interview', num: 3, label: 'Workflow interview', sub: 'Max 6 questions' },
  { id: 'opportunities', num: 4, label: 'Opportunity map', sub: '3 ranked options' },
  { id: 'blueprint', num: 5, label: 'Agent blueprint', sub: 'Full architecture' },
  { id: 'proof', num: 6, label: 'Live proof-of-work', sub: 'Sample documents' },
  { id: 'results', num: 7, label: 'Results', sub: 'Report & next step' },
]

const STAGE_TITLES = {
  start: 'Start your assessment',
  research: 'Company research',
  interview: 'Workflow interview',
  opportunities: 'Opportunity map',
  blueprint: 'Agent blueprint',
  proof: 'Live proof-of-work',
  results: 'Results & next step',
}

const BLUEPRINT_TABS = [
  { id: 'biz', label: 'Business' },
  { id: 'agent', label: 'Agent' },
  { id: 'tech', label: 'Technical' },
  { id: 'econ', label: 'Economic' },
  { id: 'pilot', label: 'Pilot' },
]

const OPPORTUNITIES = [
  {
    id: 'quote',
    recommended: true,
    name: 'Quote Comparison Agent',
    desc: 'Extracts price, lead time and terms from vendor quotes in any format and generates a ranked comparison with flagged discrepancies.',
    scores: [{ l: 'Business value', w: 92 }, { l: 'Feasibility', w: 85 }, { l: 'Risk (lower=better)', w: 22, green: true }],
    pilot: '4–5 wks to pilot',
  },
  {
    id: 'chaser',
    recommended: false,
    name: 'Vendor Response Chaser Agent',
    desc: 'Follows up with vendors who have not responded to an RFQ within SLA, drafting reminder emails for analyst approval.',
    scores: [{ l: 'Business value', w: 58 }, { l: 'Feasibility', w: 90 }, { l: 'Risk (lower=better)', w: 15, green: true }],
    pilot: '2–3 wks to pilot',
  },
  {
    id: 'spend',
    recommended: false,
    name: 'Spend Analytics Agent',
    desc: 'Aggregates historical purchase data to surface vendor concentration risk and price-drift trends for leadership review.',
    scores: [{ l: 'Business value', w: 74 }, { l: 'Feasibility', w: 48 }, { l: 'Risk (lower=better)', w: 55, amber: true }],
    pilot: '8–10 wks to pilot',
  },
]

const PROOF_STEPS = ['Identify', 'Extract', 'Normalise', 'Compare', 'Flag', 'Generate']

export default function ArchitectSessionMockup() {
  const [stage, setStage] = useState('start')
  const [selectedOpp, setSelectedOpp] = useState('quote')
  const [activeTab, setActiveTab] = useState('biz')
  const [proofRunning, setProofRunning] = useState(false)
  const [proofDone, setProofDone] = useState(false)
  const [proofStep, setProofStep] = useState(0)
  const [timer, setTimer] = useState(0)
  const [consent, setConsent] = useState(false)

  const stageIndex = STAGES.findIndex(s => s.id === stage)

  useEffect(() => {
    const id = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const goTo = (id) => {
    setStage(id)
    if (id !== 'proof') {
      setProofRunning(false)
      setProofDone(false)
      setProofStep(0)
    }
  }

  const runProof = () => {
    if (proofRunning || proofDone) return
    setProofRunning(true)
    setProofStep(0)
    PROOF_STEPS.forEach((_, i) => {
      setTimeout(() => setProofStep(i + 1), (i + 1) * 380)
    })
    setTimeout(() => {
      setProofDone(true)
      setProofRunning(false)
    }, PROOF_STEPS.length * 380 + 300)
  }

  const fmtTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0')
    const s = String(secs % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const progressPct = Math.min(100, ((stageIndex + 1) / STAGES.length) * 100)

  return (
    <div className="arch-session">
      <div className="arch-session-banner">
        Product mockup · simulated agent session · click any stage in the left rail to explore
      </div>

      <div className="arch-session-shell">
        <aside className="arch-session-side">
          <div className="arch-session-brand">
            <span className="arch-session-dot" />
            <div>
              <div className="arch-session-name">Agentic AI Architect</div>
              <div className="arch-session-tag">BlaiseLogic AI Systems Studio</div>
            </div>
          </div>

          <ul className="arch-session-steps">
            {STAGES.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={`arch-session-step${stage === s.id ? ' current' : ''}${i < stageIndex ? ' done' : ''}`}
                  onClick={() => goTo(s.id)}
                >
                  <span className="arch-session-step-num">{s.num}</span>
                  <span className="arch-session-step-meta">
                    <span className="arch-session-step-label">{s.label}</span>
                    <span className="arch-session-step-sub">{s.sub}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="arch-session-side-foot">
            <div className="arch-session-foot-row"><span>Spend cap</span><b>₹32 / ₹100</b></div>
            <div className="arch-session-meter"><i style={{ width: `${32}%` }} /></div>
            <div className="arch-session-foot-row"><span>Session</span><b>{fmtTime(timer)}</b></div>
            <div className="arch-session-foot-row"><span>Auto-delete</span><b>23:58:41</b></div>
          </div>
        </aside>

        <div className="arch-session-main">
          <div className="arch-session-topbar">
            <div>
              <div className="arch-session-kicker">Stage {stageIndex + 1} of {STAGES.length}</div>
              <div className="arch-session-title">{STAGE_TITLES[stage]}</div>
            </div>
            <div className="arch-session-topbar-right">
              <span className="arch-session-aid">ASMT-7C21-KQ9X</span>
              <span className="arch-session-live"><span className="arch-session-live-p" />Session live</span>
            </div>
          </div>

          <div className="arch-session-content">
            {stage === 'start' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">01 · Tell us about the workflow</div>
                <h2 className="arch-session-stage-h">Bring us one workflow. Leave with an agent blueprint.</h2>
                <p className="arch-session-stage-p">No account, no password. This session is isolated to you, capped at ₹100 in usage, and deletes itself in 24 hours. Please do not upload confidential or regulated documents.</p>
                <div className="arch-session-card">
                  <div className="arch-session-form-grid">
                    {[
                      ['Full name', 'Ananya Rao'],
                      ['Work email', 'ananya.rao@meridianindustrial.com'],
                      ['Company name', 'Meridian Industrial Supply'],
                      ['Company website', 'meridianindustrial.com'],
                      ['Role', 'Head of Procurement'],
                      ['Industry', 'Industrial equipment distribution'],
                    ].map(([label, val]) => (
                      <div key={label} className="arch-session-field">
                        <label>{label}</label>
                        <input type="text" defaultValue={val} readOnly />
                      </div>
                    ))}
                    <div className="arch-session-field full">
                      <label>What workflow is costing you the most time or money right now?</label>
                      <textarea readOnly defaultValue="Every week we request quotes from 3–5 vendors for parts orders above ₹2L. Two analysts manually re-key each quote into Excel to compare pricing, lead time and payment terms. It takes most of a day and we still miss discrepancies." />
                    </div>
                  </div>
                  <label className="arch-session-consent">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                    <span>I consent to BlaiseLogic processing this information to generate an assessment. I understand this is a demonstration and will not submit confidential or regulated data.</span>
                  </label>
                </div>
                <div className="arch-session-actions">
                  <button type="button" className="arch-session-btn primary" onClick={() => goTo('research')}>Start assessment →</button>
                </div>
              </div>
            )}

            {stage === 'research' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">02 · Company research</div>
                <h2 className="arch-session-stage-h">Here&apos;s what I found on meridianindustrial.com</h2>
                <div className="arch-session-msg agent">
                  <span className="arch-session-av">◆</span>
                  <div className="arch-session-bubble">I read your public site and LinkedIn page before this call. Here&apos;s my working understanding. Tell me if anything is off before we go further.</div>
                </div>
                <div className="arch-session-card">
                  <div className="arch-session-facts">
                    {[
                      ['What the company appears to do', 'Distributes industrial equipment and spare parts to B2B manufacturing customers across Western India.'],
                      ['Primary customer segment', 'Mid-size manufacturing plants, 50–500 employees.'],
                      ['Main products / services', 'Bearings, motors, hydraulic components, MRO supplies.'],
                      ['Likely operating model', 'Multi-vendor procurement, warehouse fulfilment, regional sales reps.'],
                    ].map(([k, v]) => (
                      <div key={k}><div className="arch-session-f-label">{k}</div><div className="arch-session-f-val">{v}</div></div>
                    ))}
                  </div>
                  <div className="arch-session-chips">
                    {['Homepage', 'About page', 'LinkedIn', 'Product catalogue (PDF)'].map(c => (
                      <span key={c} className="arch-session-chip blue">↗ {c}</span>
                    ))}
                  </div>
                  <div className="arch-session-assump">⚠ <span><b>Assumption, not verified:</b> procurement communicates with vendors primarily via email and PDF/Excel attachments, not a connected e-procurement system.</span></div>
                </div>
                <div className="arch-session-actions">
                  <button type="button" className="arch-session-btn primary" onClick={() => goTo('interview')}>That&apos;s broadly correct →</button>
                  <button type="button" className="arch-session-btn ghost">Let me correct something</button>
                </div>
              </div>
            )}

            {stage === 'interview' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">03 · Workflow interview</div>
                <h2 className="arch-session-stage-h">A few questions about how this actually happens today</h2>
                <p className="arch-session-stage-p">Six questions maximum. I&apos;ll skip anything you&apos;ve already told me.</p>
                <div className="arch-session-qprog">Question 6 of 6 · trigger, owner, frequency, systems and approvals already confirmed</div>
                <div className="arch-session-msg agent">
                  <span className="arch-session-av">◆</span>
                  <div className="arch-session-bubble">Last one. What currently causes the most delay or error in this process?</div>
                </div>
                <div className="arch-session-msg user">
                  <span className="arch-session-av">AR</span>
                  <div className="arch-session-bubble">Vendors send quotes in totally different formats. Some PDF, some Excel, some just an email body. Re-keying causes typos, and we&apos;ve paid the wrong price twice this year.</div>
                </div>
                <div className="arch-session-card">
                  <h4>Confirmed workflow summary</h4>
                  <div className="arch-session-facts" style={{ marginTop: 14 }}>
                    {[
                      ['Trigger', 'Purchase request above ₹2L raised in the ERP'],
                      ['Owner', '2 procurement analysts'],
                      ['Frequency', '~40 quote comparisons / month'],
                      ['Systems involved', 'Outlook, Excel, SAP Business One'],
                      ['Success definition', 'Lowest total landed cost within lead-time constraint'],
                      ['Human approval', 'Procurement manager signs off above ₹5L'],
                    ].map(([k, v]) => (
                      <div key={k}><div className="arch-session-f-label">{k}</div><div className="arch-session-f-val">{v}</div></div>
                    ))}
                  </div>
                </div>
                <div className="arch-session-actions">
                  <button type="button" className="arch-session-btn primary" onClick={() => goTo('opportunities')}>This looks right →</button>
                </div>
              </div>
            )}

            {stage === 'opportunities' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">04 · Opportunity map</div>
                <h2 className="arch-session-stage-h">Three agent opportunities, ranked for your workflow</h2>
                <p className="arch-session-stage-p">Scored on business value, feasibility, data readiness, integration complexity, operational risk and time to pilot.</p>
                <div className="arch-session-opps">
                  {OPPORTUNITIES.map(opp => (
                    <button
                      key={opp.id}
                      type="button"
                      className={`arch-session-opp${selectedOpp === opp.id ? ' selected' : ''}`}
                      onClick={() => setSelectedOpp(opp.id)}
                    >
                      {opp.recommended && <span className="arch-session-opp-rec">RECOMMENDED</span>}
                      <h5>{opp.name}</h5>
                      <p>{opp.desc}</p>
                      {opp.scores.map(sc => (
                        <div key={sc.l} className="arch-session-score">
                          <span className="arch-session-sl">{sc.l}</span>
                          <div className="arch-session-sb"><i style={{ width: `${sc.w}%`, background: sc.green ? 'var(--green)' : sc.amber ? 'var(--amber)' : undefined }} /></div>
                        </div>
                      ))}
                      <div className="arch-session-opp-foot">
                        <span>⏱ {opp.pilot}</span>
                        <span>{selectedOpp === opp.id ? 'Selected' : 'Select'}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="arch-session-actions">
                  <button type="button" className="arch-session-btn primary" onClick={() => goTo('blueprint')}>Design the blueprint for this →</button>
                </div>
              </div>
            )}

            {stage === 'blueprint' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">05 · Agent blueprint</div>
                <h2 className="arch-session-stage-h">Quote Comparison Agent · full architecture</h2>
                <div className="arch-session-tabs">
                  {BLUEPRINT_TABS.map(tab => (
                    <button key={tab.id} type="button" className={`arch-session-tab${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
                  ))}
                </div>
                <div className="arch-session-card">
                  {activeTab === 'biz' && (
                    <>
                      {[
                        ['Workflow owner', 'Procurement (2 analysts, 1 manager)'],
                        ['Current process', 'Manual re-keying of vendor quotes into Excel, ~1 day per cycle'],
                        ['Target outcome', 'Ranked, discrepancy-flagged comparison ready in minutes'],
                        ['Completion event', 'Procurement manager approves the recommended vendor'],
                        ['Quality gate', 'All extracted fields traced to source; low-confidence fields flagged'],
                        ['Expected volume', '~40 comparisons / month'],
                      ].map(([k, v]) => (
                        <div key={k} className="arch-session-kv"><span className="k">{k}</span><span className="v">{v}</span></div>
                      ))}
                    </>
                  )}
                  {activeTab === 'agent' && (
                    <>
                      {[
                        ['Objective', 'Turn N vendor quotes into one decision-ready comparison'],
                        ['Trigger', 'Quotes uploaded or forwarded to a monitored inbox'],
                        ['Inputs', 'Vendor quote PDFs / Excel / email body'],
                        ['Reasoning steps', 'Identify → extract → normalise → compare → flag → recommend'],
                        ['Tool calls', 'Document parser, currency/unit normaliser, SAP B1 lookup (read-only)'],
                        ['Human handoff', 'Manager reviews flagged fields before approval'],
                        ['Escalation', 'Confidence below 80% on any price field routes to analyst'],
                      ].map(([k, v]) => (
                        <div key={k} className="arch-session-kv"><span className="k">{k}</span><span className="v">{v}</span></div>
                      ))}
                    </>
                  )}
                  {activeTab === 'tech' && (
                    <>
                      {[
                        ['Model requirement', 'Vision-capable LLM for scanned PDFs; text model for structured docs'],
                        ['Document processing', 'PDF, XLSX, inline email parsing'],
                        ['APIs / systems', 'SAP Business One (read-only), Outlook Graph API'],
                        ['Authentication', 'OAuth service account, scoped read access'],
                        ['Audit & monitoring', 'Every extraction logged with source page reference'],
                      ].map(([k, v]) => (
                        <div key={k} className="arch-session-kv"><span className="k">{k}</span><span className="v">{v}</span></div>
                      ))}
                    </>
                  )}
                  {activeTab === 'econ' && (
                    <>
                      <div className="arch-session-econ">
                        {[['₹6.40', 'Est. cost / execution'], ['₹9.10', 'Est. cost / accepted outcome'], ['~6 min', 'Current manual effort'], ['~45 sec', 'Human review (agent-assisted)']].map(([n, l]) => (
                          <div key={l} className="arch-session-econ-cell"><div className="en">{n}</div><div className="el">{l}</div></div>
                        ))}
                      </div>
                      <div className="arch-session-assump" style={{ marginTop: 18 }}>⚠ <span>Estimates assume GPT/Claude-class model pricing at current published rates and 40 executions/month; not a guaranteed cost.</span></div>
                    </>
                  )}
                  {activeTab === 'pilot' && (
                    <>
                      {[
                        ['Pilot scope', 'One commodity category (bearings), 3 vendors'],
                        ['Sample data needed', '12 historical vendor quotes across formats'],
                        ['Integrations required', 'Read-only SAP B1 export (CSV acceptable for pilot)'],
                        ['Success criteria', '≥90% field-extraction accuracy, under 5 min turnaround'],
                        ['Timeline', '4–6 weeks: setup → shadow mode → live comparison → sign-off'],
                        ['Production gaps', 'Live SAP write-back and multi-currency support not yet built'],
                      ].map(([k, v]) => (
                        <div key={k} className="arch-session-kv"><span className="k">{k}</span><span className="v">{v}</span></div>
                      ))}
                    </>
                  )}
                </div>
                <div className="arch-session-actions">
                  <button type="button" className="arch-session-btn primary" onClick={() => goTo('proof')}>Test it on real quotes →</button>
                </div>
              </div>
            )}

            {stage === 'proof' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">06 · Live proof-of-work</div>
                <h2 className="arch-session-stage-h">Test a small version of this workflow now</h2>
                <p className="arch-session-stage-p">Upload up to 5 files, 10MB each. PDF, DOCX, XLSX, CSV, PNG or JPG. Files are deleted with this session.</p>
                <div className="arch-session-dropzone">
                  <div className="arch-session-dz-left">
                    <div className="arch-session-dz-icon">⇪</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>3 files ready</div>
                      <div className="arch-session-dz-sub">Drag files here or browse</div>
                    </div>
                  </div>
                  <button type="button" className="arch-session-btn primary" onClick={runProof} disabled={proofRunning}>
                    {proofDone ? 'Analysis complete ✓' : proofRunning ? 'Analysing…' : 'Run analysis →'}
                  </button>
                </div>
                <div className="arch-session-files">
                  {['Vendor_A_Quote.pdf · 2.1MB', 'Vendor_B_Quote.pdf · 1.4MB', 'Vendor_C_Quote.xlsx · 340KB'].map(f => (
                    <span key={f} className="arch-session-file">📄 {f}</span>
                  ))}
                </div>
                <div className="arch-session-steptrack">
                  {PROOF_STEPS.map((label, i) => (
                    <div key={label} className={`arch-session-st${i < proofStep ? ' done' : ''}`}>
                      <div className="c">{i + 1}</div>
                      <div className="l">{label}</div>
                    </div>
                  ))}
                </div>
                {proofDone && (
                  <div className="arch-session-proof-results">
                    <table className="arch-session-cmp">
                      <thead><tr><th>Field</th><th>Vendor A</th><th>Vendor B</th><th>Vendor C</th></tr></thead>
                      <tbody>
                        <tr><td>Unit price (₹, bearing 6205)</td><td className="best">412</td><td>438</td><td>429</td></tr>
                        <tr><td>Lead time</td><td>12 days</td><td className="best">7 days</td><td>10 days</td></tr>
                        <tr><td>Payment terms</td><td>Net 30</td><td>Net 15</td><td className="best">Net 45</td></tr>
                        <tr><td>Warranty</td><td>12 months</td><td className="flag">Not stated, verify manually</td><td>18 months</td></tr>
                        <tr><td>Total landed cost (500 units)</td><td className="best">₹2,06,000</td><td>₹2,19,000</td><td>₹2,14,500</td></tr>
                      </tbody>
                    </table>
                    <div className="arch-session-assump">⚠ <span><b>1 field needs human verification:</b> Vendor B&apos;s warranty term was not stated in the quote. Confirm before awarding.</span></div>
                    <div className="arch-session-card green-border">
                      <h4 style={{ color: '#8FE0BB' }}>Recommendation</h4>
                      <p>Vendor A offers the lowest total landed cost and matches your historical warranty baseline. Vendor B is faster but has an unconfirmed warranty term. Recommend a one-line clarification email before deciding on cost alone.</p>
                    </div>
                    <div className="arch-session-actions">
                      <button type="button" className="arch-session-btn primary" onClick={() => goTo('results')}>See full results →</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {stage === 'results' && (
              <div className="arch-session-panel">
                <div className="arch-session-stage-kicker">07 · Results & conversion</div>
                <h2 className="arch-session-stage-h">Your assessment is ready</h2>
                <p className="arch-session-stage-p">Everything below is saved to your report and linked to your assessment ID for the BlaiseLogic team.</p>
                <div className="arch-session-card">
                  <h4>Report contents</h4>
                  <div className="arch-session-checklist">
                    {['Executive summary', 'Company context, Meridian Industrial Supply', 'Current workflow, vendor quote comparison', 'Opportunity map, 3 ranked agents', 'Recommended agent & architecture, Quote Comparison Agent', 'Live proof result, 3 vendor quotes compared', 'Economics, ₹6.40 / execution, ₹9.10 / accepted outcome', 'Risks, assumptions & 4–6 week pilot roadmap'].map(item => (
                      <div key={item} className="arch-session-chk"><span className="ok">✓</span>{item}</div>
                    ))}
                  </div>
                  <div className="arch-session-actions" style={{ marginTop: 20 }}>
                    <button type="button" className="arch-session-btn primary">Download PDF report</button>
                    <button type="button" className="arch-session-btn ghost">Email me this report</button>
                  </div>
                </div>
                <div className="arch-session-cta-card">
                  <div>
                    <h4>Turn this into a working pilot</h4>
                    <p>Book a strategy call. Your blueprint and proof result will already be on the table.</p>
                  </div>
                  <a className="arch-session-btn primary" href="https://calendar.app.google/LsSjs7YWcX5VCKRVA" target="_blank" rel="noreferrer">Book a strategy call →</a>
                </div>
                <div className="arch-session-brandfoot">Designed by BlaiseLogic AI Systems Studio · Workflow economics measured by MetricAI</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
