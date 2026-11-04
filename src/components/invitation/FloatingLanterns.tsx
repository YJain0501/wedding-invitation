interface FloatingLanternsProps {
  className?: string
}

const LANTERNS = [
  { left: '10%', top: '8%', scale: '0.9', delay: '0.2s' },
  { left: '26%', top: '3%', scale: '0.75', delay: '1s' },
  { left: '74%', top: '5%', scale: '0.82', delay: '0.6s' },
  { left: '88%', top: '11%', scale: '0.95', delay: '1.4s' },
]

export function FloatingLanterns({ className }: FloatingLanternsProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`.trim()}
    >
      {LANTERNS.map((lantern) => (
        <div
          key={`${lantern.left}-${lantern.top}`}
          className="animate-lantern-sway absolute"
          style={{
            left: lantern.left,
            top: lantern.top,
            animationDelay: lantern.delay,
            transform: `scale(${lantern.scale})`,
          }}
        >
          <div className="mx-auto h-8 w-[2px] bg-gradient-to-b from-royal-gold/70 to-transparent" />
          <div className="relative h-14 w-10 rounded-b-[40%] rounded-t-xl border border-royal-gold/45 bg-gradient-to-b from-royal-gold/55 via-amber-300/25 to-royal-burgundyDark/90 shadow-gold">
            <span className="absolute left-1/2 top-2 block h-3 w-3 -translate-x-1/2 rounded-full bg-amber-200/85 blur-[1px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
