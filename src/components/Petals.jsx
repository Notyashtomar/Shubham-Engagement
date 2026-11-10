// A handful of jasmine blossoms drifting down very slowly behind the content.
const petals = [
  { left: 8, size: 13, delay: 0, dur: 19, sway: 5.2 },
  { left: 27, size: 10, delay: 7, dur: 23, sway: 6.1 },
  { left: 46, size: 14, delay: 3.5, dur: 21, sway: 4.6 },
  { left: 63, size: 9, delay: 11, dur: 25, sway: 5.8 },
  { left: 79, size: 12, delay: 5.5, dur: 20, sway: 6.6 },
  { left: 92, size: 10, delay: 14, dur: 24, sway: 5 },
]

function Jasmine() {
  return (
    <svg viewBox="0 0 20 20">
      <g fill="#fffaf0" stroke="rgba(169,132,63,.45)" strokeWidth=".4">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="10" cy="5" rx="2.6" ry="4.4" transform={`rotate(${r} 10 10)`} />
        ))}
      </g>
      <circle cx="10" cy="10" r="1.3" fill="#d2b26e" />
    </svg>
  )
}

export default function Petals() {
  return (
    <div className="petals">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        >
          <span className="sway" style={{ animationDuration: `${p.sway}s` }}>
            <Jasmine />
          </span>
        </span>
      ))}
    </div>
  )
}
