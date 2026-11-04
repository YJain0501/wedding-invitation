import { useState } from 'react'

interface LuxuryImageProps {
  src: string
  alt: string
  className?: string
  fallbackLabel: string
}

export function LuxuryImage({
  src,
  alt,
  className,
  fallbackLabel,
}: LuxuryImageProps) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-royal-burgundy via-royal-wine to-royal-burgundyDark text-center ${className ?? ''}`.trim()}
      >
        <span className="px-4 font-serif text-sm uppercase tracking-[0.15em] text-royal-goldLight">
          {fallbackLabel}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        setHasError(true)
      }}
    />
  )
}
