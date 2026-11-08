export interface WeddingEvent {
  id: string
  title: string
  description?: string
  date: string
  startTime: string
  displayTime?: string
  endTime?: string
  venueName: string
  venueAddress: string
  image?: string
  mapsUrl?: string
}

export interface WeddingConfig {
  groom: {
    name: string
    image: string
    introduction?: string
    familyIntroduction?: string
  }
  bride: {
    name: string
    image: string
    introduction?: string
    familyIntroduction?: string
  }
  wedding: {
    date: string
    dateRangeLabel: string
    startDate: string
    endDate: string
    time: string
    timezone: string
    invitationMessage: string
    venueName: string
    venueAddress: string
    mapsUrl: string
    latitude?: number
    longitude?: number
    startsAtIso: string
    endsAtIso?: string
  }
  events: WeddingEvent[]
  gallery: string[]
  media: {
    heroBackground: string
    welcomeBackground: string
    welcomePoster?: string
    welcomeVideo?: string
    welcomeVideoDurationSeconds?: number
    heroPoster?: string
    heroVideo?: string
    venueImage: string
    eventBackdrop?: string
    backgroundMusic?: string
    backgroundMusicYouTubeUrl?: string
  }
  contact: {
    whatsappNumber?: string
    email?: string
  }
}

export const weddingConfig: WeddingConfig = {
  groom: {
    name: 'Yash Jain',
    image: '/assets/images/couple/groom.jpg',
    introduction:
      'Warm-hearted, graceful, and deeply rooted in tradition, Yash brings joy and sincerity to every moment.',
    familyIntroduction:
      'Mrs. Sudarshana Dilip Jain',
  },
  bride: {
    name: 'Komal Daftari',
    image: '/assets/images/couple/bride.jpg',
    introduction:
      'Elegant, radiant, and full of warmth, Komal carries timeless grace and a beautiful smile.',
    familyIntroduction:
      'Mr. Ashok & Mrs. Kanta Daftari',
  },
  wedding: {
    date: '4th – 5th December 2026',
    dateRangeLabel: '4th – 5th December 2026',
    startDate: '2026-12-04',
    endDate: '2026-12-05',
    time: 'From 12:30 PM IST',
    timezone: 'Asia/Kolkata',
    startsAtIso: '2026-12-04T12:30:00+05:30',
    endsAtIso: '2026-12-05T23:59:00+05:30',
    invitationMessage:
      'With immense joy and happiness, we invite you to join us as we celebrate the beginning of our beautiful journey together.\n\nYour presence, love, and blessings will make these moments even more special.\n\nWe look forward to celebrating with you!',
    venueName: 'Solaris Hotel & Club',
    venueAddress: 'Solaris Hotel & Club, Indore, MP, India',
    mapsUrl:
      'https://maps.app.goo.gl/sJ5uE5JcU4vgrvZG7',
    latitude: 22.680899,
    longitude: 75.8582473,
  },
  events: [
    {
      id: 'shagun-e-mayra',
      title: 'Shagun-E-Mayra',
      description:
        'A heartfelt beginning with family blessings and joyful traditions.',
      date: '2026-12-04',
      startTime: '12:30',
      displayTime: '12:30 PM',
      venueName: 'Solaris Hotel & Club',
      venueAddress: 'Solaris Hotel & Club, Indore, MP',
      image: '/assets/images/events/shagun-e-mayra.svg',
      mapsUrl:
        'https://maps.app.goo.gl/sJ5uE5JcU4vgrvZG7',
    },
    {
      id: 'tilak',
      title: 'Tilak',
      description:
        'A sacred and graceful ceremony honoring traditions, families, and blessings.',
      date: '2026-12-04',
      startTime: '15:00',
      displayTime: '3:00 PM',
      venueName: 'Solaris Hotel & Club',
      venueAddress: 'Solaris Hotel & Club, Indore, MP',
      image: '/assets/images/events/tilak.svg',
      mapsUrl:
        'https://maps.app.goo.gl/sJ5uE5JcU4vgrvZG7',
    },
    {
      id: 'sangeet',
      title: 'Sangeet & Reception',
      description:
        'An evening of music, dance, celebration, and unforgettable family moments.',
      date: '2026-12-04',
      startTime: '19:30',
      displayTime: '7:30 PM',
      venueName: 'Solaris Hotel & Club',
      venueAddress: 'Solaris Hotel & Club, Indore, MP',
      image: '/assets/images/events/sangeet-reception.svg',
      mapsUrl:
        'https://maps.app.goo.gl/sJ5uE5JcU4vgrvZG7',
    },
    {
      id: 'procession',
      title: 'Procession',
      description:
        'A majestic procession filled with music, energy, and royal celebration.',
      date: '2026-12-05',
      startTime: '10:00',
      displayTime: '10:00 AM',
      venueName: 'Solaris Hotel & Club',
      venueAddress: 'Solaris Hotel & Club, Indore, MP',
      image: '/assets/images/events/procession.svg',
      mapsUrl:
        'https://maps.app.goo.gl/sJ5uE5JcU4vgrvZG7',
    },
    {
      id: 'mangal-phere',
      title: 'The Sacred Vows – Mangal Phere',
      description:
        'The divine union of two souls in sacred vows, blessings, and eternal love.',
      date: '2026-12-05',
      startTime: '17:27',
      displayTime: '5:27 PM',
      venueName: 'Solaris Hotel & Club',
      venueAddress: 'Solaris Hotel & Club, Indore, MP',
      image: '/assets/images/events/mangal-phere.svg',
      mapsUrl:
        'https://maps.app.goo.gl/sJ5uE5JcU4vgrvZG7',
    },
  ],
  gallery: [
    '/assets/images/gallery/har2-gallery-01.webp',
    '/assets/images/gallery/har2-gallery-02.webp',
    '/assets/images/gallery/har2-gallery-03.webp',
    '/assets/images/gallery/har2-gallery-04.webp',
    '/assets/images/gallery/har2-gallery-05.webp',
    '/assets/images/gallery/har2-gallery-06.webp',
  ],
  media: {
    heroBackground: '/assets/images/backgrounds/hero-palace.svg',
    welcomeBackground: '/assets/images/backgrounds/welcome-gate.svg',
    welcomePoster: '/assets/images/backgrounds/cover-poster.webp',
    welcomeVideo: '/assets/videos/hero-banner.mp4',
    welcomeVideoDurationSeconds: 12,
    heroPoster: '/assets/images/backgrounds/hero-poster.webp',
    heroVideo: '/assets/videos/hero-banner.mp4',
    venueImage: '/assets/images/backgrounds/venue-palace.svg',
    eventBackdrop: '/assets/images/backgrounds/event-card-bg.webp',
    backgroundMusic: '/assets/audio/background-track.wav',
    backgroundMusicYouTubeUrl:
      'https://www.youtube.com/watch?v=DulIldoUXxM&list=RDDulIldoUXxM&start_radio=1',
  },
  contact: {},
}
