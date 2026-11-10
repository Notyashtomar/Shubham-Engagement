import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Panel, Reveal } from './Reveal'
import { Rule } from './Ornaments'
import useCountdown from '../hooks/useCountdown'
import { eventStart, googleCalendarUrl, icsDataUrl, icsFileName } from '../lib/event'
import config from '../weddingConfig'

const { event } = config
const pad = (n) => String(n).padStart(2, '0')

function Digit({ value }) {
  const text = pad(value)
  return (
    <b>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </b>
  )
}

function Countdown() {
  const { done, days, hours, minutes, seconds } = useCountdown(eventStart.getTime())
  if (done) {
    return (
      <div className="count-done" role="status">
        <p className="done-title">{event.startedMessage}</p>
        <p className="done-sub">{event.startedSubtext}</p>
      </div>
    )
  }
  const units = [
    [days, 'days'],
    [hours, 'hours'],
    [minutes, 'mins'],
    [seconds, 'secs'],
  ]
  return (
    <div className="count" role="timer" aria-label={`${days} days, ${hours} hours, ${minutes} minutes to go`}>
      {units.map(([v, label]) => (
        <div key={label}>
          <Digit value={v} />
          <small>{label}</small>
        </div>
      ))}
    </div>
  )
}

const SaveTheDate = forwardRef(function SaveTheDate(_, ref) {
  return (
    <Panel ref={ref} className="bg-date date" id="s3" aria-label="Save the date">
      <Reveal as="h2" className="title">
        Save the Date
      </Reveal>
      <Reveal>
        <p className="day">{event.day}</p>
        <p className="month spaced">{event.monthYear}</p>
        <Rule />
        <p className="time spaced">
          {event.weekday}, {event.time}
        </p>
      </Reveal>
      <Reveal>
        <Countdown />
        <div className="btns">
          <a className="btn" target="_blank" rel="noopener noreferrer" href={googleCalendarUrl}>
            Google Calendar
          </a>
          <a className="btn ghost" href={icsDataUrl()} download={icsFileName}>
            Apple Calendar
          </a>
        </div>
      </Reveal>
    </Panel>
  )
})

export default SaveTheDate
