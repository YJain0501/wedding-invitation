import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Music2 } from 'lucide-react'

interface MusicPlayerProps {
  src?: string
  youtubeUrl?: string
}

export interface MusicPlayerHandle {
  playFromUserGesture: () => void
}

const YOUTUBE_VIDEO_ID_LENGTH = 11

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
])

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/

function extractYouTubeVideoId(urlOrId: string): string | null {
  const trimmedValue = urlOrId.trim()

  if (YOUTUBE_ID_PATTERN.test(trimmedValue)) {
    return trimmedValue
  }

  try {
    const parsedUrl = new URL(trimmedValue)

    if (!YOUTUBE_HOSTS.has(parsedUrl.hostname)) {
      return null
    }

    if (parsedUrl.hostname.includes('youtu.be')) {
      const shortPathId = parsedUrl.pathname.slice(1, 1 + YOUTUBE_VIDEO_ID_LENGTH)
      return YOUTUBE_ID_PATTERN.test(shortPathId) ? shortPathId : null
    }

    const queryVideoId = parsedUrl.searchParams.get('v')
    if (queryVideoId && YOUTUBE_ID_PATTERN.test(queryVideoId)) {
      return queryVideoId
    }

    const embedPathMatch = parsedUrl.pathname.match(
      /\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/,
    )
    if (embedPathMatch?.[1]) {
      return embedPathMatch[1]
    }
  } catch {
    return null
  }

  return null
}

function buildYouTubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '0',
    controls: '0',
    rel: '0',
    loop: '1',
    playlist: videoId,
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
  })

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(function MusicPlayer(
  { src, youtubeUrl },
  ref,
) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const youtubeIframeRef = useRef<HTMLIFrameElement | null>(null)
  const queuedYouTubePlayRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioAvailable, setIsAudioAvailable] = useState(Boolean(src))
  const [isYouTubeReady, setIsYouTubeReady] = useState(false)

  const youtubeVideoId = useMemo(
    () => (youtubeUrl ? extractYouTubeVideoId(youtubeUrl) : null),
    [youtubeUrl],
  )
  const youtubeEmbedUrl = useMemo(
    () => (youtubeVideoId ? buildYouTubeEmbedUrl(youtubeVideoId) : ''),
    [youtubeVideoId],
  )
  const usingYouTube = Boolean(youtubeVideoId)
  const hasAnySource = usingYouTube || Boolean(src)
  const canControlPlayer = usingYouTube ? isYouTubeReady : isAudioAvailable

  const postYouTubeCommand = useCallback(
    (command: 'playVideo' | 'pauseVideo') => {
      const iframeWindow = youtubeIframeRef.current?.contentWindow

      if (!iframeWindow || !youtubeVideoId) {
        return
      }

      iframeWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: command,
          args: [],
        }),
        '*',
      )
    },
    [youtubeVideoId],
  )

  const playYouTube = useCallback(() => {
    if (!isYouTubeReady) {
      queuedYouTubePlayRef.current = true
      return
    }

    postYouTubeCommand('playVideo')
    setIsPlaying(true)
  }, [isYouTubeReady, postYouTubeCommand])

  useEffect(() => {
    if (!usingYouTube || !isYouTubeReady) {
      return
    }

    if (queuedYouTubePlayRef.current) {
      queuedYouTubePlayRef.current = false
      playYouTube()
    }
  }, [isYouTubeReady, playYouTube, usingYouTube])

  useImperativeHandle(
    ref,
    () => ({
      playFromUserGesture: () => {
        if (!hasAnySource) {
          return
        }

        if (usingYouTube) {
          playYouTube()
          return
        }

        const audioElement = audioRef.current
        if (!audioElement || !isAudioAvailable) {
          return
        }

        void audioElement
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            setIsPlaying(false)
          })
      },
    }),
    [hasAnySource, isAudioAvailable, playYouTube, usingYouTube],
  )

  if (!hasAnySource) {
    return null
  }

  const togglePlay = async () => {
    if (usingYouTube) {
      if (isPlaying) {
        postYouTubeCommand('pauseVideo')
        setIsPlaying(false)
        return
      }

      playYouTube()
      return
    }

    const audioElement = audioRef.current
    if (!audioElement || !canControlPlayer) {
      return
    }

    if (isPlaying) {
      audioElement.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audioElement.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <div className={`im-music-toggle ${isPlaying ? 'im-music-toggle--playing' : ''}`}>
      {usingYouTube ? (
        <iframe
          ref={youtubeIframeRef}
          title="Wedding background music"
          src={youtubeEmbedUrl}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="eager"
          onLoad={() => {
            setIsYouTubeReady(true)
          }}
        />
      ) : (
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="auto"
          onEnded={() => {
            setIsPlaying(false)
          }}
          onPause={() => {
            setIsPlaying(false)
          }}
          onError={() => {
            setIsAudioAvailable(false)
            setIsPlaying(false)
          }}
        />
      )}

      <button
        type="button"
        className="im-music-toggle__btn"
        style={{ backgroundColor: 'rgba(255,255,255,0.72)', color: '#3a2f28' }}
        onClick={togglePlay}
        disabled={!canControlPlayer}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        <span className="im-music-toggle__icon im-music-toggle__icon--note">
          <Music2 size={17} />
        </span>
        <span className="im-music-toggle__icon im-music-toggle__icon--equalizer" aria-hidden>
          <span className="im-music-toggle__bar" />
          <span className="im-music-toggle__bar" />
          <span className="im-music-toggle__bar" />
          <span className="im-music-toggle__bar" />
        </span>
      </button>
    </div>
  )
})
