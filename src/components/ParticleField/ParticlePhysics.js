export class ParticlePhysics {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.mouseX = -9999
    this.mouseY = -9999
    this.particles = []
    
    this._initParticles()
  }

  _initParticles() {
    const numParticles = 800 // very dense starfield
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        originX: Math.random() * this.width,
        originY: Math.random() * this.height,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.1
      })
    }
  }

  resize(w, h) {
    this.width = w
    this.height = h
    // Spread out particles evenly again
    this.particles.forEach(p => {
      p.originX = Math.random() * w
      p.originY = Math.random() * h
      p.x = p.originX
      p.y = p.originY
    })
  }

  setMouse(x, y) {
    this.mouseX = x
    this.mouseY = y
  }

  update(dt) {
    const timeFactor = dt * 0.06
    const repelRadius = 180
    const repelForce = 0.6

    this.particles.forEach(p => {
      // Natural slow drift
      p.originX += p.speedX * timeFactor
      p.originY += p.speedY * timeFactor

      // Wrap around screen
      if (p.originX < 0) p.originX = this.width
      if (p.originX > this.width) p.originX = 0
      if (p.originY < 0) p.originY = this.height
      if (p.originY > this.height) p.originY = 0

      // Calculate cursor repel
      let forceX = 0
      let forceY = 0

      if (this.mouseX > 0) {
        const dx = p.x - this.mouseX
        const dy = p.y - this.mouseY
        const distSq = dx * dx + dy * dy
        const repelRadiusSq = repelRadius * repelRadius

        if (distSq < repelRadiusSq) {
          const dist = Math.sqrt(distSq)
          const force = (1 - (dist / repelRadius)) * repelForce
          // push away
          forceX = (dx / dist) * force * 150 
          forceY = (dy / dist) * force * 150
        }
      }

      // Target position is origin + force
      const targetX = p.originX + forceX
      const targetY = p.originY + forceY

      // Spring towards target
      p.vx = (p.vx + (targetX - p.x) * 0.08) * 0.75
      p.vy = (p.vy + (targetY - p.y) * 0.08) * 0.75
      
      p.x += p.vx
      p.y += p.vy
    })
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
    
    // Determine if light mode or dark mode for dot color based on a css var if possible,
    // but for now, we'll use a neutral dark gray/blue that works in both, or light blue.
    // The user screenshot showed white/grey dots on black background.
    ctx.fillStyle = 'rgba(100, 110, 150, 1)'

    this.particles.forEach(p => {
      ctx.globalAlpha = p.opacity
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1.0
  }
}
