import { useEffect, useRef, useState } from 'react'
import { EngineeringPhysics } from './engineeringPhysics'

export default function EngineeringVisualization() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const physicsRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  
  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setup = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      
      if (w === 0 || h === 0) return

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      if (!physicsRef.current) {
        physicsRef.current = new EngineeringPhysics(w, h)
        physicsRef.current.setHoverCallback((node) => {
          setHoveredNode(node)
        })
      } else {
        physicsRef.current.resize(w, h)
      }
    }

    const observer = new ResizeObserver(() => setup())
    observer.observe(container)

    const tick = (now) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now
      const dt = Math.min(now - lastTimeRef.current, 40)
      lastTimeRef.current = now

      const p = physicsRef.current
      if (p) {
        if (!prefersReducedMotion) p.update(dt)
        p.draw(ctx)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!physicsRef.current || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    physicsRef.current.setMouse(e.clientX - rect.left, e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    if (physicsRef.current) physicsRef.current.setMouse(-9999, -9999)
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          cursor: hoveredNode ? 'pointer' : 'default'
        }}
      />
      
      {/* Hover Card */}
      {hoveredNode && (
        <div 
          style={{
            position: 'absolute',
            left: hoveredNode.screenX,
            top: hoveredNode.screenY - 30 * physicsRef.current?.scale,
            transform: 'translate(-50%, -100%)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--line)',
            padding: '10px 14px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            pointerEvents: 'none',
            minWidth: '140px',
            maxWidth: '180px',
            transition: 'all 0.1s ease',
            zIndex: 10,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
            {hoveredNode.label}
          </div>
          <div style={{ fontSize: '13px', lineHeight: 1.4, color: 'var(--ink-soft)', marginTop: '4px' }}>
            {hoveredNode.desc}
          </div>
        </div>
      )}
    </div>
  )
}
