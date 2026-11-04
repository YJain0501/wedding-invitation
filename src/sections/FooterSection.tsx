import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { FloatingLanterns } from '@/components/invitation/FloatingLanterns'
import { FloatingParticles } from '@/components/invitation/FloatingParticles'
import type { WeddingConfig } from '@/config/weddingConfig'

interface FooterSectionProps {
  config: WeddingConfig
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 1)
    .join('')
}

export function FooterSection({ config }: FooterSectionProps) {
  const monogram = `${getInitials(config.groom.name)}${getInitials(config.bride.name)}`

  return (
    <footer className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(20, 4, 9, 0.75), rgba(12, 2, 6, 0.95)), url(${config.media.heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <FloatingLanterns />
      <FloatingParticles className="opacity-80" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="font-serif text-sm uppercase tracking-[0.23em] text-royal-goldLight"
        >
          With Love & Blessings
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.08 }}
          className="mt-4 font-serif text-4xl text-amber-100 sm:text-5xl"
        >
          Two Families, One Beautiful Beginning
        </motion.h2>

        <p className="mt-7 font-script text-6xl text-amber-100 sm:text-7xl">
          {config.groom.name}
        </p>
        <p className="font-script text-4xl text-royal-goldLight sm:text-5xl">&</p>
        <p className="font-script text-6xl text-amber-100 sm:text-7xl">
          {config.bride.name}
        </p>
        <p className="mt-4 font-serif text-sm uppercase tracking-[0.22em] text-royal-goldLight">
          {config.wedding.dateRangeLabel}
        </p>

        <div className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-full border border-royal-gold/65 bg-royal-burgundyDark/70 text-2xl font-serif text-royal-goldLight shadow-gold">
          {monogram}
        </div>

        <p className="mt-7 text-sm text-royal-cream/90">
          We Can&apos;t Wait to Celebrate With You!
        </p>
        <p className="mx-auto mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-royal-goldLight">
          <Heart size={14} fill="currentColor" />
          Celebration of Love
          <Heart size={14} fill="currentColor" />
        </p>
      </div>
    </footer>
  )
}
