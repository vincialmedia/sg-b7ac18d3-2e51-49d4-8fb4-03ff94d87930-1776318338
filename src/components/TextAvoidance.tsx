
import React, { useEffect, useRef, useState } from "react"

interface TextAvoidanceProps {
  text: string
  className?: string
  mousePosition: { x: number, y: number }
  intensity?: number
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
}

export default function TextAvoidance({ 
  text, 
  className = "", 
  mousePosition, 
  intensity = 10,
  tag = "span" 
}: TextAvoidanceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [charPositions, setCharPositions] = useState<Array<{ x: number, y: number, char: string }>>([])
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const chars = text.split("")
    const newPositions = chars.map((char) => ({
      x: 0,
      y: 0,
      char
    }))
    
    setCharPositions(newPositions)
  }, [text])
  
  useEffect(() => {
    if (!containerRef.current || charPositions.length === 0) return
    
    const charElements = containerRef.current.querySelectorAll(".char")
    const newPositions = [...charPositions]
    
    charElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect()
      const charCenterX = rect.left + rect.width / 2
      const charCenterY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - charCenterX, 2) + 
        Math.pow(mousePosition.y - charCenterY, 2)
      )
      
      if (distance < 80) {
        // Calculate angle from mouse to character
        const angle = Math.atan2(charCenterY - mousePosition.y, charCenterX - mousePosition.x)
        
        // Add some randomness to the angle to make characters move in different directions
        const randomAngleOffset = (Math.random() - 0.5) * 0.5
        const finalAngle = angle + randomAngleOffset
        
        // Make force smaller for more subtle effect
        const force = Math.max(0, (80 - distance) / 80) * 0.7
        
        // Calculate movement based on angle and force
        const moveX = Math.cos(finalAngle) * force * intensity
        const moveY = Math.sin(finalAngle) * force * intensity
        
        newPositions[index] = {
          ...newPositions[index],
          x: moveX,
          y: moveY
        }
      } else {
        // Gradually return to original position
        newPositions[index] = {
          ...newPositions[index],
          x: newPositions[index].x * 0.85,
          y: newPositions[index].y * 0.85
        }
      }
    })
    
    setCharPositions(newPositions)
  }, [mousePosition, intensity, charPositions])
  
  const Tag = tag

  return (
    <Tag ref={containerRef} className={className}>
      {charPositions.map((pos, index) => (
        <span 
          key={index} 
          className="char inline-block transition-transform duration-150 ease-out"
          style={{ 
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            display: pos.char === " " ? "inline-block" : undefined,
            width: pos.char === " " ? "0.25em" : undefined
          }}
        >
          {pos.char}
        </span>
      ))}
    </Tag>
  )
}
