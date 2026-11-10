import config from '../weddingConfig'

const { event, groom, bride, venue, contact, closing } = config

export const eventStart = new Date(event.start)
export const eventEnd = new Date(eventStart.getTime() + event.durationHours * 3600 * 1000)

const toUtcStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const title = `${event.rite} – ${groom.firstName} & ${bride.firstName}`
const location = `${venue.name}, ${venue.addressLines.join(' ').replace(/,$/, '')}`
const phones = contact.phones.map(formatPhone).join(' / ')
const details = `With love and blessings, ${closing.hosts}. Contact: ${phones}`

export const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toUtcStamp(eventStart)}/${toUtcStamp(eventEnd)}`,
    details,
    location,
    ctz: event.timeZone,
  }).toString()

const icsEscape = (s) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1')

export function icsDataUrl() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${groom.firstName} & ${bride.firstName}//Invite//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:engagement-${groom.firstName}-${bride.firstName}-${toUtcStamp(eventStart)}`.toLowerCase(),
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(eventStart)}`,
    `DTEND:${toUtcStamp(eventEnd)}`,
    `SUMMARY:${icsEscape(title)}`,
    `LOCATION:${icsEscape(location)}`,
    `DESCRIPTION:${icsEscape(details)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsEscape(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics)
}

export const icsFileName = `${groom.firstName}-${bride.firstName}-Engagement.ics`

export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.mapsQuery)
export const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(venue.mapsQuery)

export function formatPhone(num) {
  const d = num.replace(/\D/g, '').slice(-10)
  return `${contact.countryCode} ${d.slice(0, 5)} ${d.slice(5)}`
}

export const telHref = (num) => `tel:${contact.countryCode}${num.replace(/\D/g, '').slice(-10)}`
