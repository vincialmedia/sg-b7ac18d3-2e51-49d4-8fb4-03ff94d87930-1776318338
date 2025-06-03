
import React, { useState, useEffect } from "react"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Target
} from "lucide-react"

export default function Home() {
  const [skillProgress, setSkillProgress] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [experiencePoints, setExperiencePoints] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setSkillProgress(95), 500)
    const xpTimer = setTimeout(() => setExperiencePoints(2847), 800)
    return () => {
      clearTimeout(timer)
      clearTimeout(xpTimer)
    }
  }, [])

  const services = [
    {
      icon: Globe,
      title: "Website Development",
      description: "Custom websites that convert visitors into customers",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First"],
      level: "Expert",
      xp: 950
    },
    {
      icon: Zap,
      title: "Marketing Automation",
      description: "Streamline your marketing with intelligent automation",
      features: ["Email Campaigns", "Lead Nurturing", "Analytics", "CRM Integration"],
      level: "Advanced",
      xp: 875
    },
    {
      icon: Users,
      title: "Social Media",
      description: "Build your brand presence across all platforms",
      features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics"],
      level: "Expert",
      xp: 920
    }
  ]

  const achievements = [
    { icon: Award, title: "50+ Projects Completed", description: "Delivered excellence" },
    { icon: TrendingUp, title: "300% Average ROI", description: "Proven results" },
    { icon: Target, title: "98% Client Satisfaction", description: "Happy customers" }
  ]

  return (
    <>
      <Head>
        <title>Vincialmedia - Digital Marketing & Web Development Expert</title>
        <meta name="description" content="Professional website development, marketing automation, and social media services. Transform your digital presence with Vincialmedia." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="text-blue-600 bg-blue-100">
                    Level {Math.floor(experiencePoints / 100)} Digital Expert
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                    Transform Your
                    <span className="text-blue-600 block">Digital Presence</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    I help businesses grow through strategic web development, marketing automation, and social media excellence.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="text-yellow-500 fill-current" size={20} />
                    <span className="text-slate-700">Experience Points: {experiencePoints.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Overall Expertise</span>
                      <span className="text-slate-900 font-semibold">{skillProgress}%</span>
                    </div>
                    <Progress value={skillProgress} className="h-3" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Your Project
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button variant="outline" size="lg">
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

        {/* Services Section */}
        <section className="px-4 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Choose Your Power-Up
              </h2>
              <p className="text-xl text-slate-600">
                Select the service that will level up your business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                const isActive = activeService === index
                
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      isActive ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                    onClick={() => setActiveService(index)}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="text-blue-600" size={32} />
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {service.level}
                        </Badge>
                        <span className="text-sm text-slate-500">{service.xp} XP</span>
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                            <span className="text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6" variant={isActive ? "default" : "outline"}>
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="px-4 py-16 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Achievement Unlocked
              </h2>
              <p className="text-xl text-slate-300">
                Proven track record of delivering exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-slate-300">{achievement.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Level Up Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can transform your digital presence and drive real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
                <Mail className="mr-2" size={20} />
                Get In Touch
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
              <Badge variant="secondary">Web Development</Badge>
              <Badge variant="secondary">Marketing Automation</Badge>
              <Badge variant="secondary">Social Media</Badge>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
