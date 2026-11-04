import { ExternalLink, MapPinned } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, slideFromLeft, slideFromRight } from '@/components/animations/variants'
import { LuxuryImage } from '@/components/common/LuxuryImage'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'

interface VenueSectionProps {
  config: WeddingConfig
}

export function VenueSection({ config }: VenueSectionProps) {
  return (
    <section
      id="venue"
      className="bg-gradient-to-b from-royal-burgundy to-[#2c070f] px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <RoyalSectionHeader
            eyebrow="Where the Celebration Begins"
            title={config.wedding.venueName}
            description={`${config.wedding.dateRangeLabel} • ${config.wedding.venueAddress}`}
          />
        </motion.div>

        <div className="mt-10 grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="royal-card p-3 sm:p-4"
          >
            <LuxuryImage
              src={config.media.venueImage}
              alt={`${config.wedding.venueName} venue`}
              fallbackLabel="Venue Preview"
              className="h-[280px] w-full rounded-xl border border-royal-gold/25 object-cover sm:h-[360px]"
            />
          </motion.div>

          <motion.aside
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="royal-card p-6"
          >
            <p className="font-serif text-xs uppercase tracking-[0.2em] text-royal-goldLight">
              Venue Details
            </p>
            <h3 className="mt-3 font-serif text-3xl text-amber-100">
              {config.wedding.venueName}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-royal-cream/90">
              {config.wedding.venueAddress}
            </p>
            <p className="mt-3 text-sm text-royal-goldLight">
              {config.wedding.dateRangeLabel}
            </p>

            <div className="mt-6 space-y-2">
              <a
                href={config.wedding.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/75 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
              >
                <MapPinned size={16} />
                Open in Google Maps
              </a>
              <a
                href={config.wedding.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-royal-gold/35 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-royal-cream/95 transition hover:border-royal-gold/60 hover:text-amber-100"
              >
                <ExternalLink size={16} />
                Get Directions
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
