import React, { useState, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const heroRef = useRef<HTMLDivElement>(null);

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
    },
    {
      id: "social",
      icon: Users,
      title: "Digital Strategy",
      description: "Transform traditional social media with data-driven engagement strategies.",
      explanation: "Harness advanced social algorithms, predictive content creation, and intelligent engagement metrics to maximize your digital presence.",
      basePoints: 300,
      features: ["Predictive Content", "Smart Engagement", "Advanced Analytics", "Audience Mapping", "Digital Growth"],
    },
    {
      id: "automation",
      icon: Zap,
      title: "Smart Automation",
      description: "Streamline your marketing with intelligent automation systems.",
      explanation: "Deploy self-optimizing automation networks that continuously learn and adapt, maximizing efficiency across all your digital touchpoints.",
      basePoints: 350,
      features: ["Smart Workflows", "Multi-channel Analytics", "Self-Optimization", "Performance Tracking", "System Integration"],
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
    },
    {
      title: "Speed Comparer",
      description: "Built a comprehensive media empire spanning 200K+ YouTube subscribers through strategic content creation and audience engagement.",
      image: "/untitled-design-mbkvnaem.png",
      technologies: ["Video Production", "Design Suite", "E-commerce"],
      features: ["Content Strategy", "Professional Production", "Performance Analytics"],
      link: "https://www.youtube.com/speedcomparer",
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
      
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="text-black" size={16} />
                <span className="text-sm font-medium text-black">
                  {userPoints} Points
                </span>
              </div>
              <div className="flex-1 max-w-xs mx-4">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              {hasReachedGoal ? (
                <Badge className="bg-black text-white border-0">
                  <Gift className="mr-1" size={12} />
                  Bonus Unlocked
                </Badge>
              ) : (
                <span className="text-gray-600 text-sm hidden sm:inline">
                  {1000 - userPoints} to unlock bonus
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="relative px-4 py-20 md:py-32 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-[80%] mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                  <div className="space-y-4 lg:space-y-6">
                    <Badge className="bg-black text-white border-0">
                      <Cpu className="mr-2" size={14} />
                      Advanced Digital Architect
                    </Badge>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-black">
                      Transform Digital Excellence
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Engineer cutting-edge digital experiences that push beyond conventional boundaries. 
                      Where innovation meets execution, and possibilities become reality.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Button 
                      size="lg"
                      onClick={() => scrollToSection("services")}
                      className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                    >
                      <Rocket className="mr-2" size={20} />
                      Start Your Journey
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => scrollToSection("portfolio")}
                      className="w-full sm:w-auto border-black text-black hover:bg-gray-50"
                    >
                      View Portfolio
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end">
                  <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border border-gray-200">
                    <Image 
                      src="/vince-mbggi03h.jpeg" 
                      alt="Vince - Advanced Digital Architect"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Featured Portfolio
                </h2>
                <p className="text-xl text-gray-600">
                  Witness the convergence of advanced engineering and digital innovation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {portfolioProjects.map((project, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black text-white border-0">
                          {index === 0 ? <Gauge className="mr-1" size={12} /> : <Code className="mr-1" size={12} />}
                          {index === 0 ? "High Performance" : "Advanced Architecture"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="bg-white/90 border-white text-black hover:bg-white">
                            <ExternalLink size={16} />
                          </Button>
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-black">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-black">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="text-black flex-shrink-0" size={14} />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-black">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} className="bg-gray-100 text-black border-gray-200">
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
            <div className="max-w-[80%] mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                  Service Portfolio
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Select your services and build your project package
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service) => {
                  const Icon = service.icon
                  const selectedCount = selectedServices[service.id] || 0
                  
                  return (
                    <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                          <Icon className="text-black" size={32} />
                        </div>
                        
                        <div className="space-y-3">
                          <Badge className="bg-black text-white border-0 text-xs">
                            +{service.basePoints} Points
                          </Badge>
                          <h3 className="text-xl md:text-2xl font-bold text-black">{service.title}</h3>
                          <p className="text-sm md:text-base text-gray-600">{service.description}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <p className="text-xs md:text-sm text-gray-600">{service.explanation}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-black text-sm md:text-base">Core Capabilities:</h4>
                          <div className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="text-black flex-shrink-0" size={12} />
                                <span className="text-xs md:text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          {selectedCount === 0 ? (
                            <Button
                              onClick={() => addService(service.id, service.basePoints)}
                              className="w-full bg-black text-white hover:bg-gray-800"
                            >
                              Add Service
                            </Button>
                          ) : (
                            <Button
                              variant="destructive"
                              onClick={() => removeService(service.id, service.basePoints)}
                              className="w-full"
                            >
                              Remove Service
                            </Button>
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
          <section className="px-4 py-20 relative bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-[80%] mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12">
                <div className="text-center space-y-6 mb-8">
                  <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <Package className="text-black" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-black">Project Package</h2>
                  <p className="text-gray-600">Review your selected services and start your project</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-black">Selected Services:</h4>
                    <div className="space-y-3">
                      {services.map((service) => {
                        const count = selectedServices[service.id] || 0
                        if (count === 0) return null
                        return (
                          <div key={service.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-gray-600">{service.title}</span>
                            <span className="font-semibold text-black">{count * service.basePoints} pts</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-black">Total Points:</span>
                        <span className="text-2xl font-bold text-black">{userPoints}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Services:</span>
                        <span className="text-black">{getTotalServices()}</span>
                      </div>
                    </div>
                    
                    {hasReachedGoal && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3 text-green-800">
                          <Gift size={24} />
                          <div>
                            <div className="font-semibold">Bonus Package Unlocked!</div>
                            <div className="text-sm text-green-600">Additional value included</div>
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
                      <Button 
                        size="lg"
                        className="w-full bg-black text-white hover:bg-gray-800"
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
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white border-gray-200">
                      <DialogHeader>
                        <DialogTitle className="text-black">Project Inquiry</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Enter your contact details to receive project specifications
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="email" className="text-black">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="marketing"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <Label htmlFor="marketing" className="text-sm text-gray-600">
                            Subscribe to project updates and insights
                          </Label>
                        </div>
                        <Button 
                          onClick={() => {
                            handleSubmitClick();
                          }}
                          className="w-full bg-black text-white hover:bg-gray-800"
                          disabled={!userEmail || getTotalServices() === 0}
                        >
                          Submit Inquiry
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-4 bg-white border border-green-200 p-4 rounded-lg shadow-md z-50">
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircle size={24} />
              <span className="font-semibold">Project inquiry submitted successfully!</span>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Track Record
                </h2>
                <p className="text-xl text-gray-600">
                  Delivering exceptional results across diverse digital projects
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Award size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">50+ Projects</h3>
                  <p className="text-gray-600">Successfully delivered across multiple industries</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <TrendingUp size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">300% Avg ROI</h3>
                  <p className="text-gray-600">Measurable returns on digital investments</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Target size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">100% Satisfaction</h3>
                  <p className="text-gray-600">Committed to exceeding client expectations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-black">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-600">
                  Ready to transform your digital presence? Let's discuss your project.
                </p>
                
                <Button variant="outline" size="lg" className="border-black text-black hover:bg-gray-50">
                  <Mail className="mr-2" size={20} />
                  vincent@vincialmedia.com
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 relative border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[80%] mx-auto text-center">
              <h3 className="text-3xl font-bold text-black mb-4">Vincialmedia</h3>
              <p className="text-gray-600 mb-6">Advanced Digital Architecture • Performance Engineering • Strategic Innovation</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Badge className="bg-gray-100 text-black border-gray-200">Advanced Web Design</Badge>
                <Badge className="bg-gray-100 text-black border-gray-200">Smart Automation</Badge>
                <Badge className="bg-gray-100 text-black border-gray-200">Digital Strategy</Badge>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
