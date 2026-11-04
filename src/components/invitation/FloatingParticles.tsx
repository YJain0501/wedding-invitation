const PARTICLES = [
  { left: '6%', size: 6, delay: '0s', duration: '7.2s' },
  { left: '14%', size: 4, delay: '1.2s', duration: '6.8s' },
  { left: '22%', size: 5, delay: '0.5s', duration: '8.1s' },
  { left: '31%', size: 7, delay: '2s', duration: '7.6s' },
  { left: '39%', size: 4, delay: '1.1s', duration: '6.7s' },
  { left: '48%', size: 5, delay: '0.7s', duration: '8.2s' },
  { left: '55%', size: 6, delay: '2.3s', duration: '8.5s' },
  { left: '63%', size: 4, delay: '0.2s', duration: '7.1s' },
  { left: '70%', size: 6, delay: '1.8s', duration: '8.4s' },
  { left: '78%', size: 5, delay: '0.4s', duration: '7.7s' },
  { left: '85%', size: 7, delay: '2.2s', duration: '8.8s' },
  { left: '92%', size: 5, delay: '1.4s', duration: '7.4s' },
]

interface FloatingParticlesProps {
  className?: string
}

export function FloatingParticles({ className }: FloatingParticlesProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`.trim()}
    >
      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.delay}`}
          className="particle-dot"
          style={{
            left: particle.left,
            bottom: '-1.5rem',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  )
}
