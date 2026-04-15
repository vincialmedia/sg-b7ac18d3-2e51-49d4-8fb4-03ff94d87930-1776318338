import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Calendar,
  Zap,
  UserCheck,
  MessageCircle,
  Bell,
} from "lucide-react";

// ============================================
// CONFIGURATION - Update these values
// ============================================
const WEBHOOK_URL = "https://hook.eu1.make.com/ql1gz6k4cci96l6q4xd31xwqk057f7xq";
const CALENDLY_URL = "";
const NOTIFICATION_EMAIL = "vincent@vincialmedia.com";

interface FormData {
  firstName: string;
  lastName: string;
  clinic: string;
  email: string;
  phone: string;
  website: string;
  currentProcess: string;
}

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export default function KlinikenPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    clinic: "",
    email: "",
    phone: "",
    website: "",
    currentProcess: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
      });
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("anfrage-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const submissionData = {
      ...formData,
      source_page: "/kliniken",
      source_type: "clinic_lead",
      submitted_at: new Date().toISOString(),
      ...utmParams,
    };

    try {
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error("Webhook submission failed");
        }
      } else {
        const response = await fetch("/api/clinic-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...submissionData,
            notificationEmail: NOTIFICATION_EMAIL,
          }),
        });

        if (!response.ok) {
          throw new Error("Email submission failed");
        }
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        "Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mehr Anfragen zu Terminen machen | VincialMedia</title>
        <meta
          name="description"
          content="Anfragen werden sofort erfasst, häufige Fragen automatisch beantwortet, Interessenten bis zur Terminbuchung begleitet. Für Kliniken mit beratungsintensiven Behandlungen."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-12 md:pt-8 md:pb-16 min-h-[85vh] md:min-h-[75vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                
                {/* Left: Content */}
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium animate-fade-in-up">
                      <Users className="mr-2 h-4 w-4" />
                      Für Kliniken
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black animate-fade-in-up animation-delay-100">
                      Mehr Anfragen<br />
                      zu Terminen<br />
                      <span className="relative inline-block">
                        <span className="text-red-600 italic transform -rotate-1 inline-block font-black tracking-wide">
                          machen
                        </span>
                        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform rotate-1 rounded-full"></div>
                      </span>
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                      Ich helfe Kliniken, schneller auf Anfragen zu reagieren und weniger Interessenten zu verlieren – damit mehr daraus echte Termine werden.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
                    <Button
                      onClick={scrollToForm}
                      size="lg"
                      className="btn-premium w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-4 md:py-5 h-auto rounded-full"
                    >
                      <span className="hidden sm:inline">Kurze Demo anfragen</span>
                      <span className="sm:hidden">Demo anfragen</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-500 animate-fade-in-up animation-delay-400">
                    Besonders geeignet für ästhetische Kliniken, Laser, Cosmetic und Premium-Zahnmedizin.
                  </p>
                </div>

                {/* Right: Photo */}
                <div className="order-1 lg:order-2 relative w-full flex flex-col items-center lg:items-end animate-fade-in-up">
                  <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border border-gray-200">
                    <img 
                      src="/vince-mbggi03h.jpeg" 
                      alt="Vincent - VincialMedia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Handwritten-style personal note */}
                  <p className="mt-4 text-sm md:text-base text-gray-600 italic font-handwriting animate-fade-in-up animation-delay-200" style={{ fontFamily: "'Caveat', cursive" }}>
                    Vincent setzt sich persönlich für Ihr Projekt ein
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What this helps with */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-4">
              Das konkrete Problem
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Viele Kliniken verlieren Interessenten, weil Anfragen zu langsam beantwortet werden, Rückfragen liegen bleiben oder der nächste Schritt unklar ist.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Schnellere erste Antwort
                </h3>
                <p className="text-gray-600 text-sm">
                  Anfragen werden sofort bestätigt. Interessenten wissen, dass ihre Nachricht angekommen ist — auch ausserhalb der Öffnungszeiten.
                </p>
              </div>

              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Häufige Fragen direkt beantwortet
                </h3>
                <p className="text-gray-600 text-sm">
                  Standardfragen zu Preisen, Ablauf oder Vorbereitung können automatisch beantwortet werden. Das spart Zeit und hält das Gespräch am Laufen.
                </p>
              </div>

              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Bell className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Niemand wird vergessen
                </h3>
                <p className="text-gray-600 text-sm">
                  Jede Anfrage wird erfasst und weiterverfolgt. Wenn jemand nicht antwortet, gibt es eine Erinnerung — automatisch oder für Ihr Team.
                </p>
              </div>

              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Mehr Termine aus gleich vielen Anfragen
                </h3>
                <p className="text-gray-600 text-sm">
                  Weil Interessenten schneller Antworten bekommen und der Weg zum Termin klar ist, buchen mehr von ihnen tatsächlich.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-4">
              Was genau passiert
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Ein einfacher Ablauf, der Anfragen vom ersten Kontakt bis zum Termin begleitet.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Jemand stellt eine Anfrage
                  </h3>
                  <p className="text-gray-600">
                    Über Ihre Website, per Telefon, WhatsApp oder Social Media — egal woher die Anfrage kommt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Die Anfrage wird sofort erfasst
                  </h3>
                  <p className="text-gray-600">
                    Alle Angaben landen an einem Ort. Die Person erhält eine Bestätigung. Ihr Team wird informiert.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Häufige Fragen werden direkt beantwortet
                  </h3>
                  <p className="text-gray-600">
                    Fragen zu Preisen, Ablauf oder Terminen können automatisch beantwortet werden — klar, freundlich und sofort.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Die Person wird zum nächsten Schritt geführt
                  </h3>
                  <p className="text-gray-600">
                    Ob Terminbuchung, Rückruf oder weitere Infos — der nächste Schritt ist klar und einfach.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Wenn nötig, übernimmt Ihr Team persönlich
                  </h3>
                  <p className="text-gray-600">
                    Bei komplexen Fragen oder wenn jemand persönliche Beratung braucht, wird die Anfrage an Ihr Team übergeben.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Mehr Anfragen werden zu echten Terminen
                  </h3>
                  <p className="text-gray-600">
                    Weil niemand mehr vergessen wird, Antworten schneller kommen und der Ablauf klar ist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance / Trust */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-4">
              Sie bleiben in Kontrolle
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Das System unterstützt Ihr Team — es ersetzt es nicht. Sie entscheiden, was automatisch läuft und wann ein Mensch übernimmt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Kein komplettes System-Wechsel nötig
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Das Setup passt sich an Ihre bestehenden Abläufe an. Sie müssen nicht alles neu machen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    AI beantwortet nur, was Sie freigeben
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sie definieren, welche Fragen automatisch beantwortet werden. Alles andere geht an Ihr Team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Persönliche Übernahme jederzeit möglich
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Bei sensiblen Fragen oder wenn jemand persönliche Beratung braucht, kann Ihr Team sofort übernehmen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Schritt für Schritt aufbauen
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Wir starten mit dem Wichtigsten und erweitern nur, wenn es für Sie Sinn macht.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white border border-gray-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <UserCheck className="h-8 w-8 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-black mb-2 text-lg">
                    Was macht die Automatisierung — und was nicht?
                  </h3>
                  <p className="text-gray-600">
                    <strong>Automatisch:</strong> Anfragen erfassen, Bestätigungen senden, häufige Fragen beantworten, an Termine erinnern, Follow-ups bei Nicht-Antwort.
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Persönlich:</strong> Medizinische Beratung, individuelle Preisverhandlungen, komplexe Rückfragen, persönliche Gespräche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="anfrage-form" className="px-4 py-20 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                      Kurze Demo anfragen
                    </h2>
                    <p className="text-gray-600">
                      Ich schaue mir an, wie Ihre Klinik aktuell mit Anfragen umgeht. Dann zeige ich Ihnen konkret, wo Interessenten verloren gehen und wie der Ablauf verbessert werden kann — kein Verkaufsgespräch, sondern eine praktische Analyse.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-black">
                          Vorname *
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="input-premium bg-white border-gray-200 text-black placeholder:text-gray-400"
                          placeholder="Ihr Vorname"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-black">
                          Nachname *
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="input-premium bg-white border-gray-200 text-black placeholder:text-gray-400"
                          placeholder="Ihr Nachname"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clinic" className="text-black">
                        Klinik / Praxis *
                      </Label>
                      <Input
                        id="clinic"
                        type="text"
                        required
                        value={formData.clinic}
                        onChange={(e) =>
                          handleInputChange("clinic", e.target.value)
                        }
                        className="input-premium bg-white border-gray-200 text-black placeholder:text-gray-400"
                        placeholder="Name der Klinik"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-black">
                          E-Mail *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="input-premium bg-white border-gray-200 text-black placeholder:text-gray-400"
                          placeholder="ihre@email.ch"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-black">
                          Telefon *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="input-premium bg-white border-gray-200 text-black placeholder:text-gray-400"
                          placeholder="+41 79 123 45 67"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-black">
                        Website (optional)
                      </Label>
                      <Input
                        id="website"
                        type="text"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="input-premium bg-white border-gray-200 text-black placeholder:text-gray-400"
                        placeholder="ihre-klinik.ch"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentProcess" className="text-black">
                        Wie läuft es aktuell mit neuen Anfragen? *
                      </Label>
                      <Select
                        value={formData.currentProcess}
                        onValueChange={(value) =>
                          handleInputChange("currentProcess", value)
                        }
                        required
                      >
                        <SelectTrigger className="input-premium bg-white border-gray-200 text-black">
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">
                            Wir antworten manuell, meistens schnell genug
                          </SelectItem>
                          <SelectItem value="slow">
                            Antworten dauern manchmal zu lange
                          </SelectItem>
                          <SelectItem value="lost">
                            Anfragen gehen manchmal vergessen
                          </SelectItem>
                          <SelectItem value="no-process">
                            Es gibt keinen klaren Ablauf
                          </SelectItem>
                          <SelectItem value="unsure">
                            Ich weiss nicht genau, wie viele wir verlieren
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.currentProcess}
                      className="btn-premium w-full bg-black text-white hover:bg-red-600 text-lg py-6 h-auto rounded-full transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Wird gesendet..."
                      ) : (
                        <>
                          <span className="hidden sm:inline">Kurze Demo anfragen</span>
                          <span className="sm:hidden">Demo anfragen</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Mit dem Absenden akzeptieren Sie unsere{" "}
                      <Link
                        href="/datenschutz"
                        className="underline hover:text-black"
                      >
                        Datenschutzerklärung
                      </Link>
                      .
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    Danke für Ihre Anfrage
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Ich melde mich innerhalb von 24 Stunden bei Ihnen. Wenn Sie direkt einen Termin für ein kurzes Gespräch buchen möchten, können Sie das hier tun.
                  </p>
                  {CALENDLY_URL ? (
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="btn-premium bg-black text-white hover:bg-red-600 text-lg px-8 py-6 h-auto rounded-full transition-all duration-300">
                        <Calendar className="mr-2 h-5 w-5" />
                        Termin buchen
                      </Button>
                    </a>
                  ) : (
                    <Button
                      disabled
                      className="bg-gray-300 text-gray-500 text-lg px-8 py-6 h-auto rounded-full cursor-not-allowed"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Termin buchen (bald verfügbar)
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-12">
              Häufige Fragen
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Muss ich mein ganzes System ändern?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Nein. Das Setup wird an Ihre bestehenden Abläufe angepasst. Wenn Sie bereits ein CRM, eine Praxissoftware oder bestimmte Tools nutzen, können diese oft eingebunden werden. Das Ziel ist nicht mehr Technik, sondern weniger verlorene Anfragen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Werden Fragen von Interessenten automatisch beantwortet?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Nur die Fragen, die Sie freigeben. Typische Beispiele: Preise für bestimmte Behandlungen, Ablauf einer Erstberatung, Öffnungszeiten, Anfahrt. Bei allem anderen wird Ihr Team informiert und kann persönlich antworten.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Wann übernimmt ein Mensch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Immer wenn die Anfrage über Standardfragen hinausgeht. Bei medizinischen Details, individuellen Situationen oder wenn jemand explizit ein persönliches Gespräch wünscht. Ihr Team bekommt dann eine Benachrichtigung mit allen bisherigen Informationen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Was passiert nach der Demo-Anfrage?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Ich schaue mir an, wie Anfragen aktuell bei Ihnen ankommen und bearbeitet werden. Dann zeige ich Ihnen konkret, wo Interessenten verloren gehen könnten und wie ein verbesserter Ablauf aussehen würde — angepasst an Ihre Klinik, nicht ein Standard-Template.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-bold text-black text-lg">VincialMedia</p>
                <p className="text-gray-500 text-sm">
                  Mehr aus bestehenden Anfragen machen.
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link
                  href="/impressum"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}