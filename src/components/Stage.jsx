import { useEffect, useRef } from 'react'
import config from '../weddingConfig'

const order = ['hero', 'invite', 'date', 'venue', 'close']
const smooth = (x) => x * x * (3 - 2 * x)

// Fixed painted backdrops that dissolve into one another as each section scrolls in,
// with a slow upward drift across the whole page for depth.
export default function Stage({ sectionRefs, children }) {
  const layers = useRef([])

  useEffect(() => {
    let ticking = false
    const paint = () => {
      ticking = false
      const vh = window.innerHeight
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - vh || 1
      const drift = Math.min(1, y / max)
      sectionRefs.current.forEach((sec, i) => {
        const layer = layers.current[i]
        if (!sec || !layer) return
        if (i > 0) {
          const start = sec.offsetTop - vh * 0.85
          const p = Math.max(0, Math.min(1, (y - start) / (vh * 0.75)))
          layer.style.opacity = smooth(p).toFixed(3)
        }
        layer.style.transform = `translate3d(0, ${(drift * -1.5).toFixed(2)}%, 0) scale(1.03)`
      })
    }
    const request = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(paint)
      }
    }
    paint()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [sectionRefs])

  return (
    <div className="stage" aria-hidden="true">
      {order.map((key, i) => (
        <div
          key={key}
          ref={(el) => (layers.current[i] = el)}
          className={`layer layer-${key}`}
          style={{ backgroundImage: `url(${config.images.backgrounds[key]})`, opacity: i === 0 ? 1 : 0 }}
        />
      ))}
      {children}
    </div>
  )
}
