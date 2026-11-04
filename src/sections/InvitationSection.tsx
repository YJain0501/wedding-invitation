import { motion } from 'framer-motion'
import { fadeUp, scaleIn, slideFromLeft, slideFromRight, staggerChildren } from '@/components/animations/variants'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'

interface InvitationSectionProps {
  config: WeddingConfig
}

export function InvitationSection({ config }: InvitationSectionProps) {
  return (
    <section
      id="invitation-message"
      className="relative overflow-hidden bg-gradient-to-b from-royal-burgundy to-royal-burgundyDark px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        <motion.div variants={fadeUp}>
          <RoyalSectionHeader
            eyebrow="Family Invitation"
            title="With the Blessings of Our Families"
          />
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="royal-card mx-auto mt-8 max-w-3xl p-6 text-center sm:p-8"
        >
          <p className="font-serif text-base leading-relaxed text-royal-cream sm:text-lg">
            With immense joy and gratitude, our families invite you to bless us with your presence as we begin a beautiful new chapter together.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <motion.article
            variants={slideFromLeft}
            className="royal-card rounded-2xl p-6 text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-royal-goldLight">
              Groom
            </p>
            <h3 className="mt-2 font-script text-5xl text-amber-100">
              {config.groom.name}
            </h3>
            <p className="mt-2 font-serif text-sm uppercase tracking-[0.16em] text-royal-goldLight">
              Son of
            </p>
            <p className="mt-1 font-serif text-base text-royal-cream/95 sm:text-lg">
              {config.groom.familyIntroduction}
            </p>
          </motion.article>

          <motion.article
            variants={slideFromRight}
            className="royal-card rounded-2xl p-6 text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-royal-goldLight">
              Bride
            </p>
            <h3 className="mt-2 font-script text-5xl text-amber-100">
              {config.bride.name}
            </h3>
            <p className="mt-2 font-serif text-sm uppercase tracking-[0.16em] text-royal-goldLight">
              Daughter of
            </p>
            <p className="mt-1 font-serif text-base text-royal-cream/95 sm:text-lg">
              {config.bride.familyIntroduction}
            </p>
          </motion.article>
        </div>
      </motion.div>
    </section>
  )
}
