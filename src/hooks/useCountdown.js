import { useEffect, useState } from 'react'

function remaining(target) {
  let s = Math.max(0, Math.floor((target - Date.now()) / 1000))
  const done = s === 0
  const days = Math.floor(s / 86400)
  s %= 86400
  const hours = Math.floor(s / 3600)
  s %= 3600
  return { done, days, hours, minutes: Math.floor(s / 60), seconds: s % 60 }
}

export default function useCountdown(target) {
  const [state, setState] = useState(() => remaining(target))
  useEffect(() => {
    // align ticks to the wall-clock second so the display never skips a digit
    let timer
    const tick = () => {
      setState(remaining(target))
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 5)
    }
    tick()
    return () => clearTimeout(timer)
  }, [target])
  return state
}
