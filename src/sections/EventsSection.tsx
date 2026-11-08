import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarPlus,
  Crown,
  HandHeart,
  LocateFixed,
  Music2,
  Sparkles,
  VenetianMask,
} from 'lucide-react'
import { fadeUp, scaleIn, staggerChildren } from '@/components/animations/variants'
import { LuxuryImage } from '@/components/common/LuxuryImage'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig, WeddingEvent } from '@/config/weddingConfig'
import { downloadCalendarEvent } from '@/utils/calendarUtils'
import {
  buildEventEndIso,
  buildEventIso,
  extractTimezoneOffset,
} from '@/utils/dateUtils'

interface EventsSectionProps {
  config: WeddingConfig
}

const EVENT_ICON_MAP = {
  'shagun-e-mayra': HandHeart,
  tilak: Crown,
  sangeet: Music2,
  procession: VenetianMask,
  'mangal-phere': Sparkles,
} as const

function toDisplayDate(date: string, timezone: string) {
  const parsedDate = new Date(`${date}T00:00:00`)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timezone,
  }).format(parsedDate)
}

function toDisplayTime(event: WeddingEvent) {
  if (event.displayTime) {
    return event.displayTime
  }

  const [hours, minutes] = event.startTime.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const normalizedHours = hours % 12 || 12
  return `${normalizedHours}:${String(minutes).padStart(2, '0')} ${period}`
}

export function EventsSection({ config }: EventsSectionProps) {
  const timezoneOffset = extractTimezoneOffset(config.wedding.startsAtIso)
  const [selectedEventId, setSelectedEventId] = useState(config.events[0]?.id ?? '')

  const groupedEvents = useMemo(() => {
    const groups = new Map<string, WeddingEvent[]>()

    config.events.forEach((event) => {
      const list = groups.get(event.date) ?? []
      list.push(event)
      groups.set(event.date, list)
    })

    return Array.from(groups.entries())
      .sort(([leftDate], [rightDate]) => leftDate.localeCompare(rightDate))
      .map(([date, events], index) => ({
        date,
        dayLabel: `DAY ${index + 1} — ${toDisplayDate(date, config.wedding.timezone).toUpperCase()}`,
        events: events.sort((leftEvent, rightEvent) =>
          leftEvent.startTime.localeCompare(rightEvent.startTime),
        ),
      }))
  }, [config.events, config.wedding.timezone])

  const selectedEvent =
    config.events.find((event) => event.id === selectedEventId) ?? config.events[0]

  return (
    <section
      id="events"
      className="bg-gradient-to-b from-royal-burgundyDark to-royal-burgundy px-4 py-16 sm:px-6 sm:py-20"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
      >
        <motion.div variants={fadeUp}>
          <RoyalSectionHeader
            eyebrow="Our Wedding Celebrations"
            title="Our Wedding Celebrations"
            description="Five beautiful celebrations, two unforgettable days, and a lifetime of memories."
          />
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <motion.div variants={scaleIn} className="royal-card p-5 sm:p-6">
            <div className="relative pl-7 sm:pl-8">
              <div className="pointer-events-none absolute bottom-2 left-[11px] top-2 w-[2px] bg-gradient-to-b from-royal-gold/30 via-royal-gold to-royal-gold/25 sm:left-3" />

              {groupedEvents.map((group) => (
                <div key={group.date} className="mb-7 last:mb-0">
                  <p className="mb-3 font-serif text-xs uppercase tracking-[0.2em] text-royal-goldLight">
                    {group.dayLabel}
                  </p>

                  <div className="space-y-3">
                    {group.events.map((event) => {
                      const isSelected = selectedEvent?.id === event.id
                      const EventIcon = EVENT_ICON_MAP[
                        event.id as keyof typeof EVENT_ICON_MAP
                      ] ?? Sparkles
                      const startsAtIso = buildEventIso(
                        event.date,
                        event.startTime,
                        timezoneOffset,
                      )
                      const endsAtIso = buildEventEndIso(
                        event.date,
                        event.startTime,
                        event.endTime,
                        timezoneOffset,
                      )

                      return (
                        <div key={event.id} className="relative">
                          <span
                            className={`absolute left-[-26px] top-4 inline-flex h-4 w-4 rounded-full border ${
                              isSelected
                                ? 'border-amber-100 bg-royal-gold'
                                : 'border-royal-gold/70 bg-royal-burgundy'
                            } sm:left-[-29px]`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEventId(event.id)
                            }}
                            className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                              isSelected
                                ? 'border-royal-gold bg-royal-wine/80 shadow-gold'
                                : 'border-royal-gold/25 bg-royal-burgundyDark/45 hover:border-royal-gold/55'
                            }`}
                          >
                            <p className="inline-flex items-center gap-2 font-serif text-lg text-amber-100">
                              <EventIcon size={16} />
                              {event.title}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-royal-goldLight">
                              {toDisplayTime(event)}
                            </p>
                          </button>

                          <AnimatePresence initial={false}>
                            {isSelected ? (
                              <motion.div
                                key={`${event.id}-details`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 rounded-xl border border-royal-gold/30 bg-royal-burgundyDark/55 p-3 text-sm text-royal-cream/90">
                                  <p>{event.description}</p>
                                  <p className="mt-2 text-royal-goldLight">
                                    {toDisplayDate(event.date, config.wedding.timezone)} • {toDisplayTime(event)}
                                  </p>
                                  <p className="mt-1 text-royal-cream/90">
                                    {event.venueName}
                                  </p>

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        downloadCalendarEvent({
                                          title: event.title,
                                          startsAtIso,
                                          endsAtIso,
                                          location: `${event.venueName}, ${event.venueAddress}`,
                                          description:
                                            event.description ??
                                            `${event.title} celebration for ${config.groom.name} and ${config.bride.name}.`,
                                          filename: `${event.id}.ics`,
                                        })
                                      }}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/60 bg-royal-burgundy/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
                                    >
                                      <CalendarPlus size={13} />
                                      Add to Calendar
                                    </button>
                                    <a
                                      href={event.mapsUrl ?? config.wedding.mapsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/35 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-royal-cream transition hover:border-royal-gold/60 hover:text-amber-100"
                                    >
                                      <LocateFixed size={13} />
                                      Get Directions
                                    </a>
                                  </div>
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            variants={scaleIn}
            className="royal-card h-fit p-4 sm:sticky sm:top-20 sm:p-5"
          >
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <article className="relative overflow-hidden rounded-xl border border-royal-gold/30">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${config.media.eventBackdrop ?? '/assets/images/backgrounds/event-card-bg.webp'})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-royal-burgundyDark/85" />
                  <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-royal-gold/70" />
                  <span className="absolute right-3 top-3 h-5 w-5 border-r border-t border-royal-gold/70" />
                  <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-royal-gold/70" />
                  <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-royal-gold/70" />

                  <div className="relative p-5 text-center sm:p-6">
                    <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-md border border-royal-gold/55 bg-royal-burgundy/70 p-1 sm:h-24 sm:w-24">
                      <LuxuryImage
                        src={selectedEvent.image ?? '/assets/images/events/event-placeholder.svg'}
                        alt={`${selectedEvent.title} artwork`}
                        fallbackLabel={selectedEvent.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="text-[0.63rem] uppercase tracking-[0.22em] text-royal-goldLight">
                      Join Us for the
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight text-amber-100 sm:text-[2rem]">
                      {selectedEvent.title}
                    </h3>
                    <div className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-royal-gold/85 to-transparent" />

                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-royal-goldLight">
                      {toDisplayDate(selectedEvent.date, config.wedding.timezone)}
                    </p>
                    <p className="mt-1 text-sm italic text-royal-cream/95">
                      {toDisplayTime(selectedEvent)}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-royal-cream/90">
                      {selectedEvent.description}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-royal-goldLight">
                      {selectedEvent.venueName}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          downloadCalendarEvent({
                            title: selectedEvent.title,
                            startsAtIso: buildEventIso(
                              selectedEvent.date,
                              selectedEvent.startTime,
                              timezoneOffset,
                            ),
                            endsAtIso: buildEventEndIso(
                              selectedEvent.date,
                              selectedEvent.startTime,
                              selectedEvent.endTime,
                              timezoneOffset,
                            ),
                            location: `${selectedEvent.venueName}, ${selectedEvent.venueAddress}`,
                            description:
                              selectedEvent.description ??
                              `${selectedEvent.title} celebration for ${config.groom.name} and ${config.bride.name}.`,
                            filename: `${selectedEvent.id}.ics`,
                          })
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/60 bg-royal-burgundy/80 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
                      >
                        <CalendarPlus size={13} />
                        Add to Calendar
                      </button>
                      <a
                        href={selectedEvent.mapsUrl ?? config.wedding.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-royal-gold/35 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-royal-cream transition hover:border-royal-gold/60 hover:text-amber-100"
                      >
                        <LocateFixed size={13} />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </article>
              </motion.div>
            ) : null}
          </motion.aside>
        </div>
      </motion.div>
    </section>
  )
}
