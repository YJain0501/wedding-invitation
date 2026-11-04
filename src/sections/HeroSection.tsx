import { motion } from 'framer-motion'
import { ChevronDown, Flower2 } from 'lucide-react'
import { fadeDown, fadeUp, scaleIn } from '@/components/animations/variants'
import { OrnamentalDivider } from '@/components/common/OrnamentalDivider'
import { FloatingLanterns } from '@/components/invitation/FloatingLanterns'
import { FloatingParticles } from '@/components/invitation/FloatingParticles'
import type { WeddingConfig } from '@/config/weddingConfig'

interface HeroSectionProps {
  config: WeddingConfig
}

const NAV_LINKS = [
  { href: '#invitation-message', label: 'Invitation' },
  { href: '#events', label: 'Events' },
  { href: '#venue', label: 'Venue' },
  { href: '#rsvp', label: 'RSVP' },
]

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-8 sm:px-6"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(17, 3, 7, 0.45), rgba(17, 3, 7, 0.82)), url(${config.media.heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FloatingLanterns className="opacity-80" />
      <FloatingParticles className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(244,217,154,0.28),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-4 inset-y-6 rounded-[1.8rem] border border-royal-gold/30 sm:inset-x-8 sm:inset-y-8" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col">
        <motion.nav
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          className="mb-10 hidden items-center justify-between rounded-full border border-royal-gold/30 bg-royal-burgundyDark/60 px-3 py-2 shadow-royal backdrop-blur md:flex"
        >
          <p className="px-3 font-serif text-xs uppercase tracking-[0.2em] text-royal-goldLight">
            Royal Wedding Invitation
          </p>
          <ul className="flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-royal-cream/90 transition hover:bg-royal-wine hover:text-amber-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-serif text-xs uppercase tracking-[0.23em] text-royal-goldLight sm:text-sm">
            The Wedding Of
          </p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 font-script text-6xl leading-[0.95] text-amber-100 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl"
          >
            {config.groom.name}
          </motion.h1>

          <p className="my-1 font-script text-4xl text-royal-goldLight sm:text-5xl">
            &
          </p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.14 }}
            className="font-script text-6xl leading-[0.95] text-amber-100 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl"
          >
            {config.bride.name}
          </motion.h2>

          <div className="mt-5 flex items-center justify-center gap-3 text-royal-goldLight">
            <Flower2 size={18} />
            <OrnamentalDivider className="mt-0 w-[180px] sm:w-[220px]" />
            <Flower2 size={18} />
          </div>

          <p className="mt-5 font-serif text-sm uppercase tracking-[0.25em] text-royal-cream sm:text-base">
            {config.wedding.dateRangeLabel}
          </p>
        </motion.div>

        <a
          href="#invitation-message"
          className="animate-arrow-bounce absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-royal-cream/90"
        >
          <span className="text-[0.68rem] uppercase tracking-[0.2em]">
            Scroll to Explore
          </span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  )
}
