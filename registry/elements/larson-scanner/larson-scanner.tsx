"use client"

import type { CSSProperties, MouseEvent } from "react"
import { useCallback, useEffect, useId, useRef, useState } from "react"

import "./larson-scanner.css"

export type LarsonPattern = "classic" | "dual" | "comet" | "pulse" | "glitch" | "custom"
export type LarsonVoice = "analog" | "digital" | "sub"

export type LarsonScannerProps = {
  className?: string
  defaultColor?: string
  defaultPattern?: LarsonPattern
  title?: string
}

const patternChoices: { id: LarsonPattern; label: string; help: string }[] = [
  { id: "classic", label: "Classic", help: "Edge to edge" },
  { id: "dual", label: "Dual chase", help: "Mirrored pair" },
  { id: "comet", label: "Comet", help: "One-way loop" },
  { id: "pulse", label: "Reactor", help: "Center pulse" },
  { id: "glitch", label: "Glitch", help: "Controlled sparks" },
  { id: "custom", label: "Custom", help: "Program a path" },
]

const patternNames: Record<LarsonPattern, string> = {
  classic: "CLASSIC SWEEP",
  dual: "DUAL CHASE",
  comet: "COMET LOOP",
  pulse: "REACTOR PULSE",
  glitch: "GLITCH SPARK",
  custom: "CUSTOM PATH",
}

const colorChoices = [
  { name: "Signal red", value: "#ff2a1a" },
  { name: "Ion blue", value: "#2f7cff" },
  { name: "Circuit green", value: "#18ff8b" },
  { name: "Solar gold", value: "#ffb000" },
]

type EngineSettings = {
  pattern: LarsonPattern
  speed: number
  fade: number
  ribbon: number
  brightness: number
  nodes: number
  color: string
  customPath: number[]
}

type CanvasSize = { width: number; height: number; dpr: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hexToRgb(hex: string) {
  const normalized = /^#[0-9a-f]{6}$/i.test(hex) ? hex.slice(1) : "ff2a1a"
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ] as const
}

function rgbToHue([red, green, blue]: readonly number[]) {
  const channels = [red / 255, green / 255, blue / 255]
  const max = Math.max(...channels)
  const min = Math.min(...channels)
  const delta = max - min
  if (delta === 0) return 0
  let hue = 0
  if (max === channels[0]) hue = ((channels[1] - channels[2]) / delta) % 6
  else if (max === channels[1]) hue = (channels[2] - channels[0]) / delta + 2
  else hue = (channels[0] - channels[1]) / delta + 4
  return (hue * 60 + 360) % 360
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return reduced
}

function scannerHeads(pattern: LarsonPattern, position: number, elapsed: number, settings: EngineSettings, levels: number[]) {
  const last = Math.max(1, settings.nodes - 1)
  const normalized = clamp(position / last, 0, 1)
  if (pattern === "dual") return [normalized, 1 - normalized]
  if (pattern === "pulse") {
    const radius = Math.abs(Math.sin(elapsed * settings.speed * Math.PI * 0.42)) * 0.5
    return [0.5 - radius, 0.5 + radius]
  }
  if (pattern === "glitch") {
    const brightest = levels.indexOf(Math.max(...levels))
    return [brightest / last]
  }
  if (pattern === "custom") {
    const path = settings.customPath.length ? settings.customPath : [0, Math.floor(settings.nodes / 2), settings.nodes - 1]
    return [path[Math.abs(Math.floor(position)) % path.length] / last]
  }
  return [normalized]
}

function patternLevels(pattern: LarsonPattern, position: number, elapsed: number, settings: EngineSettings) {
  const levels = Array(settings.nodes).fill(0) as number[]
  const tailPower = 1.25 + ((100 - settings.fade) / 100) * 4.2
  const addTrail = (head: number, wrap = false) => {
    for (let index = 0; index < settings.nodes; index += 1) {
      let distance = Math.abs(index - head)
      if (wrap) distance = Math.min(distance, settings.nodes - distance)
      const glow = Math.pow(Math.max(0, 1 - distance / (2.2 + settings.fade / 13)), tailPower)
      levels[index] = Math.max(levels[index], glow)
    }
  }

  if (pattern === "classic") addTrail(position)
  if (pattern === "dual") {
    addTrail(position)
    addTrail(settings.nodes - 1 - position)
  }
  if (pattern === "comet") addTrail(((position % settings.nodes) + settings.nodes) % settings.nodes, true)
  if (pattern === "pulse") {
    const center = (settings.nodes - 1) / 2
    const radius = Math.abs(Math.sin(elapsed * settings.speed * Math.PI * 0.42)) * center
    for (let index = 0; index < settings.nodes; index += 1) {
      const distance = Math.abs(Math.abs(index - center) - radius)
      levels[index] = Math.pow(Math.max(0, 1 - distance / (2.4 + settings.fade / 55)), tailPower)
    }
    levels[Math.round(center)] = Math.max(levels[Math.round(center)], 0.28)
  }
  if (pattern === "glitch") {
    const step = Math.floor(elapsed * settings.speed * 2.4)
    for (let index = 0; index < settings.nodes; index += 1) {
      const seeded = Math.abs(Math.sin((index + 1) * 12.9898 + step * 78.233) * 43758.5453) % 1
      levels[index] = seeded > 0.82 ? seeded : seeded * 0.07
    }
  }
  if (pattern === "custom") {
    const path = settings.customPath.length ? settings.customPath : [0, Math.floor(settings.nodes / 2), settings.nodes - 1]
    addTrail(path[Math.abs(Math.floor(position)) % path.length])
  }

  return levels
}

function blendLevels(from: number[], to: number[], amount: number) {
  return to.map((value, index) => (from[index] ?? 0) * (1 - amount) + value * amount)
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function drawScanner(
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  settings: EngineSettings,
  position: number,
  elapsed: number,
  levels: number[],
) {
  const { width, height, dpr } = size
  const [red, green, blue] = hexToRgb(settings.color)
  const hue = rgbToHue([red, green, blue])
  const heads = scannerHeads(settings.pattern, position, elapsed, settings, levels)
  const trackLeft = Math.max(18, width * 0.04)
  const trackRight = width - trackLeft
  const trackWidth = trackRight - trackLeft
  const trackTop = height * 0.24
  const trackHeight = height * 0.47
  const centerY = trackTop + trackHeight / 2
  const gap = clamp(width / 210, 2, 7)
  const nodeWidth = Math.max(2, (trackWidth - gap * (settings.nodes - 1)) / settings.nodes)

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)
  context.fillStyle = "#020302"
  context.fillRect(0, 0, width, height)
  context.strokeStyle = "rgba(240, 242, 230, 0.13)"
  context.strokeRect(0.5, 0.5, width - 1, height - 1)

  const edgeShade = context.createLinearGradient(0, 0, width, 0)
  edgeShade.addColorStop(0, "rgba(0,0,0,0.95)")
  edgeShade.addColorStop(0.12, "rgba(0,0,0,0)")
  edgeShade.addColorStop(0.88, "rgba(0,0,0,0)")
  edgeShade.addColorStop(1, "rgba(0,0,0,0.95)")

  context.save()
  context.globalCompositeOperation = "lighter"
  if (settings.ribbon > 0) {
    const intensity = settings.ribbon / 100
    const ribbons = [
      { hue: hue - 32, phase: 0.4, amplitude: 0.13, width: 1.7 },
      { hue, phase: 2.1, amplitude: 0.19, width: 2.8 },
      { hue: hue + 36, phase: 4.15, amplitude: 0.11, width: 1.4 },
    ]

    for (const [ribbonIndex, ribbon] of ribbons.entries()) {
      const gradient = context.createLinearGradient(trackLeft, 0, trackRight, 0)
      gradient.addColorStop(0, `hsla(${ribbon.hue}, 100%, 62%, 0)`)
      gradient.addColorStop(0.18, `hsla(${ribbon.hue}, 100%, 62%, ${0.18 * intensity})`)
      gradient.addColorStop(0.5, `hsla(${ribbon.hue}, 100%, 70%, ${0.58 * intensity})`)
      gradient.addColorStop(0.82, `hsla(${ribbon.hue + 16}, 100%, 62%, ${0.18 * intensity})`)
      gradient.addColorStop(1, `hsla(${ribbon.hue + 20}, 100%, 62%, 0)`)
      context.beginPath()
      for (let x = trackLeft; x <= trackRight; x += Math.max(5, trackWidth / 140)) {
        const normalizedX = (x - trackLeft) / trackWidth
        const focus = Math.max(...heads.map((head) => Math.exp(-Math.pow(normalizedX - head, 2) / 0.035)))
        const amplitude = height * ribbon.amplitude * (0.45 + focus * 0.55)
        const wave = Math.sin(normalizedX * Math.PI * (2.15 + ribbonIndex * 0.28) + elapsed * (0.9 + ribbonIndex * 0.12) + ribbon.phase)
        const counter = Math.sin(normalizedX * Math.PI * 4.3 - elapsed * 0.42 + ribbon.phase) * 0.18
        const y = centerY + (wave + counter) * amplitude
        if (x === trackLeft) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = gradient
      context.lineWidth = ribbon.width * (1 + intensity * 1.5)
      context.shadowColor = `hsla(${ribbon.hue}, 100%, 62%, ${0.72 * intensity})`
      context.shadowBlur = 14 + intensity * 24
      context.stroke()
    }
  }

  for (let index = 0; index < settings.nodes; index += 1) {
    const level = levels[index] * (settings.brightness / 100)
    const x = trackLeft + index * (nodeWidth + gap)
    context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.045 + level * 0.92})`
    context.shadowColor = `rgba(${red}, ${green}, ${blue}, ${level * 0.84})`
    context.shadowBlur = level > 0.08 ? 5 + level * 24 : 0
    context.fillRect(x, trackTop, nodeWidth, trackHeight)
    context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${0.08 + level * 0.28})`
    context.strokeRect(x + 0.5, trackTop + 0.5, Math.max(0, nodeWidth - 1), Math.max(0, trackHeight - 1))
  }

  for (const head of heads) {
    const x = trackLeft + head * trackWidth
    const radius = Math.max(trackHeight * 1.2, trackWidth * 0.075)
    const flare = context.createRadialGradient(x, centerY, 0, x, centerY, radius)
    flare.addColorStop(0, `hsla(${hue}, 100%, 88%, ${0.26 * (settings.ribbon / 100)})`)
    flare.addColorStop(0.2, `hsla(${hue}, 100%, 64%, ${0.15 * (settings.ribbon / 100)})`)
    flare.addColorStop(1, `hsla(${hue}, 100%, 54%, 0)`)
    context.fillStyle = flare
    context.fillRect(x - radius, centerY - radius, radius * 2, radius * 2)
  }
  context.restore()

  context.fillStyle = edgeShade
  context.fillRect(0, 0, width, height)

  const meterBottom = height - 9
  const meterWidth = Math.min(width * 0.3, 230)
  const meterLeft = width - meterWidth - trackLeft
  const bars = 24
  const barGap = 2
  const barWidth = (meterWidth - barGap * (bars - 1)) / bars
  for (let index = 0; index < bars; index += 1) {
    const level = levels[Math.floor((index / bars) * settings.nodes)] ?? 0
    const wave = (Math.sin(index * 0.78 + elapsed * settings.speed * 2.1) + 1) / 2
    const barHeight = 2 + wave * 3 + level * 8
    context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.1 + level * 0.72 + wave * 0.12})`
    context.fillRect(meterLeft + index * (barWidth + barGap), meterBottom - barHeight, barWidth, barHeight)
  }
}

export function LarsonScanner({ className = "", defaultColor = "#ff2a1a", defaultPattern = "classic", title = "Larson Scanner" }: LarsonScannerProps) {
  const [running, setRunning] = useState(true)
  const [sound, setSound] = useState(false)
  const [pattern, setPattern] = useState<LarsonPattern>(defaultPattern)
  const [speed, setSpeed] = useState(4)
  const [fade, setFade] = useState(72)
  const [ribbon, setRibbon] = useState(78)
  const [brightness, setBrightness] = useState(88)
  const [nodes, setNodes] = useState(21)
  const [color, setColor] = useState(defaultColor)
  const [voice, setVoice] = useState<LarsonVoice>("analog")
  const [customPath, setCustomPath] = useState<number[]>([])
  const [notice, setNotice] = useState("Sound starts off. The scanner is ready.")
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 1, height: 1, dpr: 1 })
  const [visible, setVisible] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const phaseRef = useRef(0)
  const directionRef = useRef(1)
  const lastFrameRef = useRef(0)
  const lastSoundStepRef = useRef(-1)
  const audioContextRef = useRef<AudioContext | null>(null)
  const transitionRef = useRef<{ from: LarsonPattern; started: number } | null>(null)
  const reducedMotion = useReducedMotion()
  const voiceName = useId()

  const playTone = useCallback((position = 0, force = false) => {
    if (!sound && !force) return
    const AudioContextClass = window.AudioContext
    const audio = audioContextRef.current ?? new AudioContextClass()
    audioContextRef.current = audio
    if (audio.state === "suspended") void audio.resume()
    const now = audio.currentTime
    const oscillator = audio.createOscillator()
    const gain = audio.createGain()
    const pan = audio.createStereoPanner()
    const ratio = nodes > 1 ? position / (nodes - 1) : 0.5
    const profiles = {
      analog: { wave: "sawtooth" as OscillatorType, base: 84, span: 72, duration: 0.065 },
      digital: { wave: "square" as OscillatorType, base: 210, span: 160, duration: 0.035 },
      sub: { wave: "sine" as OscillatorType, base: 48, span: 28, duration: 0.11 },
    }
    const profile = profiles[voice]
    oscillator.type = profile.wave
    oscillator.frequency.setValueAtTime(profile.base + ratio * profile.span, now)
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(24, profile.base * 0.72), now + profile.duration)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.02, now + 0.007)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration)
    pan.pan.value = ratio * 2 - 1
    oscillator.connect(gain).connect(pan).connect(audio.destination)
    oscillator.start(now)
    oscillator.stop(now + profile.duration + 0.02)
  }, [nodes, sound, voice])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => {
    if (audioContextRef.current) void audioContextRef.current.close()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(1, Math.round(entry.contentRect.width))
      const height = Math.max(1, Math.round(entry.contentRect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      setCanvasSize({ width, height, dpr })
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { alpha: false })
    if (!canvas || !context) return
    let frame = 0
    let cancelled = false
    const settings: EngineSettings = { pattern, speed, fade, ribbon, brightness, nodes, color, customPath }

    const render = (now: number) => {
      if (cancelled) return
      const last = lastFrameRef.current || now
      const delta = Math.min((now - last) / 1000, 0.05)
      lastFrameRef.current = now
      const staticTime = reducedMotion ? 0 : now / 1000

      if (running && visible && !reducedMotion) {
        const travel = delta * speed * (nodes / 7.8)
        if (["comet", "glitch", "custom"].includes(pattern)) {
          phaseRef.current = (phaseRef.current + travel * directionRef.current + nodes) % nodes
        } else {
          phaseRef.current += travel * directionRef.current
          if (phaseRef.current >= nodes - 1) {
            phaseRef.current = nodes - 1
            directionRef.current = -1
            playTone(nodes - 1)
          } else if (phaseRef.current <= 0) {
            phaseRef.current = 0
            directionRef.current = 1
            playTone(0)
          }
        }
      }

      if (reducedMotion) phaseRef.current = (nodes - 1) / 2
      const currentLevels = patternLevels(pattern, phaseRef.current, staticTime, settings)
      let levels = currentLevels
      const transition = transitionRef.current
      if (transition && !reducedMotion) {
        if (transition.started === 0) transition.started = now
        const progress = clamp((now - transition.started) / 180, 0, 1)
        const previousLevels = patternLevels(transition.from, phaseRef.current, staticTime, { ...settings, pattern: transition.from })
        levels = blendLevels(previousLevels, currentLevels, easeOutCubic(progress))
        if (progress >= 1) transitionRef.current = null
      }

      drawScanner(context, canvasSize, settings, phaseRef.current, staticTime, levels)
      const head = Math.round(phaseRef.current)
      if (running && visible && !reducedMotion && head !== lastSoundStepRef.current && pattern !== "pulse") {
        lastSoundStepRef.current = head
        if (head % Math.max(2, Math.floor(nodes / 8)) === 0) playTone(head)
      }

      if (running && visible && !reducedMotion) frame = window.requestAnimationFrame(render)
    }

    render(performance.now())
    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
    }
  }, [brightness, canvasSize, color, customPath, fade, nodes, pattern, playTone, reducedMotion, ribbon, running, speed, visible])

  function choosePattern(next: LarsonPattern) {
    if (next === pattern) return
    transitionRef.current = { from: pattern, started: 0 }
    setPattern(next)
    setNotice(`${patternNames[next]} engaged.`)
  }

  function toggleCustomNode(index: number) {
    setCustomPath((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
    phaseRef.current = index
    playTone(index)
    setNotice(`Lamp ${index + 1} ${customPath.includes(index) ? "removed from" : "added to"} the path.`)
  }

  function samplePosition(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const index = event.detail === 0
      ? Math.round(phaseRef.current)
      : clamp(Math.round(((event.clientX - rect.left) / rect.width) * (nodes - 1)), 0, nodes - 1)
    phaseRef.current = index
    if (pattern === "custom") toggleCustomNode(index)
    else {
      playTone(index)
      setNotice(`Lamp ${index + 1} sampled.`)
    }
  }

  function toggleSound() {
    const next = !sound
    setSound(next)
    if (next) playTone(Math.round(phaseRef.current), true)
    setNotice(next ? "Scanner sound enabled." : "Scanner sound muted.")
  }

  function changeNodeCount(next: number) {
    setNodes(next)
    setCustomPath((current) => current.filter((index) => index < next))
    phaseRef.current = clamp(phaseRef.current, 0, next - 1)
  }

  function resetScanner() {
    setRunning(true)
    setSound(false)
    setPattern(defaultPattern)
    setSpeed(4)
    setFade(72)
    setRibbon(78)
    setBrightness(88)
    setNodes(21)
    setColor(defaultColor)
    setVoice("analog")
    setCustomPath([])
    phaseRef.current = 0
    directionRef.current = 1
    transitionRef.current = null
    setNotice("Scanner restored to its original signal.")
  }

  const style = { "--larson-signal": color } as CSSProperties

  return (
    <div ref={rootRef} className={`larson-scanner ${className}`.trim()} style={style} data-reduced-motion={reducedMotion}>
      <header className="larson-scanner__header">
        <div><span>Interactive light engine</span><strong>{title}</strong></div>
        <div className="larson-scanner__status"><i aria-hidden="true" /><span>{running ? "System active" : "System standby"}</span></div>
      </header>

      <div className="larson-scanner__bay">
        <div className="larson-scanner__label"><span>Optical array / primary</span><span>{nodes} node matrix</span></div>
        <div className="larson-scanner__viewport">
          <canvas ref={canvasRef} aria-hidden="true" />
          <button type="button" aria-label="Sample a position on the scanner" onClick={samplePosition} />
        </div>
        <div className="larson-scanner__readout" aria-label="Live scanner readout">
          <div><span>Motion</span><strong>{running ? "Running" : "Standby"}</strong></div>
          <div><span>Rate</span><strong>{speed.toFixed(1)} Hz</strong></div>
          <div><span>Pattern</span><strong>{patternNames[pattern]}</strong></div>
          <div><span>Sound</span><strong>{sound ? "Enabled" : "Muted"}</strong></div>
        </div>
      </div>

      <div className="larson-scanner__commands">
        <button type="button" aria-pressed={!running} onClick={() => { setRunning((value) => !value); setNotice(running ? "Scanner paused." : "Scanner online.") }}>
          <i className="larson-scanner__command-icon" data-icon={running ? "pause" : "play"} aria-hidden="true" />
          <span><strong>{running ? "Pause scanner" : "Start scanner"}</strong><small>Motion control</small></span>
        </button>
        <button type="button" onClick={() => { directionRef.current *= -1; setNotice(directionRef.current > 0 ? "Direction forward." : "Direction reversed.") }}>
          <i className="larson-scanner__reverse" aria-hidden="true">↔</i>
          <span><strong>Reverse</strong><small>Change direction</small></span>
        </button>
        <button type="button" role="switch" aria-checked={sound} onClick={toggleSound}>
          <i className="larson-scanner__sound" aria-hidden="true">{sound ? "◖))" : "◖×"}</i>
          <span><strong>{sound ? "Sound on" : "Sound off"}</strong><small>Starts muted</small></span>
        </button>
      </div>

      <div className="larson-scanner__controls">
        <section aria-labelledby="larson-pattern-title">
          <div className="larson-scanner__section-heading"><span>01</span><div><small>Route logic</small><h3 id="larson-pattern-title">Pattern</h3></div></div>
          <div className="larson-scanner__patterns" role="radiogroup" aria-label="Scanner pattern">
            {patternChoices.map((choice) => (
              <button key={choice.id} type="button" role="radio" aria-checked={pattern === choice.id} onClick={() => choosePattern(choice.id)}>
                <i aria-hidden="true" data-pattern={choice.id}><span /><span /><span /><span /><span /></i>
                <span><strong>{choice.label}</strong><small>{choice.help}</small></span>
              </button>
            ))}
          </div>
          {pattern === "custom" ? (
            <div className="larson-scanner__custom-path">
              <div><strong>Program the path</strong><button type="button" onClick={() => { setCustomPath([]); setNotice("Custom path cleared.") }}>Clear path</button></div>
              <div role="group" aria-label="Choose lamps for the custom path">
                {Array.from({ length: nodes }, (_, index) => (
                  <button key={index} type="button" aria-pressed={customPath.includes(index)} onClick={() => toggleCustomNode(index)} aria-label={`Lamp ${index + 1}`}>
                    {customPath.includes(index) ? customPath.indexOf(index) + 1 : index + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section aria-labelledby="larson-tune-title">
          <div className="larson-scanner__section-heading"><span>02</span><div><small>Response profile</small><h3 id="larson-tune-title">Tune</h3></div></div>
          <div className="larson-scanner__ranges">
            <RangeControl label="Speed" value={speed} min={0.8} max={12} step={0.1} output={`${speed.toFixed(1)} Hz`} onChange={setSpeed} />
            <RangeControl label="Tail fade" value={fade} min={0} max={100} output={`${fade}%`} onChange={setFade} />
            <RangeControl label="Ribbon light" value={ribbon} min={0} max={100} output={`${ribbon}%`} onChange={setRibbon} />
            <RangeControl label="Brightness" value={brightness} min={10} max={100} output={`${brightness}%`} onChange={setBrightness} />
            <RangeControl label="Array size" value={nodes} min={9} max={33} step={2} output={`${nodes} lamps`} onChange={changeNodeCount} />
          </div>
        </section>

        <section aria-labelledby="larson-color-title">
          <div className="larson-scanner__section-heading"><span>03</span><div><small>Emission spectrum</small><h3 id="larson-color-title">Color</h3></div></div>
          <div className="larson-scanner__colors" role="radiogroup" aria-label="Scanner color">
            {colorChoices.map((choice) => (
              <button key={choice.value} type="button" role="radio" aria-checked={color.toLowerCase() === choice.value} onClick={() => { setColor(choice.value); setNotice(`${choice.name} loaded.`) }}>
                <i style={{ background: choice.value }} aria-hidden="true" /><span><strong>{choice.name}</strong><small>{choice.value.toUpperCase()}</small></span>
              </button>
            ))}
          </div>
          <label className="larson-scanner__custom-color">
            <input type="color" value={color} onChange={(event) => { setColor(event.target.value); setNotice("Custom signal color loaded.") }} />
            <span><strong>Custom spectrum</strong><small>{color.toUpperCase()}</small></span>
          </label>
        </section>

        <section aria-labelledby="larson-sound-title">
          <div className="larson-scanner__section-heading"><span>04</span><div><small>Sonic feedback</small><h3 id="larson-sound-title">Voice</h3></div></div>
          <fieldset className="larson-scanner__voices">
            <legend>Voice profile</legend>
            <div>
              {(["analog", "digital", "sub"] as LarsonVoice[]).map((choice) => (
                <label key={choice}><input type="radio" name={voiceName} value={choice} checked={voice === choice} onChange={() => { setVoice(choice); if (sound) playTone(Math.round(phaseRef.current), true) }} /><span>{choice === "sub" ? "Sub pulse" : choice}</span></label>
              ))}
            </div>
          </fieldset>
          <div className="larson-scanner__assurance">
            <span><i aria-hidden="true" /> Sound begins muted</span>
            <span><i aria-hidden="true" /> Reduced motion freezes every moving signal</span>
            <span><i aria-hidden="true" /> Offscreen animation pauses automatically</span>
          </div>
        </section>
      </div>

      <footer className="larson-scanner__footer">
        <span aria-live="polite">{notice}</span>
        <div><span>{reducedMotion ? "Reduced motion active" : "All signal / no tracking"}</span><button type="button" onClick={resetScanner}>Reset element</button></div>
      </footer>
    </div>
  )
}

function RangeControl({ label, value, min, max, step = 1, output, onChange }: { label: string; value: number; min: number; max: number; step?: number; output: string; onChange: (value: number) => void }) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <label className="larson-scanner__range" style={{ "--larson-fill": `${fill}%` } as CSSProperties}>
      <span><strong>{label}</strong><output>{output}</output></span>
      <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}
