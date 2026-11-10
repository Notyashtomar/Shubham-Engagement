import { forwardRef } from 'react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import config from '../weddingConfig'

const { groom, bride, event, images } = config

const Hero = forwardRef(function Hero({ active }, ref) {
  return (
    <Panel ref={ref} active={active} className="hero" id="s1" aria-label={`${groom.firstName} and ${bride.firstName}`}>
      <RevealGroup className="arch arch-hero">
        <Reveal>
          <img className="monogram" src={images.monogram} alt={`${groom.firstName} and ${bride.firstName} monogram`} />
        </Reveal>
        <Reveal as="p" className="kicker spaced">
          {event.name}
        </Reveal>
        <Reveal>
          <h1 className="name">{groom.firstName}</h1>
          <div className="amp">&amp;</div>
          <h1 className="name">{bride.firstName}</h1>
        </Reveal>
        <Reveal as="p" className="when">
          {event.shortDate}
        </Reveal>
      </RevealGroup>
    </Panel>
  )
})

export default Hero
