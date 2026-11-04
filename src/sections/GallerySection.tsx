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

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length)
  }, [images.length])

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
      className="bg-gradient-to-b from-[#2d0910] to-royal-burgundyDark px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <RoyalSectionHeader
          eyebrow="Moments of Love"
          title="Wedding Gallery"
          description="Every smile, every laugh, every memory — a celebration of love."
        />

        <div className="mt-9">
          <div className="royal-card relative overflow-hidden p-3 sm:p-4">
            <motion.button
              type="button"
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
              onClick={() => {
                setIsLightboxOpen(true)
              }}
              className="block w-full overflow-hidden rounded-xl border border-royal-gold/30"
              aria-label="Open gallery lightbox"
            >
              <LuxuryImage
                src={images[activeIndex]}
                alt={`Wedding gallery image ${activeIndex + 1}`}
                fallbackLabel={`Moment ${activeIndex + 1}`}
                className="h-[260px] w-full bg-royal-burgundyDark object-contain sm:h-[390px]"
              />
            </motion.button>

            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-6 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 text-royal-goldLight"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-6 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-gold/60 bg-royal-burgundyDark/80 text-royal-goldLight"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={`${image}-${index + 1}`}
                type="button"
                onClick={() => {
                  setActiveIndex(index)
                }}
                className={`relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg border ${
                  activeIndex === index
                    ? 'border-royal-gold'
                    : 'border-royal-gold/25'
                }`}
                aria-label={`View photo ${index + 1}`}
              >
                <LuxuryImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fallbackLabel={`Moment ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/85 px-3 py-6 backdrop-blur-sm sm:px-6"
          >
            <div className="mx-auto flex h-full max-w-5xl flex-col">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false)
                }}
                className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-royal-gold/55 bg-royal-burgundyDark/70 text-royal-goldLight"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>

              <div className="relative mt-4 flex-1 overflow-hidden rounded-xl border border-royal-gold/35">
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
                  className="h-full w-full"
                >
                  <LuxuryImage
                    src={images[activeIndex]}
                    alt={`Wedding gallery image ${activeIndex + 1}`}
                    fallbackLabel={`Moment ${activeIndex + 1}`}
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-gold/60 bg-royal-burgundyDark/75 text-royal-goldLight"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-royal-gold/60 bg-royal-burgundyDark/75 text-royal-goldLight"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
