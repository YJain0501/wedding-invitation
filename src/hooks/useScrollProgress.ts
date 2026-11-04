import { useEffect, useState } from 'react'

function calculateScrollProgress() {
  const scrollTop = window.scrollY
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight

  if (documentHeight <= 0) {
    return 0
  }

  return Math.min(scrollTop / documentHeight, 1)
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      setProgress(calculateScrollProgress())
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return progress
}
