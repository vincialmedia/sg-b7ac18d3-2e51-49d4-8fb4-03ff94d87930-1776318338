
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children?: React.ReactNode
  className?: string
  title?: string
  description?: string
  glowColor?: "blue" | "teal" | "purple" | "red" | "green"
  animated?: boolean
}

export default function GlassCard({
  children,
  className = "",
  title,
  description,
  glowColor = "blue",
  animated = true
}: GlassCardProps) {
  const getGlowClass = () => {
    switch (glowColor) {
      case "teal":
        return "neon-glow-teal"
      case "purple":
        return "hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
      case "red":
        return "neon-glow-red"
      case "green":
        return "hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
      default:
        return "neon-glow-blue"
    }
  }

  return (
    <Card
      className={cn(
        "glass-card border-white/10 hover:border-white/20 transition-all duration-500",
        animated && "hover:scale-[1.02] hover:-translate-y-1",
        getGlowClass(),
        className
      )}
    >
      {(title || description) && (
        <CardHeader className="space-y-2">
          {title && (
            <CardTitle className="text-xl font-bold text-white/90 holographic-text">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-white/70">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {children && (
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
