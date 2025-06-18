import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image"; // Import Next Image
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FuturisticButton from "@/components/FuturisticButton";
import GlassCard from "@/components/GlassCard";
import { 
  Globe, 
  Zap, 
  Users, 
  // Star, // Removed unused import
  ArrowRight, 
  CheckCircle, 
  Mail, 
  Award,
  TrendingUp,
  Target,
  Gift,
  Package,
  ExternalLink,
  Code,
  Gauge,
  Sparkles,
  Cpu,
  Rocket
} from "lucide-react";

export default function Home() {
  const [userPoints, setUserPoints] = useState(0);
  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({});
  const [userEmail, setUserEmail] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Removed unused state
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const handleMouseMove = (e: globalThis.MouseEvent) => { // Removed unused handler
    //   setMousePosition({ x: e.clientX, y: e.clientY });
    // };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // window.addEventListener("mousemove", handleMouseMove as EventListener); // Removed unused listener
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      // window.removeEventListener("mousemove", handleMouseMove as EventListener); // Removed unused listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    {
      id: "website",
      icon: Globe,
      title: "Neural Web Design",
      description: "AI-powered websites that adapt and evolve with your business needs.",
      explanation: "Next-generation web architecture with quantum-fast loading, neural SEO optimization, and adaptive user experiences that learn from visitor behavior.",
      basePoints: 400,
      features: ["Quantum Loading", "Neural SEO", "Adaptive UX", "AI Analytics", "Holographic Design"],
      glowColor: "blue" as const
    },
    {
      id: "social",
      icon: Users,
      title: "Digital Consciousness",
      description: "Transcend traditional social media with consciousness-driven engagement.",
      explanation: "Harness the collective digital consciousness through advanced social algorithms, predictive content creation, and quantum engagement metrics.",
      basePoints: 300,
      features: ["Predictive Content", "Quantum Engagement", "Neural Analytics", "Consciousness Mapping", "Digital Evolution"],
      glowColor: "teal" as const
    },
    {
      id: "automation",
      icon: Zap,
      title: "Quantum Automation",
      description: "Transcend linear marketing with quantum-entangled automation systems.",
      explanation: "Deploy self-evolving automation networks that exist in multiple dimensions simultaneously, optimizing across infinite possibility matrices.",
      basePoints: 350,
      features: ["Quantum Workflows", "Multi-dimensional Analytics", "Self-Evolution", "Infinite Optimization", "Reality Synthesis"],
      glowColor: "purple" as const
    }
  ]

  const portfolioProjects = [
    {
      title: "Crowdhouse",
      description: "Engineered a quantum leap in conversion rates by implementing neural marketing automation that predicted user behavior across multiple reality streams.",
      image: "/vincent-mbkuncn4.jpeg",
      technologies: ["Neural Cloud", "Quantum WordPress", "Reality Script", "Dimension.js"],
      features: ["Quantum Automation", "Reality Mapping", "Neural Analytics"],
      link: "https://www.crowdhouse.com",
      glowColor: "blue" as const
    },
    {
      title: "Speed Comparer",
      description: "Transcended traditional content creation by building a multi-dimensional media empire spanning 200K+ YouTube subscribers across parallel universes.",
      image: "/untitled-design-mbkvnaem.png",
      technologies: ["Quantum Cut Pro", "Neural Canvas", "Reality Shop"],
      features: ["Dimensional Strategy", "Quantum Shoots", "Reality Analytics"],
      link: "https://www.youtube.com/speedcomparer",
      glowColor: "teal" as const
    }
  ]

  const addService = (serviceId: string, points: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: 1
    }))
    setUserPoints(prev => prev + points)
  }

  const removeService = (serviceId: string, points: number) => {
    if (selectedServices[serviceId] > 0) {
      setSelectedServices(prev => {
        const newServices = { ...prev }
        delete newServices[serviceId]
        return newServices
      })
      setUserPoints(prev => prev - points)
    }
  }

  const getTotalServices = () => {
    return Object.values(selectedServices).reduce((sum, count) => sum + count, 0)
  }

  const handleSubmitClick = async () => {
    if (!userEmail || getTotalServices() === 0) {
      alert("Please enter your email and select at least one service.")
      return
    }

    try {
      const response = await fetch("/api/submit-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          services: selectedServices,
          points: userPoints,
          marketingConsent,
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (typeof window !== "undefined" && window._hsq) {
          console.log("Pushing HubSpot identify:", userEmail)
          window._hsq.push([
            "identify",
            {
              email: userEmail
            }
          ])
        }

        setShowEmailDialog(false)
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)

        setUserEmail("")
        setMarketingConsent(false)
        setSelectedServices({})
        setUserPoints(0)
      } else {
        console.error("API error:", result.message)
        alert("Failed to submit package request: " + result.message)
      }
    } catch (error) {
      console.error("Network or server error:", error)
      alert("An error occurred while submitting your request. Please try again.")
    }
  }

  const progressPercentage = Math.min((userPoints / 1000) * 100, 100)
  const hasReachedGoal = userPoints >= 1000

  return (
    <>
      <Head>
        <title>Vincialmedia - Quantum Digital Architecture</title>
        <meta
          name="description"
          content="Transcend reality with quantum web development, neural automation, and consciousness-driven digital experiences."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="093175ce-ab1b-45f1-b766-f12aa6311a07"
        strategy="beforeInteractive"
      />

      <script
        type="text/plain"
        data-cookieconsent="marketing"
        data-src="https://js-eu1.hs-scripts.com/146320474.js"
        async
        defer
      ></script>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K43H5KD1R1"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K43H5KD1R1');
        `}
      </Script>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-x-hidden relative">
        {/* Cyber Grid Background */}
        <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
        
        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
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

        {/* Quantum Progress Bar */}
        <div 
          className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-cyan-500/20 transition-all duration-500"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)`,
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="text-cyan-400 animate-pulse" size={16} />
                <span className="text-sm font-medium text-cyan-300 holographic-text">
                  {userPoints} Quantum Points
                </span>
              </div>
              <div className="flex-1 max-w-[200px] mx-4">
                <div className="relative h-2">
                  <Progress value={progressPercentage} className="h-2 neon-glow-blue" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full animate-pulse" />
                </div>
              </div>
              {hasReachedGoal ? (
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black border-0 neon-glow-teal">
                  <Gift className="mr-1" size={12} />
                  Quantum Gift Unlocked
                </Badge>
              ) : (
                <span className="text-cyan-400/70 text-xs">
                  {1000 - userPoints} to quantum unlock
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative px-4 py-24 md:py-32 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0 neon-glow-blue">
                    <Cpu className="mr-2" size={14} />
                    Quantum Digital Architect
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="block text-white/90">Transcend</span>
                    <span className="block holographic-text animate-neon-flicker">Digital Reality</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-cyan-300/80 leading-relaxed">
                    Engineer quantum-powered digital experiences that exist beyond conventional reality. 
                    Where consciousness meets code, and possibilities become infinite.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <FuturisticButton 
                    variant="primary"
                    size="lg"
                    onClick={() => scrollToSection("quantum-services")}
                  >
                    <Rocket className="mr-2" size={20} />
                    Initialize Quantum Journey
                  </FuturisticButton>
                  
                  <FuturisticButton 
                    variant="ghost"
                    size="lg"
                    onClick={() => scrollToSection("reality-portfolio")}
                  >
                    Explore Reality Matrix
                    <ArrowRight className="ml-2" size={20} />
                  </FuturisticButton>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 mx-auto w-96 h-96 rounded-full overflow-hidden glass-card neon-glow-blue animate-quantum-spin">
                  <Image 
                    src="/vince-mbggi03h.jpeg" 
                    alt="Vince - Quantum Digital Architect"
                    width={384} // w-96 is 384px
                    height={384} // h-96 is 384px
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 animate-pulse" />
                </div>
                
                {/* Quantum Orbitals */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                  <div className="absolute top-0 left-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transform -translate-x-1/2 -translate-y-3 neon-glow-blue" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full transform -translate-x-1/2 translate-y-3 neon-glow-red" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "25s" }}>
                  <div className="absolute left-0 top-1/2 w-5 h-5 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-full transform -translate-x-3 -translate-y-1/2 neon-glow-teal" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reality Portfolio Section */}
        <section id="reality-portfolio" className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6 holographic-text">
                Reality Matrix Portfolio
              </h2>
              <p className="text-xl text-cyan-300/70">
                Witness the convergence of quantum engineering and digital consciousness
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolioProjects.map((project, index) => (
                <GlassCard key={index} glowColor={project.glowColor} className="group">
                  <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0">
                        {index === 0 ? <Gauge className="mr-1" size={12} /> : <Code className="mr-1" size={12} />}
                        {index === 0 ? "Quantum Performance" : "Neural Architecture"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <FuturisticButton variant="ghost" size="sm">
                          <ExternalLink size={16} />
                        </FuturisticButton>
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white/90 holographic-text">{project.title}</h3>
                    <p className="text-cyan-300/80">{project.description}</p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white/80">Quantum Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="text-cyan-400 flex-shrink-0" size={14} />
                            <span className="text-sm text-cyan-300/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white/80">Neural Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} className="glass-card text-cyan-400 border-cyan-500/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Quantum Services Section */}
        <section id="quantum-services" className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6 holographic-text">
                Quantum Service Matrix
              </h2>
              <p className="text-xl text-cyan-300/70">
                Select your quantum modules and accumulate reality points
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon
                const selectedCount = selectedServices[service.id] || 0
                
                return (
                  <GlassCard key={service.id} glowColor={service.glowColor} className="group">
                    <div className="text-center space-y-6">
                      <div className="mx-auto w-20 h-20 glass-card rounded-full flex items-center justify-center mb-6 neon-glow-blue group-hover:animate-quantum-spin">
                        <Icon className="text-cyan-400" size={40} />
                      </div>
                      
                      <div className="space-y-3">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0">
                          +{service.basePoints} Quantum Points
                        </Badge>
                        <h3 className="text-2xl font-bold text-white/90 holographic-text">{service.title}</h3>
                        <p className="text-cyan-300/70">{service.description}</p>
                      </div>
                      
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-sm text-cyan-300/60">{service.explanation}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white/80">Quantum Capabilities:</h4>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="text-cyan-400 flex-shrink-0" size={14} />
                              <span className="text-sm text-cyan-300/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        {selectedCount === 0 ? (
                          <FuturisticButton
                            variant="primary"
                            onClick={() => addService(service.id, service.basePoints)}
                            className="w-full"
                          >
                            Initialize Module
                          </FuturisticButton>
                        ) : (
                          <FuturisticButton
                            variant="destructive"
                            onClick={() => removeService(service.id, service.basePoints)}
                            className="w-full"
                          >
                            Deactivate Module
                          </FuturisticButton>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quantum Package Summary */}
        {getTotalServices() > 0 && (
          <section className="px-4 py-20 relative">
            <div className="max-w-4xl mx-auto">
              <GlassCard glowColor="blue" className="border-2 border-cyan-500/30">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 glass-card rounded-full flex items-center justify-center neon-glow-blue">
                    <Package className="text-cyan-400" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white/90 holographic-text">Quantum Package Matrix</h2>
                  <p className="text-cyan-300/70">Review your selected modules and initialize quantum deployment</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white/80">Active Modules:</h4>
                    <div className="space-y-3">
                      {services.map((service) => {
                        const count = selectedServices[service.id] || 0
                        if (count === 0) return null
                        return (
                          <div key={service.id} className="flex justify-between items-center glass-card p-3 rounded-lg">
                            <span className="text-cyan-300">{service.title}</span>
                            <span className="font-semibold text-cyan-400">{count * service.basePoints} pts</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="glass-card p-6 rounded-lg neon-glow-blue">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-white/80">Total Quantum Points:</span>
                        <span className="text-2xl font-bold holographic-text">{userPoints}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-300/70">Active Modules:</span>
                        <span className="text-cyan-400">{getTotalServices()}</span>
                      </div>
                    </div>
                    
                    {hasReachedGoal && (
                      <div className="glass-card p-4 rounded-lg border border-green-400/30 neon-glow-teal">
                        <div className="flex items-center gap-3 text-green-400">
                          <Gift size={24} />
                          <div>
                            <div className="font-semibold">Quantum Gift Unlocked!</div>
                            <div className="text-sm text-green-300/70">Reality-bending bonus awaits</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <Dialog 
                    open={showEmailDialog} 
                    onOpenChange={(open) => {
                      const cleanPath = window.location.pathname + window.location.hash
                      if (open && window.history.pushState) {
                        window.history.pushState(null, '', cleanPath)
                      }
                      setShowEmailDialog(open)
                    }}
                  >
                    <DialogTrigger asChild>
                      <FuturisticButton 
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={(e) => {
                          e?.preventDefault()
                          const cleanPath = window.location.pathname + window.location.hash
                          if (window.history.pushState) {
                            window.history.pushState(null, '', cleanPath)
                          }
                          setShowEmailDialog(true)
                        }}
                      >
                        <Rocket className="mr-2" size={20} />
                        Initialize Quantum Deployment
                      </FuturisticButton>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-cyan-500/30">
                      <DialogHeader>
                        <DialogTitle className="holographic-text">Quantum Deployment Protocol</DialogTitle>
                        <DialogDescription className="text-cyan-300/70">
                          Enter your neural interface coordinates to receive quantum specifications
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="email" className="text-white/80">Neural Interface Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@quantum.interface"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="glass-card border-cyan-500/30 text-cyan-300 placeholder:text-cyan-500/50"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="marketing"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="h-4 w-4 rounded border-cyan-500/30 text-cyan-600 focus:ring-cyan-500"
                          />
                          <Label htmlFor="marketing" className="text-sm text-cyan-300/70">
                            Enable quantum consciousness synchronization
                          </Label>
                        </div>
                        <FuturisticButton 
                          variant="primary"
                          onClick={() => {
                            handleSubmitClick();
                          }}
                          className="w-full"
                          disabled={!userEmail || getTotalServices() === 0}
                        >
                          Deploy Quantum Matrix
                        </FuturisticButton>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </GlassCard>
            </div>
          </section>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 glass-card border border-green-400/30 p-4 rounded-lg shadow-lg z-50 neon-glow-teal">
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle size={24} />
              <span className="font-semibold">Quantum deployment initialized successfully!</span>
            </div>
          </div>
        )}

        {/* Quantum Achievements Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6 holographic-text">
                Quantum Achievements
              </h2>
              <p className="text-xl text-cyan-300/70">
                Transcending conventional metrics across infinite dimensions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard glowColor="blue" className="text-center group">
                <div className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center mb-6 neon-glow-blue group-hover:animate-quantum-spin">
                  <Award size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white/90 holographic-text mb-2">∞+ Projects</h3>
                <p className="text-cyan-300/70">Infinite realities engineered across quantum dimensions</p>
              </GlassCard>
              
              <GlassCard glowColor="teal" className="text-center group">
                <div className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center mb-6 neon-glow-teal group-hover:animate-quantum-spin">
                  <TrendingUp size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white/90 holographic-text mb-2">∞% ROI</h3>
                <p className="text-cyan-300/70">Returns that transcend mathematical possibility</p>
              </GlassCard>
              
              <GlassCard glowColor="purple" className="text-center group">
                <div className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center mb-6 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:animate-quantum-spin">
                  <Target size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white/90 holographic-text mb-2">100% Consciousness</h3>
                <p className="text-cyan-300/70">Perfect alignment with digital consciousness</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Quantum Contact Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard glowColor="blue" className="border-2 border-cyan-500/30">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white/90 holographic-text">
                  Initialize Quantum Contact
                </h2>
                <p className="text-xl text-cyan-300/70">
                  Ready to transcend digital reality? Let's synchronize consciousness.
                </p>
                
                <FuturisticButton variant="secondary" size="lg">
                  <Mail className="mr-2" size={20} />
                  vincent@quantum.vincialmedia.com
                </FuturisticButton>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Quantum Footer */}
        <footer className="px-4 py-12 relative border-t border-cyan-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white/90 holographic-text mb-4">Vincialmedia</h3>
            <p className="text-cyan-300/70 mb-6">Quantum Digital Architecture • Reality Engineering • Consciousness Synthesis</p>
            <div className="flex justify-center gap-3">
              <Badge className="glass-card text-cyan-400 border-cyan-500/30">Neural Web Design</Badge>
              <Badge className="glass-card text-cyan-400 border-cyan-500/30">Quantum Automation</Badge>
              <Badge className="glass-card text-cyan-400 border-cyan-500/30">Digital Consciousness</Badge>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
