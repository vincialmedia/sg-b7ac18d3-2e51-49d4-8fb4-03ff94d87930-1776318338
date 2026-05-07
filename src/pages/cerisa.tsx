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
  UserCheck,
  MessageCircle,
  Bell,
} from "lucide-react";

// ============================================
// CONFIGURATION - Update these values
// ============================================
const WEBHOOK_URL = "https://hook.eu1.make.com/yruhgm7vrbig4qnashcswegrx3wivsqt";
const CALENDLY_URL = "";
const NOTIFICATION_EMAIL = "vincent@vincialmedia.com";

const SERIF = "'Playfair Display', Georgia, serif";

interface FormData {
  firstName: string;
  lastName: string;
  clinic: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  currentProcess: string;
}

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export default function CerisaPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    clinic: "CERISA",
    email: "",
    phone: "",
    website: "",
    location: "",
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
      source_page: "/cerisa",
      source_type: "cerisa_lead",
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
        <title>CERISA · Mehr persönliche Beratungstermine</title>
        <meta
          name="description"
          content="Anfragen werden einfühlsam, schnell und individuell beantwortet — damit aus jedem Interessenten ein persönliches Gespräch in unseren Praxen in Thun, Visp oder Zug wird."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-12 md:pt-8 md:pb-16 min-h-[85vh] md:min-h-[75vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="w-[90%] mx-auto bg-white border border-[#E8E1D5] rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Left: Content */}
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                  <div className="space-y-4 lg:space-y-6">
                    <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-[#1a1a1a] text-white rounded-full text-[10px] sm:text-xs font-medium tracking-[0.12em] sm:tracking-[0.2em] animate-fade-in-up whitespace-nowrap">
                      MEDICAL AESTHETICS &amp; LONGEVITY
                    </div>

                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1a1a1a] animate-fade-in-up animation-delay-100"
                      style={{ fontFamily: SERIF, fontWeight: 500 }}
                    >
                      Expertise,<br />
                      die <span className="italic text-[#C9A961]">Natürlichkeit</span><br />
                      bewahrt.
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-[#3D3D3D] leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                      Mehr Zeit für persönliche Beratung — damit jede Patientin und jeder Patient die individuelle Antwort bekommt, die sie verdient.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
                    <Button
                      onClick={scrollToForm}
                      size="lg"
                      className="w-full sm:w-auto bg-[#1a1a1a] text-white hover:bg-[#C9A961] inline-flex items-center justify-center text-xs sm:text-base md:text-lg px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 h-auto rounded-full tracking-wide transition-colors duration-300"
                    >
                      Persönliches Gespräch vereinbaren
                      <ArrowRight className="ml-2 h-5 w-5 hidden sm:inline-block" />
                    </Button>
                  </div>

                  <p className="text-xs md:text-sm text-[#8B7E72] tracking-wider animate-fade-in-up animation-delay-400">
                    THUN · VISP · ZUG
                  </p>
                </div>

                {/* Right: Dr. Hashagen portrait */}
                <div className="order-1 lg:order-2 relative w-full flex flex-col items-center lg:items-end animate-fade-in-up">
                  <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8E1D5] bg-[#FAF7F2]">
                    <img
                      src="/dr-hashagen.webp"
                      alt="Dr. Claus Hashagen — CERISA Ästhetische Medizin & Longevity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className="mt-4 text-xs text-[#8B7E72] tracking-[0.25em] uppercase"
                  >
                    Dr. med. Claus Hashagen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What this helps with */}
        <section className="px-4 py-20 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] text-center mb-4"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              Was Patientinnen und Patienten heute erwarten
            </h2>
            <p className="text-base md:text-lg text-[#3D3D3D] text-center mb-12 max-w-2xl mx-auto">
              Anfragen zu Hyaluron, Botox oder einem Longevity-Erstgespräch kommen nicht im Sekretariatstakt — sondern abends, am Wochenende, von drei Standorten gleichzeitig. Was an der Schwelle liegen bleibt, kommt selten zurück.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-hover bg-white border border-[#E8E1D5] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-[#C9A961]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Antwort auch um 22:00 Uhr
                </h3>
                <p className="text-[#3D3D3D] text-sm">
                  Eine Patientin schreibt am Sonntagabend wegen einer Hyaluron-Beratung. Sie erhält sofort eine persönliche Eingangsbestätigung — nicht erst am Dienstag, wenn das Interesse längst woanders Platz gefunden hat.
                </p>
              </div>

              <div className="card-hover bg-white border border-[#E8E1D5] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-7 w-7 text-[#C9A961]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Wiederkehrende Fragen, ruhig beantwortet
                </h3>
                <p className="text-[#3D3D3D] text-sm">
                  Was kostet eine Botox-Behandlung? Wie läuft ein Longevity-Erstgespräch ab? Wie weit ist der nächste Standort? — Standardfragen werden in Ihrem Ton beantwortet, ohne dass Ihr Team dreimal dasselbe schreibt.
                </p>
              </div>

              <div className="card-hover bg-white border border-[#E8E1D5] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4">
                  <Bell className="h-7 w-7 text-[#C9A961]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Drei Standorte, ein Posteingang
                </h3>
                <p className="text-[#3D3D3D] text-sm">
                  Anfragen für Thun, Visp und Zug landen sortiert beim richtigen Team — nicht im allgemeinen Postfach, in dem niemand zuerst zuständig ist. Wer nicht antwortet, bekommt eine dezente Erinnerung.
                </p>
              </div>

              <div className="card-hover bg-white border border-[#E8E1D5] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-[#C9A961]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Mehr persönliche Erstgespräche
                </h3>
                <p className="text-[#3D3D3D] text-sm">
                  Aus genau denselben Anfragen werden mehr tatsächliche Termine — weil Vertrauen dort entsteht, wo zeitnah, individuell und in CERISA-Tonalität geantwortet wird.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] text-center mb-4"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              Was im Hintergrund geschieht
            </h2>
            <p className="text-base md:text-lg text-[#3D3D3D] text-center mb-12 max-w-2xl mx-auto">
              Ein ruhiger, klarer Ablauf — von der ersten Anfrage bis zum persönlichen Gespräch in der Praxis.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-medium text-lg" style={{ fontFamily: SERIF }}>
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                    Eine Anfrage trifft ein — egal über welchen Kanal
                  </h3>
                  <p className="text-[#3D3D3D]">
                    Kontaktformular auf dr-hashagen.ch, WhatsApp an die +41 76, Instagram-DM, Anruf ausserhalb der Sprechzeiten. Jede Anfrage landet sortiert am selben Ort — mit Kontext zu Standort und gewünschter Behandlung.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-medium text-lg" style={{ fontFamily: SERIF }}>
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                    Sie wird ruhig erfasst und bestätigt
                  </h3>
                  <p className="text-[#3D3D3D]">
                    Die Person erhält umgehend eine persönliche Eingangsbestätigung. Ihr Team wird informiert — ohne dass etwas liegen bleibt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-medium text-lg" style={{ fontFamily: SERIF }}>
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                    Typische Fragen werden einfühlsam beantwortet
                  </h3>
                  <p className="text-[#3D3D3D]">
                    Investitionsrahmen für Hyaluron, Ablauf einer Botox-Sitzung, was beim PRF-Termin mitzubringen ist, Anfahrt zu Thun, Visp oder Zug. Beantwortet in Ihrem Tonfall — nicht im Standardraster.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-medium text-lg" style={{ fontFamily: SERIF }}>
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                    Der nächste Schritt wird klar gemacht
                  </h3>
                  <p className="text-[#3D3D3D]">
                    Ob Beratungstermin in Thun, Visp oder Zug, Rückruf oder weiterführende Information — der Weg ist eindeutig.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center font-medium text-lg" style={{ fontFamily: SERIF }}>
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                    Bei Bedarf übernimmt Ihr Team persönlich
                  </h3>
                  <p className="text-[#3D3D3D]">
                    Sobald es um medizinische Einschätzung, individuelle Behandlungsplanung oder Longevity-Strategien geht, übergibt das System nahtlos an das richtige Team am richtigen Standort — mit dem vollständigen bisherigen Verlauf.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-[#C9A961] text-white rounded-full flex items-center justify-center font-medium text-lg" style={{ fontFamily: SERIF }}>
                  6
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                    Aus Anfragen werden persönliche Gespräche
                  </h3>
                  <p className="text-[#3D3D3D]">
                    Weil niemand vergessen wird, weil Antworten zeitnah kommen und der Ton stimmt — finden mehr Interessenten den Weg in Ihre Praxis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance / Trust */}
        <section className="px-4 py-20 bg-[#FAF7F2]">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] text-center mb-4"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              Sie bleiben in Kontrolle
            </h2>
            <p className="text-base md:text-lg text-[#3D3D3D] text-center mb-12 max-w-2xl mx-auto">
              Genauso, wie Sie Behandlungen individuell planen, sollten auch Anfragen individuell beantwortet werden. Das System unterstützt Ihr Team — es ersetzt es nicht. Sie bestimmen, was im Hintergrund läuft und ab wann ein Mensch übernimmt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">
                    Kein Systemwechsel notwendig
                  </h3>
                  <p className="text-[#3D3D3D] text-sm">
                    Das Setup fügt sich in Ihre bestehenden Abläufe ein. Praxissoftware, CRM und gewohnte Wege bleiben.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">
                    Es wird nur beantwortet, was Sie freigeben
                  </h3>
                  <p className="text-[#3D3D3D] text-sm">
                    Sie definieren Ton, Inhalte und Grenzen. Alles andere wird an Ihr Team übergeben — ohne Umweg.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">
                    Persönliche Übernahme jederzeit
                  </h3>
                  <p className="text-[#3D3D3D] text-sm">
                    Bei sensiblen Anliegen oder ausdrücklichem Wunsch übernimmt Ihr Team sofort — mit allem Kontext zur Hand.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-[#C9A961] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">
                    Schritt für Schritt aufgebaut
                  </h3>
                  <p className="text-[#3D3D3D] text-sm">
                    Wir beginnen mit dem Wesentlichen und erweitern nur dort, wo es für CERISA wirklich Sinn ergibt.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white border border-[#E8E1D5] rounded-2xl">
              <div className="flex items-start gap-4">
                <UserCheck className="h-8 w-8 text-[#C9A961] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2 text-lg">
                    Wo der persönliche Kontakt unersetzlich bleibt
                  </h3>
                  <p className="text-[#3D3D3D]">
                    <strong>Im Hintergrund:</strong> Anfragen erfassen, Eingangsbestätigungen senden, typische Fragen beantworten, an Termine erinnern, dezente Follow-ups bei ausbleibender Antwort.
                  </p>
                  <p className="text-[#3D3D3D] mt-2">
                    <strong>Persönlich, immer:</strong> medizinische Beratung, individuelle Behandlungsempfehlungen, sensible Rückfragen, jedes Gespräch in der Praxis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="anfrage-form" className="px-4 py-20 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-[#E8E1D5] rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="h-8 w-8 text-[#C9A961]" />
                    </div>
                    <h2
                      className="text-2xl sm:text-3xl text-[#1a1a1a] mb-4"
                      style={{ fontFamily: SERIF, fontWeight: 500 }}
                    >
                      Persönliches Gespräch vereinbaren
                    </h2>
                    <p className="text-[#3D3D3D]">
                      In rund 30 Minuten schauen wir gemeinsam an, wie Anfragen heute bei CERISA ankommen — über alle drei Standorte, alle Kanäle, alle Behandlungsbereiche. Anschliessend zeigen wir konkret, wo Interessenten heute leise verloren gehen und wie ein Ablauf in CERISA-Tonalität aussähe. Kein Verkaufsgespräch, sondern eine ruhige Analyse.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#1a1a1a]">
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
                          className="bg-white border-[#E8E1D5] text-[#1a1a1a] placeholder:text-[#8B7E72] focus-visible:ring-[#C9A961]"
                          placeholder="Ihr Vorname"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#1a1a1a]">
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
                          className="bg-white border-[#E8E1D5] text-[#1a1a1a] placeholder:text-[#8B7E72] focus-visible:ring-[#C9A961]"
                          placeholder="Ihr Nachname"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-[#1a1a1a]">
                        Standort *
                      </Label>
                      <Select
                        value={formData.location}
                        onValueChange={(value) =>
                          handleInputChange("location", value)
                        }
                        required
                      >
                        <SelectTrigger className="bg-white border-[#E8E1D5] text-[#1a1a1a] focus:ring-[#C9A961]">
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="thun">Thun</SelectItem>
                          <SelectItem value="visp">Visp</SelectItem>
                          <SelectItem value="zug">Zug</SelectItem>
                          <SelectItem value="all">Standortübergreifend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1a1a1a]">
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
                          className="bg-white border-[#E8E1D5] text-[#1a1a1a] placeholder:text-[#8B7E72] focus-visible:ring-[#C9A961]"
                          placeholder="ihre@email.ch"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#1a1a1a]">
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
                          className="bg-white border-[#E8E1D5] text-[#1a1a1a] placeholder:text-[#8B7E72] focus-visible:ring-[#C9A961]"
                          placeholder="+41 79 123 45 67"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-[#1a1a1a]">
                        Website (optional)
                      </Label>
                      <Input
                        id="website"
                        type="text"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="bg-white border-[#E8E1D5] text-[#1a1a1a] placeholder:text-[#8B7E72] focus-visible:ring-[#C9A961]"
                        placeholder="dr-hashagen.ch"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentProcess" className="text-[#1a1a1a]">
                        Wie läuft es heute mit neuen Anfragen? *
                      </Label>
                      <Select
                        value={formData.currentProcess}
                        onValueChange={(value) =>
                          handleInputChange("currentProcess", value)
                        }
                        required
                      >
                        <SelectTrigger className="bg-white border-[#E8E1D5] text-[#1a1a1a] focus:ring-[#C9A961]">
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">
                            Wir antworten persönlich, meist zeitnah
                          </SelectItem>
                          <SelectItem value="slow">
                            Antworten dauern manchmal länger als gewünscht
                          </SelectItem>
                          <SelectItem value="lost">
                            Einzelne Anfragen bleiben gelegentlich liegen
                          </SelectItem>
                          <SelectItem value="no-process">
                            Es gibt keinen klar definierten Ablauf
                          </SelectItem>
                          <SelectItem value="unsure">
                            Wir wissen nicht genau, wie viele Anfragen offen bleiben
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {error && (
                      <div className="p-4 bg-[#FAF7F2] border border-[#C9A961] rounded-lg text-[#1a1a1a] text-sm">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.currentProcess || !formData.location}
                      className="w-full bg-[#1a1a1a] text-white hover:bg-[#C9A961] text-xs sm:text-base md:text-lg px-3 sm:px-6 py-3 sm:py-5 md:py-6 h-auto rounded-full transition-colors duration-300 disabled:opacity-50 tracking-wide"
                    >
                      {isSubmitting ? (
                        "Wird gesendet..."
                      ) : (
                        <>
                          Persönliches Gespräch anfragen
                          <ArrowRight className="ml-2 h-5 w-5 hidden sm:inline-block" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-[#8B7E72] text-center">
                      Mit dem Absenden akzeptieren Sie unsere{" "}
                      <Link
                        href="/datenschutz"
                        className="underline hover:text-[#C9A961]"
                      >
                        Datenschutzerklärung
                      </Link>
                      .
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-[#C9A961]" />
                  </div>
                  <h3
                    className="text-2xl text-[#1a1a1a] mb-4"
                    style={{ fontFamily: SERIF, fontWeight: 500 }}
                  >
                    Vielen Dank für Ihre Anfrage
                  </h3>
                  <p className="text-[#3D3D3D] mb-8">
                    Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen. Wenn Sie direkt einen Termin für ein kurzes Gespräch reservieren möchten, finden Sie hier den nächsten Schritt.
                  </p>
                  {CALENDLY_URL ? (
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full sm:w-auto bg-[#1a1a1a] text-white hover:bg-[#C9A961] text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-full transition-colors duration-300 tracking-wide">
                        <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Termin reservieren
                      </Button>
                    </a>
                  ) : (
                    <Button
                      disabled
                      className="w-full sm:w-auto bg-[#E8E1D5] text-[#8B7E72] text-sm sm:text-lg px-5 sm:px-8 py-4 sm:py-6 h-auto rounded-full cursor-not-allowed"
                    >
                      <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Termin reservieren (in Kürze verfügbar)</span>
                      <span className="sm:hidden">In Kürze verfügbar</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20 bg-[#FAF7F2]">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] text-center mb-12"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              Häufige Fragen
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-white border border-[#E8E1D5] rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-[#1a1a1a] font-semibold hover:no-underline">
                  Müssen wir unsere bestehenden Systeme verändern?
                </AccordionTrigger>
                <AccordionContent className="text-[#3D3D3D]">
                  Nein. Das Setup fügt sich in die bestehenden Abläufe von CERISA ein. Praxissoftware, CRM und gewohnte Kommunikationswege bleiben — das Ziel ist keine zusätzliche Technik, sondern weniger verlorene Anfragen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white border border-[#E8E1D5] rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-[#1a1a1a] font-semibold hover:no-underline">
                  Werden Patientenanfragen automatisch beantwortet?
                </AccordionTrigger>
                <AccordionContent className="text-[#3D3D3D]">
                  Nur dort, wo Sie es ausdrücklich freigeben. Typische Beispiele: Ablauf einer Erstberatung, Vorbereitung auf eine Behandlung, Investitionsrahmen, Anfahrt zu Thun, Visp oder Zug. Alles, was medizinisch-individuell ist, geht direkt an Ihr Team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white border border-[#E8E1D5] rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-[#1a1a1a] font-semibold hover:no-underline">
                  Wann übernimmt ein Mensch?
                </AccordionTrigger>
                <AccordionContent className="text-[#3D3D3D]">
                  Sobald die Anfrage über Standardthemen hinausgeht — bei medizinischen Details, Longevity-Strategien, individuellen Situationen oder dem ausdrücklichen Wunsch nach einem persönlichen Gespräch. Ihr Team erhält dann eine Benachrichtigung mit dem vollständigen Kontext.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white border border-[#E8E1D5] rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-[#1a1a1a] font-semibold hover:no-underline">
                  Was geschieht nach unserer Anfrage?
                </AccordionTrigger>
                <AccordionContent className="text-[#3D3D3D]">
                  Wir betrachten gemeinsam, wie Anfragen heute bei CERISA ankommen und bearbeitet werden. Anschliessend zeigen wir konkret, an welchen Stellen Interessenten verloren gehen könnten und wie ein verbesserter Ablauf aussähe — angepasst an Ihre Praxis, kein Standard-Template.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 bg-white border-t border-[#E8E1D5]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p
                  className="text-[#1a1a1a] text-lg tracking-[0.15em]"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  CERISA
                </p>
                <p className="text-[#8B7E72] text-xs sm:text-sm tracking-wide sm:tracking-wider">
                  Ästhetische Medizin &amp; Longevity · Thun · Visp · Zug
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link
                  href="/impressum"
                  className="text-[#3D3D3D] hover:text-[#C9A961] transition-colors"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="text-[#3D3D3D] hover:text-[#C9A961] transition-colors"
                >
                  Datenschutz
                </Link>
                <Link
                  href="/agb"
                  className="text-[#3D3D3D] hover:text-[#C9A961] transition-colors"
                >
                  AGB
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
