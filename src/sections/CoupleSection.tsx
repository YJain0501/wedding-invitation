import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { fadeUp, scaleIn, slideFromLeft, slideFromRight, staggerChildren } from '@/components/animations/variants'
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
}: CoupleCardProps) {
  return (
    <article className="royal-card overflow-hidden rounded-2xl p-4 text-center sm:p-6">
      <p className="mb-4 font-serif text-xs uppercase tracking-[0.22em] text-royal-goldLight">
        {label}
      </p>
      <div className="relative mx-auto h-72 w-full max-w-[270px] [perspective:1200px] sm:h-80">
        <LuxuryImage
          src={image}
          alt={`${name} portrait`}
          className="h-full w-full rounded-[1.8rem] border border-royal-gold/45 object-cover shadow-gold"
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
            <p className="px-5 font-serif text-sm uppercase tracking-[0.16em] text-royal-goldLight">
              {overlayLabel}
            </p>
          </div>
        </motion.div>
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
  const [isRevealed, setIsRevealed] = useState(false)

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
        onViewportEnter={() => {
          setIsRevealed(true)
        }}
        variants={staggerChildren}
      >
        <motion.div variants={fadeUp}>
          <RoyalSectionHeader
            eyebrow="Couple Portrait Reveal"
            title="A Glimpse of the Couple"
            description="Tap reveal to unveil the bride and groom portraits."
          />
        </motion.div>

        <motion.div variants={scaleIn} className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRevealed((current) => !current)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
          >
            <Eye size={14} />
            {isRevealed ? 'Hide Portraits' : 'Reveal Portraits'}
          </button>
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
              revealed={isRevealed}
              overlayLabel="Tap Reveal for Groom"
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
              revealed={isRevealed}
              overlayLabel="Tap Reveal for Bride"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
