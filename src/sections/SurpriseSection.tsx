import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'

interface SurpriseSectionProps {
  config: WeddingConfig
}

export function SurpriseSection({ config }: SurpriseSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      id="invitation-letter"
      className="bg-gradient-to-b from-[#2c070f] to-royal-burgundyDark px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <RoyalSectionHeader
          eyebrow="A Special Invitation for You"
          title="Open Your Invitation"
          description="Tap the envelope to reveal your invitation message."
        />

        <div className="royal-card mx-auto mt-8 w-full max-w-lg p-4 sm:p-6">
          <div className="relative mx-auto h-[420px] w-full max-w-[340px] [perspective:1300px] sm:h-[455px]">
            <motion.button
              type="button"
              onClick={() => {
                if (!isOpen) {
                  setIsOpen(true)
                }
              }}
              className="absolute inset-0 w-full overflow-hidden rounded-2xl border border-royal-gold/40 bg-gradient-to-b from-royal-wine to-royal-burgundyDark"
              aria-label={isOpen ? 'Invitation envelope opened' : 'Open invitation envelope'}
            >
              <motion.div
                initial={false}
                animate={
                  isOpen
                    ? { y: 0, opacity: 1, scale: 1 }
                    : { y: 220, opacity: 0, scale: 0.96 }
                }
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 bottom-3 top-16 rounded-xl border border-royal-gold/30 bg-royal-ivory px-4 py-4 text-left text-royal-text shadow-[0_18px_32px_rgba(0,0,0,0.18)]"
              >
                <div className="h-full overflow-y-auto pr-1">
                  <p className="whitespace-pre-line font-serif text-[0.95rem] leading-relaxed text-royal-text">
                    {config.wedding.invitationMessage}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={isOpen ? { rotateX: -165, y: -2 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-0 right-0 top-0 h-[54%] rounded-t-2xl border-b border-royal-gold/30 bg-gradient-to-b from-royal-burgundy to-royal-wine"
              >
                <div className="mx-auto mt-8 h-0 w-0 border-l-[108px] border-r-[108px] border-t-[78px] border-l-transparent border-r-transparent border-t-royal-gold/35 sm:border-l-[118px] sm:border-r-[118px] sm:border-t-[84px]" />
                <div className="absolute inset-x-0 bottom-6 text-center">
                  <p className="font-serif text-xs uppercase tracking-[0.18em] text-royal-goldLight">
                    Invitation Seal
                  </p>
                </div>
              </motion.div>
            </motion.button>
          </div>

          <motion.div
            initial={false}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0.7, y: -2 }}
            transition={{ duration: 0.35 }}
            className="mt-5 text-center"
          >
            <p className="font-script text-4xl leading-tight text-amber-100 sm:text-5xl">
              {config.groom.name}
            </p>
            <p className="font-script text-3xl leading-none text-royal-goldLight sm:text-4xl">
              &amp;
            </p>
            <p className="font-script text-4xl leading-tight text-amber-100 sm:text-5xl">
              {config.bride.name}
            </p>
            <p className="mt-1 font-serif text-[0.72rem] uppercase tracking-[0.18em] text-royal-goldLight sm:text-xs">
              {config.wedding.dateRangeLabel}
            </p>
          </motion.div>

          <div className="mt-4 text-center">
            <motion.p
              animate={{ y: [-1, 3, -1] }}
              transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
              className="inline-flex items-center gap-2 text-royal-goldLight"
            >
              <Heart size={15} fill="currentColor" />
              <span className="text-xs uppercase tracking-[0.16em]">
                {isOpen ? 'Invitation Opened' : 'Tap to Open'}
              </span>
              <Heart size={15} fill="currentColor" />
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
