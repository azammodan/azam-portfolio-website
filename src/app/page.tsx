'use client'

import { useEffect, useRef, useState } from 'react'
import { PERSON, PROJECTS, POSTS } from '@/lib/data'
import Aquarium from '@/components/Aquarium'

const tabs = ['Welcome', 'About', 'Projects', 'Journal', 'Contact']
const marks = ['◈', '◎', '◇', '≋', '↗']
export default function Home() {
  const [active, setActive] = useState(0)
  const [sound, setSound] = useState(false)
  const [motion, setMotion] = useState(true)
  const [quiet, setQuiet] = useState(false)
  const audio = useRef<AudioContext | null>(null)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    setMotion(!media.matches)
    const update = () => setMotion(!media.matches)
    media.addEventListener('change', update)
    return () => { media.removeEventListener('change', update); audio.current?.close() }
  }, [])
  function tone(enabled = sound) {
    if (!enabled) return
    try {
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return
      const ctx = audio.current || (audio.current = new Ctx())
      void ctx.resume()
      const now = ctx.currentTime
      ;[523.25, 783.99].forEach((f, i) => {
        const osc = ctx.createOscillator(), gain = ctx.createGain()
        osc.type = 'sine'; osc.frequency.value = f
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(.035, now + .015 + i * .04)
        gain.gain.exponentialRampToValueAtTime(.0001, now + .55)
        osc.connect(gain); gain.connect(ctx.destination); osc.start(now + i * .04); osc.stop(now + .6)
      })
    } catch { setSound(false) }
  }
  function select(index: number) { setActive(index); tone(); if (typeof navigator.vibrate === 'function') navigator.vibrate(8) }
  return <main className={`${motion ? '' : 'still'} ${quiet ? 'quiet' : ''}`}>
    <Aquarium moving={motion} scene={active} />
    <div className="vignette" />
    <header><a className="wordmark" href="#" onClick={e => {e.preventDefault(); select(0)}}>am<span> / </span></a><span className="header-note">Just Keep Swimming</span><div className="controls">
      <button aria-pressed={sound} onClick={() => {setSound(!sound); tone(!sound)}} title="Toggle menu sounds"><span aria-hidden="true">{sound ? '♫' : '♩'}</span><span>Sound {sound ? 'on' : 'off'}</span></button>
      <button aria-pressed={!motion} onClick={() => setMotion(!motion)}>{motion ? 'Ⅱ' : '▷'}<span>{motion ? 'Pause' : 'Play'}</span></button>
    </div></header>
    <div className="portfolio">
      <nav aria-label="Portfolio sections">{tabs.map((tab, i) => <button key={tab} aria-current={active === i ? 'page' : undefined} onClick={() => select(i)}><span className="nav-icon" aria-hidden="true">{marks[i]}</span><span>{tab}</span><i /></button>)}</nav>
      <section className={`content content-${active}`} key={active} aria-label={tabs[active]}>
        {active === 0 && <><div className="eyebrow"><span /> B.A. Intelligence and Cyber Operations</div><h1>Azam Modan<span className="period">.</span></h1><p className="hero-role">Cybersecurity & IT.<br /><em>Always exploring.</em></p><p className="hero-description">Hi, I’m Azam (like Adam with a Z!). I’m a senior at USC studying cybersecurity + international relations. I like solving digital mysteries, helping people with their technology, and sometimes producing video games :)</p><button className="explore" onClick={() => select(2)}>Explore my work <span>↗</span></button><div className="location"><span>34.0522° N &nbsp; 118.2437° W</span><b>LOS ANGELES, CA</b></div></>}
        {active === 1 && <><div className="eyebrow">01 / THE PERSON BEHIND THE SCREEN</div><h2>A curious mind.<br /><em>A hands-on approach.</em></h2><p className="bio">{PERSON.bio}</p><div className="section-label">MY TOOLKIT</div><div className="skills">{PERSON.skills.map(s => <span key={s}>{s}</span>)}</div></>}
        {active === 2 && <><div className="eyebrow">02 / SELECTED EXPLORATIONS</div><h2>Things I’ve <em>worked on.</em></h2><div className="projects">{PROJECTS.map((p, i) => <details key={p.id}><summary><span className="project-number">0{i+1}</span><span><strong>{p.name}</strong><small>{p.tech.slice(0,2).join(' / ')}</small></span><span className="project-year">{p.year}</span><span className="plus">+</span></summary><div className="project-description"><p>{p.description}</p><div className="skills">{p.tech.map(t=><span key={t}>{t}</span>)}</div></div></details>)}</div></>}
        {active === 3 && <><div className="eyebrow">03 / NOTES FROM THE DEEP</div><h2>The <em>journal.</em></h2><p className="intro">Ideas, experiments, and things learned along the way.</p><div className="journal">{POSTS.map(p=><article key={p.slug}><small>{p.date} · {p.readTime}</small><h3>{p.title}</h3><span className="coming">Article coming soon</span></article>)}</div></>}
        {active === 4 && <><div className="eyebrow">04 / MAKE A CONNECTION</div><h2>Good things start<br /><em>with a hello.</em></h2><p className="intro">Cybersecurity, games, or something unexpected.<br />I’d love to hear what you’re working on.</p><a className="contact-email" href={`mailto:${PERSON.email}`} onClick={()=>tone()}>{PERSON.email} ↗</a><div className="socials"><a href={`https://${PERSON.linkedin}`} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`https://${PERSON.github}`} target="_blank" rel="noreferrer">GitHub ↗</a><a href={`https://x.com/${PERSON.twitter.slice(1)}`} target="_blank" rel="noreferrer">X ↗</a><a href={`tel:${PERSON.phone}`}>{PERSON.phone}</a></div><div className="location"><b>{PERSON.location}</b></div></>}
      </section>
    </div>
    <footer><span className="footer-left"><i /> TAKE YOUR TIME. LOOK AROUND.</span><button onClick={() => {setQuiet(!quiet); tone()}} aria-pressed={quiet}>{quiet ? '↩ Back to portfolio' : '◌ Just watch the fish'}</button><span className="footer-right">AZAM MODAN <span>© {new Date().getFullYear()}</span></span></footer>
  </main>
}
