import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import config from '../weddingConfig'

const { gate, images } = config
const EASE = [0.25, 0.1, 0.25, 1]

const content = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
}

// Holds the entrance until the web fonts are ready (or 1.2s pass) so text never swaps visibly.
function useFontsReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const done = () => setReady(true)
    const timer = setTimeout(done, 1200)
    document.fonts?.ready.then(done)
    return () => clearTimeout(timer)
  }, [])
  return ready
}

export default function Gate({ open, onOpen, hasMusic }) {
  const fontsReady = useFontsReady()
  return (
    <AnimatePresence>
      {!open && (
        <m.div
          className="gate"
          role="dialog"
          aria-label="Invitation cover"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
        >
          <m.div
            className="inner"
            style={{ backgroundImage: `url(${images.backgrounds.hero})` }}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1, transition: { duration: 6, ease: 'easeOut' } }}
            exit={{ scale: 1.06, transition: { duration: 1.1, ease: 'easeInOut' } }}
          >
            <m.div className="content" variants={content} initial="hidden" animate={fontsReady ? 'show' : 'hidden'} exit={{ opacity: 0, y: -16, transition: { duration: 0.7 } }}>
              <m.img variants={item} className="ganesh" src={images.ganesh} alt="Shri Ganesh" width="88" height="105" />
              <m.p variants={item} className="mantra" lang="hi">
                {gate.mantra}
              </m.p>
              <m.p variants={item} className="you">
                {gate.lead}
              </m.p>
              <m.p variants={item} className="invited">
                {gate.title}
              </m.p>
              <m.div variants={item}>
                <button type="button" onClick={onOpen}>
                  {gate.button}
                </button>
              </m.div>
              {hasMusic && (
                <m.p variants={item} className="note">
                  {gate.musicNote}
                </m.p>
              )}
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
