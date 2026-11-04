import { CalendarDays } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn, staggerChildren } from '@/components/animations/variants'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'
import { useCountdown } from '@/hooks/useCountdown'
import { downloadCalendarEvent } from '@/utils/calendarUtils'
import { formatWeddingDate } from '@/utils/dateUtils'

interface CountdownSectionProps {
  config: WeddingConfig
}

const UNIT_LABELS = ['Days', 'Hours', 'Minutes', 'Seconds']

export function CountdownSection({ config }: CountdownSectionProps) {
  const countdown = useCountdown(config.wedding.startsAtIso)

  const values = [
    countdown.days,
    countdown.hours,
    countdown.minutes,
    countdown.seconds,
  ]

  const downloadMainCalendarEvent = () => {
    downloadCalendarEvent({
      title: `${config.groom.name} & ${config.bride.name} Wedding Celebrations`,
      startsAtIso: config.wedding.startsAtIso,
      endsAtIso: config.wedding.endsAtIso,
      location: `${config.wedding.venueName}, ${config.wedding.venueAddress}`,
      description: config.wedding.invitationMessage,
      filename: 'wedding-day.ics',
    })
  }

  return (
    <section
      id="countdown"
      className="bg-gradient-to-b from-[#2b070f] to-royal-burgundy px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="mx-auto max-w-5xl"
      >
        <motion.div variants={fadeUp}>
          <RoyalSectionHeader
            eyebrow="Save the Date"
            title={`${config.groom.name} & ${config.bride.name}`}
            description={`${config.wedding.dateRangeLabel} • ${formatWeddingDate(config.wedding.startsAtIso, config.wedding.timezone)}`}
          />
        </motion.div>

        <motion.div variants={scaleIn} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {UNIT_LABELS.map((label, index) => (
            <article
              key={label}
              className="royal-card rounded-2xl p-4 text-center sm:p-5"
            >
              <p className="font-serif text-4xl text-amber-100 sm:text-5xl">
                {values[index]}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-royal-goldLight">
                {label}
              </p>
            </article>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 text-center">
          {countdown.isComplete ? (
            <p className="font-serif text-lg text-amber-100 sm:text-xl">
              The celebration has begun! We are ready to welcome you with joy.
            </p>
          ) : null}
          <button
            type="button"
            onClick={downloadMainCalendarEvent}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.13em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
          >
            <CalendarDays size={16} />
            Add to Calendar
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
