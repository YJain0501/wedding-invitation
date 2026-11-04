import { toIcsDateTime } from '@/utils/dateUtils'

export interface CalendarEventPayload {
  title: string
  startsAtIso: string
  endsAtIso?: string
  location: string
  description?: string
  filename?: string
}

function escapeIcsText(value: string) {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll('\n', '\\n')
    .replaceAll(',', '\\,')
    .replaceAll(';', '\\;')
}

function createIcsContent({
  title,
  startsAtIso,
  endsAtIso,
  location,
  description,
}: CalendarEventPayload) {
  const uid = `${Date.now()}-wedding-invite@local`
  const stamp = toIcsDateTime(new Date().toISOString())

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsDateTime(startsAtIso)}`,
    ...(endsAtIso ? [`DTEND:${toIcsDateTime(endsAtIso)}`] : []),
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description ?? '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadCalendarEvent(payload: CalendarEventPayload) {
  const icsFileContent = createIcsContent(payload)
  const blob = new Blob([icsFileContent], {
    type: 'text/calendar;charset=utf-8',
  })
  const downloadUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = downloadUrl
  anchor.download = payload.filename ?? 'wedding-invitation.ics'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(downloadUrl)
}
