/**
 * Find the Optimal Recognition Point (ORP) — the letter your eye
 * naturally fixates on. Roughly 1/3 into the word, biased left.
 */
function getORP(word: string): number {
  const len = word.length
  if (len <= 1) return 0
  if (len <= 3) return 1
  if (len <= 5) return 1
  if (len <= 9) return 2
  return 3
}

/**
 * Pause multiplier for punctuation — give the reader time to absorb.
 */
function getPauseMultiplier(word: string): number {
  if (/[.!?]$/.test(word)) return 3
  if (/[;:]$/.test(word)) return 2.5
  if (/[,]$/.test(word)) return 1.8
  if (/[—–-]$/.test(word)) return 1.5
  if (word.length > 10) return 1.3
  return 1
}

const PLAY_ICON =
  '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>'
const PAUSE_ICON =
  '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><rect x="5" y="4" width="3.5" height="12" rx="1"/><rect x="11.5" y="4" width="3.5" height="12" rx="1"/></svg>'

const TEMPLATE = `
  <div class="speed-reader-modal">
    <button class="speed-reader-close" data-action="close">✕</button>
    <div class="speed-reader-display">
      <div class="sr-guide-top"></div>
      <div class="speed-reader-word-container">
        <span class="sr-before-container"><span class="sr-dim" data-before></span></span>
        <span class="sr-focus" data-focus></span>
        <span class="sr-after-container"><span class="sr-dim" data-after></span></span>
      </div>
      <div class="sr-guide-bottom"></div>
    </div>
    <div class="speed-reader-progress-track">
      <div class="speed-reader-progress-fill" data-progress></div>
    </div>
    <div class="speed-reader-controls">
      <button class="sr-btn" data-action="reset" title="Reset (R)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2v5h5M2 7A6 6 0 1 1 3.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="sr-btn" data-action="slower" title="Slower (↓)">−</button>
      <span class="sr-wpm" data-wpm></span>
      <button class="sr-btn" data-action="faster" title="Faster (↑)">+</button>
      <button class="sr-btn sr-play" data-action="play" title="Play/Pause (Space)"></button>
    </div>
    <p class="sr-hints">Space — play/pause · ← → — step · ↑ ↓ — speed · Esc — close</p>
  </div>`

export function openSpeedReader() {
  // Read words from the rendered post so the source isn't shipped twice
  const text = document.querySelector<HTMLElement>('.post-body')?.innerText || ''
  const words = text.split(/\s+/).filter((w) => w.length > 0)

  let wordIndex = 0
  let wpm = 300
  let isPlaying = false
  let timeout: ReturnType<typeof setTimeout> | undefined

  const overlay = document.createElement('div')
  overlay.className = 'speed-reader-overlay'
  overlay.innerHTML = TEMPLATE
  const $ = (sel: string) => overlay.querySelector<HTMLElement>(sel)!
  const before = $('[data-before]')
  const focus = $('[data-focus]')
  const after = $('[data-after]')
  const progress = $('[data-progress]')
  const wpmLabel = $('[data-wpm]')
  const playButton = $('[data-action="play"]')

  function render() {
    const word = words[wordIndex] || ''
    const orp = getORP(word)
    before.textContent = word.slice(0, orp)
    focus.textContent = word[orp] || ''
    after.textContent = word.slice(orp + 1)
    progress.style.width = `${words.length > 0 ? ((wordIndex + 1) / words.length) * 100 : 0}%`
    wpmLabel.textContent = `${wpm} wpm`
    playButton.innerHTML = isPlaying ? PAUSE_ICON : PLAY_ICON
  }

  function schedule() {
    clearTimeout(timeout)
    if (!isPlaying) return
    const delay = (60000 / wpm) * getPauseMultiplier(words[wordIndex] || '')
    timeout = setTimeout(() => {
      if (wordIndex >= words.length - 1) {
        isPlaying = false
      } else {
        wordIndex++
      }
      render()
      schedule()
    }, delay)
  }

  function setPlaying(playing: boolean) {
    isPlaying = playing
    render()
    schedule()
  }

  function step(delta: number) {
    wordIndex = Math.min(Math.max(wordIndex + delta, 0), Math.max(words.length - 1, 0))
    setPlaying(false)
  }

  function setWpm(next: number) {
    wpm = Math.min(Math.max(next, 100), 1000)
    render()
    schedule()
  }

  function close() {
    clearTimeout(timeout)
    window.removeEventListener('keydown', onKey)
    overlay.remove()
    document.body.style.overflow = ''
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault()
      setPlaying(!isPlaying)
    }
    if (e.key === 'ArrowRight' || e.key === 'l') step(1)
    if (e.key === 'ArrowLeft' || e.key === 'j') step(-1)
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setWpm(wpm + 25)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setWpm(wpm - 25)
    }
    if (e.key === 'Escape') close()
    if (e.key === 'r') {
      wordIndex = 0
      setPlaying(false)
    }
  }

  overlay.addEventListener('click', (e) => {
    const action = (e.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action
    if (action === 'close') close()
    if (action === 'reset') {
      wordIndex = 0
      setPlaying(false)
    }
    if (action === 'slower') setWpm(wpm - 25)
    if (action === 'faster') setWpm(wpm + 25)
    if (action === 'play') setPlaying(!isPlaying)
  })

  window.addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
  document.body.appendChild(overlay)
  render()
}
