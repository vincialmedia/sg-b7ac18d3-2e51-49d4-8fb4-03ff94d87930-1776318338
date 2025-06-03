
import React, { useState, useEffect } from "react"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Globe, 
  Zap, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Mail, 
  Phone,
  Award,
  TrendingUp,
  Target,
  Gift,
  Package,
  Plus,
  Minus,
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      description: "Professional websites that convert visitors into customers and drive business growth",
      explanation: "Get a custom-built website with modern design, mobile responsiveness, SEO optimization, and fast loading speeds. Perfect for establishing your online presence.",
      basePoints: 400,
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First", "Custom Design"]
    },
    {
      id: "social",
      icon: Users,
      title: "Social Media",
      description: "Strategic social media management to build your brand and engage your audience",
      explanation: "Complete social media strategy including content creation, community management, paid advertising, and analytics to grow your following and engagement.",
      basePoints: 300,
      features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics", "Brand Building"]
    },
    {
      id: "automation",
      icon: Zap,
      title: "Marketing Automation",
      description: "Streamline your marketing with intelligent automation systems and workflows",
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
      [serviceId]: (prev[serviceId] || 0) + 1
    }))
    setUserPoints(prev => prev + points)
  }

  const removeService = (serviceId: string, points: number) => {
    if (selectedServices[serviceId] > 0) {
      setSelectedServices(prev => ({
        ...prev,
        [serviceId]: prev[serviceId] - 1
      }))
      setUserPoints(prev => prev - points)
    }
  }

  const getTotalServices = () => {
    return Object.values(selectedServices).reduce((sum, count) => sum + count, 0)
  }

  const handleSubmit = () => {
    if (userEmail && getTotalServices() > 0) {
      // In a real app, this would send an email
      console.log("Sending email with package details:", {
        email: userEmail,
        services: selectedServices,
        points: userPoints
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
        <meta name="description" content="Professional website development, marketing automation, and social media services. Transform your digital presence with Vincialmedia." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Sticky Progress Bar */}
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" : "bg-transparent py-0"
        }`}>
          {isScrolled && (
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-semibold text-slate-900">Points: {userPoints}</span>
                </div>
                {hasReachedGoal && (
                  <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                    <Gift className="mr-1" size={12} />
                    Gift Unlocked!
                  </Badge>
                )}
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
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
                    Transform Your
                    <span className="text-blue-600 block">Digital Presence</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    I help businesses grow through strategic web development, marketing automation, and social media excellence.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => scrollToSection("build-package")}
                  >
                    Start Building Your Package
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => scrollToSection("portfolio")}
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 mx-auto w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img 
                    src="/vince-mbggi03h.jpeg" 
                    alt="Vince - Vincialmedia Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 scale-110"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Points Progress Section */}
        <section className="px-4 py-8 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Star className="text-yellow-500 fill-current" size={24} />
                <span className="text-lg font-semibold text-slate-900">Your Points: {userPoints}</span>
              </div>
              {hasReachedGoal && (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <Gift className="mr-1" size={16} />
                  Surprise Gift Unlocked!
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress to 1000 points</span>
                <span className="text-slate-900 font-semibold">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-slate-500">
                {hasReachedGoal 
                  ? "🎉 Congratulations! You've unlocked a surprise gift or discount!" 
                  : `${1000 - userPoints} more points to unlock your surprise gift!`
                }
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-4 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured Portfolio
              </h2>
              <p className="text-xl text-slate-600">
                Recent projects showcasing our expertise and results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolioProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
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
                    <CardDescription className="text-base">
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
              ))}
            </div>
          </div>
        </section>

        {/* Services Selection Section */}
        <section id="build-package" className="px-4 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Build Your Custom Package
              </h2>
              <p className="text-xl text-slate-600">
                Select the services you need and earn points towards your surprise gift
              </p>
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
                        <p className="text-sm text-slate-700">{service.explanation}</p>
                      </div>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeService(service.id, service.basePoints)}
                            disabled={selectedCount === 0}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{selectedCount}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addService(service.id, service.basePoints)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        <Badge variant="secondary">
                          {selectedCount * service.basePoints} pts
                        </Badge>
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
                      <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
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
                        <Button 
                          onClick={handleSubmit} 
                          className="w-full"
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
                <Mail className="mr-2" size={20} />
                hello@vincialmedia.com
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="mr-2" size={20} />
                Schedule Call
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
