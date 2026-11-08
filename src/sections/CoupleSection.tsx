import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, slideFromLeft, slideFromRight, staggerChildren } from '@/components/animations/variants'
import { LuxuryImage } from '@/components/common/LuxuryImage'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'

interface CoupleSectionProps {
  config: WeddingConfig
}

interface CoupleCardProps {
  label: string
  relationshipPrefix: string
  name: string
  image: string
  familyIntroduction?: string
  fallbackLabel: string
  revealed: boolean
  overlayLabel: string
  onReveal: () => void
}

function CoupleCard({
  label,
  relationshipPrefix,
  name,
  image,
  familyIntroduction,
  fallbackLabel,
  revealed,
  overlayLabel,
  onReveal,
}: CoupleCardProps) {
  return (
    <article className="royal-card overflow-hidden rounded-2xl p-4 text-center sm:p-6">
      <p className="mb-4 font-serif text-xs uppercase tracking-[0.22em] text-royal-goldLight">
        {label}
      </p>
      <div className="relative mx-auto h-72 w-full max-w-[270px] [perspective:1200px] sm:h-80">
        <button
          type="button"
          onClick={onReveal}
          className="relative block h-full w-full overflow-hidden rounded-[1.8rem] border border-royal-gold/45 text-left shadow-gold"
          aria-label={revealed ? `${name} portrait revealed` : `Reveal ${name} portrait`}
        >
          <LuxuryImage
            src={image}
            alt={`${name} portrait`}
            className="h-full w-full object-cover"
            fallbackLabel={fallbackLabel}
          />
          <motion.div
            initial={false}
            animate={
              revealed
                ? { rotateY: -168, opacity: 0.08 }
                : { rotateY: 0, opacity: 1 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="absolute inset-0 rounded-[1.8rem] border border-royal-gold/45 bg-gradient-to-br from-royal-burgundy to-royal-burgundyDark p-4"
          >
            <div className="grid h-full place-items-center rounded-[1.2rem] border border-royal-gold/35">
              <p className="px-5 text-center font-serif text-sm uppercase tracking-[0.16em] text-royal-goldLight">
                {revealed ? 'Portrait Revealed' : overlayLabel}
              </p>
            </div>
          </motion.div>
        </button>
      </div>
      <h3 className="mt-5 font-script text-5xl text-amber-100">{name}</h3>
      {familyIntroduction ? (
        <p className="mt-2 text-sm text-royal-cream/90">
          {relationshipPrefix} {familyIntroduction}
        </p>
      ) : null}
    </article>
  )
}

export function CoupleSection({ config }: CoupleSectionProps) {
  const [revealedPortraits, setRevealedPortraits] = useState({
    groom: false,
    bride: false,
  })

  const revealPortrait = (person: 'groom' | 'bride') => {
    setRevealedPortraits((current) => {
      if (current[person]) {
        return current
      }

      return {
        ...current,
        [person]: true,
      }
    })
  }

  return (
    <section
      id="couple"
      className="relative bg-gradient-to-b from-royal-burgundyDark to-[#2b070f] px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={staggerChildren}
      >
        <motion.div variants={fadeUp}>
          <RoyalSectionHeader
            eyebrow="Couple Portrait Reveal"
            title="A Glimpse of the Couple"
            description="By default, both portraits stay hidden. Tap each frame to reveal them."
          />
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <motion.div variants={slideFromLeft}>
            <CoupleCard
              label="The Groom"
              relationshipPrefix="Son of"
              name={config.groom.name}
              image={config.groom.image}
              familyIntroduction={config.groom.familyIntroduction}
              fallbackLabel="Groom Portrait"
              revealed={revealedPortraits.groom}
              overlayLabel="Tap Reveal for Groom"
              onReveal={() => {
                revealPortrait('groom')
              }}
            />
          </motion.div>

          <motion.div variants={slideFromRight}>
            <CoupleCard
              label="The Bride"
              relationshipPrefix="Daughter of"
              name={config.bride.name}
              image={config.bride.image}
              familyIntroduction={config.bride.familyIntroduction}
              fallbackLabel="Bride Portrait"
              revealed={revealedPortraits.bride}
              overlayLabel="Tap Reveal for Bride"
              onReveal={() => {
                revealPortrait('bride')
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
