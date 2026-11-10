import { forwardRef } from 'react'
import { Panel, Reveal } from './Reveal'
import { Rule } from './Ornaments'
import { directionsUrl, mapsUrl } from '../lib/event'
import config from '../weddingConfig'

const { venue } = config

const Venue = forwardRef(function Venue(_, ref) {
  return (
    <Panel ref={ref} className="bg-venue venue" id="s4" aria-label="Venue">
      <Reveal className="arch arch-venue">
        <p className="label spaced">{venue.label}</p>
        <h2 className="place spaced">{venue.name}</h2>
        <Rule />
        <p className="addr">
          {venue.addressLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </Reveal>
      <Reveal className="stack">
        <a className="btn" target="_blank" rel="noopener noreferrer" href={mapsUrl}>
          View on Google Maps
        </a>
        <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={directionsUrl}>
          Get Directions
        </a>
      </Reveal>
    </Panel>
  )
})

export default Venue
