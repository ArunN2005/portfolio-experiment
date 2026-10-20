import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Asterisk,
  Check,
  Command,
  Copy,
  Download,
  Github,
  Globe2,
  Menu,
  Moon,
  Plus,
  Search,
  Send,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { EMAIL, GITHUB, LINKEDIN, experience, projects, skillGroups, type Project } from './data'
import Sculpture from './Sculpture'
import ProjectArt from './ProjectArt'
import Lab from './Lab'

function Modal({
  children,
  close,
  label,
  className = '',
}: {
  children: ReactNode
  close: () => void
  label: string
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement
    dialog.showModal()
    dialog.querySelector<HTMLInputElement>('[data-autofocus]')?.focus()
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
      dialog.close()
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect()
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          )
            close()
        }
      }}
    >
      <button className="modal-close icon-button" onClick={close} aria-label="Close dialog">
        <X size={20} />
      </button>
      {children}
    </dialog>
  )
}

function usePreference(key: string, fallback: string) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) || fallback
    } catch {
      return fallback
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* storage may be disabled */
    }
  }, [key, value])
  return [value, setValue] as const
}

function Clock() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const timer = setInterval(() => setTime(format()), 30000)
    return () => clearInterval(timer)
  }, [])
  return (
    <span className="local-time mono">
      COIMBATORE, IN <span>{time} IST</span>
    </span>
  )
}

export default function App() {
  const [theme, setTheme] = usePreference('arun-theme', 'light')
  const [motion, setMotion] = usePreference('arun-motion', 'system')
  const [systemReduced, setSystemReduced] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const paused = motion === 'reduced' || (motion === 'system' && systemReduced)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All work')
  const [project, setProject] = useState<Project | null>(null)
  const [palette, setPalette] = useState(false)
  const [query, setQuery] = useState('')
  const [commandIndex, setCommandIndex] = useState(0)
  const [contact, setContact] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [active, setActive] = useState('home')
  const progressRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(0)
  const [stack, setStack] = useState(0)
  const [message, setMessage] = useState({ name: '', email: '', text: '' })
  const [draftReady, setDraftReady] = useState(false)
  const notify = (text: string) => {
    setToast(text)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 4000)
  }
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      notify('Email copied. Let’s make something good.')
    } catch {
      notify('Copy unavailable. You can use the email link below.')
    }
  }
  const navigate = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: paused ? 'instant' : 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f6f5f0' : '#1c1e1a')
  }, [theme])
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'reduced' : 'full'
  }, [paused])
  useEffect(() => {
    if (palette)
      document.getElementById(`command-${commandIndex}`)?.scrollIntoView({ block: 'nearest' })
  }, [commandIndex, palette])
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setSystemReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (!project && !contact) {
          setPalette((p) => !p)
          setQuery('')
          setCommandIndex(0)
        }
      }
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const onScroll = () => {
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        }),
      { rootMargin: '-20% 0px -55% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section))
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [project, contact])

  const commands = [
    ...[
      ['work', 'Explore selected work'],
      ['about', 'Meet Arun'],
      ['lab', 'Play in the lab'],
      ['contact', 'Get in touch'],
    ].map(([id, name]) => ({ name, type: 'NAVIGATE', action: () => navigate(id) })),
    ...projects.map((p) => ({
      name: `Read about ${p.title}`,
      type: 'PROJECT',
      action: () => setProject(p),
    })),
    { name: 'Toggle light / dark mode', type: 'APPEARANCE', action: toggleTheme },
    {
      name: 'Copy email address',
      type: 'CONTACT',
      action: () => {
        void copyEmail()
      },
    },
    {
      name: 'Download resume',
      type: 'DOCUMENT',
      action: () => {
        const a = document.createElement('a')
        a.href = `${import.meta.env.BASE_URL}Arun-N-Resume.pdf`
        a.download = 'Arun-N-Resume.pdf'
        a.click()
      },
    },
  ].filter((command) => command.name.toLowerCase().includes(query.toLowerCase()))
  const runCommand = (index: number) => {
    const command = commands[index]
    if (!command) return
    setPalette(false)
    setTimeout(command.action, 0)
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="reading-progress" ref={progressRef} />
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Arun N, home">
          <span className="brand-symbol">
            a<span>n</span>
            <i />
          </span>
          <span>
            ARUN N<span className="brand-period">.</span>
          </span>
        </a>
        <nav aria-label="Main navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          {[
            ['work', 'Work'],
            ['about', 'About'],
            ['lab', 'Playground'],
          ].map(([id, name]) => (
            <a
              href={`#${id}`}
              key={id}
              onClick={() => setMenuOpen(false)}
              aria-current={active === id ? 'location' : undefined}
            >
              {name}
              <span className="nav-dot" />
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="command-trigger"
            onClick={() => {
              setPalette(true)
              setQuery('')
              setCommandIndex(0)
            }}
            aria-label="Open command menu"
          >
            <Command size={13} />
            <span>K</span>
          </button>
          <button
            className="icon-button theme-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a className="header-contact" href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            className="icon-button mobile-menu"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero page-width" id="home">
          <div className="hero-top">
            <span className="availability">
              <span className="status-dot" /> OPEN TO INTERESTING CONVERSATIONS
            </span>
            <Clock />
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow hero-intro">DEVELOPER. EXPLORER. THOUGHTFUL BUILDER.</span>
              <h1>
                Complex problems.
                <br />
                Thoughtfully
                <br />
                <em>engineered.</em>
                <span className="headline-period" aria-hidden="true">
                  <Asterisk strokeWidth={1.5} />
                </span>
              </h1>
              <p>
                I’m Arun — a developer connecting the dots between
                <br className="desktop-break" />{' '}
                <strong>thoughtful interfaces, intelligent systems,</strong> and the cloud.
              </p>
              <div className="hero-links">
                <a className="primary-button" href="#work">
                  Explore my work <ArrowDown size={17} />
                </a>
                <a
                  className="text-link"
                  href={`${import.meta.env.BASE_URL}Arun-N-Resume.pdf`}
                  download
                >
                  Get my résumé <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <Sculpture paused={paused} />
          </div>
          <div className="hero-bottom">
            <span>A LITTLE CURIOSITY. A LOT OF BUILDING.</span>
            <span className="hero-specialties">
              FULL-STACK <i /> APPLIED AI <i /> CLOUD SYSTEMS
            </span>
            <a href="#work" aria-label="Scroll to selected work">
              <ArrowDown size={15} />
              <span>SCROLL TO EXPLORE</span>
            </a>
          </div>
        </section>

        <section className="work-section page-width" id="work">
          <div className="section-kicker">
            <span className="eyebrow">01 / SELECTED WORK</span>
            <span className="mono muted">IDEAS, MADE REAL.</span>
          </div>
          <div className="section-heading">
            <h2>
              Built with purpose.
              <br />
              <em>And a little obsession.</em>
            </h2>
            <p>
              A few things I’ve built at the intersection
              <br />
              of practical problems and possibility.
            </p>
          </div>
          <div className="work-toolbar">
            <div className="filters" role="group" aria-label="Filter projects">
              {['All work', 'AI & Cloud', 'Full-stack'].map((f) => (
                <button
                  key={f}
                  className={filter === f ? 'active' : ''}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  {f === 'All work' && <span>03</span>}
                </button>
              ))}
            </div>
            <span className="mono muted work-count" aria-live="polite">
              {String(
                projects.filter((p) => filter === 'All work' || p.category === filter).length,
              ).padStart(2, '0')}{' '}
              PROJECTS
            </span>
          </div>
          <div className="projects-grid">
            {projects
              .filter((p) => filter === 'All work' || p.category === filter)
              .map((p) => (
                <article className={`project-card project-${p.id}`} key={p.id}>
                  <button
                    className="project-open"
                    onClick={() => setProject(p)}
                    aria-label={`Explore ${p.title} case study`}
                  >
                    <ProjectArt id={p.id} />
                    <span className="project-info">
                      <span>
                        <span className="project-number mono">
                          0{projects.indexOf(p) + 1} / {p.category.toUpperCase()}
                        </span>
                        <span className="project-title">
                          {p.title}
                          <ArrowUpRight size={22} />
                        </span>
                        <span className="project-subtitle">{p.subtitle}</span>
                      </span>
                      <span className="project-year mono">{p.id === 'rezo' ? '2025' : '2026'}</span>
                    </span>
                  </button>
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
          </div>
          <a className="github-line" href={GITHUB} target="_blank" rel="noreferrer">
            <Github size={16} />
            <span>There’s always something in progress.</span>
            <strong>
              Find me on GitHub <ArrowUpRight size={14} />
            </strong>
          </a>
        </section>

        <section className="about-section" id="about">
          <div className="page-width">
            <div className="section-kicker">
              <span className="eyebrow">02 / THE PERSON BEHIND THE CODE</span>
              <span className="mono muted">CURIOUS BY DEFAULT.</span>
            </div>
            <div className="about-grid">
              <div className="about-heading">
                <h2>
                  Hi, I’m Arun.
                  <br />
                  <em>
                    Always connecting
                    <br />
                    the dots.
                  </em>
                </h2>
                <div className="identity-card">
                  <span className="identity-symbol">
                    a<span>n</span>
                    <i>
                      <ArrowUpRight size={24} />
                    </i>
                  </span>
                  <div>
                    <strong>Arun N</strong>
                    <span>Developer & lifelong learner</span>
                  </div>
                  <span className="identity-location">
                    <Globe2 size={13} /> Coimbatore, India
                  </span>
                </div>
              </div>
              <div className="about-copy">
                <p className="about-lead">
                  I like taking things apart.
                  <br />
                  Even more, I like making them <em>work together.</em>
                </p>
                <p>
                  I’m a Computer Science undergraduate at Amrita Vishwa Vidyapeetham, exploring the
                  space between full-stack development, cloud infrastructure, and applied AI.
                </p>
                <p>
                  My work has taken me from inventory systems used across locations to AI agents
                  that understand codebases. The common thread? Turning a complicated process into
                  something someone can actually use.
                </p>
                <p>Currently learning, building, and asking better questions.</p>
                <div className="education">
                  <span className="education-mark">A</span>
                  <div>
                    <strong>B.Tech · Computer Science & Engineering</strong>
                    <span>Amrita School of Computing · 2023–2027</span>
                  </div>
                  <span className="cgpa">
                    8.17<small>CGPA</small>
                  </span>
                </div>
                <div className="language-row">
                  <span className="mono">ALSO SPEAKING</span>
                  <span>
                    English <i /> Tamil <i /> German
                  </span>
                </div>
              </div>
            </div>
            <div className="experience-header">
              <h3>A little real-world context.</h3>
              <span className="mono muted">EXPERIENCE / 2025–2026</span>
            </div>
            <div className="experience-list">
              {experience.map((item, i) => (
                <div
                  className={`experience-item ${expanded === i ? 'expanded' : ''}`}
                  key={item.company}
                >
                  <button
                    aria-expanded={expanded === i}
                    aria-controls={`experience-${i}`}
                    onClick={() => setExpanded(expanded === i ? -1 : i)}
                  >
                    <span className="experience-date mono">{item.date}</span>
                    <span className="experience-role">
                      <strong>{item.company}</strong>
                      <span>{item.role}</span>
                    </span>
                    <span className="experience-location">{item.location}</span>
                    <Plus size={20} />
                  </button>
                  <div id={`experience-${i}`} className="experience-detail" hidden={expanded !== i}>
                    <p>{item.detail}</p>
                    <p>{item.stack}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="recognition">
              <span className="eyebrow">A FEW GOOD CHALLENGES</span>
              <div>
                {['Civic Stack · IIT Delhi', 'AWS AI for Bharat', 'Technova · CIT'].map((name) => (
                  <span key={name}>
                    <Sparkles size={15} />
                    <strong>{name}</strong>
                    <small>Hackathon finalist</small>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="toolkit-section page-width" id="toolkit">
          <div>
            <span className="eyebrow">03 / THE TOOLKIT</span>
            <h2>
              Different tools.
              <br />
              <em>Same curiosity.</em>
            </h2>
            <p>
              The right tool is the one that
              <br />
              helps the idea become real.
            </p>
          </div>
          <div className="toolkit">
            <div className="toolkit-tabs" role="group" aria-label="Explore technical skills">
              {skillGroups.map((group, i) => (
                <button
                  key={group.label}
                  onClick={() => setStack(i)}
                  aria-pressed={stack === i}
                  className={stack === i ? 'active' : ''}
                >
                  <span className="mono">0{i + 1}</span>
                  {group.name}
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
            <div className="skill-detail" aria-live="polite">
              <span className="mono muted">{skillGroups[stack].label}</span>
              <div>
                {skillGroups[stack].skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lab-section page-width" id="lab">
          <div className="section-kicker">
            <span className="eyebrow">04 / THE PLAYGROUND</span>
            <span className="lab-live mono">
              <span className="status-dot" /> CURIOSITY IS INTERACTIVE
            </span>
          </div>
          <div className="section-heading">
            <h2>
              Less explaining.
              <br />
              <em>More experimenting.</em>
            </h2>
            <p>
              A few ideas from my projects, made tangible.
              <br />
              Go ahead. Push a button. Break a rule.
            </p>
          </div>
          <Lab />
        </section>

        <section className="contact-section" id="contact">
          <div className="page-width">
            <div className="section-kicker">
              <span className="eyebrow">05 / NEXT CHAPTER</span>
              <span className="mono">GOOD THINGS START WITH A CONVERSATION.</span>
            </div>
            <div className="contact-grid">
              <h2>
                Have a good
                <br />
                <em>problem?</em>
                <span aria-hidden="true">
                  <ArrowUpRight strokeWidth={1} />
                </span>
              </h2>
              <div>
                <p>
                  A thoughtful idea, an interesting opportunity,
                  <br />
                  or a particularly good technical rabbit hole.
                  <br />
                  <strong>I’d love to hear about it.</strong>
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setContact(true)
                    setDraftReady(false)
                  }}
                >
                  Let’s build something <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
            <div className="contact-bottom">
              <div className="email-line">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button
                  className="icon-button"
                  onClick={() => {
                    void copyEmail()
                  }}
                  aria-label="Copy email address"
                >
                  <Copy size={17} />
                </button>
              </div>
              <div className="social-links">
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={14} />
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={14} />
                </a>
                <a href={`${import.meta.env.BASE_URL}Arun-N-Resume.pdf`} download>
                  Résumé <Download size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <span>
          © {new Date().getFullYear()} Arun N <span className="footer-dot">·</span> Built with
          intention.
        </span>
        <div>
          <button onClick={() => setMotion(paused ? 'full' : 'reduced')} aria-pressed={!paused}>
            <span className={`motion-dot ${paused ? 'paused' : ''}`} />
            Motion {paused ? 'off' : 'on'}
          </button>
          <button onClick={() => navigate('home')}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </footer>
      <div className={`toast ${toast ? 'visible' : ''}`} role="status">
        {toast && (
          <>
            <Check size={16} />
            {toast}
          </>
        )}
      </div>

      {project && (
        <Modal
          label={`${project.title} case study`}
          close={() => setProject(null)}
          className="project-modal"
        >
          <ProjectArt id={project.id} />
          <div className="case-study">
            <span className="eyebrow">
              {project.date} / {project.category.toUpperCase()}
            </span>
            <h2>
              {project.title}
              <em>{project.subtitle}</em>
            </h2>
            <p className="case-intro">{project.description}</p>
            <div className="case-role">
              <span className="mono">MY FOCUS</span>
              <p>{project.role}</p>
            </div>
            <h3>The problem</h3>
            <p>{project.challenge}</p>
            <h3>The approach</h3>
            <ol>
              {project.approach.map((item, i) => (
                <li key={item}>
                  <span className="mono">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <blockquote>{project.takeaway}</blockquote>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="case-actions">
              {project.repository && (
                <a
                  className="small-button"
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={15} />
                  Explore repository <ArrowUpRight size={15} />
                </a>
              )}
              <button
                className="text-link"
                onClick={() => {
                  setProject(null)
                  setTimeout(() => navigate('lab'), 0)
                }}
              >
                Try a related experiment <ArrowRight size={16} />
              </button>
            </div>
            <p className="case-note">
              Project details from my résumé. Visuals are conceptual illustrations.
            </p>
          </div>
        </Modal>
      )}

      {palette && (
        <Modal label="Command menu" close={() => setPalette(false)} className="command-modal">
          <div className="command-search">
            <Search size={19} />
            <input
              data-autofocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCommandIndex(0)
              }}
              placeholder="Where would you like to go?"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-results"
              aria-activedescendant={
                commands.length
                  ? `command-${Math.min(commandIndex, commands.length - 1)}`
                  : undefined
              }
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setCommandIndex((i) => Math.min(i + 1, commands.length - 1))
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setCommandIndex((i) => Math.max(0, i - 1))
                }
                if (e.key === 'Enter') {
                  e.preventDefault()
                  runCommand(commandIndex)
                }
              }}
            />
          </div>
          <div
            className="command-results"
            id="command-results"
            role="listbox"
            aria-label="Commands"
          >
            {commands.length ? (
              commands.map((command, i) => (
                <div
                  key={command.name}
                  id={`command-${i}`}
                  role="option"
                  aria-selected={commandIndex === i}
                  className={commandIndex === i ? 'selected' : ''}
                  onMouseMove={() => setCommandIndex(i)}
                  onClick={() => runCommand(i)}
                >
                  <span>{command.name}</span>
                  <span className="mono">{command.type}</span>
                </div>
              ))
            ) : (
              <p className="no-results">No matching commands. Try “work”, “resume”, or “theme”.</p>
            )}
          </div>
          <div className="command-footer mono">
            <span>↑ ↓ TO NAVIGATE</span>
            <span>↵ TO SELECT</span>
            <span>ESC TO CLOSE</span>
          </div>
        </Modal>
      )}

      {contact && (
        <Modal
          label="Draft a message to Arun"
          close={() => setContact(false)}
          className="contact-modal"
        >
          <span className="eyebrow">LET’S START SOMETHING</span>
          <h2>
            A simple <em>hello.</em>
          </h2>
          <p>
            Tell me what’s on your mind. This opens a draft in your email app, ready for you to
            send.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const body = `Hi Arun,\n\n${message.text}\n\n${message.name}\n${message.email}`
              setDraftReady(true)
              window.open(
                `mailto:${EMAIL}?subject=${encodeURIComponent(`Let's connect — ${message.name}`)}&body=${encodeURIComponent(body)}`,
                '_blank',
                'noopener,noreferrer',
              )
            }}
          >
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              autoComplete="name"
              placeholder="Alex"
              value={message.name}
              onChange={(e) => setMessage({ ...message, name: e.target.value })}
              maxLength={100}
              required
            />
            <label htmlFor="contact-email">Your email</label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
              value={message.email}
              onChange={(e) => setMessage({ ...message, email: e.target.value })}
              required
            />
            <label htmlFor="contact-message">What are you thinking?</label>
            <textarea
              id="contact-message"
              placeholder="I have an idea about…"
              rows={4}
              maxLength={3000}
              value={message.text}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
              required
            />
            <button className="primary-button" type="submit">
              Open email draft <Send size={15} />
            </button>
            {draftReady && (
              <p className="draft-status" role="status">
                Your email app was requested. If it didn’t open, email{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Nothing has been sent from this website.
              </p>
            )}
          </form>
        </Modal>
      )}
    </>
  )
}
