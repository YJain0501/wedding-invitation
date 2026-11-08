import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flower2 } from 'lucide-react'
import { doorOpenLeft, doorOpenRight } from '@/components/animations/variants'
import { FloatingLanterns } from '@/components/invitation/FloatingLanterns'
import { FloatingParticles } from '@/components/invitation/FloatingParticles'
import { useReducedMotionPreference } from '@/hooks/useReducedMotion'

interface WelcomeSectionProps {
  groomName: string
  brideName: string
  dateLabel: string
  backgroundImage: string
  coverVideo?: string
  coverPoster?: string
  coverVideoDurationSeconds?: number
  onOpenStarted?: () => void
  onOpened: () => void
}

export function WelcomeSection({
  groomName,
  brideName,
  dateLabel,
  backgroundImage,
  coverVideo,
  coverPoster,
  coverVideoDurationSeconds,
  onOpenStarted,
  onOpened,
}: WelcomeSectionProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const hasCoverVideo = Boolean(coverVideo)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const openingTimerRef = useRef<number | undefined>(undefined)
  const hasCompletedRef = useRef(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isRevealSequence, setIsRevealSequence] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const reducedMotionDoorState = isOpening
    ? { opacity: 0.12, transition: { duration: 0.35 } }
    : { opacity: 1, transition: { duration: 0.2 } }

  useEffect(() => () => {
    if (openingTimerRef.current) {
      window.clearTimeout(openingTimerRef.current)
    }
  }, [])

  const completeOpening = () => {
    if (hasCompletedRef.current) {
      return
    }

    hasCompletedRef.current = true
    setIsRevealSequence(true)

    const revealDuration = prefersReducedMotion ? 420 : 1300
    openingTimerRef.current = window.setTimeout(() => {
      setIsClosing(true)

      const fadeDuration = prefersReducedMotion ? 220 : 540
      openingTimerRef.current = window.setTimeout(() => {
        onOpened()
      }, fadeDuration)
    }, revealDuration)
  }

  const openInvitation = () => {
    if (isOpening) {
      return
    }

    onOpenStarted?.()
    setIsOpening(true)

    if (hasCoverVideo) {
      const videoDurationMs = Math.max(1200, (coverVideoDurationSeconds ?? 12) * 1000)
      const videoElement = videoRef.current

      const openAfterDuration = () => {
        openingTimerRef.current = window.setTimeout(() => {
          completeOpening()
        }, videoDurationMs)
      }

      if (!videoElement) {
        openAfterDuration()
        return
      }

      const playAttempt = videoElement.play()

      if (!playAttempt || typeof playAttempt.then !== 'function') {
        openAfterDuration()
        return
      }

      playAttempt
        .then(() => {
          openAfterDuration()
        })
        .catch(() => {
          openingTimerRef.current = window.setTimeout(() => {
            completeOpening()
          }, prefersReducedMotion ? 650 : 1800)
        })

      return
    }

    const delay = prefersReducedMotion ? 550 : 2200
    openingTimerRef.current = window.setTimeout(() => {
      completeOpening()
    }, delay)
  }

  if (hasCoverVideo) {
    return (
      <motion.section
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        className={`im-cover-video fixed inset-0 z-[90] overflow-hidden ${isOpening ? 'is-playing' : ''} ${isClosing ? 'is-closing' : ''}`.trim()}
      >
        <video
          ref={videoRef}
          className="im-cover-video__video"
          src={coverVideo}
          poster={coverPoster}
          style={{ objectPosition: '50% 57%' }}
          playsInline
          disablePictureInPicture
          preload="auto"
          onPlaying={() => {
            setIsVideoReady(true)
          }}
          onEnded={() => {
            completeOpening()
          }}
        />

        {coverPoster ? (
          <img
            className={`im-cover-video__poster-overlay transition-opacity duration-500 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
            src={coverPoster}
            style={{ objectPosition: '50% 57%' }}
            alt=""
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,3,5,0.2)_0%,rgba(12,4,8,0.56)_56%,rgba(12,4,8,0.9)_100%)]" />
        <div className={`im-cover-video__reveal ${isRevealSequence ? 'is-active' : ''}`}>
          <span className="im-cover-video__reveal-light" />
          <span className="im-cover-video__reveal-door im-cover-video__reveal-door--left" />
          <span className="im-cover-video__reveal-door im-cover-video__reveal-door--right" />
        </div>

        <div className="absolute inset-0 z-[3] flex items-center justify-center px-4">
          <div className="w-[min(92vw,24rem)] text-center text-royal-ivory">
            <p className="font-serif text-[0.62rem] uppercase tracking-[0.25em] text-royal-goldLight/90 sm:text-[0.7rem]">
              An Invitation to Celebrate Love
            </p>
            <h1 className="mt-3 font-serif text-2xl uppercase tracking-[0.11em] text-amber-100 sm:text-3xl">
              {groomName}
            </h1>
            <p className="my-0.5 font-script text-4xl text-royal-goldLight sm:text-5xl">
              &
            </p>
            <h2 className="font-serif text-2xl uppercase tracking-[0.11em] text-amber-100 sm:text-3xl">
              {brideName}
            </h2>
            <p className="mt-2 font-serif text-[0.66rem] uppercase tracking-[0.23em] text-royal-goldLight sm:text-xs">
              {dateLabel}
            </p>

            <button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              className="im-cover-video__play-btn !static !left-auto !top-auto !mt-6 !inline-flex !-translate-x-0 !-translate-y-0 !rounded-full !px-6 !py-2.5 text-royal-ivory transition hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-80"
              style={{ color: '#fffdf8', backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
              aria-label="Tap to open invitation"
            >
              <span className="im-cover-video__play-btn-shine" />
              <span className="im-cover-video__play-btn-label">
                {isOpening ? 'Opening...' : 'Tap to Open'}
              </span>
            </button>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[90] flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pb-4 pt-10 sm:px-6"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15, 3, 7, 0.58), rgba(12, 2, 6, 0.82)), url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <FloatingLanterns />
      <FloatingParticles className="opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(244,217,154,0.36),transparent_34%)]" />

      <motion.div
        animate={isOpening ? { scale: 1.04 } : { scale: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 1, 0.22, 1] }}
        className="relative w-full max-w-[440px] [perspective:1450px]"
      >
        <div className="palace-arch relative h-[73svh] min-h-[450px] w-full overflow-hidden rounded-[1.7rem] px-3 pb-5 pt-9">
          <div className="absolute left-1/2 top-4 h-7 w-7 -translate-x-1/2 text-royal-goldLight">
            <Flower2 size={28} />
          </div>
          <div className="absolute left-6 right-6 top-14 h-px bg-gradient-to-r from-transparent via-royal-gold/80 to-transparent" />

          <motion.div
            animate={isOpening ? { opacity: 1, scale: 1.2 } : { opacity: 0.05, scale: 0.7 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="light-burst pointer-events-none absolute inset-5"
          />

          <div className="relative flex h-full flex-col justify-between">
            <div className="px-4 text-center">
              <p className="font-serif text-[0.65rem] uppercase tracking-[0.26em] text-royal-goldLight/95 sm:text-xs">
                An Invitation to Celebrate Love
              </p>
              <h1 className="mt-5 font-serif text-2xl uppercase tracking-[0.12em] text-royal-ivory sm:text-3xl">
                {groomName}
              </h1>
              <p className="my-1 font-script text-4xl text-royal-goldLight sm:text-5xl">
                &
              </p>
              <h2 className="font-serif text-2xl uppercase tracking-[0.12em] text-royal-ivory sm:text-3xl">
                {brideName}
              </h2>
              <p className="mt-3 font-serif text-[0.7rem] uppercase tracking-[0.24em] text-royal-goldLight sm:text-xs">
                {dateLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              className="relative mx-auto block h-[52%] w-[94%] max-w-[360px] cursor-pointer [transform-style:preserve-3d]"
              aria-label="Open palace entrance"
            >
              <div className="absolute inset-y-4 left-1/2 z-[3] w-[1px] -translate-x-1/2 bg-gradient-to-b from-royal-gold/30 via-royal-gold to-royal-gold/30" />

              <motion.div
                variants={doorOpenLeft}
                animate={
                  prefersReducedMotion
                    ? reducedMotionDoorState
                    : isOpening
                      ? 'open'
                      : 'closed'
                }
                initial="closed"
                style={{ transformOrigin: 'left center' }}
                className="palace-door palace-door-left absolute inset-y-0 left-0 w-1/2 rounded-l-[1.1rem]"
              />

              <motion.div
                variants={doorOpenRight}
                animate={
                  prefersReducedMotion
                    ? reducedMotionDoorState
                    : isOpening
                      ? 'open'
                      : 'closed'
                }
                initial="closed"
                style={{ transformOrigin: 'right center' }}
                className="palace-door palace-door-right absolute inset-y-0 right-0 w-1/2 rounded-r-[1.1rem]"
              />
            </button>

            <motion.button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              animate={
                isOpening
                  ? { opacity: 0.4, scale: 0.98 }
                  : { opacity: 1, scale: 1 }
              }
              className="animate-gold-pulse mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-royal-goldLight transition hover:text-amber-100 disabled:cursor-not-allowed"
              aria-label="Tap to open the invitation"
            >
              <Flower2 size={14} />
              Tap to Open the Invitation
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
