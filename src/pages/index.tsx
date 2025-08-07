import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Globe, Zap, Users, ArrowRight, CheckCircle, Mail, Award, TrendingUp, Target, Package, ExternalLink, Code, Gauge, Cpu, Rocket } from "lucide-react";

export default function Home() {
  const [userPoints, setUserPoints] = useState(0);
  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({});
  const [userEmail, setUserEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      id: "website",
      icon: Globe,
      title: "Fortschrittliches Webdesign",
      description: "KI-gestützte Websites, die sich an Ihre Geschäftsanforderungen anpassen und weiterentwickeln.",
      explanation: "Nächste Generation von Web-Architektur mit blitzschnellen Ladezeiten, intelligenter SEO-Optimierung und adaptiven Benutzererfahrungen, die aus dem Besucherverhalten lernen.",
      basePoints: 400,
      price: "CHF 500.-",
      features: ["Blitzgeschwindigkeit", "Intelligente SEO", "Adaptive UX", "KI-Analytik", "Modernes Design"],
    },
    {
      id: "social",
      icon: Users,
      title: "Social Media",
      description: "Strategische Social Media Betreuung für nachhaltiges Wachstum und echtes Engagement.",
      explanation: "Professionelle Social Media Strategien mit datengetriebenen Inhalten, gezielter Community-Entwicklung und messbaren Ergebnissen für maximale Reichweite und Interaktion.",
      basePoints: 300,
      price: "CHF 250.-",
      features: ["Content-Strategie", "Community Management", "Performance Analytics", "Influencer Marketing", "Social Media Ads"],
    },
    {
      id: "automation",
      icon: Zap,
      title: "Marketing Automation",
      description: "Automatisieren Sie Ihre Marketing-Prozesse für mehr Effizienz und bessere Ergebnisse.",
      explanation: "Implementieren Sie intelligente Marketing-Automation-Systeme, die Leads qualifizieren, Kunden segmentieren und personalisierte Kampagnen automatisch ausliefern für maximale Conversion-Raten.",
      basePoints: 350,
      price: "CHF 250.-",
      features: ["Lead Nurturing", "E-Mail Marketing", "CRM Integration", "Conversion Tracking", "Personalisierung"],
    }
  ];

  const portfolioProjects = [
    {
      title: "Crowdhouse",
      description: "Deutliche Steigerung der Konversionsraten durch Implementierung intelligenter Marketing-Automatisierung, die Nutzerverhaltensmuster vorhersagt.",
      image: "/vincent-mbkuncn4.jpeg",
      technologies: ["Cloud-Infrastruktur", "Fortgeschrittenes WordPress", "Custom Scripts", "Modernes JS"],
      features: ["Intelligente Automatisierung", "Performance-Mapping", "Erweiterte Analytik"],
      link: "https://www.crowdhouse.com",
    },
    {
      title: "Speed Comparer",
      description: "Aufbau eines umfassenden Medienimperiums mit über 200.000 YouTube-Abonnenten durch strategische Content-Erstellung und Zielgruppenengagement.",
      image: "/untitled-design-mbkvnaem.png",
      technologies: ["Video-Produktion", "Design Suite", "E-Commerce"],
      features: ["Content-Strategie", "Professionelle Produktion", "Performance-Analytik"],
      link: "https://www.youtube.com/speedcomparer",
    }
  ];

  const addService = (serviceId: string, points: number) => {
    setSelectedServices(prev => ({ ...prev, [serviceId]: 1 }));
    setUserPoints(prev => prev + points);
  };

  const removeService = (serviceId: string, points: number) => {
    if (selectedServices[serviceId] > 0) {
      setSelectedServices(prev => {
        const newServices = { ...prev };
        delete newServices[serviceId];
        return newServices;
      });
      setUserPoints(prev => prev - points);
    }
  };

  const getTotalServices = () => {
    return Object.values(selectedServices).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    services.forEach(service => {
      const count = selectedServices[service.id] || 0;
      if (count > 0) {
        const price = parseInt(service.price.replace(/[^\d]/g, ''));
        total += price * count;
      }
    });
    return total;
  };

  const handleSubmitClick = async () => {
    if (!userEmail || getTotalServices() === 0) {
      alert("Bitte geben Sie Ihre E-Mail-Adresse ein und wählen Sie mindestens einen Service aus.");
      return;
    }

    try {
      const response = await fetch("/api/submit-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          services: selectedServices,
          points: userPoints,
          marketingConsent,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (typeof window !== "undefined" && window._hsq) {
          console.log("Pushing HubSpot identify:", userEmail);
          window._hsq.push(["identify", { email: userEmail }]);
        }

        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);

        setUserEmail("");
        setMarketingConsent(false);
        setSelectedServices({});
        setUserPoints(0);
      } else {
        console.error("API error:", result.message);
        alert("Paket-Anfrage konnte nicht übermittelt werden: " + result.message);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("Ein Fehler ist beim Übermitteln Ihrer Anfrage aufgetreten. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <>
      <Head>
        <title>Vincialmedia - Fortschrittliche Digitale Architektur</title>
        <meta name="description" content="Transformieren Sie Ihre digitale Präsenz mit fortschrittlicher Webentwicklung, intelligenter Automatisierung und datengetriebenen digitalen Erfahrungen." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="093175ce-ab1b-45f1-b766-f12aa6311a07" strategy="beforeInteractive" />
      <script type="text/plain" data-cookieconsent="marketing" data-src="https://js-eu1.hs-scripts.com/146320474.js" async defer></script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-K43H5KD1R1" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K43H5KD1R1');
        `}
      </Script>
      
      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative px-4 pt-6 pb-20 md:pt-8 md:pb-32 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 mt-6">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                  <div className="space-y-4 lg:space-y-6">
                    <Badge className="bg-black text-white border-0 inline-flex items-center hover:bg-red-600 transition-colors duration-300">
                      <Cpu className="mr-2" size={14} />
                      Digital Marketing Architect
                    </Badge>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-black">
                      Digital<br />
                      Marketing<br />
                      <span className="relative inline-block">
                        <span className="text-red-600 italic transform -rotate-2 inline-block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent font-black tracking-wider">
                          Einfach gemacht
                        </span>
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-700 transform rotate-1 rounded-full"></div>
                      </span>
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Ich baue digitale Systeme, die verkaufen – nicht nur beeindrucken.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Button size="lg" onClick={() => scrollToSection("services")} className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center">
                      <Rocket className="mr-2" size={20} />
                      Ihre Reise beginnen
                    </Button>
                    
                    <Button variant="outline" size="lg" onClick={() => scrollToSection("portfolio")} className="w-full sm:w-auto bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center justify-center">
                      Portfolio ansehen
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end">
                  <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border border-gray-200">
                    <Image src="/vince-mbggi03h.jpeg" alt="Vince - Fortschrittlicher Digitaler Architekt" width={384} height={384} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust/Clients Section */}
        <section className="px-4 py-16 relative bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-12">Diese Marken setzen auf meine Expertise</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                {/* Speed Comparer */}
                <div className="w-30 h-30 md:w-36 md:h-36 relative flex items-center justify-center">
                  <Image 
                    src="/channels4_profile.jpg" 
                    alt="Speed Comparer" 
                    width={144} 
                    height={144} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </div>
                
                {/* Crowdhouse */}
                <div className="w-36 h-30 md:w-48 md:h-36 relative flex items-center justify-center">
                  <Image 
                    src="/Crowdhouse_Logo.png" 
                    alt="Crowdhouse" 
                    width={192} 
                    height={144} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </div>
                
                {/* SRF */}
                <div className="w-36 h-30 md:w-48 md:h-36 relative flex items-center justify-center">
                  <Image 
                    src="/images.png" 
                    alt="SRF" 
                    width={192} 
                    height={144} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </div>
                
                {/* NordVPN */}
                <div className="w-30 h-30 md:w-36 md:h-36 relative flex items-center justify-center">
                  <Image 
                    src="/NordVPN_Logo_square.svg.png" 
                    alt="NordVPN" 
                    width={144} 
                    height={144} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </div>
                
                {/* Stellantis */}
                <div className="w-36 h-30 md:w-48 md:h-36 relative flex items-center justify-center col-span-2 md:col-span-1">
                  <Image 
                    src="/STELLANTIS.jpg" 
                    alt="Stellantis" 
                    width={192} 
                    height={144} 
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">Service-Portfolio</h2>
                <p className="text-lg md:text-xl text-gray-600">Wählen Sie Ihre Services aus und erstellen Sie Ihr Projektpaket</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service) => {
                  const Icon = service.icon;
                  const selectedCount = selectedServices[service.id] || 0;
                  
                  return (
                    <div key={service.id} className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full">
                      <div className="text-center space-y-6 flex-1 flex flex-col">
                        <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Icon className="text-black" size={32} />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-black min-h-[64px] flex items-center justify-center">{service.title}</h3>
                          <Badge className="bg-black text-white border-0 text-lg px-4 py-2 inline-flex items-center">
                            Ab {service.price}
                          </Badge>
                          <p className="text-gray-600 text-center min-h-[72px] flex items-center justify-center">{service.description}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center flex-1">
                          <p className="text-sm text-gray-600">{service.explanation}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-semibold text-black">Kernkompetenzen:</h4>
                          <div className="space-y-2 min-h-[120px]">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 justify-start">
                                <CheckCircle className="text-black flex-shrink-0" size={12} />
                                <span className="text-sm text-gray-600 text-left">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 mt-auto">
                          {selectedCount === 0 ? (
                            <Button onClick={() => addService(service.id, service.basePoints)} className="w-full bg-black text-white hover:bg-red-600">
                              Service hinzufügen
                            </Button>
                          ) : (
                            <Button variant="destructive" onClick={() => removeService(service.id, service.basePoints)} className="w-full bg-red-600 text-white hover:bg-red-700">
                              Service entfernen
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Package Summary */}
        {getTotalServices() > 0 && (
          <section className="px-4 py-20 relative">
            <div className="max-w-7xl mx-auto">
              <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
                <div className="text-center space-y-6 mb-8">
                  <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <Package className="text-black" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-black">Projektpaket</h2>
                  <p className="text-gray-600">Überprüfen Sie Ihre ausgewählten Services und starten Sie Ihr Projekt</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-black">Ausgewählte Services:</h4>
                    <div className="space-y-3">
                      {services.map((service) => {
                        const count = selectedServices[service.id] || 0;
                        if (count === 0) return null;
                        return (
                          <div key={service.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-gray-600">{service.title}</span>
                            <span className="font-semibold text-black">Ab {service.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-black">Gesamtpreis:</span>
                        <span className="text-2xl font-bold text-black">Ab CHF {getTotalPrice()}.-</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Services:</span>
                        <span className="text-black">{getTotalServices()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div>
                    <Label htmlFor="package-email" className="text-black">E-Mail-Adresse</Label>
                    <Input 
                      id="package-email" 
                      type="email" 
                      placeholder="ihre@email.com" 
                      value={userEmail} 
                      onChange={(e) => setUserEmail(e.target.value)} 
                      className="bg-white border-gray-200 text-black placeholder:text-gray-400 mt-2" 
                    />
                  </div>
                  
                  <Button 
                    size="lg" 
                    onClick={handleSubmitClick}
                    className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center" 
                    disabled={!userEmail || getTotalServices() === 0}
                  >
                    <Mail className="mr-2" size={20} />
                    Anfragen
                  </Button>
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
              <span className="font-semibold">Projektanfrage erfolgreich übermittelt!</span>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Erfolgsbilanz</h2>
                <p className="text-xl text-gray-600">Außergewöhnliche Ergebnisse in verschiedenen digitalen Projekten</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Award size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">50+ Projekte</h3>
                  <p className="text-gray-600">Erfolgreich umgesetzt in verschiedenen Branchen</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <TrendingUp size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">300% Ø ROI</h3>
                  <p className="text-gray-600">Messbare Renditen auf digitale Investitionen</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Target size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">100% Zufriedenheit</h3>
                  <p className="text-gray-600">Verpflichtet, Kundenerwartungen zu übertreffen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ausgewähltes Portfolio</h2>
                <p className="text-xl text-gray-600">Erleben Sie die Verschmelzung von fortschrittlicher Technik und digitaler Innovation</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {portfolioProjects.map((project, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                      <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black text-white border-0 inline-flex items-center">
                          {index === 0 ? <Gauge className="mr-1" size={12} /> : <Code className="mr-1" size={12} />}
                          {index === 0 ? "Hochperformant" : "Fortschrittliche Architektur"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="bg-white border-white text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center justify-center">
                            <ExternalLink size={16} />
                          </Button>
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-black">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-black">Hauptmerkmale:</h4>
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
                            <Badge key={idx} className="bg-gray-100 text-black border-gray-200">{tech}</Badge>
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

        {/* Contact Section */}
        <section className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-black">Kontakt aufnehmen</h2>
                <p className="text-xl text-gray-600">Bereit, Ihre digitale Präsenz zu transformieren? Lassen Sie uns über Ihr Projekt sprechen.</p>
                
                <Button variant="outline" size="lg" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center">
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
            <div className="w-[90%] mx-auto text-center">
              <h3 className="text-3xl font-bold text-black mb-4">Vincialmedia</h3>
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
