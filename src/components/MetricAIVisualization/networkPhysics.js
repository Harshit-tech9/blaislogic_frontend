import { METRICAI_NODES, CONNECTIONS } from './nodes'

export class NetworkPhysics {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.time = 0
    this.mouseX = -9999
    this.mouseY = -9999
    
    this.hoveredNodeId = null
    this.onHoverChange = null
    
    this.pulses = []
    
    this._initNodes()
  }

  resize(w, h) {
    this.width = w
    this.height = h
    this.nodes.forEach(n => {
      n.baseX = n.normX * w
      n.baseY = n.normY * h
    })
  }

  _initNodes() {
    this.nodes = METRICAI_NODES.map((n, i) => {
      return {
        ...n,
        normX: n.x,
        normY: n.y,
        baseX: n.x * this.width,
        baseY: n.y * this.height,
        x: n.x * this.width,
        y: n.y * this.height,
        vx: 0,
        vy: 0,
        scale: 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        opacity: 0,
        introDelay: i * 0.12
      }
    })
  }

  setMouse(x, y) {
    this.mouseX = x
    this.mouseY = y
  }

  setHoverCallback(cb) {
    this.onHoverChange = cb
  }

  update(dt) {
    this.time += dt * 0.001
    
    // Random pulses
    if (Math.random() < 0.03) {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)]
      this.pulses.push({ conn, progress: 0, speed: 0.01 + Math.random() * 0.01 })
    }

    // Update pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      this.pulses[i].progress += this.pulses[i].speed
      if (this.pulses[i].progress >= 1) {
        this.pulses.splice(i, 1)
      }
    }

    const interactionRadius = 140
    const gravityStrength = 0.05
    
    let closestNode = null
    let closestDist = interactionRadius

    this.nodes.forEach(node => {
      // Intro fade in
      if (this.time > node.introDelay && node.opacity < 1) {
        node.opacity += dt * 0.002
      }

      // Idle float (noise)
      const floatX = Math.sin(this.time * node.speed + node.phase) * 6
      const floatY = Math.cos(this.time * node.speed * 0.8 + node.phase) * 6
      
      const targetBaseX = node.baseX + floatX
      const targetBaseY = node.baseY + floatY

      // Cursor gravity
      let forceX = 0
      let forceY = 0
      let targetScale = 1
      
      if (this.mouseX > 0) {
        const dx = this.mouseX - targetBaseX
        const dy = this.mouseY - targetBaseY
        const dist = Math.sqrt(dx*dx + dy*dy)
        
        if (dist < interactionRadius) {
          if (dist < closestDist) {
            closestDist = dist
            closestNode = node
          }
          const pull = 1 - (dist / interactionRadius)
          forceX = dx * pull * gravityStrength
          forceY = dy * pull * gravityStrength
          targetScale = 1 + pull * 0.15 
        }
      }

      const targetX = targetBaseX + forceX
      const targetY = targetBaseY + forceY

      // Spring physics
      node.vx = (node.vx + (targetX - node.x) * 0.08) * 0.75
      node.vy = (node.vy + (targetY - node.y) * 0.08) * 0.75
      
      node.x += node.vx
      node.y += node.vy
      node.scale += (targetScale - node.scale) * 0.12
    })
    
    // Notify React if hover state changed
    const closestId = closestNode ? closestNode.id : null
    if (this.hoveredNodeId !== closestId) {
      this.hoveredNodeId = closestId
      if (this.onHoverChange) {
        this.onHoverChange(closestNode)
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)

    // Draw connections
    CONNECTIONS.forEach(conn => {
      const a = this.nodes.find(n => n.id === conn.from)
      const b = this.nodes.find(n => n.id === conn.to)
      if (!a || !b) return
      
      const op = Math.min(a.opacity, b.opacity) * 0.25
      
      ctx.beginPath()
      
      // Connection distortion - bend toward cursor
      let midX = (a.x + b.x) / 2
      let midY = (a.y + b.y) / 2
      
      if (this.mouseX > 0) {
        const dx = this.mouseX - midX
        const dy = this.mouseY - midY
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 150) {
          const pull = (1 - dist / 150) * 0.12
          midX += dx * pull
          midY += dy * pull
        }
      }

      ctx.moveTo(a.x, a.y)
      ctx.quadraticCurveTo(midX, midY, b.x, b.y)
      ctx.strokeStyle = `rgba(100, 140, 255, ${op})`
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw pulses
    this.pulses.forEach(p => {
      const a = this.nodes.find(n => n.id === p.conn.from)
      const b = this.nodes.find(n => n.id === p.conn.to)
      if (!a || !b) return
      
      const px = a.x + (b.x - a.x) * p.progress
      const py = a.y + (b.y - a.y) * p.progress
      
      ctx.beginPath()
      ctx.arc(px, py, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(36, 80, 255, ${Math.sin(p.progress * Math.PI)})`
      ctx.fill()
    })

    // Draw nodes
    this.nodes.forEach(node => {
      const isCore = node.category === 'core'
      const isEcon = node.category === 'economics'
      const r = (isCore ? 16 : isEcon ? 6 : 4.5) * node.scale

      if (isCore) {
        const pulse = Math.sin(this.time * 2) * 2
        
        // Glow
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 50)
        grd.addColorStop(0, `rgba(36, 80, 255, ${node.opacity * 0.2})`)
        grd.addColorStop(1, 'rgba(36, 80, 255, 0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(node.x, node.y, 50, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.fillStyle = `rgba(36, 80, 255, ${node.opacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, r + pulse, 0, Math.PI * 2)
        ctx.fill()
      } else {
        const ng = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4)
        ng.addColorStop(0, `rgba(50, 90, 255, ${node.opacity * 0.25})`)
        ng.addColorStop(1, 'rgba(50, 90, 255, 0)')
        ctx.fillStyle = ng
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(30, 64, 220, ${node.opacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Label
      ctx.fillStyle = isCore ? `rgba(20, 40, 150, ${node.opacity})` : `rgba(100, 120, 180, ${node.opacity})`
      ctx.font = isCore ? `600 13px 'Outfit', monospace` : `500 12px 'Outfit', sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, node.x, node.y + r + 14)
    })
  }
}
