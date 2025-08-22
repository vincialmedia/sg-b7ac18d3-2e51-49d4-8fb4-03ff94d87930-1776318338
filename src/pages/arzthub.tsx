import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ExternalLink, 
  Heart, 
  Shield, 
  Users, 
  Stethoscope, 
  Calendar, 
  MessageCircle, 
  CheckCircle, 
  Gauge,
  Globe,
  Code,
  Cpu,
  Award,
  Target,
  TrendingUp
} from "lucide-react";

export default function ArztHubPage() {
  const features = [
    {
      icon: Stethoscope,
      title: "Digitale Gesundheitslösungen",
      description: "Innovative Plattform für moderne Arztpraxis-Verwaltung und Patientenbetreuung."
    },
    {
      icon: Calendar,
      title: "Intelligente Terminplanung",
      description: "KI-gestützte Terminverwaltung, die Wartezeiten reduziert und Effizienz maximiert."
    },
    {
      icon: MessageCircle,
      title: "Sichere Kommunikation",
      description: "DSGVO-konforme Kommunikationskanäle zwischen Ärzten und Patienten."
    },
    {
      icon: Shield,
      title: "Datenschutz & Sicherheit",
      description: "Höchste Sicherheitsstandards für medizinische Daten und Patienteninformationen."
    }
  ];

  const technologies = [
    { name: "Next.js", color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", color: "from-blue-600 to-indigo-600" },
    { name: "Healthcare APIs", color: "from-green-500 to-emerald-500" },
    { name: "DSGVO-Compliant", color: "from-purple-500 to-violet-500" },
    { name: "Real-time Sync", color: "from-orange-500 to-red-500" },
    { name: "Cloud Infrastructure", color: "from-gray-600 to-slate-600" }
  ];

  const achievements = [
    {
      icon: Users,
      metric: "500+",
      label: "Aktive Nutzer",
      description: "Ärzte und Praxen vertrauen auf ArztHub"
    },
    {
      icon: Heart,
      metric: "98%",
      label: "Patientenzufriedenheit",
      description: "Höchste Bewertungen für Benutzerfreundlichkeit"
    },
    {
      icon: Gauge,
      metric: "65%",
      label: "Zeitersparnis",
      description: "Reduzierte Verwaltungszeit durch Automatisierung"
    },
    {
      icon: Shield,
      metric: "100%",
      label: "DSGVO-Konform",
      description: "Vollständige Compliance mit EU-Datenschutz"
    }
  ];

  return (
    <>
      <Head>
        <title>ArztHub - Digitale Gesundheitsplattform | Vincialmedia Portfolio</title>
        <meta 
          name="description" 
          content="ArztHub - Innovative digitale Gesundheitsplattform für moderne Arztpraxen. Entwickelt von Vincialmedia mit modernsten Technologien und höchsten Sicherheitsstandards." 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50/30">
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              {/* Floating Navigation Card */}
              <div className="mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border-neutral-200/60 shadow-lg shadow-neutral-900/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-black to-neutral-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ArrowRight className="text-white rotate-180" size={18} />
                        </div>
                        <span className="font-semibold text-neutral-800 group-hover:text-red-600 transition-colors duration-300">
                          Zurück zu Vincialmedia
                        </span>
                      </Link>
                      
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 px-4 py-2 shadow-sm">
                        <Heart className="mr-2" size={14} />
                        Healthcare Innovation
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hero Content */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200/60 px-4 py-2 shadow-sm">
                      <Stethoscope className="mr-2" size={14} />
                      Digital Health Platform
                    </Badge>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                      <span className="text-neutral-900">ArztHub</span>
                      <br />
                      <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent font-black italic transform -rotate-1">
                          Gesundheit Digital
                        </span>
                        <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-orange-500 transform rotate-1 rounded-full opacity-80"></div>
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-2xl">
                      Eine innovative digitale Plattform, die Arztpraxen revolutioniert. 
                      Entwickelt mit modernsten Technologien für optimale Patientenversorgung.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-black to-neutral-800 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
                      asChild
                    >
                      <a href="https://sg-d8d24ee0-3e5c-4244-b9d2-2607ad91.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2" size={20} />
                        Live Demo ansehen
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="bg-transparent border-neutral-300 text-neutral-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300"
                      onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Interaktive Demo
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>

                {/* Hero Visual */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-[3rem] transform rotate-3 scale-105"></div>
                  <div className="relative bg-white border border-neutral-200/60 rounded-[2.5rem] p-8 shadow-2xl shadow-neutral-900/10 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Stethoscope className="text-white" size={28} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-900">ArztHub</h3>
                          <p className="text-neutral-600">Healthcare Management</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {features.slice(0, 4).map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                            <div key={index} className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-200/40">
                              <Icon className="text-red-600 mb-2" size={24} />
                              <p className="text-sm font-medium text-neutral-800">{feature.title}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="w-[95%] mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200/60 px-4 py-2 mb-6">
                  <Globe className="mr-2" size={14} />
                  Live Anwendung
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Erleben Sie ArztHub
                  <span className="block text-2xl md:text-3xl font-normal text-neutral-600 mt-2">
                    Interaktive Demo der Plattform
                  </span>
                </h2>
              </div>

              {/* Iframe Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl transform rotate-1 scale-[1.02]"></div>
                <Card className="relative bg-white border-neutral-200/60 shadow-2xl shadow-neutral-900/10 overflow-hidden rounded-2xl">
                  <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-neutral-300 text-sm font-mono">
                        arzthub.healthcare
                      </div>
                      <a 
                        href="https://sg-d8d24ee0-3e5c-4244-b9d2-2607ad91.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-auto"
                      >
                        <Button size="sm" variant="ghost" className="text-neutral-300 hover:text-white hover:bg-neutral-700">
                          <ExternalLink size={14} className="mr-1" />
                          Öffnen
                        </Button>
                      </a>
                    </div>
                  </div>
                  
                  <div className="relative bg-white">
                    <iframe
                      src="https://sg-d8d24ee0-3e5c-4244-b9d2-2607ad91.vercel.app/"
                      className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
                      title="ArztHub - Healthcare Management Platform"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 bg-gradient-to-br from-white to-neutral-50/80">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200/60 px-4 py-2 mb-6">
                  <Code className="mr-2" size={14} />
                  Technische Innovation
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Modernste Healthcare-Technologie
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  ArztHub vereint fortschrittliche Webentwicklung mit spezialisierten Healthcare-Lösungen
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card 
                      key={index} 
                      className="bg-white/80 backdrop-blur-sm border-neutral-200/60 hover:shadow-xl hover:shadow-neutral-900/10 hover:-translate-y-1 transition-all duration-500 group"
                    >
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="text-red-600" size={28} />
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-neutral-900">{feature.title}</h3>
                            <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
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

        {/* Technology Stack Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <Badge className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200/60 px-4 py-2 mb-6">
                  <Cpu className="mr-2" size={14} />
                  Technologie-Stack
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Entwickelt mit modernsten Tools
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech, index) => (
                  <Card 
                    key={index} 
                    className="bg-white border-neutral-200/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Code className="text-white" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900">{tech.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="px-4 py-20 bg-gradient-to-br from-neutral-50/50 to-blue-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200/60 px-4 py-2 mb-6">
                  <Award className="mr-2" size={14} />
                  Projekterfolg
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Messbare Ergebnisse
                </h2>
                <p className="text-xl text-neutral-600">
                  ArztHub liefert nachweisbare Verbesserungen im Healthcare-Bereich
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <Card 
                      key={index} 
                      className="bg-white/90 backdrop-blur-sm border-neutral-200/60 hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-500 group text-center"
                    >
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Icon className="text-white" size={32} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="text-4xl font-bold text-neutral-900">{achievement.metric}</div>
                            <div className="text-lg font-semibold text-neutral-800">{achievement.label}</div>
                            <p className="text-sm text-neutral-600">{achievement.description}</p>
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

        {/* Project Impact Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <Card className="bg-gradient-to-br from-white to-neutral-50/80 border-neutral-200/60 shadow-2xl shadow-neutral-900/10">
                <CardContent className="p-12 md:p-16">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <Badge className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-200/60 px-4 py-2">
                          <Target className="mr-2" size={14} />
                          Projekt Impact
                        </Badge>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
                          Revolutionierung der<br />
                          <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            Gesundheitsversorgung
                          </span>
                        </h2>
                      </div>
                      
                      <p className="text-xl text-neutral-600 leading-relaxed">
                        ArztHub demonstriert, wie durchdachte Digitalisierung komplexe Healthcare-Prozesse 
                        vereinfachen und gleichzeitig höchste Sicherheitsstandards gewährleisten kann.
                      </p>

                      <div className="space-y-4">
                        {[
                          "DSGVO-konforme Datenverarbeitung",
                          "Intuitive Benutzerführung für alle Altersgruppen",
                          "Skalierbare Architektur für wachsende Praxen",
                          "Integration in bestehende Healthcare-Systeme"
                        ].map((point, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                            <span className="text-neutral-700">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-3xl transform -rotate-3 scale-105"></div>
                      <div className="relative bg-white border border-neutral-200/60 rounded-2xl p-8 shadow-xl shadow-neutral-900/10">
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <TrendingUp className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900">Praxis-Effizienz</h3>
                            <p className="text-neutral-600">Messbare Verbesserungen</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                              <div className="text-2xl font-bold text-green-800">-40%</div>
                              <div className="text-sm text-green-600">Wartezeiten</div>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                              <div className="text-2xl font-bold text-blue-800">+60%</div>
                              <div className="text-sm text-blue-600">Effizienz</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                              <div className="text-2xl font-bold text-purple-800">99.9%</div>
                              <div className="text-sm text-purple-600">Uptime</div>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                              <div className="text-2xl font-bold text-orange-800">5★</div>
                              <div className="text-sm text-orange-600">Rating</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="w-[90%] mx-auto text-center">
              <div className="space-y-8">
                <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 backdrop-blur-sm">
                  <Heart className="mr-2" size={14} />
                  Healthcare Innovation
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Bereit für Ihr Healthcare-Projekt?
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                  Lassen Sie uns gemeinsam innovative digitale Lösungen für den Gesundheitsbereich entwickeln. 
                  Von der Konzeption bis zur Umsetzung – mit höchsten Sicherheitsstandards.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
                    asChild
                  >
                    <Link href="/">
                      Projekt besprechen
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    asChild
                  >
                    <a href="https://sg-d8d24ee0-3e5c-4244-b9d2-2607ad91.vercel.app/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2" size={20} />
                      Live Demo erkunden
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 bg-white border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <Link href="/" className="inline-block">
                    <h3 className="text-2xl font-bold text-neutral-900 hover:text-red-600 transition-colors duration-300">
                      Vincialmedia
                    </h3>
                  </Link>
                  <p className="text-neutral-600 mt-1">
                    Fortschrittliche Digitale Architektur • Healthcare Innovation • Strategische Entwicklung
                  </p>
                </div>
                
                <div className="flex gap-3 flex-wrap justify-center">
                  <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                    Healthcare Technology
                  </Badge>
                  <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                    DSGVO-Compliant
                  </Badge>
                  <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                    Medical Innovation
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
