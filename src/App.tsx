import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BackToTopButton } from '@/components/layout/BackToTopButton'
import { MobileQuickNav } from '@/components/layout/MobileQuickNav'
import { MusicPlayer, type MusicPlayerHandle } from '@/components/layout/MusicPlayer'
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar'
import { weddingConfig } from '@/config/weddingConfig'
import { CountdownSection } from '@/sections/CountdownSection'
import { CoupleSection } from '@/sections/CoupleSection'
import { EventsSection } from '@/sections/EventsSection'
import { FooterSection } from '@/sections/FooterSection'
import { GallerySection } from '@/sections/GallerySection'
import { HeroSection } from '@/sections/HeroSection'
import { InvitationSection } from '@/sections/InvitationSection'
import { RSVPSection } from '@/sections/RSVPSection'
import { SurpriseSection } from '@/sections/SurpriseSection'
import { VenueSection } from '@/sections/VenueSection'
import { WelcomeSection } from '@/sections/WelcomeSection'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null)

  useEffect(() => {
    document.body.style.overflow = showWelcome ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [showWelcome])

  return (
    <div className="relative min-h-svh bg-royal-burgundyDark text-royal-ivory">
      <ScrollProgressBar />
      <HeroSection config={weddingConfig} />
      <InvitationSection config={weddingConfig} />
      <CoupleSection config={weddingConfig} />
      <CountdownSection config={weddingConfig} />
      <EventsSection config={weddingConfig} />
      <GallerySection config={weddingConfig} />
      <VenueSection config={weddingConfig} />
      <SurpriseSection config={weddingConfig} />
      <RSVPSection config={weddingConfig} />
      <FooterSection config={weddingConfig} />

      <MusicPlayer
        ref={musicPlayerRef}
        src={weddingConfig.media.backgroundMusic}
        youtubeUrl={weddingConfig.media.backgroundMusicYouTubeUrl}
      />
      <BackToTopButton />
      <MobileQuickNav />

      <AnimatePresence>
        {showWelcome ? (
          <WelcomeSection
            groomName={weddingConfig.groom.name}
            brideName={weddingConfig.bride.name}
            dateLabel={weddingConfig.wedding.dateRangeLabel.toUpperCase()}
            backgroundImage={weddingConfig.media.welcomeBackground}
            onOpenStarted={() => {
              musicPlayerRef.current?.playFromUserGesture()
            }}
            onOpened={() => {
              setShowWelcome(false)
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default App
