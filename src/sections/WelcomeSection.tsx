import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flower2 } from 'lucide-react'
import { doorOpenLeft, doorOpenRight } from '@/components/animations/variants'
import { FloatingLanterns } from '@/components/invitation/FloatingLanterns'
import { FloatingParticles } from '@/components/invitation/FloatingParticles'
import { useReducedMotionPreference } from '@/hooks/useReducedMotion'

interface WelcomeSectionProps {
  groomName: string
  brideName: string
  dateLabel: string
  backgroundImage: string
  onOpenStarted?: () => void
  onOpened: () => void
}

export function WelcomeSection({
  groomName,
  brideName,
  dateLabel,
  backgroundImage,
  onOpenStarted,
  onOpened,
}: WelcomeSectionProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [isOpening, setIsOpening] = useState(false)
  const reducedMotionDoorState = isOpening
    ? { opacity: 0.12, transition: { duration: 0.35 } }
    : { opacity: 1, transition: { duration: 0.2 } }

  const openInvitation = () => {
    if (isOpening) {
      return
    }

    onOpenStarted?.()
    setIsOpening(true)

    const delay = prefersReducedMotion ? 550 : 2200
    window.setTimeout(() => {
      onOpened()
    }, delay)
  }

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[90] flex min-h-svh items-center justify-center overflow-hidden px-4 pb-4 pt-10 sm:px-6"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15, 3, 7, 0.58), rgba(12, 2, 6, 0.82)), url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <FloatingLanterns />
      <FloatingParticles className="opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(244,217,154,0.36),transparent_34%)]" />

      <motion.div
        animate={isOpening ? { scale: 1.04 } : { scale: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 1, 0.22, 1] }}
        className="relative w-full max-w-[440px] [perspective:1450px]"
      >
        <div className="palace-arch relative h-[73svh] min-h-[450px] w-full overflow-hidden rounded-[1.7rem] px-3 pb-5 pt-9">
          <div className="absolute left-1/2 top-4 h-7 w-7 -translate-x-1/2 text-royal-goldLight">
            <Flower2 size={28} />
          </div>
          <div className="absolute left-6 right-6 top-14 h-px bg-gradient-to-r from-transparent via-royal-gold/80 to-transparent" />

          <motion.div
            animate={isOpening ? { opacity: 1, scale: 1.2 } : { opacity: 0.05, scale: 0.7 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="light-burst pointer-events-none absolute inset-5"
          />

          <div className="relative flex h-full flex-col justify-between">
            <div className="px-4 text-center">
              <p className="font-serif text-[0.65rem] uppercase tracking-[0.26em] text-royal-goldLight/95 sm:text-xs">
                An Invitation to Celebrate Love
              </p>
              <h1 className="mt-5 font-serif text-2xl uppercase tracking-[0.12em] text-royal-ivory sm:text-3xl">
                {groomName}
              </h1>
              <p className="my-1 font-script text-4xl text-royal-goldLight sm:text-5xl">
                &
              </p>
              <h2 className="font-serif text-2xl uppercase tracking-[0.12em] text-royal-ivory sm:text-3xl">
                {brideName}
              </h2>
              <p className="mt-3 font-serif text-[0.7rem] uppercase tracking-[0.24em] text-royal-goldLight sm:text-xs">
                {dateLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              className="relative mx-auto block h-[52%] w-[94%] max-w-[360px] cursor-pointer [transform-style:preserve-3d]"
              aria-label="Open palace entrance"
            >
              <div className="absolute inset-y-4 left-1/2 z-[3] w-[1px] -translate-x-1/2 bg-gradient-to-b from-royal-gold/30 via-royal-gold to-royal-gold/30" />

              <motion.div
                variants={doorOpenLeft}
                animate={
                  prefersReducedMotion
                    ? reducedMotionDoorState
                    : isOpening
                      ? 'open'
                      : 'closed'
                }
                initial="closed"
                style={{ transformOrigin: 'left center' }}
                className="palace-door palace-door-left absolute inset-y-0 left-0 w-1/2 rounded-l-[1.1rem]"
              />

              <motion.div
                variants={doorOpenRight}
                animate={
                  prefersReducedMotion
                    ? reducedMotionDoorState
                    : isOpening
                      ? 'open'
                      : 'closed'
                }
                initial="closed"
                style={{ transformOrigin: 'right center' }}
                className="palace-door palace-door-right absolute inset-y-0 right-0 w-1/2 rounded-r-[1.1rem]"
              />
            </button>

            <motion.button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              animate={
                isOpening
                  ? { opacity: 0.4, scale: 0.98 }
                  : { opacity: 1, scale: 1 }
              }
              className="animate-gold-pulse mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-royal-goldLight transition hover:text-amber-100 disabled:cursor-not-allowed"
              aria-label="Tap to open the invitation"
            >
              <Flower2 size={14} />
              Tap to Open the Invitation
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
