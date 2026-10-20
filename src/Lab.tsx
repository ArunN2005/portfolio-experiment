import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  Circle,
  Play,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Terminal,
} from 'lucide-react'

const steps = [
  [
    'Analyze',
    'Read the repository',
    'Inspect the structure, dependencies, and runtime requirements.',
  ],
  ['Plan', 'Map the changes', 'Break the migration into focused, reviewable steps.'],
  ['Build', 'Make it runnable', 'Apply the planned changes in a containerized environment.'],
  ['Deploy', 'Give it a home', 'Deploy the build to cloud infrastructure.'],
  [
    'Validate',
    'Close the loop',
    'Check runtime output. If something fails, feed the error back into the build.',
  ],
]

export default function Lab() {
  const [tab, setTab] = useState('pipeline')
  const [stage, setStage] = useState(-1)
  const [running, setRunning] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [reading, setReading] = useState(6)
  const [hour, setHour] = useState(14)
  const [confidence, setConfidence] = useState(85)
  const [distance, setDistance] = useState(2)
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current)
    },
    [],
  )
  const reset = () => {
    if (timer.current) clearInterval(timer.current)
    setRunning(false)
    setStage(-1)
  }
  const run = () => {
    if (timer.current) clearInterval(timer.current)
    setStage(0)
    setRunning(true)
    let current = 0
    timer.current = setInterval(() => {
      current += 1
      if (current > 4) {
        clearInterval(timer.current!)
        setRunning(false)
      } else setStage(current)
    }, 850)
  }
  const checks = [
    { label: 'Within 10 kW capacity', pass: reading <= 10 },
    { label: 'Daylight hours (06–18)', pass: reading === 0 || (hour >= 6 && hour <= 18) },
    { label: 'No sudden spike (previous: 5 kW)', pass: Math.abs(reading - 5) <= 5 },
  ]
  const valid = checks.every((c) => c.pass)
  const score = Math.round(confidence * (1 / (1 + distance / 5)))
  return (
    <div className="lab-widget">
      <div
        className="lab-tabs"
        role="tablist"
        aria-label="Interactive experiments"
        onKeyDown={(e) => {
          const ids = ['pipeline', 'solar', 'civic']
          const i = ids.indexOf(tab)
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            const next = ids[(i + (e.key === 'ArrowRight' ? 1 : 2)) % 3]
            setTab(next)
            document.getElementById(`tab-${next}`)?.focus()
          }
        }}
      >
        {[
          ['pipeline', '01', 'Migration'],
          ['solar', '02', 'Solar verifier'],
          ['civic', '03', 'Civic triage'],
        ].map(([id, number, label]) => (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
          >
            <span>{number}</span>
            {label}
          </button>
        ))}
      </div>
      <div
        className="lab-content"
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
      >
        {tab === 'pipeline' && (
          <>
            <div className="lab-panel-title">
              <div>
                <span className="eyebrow">INSIDE LAZARUS</span>
                <h3>From legacy to possibility.</h3>
              </div>
              <Terminal size={25} strokeWidth={1} />
            </div>
            <div className="pipeline">
              {steps.map(([name], i) => (
                <button
                  key={name}
                  onClick={() => {
                    if (timer.current) clearInterval(timer.current)
                    setRunning(false)
                    setStage(i)
                  }}
                  className={stage >= i ? 'complete' : ''}
                  aria-label={`Explore ${name} stage`}
                  aria-pressed={stage === i}
                >
                  <span className="pipeline-dot">
                    {stage > i ? <Check size={15} /> : <span>{i + 1}</span>}
                  </span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <div className="pipeline-explanation" aria-live="polite">
              <span className="terminal-prompt">›</span>
              <div>
                <strong>
                  {stage < 0 ? 'Every good migration starts with understanding.' : steps[stage][1]}
                </strong>
                <p>
                  {stage < 0
                    ? 'Run the sequence or select a stage to see how the pieces fit together.'
                    : steps[stage][2]}
                </p>
              </div>
            </div>
            <div className="lab-bottom">
              <span className="mono">INTERACTIVE CONCEPT · NO LIVE DEPLOYMENT</span>
              <div>
                <button className="icon-button" onClick={reset} aria-label="Reset migration">
                  <RotateCcw size={16} />
                </button>
                <button className="small-button" onClick={run} disabled={running}>
                  <Play size={13} />
                  {running ? 'Running…' : stage === 4 ? 'Run again' : 'Run sequence'}
                </button>
              </div>
            </div>
          </>
        )}
        {tab === 'solar' && (
          <>
            <div className="lab-panel-title">
              <div>
                <span className="eyebrow">INSPIRED BY JOULET</span>
                <h3>Can this reading be trusted?</h3>
              </div>
              <ShieldCheck size={27} strokeWidth={1} />
            </div>
            <div className="simulator-grid">
              <div className="slider-group">
                <label htmlFor="reading">
                  Solar output <strong>{reading} kW</strong>
                </label>
                <input
                  id="reading"
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={reading}
                  onChange={(e) => setReading(Number(e.target.value))}
                />
                <label htmlFor="hour">
                  Time of day <strong>{String(hour).padStart(2, '0')}:00</strong>
                </label>
                <input
                  id="hour"
                  type="range"
                  min="0"
                  max="23"
                  value={hour}
                  onChange={(e) => setHour(Number(e.target.value))}
                />
              </div>
              <div className="verification" aria-live="polite">
                {checks.map((c) => (
                  <span key={c.label} className={c.pass ? 'pass' : 'fail'}>
                    {c.pass ? <Check size={15} /> : <AlertTriangle size={15} />}
                    {c.label}
                  </span>
                ))}
                <strong className={valid ? 'pass' : 'fail'}>
                  {valid ? 'Verified · eligible to record' : 'Flagged · needs review'}
                </strong>
              </div>
            </div>
            <div className="lab-bottom">
              <span className="mono">ILLUSTRATIVE RULES · SAMPLE DATA · NO ON-CHAIN WRITE</span>
              <ShieldCheck size={17} />
            </div>
          </>
        )}
        {tab === 'civic' && (
          <>
            <div className="lab-panel-title">
              <div>
                <span className="eyebrow">INSPIRED BY REZO</span>
                <h3>What should we look at first?</h3>
              </div>
              <Circle size={25} strokeWidth={1} />
            </div>
            <div className="simulator-grid">
              <div className="slider-group">
                <label htmlFor="confidence">
                  Detection confidence <strong>{confidence}%</strong>
                </label>
                <input
                  id="confidence"
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                />
                <label htmlFor="distance">
                  Distance from issue <strong>{distance} km</strong>
                </label>
                <input
                  id="distance"
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </div>
              <div className="triage-result" aria-live="polite">
                <span className="mono">ILLUSTRATIVE PRIORITY SCORE</span>
                <strong>
                  {score}
                  <span>/100</span>
                </strong>
                <div className="score-track">
                  <i style={{ width: `${score}%` }} />
                </div>
                <p>
                  {score >= 60
                    ? 'High confidence, close by. A useful place to start.'
                    : 'Adjust confidence and distance to explore the tradeoff.'}
                </p>
              </div>
            </div>
            <div className="lab-bottom">
              <span className="mono">CONCEPT MODEL · NOT REZO’S PRODUCTION FORMULA</span>
              <ArrowRight size={17} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
