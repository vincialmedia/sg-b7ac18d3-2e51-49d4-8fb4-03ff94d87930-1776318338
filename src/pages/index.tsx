
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
      
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-x-hidden">
        {/* Progress Bar */}
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 transition-all duration-300"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.05, 5)}px)`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="text-cyan-400" size={16} />
                <span className="text-sm font-medium text-cyan-300">
                  {userPoints} Points
                </span>
              </div>
              <div className="flex-1 max-w-xs mx-4">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              {hasReachedGoal ? (
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black border-0">
                  <Gift className="mr-1" size={12} />
                  Bonus Unlocked
                </Badge>
              ) : (
                <span className="text-cyan-400/70 text-sm hidden sm:inline">
                  {1000 - userPoints} to unlock bonus
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative px-4 py-20 md:py-32 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-[80%] mx-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12 lg:p-16 shadow-2xl">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                  <div className="space-y-4 lg:space-y-6">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0">
                      <Cpu className="mr-2" size={14} />
                      Advanced Digital Architect
                    </Badge>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                      <span className="block text-white/90">Transform</span>
                      <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Digital Excellence</span>
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Engineer cutting-edge digital experiences that push beyond conventional boundaries. 
                      Where innovation meets execution, and possibilities become reality.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <FuturisticButton 
                      variant="primary"
                      size="lg"
                      onClick={() => scrollToSection("services")}
                      className="w-full sm:w-auto"
                    >
                      <Rocket className="mr-2" size={20} />
                      Start Your Journey
                    </FuturisticButton>
                    
                    <FuturisticButton 
                      variant="ghost"
                      size="lg"
                      onClick={() => scrollToSection("portfolio")}
                      className="w-full sm:w-auto"
                    >
                      View Portfolio
                      <ArrowRight className="ml-2" size={20} />
                    </FuturisticButton>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end">
                  <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 shadow-xl">
                    <Image 
                      src="/vince-mbggi03h.jpeg" 
                      alt="Vince - Advanced Digital Architect"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
                  Featured Portfolio
                </h2>
                <p className="text-xl text-slate-300">
                  Witness the convergence of advanced engineering and digital innovation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {portfolioProjects.map((project, index) => (
                  <div key={index} className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
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
                      <h3 className="text-2xl font-bold text-white/90">{project.title}</h3>
                      <p className="text-slate-300">{project.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white/80">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="text-cyan-400 flex-shrink-0" size={14} />
                              <span className="text-sm text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white/80">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} className="bg-slate-600/50 text-cyan-400 border-slate-500/50">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 mb-6">
                  Service Portfolio
                </h2>
                <p className="text-lg md:text-xl text-slate-300">
                  Select your services and build your project package
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service) => {
                  const Icon = service.icon
                  const selectedCount = selectedServices[service.id] || 0
                  
                  return (
                    <div key={service.id} className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                          <Icon className="text-cyan-400" size={32} />
                        </div>
                        
                        <div className="space-y-3">
                          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-0 text-xs">
                            +{service.basePoints} Points
                          </Badge>
                          <h3 className="text-xl md:text-2xl font-bold text-white/90">{service.title}</h3>
                          <p className="text-sm md:text-base text-slate-300">{service.description}</p>
                        </div>
                        
                        <div className="bg-slate-600/30 backdrop-blur-sm p-4 rounded-lg border border-slate-500/30">
                          <p className="text-xs md:text-sm text-slate-300">{service.explanation}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white/80 text-sm md:text-base">Core Capabilities:</h4>
                          <div className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="text-cyan-400 flex-shrink-0" size={12} />
                                <span className="text-xs md:text-sm text-slate-300">{feature}</span>
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
                              size="md"
                            >
                              Add Service
                            </FuturisticButton>
                          ) : (
                            <FuturisticButton
                              variant="destructive"
                              onClick={() => removeService(service.id, service.basePoints)}
                              className="w-full"
                              size="md"
                            >
                              Remove Service
                            </FuturisticButton>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Package Summary */}
        {getTotalServices() > 0 && (
          <section className="px-4 py-20 relative">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-[80%] mx-auto bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 md:p-12 shadow-2xl">
                <div className="text-center space-y-6 mb-8">
                  <div className="mx-auto w-20 h-20 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Package className="text-cyan-400" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white/90">Project Package</h2>
                  <p className="text-slate-300">Review your selected services and start your project</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white/80">Selected Services:</h4>
                    <div className="space-y-3">
                      {services.map((service) => {
                        const count = selectedServices[service.id] || 0
                        if (count === 0) return null
                        return (
                          <div key={service.id} className="flex justify-between items-center bg-slate-600/30 backdrop-blur-sm p-3 rounded-lg border border-slate-500/30">
                            <span className="text-slate-300">{service.title}</span>
                            <span className="font-semibold text-cyan-400">{count * service.basePoints} pts</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-600/30 backdrop-blur-sm p-6 rounded-lg border border-slate-500/30">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-white/80">Total Points:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{userPoints}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Services:</span>
                        <span className="text-cyan-400">{getTotalServices()}</span>
                      </div>
                    </div>
                    
                    {hasReachedGoal && (
                      <div className="bg-slate-600/30 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
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
                    <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-cyan-500/30">
                      <DialogHeader>
                        <DialogTitle className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Project Inquiry</DialogTitle>
                        <DialogDescription className="text-slate-300">
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
                            className="bg-slate-700/50 border-slate-600/50 text-slate-200 placeholder:text-slate-400"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="marketing"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-600/50 text-cyan-600 focus:ring-cyan-500"
                          />
                          <Label htmlFor="marketing" className="text-sm text-slate-300">
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
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 bg-slate-800/95 backdrop-blur-sm border border-green-400/30 p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle size={24} />
              <span className="font-semibold">Project inquiry submitted successfully!</span>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
                  Track Record
                </h2>
                <p className="text-xl text-slate-300">
                  Delivering exceptional results across diverse digital projects
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Award size={48} className="text-cyan-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white/90 mb-2">50+ Projects</h3>
                  <p className="text-slate-300">Successfully delivered across multiple industries</p>
                </div>
                
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <TrendingUp size={48} className="text-cyan-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white/90 mb-2">300% Avg ROI</h3>
                  <p className="text-slate-300">Measurable returns on digital investments</p>
                </div>
                
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-slate-600/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Target size={48} className="text-cyan-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white/90 mb-2">100% Satisfaction</h3>
                  <p className="text-slate-300">Committed to exceeding client expectations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 md:p-12 text-center shadow-2xl">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white/90">
                  Get In Touch
                </h2>
                <p className="text-xl text-slate-300">
                  Ready to transform your digital presence? Let's discuss your project.
                </p>
                
                <FuturisticButton variant="secondary" size="lg">
                  <Mail className="mr-2" size={20} />
                  vincent@vincialmedia.com
                </FuturisticButton>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 relative border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto text-center">
              <h3 className="text-3xl font-bold text-white/90 mb-4">Vincialmedia</h3>
              <p className="text-slate-300 mb-6">Advanced Digital Architecture • Performance Engineering • Strategic Innovation</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Badge className="bg-slate-700/50 text-cyan-400 border-slate-600/50">Advanced Web Design</Badge>
                <Badge className="bg-slate-700/50 text-cyan-400 border-slate-600/50">Smart Automation</Badge>
                <Badge className="bg-slate-700/50 text-cyan-400 border-slate-600/50">Digital Strategy</Badge>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
