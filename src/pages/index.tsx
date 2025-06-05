import React, { useState, useEffect, useRef } from "react"
import Head from "next/head"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TextAvoidance from "@/components/TextAvoidance"
import { 
  Globe, 
  Zap, 
  Users, 
  Star, 
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
  Gauge
} from "lucide-react"

export default function Home() {
  const [userPoints, setUserPoints] = useState(0)
  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({})
  const [userEmail, setUserEmail] = useState("")
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [globalMousePosition, setGlobalMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlobalMousePosition({ x: e.clientX, y: e.clientY })
      
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        setMousePosition({
          x: (e.clientX - centerX) / 20,
          y: (e.clientY - centerY) / 20
        })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getAvoidanceTransform = (elementRef: React.RefObject<HTMLElement>, intensity: number = 30) => {
    if (!elementRef.current) return ""
    
    const rect = elementRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(globalMousePosition.x - centerX, 2) + 
      Math.pow(globalMousePosition.y - centerY, 2)
    )
    
    if (distance < 150) {
      const angle = Math.atan2(centerY - globalMousePosition.y, centerX - globalMousePosition.x)
      const force = Math.max(0, (150 - distance) / 150)
      const moveX = Math.cos(angle) * force * intensity
      const moveY = Math.sin(angle) * force * intensity
      
      return `translate(${moveX}px, ${moveY}px)`
    }
    
    return ""
  }

  const MouseAvoidanceWrapper = ({ children, intensity = 30, className = "" }: { 
    children: React.ReactNode, 
    intensity?: number, 
    className?: string 
  }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState("")

    useEffect(() => {
      const updateTransform = () => {
        setTransform(getAvoidanceTransform(ref, intensity))
      }
      updateTransform()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intensity])

    return (
      <div 
        ref={ref} 
        className={`transition-transform duration-300 ease-out ${className}`}
        style={{ transform }}
      >
        {children}
      </div>
    )
  }

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
      title: "Website Design",
      description: "Professional websites that convert visitors into customers and drive business growth.",
      explanation: "Get a custom-built website with modern design, mobile responsiveness, SEO optimization, and fast loading speeds. Perfect for establishing your online presence.",
      basePoints: 400,
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First", "Custom Design"]
    },
    {
      id: "social",
      icon: Users,
      title: "Social Media",
      description: "Strategic social media management to build your brand and engage your audience.",
      explanation: "Complete social media strategy including content creation, community management, paid advertising, and analytics to grow your following and engagement.",
      basePoints: 300,
      features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics", "Brand Building"]
    },
    {
      id: "automation",
      icon: Zap,
      title: "Marketing Automation",
      description: "Streamline your marketing with intelligent automation systems and workflows.",
      explanation: "Set up automated email campaigns, lead nurturing sequences, CRM integration, and analytics to convert more leads into customers while saving time.",
      basePoints: 350,
      features: ["Email Campaigns", "Lead Nurturing", "CRM Integration", "Analytics", "Workflow Automation"]
    }
  ]

  const portfolioProjects = [
    {
      title: "Speed Comparer",
      description: "A comprehensive speed testing and comparison platform that helps users analyze and optimize their internet connection performance.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "WebRTC", "Chart.js"],
      features: ["Real-time Speed Testing", "ISP Comparison", "Historical Data", "Performance Analytics"],
      link: "#"
    },
    {
      title: "Allemann Performance",
      description: "High-performance automotive website showcasing premium vehicle modifications and performance upgrades with stunning visual design.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      features: ["Interactive Gallery", "Performance Calculator", "Booking System", "Mobile Optimized"],
      link: "#"
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

  const handleSubmit = () => {
    if (userEmail && getTotalServices() > 0) {
      // In a real app, this would send an email to vincent@vincialmedia.com
      console.log("Sending email to vincent@vincialmedia.com with package details:", {
        email: userEmail,
        services: selectedServices,
        points: userPoints,
        marketingConsent
      })
      setShowEmailDialog(false)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  const progressPercentage = Math.min((userPoints / 1000) * 100, 100)
  const hasReachedGoal = userPoints >= 1000

  return (
    <>
     <Head>
        <title>Vincialmedia - Digital Marketing & Web Development Expert</title>
        <meta
          name="description"
          content="Professional website development, marketing automation, and social media services. Transform your digital presence with Vincialmedia."
        />
        <link rel="icon" href="/favicon.ico" />

        {/* HubSpot Script */}
        <Script
          id="hubspot-script"
          src="//js-eu1.hs-scripts.com/146320474.js"
          type="text/javascript"
          async
          defer
        />

        {/* Cookiebot Script */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="093175ce-ab1b-45f1-b766-f12aa6311a07"
          type="text/javascript"
          strategy="beforeInteractive"
        />
      </Head>
    
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden w-full">
        {/* Always Sticky Animated Progress Bar - Inside Main Container */}
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200 w-full transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-2 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Star className="text-yellow-500 fill-current" size={12} />
                <span className="text-xs font-medium text-slate-900">
                  {userPoints} points
                </span>
              </div>
              <div className="flex-1 max-w-[150px] mx-2 sm:mx-4">
                <div className="relative h-1 w-full">
                  <Progress value={progressPercentage} className="h-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full"></div>
                </div>
              </div>
              {hasReachedGoal ? (
                <Badge className="bg-green-100 text-green-800 border-green-300 text-xs py-0 px-2 h-4 flex-shrink-0">
                  <Gift className="mr-1" size={8} />
                  Gift Unlocked
                </Badge>
              ) : (
                <span className="text-slate-500 text-[10px] flex-shrink-0">
                  {1000 - userPoints} more to unlock gift
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="text-blue-600 bg-blue-100">
                    Digital Marketing Expert
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                    <TextAvoidance 
                      text="Transform Your" 
                      tag="span"
                      className="block"
                      mousePosition={globalMousePosition} 
                      intensity={8}
                    />
                    <TextAvoidance 
                      text="Digital Presence" 
                      tag="span"
                      className="block text-blue-600"
                      mousePosition={globalMousePosition} 
                      intensity={8}
                    />
                  </h1>
                  <TextAvoidance 
                    text="I help businesses grow through strategic web development, marketing automation, and social media excellence."
                    tag="p"
                    className="text-xl text-slate-600 leading-relaxed whitespace-pre-wrap break-words"
                    mousePosition={globalMousePosition} 
                    intensity={5}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 hover:text-black hover:font-bold transition-all duration-200"
                    onClick={() => scrollToSection("build-package")}
                  >
                    Start Building Your Package
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="text-black hover:bg-white hover:text-black hover:font-bold transition-all duration-200"
                    onClick={() => scrollToSection("portfolio")}
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div 
                  ref={imageRef}
                  className="relative z-10 mx-auto w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateY(${Math.sin(Date.now() / 1000) * 5}px)`,
                    animation: "float 6s ease-in-out infinite"
                  }}
                  onMouseEnter={() => {
                    if (imageRef.current) {
                      imageRef.current.style.transform += " scale(1.05)"
                    }
                  }}
                  onMouseLeave={() => {
                    if (imageRef.current) {
                      imageRef.current.style.transform = imageRef.current.style.transform.replace(" scale(1.05)", "")
                    }
                  }}
                >
                  <img 
                    src="/vince-mbggi03h.jpeg" 
                    alt="Vince - Vincialmedia Founder"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 scale-110 animate-pulse"></div>
                
                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="absolute top-20 right-16 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-16 left-20 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "2s" }}></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }}></div>
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                  <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transform -translate-x-1/2 translate-y-2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Points Progress Section - Remove this since it's now always sticky */}

        {/* Portfolio Section */}
        <section id="portfolio" className="px-4 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <TextAvoidance 
                text="Featured Portfolio"
                tag="h2"
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                mousePosition={globalMousePosition} 
                intensity={6}
              />
              <TextAvoidance 
                text="Recent projects showcasing our expertise and results"
                tag="p"
                className="text-xl text-slate-600"
                mousePosition={globalMousePosition} 
                intensity={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolioProjects.map((project, index) => (
                <MouseAvoidanceWrapper key={index} intensity={35}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">
                          {index === 0 ? <Gauge className="mr-1" size={12} /> : <Code className="mr-1" size={12} />}
                          {index === 0 ? "Performance" : "Automotive"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={16} />
                        </Button>
                      </div>
                      <CardDescription className="text-base whitespace-pre-wrap break-words">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="text-green-500 flex-shrink-0" size={12} />
                              <span className="text-sm text-slate-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MouseAvoidanceWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Services Selection Section */}
        <section id="build-package" className="px-4 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <TextAvoidance 
                text="Build Your Custom Package"
                tag="h2"
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                mousePosition={globalMousePosition} 
                intensity={6}
              />
              <TextAvoidance 
                text="Select the services you need and earn points towards your surprise gift"
                tag="p"
                className="text-xl text-slate-600"
                mousePosition={globalMousePosition} 
                intensity={4}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon
                const selectedCount = selectedServices[service.id] || 0
                
                return (
                  <Card key={service.id} className="transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="text-blue-600" size={32} />
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          +{service.basePoints} Points
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">{service.explanation}</p>
                      </div>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-center pt-4">
                        {selectedCount === 0 ? (
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white hover:text-black hover:font-bold transition-all duration-200"
                            onClick={() => addService(service.id, service.basePoints)}
                          >
                            Add to order
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            className="hover:text-black hover:font-bold transition-all duration-200"
                            onClick={() => removeService(service.id, service.basePoints)}
                          >
                            Remove from order
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Package Summary Section */}
        {getTotalServices() > 0 && (
          <section className="px-4 py-16 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="text-blue-600" size={32} />
                  </div>
                  <CardTitle className="text-2xl">Your Package Summary</CardTitle>
                  <CardDescription>
                    Review your selected services and submit to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Selected Services:</h4>
                      <ul className="space-y-2">
                        {services.map((service) => {
                          const count = selectedServices[service.id] || 0
                          if (count === 0) return null
                          return (
                            <li key={service.id} className="flex justify-between">
                              <span>{service.title} x{count}</span>
                              <span className="font-semibold">{count * service.basePoints} pts</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">Total Points:</span>
                          <span className="text-xl font-bold text-blue-600">{userPoints}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Services:</span>
                          <span>{getTotalServices()}</span>
                        </div>
                      </div>
                      {hasReachedGoal && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800">
                            <Gift size={20} />
                            <span className="font-semibold">Surprise Gift Unlocked!</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            You'll receive a special discount or bonus with your package!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 hover:text-black hover:font-bold transition-all duration-200">
                        Submit Package Request
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Your Package Request</DialogTitle>
                        <DialogDescription>
                          Enter your email to receive a detailed proposal for your selected services.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="marketing"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <Label htmlFor="marketing" className="text-sm text-gray-600">
                            I agree to be contacted for marketing purposes
                          </Label>
                        </div>
                        <Button 
                          onClick={handleSubmit} 
                          className="w-full hover:text-black hover:font-bold transition-all duration-200"
                          disabled={!userEmail || getTotalServices() === 0}
                        >
                          Send Package Details
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Package request sent successfully!</span>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="px-4 py-16 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Vincialmedia
              </h2>
              <p className="text-xl text-slate-300">
                Proven track record of delivering exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">50+ Projects Completed</h3>
                <p className="text-slate-300">Delivered excellence across industries</p>
              </div>
              <div className="text-center group">
                <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">300% Average ROI</h3>
                <p className="text-slate-300">Proven results that drive growth</p>
              </div>
              <div className="text-center group">
                <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">98% Client Satisfaction</h3>
                <p className="text-slate-300">Happy customers, lasting relationships</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Have questions or want to discuss your project? Let's connect!
            </p>
            
            <div className="flex justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100 hover:text-black hover:font-bold transition-all duration-200">
                <Mail className="mr-2" size={20} />
                vincent@vincialmedia.com
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Vincialmedia</h3>
            <p className="text-slate-400 mb-4">Transforming businesses through digital excellence</p>
            <div className="flex justify-center gap-2">
              <Badge variant="secondary">Website Design</Badge>
              <Badge variant="secondary">Marketing Automation</Badge>
              <Badge variant="secondary">Social Media</Badge>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
