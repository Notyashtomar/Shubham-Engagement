import { useCallback, useEffect, useRef, useState } from 'react'

// Background music that can only begin from a user gesture (browser autoplay rules).
// If the file is missing the music UI is hidden, like the reference.
export default function useMusic(src, targetVolume = 1) {
  const audio = useRef(null)
  const fade = useRef(null)
  const wantsPlay = useRef(false)
  const [available, setAvailable] = useState(Boolean(src))
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!src) return
    const a = new Audio(src)
    a.loop = true
    a.preload = 'auto'
    const onError = () => setAvailable(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener('error', onError)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    audio.current = a

    const onVisibility = () => {
      if (document.hidden) a.pause()
      else if (wantsPlay.current) a.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearInterval(fade.current)
      a.pause()
      a.removeEventListener('error', onError)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
    }
  }, [src])

  const start = useCallback(() => {
    const a = audio.current
    if (!a) return
    wantsPlay.current = true
    a.volume = 0
    a.play().catch(() => {})
    let v = 0
    clearInterval(fade.current)
    fade.current = setInterval(() => {
      v = Math.min(targetVolume, v + 0.04)
      a.volume = v
      if (v >= targetVolume) clearInterval(fade.current)
    }, 120)
  }, [targetVolume])

  const toggle = useCallback(() => {
    const a = audio.current
    if (!a) return
    if (a.paused) {
      wantsPlay.current = true
      a.volume = targetVolume
      a.play().catch(() => {})
    } else {
      wantsPlay.current = false
      a.pause()
    }
  }, [targetVolume])

  return { available, playing, start, toggle }
}
