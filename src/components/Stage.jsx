import { useEffect, useRef } from 'react'
import config from '../weddingConfig'

const order = ['hero', 'invite', 'date', 'venue', 'close']
const smooth = (x) => x * x * (3 - 2 * x)

// Fixed painted backdrops that dissolve into one another as each section scrolls in,
// with a slow upward drift across the whole page for depth.
export default function Stage({ sectionRefs, children }) {
  const layers = useRef([])

  // Decode every backdrop up front, while the cover is showing, so no image decode
  // lands in the middle of a scroll.
  useEffect(() => {
    const warm = () =>
      order.forEach((key) => {
        const img = new Image()
        img.src = config.images.backgrounds[key]
        img.decode?.().catch(() => {})
      })
    const id = window.requestIdleCallback ? requestIdleCallback(warm, { timeout: 1500 }) : setTimeout(warm, 300)
    return () => (window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  useEffect(() => {
    // Layout is measured only on resize, so the per-frame work reads nothing but scrollY.
    let starts = []
    let span = 1
    let maxScroll = 1
    const measure = () => {
      const vh = window.innerHeight
      starts = sectionRefs.current.map((s) => (s ? s.offsetTop - vh * 0.85 : 0))
      span = vh * 0.75
      maxScroll = document.documentElement.scrollHeight - vh || 1
    }

    // Every layer stays composited (never hidden) so the GPU never has to re-rasterise a
    // full-screen image mid-scroll; only opacity and transform change, and only when they differ.
    const last = []
    let ticking = false
    const paint = () => {
      ticking = false
      const y = window.scrollY
      const drift = `translate3d(0, ${(Math.min(1, y / maxScroll) * -1.5).toFixed(2)}%, 0) scale(1.03)`
      layers.current.forEach((layer, i) => {
        if (!layer) return
        const o = i === 0 ? '1' : smooth(Math.max(0, Math.min(1, (y - starts[i]) / span))).toFixed(3)
        const key = o + drift
        if (last[i] === key) return
        last[i] = key
        layer.style.opacity = o
        layer.style.transform = drift
      })
    }
    const request = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(paint)
      }
    }
    const remeasure = () => {
      measure()
      request()
    }

    measure()
    paint()
    const ro = new ResizeObserver(remeasure)
    ro.observe(document.body)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', remeasure)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', remeasure)
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
