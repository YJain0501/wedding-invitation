import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react'

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
  const [isMuted, setIsMuted] = useState(false)
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
  const canControlPlayer = usingYouTube || isAudioAvailable

  useEffect(() => {
    const audioElement = audioRef.current

    if (!audioElement || usingYouTube) {
      return
    }

    audioElement.muted = isMuted
  }, [isMuted, usingYouTube])

  const postYouTubeCommand = useCallback(
    (command: 'playVideo' | 'pauseVideo' | 'mute' | 'unMute') => {
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
    postYouTubeCommand(isMuted ? 'mute' : 'unMute')
    setIsPlaying(true)
  }, [isMuted, isYouTubeReady, postYouTubeCommand])

  useEffect(() => {
    if (!usingYouTube || !isYouTubeReady) {
      return
    }

    if (queuedYouTubePlayRef.current) {
      queuedYouTubePlayRef.current = false
      playYouTube()
    }
  }, [isYouTubeReady, playYouTube, usingYouTube])

  useEffect(() => {
    if (!usingYouTube || !isYouTubeReady) {
      return
    }

    postYouTubeCommand(isMuted ? 'mute' : 'unMute')
  }, [isMuted, isYouTubeReady, postYouTubeCommand, usingYouTube])

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

  const toggleMute = () => {
    setIsMuted((current) => !current)
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full border border-royal-gold/45 bg-royal-burgundyDark/85 px-2 py-1.5 shadow-gold backdrop-blur">
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
          preload="none"
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
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-royal-burgundy text-royal-goldLight">
        <Music2 size={16} />
      </span>
      <button
        type="button"
        onClick={togglePlay}
        disabled={!canControlPlayer}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-royal-gold/40 text-royal-goldLight disabled:cursor-not-allowed disabled:opacity-45"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        disabled={!canControlPlayer}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-royal-gold/40 text-royal-goldLight disabled:cursor-not-allowed disabled:opacity-45"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>
    </div>
  )
})
