import { forwardRef } from 'react'
import { Panel, Reveal } from './Reveal'
import { Rule } from './Ornaments'
import config from '../weddingConfig'

const { groom, bride, event, invitation } = config

function Person({ person }) {
  return (
    <>
      <p className="person spaced">{person.fullName}</p>
      <p className="rel spaced">{person.relation}</p>
      <p className="parents">
        {person.mother}
        <br />
        <span className="and">and</span> {person.father}
      </p>
    </>
  )
}

const Invitation = forwardRef(function Invitation(_, ref) {
  return (
    <Panel ref={ref} className="bg-invite" id="s2" aria-label="Invitation">
      <Reveal className="arch">
        <div className="om-mark" lang="hi" aria-label="Om">
          ॐ
        </div>
        <p className="lead">
          {invitation.lead.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <Rule />
        <p className="rite spaced">{event.rite}</p>
        <p className="gloss">{event.riteGloss}</p>
        <p className="of">of</p>
        <Person person={groom} />
        <div className="amp">&amp;</div>
        <Person person={bride} />
      </Reveal>
    </Panel>
  )
})

export default Invitation
