import { useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Gate from './components/Gate'
import Stage from './components/Stage'
import Petals from './components/Petals'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import SaveTheDate from './components/SaveTheDate'
import Venue from './components/Venue'
import Closing from './components/Closing'
import { ScrollCue, SoundToggle } from './components/Controls'
import useMusic from './hooks/useMusic'
import config from './weddingConfig'

export default function App() {
  const [open, setOpen] = useState(false)
  const sections = useRef([])
  const music = useMusic(config.music.src, config.music.volume)
  const setSection = (i) => (el) => (sections.current[i] = el)

  useEffect(() => {
    document.documentElement.classList.toggle('locked', !open)
    document.body.classList.toggle('locked', !open)
  }, [open])

  const handleOpen = () => {
    window.scrollTo(0, 0)
    setOpen(true)
    music.start()
  }

  return (
    <MotionConfig reducedMotion="user">
      <Gate open={open} onOpen={handleOpen} hasMusic={music.available} />
      {open && music.available && <SoundToggle playing={music.playing} onToggle={music.toggle} />}
      {open && <ScrollCue sectionRefs={sections} />}

      <main className="card">
        <Stage sectionRefs={sections}>{open && config.effects.petals && <Petals />}</Stage>
        <Hero ref={setSection(0)} active={open} />
        <Invitation ref={setSection(1)} />
        <SaveTheDate ref={setSection(2)} />
        <Venue ref={setSection(3)} />
        <Closing ref={setSection(4)} />
      </main>
    </MotionConfig>
  )
}
