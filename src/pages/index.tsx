
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
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
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
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
      title: "Advanced Web Design",
      description: "AI-powered websites that adapt and evolve with your business needs.",
      explanation: "Next-generation web architecture with lightning-fast loading, intelligent SEO optimization, and adaptive user experiences that learn from visitor behavior.",
      basePoints: 400,
      features: ["Lightning Speed", "Smart SEO", "Adaptive UX", "AI Analytics", "Modern Design"],
      glowColor: "blue" as const
    },
    {
      id: "social",
      icon: Users,
      title: "Digital Strategy",
      description: "Transform traditional social media with data-driven engagement strategies.",
      explanation: "Harness advanced social algorithms, predictive content creation, and intelligent engagement metrics to maximize your digital presence.",
      basePoints: 300,
      features: ["Predictive Content", "Smart Engagement", "Advanced Analytics", "Audience Mapping", "Digital Growth"],
      glowColor: "teal" as const
    },
    {
      id: "automation",
      icon: Zap,
      title: "Smart Automation",
      description: "Streamline your marketing with intelligent automation systems.",
      explanation: "Deploy self-optimizing automation networks that continuously learn and adapt, maximizing efficiency across all your digital touchpoints.",
      basePoints: 350,
      features: ["Smart Workflows", "Multi-channel Analytics", "Self-Optimization", "Performance Tracking", "System Integration"],
      glowColor: "purple" as const
    }
  ]

  const portfolioProjects = [
    {
      title: "Crowdhouse",
      description: "Engineered a significant boost in conversion rates by implementing intelligent marketing automation that predicted user behavior patterns.",
      image: "/vincent-mbkuncn4.jpeg",
      technologies: ["Cloud Infrastructure", "Advanced WordPress", "Custom Scripts", "Modern JS"],
      features: ["Smart Automation", "Performance Mapping", "Advanced Analytics"],
      link: "https://www.crowdhouse.com",
      glowColor: "blue" as const
    },
    {
      title: "Speed Comparer",
      description: "Built a comprehensive media empire spanning 200K+ YouTube subscribers through strategic content creation and audience engagement.",
      image: "/untitled-design-mbkvnaem.png",
      technologies: ["Video Production", "Design Suite", "E-commerce"],
      features: ["Content Strategy", "Professional Production", "Performance Analytics"],
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
        <title>Vincialmedia - Advanced Digital Architecture</title>
        <meta
          name="description"
          content="Transform your digital presence with advanced web development, intelligent automation, and data-driven digital experiences."
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

        {/* Progress Bar */}
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
                  {userPoints} Project Points
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
                  Bonus Unlocked
                </Badge>
              ) : (
                <span className="text-cyan-400/70 text-xs">
                  {1000 - userPoints} to unlock bonus
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
                    Advanced Digital Architect
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="block text-white/90">Transform</span>
                    <span className="block holographic-text animate-neon-flicker">Digital Excellence</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-cyan-300/80 leading-relaxed">
                    Engineer cutting-edge digital experiences that push beyond conventional boundaries. 
                    Where innovation meets execution, and possibilities become reality.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <FuturisticButton 
                    variant="primary"
                    size="lg"
                    onClick={() => scrollToSection("services")}
                  >
                    <Rocket className="mr-2" size={20} />
                    Start Your Journey
                  </FuturisticButton>
                  
                  <FuturisticButton 
                    variant="ghost"
                    size="lg"
                    onClick={() => scrollToSection("portfolio")}
                  >
                    View Portfolio
                    <ArrowRight className="ml-2" size={20} />
                  </FuturisticButton>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 mx-auto w-96 h-96 rounded-full overflow-hidden glass-card neon-glow-blue">
                  <Image 
                    src="/vince-mbggi03h.jpeg" 
                    alt="Vince - Advanced Digital Architect"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20" />
                </div>
                
                {/* Subtle Orbital Elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "60s" }}>
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transform -translate-x-1/2 -translate-y-3 neon-glow-blue opacity-60" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "45s", animationDirection: "reverse" }}>
                  <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full transform -translate-x-1/2 translate-y-3 neon-glow-red opacity-60" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "75s" }}>
                  <div className="absolute left-0 top-1/2 w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-full transform -translate-x-3 -translate-y-1/2 neon-glow-teal opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6 holographic-text">
                Featured Portfolio
              </h2>
              <p className="text-xl text-cyan-300/70">
                Witness the convergence of advanced engineering and digital innovation
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
                        {index === 0 ? "High Performance" : "Advanced Architecture"}
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
                      <h4 className="font-semibold text-white/80">Key Features:</h4>
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
                      <h4 className="font-semibold text-white/80">Tech Stack:</h4>
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

        {/* Services Section */}
        <section id="services" className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6 holographic-text">
                Service Portfolio
              </h2>
              <p className="text-xl text-cyan-300/70">
                Select your services and build your project package
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon
                const selectedCount = selectedServices[service.id] || 0
                
                return (
                  <GlassCard key={service.id} glowColor={service.glowColor} className="group">
                    <div className="text-center space-y-6">
                      <div className="mx-auto w-20 h-20 glass-card rounded-full flex items-center justify-center mb-6 neon-glow-blue group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-cyan-400" size={40} />
                      </div>
                      
                      <div className="space-y-3">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0">
                          +{service.basePoints} Points
                        </Badge>
                        <h3 className="text-2xl font-bold text-white/90 holographic-text">{service.title}</h3>
                        <p className="text-cyan-300/70">{service.description}</p>
                      </div>
                      
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-sm text-cyan-300/60">{service.explanation}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white/80">Core Capabilities:</h4>
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
                            Add Service
                          </FuturisticButton>
                        ) : (
                          <FuturisticButton
                            variant="destructive"
                            onClick={() => removeService(service.id, service.basePoints)}
                            className="w-full"
                          >
                            Remove Service
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

        {/* Package Summary */}
        {getTotalServices() > 0 && (
          <section className="px-4 py-20 relative">
            <div className="max-w-4xl mx-auto">
              <GlassCard glowColor="blue" className="border-2 border-cyan-500/30">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 glass-card rounded-full flex items-center justify-center neon-glow-blue">
                    <Package className="text-cyan-400" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white/90 holographic-text">Project Package</h2>
                  <p className="text-cyan-300/70">Review your selected services and start your project</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white/80">Selected Services:</h4>
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
                        <span className="font-semibold text-white/80">Total Points:</span>
                        <span className="text-2xl font-bold holographic-text">{userPoints}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-300/70">Services:</span>
                        <span className="text-cyan-400">{getTotalServices()}</span>
                      </div>
                    </div>
                    
                    {hasReachedGoal && (
                      <div className="glass-card p-4 rounded-lg border border-green-400/30 neon-glow-teal">
                        <div className="flex items-center gap-3 text-green-400">
                          <Gift size={24} />
                          <div>
                            <div className="font-semibold">Bonus Package Unlocked!</div>
                            <div className="text-sm text-green-300/70">Additional value included</div>
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
                        Start Project
                      </FuturisticButton>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-cyan-500/30">
                      <DialogHeader>
                        <DialogTitle className="holographic-text">Project Inquiry</DialogTitle>
                        <DialogDescription className="text-cyan-300/70">
                          Enter your contact details to receive project specifications
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="email" className="text-white/80">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
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
                            Subscribe to project updates and insights
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
                          Submit Inquiry
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
              <span className="font-semibold">Project inquiry submitted successfully!</span>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6 holographic-text">
                Track Record
              </h2>
              <p className="text-xl text-cyan-300/70">
                Delivering exceptional results across diverse digital projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard glowColor="blue" className="text-center group">
                <div className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center mb-6 neon-glow-blue group-hover:scale-110 transition-transform duration-300">
                  <Award size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white/90 holographic-text mb-2">50+ Projects</h3>
                <p className="text-cyan-300/70">Successfully delivered across multiple industries</p>
              </GlassCard>
              
              <GlassCard glowColor="teal" className="text-center group">
                <div className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center mb-6 neon-glow-teal group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white/90 holographic-text mb-2">300% Avg ROI</h3>
                <p className="text-cyan-300/70">Measurable returns on digital investments</p>
              </GlassCard>
              
              <GlassCard glowColor="purple" className="text-center group">
                <div className="mx-auto w-24 h-24 glass-card rounded-full flex items-center justify-center mb-6 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300">
                  <Target size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white/90 holographic-text mb-2">100% Satisfaction</h3>
                <p className="text-cyan-300/70">Committed to exceeding client expectations</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard glowColor="blue" className="border-2 border-cyan-500/30">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white/90 holographic-text">
                  Get In Touch
                </h2>
                <p className="text-xl text-cyan-300/70">
                  Ready to transform your digital presence? Let's discuss your project.
                </p>
                
                <FuturisticButton variant="secondary" size="lg">
                  <Mail className="mr-2" size={20} />
                  vincent@vincialmedia.com
                </FuturisticButton>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 relative border-t border-cyan-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white/90 holographic-text mb-4">Vincialmedia</h3>
            <p className="text-cyan-300/70 mb-6">Advanced Digital Architecture • Performance Engineering • Strategic Innovation</p>
            <div className="flex justify-center gap-3">
              <Badge className="glass-card text-cyan-400 border-cyan-500/30">Advanced Web Design</Badge>
              <Badge className="glass-card text-cyan-400 border-cyan-500/30">Smart Automation</Badge>
              <Badge className="glass-card text-cyan-400 border-cyan-500/30">Digital Strategy</Badge>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
