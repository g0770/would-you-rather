'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function TypewriterText({ text = "Text not found" }) {
  const [displayText, setDisplayText] = useState("")
  const intervalRef = useRef(null)

  useEffect(() => {
    setDisplayText("")
    let index = 0

    const typeNextChar = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    intervalRef.current = setInterval(typeNextChar, 40)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text])

  return (
    <div className="font-mono text-lg">
      {displayText}
      <span className="inline-block w-[1ch] h-[1em] bg-black animate-blink"></span>
    </div>
  )
}