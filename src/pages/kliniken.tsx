import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  CalendarCheck,
  Sparkles,
  Calendar,
} from "lucide-react";

// ============================================
// CONFIGURATION - Update these values later
// ============================================
const WEBHOOK_URL = "https://hook.eu1.make.com/ql1gz6k4cci96l6q4xd31xwqk057f7xq"; // Add your Make/HubSpot webhook URL here
const CALENDLY_URL = ""; // Add your Calendly link here
const NOTIFICATION_EMAIL = "vincent@vincialmedia.com";
// ============================================

interface FormData {
  firstName: string;
  clinic: string;
  email: string;
  phone: string;
  website: string;
  currentProcess: string;
}

export default function KlinikenPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    clinic: "",
    email: "",
    phone: "",
    website: "",
    currentProcess: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const scrollToForm = () => {
    const formSection = document.getElementById("anfrage-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getUTMParams = () => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const utmParams = getUTMParams();
    const submissionData = {
      ...formData,
      source_page: "/kliniken",
      source_type: "clinic_lead",
      submitted_at: new Date().toISOString(),
      ...utmParams,
    };

    try {
      // If webhook URL is configured, send to webhook
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }
      } else {
        // Fallback: send via email API
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: NOTIFICATION_EMAIL,
            subject: `Neue Klinik-Anfrage: ${formData.clinic}`,
            html: `
              <h2>Neue Anfrage von ${formData.firstName}</h2>
              <p><strong>Klinik:</strong> ${formData.clinic}</p>
              <p><strong>E-Mail:</strong> ${formData.email}</p>
              <p><strong>Telefon:</strong> ${formData.phone}</p>
              <p><strong>Website:</strong> ${formData.website || "Nicht angegeben"}</p>
              <p><strong>Aktueller Prozess:</strong> ${formData.currentProcess}</p>
              <hr/>
              <p><small>Quelle: ${submissionData.source_page} | ${submissionData.submitted_at}</small></p>
              <p><small>UTM: ${utmParams.utm_source || "-"} / ${utmParams.utm_medium || "-"} / ${utmParams.utm_campaign || "-"}</small></p>
            `,
          }),
        });

        if (!response.ok) {
          throw new Error("Email sending failed");
        }
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere mich direkt."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const benefits = [
    {
      icon: Clock,
      title: "Anfragen schneller beantworten",
      description:
        "Interessenten bekommen zeitnah eine Antwort, bevor sie woanders buchen.",
    },
    {
      icon: MessageSquare,
      title: "Weniger Interessenten verlieren",
      description:
        "Keine Anfrage geht mehr unter. Jede Person bekommt eine klare Rückmeldung.",
    },
    {
      icon: Sparkles,
      title: "Mehr aus bestehenden Anfragen machen",
      description:
        "Die Anfragen kommen schon. Wir sorgen dafür, dass mehr davon zu Terminen werden.",
    },
    {
      icon: CalendarCheck,
      title: "Weniger Chaos im Alltag",
      description:
        "Ein klarer Ablauf statt ständigem Hin und Her. Einfacher für dein Team.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Jemand fragt an",
      description: "Über Website, Telefon oder Social Media.",
    },
    {
      number: "2",
      title: "Die Anfrage wird erfasst",
      description: "Schnell und ohne manuellen Aufwand.",
    },
    {
      number: "3",
      title: "Der nächste Schritt ist klar",
      description: "Automatische Antwort oder direkte Buchung.",
    },
    {
      number: "4",
      title: "Mehr Termine",
      description: "Weniger verlorene Anfragen, mehr echte Buchungen.",
    },
  ];

  const faqs = [
    {
      question: "Ist das auch für kleinere Kliniken sinnvoll?",
      answer:
        "Ja. Gerade kleinere Teams profitieren davon, wenn weniger Anfragen verloren gehen. Es muss nicht gross und kompliziert sein – oft reicht ein einfacher, klarer Ablauf.",
    },
    {
      question: "Muss ich dafür ein neues System einführen?",
      answer:
        "Nicht unbedingt. Wir schauen zuerst, was du schon hast und bauen darauf auf. Das Ziel ist, deinen Alltag einfacher zu machen – nicht komplizierter.",
    },
    {
      question: "Wie schnell kann so etwas umgesetzt werden?",
      answer:
        "Einfache Setups können innerhalb von ein bis zwei Wochen laufen. Komplexere Abläufe brauchen etwas länger. Nach dem ersten Gespräch weisst du, was realistisch ist.",
    },
    {
      question: "Was passiert nach der Anfrage?",
      answer:
        "Ich melde mich bei dir für ein kurzes Gespräch. Wir schauen gemeinsam, wo bei euch Anfragen verloren gehen und was man konkret verbessern kann. Kein Verkaufsgespräch, sondern ein ehrlicher Blick auf eure Situation.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Mehr Anfragen zu Terminen machen | Vincialmedia für Kliniken
        </title>
        <meta
          name="description"
          content="Ich helfe Kliniken, schneller auf Anfragen zu reagieren und mehr Interessenten in echte Termine zu verwandeln. Einfach, klar und ohne unnötigen Aufwand."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative px-4 pt-8 pb-20 md:pt-12 md:pb-32 min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <Badge className="bg-black text-white border-0 inline-flex items-center hover:bg-red-600 transition-colors duration-300">
                  Für Kliniken mit beratungsintensiven Anfragen
                </Badge>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                  Mehr Anfragen zu echten Terminen machen
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Ich helfe Kliniken, schneller auf Anfragen zu reagieren, den
                  Überblick zu behalten und weniger Interessenten zu verlieren –
                  damit mehr davon zu echten Terminen werden.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                  >
                    Kurze Demo anfragen
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Für ästhetische Kliniken • Laser-Kliniken • Beauty &
                    Cosmetic • Premium-Zahnmedizin • ähnliche Terminanbieter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                  Wobei ich dir helfe
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="text-black" size={24} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-black">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                  So läuft es ab
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-black">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2">
                        <ArrowRight className="text-gray-300" size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust/Reassurance Section */}
        <section className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                  Einfach, klar und ohne unnötigen Aufwand
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Du musst nicht alles neu machen. Wir bauen auf dem auf, was
                  bei dir schon funktioniert.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  "Kein kompliziertes System nötig",
                  "Kann schlank aufgebaut werden",
                  "Passt zu bestehenden Abläufen",
                  "Schritt für Schritt, nicht alles auf einmal",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <CheckCircle
                      className="text-black flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="anfrage-form" className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                      Kurze Demo anfragen
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Schick mir kurz deine Angaben. Ich melde mich bei dir und
                      wir schauen gemeinsam, wo bei euch Anfragen verloren gehen
                      und wie man den Ablauf vereinfachen kann.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto space-y-6"
                  >
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
                          className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          placeholder="Dein Vorname"
                        />
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
                          className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                          placeholder="Name der Klinik"
                        />
                      </div>
                    </div>

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
                        className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                        placeholder="deine@email.ch"
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
                        className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                        placeholder="+41 ..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-black">
                        Website{" "}
                        <span className="text-gray-400">(optional)</span>
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentProcess" className="text-black">
                        Was passiert aktuell mit neuen Anfragen? *
                      </Label>
                      <Select
                        required
                        value={formData.currentProcess}
                        onValueChange={(value) =>
                          handleInputChange("currentProcess", value)
                        }
                      >
                        <SelectTrigger className="bg-white border-gray-200 text-black">
                          <SelectValue placeholder="Bitte auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">
                            Wir antworten manuell
                          </SelectItem>
                          <SelectItem value="slow">
                            Es geht manchmal zu lange
                          </SelectItem>
                          <SelectItem value="unclear">
                            Es gibt keinen klaren Ablauf
                          </SelectItem>
                          <SelectItem value="unknown">
                            Ich weiss es nicht genau
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                        {submitError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        "Wird gesendet..."
                      ) : (
                        <>
                          Kurze Demo anfragen
                          <ArrowRight className="ml-2" size={20} />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Mit dem Absenden stimmst du der{" "}
                      <Link
                        href="/datenschutz"
                        className="underline hover:text-black"
                      >
                        Datenschutzerklärung
                      </Link>{" "}
                      zu.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-black">
                    Danke – deine Anfrage ist eingegangen
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Ich melde mich in Kürze bei dir. Wenn du direkt einen Termin
                    buchen willst, kannst du das hier tun.
                  </p>
                  {CALENDLY_URL ? (
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center"
                      >
                        <Calendar className="mr-2" size={20} />
                        Termin buchen
                      </Button>
                    </a>
                  ) : (
                    <Button
                      size="lg"
                      variant="outline"
                      disabled
                      className="bg-white border-gray-300 text-gray-400 inline-flex items-center cursor-not-allowed"
                    >
                      <Calendar className="mr-2" size={20} />
                      Termin buchen (Link folgt)
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                  Häufige Fragen
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-white border border-gray-200 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold text-black hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 relative border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-black">Vincialmedia</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Digitale Systeme für Kliniken
                  </p>
                </div>
                <div className="flex gap-6 text-sm text-gray-600">
                  <Link href="/impressum" className="hover:text-black transition-colors">
                    Impressum
                  </Link>
                  <Link href="/datenschutz" className="hover:text-black transition-colors">
                    Datenschutz
                  </Link>
                </div>
              </div>
              <div className="text-center mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  © 2026 Vincialmedia. Alle Rechte vorbehalten.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}