import { useEffect, useRef, useState } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    setIsEnabled(true)

    const handlePointerMove = (event: PointerEvent) => {
      const glowElement = glowRef.current
      if (!glowElement) {
        return
      }

      glowElement.style.left = `${event.clientX}px`
      glowElement.style.top = `${event.clientY}px`
      glowElement.classList.add('is-visible')
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  if (!isEnabled) {
    return null
  }

  return (
    <div
      ref={glowRef}
      className="im-cursor-glow"
      style={{
        width: '416px',
        height: '416px',
        background: 'radial-gradient(circle, #b08d57 0%, transparent 65%)',
      }}
      aria-hidden
    />
  )
}
