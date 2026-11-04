export interface RsvpPayload {
  guestName: string
  attendees: number
  attending: boolean
  message?: string
  coupleNames: string
}

export function createWhatsAppRsvpUrl(
  phoneNumber: string,
  payload: RsvpPayload,
) {
  const attendanceText = payload.attending
    ? 'Joyfully Accept'
    : 'Regretfully Decline'

  const text = [
    `Namaste! This is ${payload.guestName}.`,
    `RSVP: ${attendanceText}`,
    `Attendees: ${payload.attendees}`,
    `For: ${payload.coupleNames}`,
    payload.message ? `Message: ${payload.message}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
}

export function createEmailRsvpUrl(email: string, payload: RsvpPayload) {
  const attendanceText = payload.attending
    ? 'Joyfully Accept'
    : 'Regretfully Decline'
  const subject = `RSVP - ${payload.coupleNames}`
  const body = [
    `Namaste,`,
    ``,
    `Guest Name: ${payload.guestName}`,
    `Attendance: ${attendanceText}`,
    `Number of attendees: ${payload.attendees}`,
    payload.message ? `Message: ${payload.message}` : '',
    ``,
    `Warm regards,`,
    payload.guestName,
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
