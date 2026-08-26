import { useEffect, useRef, useState } from 'react'

const DIMENSIONS = [
  { id: 'value', label: 'VALUE', cx: 200, cy: 50, angle: 0, text: 'Prioritise use cases by measurable value.' },
  { id: 'roi', label: 'ROI', cx: 350, cy: 200, angle: 90, text: 'Measure return on AI investment.' },
  { id: 'gov', label: 'GOVERNANCE', cx: 200, cy: 350, angle: 180, text: 'Measurement, controls and operating model.' },
  { id: 'cost', label: 'COST', cx: 50, cy: 200, angle: 270, text: 'Cost, pricing & margin design.' }
]

const SIGNALS = [
  { id: 's1', label: 'Models', r: 160, angle: 30, speed: 0.0005 },
  { id: 's2', label: 'Vendors', r: 120, angle: 120, speed: -0.0007 },
  { id: 's3', label: 'Margin', r: 180, angle: 210, speed: 0.0004 },
  { id: 's4', label: 'Risk', r: 140, angle: 280, speed: -0.0006 },
  { id: 's5', label: 'Usage', r: 100, angle: 330, speed: 0.0008 }
]

export default function AdvisoryVisualization() {
  const containerRef = useRef(null)
  const [hoveredDim, setHoveredDim] = useState(null)
  const [needleAngle, setNeedleAngle] = useState(0)
  
  const [signals, setSignals] = useState(SIGNALS.map(s => ({ ...s, currentAngle: s.angle })))
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Move needle randomly every 5 seconds
    const needleInterval = setInterval(() => {
      const randomDim = DIMENSIONS[Math.floor(Math.random() * DIMENSIONS.length)]
      setNeedleAngle(randomDim.angle)
    }, 5000)

    // Orbit signals
    let rafId
    let lastTime = performance.now()
    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now
      
      setSignals(prev => prev.map(s => ({
        ...s,
        currentAngle: s.currentAngle + s.speed * dt
      })))
      
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      clearInterval(needleInterval)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // SVG viewbox is 400x400. Map mouse to 400x400 space
    const mx = ((e.clientX - rect.left) / rect.width) * 400
    const my = ((e.clientY - rect.top) / rect.height) * 400

    let closest = null
    let minDist = 100 // interaction radius in SVG coords

    DIMENSIONS.forEach(dim => {
      const dist = Math.hypot(dim.cx - mx, dim.cy - my)
      if (dist < minDist) {
        minDist = dist
        closest = dim
      }
    })

    setHoveredDim(closest)
  }

  const handleMouseLeave = () => {
    setHoveredDim(null)
  }

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg viewBox="-30 -30 460 460" width="100%" height="100%" style={{ overflow: 'visible', maxWidth: '400px' }}>
        <defs>
          <style>
            {`
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes pulseCore { 
                0% { transform: scale(1); opacity: 0.8; } 
                50% { transform: scale(1.15); opacity: 1; } 
                100% { transform: scale(1); opacity: 0.8; } 
              }
              .advisory-ring { transform-origin: 200px 200px; animation: spin 40s linear infinite; }
              .advisory-core { transform-origin: 200px 200px; animation: pulseCore 4s ease-in-out infinite; }
              .dim-node { transition: all 0.3s ease; }
            `}
          </style>
          
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(58, 99, 222, 0.4)" />
            <stop offset="100%" stopColor="rgba(58, 99, 222, 0)" />
          </radialGradient>
        </defs>

        {/* Outer rotating ring */}
        <g className="advisory-ring">
          <circle cx="200" cy="200" r="150" fill="none" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
          <circle cx="200" cy="50" r="3" fill="var(--ink-soft)" />
          <circle cx="350" cy="200" r="3" fill="var(--ink-soft)" />
          <circle cx="200" cy="350" r="3" fill="var(--ink-soft)" />
          <circle cx="50" cy="200" r="3" fill="var(--ink-soft)" />
        </g>

        {/* Connections to center */}
        {DIMENSIONS.map(dim => {
          const isHovered = hoveredDim?.id === dim.id
          return (
            <line 
              key={`line-${dim.id}`}
              x1="200" y1="200" x2={dim.cx} y2={dim.cy} 
              stroke={isHovered ? 'var(--accent)' : 'var(--line-strong)'} 
              strokeWidth={isHovered ? 2 : 1}
              opacity={isHovered ? 0.8 : 0.4}
              style={{ transition: 'all 0.3s ease' }}
            />
          )
        })}

        {/* Needle */}
        <g style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '200px 200px', transition: 'transform 4s cubic-bezier(0.25, 1, 0.5, 1)' }}>
          <line x1="200" y1="200" x2="200" y2="90" stroke="var(--accent)" strokeWidth="2" opacity="0.8" />
          <polygon points="196,95 204,95 200,85" fill="var(--accent)" opacity="0.8" />
        </g>

        {/* Dimensions */}
        {DIMENSIONS.map(dim => {
          const isHovered = hoveredDim?.id === dim.id
          const scale = isHovered ? 1.15 : 1
          return (
            <g 
              key={dim.id} 
              className="dim-node" 
              style={{ transform: `translate(${dim.cx}px, ${dim.cy}px) scale(${scale})`, transformOrigin: '0 0' }}
            >
              <circle cx="0" cy="0" r="6" fill={isHovered ? 'var(--accent)' : 'var(--ink-soft)'} />
              {isHovered && <circle cx="0" cy="0" r="14" fill="var(--accent-soft-2)" />}
              
              <text 
                x="0" y={dim.id === 'value' ? -16 : dim.id === 'gov' ? 22 : 0} 
                dx={dim.id === 'cost' ? -16 : dim.id === 'roi' ? 16 : 0}
                textAnchor={dim.id === 'cost' ? 'end' : dim.id === 'roi' ? 'start' : 'center'}
                alignmentBaseline="middle"
                fill={isHovered ? 'var(--accent)' : 'var(--ink)'}
                fontSize="12"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                {dim.label}
              </text>
            </g>
          )
        })}

        {/* Orbiting Signals */}
        {signals.map(s => {
          const rad = s.currentAngle * (Math.PI / 180)
          const sx = 200 + Math.cos(rad) * s.r
          const sy = 200 + Math.sin(rad) * s.r
          return (
            <g key={s.id} style={{ transform: `translate(${sx}px, ${sy}px)` }}>
              <circle cx="0" cy="0" r="2.5" fill="var(--ink-faint)" opacity="0.6" />
              <text x="6" y="1" fill="var(--ink-faint)" fontSize="9" opacity="0.7" alignmentBaseline="middle">
                {s.label}
              </text>
            </g>
          )
        })}

        {/* Central Core */}
        <circle cx="200" cy="200" r="45" fill="url(#coreGlow)" className="advisory-core" />
        <circle cx="200" cy="200" r="32" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="26" fill="var(--accent-soft)" className="advisory-core" />
        <text x="200" y="202" textAnchor="middle" alignmentBaseline="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)" letterSpacing="0.05em">
          AI VALUE
        </text>

      </svg>

      {/* Hover Card HTML Overlay */}
      {hoveredDim && (
        <div 
          style={{
            position: 'absolute',
            left: `${(hoveredDim.cx / 400) * 100}%`,
            top: `${(hoveredDim.cy / 400) * 100}%`,
            transform: 'translate(-50%, -120%)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--line)',
            padding: '10px 14px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            pointerEvents: 'none',
            minWidth: '140px',
            maxWidth: '180px',
            zIndex: 10,
            transition: 'all 0.1s ease',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
            {hoveredDim.label}
          </div>
          <div style={{ fontSize: '13px', lineHeight: 1.4, color: 'var(--ink-soft)', marginTop: '4px' }}>
            {hoveredDim.text}
          </div>
        </div>
      )}
    </div>
  )
}
