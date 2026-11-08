import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleClick}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          className="fixed bottom-24 left-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal-gold/60 bg-royal-burgundyDark/90 text-royal-goldLight shadow-gold backdrop-blur-sm transition hover:-translate-y-0.5 hover:text-amber-100 md:bottom-5 md:left-auto md:right-5 md:h-12 md:w-12"
        >
          <ArrowUp size={20} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
