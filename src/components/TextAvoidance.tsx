import React, { useRef, useEffect, useState } from "react"

interface TextAvoidanceProps {
  text: string
  tag?: keyof JSX.IntrinsicElements
  className?: string
  mousePosition: { x: number; y: number }
  intensity?: number
}

export default function TextAvoidance({
  text,
  tag = "div",
  className = "",
  mousePosition,
  intensity = 10
}: TextAvoidanceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [characters, setCharacters] = useState<Array<{ char: string; transform: string }>>([])

  useEffect(() => {
    if (!containerRef.current) return

    const chars = text.split("").map((char) => ({ char, transform: "" }))
    setCharacters(chars)
  }, [text])

  useEffect(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const charElements = containerRef.current.children

    const updatedChars = characters.map((charObj, index) => {
      const charElement = charElements[index] as HTMLElement
      if (!charElement) return charObj

      const charRect = charElement.getBoundingClientRect()
      const charCenterX = charRect.left + charRect.width / 2
      const charCenterY = charRect.top + charRect.height / 2

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - charCenterX, 2) +
        Math.pow(mousePosition.y - charCenterY, 2)
      )

      if (distance < 100) {
        const angle = Math.atan2(charCenterY - mousePosition.y, charCenterX - mousePosition.x)
        const force = Math.max(0, (100 - distance) / 100)
        const moveX = Math.cos(angle) * force * intensity
        const moveY = Math.sin(angle) * force * intensity

        return {
          ...charObj,
          transform: `translate(${moveX}px, ${moveY}px)`
        }
      }

      return {
        ...charObj,
        transform: ""
      }
    })

    setCharacters(updatedChars)
  }, [mousePosition, intensity, characters])

  const Tag = tag
  const words = text.split(" ")

  return (
    <Tag ref={containerRef} className={`relative ${className}`}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block transition-transform duration-150 ease-out"
                style={{
                  transform: characters[wordIndex * word.length + charIndex]?.transform || "",
                }}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && (
            <span className="inline-block" style={{ width: "0.25em" }}> </span>
          )}
        </React.Fragment>
      ))}
    </Tag>
  )
}
