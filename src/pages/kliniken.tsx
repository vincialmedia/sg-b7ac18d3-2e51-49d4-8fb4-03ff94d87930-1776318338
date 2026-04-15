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
} from "lucide-react";

// ============================================
// CONFIGURATION - Update these values
// ============================================
const WEBHOOK_URL = "https://hook.eu1.make.com/ql1gz6k4cci96l6q4xd31xwqk057f7xq"; // Your Make/HubSpot webhook URL
const CALENDLY_URL = ""; // Your Calendly booking link
const NOTIFICATION_EMAIL = "vincent@vincialmedia.com"; // Fallback email notification

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
          content="Wir helfen Kliniken, schneller auf Anfragen zu reagieren und mehr Interessenten in echte Termine zu verwandeln. Einfach, klar, ohne unnötigen Aufwand."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Compact Header */}
        <header className="px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-bold text-black group-hover:text-red-600 transition-colors duration-300">
                VincialMedia
              </span>
            </Link>
            
            <nav className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-black transition-colors duration-300 hidden sm:block"
              >
                Startseite
              </Link>
              <Button
                onClick={scrollToForm}
                size="sm"
                className="btn-premium bg-black text-white hover:bg-red-600 text-sm px-4 py-2 h-auto rounded-full transition-all duration-300"
              >
                <span className="hidden sm:inline">Demo anfragen</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 pt-12 pb-20 md:pt-20 md:pb-28 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-gray-100 border border-gray-200 rounded-full animate-fade-in-up">
              <span className="text-sm font-medium text-gray-700">
                Für Kliniken mit beratungsintensiven Anfragen
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6 animate-fade-in-up animation-delay-100">
              Mehr Anfragen zu echten Terminen machen
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
              Wir helfen Ihnen, schneller auf Anfragen zu reagieren, den Überblick
              zu behalten und weniger Interessenten zu verlieren – damit mehr
              davon zu echten Terminen werden.
            </p>

            <Button
              onClick={scrollToForm}
              className="btn-premium bg-black text-white hover:bg-red-600 text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 animate-fade-in-up animation-delay-300"
            >
              <span className="hidden sm:inline">Kurze Demo anfragen</span>
              <span className="sm:hidden">Demo anfragen</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="mt-10 text-sm text-gray-500 animate-fade-in-up animation-delay-400">
              Für ästhetische Kliniken, Laser-Kliniken, Beauty & Cosmetic
              Anbieter, Premium-Zahnmedizin und ähnliche Terminanbieter.
            </p>
          </div>
        </section>

        {/* What this helps with */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-12">
              Wobei ich Ihnen helfe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Anfragen schneller beantworten
                </h3>
                <p className="text-gray-600 text-sm">
                  Interessenten warten nicht gerne. Je schneller die Antwort,
                  desto höher die Chance auf einen Termin.
                </p>
              </div>

              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Weniger Interessenten verlieren
                </h3>
                <p className="text-gray-600 text-sm">
                  Keine Anfrage mehr vergessen. Jeder Kontakt wird erfasst und
                  weiterverfolgt.
                </p>
              </div>

              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Mehr aus bestehenden Anfragen machen
                </h3>
                <p className="text-gray-600 text-sm">
                  Die Anfragen kommen bereits. Es geht darum, mehr davon in
                  echte Termine zu verwandeln.
                </p>
              </div>

              <div className="card-hover bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Weniger Chaos im Alltag
                </h3>
                <p className="text-gray-600 text-sm">
                  Ein klarer Ablauf statt ständigem Hin und Her. Einfacher für
                  Sie und Ihr Team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-12">
              So läuft es ab
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Jemand fragt an
                  </h3>
                  <p className="text-gray-600">
                    Über die Website, per Telefon oder Social Media – egal
                    woher.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Die Anfrage wird schnell erfasst
                  </h3>
                  <p className="text-gray-600">
                    Alle wichtigen Infos an einem Ort, automatisch sortiert.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Der nächste Schritt ist klar
                  </h3>
                  <p className="text-gray-600">
                    Sie oder Ihr Team wissen sofort, was zu tun ist – ohne
                    Rätselraten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="step-number flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    Mehr Anfragen werden zu Terminen
                  </h3>
                  <p className="text-gray-600">
                    Weil nichts mehr untergeht und die Antwort schneller kommt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance / Trust */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-6">
              Einfach, klar und ohne unnötigen Aufwand
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Sie müssen nicht alles umstellen. Wir schauen gemeinsam, was bei Ihnen
              Sinn macht.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Kein kompliziertes System nötig
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Wir nutzen einfache, bewährte Werkzeuge – keine
                    überdimensionierte Software.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Kann schlank aufgebaut werden
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Wir starten mit dem Wichtigsten und erweitern nur, wenn es
                    Sinn macht.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Passt zu bestehenden Abläufen
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sie müssen nicht alles ändern. Wir passen uns an, was bei Ihnen
                    funktioniert.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Persönliche Betreuung
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Kein anonymer Support – Sie arbeiten direkt mit mir
                    zusammen.
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
                      Schicken Sie mir kurz Ihre Angaben. Ich melde mich bei Ihnen und
                      wir schauen gemeinsam, wo bei Ihnen Anfragen verloren gehen
                      und wie man den Ablauf vereinfachen kann.
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
                        Klinik / Firma *
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
                          Telefonnummer *
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
                        Was passiert aktuell mit neuen Anfragen? *
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
                            Wir antworten manuell
                          </SelectItem>
                          <SelectItem value="slow">
                            Es geht manchmal zu lange
                          </SelectItem>
                          <SelectItem value="no-process">
                            Es gibt keinen klaren Ablauf
                          </SelectItem>
                          <SelectItem value="unsure">
                            Ich weiss es nicht genau
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
                    Ihre Anfrage ist eingegangen. Ich melde mich in Kürze bei
                    Ihnen. Wenn Sie direkt einen Termin buchen möchten, können Sie
                    das hier tun.
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
                  Ist das auch für kleinere Kliniken sinnvoll?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Ja, gerade bei kleineren Teams macht ein klarer Ablauf viel
                  aus. Man hat weniger Ressourcen und kann es sich nicht
                  leisten, Anfragen zu verlieren. Wir passen die Lösung an Ihre
                  Grösse an.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Muss ich dafür ein neues System einführen?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Nicht unbedingt. Oft können wir mit dem arbeiten, was Sie
                  bereits haben, und es einfach besser verknüpfen. Falls ein
                  neues Werkzeug sinnvoll ist, wählen wir etwas Einfaches, das
                  zu Ihnen passt.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Wie schnell kann so etwas umgesetzt werden?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Die ersten Verbesserungen sind oft innerhalb von wenigen Tagen
                  spürbar. Ein vollständiger Ablauf kann in 2-4 Wochen stehen,
                  je nach Komplexität.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white border border-gray-200 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left text-black font-semibold hover:no-underline">
                  Was passiert nach der Anfrage?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Ich melde mich persönlich bei Ihnen – per Telefon oder
                  Video-Call, wie Sie möchten. Wir schauen gemeinsam, wo bei Ihnen
                  Anfragen verloren gehen und was man verbessern kann. Kein
                  Verkaufsgespräch, sondern ein ehrliches Gespräch.
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
                  Mehr Anfragen zu echten Terminen machen.
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