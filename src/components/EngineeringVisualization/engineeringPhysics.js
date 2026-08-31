export const ENG_NODES = [
  { id: 'workflow', label: 'WORKFLOW', x: 0.5, y: 0.2, category: 'stage', desc: 'AI workflow / business process' },
  { id: 'agents', label: 'AI AGENTS', x: 0.25, y: 0.45, category: 'stage', desc: 'Agents & workflow automation' },
  { id: 'systems', label: 'DATA / API', x: 0.75, y: 0.45, category: 'stage', desc: 'Enterprise system integrations' },
  { id: 'prod', label: 'PRODUCTION', x: 0.5, y: 0.72, category: 'stage', desc: 'Deployment, observability & governance' }
]

export const ENG_CONNECTIONS = [
  { from: 'workflow', to: 'agents' },
  { from: 'agents', to: 'systems' },
  { from: 'systems', to: 'prod' }
]

export class EngineeringPhysics {
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
    
    this.layoutWidth = Math.max(w, 700)
    this.layoutHeight = Math.max(h, 450)
    this.scale = Math.min(w / this.layoutWidth, h / this.layoutHeight)
    this.offsetX = (w - this.layoutWidth * this.scale) / 2
    this.offsetY = (h - this.layoutHeight * this.scale) / 2

    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 900;
    const spreadMultiplier = isDesktop ? 1.3 : 1.0;

    if (this.nodes) {
      this.nodes.forEach(n => {
        const dx = n.origX - 0.5
        const dy = n.origY - 0.5
        n.normX = 0.5 + dx * spreadMultiplier
        n.normY = 0.5 + dy * spreadMultiplier

        n.baseX = n.normX * this.layoutWidth
        n.baseY = n.normY * this.layoutHeight
      })
    }
  }

  _initNodes() {
    this.nodes = ENG_NODES.map((n, i) => {
      return {
        ...n,
        origX: n.x,
        origY: n.y,
        normX: n.x,
        normY: n.y,
        baseX: 0,
        baseY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        scale: 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.4,
        opacity: 0,
        introDelay: i * 0.2,
        screenX: 0,
        screenY: 0
      }
    })
    
    this.resize(this.width, this.height)
    
    this.nodes.forEach(n => {
      n.x = n.baseX
      n.y = n.baseY
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
    
    // Continuous flow: spawn pulse from workflow to agents occasionally
    if (Math.random() < 0.015 && this.pulses.length < 3) {
      // Pick a random connection to spawn on, or always start from workflow
      // To simulate a pipeline, we can just randomly fire along any edge
      const conn = ENG_CONNECTIONS[Math.floor(Math.random() * ENG_CONNECTIONS.length)]
      this.pulses.push({ conn, progress: 0, speed: 0.008 + Math.random() * 0.004 })
    }

    for (let i = this.pulses.length - 1; i >= 0; i--) {
      this.pulses[i].progress += this.pulses[i].speed
      if (this.pulses[i].progress >= 1) {
        this.pulses.splice(i, 1)
      }
    }

    const interactionRadius = 150
    const gravityStrength = 0.06
    
    let closestNode = null
    let closestDist = interactionRadius

    this.nodes.forEach(node => {
      if (this.time > node.introDelay && node.opacity < 1) {
        node.opacity += dt * 0.002
      }

      const floatX = Math.sin(this.time * node.speed + node.phase) * 5
      const floatY = Math.cos(this.time * node.speed * 0.8 + node.phase) * 5
      
      const targetBaseX = node.baseX + floatX
      const targetBaseY = node.baseY + floatY

      let forceX = 0
      let forceY = 0
      let targetScale = 1
      
      if (this.mouseX > 0) {
        const mappedMouseX = (this.mouseX - this.offsetX) / this.scale
        const mappedMouseY = (this.mouseY - this.offsetY) / this.scale

        const dx = mappedMouseX - targetBaseX
        const dy = mappedMouseY - targetBaseY
        const dist = Math.sqrt(dx*dx + dy*dy)
        
        if (dist < interactionRadius) {
          if (dist < closestDist) {
            closestDist = dist
            closestNode = node
          }
          const pull = 1 - (dist / interactionRadius)
          forceX = dx * pull * gravityStrength
          forceY = dy * pull * gravityStrength
          targetScale = 1 + pull * 0.08
        }
      }

      const targetX = targetBaseX + forceX
      const targetY = targetBaseY + forceY

      node.vx = (node.vx + (targetX - node.x) * 0.08) * 0.75
      node.vy = (node.vy + (targetY - node.y) * 0.08) * 0.75
      
      node.x += node.vx
      node.y += node.vy
      node.scale += (targetScale - node.scale) * 0.15

      node.screenX = node.x * this.scale + this.offsetX
      node.screenY = node.y * this.scale + this.offsetY
    })
    
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
    ctx.save()
    ctx.translate(this.offsetX, this.offsetY)
    ctx.scale(this.scale, this.scale)

    // Draw connections
    ENG_CONNECTIONS.forEach(conn => {
      const a = this.nodes.find(n => n.id === conn.from)
      const b = this.nodes.find(n => n.id === conn.to)
      if (!a || !b) return
      
      const op = Math.min(a.opacity, b.opacity) * 0.3
      
      ctx.beginPath()
      let midX = (a.x + b.x) / 2
      let midY = (a.y + b.y) / 2
      
      if (this.mouseX > 0) {
        const mappedMouseX = (this.mouseX - this.offsetX) / this.scale
        const mappedMouseY = (this.mouseY - this.offsetY) / this.scale
        const dx = mappedMouseX - midX
        const dy = mappedMouseY - midY
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 150) {
          const pull = (1 - dist / 150) * 0.1
          midX += dx * pull
          midY += dy * pull
        }
      }

      ctx.moveTo(a.x, a.y)
      ctx.quadraticCurveTo(midX, midY, b.x, b.y)
      ctx.strokeStyle = `rgba(100, 140, 255, ${op})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    })

    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 900;
    const sizeMultiplier = isDesktop ? 1.4 : 1.0;

    // Draw pulses
    this.pulses.forEach(p => {
      const a = this.nodes.find(n => n.id === p.conn.from)
      const b = this.nodes.find(n => n.id === p.conn.to)
      if (!a || !b) return
      
      const px = a.x + (b.x - a.x) * p.progress
      const py = a.y + (b.y - a.y) * p.progress
      
      ctx.beginPath()
      ctx.arc(px, py, 3.5 * sizeMultiplier, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(36, 80, 255, ${Math.sin(p.progress * Math.PI)})`
      ctx.fill()
    })

    // Draw nodes
    this.nodes.forEach(node => {
      ctx.save()
      ctx.translate(node.x, node.y)
      ctx.scale(node.scale, node.scale)
      
      const isHovered = this.hoveredNodeId === node.id
      const width = 110 * sizeMultiplier
      const height = 36 * sizeMultiplier
      const rx = 6 * sizeMultiplier
      const hx = width / 2
      const hy = height / 2

      // Node background
      ctx.beginPath()
      ctx.roundRect(-hx, -hy, width, height, rx)
      ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`
      ctx.fill()
      
      // Node border
      ctx.lineWidth = 1.5 * sizeMultiplier
      ctx.strokeStyle = isHovered ? `rgba(58, 99, 222, ${node.opacity})` : `rgba(209, 207, 199, ${node.opacity})` // var(--line-strong)
      ctx.stroke()
      
      // Glow when hovered
      if (isHovered) {
        ctx.shadowColor = 'rgba(58, 99, 222, 0.2)'
        ctx.shadowBlur = 12 * sizeMultiplier
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Label
      const fontSize = 11.5 * sizeMultiplier
      ctx.fillStyle = isHovered ? `rgba(58, 99, 222, ${node.opacity})` : `rgba(13, 17, 23, ${node.opacity})`
      ctx.font = `600 ${fontSize}px 'Outfit', monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.letterSpacing = '0.08em'
      ctx.fillText(node.label, 0, 1 * sizeMultiplier) // slight manual y offset for optical centering

      ctx.restore()
    })

    // Draw "SYSTEM OPERATIONAL" health indicator near Production node
    const prodNode = this.nodes.find(n => n.id === 'prod')
    if (prodNode && prodNode.opacity > 0.5) {
      const pulse = Math.sin(this.time * 3) * 0.5 + 0.5 // 0 to 1
      const ix = prodNode.x
      const iy = prodNode.y + (45 * sizeMultiplier)
      
      ctx.globalAlpha = prodNode.opacity
      ctx.beginPath()
      ctx.arc(ix - (55 * sizeMultiplier), iy, 3.5 * sizeMultiplier, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(31, 174, 110, ${0.4 + pulse * 0.6})` // var(--green)
      ctx.fill()
      ctx.shadowColor = 'rgba(31, 174, 110, 0.4)'
      ctx.shadowBlur = pulse * 8 * sizeMultiplier
      ctx.fill()
      ctx.shadowBlur = 0
      
      ctx.fillStyle = `rgba(107, 114, 128, 1)` // var(--ink-faint)
      const fontSize = 9.5 * sizeMultiplier
      ctx.font = `500 ${fontSize}px 'General Sans', sans-serif`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.letterSpacing = '0.05em'
      ctx.fillText('SYSTEM OPERATIONAL', ix - (45 * sizeMultiplier), iy + 1 * sizeMultiplier)
      ctx.globalAlpha = 1
    }
    
    ctx.restore()
  }
}
