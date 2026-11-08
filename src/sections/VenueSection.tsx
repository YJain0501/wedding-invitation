import { ExternalLink, MapPin, MapPinned } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, slideFromLeft, slideFromRight } from '@/components/animations/variants'
import { LuxuryImage } from '@/components/common/LuxuryImage'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'

interface VenueSectionProps {
  config: WeddingConfig
}

function toDisplayDate(date: string, timezone: string) {
  const parsedDate = new Date(`${date}T00:00:00`)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: timezone,
  }).format(parsedDate)
}

export function VenueSection({ config }: VenueSectionProps) {
  const latitude = config.wedding.latitude
  const longitude = config.wedding.longitude
  const hasCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude)

  const mapSrc = hasCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${(longitude as number) - 0.01}%2C${(latitude as number) - 0.01}%2C${(longitude as number) + 0.01}%2C${(latitude as number) + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`
    : ''

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
            eyebrow="Find Your Way"
            title="Celebration Venues"
            description="Tap the map and get directions to celebrate with us."
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="royal-card mt-6 overflow-hidden p-4 sm:p-5"
        >
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="overflow-hidden rounded-xl border border-royal-gold/30">
              {hasCoordinates ? (
                <iframe
                  title={`${config.wedding.venueName} map`}
                  src={mapSrc}
                  className="h-[290px] w-full border-0 sm:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <LuxuryImage
                  src={config.media.venueImage}
                  alt={`${config.wedding.venueName} map preview`}
                  fallbackLabel="Map Preview"
                  className="h-[290px] w-full object-cover sm:h-[360px]"
                />
              )}
            </div>

            <article className="rounded-xl border border-royal-gold/25 bg-royal-burgundyDark/45 p-4 sm:p-5">
              <p className="inline-flex items-center gap-2 font-serif text-xs uppercase tracking-[0.2em] text-royal-goldLight">
                <MapPin size={14} />
                Event Schedule at Venue
              </p>
              <div className="mt-4 space-y-2.5">
                {config.events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-royal-gold/20 bg-royal-burgundy/55 px-3 py-2"
                  >
                    <p className="font-serif text-sm text-amber-100">{event.title}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.13em] text-royal-goldLight">
                      {event.displayTime ?? event.startTime} •{' '}
                      {toDisplayDate(event.date, config.wedding.timezone)}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href={config.wedding.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
              >
                <ExternalLink size={14} />
                Open Full Directions
              </a>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
