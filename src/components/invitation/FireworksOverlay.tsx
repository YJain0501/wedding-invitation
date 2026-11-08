interface FireworksOverlayProps {
  className?: string
}

const FIREWORKS = [
  { left: '14%', top: '24%', delay: '0.2s', duration: '3.2s', size: 102 },
  { left: '31%', top: '28%', delay: '1.1s', duration: '3.6s', size: 96 },
  { left: '48%', top: '22%', delay: '0.7s', duration: '3.4s', size: 108 },
  { left: '65%', top: '30%', delay: '1.8s', duration: '3.8s', size: 94 },
  { left: '82%', top: '24%', delay: '1.35s', duration: '3.5s', size: 100 },
]

export function FireworksOverlay({ className }: FireworksOverlayProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`.trim()}
    >
      {FIREWORKS.map((firework) => (
        <span
          key={`${firework.left}-${firework.top}-${firework.delay}`}
          className="hero-firework"
          style={{
            left: firework.left,
            top: firework.top,
            width: `${firework.size}px`,
            height: `${firework.size}px`,
            animationDelay: firework.delay,
            animationDuration: firework.duration,
          }}
        />
      ))}
    </div>
  )
}
