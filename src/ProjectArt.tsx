import { ArrowUpRight, Check, Code2, GitBranch, MapPin, Sparkles, Sun, Zap } from 'lucide-react'

export default function ProjectArt({ id }: { id: string }) {
  if (id === 'lazarus')
    return (
      <div className="project-art lazarus-art" aria-hidden="true">
        <div className="art-topline">
          <span>
            <span className="tiny-dot" /> LAZARUS / MIGRATION ENGINE
          </span>
          <span>v.02</span>
        </div>
        <div className="migration-art">
          <div className="code-panel">
            <span>
              <GitBranch size={12} /> legacy / main
            </span>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="migration-path">
            <div />
            <Sparkles size={29} />
            <div />
          </div>
          <div className="code-panel migrated">
            <span>
              <Check size={12} /> ready to deploy
            </span>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="art-bottomline">
          <span>ANALYZE → PLAN → BUILD → DEPLOY</span>
          <span className="art-status">● SELF-HEALING</span>
        </div>
        <span className="art-open">
          <ArrowUpRight size={20} />
        </span>
      </div>
    )
  if (id === 'rezo')
    return (
      <div className="project-art rezo-art" aria-hidden="true">
        <div className="map-block b1" />
        <div className="map-block b2" />
        <div className="map-block b3" />
        <div className="map-block b4" />
        <div className="map-block b5" />
        <svg className="map-roads" viewBox="0 0 500 340" preserveAspectRatio="none">
          <path d="M-30 150 530 40M70-20 250 370M-20 280 530 170M340-20 450 370" />
        </svg>
        <span className="map-pin pin-one">
          <MapPin size={20} />
        </span>
        <span className="map-pin pin-two">
          <MapPin size={17} />
        </span>
        <span className="map-pin pin-three">
          <MapPin size={17} />
        </span>
        <div className="report-card">
          <span className="report-icon">
            <Check size={18} />
          </span>
          <div>
            <strong>A better city starts here.</strong>
            <small>One report. A real difference.</small>
          </div>
          <span className="report-dot" />
        </div>
        <span className="map-word">
          rezo<span>↗</span>
        </span>
        <span className="map-coordinates mono">11.0168° N · 76.9558° E</span>
        <span className="art-open">
          <ArrowUpRight size={20} />
        </span>
      </div>
    )
  return (
    <div className="project-art joulet-art" aria-hidden="true">
      <div className="art-topline">
        <span>
          <Sun size={14} /> JOULET / PROOF OF ENERGY
        </span>
        <span>→</span>
      </div>
      <div className="energy-art">
        <div className="sun-art">
          <Sun size={35} strokeWidth={1} />
        </div>
        <div className="energy-line" />
        <div className="energy-block">
          <Zap size={27} />
          <span>VERIFY</span>
        </div>
        <div className="energy-line" />
        <div className="energy-block chain">
          <Code2 size={27} />
          <span>RECORD</span>
        </div>
      </div>
      <div className="art-bottomline">
        <span>FROM SUNLIGHT TO SOMETHING VERIFIABLE.</span>
        <span>✳</span>
      </div>
      <span className="art-open">
        <ArrowUpRight size={20} />
      </span>
    </div>
  )
}
