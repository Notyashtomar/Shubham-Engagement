import { motion } from 'motion/react'

const EASE = [0.25, 0.1, 0.25, 1]

export const revealItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
}

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

// A full-height section. Its Reveal descendants fade up in sequence once a quarter
// of the section is on screen, or when `active` becomes true if it is controlled.
export function Panel({ active, className = '', children, ...rest }) {
  const trigger =
    active === undefined
      ? { whileInView: 'show', viewport: { once: true, amount: 0.25 } }
      : { animate: active ? 'show' : 'hidden' }
  return (
    <motion.section className={`panel ${className}`} initial="hidden" variants={group} {...trigger} {...rest}>
      {children}
    </motion.section>
  )
}

export function Reveal({ as = 'div', className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={revealItem} {...rest}>
      {children}
    </Tag>
  )
}

const revealGroup = {
  hidden: revealItem.hidden,
  show: { ...revealItem.show, transition: { ...revealItem.show.transition, staggerChildren: 0.12 } },
}

// A container that reveals itself and staggers its own Reveal children.
export function RevealGroup({ as = 'div', className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={revealGroup} {...rest}>
      {children}
    </Tag>
  )
}
