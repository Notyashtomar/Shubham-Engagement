// Every piece of text, date, link and asset on the invitation comes from this file.

const weddingConfig = {
  siteTitle: 'Shubham & Sunaina | Engagement Ceremony',

  gate: {
    mantra: '॥ ॐ श्री गणेशाय नमः ॥',
    lead: 'You are',
    title: 'Cordially Invited',
    button: 'Tap to open',
    musicNote: 'Opens with music',
  },

  event: {
    name: 'Engagement Ceremony',
    rite: 'Engagement Ceremony',
    riteGloss: 'A promise sealed with rings',
    // ISO 8601 with the IST offset; the countdown and calendar links derive from this.
    start: '2026-11-13T18:30:00+05:30',
    durationHours: 5,
    timeZone: 'Asia/Kolkata',
    shortDate: '13 • 11 • 2026',
    day: '13',
    monthYear: 'November 2026',
    weekday: 'Friday',
    time: '6:30 PM',
    startedMessage: 'The celebrations have begun',
    startedSubtext: 'Thank you for being part of our special day',
  },

  groom: {
    firstName: 'Shubham',
    fullName: 'Shubham Tomar',
    relation: 'Son of',
    mother: 'Smt. Shashi Tomar',
    father: 'Shri Parveen Tomar',
  },

  bride: {
    firstName: 'Sunaina',
    fullName: 'Sunaina Solanki',
    relation: 'Daughter of',
    mother: 'Smt. Sunita Solani',
    father: 'Shri Rakesh Kumar Solanki',
  },

  invitation: {
    lead: ['With the love and blessings of', 'our families, we request the pleasure', 'of your company at the'],
  },

  venue: {
    label: 'Venue',
    name: 'Shri Govindam',
    addressLines: ['Plot No, WZ 306, O, Dataram Marg,', 'Sector 7 Dwarka,', 'Dwarka, New Delhi,', 'Delhi, 110075'],
    // Used for Google Maps search, directions and calendar location.
    mapsQuery: 'Shri Govindam, WZ 306, Dataram Marg, Sector 7 Dwarka, New Delhi, Delhi 110075',
  },

  closing: {
    lines: ['We look forward to', 'celebrating with you.'],
    hostedBy: 'With love and blessings,',
    hosts: 'The Tomar & Solanki Family',
  },

  contact: {
    heading: 'For Contact',
    phones: ['9717782626', '9311973552'],
    countryCode: '+91',
  },

  music: {
    src: '/audio/music.mp3',
    volume: 0.8,
    credit: 'Music: “Relax Ay Sitar” by Antti Luode, CC BY 3.0',
  },

  images: {
    ganesh: '/images/ganesh.webp',
    monogram: '/images/monogram.webp',
    backgrounds: {
      hero: '/images/bg-hero.webp',
      invite: '/images/bg-invite.webp',
      date: '/images/bg-date.webp',
      venue: '/images/bg-venue.webp',
      close: '/images/bg-close.webp',
    },
  },

  effects: {
    petals: true,
  },
}

export default weddingConfig
