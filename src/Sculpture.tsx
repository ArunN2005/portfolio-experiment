import { useEffect, useRef, useState } from 'react'
import { ArrowLeftRight, RotateCcw } from 'lucide-react'

export default function Sculpture({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const rotation = useRef({ x: 0.85, y: -0.3 })
  const dragging = useRef(false)
  const [shape, setShape] = useState(0)
  const names = ['Connected', 'In orbit', 'In motion']

  useEffect(() => {
    const element = canvas.current!
    const context = element.getContext('2d')!
    let frame = 0
    let last = 0
    let visible = true
    let size = 480
    let lastDraw = ''
    const resize = () => {
      size = element.clientWidth
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      element.width = size * dpr
      element.height = size * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastDraw = ''
    }
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibility.observe(element)
    resize()
    const project = (u: number, v: number) => {
      const r = shape === 1 ? 0.54 : 0.68
      const ring = 1.7 + (shape === 2 ? 0.28 * Math.cos(u * 4) : 0.1 * Math.cos(u * 3))
      const x = (ring + r * Math.cos(v)) * Math.cos(u)
      const y = (ring + r * Math.cos(v)) * Math.sin(u)
      const z = r * Math.sin(v) + (shape === 1 ? 0 : (shape === 2 ? 0.4 : 0.72) * Math.sin(u * 3))
      const a = rotation.current.x,
        b = rotation.current.y
      const yy = y * Math.cos(a) - z * Math.sin(a)
      const zz = y * Math.sin(a) + z * Math.cos(a)
      const xx = x * Math.cos(b) + zz * Math.sin(b)
      const depth = -x * Math.sin(b) + zz * Math.cos(b)
      const scale = (size * 0.155 * 7) / (7 - depth)
      return { x: size / 2 + xx * scale, y: size / 2 + yy * scale, z: depth }
    }
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      if (!visible || document.hidden || time - last < 32) return
      const delta = Math.min(time - last, 50)
      last = time
      if (!paused && !dragging.current) rotation.current.y += delta * 0.000065
      const dark = document.documentElement.dataset.theme === 'dark'
      const drawState = `${rotation.current.x}:${rotation.current.y}:${size}:${dark}`
      if (paused && drawState === lastDraw) return
      lastDraw = drawState
      context.clearRect(0, 0, size, size)
      const ink = dark ? '218,214,199' : '70,74,61'
      for (let ring = 0; ring < 88; ring++) {
        const u = (ring / 88) * Math.PI * 2
        const depth = project(u, 0).z
        context.strokeStyle = `rgba(${ink},${0.18 + ((depth + 3) / 6) * 0.42})`
        context.lineWidth = 0.65
        context.beginPath()
        for (let j = 0; j <= 45; j++) {
          const p = project(u, (j / 45) * Math.PI * 2)
          if (j === 0) context.moveTo(p.x, p.y)
          else context.lineTo(p.x, p.y)
        }
        context.stroke()
      }
      for (let j = 0; j < 18; j++) {
        context.strokeStyle = `rgba(${ink},0.25)`
        context.lineWidth = 0.5
        context.beginPath()
        for (let i = 0; i <= 120; i++) {
          const p = project((i / 120) * Math.PI * 2, (j / 18) * Math.PI * 2)
          if (i === 0) context.moveTo(p.x, p.y)
          else context.lineTo(p.x, p.y)
        }
        context.stroke()
      }
      for (const [u, v] of [
        [0.8, 1],
        [3.7, 2.6],
        [5, 0],
      ]) {
        const p = project(u, v)
        context.beginPath()
        context.arc(p.x, p.y, 4, 0, 2 * Math.PI)
        context.fillStyle = '#ce4c2c'
        context.fill()
        context.beginPath()
        context.arc(p.x, p.y, 8, 0, 2 * Math.PI)
        context.strokeStyle = '#ce4c2c55'
        context.stroke()
      }
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      visibility.disconnect()
    }
  }, [shape, paused])

  return (
    <div className="sculpture">
      <div className="sculpture-corner corner-tl" />
      <div className="sculpture-corner corner-br" />
      <span className="sculpture-label mono">FIG. 01 — EVERYTHING IS CONNECTED</span>
      <div className="sculpture-orbit" aria-hidden="true" />
      <canvas
        ref={canvas}
        tabIndex={0}
        role="img"
        aria-label={`${names[shape]}: interactive wire sculpture. Drag or use arrow keys to rotate.`}
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerUp={() => {
          dragging.current = false
        }}
        onPointerCancel={() => {
          dragging.current = false
        }}
        onPointerMove={(e) => {
          if (dragging.current) {
            rotation.current.y += e.movementX * 0.009
            rotation.current.x += e.movementY * 0.009
          }
        }}
        onKeyDown={(e) => {
          if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
          e.preventDefault()
          rotation.current.y += e.key === 'ArrowRight' ? 0.15 : e.key === 'ArrowLeft' ? -0.15 : 0
          rotation.current.x += e.key === 'ArrowDown' ? 0.15 : e.key === 'ArrowUp' ? -0.15 : 0
        }}
      />
      <span className="sculpture-coordinate mono">
        11.0168° N<br />
        76.9558° E
      </span>
      <div className="sculpture-controls">
        <span>
          <ArrowLeftRight size={12} /> Drag to explore
        </span>
        <button
          onClick={() => setShape((shape + 1) % 3)}
          aria-label={`Change sculpture shape, currently ${names[shape]}`}
        >
          <RotateCcw size={12} /> {names[shape]}
        </button>
      </div>
    </div>
  )
}
