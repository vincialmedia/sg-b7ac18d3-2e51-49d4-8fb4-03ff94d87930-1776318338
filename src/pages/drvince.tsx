import React from "react"
import Head from "next/head"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Cpu } from "lucide-react"

export default function DrVince() {
  return (
    <>
      <Head>
        <title>Dr. Vince - Vincialmedia</title>
        <meta
          name="description"
          content="Dr. Vince project showcase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative">
        {/* Cyber Grid Background */}
        <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
        
        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="floating-particle bg-cyan-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 4 + 4}s`
              }}
            />
          ))}
        </div>

        {/* Compact Futuristic Header */}
        <header className="relative z-10 glass-card border-0 border-b border-cyan-500/20 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Profile Image */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden glass-card neon-glow-blue">
                  <Image 
                    src="/vince-mbggi03h.jpeg" 
                    alt="Vince - Advanced Digital Architect"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20" />
                </div>
                
                {/* Title Section */}
                <div>
                  <h1 className="text-xl font-bold text-white/90 holographic-text">Vincialmedia</h1>
                  <p className="text-sm text-cyan-300/70">Project Showcase</p>
                </div>
              </div>
              
              {/* Branding */}
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0 neon-glow-blue text-xs">
                  <Cpu className="mr-1" size={10} />
                  Vincialmedia
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Iframe Container */}
        <div className="w-full" style={{ height: "calc(100vh - 80px)" }}>
          <iframe
            src="https://sg-166a7f98-b0fa-4a54-ae3d-12d6c167.vercel.app/"
            className="w-full h-full border-0"
            title="Dr. Vince Application"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
          />
        </div>
      </main>
    </>
  )
}
