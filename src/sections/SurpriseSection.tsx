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

        <div className="royal-card mx-auto mt-10 w-full max-w-md p-5 sm:p-6">
          <div className="relative mx-auto h-[360px] w-full max-w-[320px] [perspective:1300px]">
            <motion.button
              type="button"
              onClick={() => {
                setIsOpen((current) => !current)
              }}
              className="absolute inset-0 w-full rounded-2xl border border-royal-gold/40 bg-gradient-to-b from-royal-wine to-royal-burgundyDark"
              aria-label={isOpen ? 'Close invitation envelope' : 'Open invitation envelope'}
            >
              <motion.div
                initial={false}
                animate={isOpen ? { y: -96, opacity: 1 } : { y: 0, opacity: 0.96 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 bottom-4 top-14 rounded-xl border border-royal-gold/30 bg-royal-ivory px-5 py-5 text-left text-royal-text"
              >
                <p className="whitespace-pre-line font-serif text-sm leading-relaxed text-royal-text">
                  {config.wedding.invitationMessage}
                </p>
                <p className="mt-4 font-script text-3xl text-[#7a1b2e]">
                  {config.groom.name} &amp; {config.bride.name}
                </p>
                <p className="mt-1 font-serif text-xs uppercase tracking-[0.15em] text-[#7a1b2e]">
                  {config.wedding.dateRangeLabel}
                </p>
              </motion.div>

              <motion.div
                initial={false}
                animate={isOpen ? { rotateX: -165, y: -2 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top' }}
                className="absolute left-0 right-0 top-0 h-[55%] rounded-t-2xl border-b border-royal-gold/30 bg-gradient-to-b from-royal-burgundy to-royal-wine"
              >
                <div className="mx-auto mt-8 h-0 w-0 border-l-[118px] border-r-[118px] border-t-[84px] border-l-transparent border-r-transparent border-t-royal-gold/35" />
                <div className="absolute inset-x-0 bottom-6 text-center">
                  <p className="font-serif text-xs uppercase tracking-[0.18em] text-royal-goldLight">
                    Invitation Seal
                  </p>
                </div>
              </motion.div>
            </motion.button>
          </div>

          <div className="mt-6 text-center">
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
