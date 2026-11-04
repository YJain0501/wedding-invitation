import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn } from '@/components/animations/variants'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'
import { createEmailRsvpUrl, createWhatsAppRsvpUrl } from '@/utils/whatsappUtils'

interface RSVPSectionProps {
  config: WeddingConfig
}

type AttendanceChoice = 'accept' | 'decline'

export function RSVPSection({ config }: RSVPSectionProps) {
  const [guestName, setGuestName] = useState('')
  const [attendees, setAttendees] = useState(1)
  const [attendance, setAttendance] = useState<AttendanceChoice>('accept')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [hint, setHint] = useState('')

  const coupleNames = useMemo(
    () => `${config.groom.name} & ${config.bride.name}`,
    [config.bride.name, config.groom.name],
  )
  const hasWhatsApp = Boolean(config.contact.whatsappNumber)
  const hasEmail = Boolean(config.contact.email)
  const hasRsvpChannel = hasWhatsApp || hasEmail

  const validate = () => {
    if (!guestName.trim()) {
      setError('Please enter your name before sending RSVP.')
      return false
    }

    if (attendees < 1) {
      setError('Number of attendees must be at least 1.')
      return false
    }

    setError('')
    return true
  }

  const createPayload = () => ({
    guestName: guestName.trim(),
    attendees,
    attending: attendance === 'accept',
    message: message.trim(),
    coupleNames,
  })

  const sendViaWhatsApp = () => {
    if (!validate()) {
      return
    }

    if (!config.contact.whatsappNumber) {
      setError('WhatsApp RSVP is not configured yet.')
      return
    }

    const url = createWhatsAppRsvpUrl(config.contact.whatsappNumber, createPayload())
    window.open(url, '_blank', 'noopener,noreferrer')
    setHint('Opening WhatsApp with a prefilled RSVP message.')
  }

  const sendViaEmail = () => {
    if (!validate()) {
      return
    }

    if (!config.contact.email) {
      setError('Email RSVP is not configured yet.')
      return
    }

    const url = createEmailRsvpUrl(config.contact.email, createPayload())
    window.location.href = url
    setHint('Opening your email app with a prefilled RSVP message.')
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (hasWhatsApp) {
      sendViaWhatsApp()
      return
    }

    sendViaEmail()
  }

  return (
    <section
      id="rsvp"
      className="bg-gradient-to-b from-[#2c070f] to-royal-burgundyDark px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <RoyalSectionHeader
            eyebrow="Will You Join Us?"
            title="We Would Love to Celebrate With You"
            description="Your presence will make our celebration even more special."
          />
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          {!hasRsvpChannel ? (
            <article className="royal-card p-6 text-center sm:p-8">
              <p className="font-serif text-lg text-amber-100">
                RSVP contact details will be added soon.
              </p>
              <p className="mt-2 text-sm text-royal-cream/90">
                Please connect with the family directly for confirmation.
              </p>
            </article>
          ) : (
            <form
              onSubmit={onSubmit}
              className="royal-card space-y-4 p-6 sm:p-8"
            >
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.17em] text-royal-goldLight">
              Guest Name
            </span>
            <input
              type="text"
              value={guestName}
              onChange={(event) => {
                setGuestName(event.target.value)
              }}
              className="w-full rounded-lg border border-royal-gold/40 bg-royal-burgundyDark/65 px-3 py-2 text-sm text-royal-ivory outline-none placeholder:text-royal-cream/45 focus:border-royal-gold"
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.17em] text-royal-goldLight">
              Number of Attendees
            </span>
            <input
              type="number"
              min={1}
              value={attendees}
              onChange={(event) => {
                setAttendees(Number(event.target.value))
              }}
              className="w-full rounded-lg border border-royal-gold/40 bg-royal-burgundyDark/65 px-3 py-2 text-sm text-royal-ivory outline-none focus:border-royal-gold"
              required
            />
          </label>

          <fieldset>
            <legend className="mb-1 block text-xs uppercase tracking-[0.17em] text-royal-goldLight">
              Attendance
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-royal-gold/30 bg-royal-burgundyDark/50 px-3 py-2 text-sm text-royal-cream">
                <input
                  type="radio"
                  name="attendance"
                  checked={attendance === 'accept'}
                  onChange={() => {
                    setAttendance('accept')
                  }}
                />
                Joyfully Accept
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-royal-gold/30 bg-royal-burgundyDark/50 px-3 py-2 text-sm text-royal-cream">
                <input
                  type="radio"
                  name="attendance"
                  checked={attendance === 'decline'}
                  onChange={() => {
                    setAttendance('decline')
                  }}
                />
                Regretfully Decline
              </label>
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-[0.17em] text-royal-goldLight">
              Message (Optional)
            </span>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              rows={3}
              className="w-full rounded-lg border border-royal-gold/40 bg-royal-burgundyDark/65 px-3 py-2 text-sm text-royal-ivory outline-none placeholder:text-royal-cream/45 focus:border-royal-gold"
              placeholder="Share your blessings"
            />
          </label>

          {error ? (
            <p className="text-sm text-rose-300" role="alert">
              {error}
            </p>
          ) : null}
          {hint ? <p className="text-sm text-royal-goldLight">{hint}</p> : null}

          <p className="text-xs text-royal-cream/80">
            This website does not store RSVP data. Your response is sent through
            WhatsApp or email from your device.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {hasWhatsApp ? (
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-royal-goldLight transition hover:bg-royal-wine hover:text-amber-100"
              >
                <MessageCircle size={14} />
                Send via WhatsApp
              </button>
            ) : null}
            {hasEmail ? (
              <button
                type="button"
                onClick={sendViaEmail}
                className="inline-flex items-center gap-2 rounded-full border border-royal-gold/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-royal-cream transition hover:border-royal-gold/65 hover:text-amber-100"
              >
                <Send size={14} />
                Send via Email
              </button>
            ) : null}
          </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
