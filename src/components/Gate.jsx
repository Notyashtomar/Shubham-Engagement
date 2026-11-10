import { AnimatePresence, motion } from 'motion/react'
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

export default function Gate({ open, onOpen, hasMusic }) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="gate"
          role="dialog"
          aria-label="Invitation cover"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
        >
          <motion.div
            className="inner"
            style={{ backgroundImage: `url(${images.backgrounds.hero})` }}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1, transition: { duration: 6, ease: 'easeOut' } }}
            exit={{ scale: 1.06, transition: { duration: 1.1, ease: 'easeInOut' } }}
          >
            <motion.div className="content" variants={content} initial="hidden" animate="show" exit={{ opacity: 0, y: -16, transition: { duration: 0.7 } }}>
              <motion.img variants={item} className="ganesh" src={images.ganesh} alt="Shri Ganesh" width="88" height="105" />
              <motion.p variants={item} className="mantra" lang="hi">
                {gate.mantra}
              </motion.p>
              <motion.p variants={item} className="you">
                {gate.lead}
              </motion.p>
              <motion.p variants={item} className="invited">
                {gate.title}
              </motion.p>
              <motion.div variants={item}>
                <button type="button" onClick={onOpen}>
                  {gate.button}
                </button>
              </motion.div>
              {hasMusic && (
                <motion.p variants={item} className="note">
                  {gate.musicNote}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
