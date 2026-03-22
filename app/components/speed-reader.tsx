'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

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

type SpeedReaderProps = {
  content: string
}

export function SpeedReader({ content }: SpeedReaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wpm, setWpm] = useState(300)
  const [wordIndex, setWordIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Strip markdown/HTML and split into words
  const words = content
    .replace(/^---[\s\S]*?---/, '') // frontmatter
    .replace(/<[^>]+>/g, '') // HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .replace(/[#*_`~>]/g, '') // markdown chars
    .replace(/\n+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0)

  const currentWord = words[wordIndex] || ''
  const orp = getORP(currentWord)
  const progress = words.length > 0 ? ((wordIndex + 1) / words.length) * 100 : 0

  const advance = useCallback(() => {
    setWordIndex((prev) => {
      if (prev >= words.length - 1) {
        setIsPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, [words.length])

  useEffect(() => {
    if (!isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      return
    }

    const baseDelay = 60000 / wpm
    const multiplier = getPauseMultiplier(words[wordIndex] || '')
    const delay = baseDelay * multiplier

    timeoutRef.current = setTimeout(advance, delay)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isPlaying, wordIndex, wpm, advance, words])

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        setIsPlaying((p) => !p)
      }
      if (e.key === 'ArrowRight' || e.key === 'l') {
        setIsPlaying(false)
        setWordIndex((prev) => Math.min(prev + 1, words.length - 1))
      }
      if (e.key === 'ArrowLeft' || e.key === 'j') {
        setIsPlaying(false)
        setWordIndex((prev) => Math.max(prev - 1, 0))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setWpm((w) => Math.min(w + 25, 1000))
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setWpm((w) => Math.max(w - 25, 100))
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setIsPlaying(false)
      }
      if (e.key === 'r') {
        setWordIndex(0)
        setIsPlaying(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, words.length])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="speed-reader-trigger"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
          <path d="M1 3h14M1 6.5h10M1 10h12M1 13.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Speed read
      </button>
    )
  }

  // Render the word with ORP highlight — focus char pinned to screen center
  const before = currentWord.slice(0, orp)
  const focus = currentWord[orp] || ''
  const after = currentWord.slice(orp + 1)

  return (
    <div className="speed-reader-overlay">
      <div className="speed-reader-modal">
        {/* Close */}
        <button
          onClick={() => { setIsOpen(false); setIsPlaying(false) }}
          className="speed-reader-close"
        >
          ✕
        </button>

        {/* Word display — focus char always at center */}
        <div className="speed-reader-display">
          {/* Vertical guide tick above */}
          <div className="sr-guide-top" />
          <div className="speed-reader-word-container">
            {/* Before: right-aligned to push focus to center */}
            <span className="sr-before-container">
              <span className="sr-dim">{before}</span>
            </span>
            {/* Focus: fixed at center */}
            <span className="sr-focus">{focus}</span>
            {/* After: left-aligned */}
            <span className="sr-after-container">
              <span className="sr-dim">{after}</span>
            </span>
          </div>
          {/* Vertical guide tick below */}
          <div className="sr-guide-bottom" />
        </div>

        {/* Progress bar */}
        <div className="speed-reader-progress-track">
          <div
            className="speed-reader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="speed-reader-controls">
          <button
            onClick={() => { setWordIndex(0); setIsPlaying(false) }}
            className="sr-btn"
            title="Reset (R)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2v5h5M2 7A6 6 0 1 1 3.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => setWpm((w) => Math.max(w - 25, 100))}
            className="sr-btn"
            title="Slower (↓)"
          >
            −
          </button>

          <span className="sr-wpm">{wpm} wpm</span>

          <button
            onClick={() => setWpm((w) => Math.min(w + 25, 1000))}
            className="sr-btn"
            title="Faster (↑)"
          >
            +
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="sr-btn sr-play"
            title="Play/Pause (Space)"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="5" y="4" width="3.5" height="12" rx="1"/>
                <rect x="11.5" y="4" width="3.5" height="12" rx="1"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 4l10 6-10 6V4z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Keyboard hints */}
        <p className="sr-hints">
          Space — play/pause · ← → — step · ↑ ↓ — speed · Esc — close
        </p>
      </div>
    </div>
  )
}
