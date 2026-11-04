import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-1 bg-black/10 backdrop-blur-sm">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-amber-200 via-royal-gold to-amber-100"
        animate={{ scaleX: progress }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />
    </div>
  )
}
