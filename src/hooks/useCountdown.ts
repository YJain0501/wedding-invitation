import { useEffect, useMemo, useState } from 'react'

export interface CountdownState {
  days: string
  hours: string
  minutes: string
  seconds: string
  isComplete: boolean
}

const ZERO_STATE: CountdownState = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
  isComplete: true,
}

function toPadded(value: number) {
  return String(value).padStart(2, '0')
}

function toCountdownState(targetDate: Date): CountdownState {
  const difference = targetDate.getTime() - Date.now()

  if (difference <= 0) {
    return ZERO_STATE
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return {
    days: toPadded(days),
    hours: toPadded(hours),
    minutes: toPadded(minutes),
    seconds: toPadded(seconds),
    isComplete: false,
  }
}

export function useCountdown(targetIsoDate: string) {
  const targetDate = useMemo(() => new Date(targetIsoDate), [targetIsoDate])
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    toCountdownState(targetDate),
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(toCountdownState(targetDate))
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [targetDate])

  return countdown
}
