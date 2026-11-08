import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { LuxuryImage } from '@/components/common/LuxuryImage'
import { RoyalSectionHeader } from '@/components/common/RoyalSectionHeader'
import type { WeddingConfig } from '@/config/weddingConfig'

interface GallerySectionProps {
  config: WeddingConfig
}

export function GallerySection({ config }: GallerySectionProps) {
  const images = useMemo(
    () => (config.gallery.length ? config.gallery : ['/assets/images/gallery/moment-01.svg']),
    [config.gallery],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [coverflowDistance, setCoverflowDistance] = useState(210)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)')
    const updateDistance = () => {
      setCoverflowDistance(mediaQuery.matches ? 130 : 210)
    }

    updateDistance()
    mediaQuery.addEventListener('change', updateDistance)

    return () => {
      mediaQuery.removeEventListener('change', updateDistance)
    }
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length)
  }, [images.length])

  const getRelativeOffset = useCallback(
    (index: number) => {
      const total = images.length
      let delta = index - activeIndex

      if (delta > total / 2) {
        delta -= total
      } else if (delta < -total / 2) {
        delta += total
      }

      return delta
    },
    [activeIndex, images.length],
  )

  useEffect(() => {
    if (!isLightboxOpen) {
      return
    }

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false)
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => {
      window.removeEventListener('keydown', handleKeyboard)
    }
  }, [isLightboxOpen, showNext, showPrevious])

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-b from-[#2d0910] to-royal-burgundyDark px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <RoyalSectionHeader
          eyebrow="Captured Moments"
          title="Our Gallery"
          description="Every smile, every laugh, every stolen glance — captured forever."
        />

        <div className="mt-10">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) {
                showPrevious()
              }

              if (info.offset.x < -80) {
                showNext()
              }
            }}
            className="relative flex h-[360px] touch-pan-y items-center justify-center [perspective:1400px] sm:h-[440px] md:h-[520px]"
          >
            {images.map((image, index) => {
              const offset = getRelativeOffset(index)
              const absoluteOffset = Math.abs(offset)
              const isActive = offset === 0
              const isHidden = absoluteOffset > 2
              const scale = isActive ? 1 : Math.max(0.58, 0.82 - 0.08 * (absoluteOffset - 1))

              return (
                <motion.button
                  key={`${image}-${index + 1}`}
                  type="button"
                  onClick={() => {
                    if (isActive) {
                      setIsLightboxOpen(true)
                      return
                    }

                    setActiveIndex(index)
                  }}
                  className={`absolute aspect-[3/4] w-[210px] overflow-hidden rounded-[1.6rem] border p-0 sm:w-[260px] md:w-[320px] ${isActive ? 'border-royal-gold/55' : 'border-royal-gold/35'}`}
                  style={{ pointerEvents: isHidden ? 'none' : 'auto' }}
                  animate={{
                    x: offset * coverflowDistance,
                    scale,
                    rotateY: -26 * offset,
                    opacity: isHidden ? 0 : absoluteOffset > 1 ? 0.45 : 1,
                    filter: isHidden ? 'blur(2px)' : isActive ? 'blur(0px)' : 'blur(1.5px)',
                    zIndex: 12 - absoluteOffset,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  aria-label={`Wedding photo ${index + 1}`}
                >
                  <LuxuryImage
                    src={image}
                    alt={`Wedding gallery image ${index + 1}`}
                    fallbackLabel={`Moment ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-[1.6rem] shadow-[inset_0_0_0_1px_rgba(255,253,248,0.4)]" />
                </motion.button>
              )
            })}
          </motion.div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal-gold/50 bg-royal-burgundyDark/70 text-royal-goldLight transition hover:scale-105"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {images.map((_, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={`dot-${index + 1}`}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index)
                    }}
                    className={`h-[6px] rounded-full transition-all ${isActive ? 'w-8 bg-royal-gold' : 'w-[6px] bg-royal-gold/45'}`}
                    aria-label={`Show photo ${index + 1}`}
                  />
                )
              })}
            </div>

            <button
              type="button"
              onClick={showNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal-gold/50 bg-royal-burgundyDark/70 text-royal-goldLight transition hover:scale-105"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-[#1e140fd9] px-3 py-6 backdrop-blur-[8px] sm:px-6"
          >
            <div className="mx-auto flex h-full max-w-5xl flex-col">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false)
                }}
                className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-royal-gold/55 bg-royal-cream/85 text-royal-text"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              <div className="relative mt-4 flex-1 overflow-hidden">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 90) {
                      showPrevious()
                    }

                    if (info.offset.x < -90) {
                      showNext()
                    }
                  }}
                  className="flex h-full items-center justify-center p-2 sm:p-4"
                >
                  <LuxuryImage
                    src={images[activeIndex]}
                    alt={`Wedding gallery image ${activeIndex + 1}`}
                    fallbackLabel={`Moment ${activeIndex + 1}`}
                    className="max-h-full max-w-full rounded-[1.5rem] border border-royal-gold/60 object-contain"
                  />
                </motion.div>

                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-royal-cream/85 text-royal-text sm:left-4 sm:h-11 sm:w-11"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-royal-cream/85 text-royal-text sm:right-4 sm:h-11 sm:w-11"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </button>

                <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-royal-cream/85 px-3 py-1 text-xs tracking-[0.08em] text-royal-text">
                  {activeIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
