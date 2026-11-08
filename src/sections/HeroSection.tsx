import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Flower2 } from 'lucide-react'
import { fadeDown, scaleIn } from '@/components/animations/variants'
import { OrnamentalDivider } from '@/components/common/OrnamentalDivider'
import { FireworksOverlay } from '@/components/invitation/FireworksOverlay'
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

const HERO_PETALS = [
  { left: '8%', width: 11, height: 8, delay: '1.2s', duration: '24s', drift: '-26px' },
  { left: '16%', width: 14, height: 10, delay: '5.4s', duration: '31s', drift: '34px' },
  { left: '28%', width: 9, height: 7, delay: '2s', duration: '27s', drift: '-18px' },
  { left: '41%', width: 15, height: 11, delay: '7.8s', duration: '29s', drift: '30px' },
  { left: '52%', width: 12, height: 9, delay: '3.4s', duration: '25s', drift: '-22px' },
  { left: '66%', width: 10, height: 8, delay: '6.2s', duration: '30s', drift: '28px' },
  { left: '79%', width: 14, height: 10, delay: '4.7s', duration: '28s', drift: '-24px' },
  { left: '91%', width: 11, height: 8, delay: '1.7s', duration: '26s', drift: '18px' },
]

const HERO_SPARKLES = [
  { left: '12%', top: '18%', size: 6, delay: '0.6s' },
  { left: '24%', top: '28%', size: 5, delay: '1.2s' },
  { left: '38%', top: '15%', size: 7, delay: '2s' },
  { left: '57%', top: '20%', size: 5, delay: '0.9s' },
  { left: '74%', top: '30%', size: 6, delay: '1.6s' },
  { left: '88%', top: '22%', size: 5, delay: '2.3s' },
]

export function HeroSection({ config }: HeroSectionProps) {
  const hasHeroVideo = Boolean(config.media.heroVideo)
  const fallbackBackgroundStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(180deg, rgba(17, 3, 7, 0.45), rgba(17, 3, 7, 0.82)), url(${config.media.heroBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    [config.media.heroBackground],
  )

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden px-3 pb-16 pt-8 sm:px-6 sm:pb-16"
      style={!hasHeroVideo ? fallbackBackgroundStyle : undefined}
    >
      {hasHeroVideo ? (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={config.media.heroVideo}
            poster={config.media.heroPoster ?? config.media.heroBackground}
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            autoPlay
          />
          {config.media.heroPoster ? (
            <img
              src={config.media.heroPoster}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,2,6,0.2)_0%,rgba(17,3,7,0.48)_46%,rgba(17,3,7,0.9)_100%)]" />
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FireworksOverlay className="opacity-80" />
        {HERO_SPARKLES.map((sparkle) => (
          <span
            key={`${sparkle.left}-${sparkle.top}`}
            className="hero-video-sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animationDelay: sparkle.delay,
            }}
          />
        ))}
        {HERO_PETALS.map((petal) => (
          <span
            key={`${petal.left}-${petal.delay}`}
            className="hero-video-petal"
            style={{
              left: petal.left,
              width: `${petal.width}px`,
              height: `${petal.height}px`,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              ['--hero-petal-drift' as string]: petal.drift,
            }}
          />
        ))}
      </div>

      <FloatingLanterns className="opacity-80" />
      <FloatingParticles className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(244,217,154,0.28),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-2 inset-y-4 rounded-[1.8rem] border border-royal-gold/30 sm:inset-x-6 sm:inset-y-7 md:inset-x-8 md:inset-y-8" />

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
            initial={{ opacity: 0, y: 38, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.25, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-script text-6xl leading-[0.95] text-amber-100 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl"
          >
            {config.groom.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.62, ease: [0.34, 1.56, 0.64, 1] }}
            className="my-1 font-script text-4xl text-royal-goldLight sm:text-5xl"
          >
            &
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 38, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.25, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-6xl leading-[0.95] text-amber-100 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl"
          >
            {config.bride.name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-5 flex items-center justify-center gap-3 text-royal-goldLight"
          >
            <Flower2 size={18} />
            <OrnamentalDivider className="mt-0 w-[180px] sm:w-[220px]" />
            <Flower2 size={18} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.34 }}
            className="mt-5 font-serif text-sm uppercase tracking-[0.25em] text-royal-cream sm:text-base"
          >
            {config.wedding.dateRangeLabel}
          </motion.p>
        </motion.div>

      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[max(5.75rem,calc(env(safe-area-inset-bottom)+5rem))] z-20 flex justify-center sm:bottom-10">
        <a
          href="#invitation-message"
          className="animate-arrow-bounce pointer-events-auto inline-flex flex-col items-center gap-2 text-royal-cream/90"
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
