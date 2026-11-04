const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}

export function formatWeddingDate(isoDate: string, timezone: string) {
  const date = new Date(isoDate)

  return new Intl.DateTimeFormat('en-IN', {
    ...DATE_TIME_OPTIONS,
    timeZone: timezone,
  }).format(date)
}

export function toIcsDateTime(isoDate: string) {
  const date = new Date(isoDate)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

function parseDateTime(
  date: string,
  time: string,
  timezoneOffset: string,
) {
  return new Date(`${date}T${time}:00${timezoneOffset}`)
}

export function extractTimezoneOffset(isoDate: string) {
  const match = isoDate.match(/(Z|[+-]\d{2}:\d{2})$/)
  return match?.[1] ?? '+00:00'
}

export function buildEventIso(
  date: string,
  time: string,
  timezoneOffset: string,
) {
  return parseDateTime(date, time, timezoneOffset).toISOString()
}

export function buildEventEndIso(
  date: string,
  _startTime: string,
  endTime: string | undefined,
  timezoneOffset: string,
) {
  if (!endTime) {
    return undefined
  }

  return parseDateTime(date, endTime, timezoneOffset).toISOString()
}

export function formatEventDateLabel(date: string, timezone: string) {
  const parsedDate = new Date(`${date}T00:00:00`)

  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timezone,
  }).format(parsedDate)
}
