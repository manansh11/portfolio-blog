'use client'

import { useState, useEffect } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  if (progress < 1) return null

  return (
    <div className="reading-progress-bar">
      <div
        className="reading-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
