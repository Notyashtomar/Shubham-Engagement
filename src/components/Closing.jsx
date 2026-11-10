import { forwardRef } from 'react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import { FrameOrnaments, PhoneIcon, Rule } from './Ornaments'
import { formatPhone, telHref } from '../lib/event'
import config from '../weddingConfig'

const { closing, contact, event, images, music } = config

const Closing = forwardRef(function Closing(_, ref) {
  return (
    <Panel ref={ref} className="bg-close close" id="s5" aria-label="With love">
      <RevealGroup className="arch arch-close">
        <Reveal>
          <img className="monogram monogram-sm" src={images.monogram} alt="" />
        </Reveal>
        <Reveal as="p" className="line spaced">
          {closing.lines[0]}
          <br />
          {closing.lines[1]}
        </Reveal>
        <Reveal>
          <Rule />
          <p className="hosted">{closing.hostedBy}</p>
          <p className="hosts spaced">{closing.hosts}</p>
          <p className="when">{event.shortDate}</p>
        </Reveal>
      </RevealGroup>
      <Reveal className="rsvp">
        <FrameOrnaments />
        <p className="head spaced">{contact.heading}</p>
        <Rule />
        {contact.phones.map((p) => (
          <a key={p} href={telHref(p)}>
            <PhoneIcon />
            {formatPhone(p)}
          </a>
        ))}
      </Reveal>
      {music.src && music.credit && <p className="credit">{music.credit}</p>}
    </Panel>
  )
})

export default Closing
