import { useEffect, useRef } from 'react'
import { ParticlePhysics } from './ParticlePhysics'

export default function ParticleField() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const physicsRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // --- Size canvas to fill parent ---
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
        physicsRef.current = new ParticlePhysics(w, h)
      } else {
        physicsRef.current.resize(w, h)
      }
    }

    const observer = new ResizeObserver(() => setup())
    observer.observe(container)

    // --- Animation loop ---
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
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto'
        }}
      />
    </div>
  )
}
