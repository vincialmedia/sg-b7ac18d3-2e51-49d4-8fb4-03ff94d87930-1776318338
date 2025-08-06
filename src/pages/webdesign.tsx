import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Zap, Brain, Gauge, Search, Smartphone, Shield, TrendingUp, CheckCircle, ArrowRight, Mail, Code, Cpu, Rocket, Target, Award } from "lucide-react";

export default function WebdesignPage() {
  const features = [
    {
      icon: Gauge,
      title: "Blitzgeschwindigkeit",
      description: "Optimierte Ladezeiten unter 2 Sekunden für bessere Benutzererfahrung und höhere Conversion-Raten.",
      details: ["Core Web Vitals Optimierung", "CDN-Integration", "Bildkomprimierung", "Code-Splitting"]
    },
    {
      icon: Search,
      title: "Intelligente SEO",
      description: "KI-gestützte Suchmaschinenoptimierung, die sich automatisch an Google-Updates anpasst.",
      details: ["Technisches SEO", "Content-Optimierung", "Schema Markup", "Performance-Monitoring"]
    },
    {
      icon: Brain,
      title: "Adaptive UX",
      description: "Benutzererfahrungen, die sich an das Verhalten und die Präferenzen Ihrer Besucher anpassen.",
      details: ["A/B Testing", "Personalisierung", "Responsive Design", "Accessibility Standards"]
    },
    {
      icon: TrendingUp,
      title: "KI-Analytik",
      description: "Intelligente Datenanalyse zur kontinuierlichen Verbesserung Ihrer Website-Performance.",
      details: ["Conversion Tracking", "Heatmap-Analyse", "User Journey Mapping", "Predictive Analytics"]
    },
    {
      icon: Cpu,
      title: "Modernes Design",
      description: "Zeitgemäße, professionelle Designs, die Ihre Marke optimal präsentieren.",
      details: ["Corporate Design", "Mobile-First Approach", "Barrierefreiheit", "Brand Consistency"]
    }
  ];

  const technologies = [
    { name: "Next.js", description: "React-Framework für blitzschnelle Websites" },
    { name: "TypeScript", description: "Typisierte Programmierung für fehlerfreien Code" },
    { name: "Tailwind CSS", description: "Utility-First CSS für konsistentes Design" },
    { name: "Headless CMS", description: "Flexible Content-Management-Systeme" },
    { name: "Cloud Infrastructure", description: "Skalierbare Server-Architektur" },
    { name: "AI Integration", description: "KI-gestützte Funktionalitäten" }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Höhere Conversion-Raten",
      description: "Durch optimierte User Experience und intelligente Führung der Besucher zu gewünschten Aktionen."
    },
    {
      icon: Gauge,
      title: "Bessere Performance",
      description: "Schnelle Ladezeiten und optimierte Core Web Vitals für besseres Google-Ranking."
    },
    {
      icon: Shield,
      title: "Zukunftssicher",
      description: "Moderne Technologien und Architekturen, die auch in Jahren noch relevant sind."
    },
    {
      icon: Award,
      title: "Professioneller Eindruck",
      description: "Hochwertige Designs, die Vertrauen schaffen und Ihre Marke stärken."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Analyse & Strategie",
      description: "Umfassende Analyse Ihrer Anforderungen und Entwicklung einer maßgeschneiderten Webdesign-Strategie."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Erstellung von Wireframes und High-Fidelity-Designs mit Fokus auf User Experience."
    },
    {
      step: "03",
      title: "Entwicklung & Integration",
      description: "Programmierung mit modernsten Technologien und Integration aller gewünschten Funktionalitäten."
    },
    {
      step: "04",
      title: "Testing & Optimierung",
      description: "Umfassende Tests, Performance-Optimierung und finale Anpassungen vor dem Go-Live."
    },
    {
      step: "05",
      title: "Launch & Support",
      description: "Erfolgreicher Website-Launch mit kontinuierlichem Support und Monitoring."
    }
  ];

  return (
    <>
      <Head>
        <title>Fortschrittliches Webdesign - Vincialmedia</title>
        <meta name="description" content="KI-gestützte Websites mit blitzschnellen Ladezeiten, intelligenter SEO-Optimierung und adaptiven Benutzererfahrungen, die aus dem Besucherverhalten lernen." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="text-center space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-black text-white border-0 inline-flex items-center hover:bg-red-600 transition-colors duration-300">
                    <Globe className="mr-2" size={14} />
                    Fortschrittliches Webdesign
                  </Badge>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
                    KI-gestützte<br />
                    <span className="relative inline-block">
                      <span className="text-red-600 italic transform -rotate-1 inline-block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent font-black">
                        Web-Architektur
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-700 transform rotate-1 rounded-full"></div>
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                    Nächste Generation von Web-Architektur mit blitzschnellen Ladezeiten, intelligenter SEO-Optimierung und adaptiven Benutzererfahrungen, die aus dem Besucherverhalten lernen.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-black text-white hover:bg-red-600 inline-flex items-center">
                    <Rocket className="mr-2" size={20} />
                    Projekt starten
                  </Button>
                  
                  <Link href="/">
                    <Button variant="outline" size="lg" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center">
                      Zurück zur Hauptseite
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto text-center">
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                      <Globe className="text-black" size={32} />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-black">Fortschrittliches Webdesign</h3>
                      <Badge className="bg-black text-white border-0 text-2xl px-6 py-3 inline-flex items-center">
                        Ab CHF 500.-
                      </Badge>
                      <p className="text-gray-600">KI-gestützte Websites, die sich an Ihre Geschäftsanforderungen anpassen und weiterentwickeln.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Kernkompetenzen</h2>
                <p className="text-xl text-gray-600">Innovative Technologien für außergewöhnliche Web-Erlebnisse</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="text-black" size={28} />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-black">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                          
                          <div className="space-y-2">
                            {feature.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="text-black flex-shrink-0" size={16} />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Technologie-Stack</h2>
                <p className="text-xl text-gray-600">Moderne Technologien für zukunftssichere Websites</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Code className="text-black" size={20} />
                          <h3 className="text-xl font-bold text-black">{tech.name}</h3>
                        </div>
                        <p className="text-gray-600">{tech.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ihre Vorteile</h2>
                <p className="text-xl text-gray-600">Warum fortschrittliches Webdesign Ihr Geschäft voranbringt</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="text-center space-y-6">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform duration-300">
                        <Icon className="text-black" size={32} />
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-black">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Unser Prozess</h2>
                <p className="text-xl text-gray-600">Von der Idee zur perfekten Website in 5 Schritten</p>
              </div>

              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                            {step.step}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-black">{step.title}</h3>
                          <p className="text-gray-600 text-lg">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-black">Bereit für Ihre neue Website?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Lassen Sie uns gemeinsam eine Website entwickeln, die nicht nur beeindruckt, sondern auch verkauft. 
                  Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-black text-white hover:bg-red-600 inline-flex items-center">
                    <Mail className="mr-2" size={20} />
                    Kostenlose Beratung anfragen
                  </Button>
                  
                  <Link href="/">
                    <Button variant="outline" size="lg" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center">
                      Alle Services ansehen
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 relative border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto text-center">
              <Link href="/">
                <h3 className="text-3xl font-bold text-black mb-4 hover:text-red-600 transition-colors duration-300">Vincialmedia</h3>
              </Link>
              <p className="text-gray-600 mb-6">Fortschrittliche Digitale Architektur • Performance Engineering • Strategische Innovation</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Badge className="bg-gray-100 text-black border-gray-200">Fortschrittliches Webdesign</Badge>
                <Badge className="bg-gray-100 text-black border-gray-200">Intelligente Automatisierung</Badge>
                <Badge className="bg-gray-100 text-black border-gray-200">Digitale Strategie</Badge>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
