import { useState, useEffect, ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Inbox,
  Zap,
  MessagesSquare,
  ClipboardList,
  UserCheck,
  MessageCircle,
  Brain,
  Clock,
  Database,
  ShieldCheck,
} from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================
const WEBHOOK_URL = "https://hook.eu1.make.com/t1d5pi9h9umufn8etcok7f3yp8lg94f5";
const CALENDLY_URL = "";
const NOTIFICATION_EMAIL = "vincent@vincialmedia.com";

// Image assets — placeholders render automatically when these files don't exist yet.
const IMG_HERO_CHAT = "/images/kliniken/chat-mockup-hero.svg";
const IMG_BOTOX = "/images/kliniken/chat-mockup-botox-15min.svg";
const IMG_BOTOX_ERST = "/images/kliniken/chat-mockup-botox-erst-30min.svg";
const IMG_LIPO = "/images/kliniken/chat-mockup-lipo-45min.svg";
const IMG_HUBSPOT = "/images/kliniken/hubspot-pre-call-summary.svg";

interface FormState {
  name: string;
  email: string;
  clinic: string;
  phone: string;
  website: string;
  currentProcess: string;
  wantsWhatsApp: boolean;
}

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

const splitName = (full: string): { firstName: string; lastName: string } => {
  const trimmed = full.trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, idx),
    lastName: trimmed.slice(idx + 1).trim(),
  };
};

const digitsOnly = (value: string) => value.replace(/\D+/g, "");

// Scroll-triggered fade-in wrapper
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Image with built-in placeholder fallback so layout works without assets
function MockupImage({
  src,
  alt,
  aspect = "aspect-[5/6]",
}: {
  src: string;
  alt: string;
  aspect?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={`${aspect} w-full rounded-xl border border-dashed border-black/20 bg-white flex items-center justify-center`}
      >
        <div className="text-center px-4">
          <p className="font-mono text-xs uppercase tracking-wider text-black/50">
            Image placeholder
          </p>
          <p className="mt-2 text-sm text-black/60">{alt}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`${aspect} w-full rounded-xl border border-black/10 bg-white overflow-hidden`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function KlinikenPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    clinic: "",
    phone: "",
    website: "",
    currentProcess: "",
    wantsWhatsApp: false,
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

  const handleFieldChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
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

    const { firstName, lastName } = splitName(formData.name);

    const submissionData = {
      firstName,
      lastName,
      email: formData.email.trim(),
      clinic: formData.clinic.trim(),
      phone: digitsOnly(formData.phone),
      website: formData.website.trim(),
      currentProcess: formData.currentProcess,
      wantsWhatsApp: formData.wantsWhatsApp ? "true" : "false",
      source_page: "/kliniken",
      source_type: "clinic_lead",
      submitted_at: new Date().toISOString(),
      ...utmParams,
    };

    try {
      if (WEBHOOK_URL) {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });
        if (!response.ok) throw new Error("Webhook submission failed");
      } else {
        const response = await fetch("/api/clinic-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...submissionData,
            notificationEmail: NOTIFICATION_EMAIL,
          }),
        });
        if (!response.ok) throw new Error("Email submission failed");
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

  const flowSteps = [
    {
      icon: Inbox,
      title: "Anfrage kommt rein, egal über welchen Kanal",
      body: "Webformular, E-Mail oder WhatsApp. Auch nachts, am Wochenende, an Feiertagen.",
    },
    {
      icon: Zap,
      title: "Antwort in unter 60 Sekunden",
      body: "Persönlich, in Schweizer Tonalität, mit dem Wissen Ihrer Klinik.",
    },
    {
      icon: MessagesSquare,
      title: "Echtes Gespräch",
      body: "Mehrrunden-Dialog, bis die wichtigsten Fragen geklärt sind.",
    },
    {
      icon: Calendar,
      title: "Terminbuchung in der richtigen Länge",
      body: "Buchungslink mit Termindauer passend zur Behandlung — 15 Min für Botox, 45 für Liposuktion.",
    },
    {
      icon: ClipboardList,
      title: "Pre-Call-Briefing für Ihr Team",
      body: "Vor dem Gespräch: Ziele, Budget, Vorerfahrungen. Ihr Team ist vorbereitet.",
    },
    {
      icon: UserCheck,
      title: "Bei Bedarf übernimmt Ihr Team",
      body: "Sensible oder komplexe Themen gehen direkt an Sie — manuell oder per Regel.",
    },
  ];

  const differentiators = [
    {
      icon: MessageCircle,
      title: "Multi-Channel statt nur Webformular",
      body: "Patientinnen schreiben per WhatsApp, weil das ihr Standard-Kanal ist. Wer nur Web-Forms automatisiert, verpasst die Hälfte. Mein System läuft auf E-Mail, WhatsApp und Web — alles zentral verwaltet.",
    },
    {
      icon: Brain,
      title: "Trainiert auf Ihre Klinik, nicht auf das Internet",
      body: "Vor dem Go-Live lese ich Ihre Webseite, Behandlungsbeschreibungen und Preisliste ein. Der Assistent kennt Ihren Tonfall, Ihre Standorte und Ihre Spezialitäten. Antworten klingen aus Ihrer Praxis — nicht aus ChatGPT.",
    },
    {
      icon: MessagesSquare,
      title: "Mehrrunden-Dialog statt Standard-Antwort",
      body: 'Übliche Chatbots sagen "Danke für Ihre Anfrage, wir melden uns." Mein Assistent stellt Rückfragen, beantwortet Folge-Fragen und führt das Gespräch bis zum Termin. Wie ein Mitarbeiter — nur in Sekunden.',
    },
    {
      icon: Clock,
      title: "Termindauer, die zur Behandlung passt",
      body: "15 Minuten für Botox. 45 für Liposuktion. 30 für Erstpatientinnen, die noch nie hier waren. Der Assistent erkennt die Behandlung und den Kontext — und reserviert die richtige Beratungszeit.",
    },
    {
      icon: Database,
      title: "CRM-Anbindung mit Pre-Call-Briefing",
      body: "Jeder Lead, jede Konversation, jede Buchung landet automatisch in Ihrem CRM (HubSpot — weitere CRMs auf Anfrage), inklusive Pre-Call-Zusammenfassung als Notiz im Kontakt. Kein Copy-Paste, keine vergessenen Leads.",
    },
    {
      icon: ShieldCheck,
      title: "Ihr Team bleibt in Kontrolle",
      body: "Sie definieren, was automatisch läuft. Sensible Fragen, medizinische Beratung, persönliche Themen gehen direkt an Ihr Team. Der Assistent übernimmt das Volumen — Ihr Team macht das Hochwertige.",
    },
  ];

  const treatments = [
    { name: "Botox · Standard", duration: "15 Min" },
    { name: "Botox · Erstberatung", duration: "30 Min" },
    { name: "Filler", duration: "20 Min" },
    { name: "Kombination Botox + Filler", duration: "30 Min" },
    { name: "Liposuktion-Beratung", duration: "45 Min" },
  ];

  const faqs = [
    {
      q: "Muss ich mein ganzes System ändern?",
      a: "Nein. Das System dockt an Ihre bestehenden Tools an — Ihr E-Mail-Postfach, Ihr Kalender, Ihr CRM. Ich passe das Setup an Ihre Abläufe an, nicht umgekehrt.",
    },
    {
      q: "Werden Fragen von Patientinnen wirklich automatisch beantwortet — oder nur Standard-Vorlagen?",
      a: "Echte Antworten. Der Assistent ist auf Ihre Klinik trainiert und führt Mehrrunden-Gespräche. Er beantwortet Fragen zu Behandlungen, Preisen, Standorten und Vorbereitungen — alles, was Sie freigeben.",
    },
    {
      q: "Wie weiss der Assistent, wie lange ein Termin sein muss?",
      a: "Im Setup hinterlegen wir Ihre Behandlungsliste mit Standarddauern — z.B. Botox 15 Min, Filler 20 Min, Liposuktion-Beratung 45 Min. Der Assistent passt die Dauer aber zusätzlich an den Kontext an: Erstpatientinnen, die signalisieren, dass sie noch keine Erfahrung haben, bekommen automatisch einen längeren Slot. Kombinations-Anfragen (z.B. Botox + Filler) werden zusammengelegt. Die Regeln und Auslöser definieren Sie — der Assistent setzt sie konsistent um.",
    },
    {
      q: "Wann übernimmt ein Mensch?",
      a: 'Sie definieren die Regeln. Standardmässig: medizinische Beratung, Fragen zu Risiken, Beschwerden, Sonderwünsche. Sie können auch sagen "Nach drei Antworten immer an mein Team" — flexibel anpassbar.',
    },
    {
      q: "Wie sieht der Datenschutz aus?",
      a: "Schweizer Setup, DSG- und DSGVO-konform. Patientendaten bleiben in Ihrem CRM. Keine Weitergabe an Marketing-Plattformen, kein Re-Targeting. Auf Wunsch Auftragsdatenverarbeitungs-Vertrag (ADV).",
    },
    {
      q: "Wie lange dauert das Setup?",
      a: "Typischerweise zwei bis vier Wochen. Erste Woche: Analyse und KI-Training auf Ihre Inhalte. Zweite Woche: Test-Setup mit Ihrem Team. Dritte und vierte Woche: schrittweiser Go-Live.",
    },
    {
      q: "Was kostet das?",
      a: "Einmalige Setup-Pauschale plus monatliche Betreuung. Konkrete Zahlen besprechen wir im Demo-Call — abhängig von Kanälen, CRM und Anfrage-Volumen.",
    },
  ];

  return (
    <>
      <Head>
        <title>KI-Mitarbeiter für Patientenanfragen | VincialMedia</title>
        <meta
          name="description"
          content="Ihr KI-Mitarbeiter beantwortet Patientenanfragen in Sekunden — per E-Mail, WhatsApp und Web. Termindauer passend zur Behandlung. Pre-Call-Briefing für Ihr Team."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white text-black antialiased">
        {/* ============ HERO ============ */}
        <section className="px-6 pt-16 pb-16 md:pt-24 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <FadeIn className="order-2 lg:order-1 min-w-0">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-4 py-2 bg-black text-white rounded-xl text-xs font-mono uppercase tracking-wider">
                    <Users className="mr-2 h-3.5 w-3.5" />
                    Für Kliniken
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-black hyphens-auto break-words" lang="de">
                    Ihr KI-Mitarbeiter für Patientenanfragen.
                  </h1>

                  <p className="text-base md:text-lg leading-relaxed text-black/70 max-w-xl">
                    Antwortet in{" "}
                    <span className="relative inline-block">
                      <span className="text-red-600 italic font-black tracking-wide">
                        Sekunden
                      </span>
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                    </span>
                    . Kennt Ihre Klinik. Bucht den Termin. Per E-Mail, WhatsApp und Web — 24/7.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      onClick={scrollToForm}
                      size="lg"
                      className="w-full sm:w-auto bg-black text-white hover:bg-black hover:scale-[0.98] transition-transform inline-flex items-center justify-center text-base px-8 py-6 h-auto rounded-xl"
                    >
                      Kurze Demo anfragen
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <p className="text-sm text-black/50">
                    Speziell für ästhetische Kliniken, Laser, Cosmetic und Premium-Zahnmedizin.
                  </p>
                </div>
              </FadeIn>

              {/* Right — chat mockup */}
              <FadeIn className="order-1 lg:order-2 min-w-0" delay={0.1}>
                <div className="bg-black/[0.03] rounded-xl p-4 sm:p-6 border border-black/10">
                  <MockupImage
                    src={IMG_HERO_CHAT}
                    alt="Chat conversation mockup"
                    aspect="aspect-[5/6]"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ PROBLEM — big stat ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50 mb-8">
                Das Problem
              </p>
              <p className="text-7xl md:text-9xl font-medium tabular-nums tracking-tight leading-none text-black">
                30–50%
              </p>
              <p className="mt-8 text-base md:text-lg text-black/70 max-w-2xl mx-auto leading-relaxed">
                der Patientenanfragen gehen verloren — nicht wegen Ihrer Behandlung, sondern wegen langsamer Antwortzeiten.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-12 text-base md:text-lg text-black/60 max-w-2xl mx-auto leading-relaxed">
                Sonntagabend, <span className="font-mono tabular-nums">21:47</span>. Eine potenzielle Patientin schreibt eine Anfrage zu einer Behandlung im Wert von mehreren tausend Franken. Niemand antwortet. Montag früh geht die Anfrage im Posteingang unter. Mittwoch hat sie bei der Konkurrenz gebucht. Das passiert in jeder Klinik — jede Woche.
              </p>
            </FadeIn>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ SOLUTION INTRO ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-center mb-10">
                Was, wenn jede Anfrage in unter <span className="font-mono tabular-nums">60</span> Sekunden beantwortet wird?
              </h2>
            </FadeIn>
            <div className="space-y-6 text-base md:text-lg text-black/70 leading-relaxed">
              <FadeIn delay={0.05}>
                <p>
                  Genau dafür baue ich KI-gestützte Lead-Systeme für Kliniken. Kein generischer Chatbot — sondern ein KI-Mitarbeiter, der mit den Inhalten Ihrer Klinik trainiert wird. Er kennt Ihre Behandlungen, Preise, Standorte und Ihren Tonfall. Er führt echte Gespräche per E-Mail und WhatsApp, qualifiziert Interessenten, beantwortet Rückfragen und leitet zur Terminbuchung.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  Sobald jemand bucht, bekommt Ihr Team automatisch eine kurze Zusammenfassung: Was will die Patientin? Welches Budget? Welche Bedenken? So gehen Sie informiert ins Beratungsgespräch — und schliessen häufiger ab.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ TERMINDAUER-INTELLIGENZ ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50 mb-6 text-center">
                Termindauer-Intelligenz
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-center max-w-3xl mx-auto">
                Eine KI, die nicht nur die Behandlung kennt — sondern auch den Patienten.
              </h2>
              <p className="mt-6 text-base md:text-lg text-black/70 max-w-2xl mx-auto text-center leading-relaxed">
                Standard-Buchungstools schicken jeden in den gleichen Slot. Mein Assistent erkennt die gewünschte Behandlung, Kombinationen und den Patientenkontext — und reserviert die passende Beratungszeit.
              </p>
            </FadeIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeIn delay={0.05}>
                <div className="space-y-4">
                  <MockupImage
                    src={IMG_BOTOX}
                    alt="Standard Botox conversation, 15-min booking"
                    aspect="aspect-[5/6]"
                  />
                  <p className="text-sm text-black/60 text-center">
                    Standardanfrage <span className="font-mono">→</span> Standarddauer
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="space-y-4">
                  <MockupImage
                    src={IMG_BOTOX_ERST}
                    alt="Botox-Erstpatientin conversation, 30-min booking"
                    aspect="aspect-[5/6]"
                  />
                  <p className="text-sm text-black/60 text-center">
                    Erstpatientin-Signal <span className="font-mono">→</span> erweiterter Slot
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  <MockupImage
                    src={IMG_LIPO}
                    alt="Liposuktion conversation, 45-min booking"
                    aspect="aspect-[5/6]"
                  />
                  <p className="text-sm text-black/60 text-center">
                    Komplexer Eingriff <span className="font-mono">→</span> ausführlicher Slot
                  </p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <div className="mt-12 max-w-md mx-auto bg-black/[0.04] rounded-xl p-6 border border-black/5">
                <p className="font-mono text-xs uppercase tracking-wider text-black/50 mb-4">
                  Ihre Behandlungsliste — Beispiel
                </p>
                <ul className="space-y-2">
                  {treatments.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-black">{t.name}</span>
                      <span className="font-mono tabular-nums text-black/60">
                        {t.duration}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-black/50 leading-relaxed">
                  Sie definieren die Liste und die Auslöser — der Assistent setzt sie konsistent um.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ SO FUNKTIONIERT ES — icon flow ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-center mb-16">
                So funktioniert es
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {flowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeIn key={step.title} delay={i * 0.05}>
                    <div className="rounded-xl border border-black/10 p-6 h-full bg-white">
                      <p className="font-mono text-xs uppercase tracking-wider text-black/40 mb-3 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <Icon className="h-8 w-8 text-black mb-4" strokeWidth={1.5} />
                      <h3 className="text-base font-semibold text-black mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-black/60 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ DIFFERENTIATORS ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-center mb-16 max-w-3xl mx-auto">
                Warum das funktioniert (und ein Standard-Chatbot nicht)
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                return (
                  <FadeIn key={d.title} delay={i * 0.05}>
                    <div className="rounded-xl border border-black/10 p-8 h-full bg-white">
                      <Icon className="h-7 w-7 text-black mb-5" strokeWidth={1.5} />
                      <h3 className="text-lg font-semibold text-black mb-3 leading-snug">
                        {d.title}
                      </h3>
                      <p className="text-sm text-black/60 leading-relaxed">
                        {d.body}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ HUBSPOT PRE-CALL BRIEFING ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50 mb-6 text-center">
                Pre-Call-Briefing
              </p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-center max-w-3xl mx-auto">
                Sie gehen nie wieder unvorbereitet ins Beratungsgespräch.
              </h2>
              <p className="mt-6 text-base md:text-lg text-black/70 max-w-2xl mx-auto text-center leading-relaxed">
                Vor jedem Termin landet eine kurze Zusammenfassung im CRM: Ziele der Patientin, Vorerfahrungen, Budgetvorstellungen, offene Fragen.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-12">
                <MockupImage
                  src={IMG_HUBSPOT}
                  alt="HubSpot contact card showing lead_intent_summary field"
                  aspect="aspect-[16/10]"
                />
                <p className="mt-4 text-xs italic text-black/50 text-center">
                  Beispieldarstellung. In Ihrer Umgebung mit echten Patientendaten.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ ABOUT VINCENT ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-center">
              <FadeIn className="md:col-span-1">
                <div className="w-48 h-48 md:w-full md:h-auto md:aspect-square mx-auto rounded-xl overflow-hidden border border-black/10">
                  <Image
                    src="/vince-mbggi03h.jpeg"
                    alt="Vincent Hänggi"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn className="md:col-span-2" delay={0.05}>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                    Wer hinter VincialMedia steht
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-black/70 leading-relaxed">
                    <p>
                      Ich bin Vincent Hänggi. VincialMedia ist eine Schweizer Agentur für KI-Lead-Automation, spezialisiert auf Kliniken mit beratungsintensiven Behandlungen.
                    </p>
                    <p>
                      Ich übernehme jedes Projekt persönlich — von der Analyse über das Setup bis zum Live-Betrieb. Keine Account-Manager, keine Junior-Übergaben. Sie sprechen mit mir, ich baue für Sie, ich bleibe Ihr Ansprechpartner.
                    </p>
                    <p>
                      Mein Ansatz: ich starte mit dem Kanal, der sofort Wirkung zeigt (in der Regel E-Mail), und baue Schritt für Schritt aus. Sie sehen Ergebnisse, bevor das gesamte System aufgesetzt ist.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ DEMO FORM ============ */}
        <section id="anfrage-form" className="px-6 py-24 md:py-32">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="bg-white rounded-xl border border-black/10 p-8 md:p-12">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-10">
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
                        Kurze Demo anfragen
                      </h2>
                      <p className="text-base text-black/70 leading-relaxed">
                        Ich schaue mir an, wie Ihre Klinik aktuell mit Anfragen umgeht. Dann zeige ich Ihnen konkret, wo Interessenten verloren gehen — und wie Ihr System in wenigen Wochen live laufen könnte. Kein Verkaufsgespräch, sondern eine praktische Analyse.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-black">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          className="rounded-xl border-black/15"
                          placeholder="Vor- und Nachname"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-black">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          className="rounded-xl border-black/15"
                          placeholder="ihre@email.ch"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinic" className="text-black">Klinik / Praxis *</Label>
                        <Input
                          id="clinic"
                          type="text"
                          required
                          value={formData.clinic}
                          onChange={(e) => handleFieldChange("clinic", e.target.value)}
                          className="rounded-xl border-black/15"
                          placeholder="Name der Klinik"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-black">Telefon</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleFieldChange("phone", e.target.value)}
                            className="rounded-xl border-black/15"
                            placeholder="+41 79 123 45 67"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-black">Website</Label>
                          <Input
                            id="website"
                            type="text"
                            value={formData.website}
                            onChange={(e) => handleFieldChange("website", e.target.value)}
                            className="rounded-xl border-black/15"
                            placeholder="ihre-klinik.ch"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentProcess" className="text-black">
                          Wie läuft es aktuell mit neuen Anfragen?
                        </Label>
                        <Select
                          value={formData.currentProcess}
                          onValueChange={(value) => handleFieldChange("currentProcess", value)}
                        >
                          <SelectTrigger className="rounded-xl border-black/15">
                            <SelectValue placeholder="Bitte wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="within-24h">Wir antworten meistens innert 24h</SelectItem>
                            <SelectItem value="irregular">Antwortzeiten sind unregelmässig</SelectItem>
                            <SelectItem value="losing-leads">Wir verlieren regelmässig Anfragen</SelectItem>
                            <SelectItem value="other">Anderes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <label
                        htmlFor="wantsWhatsApp"
                        className="flex items-center justify-between gap-4 rounded-xl border border-black/10 p-4 cursor-pointer hover:border-black/20 transition-colors"
                      >
                        <span className="text-sm leading-snug text-black">
                          Ich möchte per WhatsApp kontaktiert werden{" "}
                          <span className="text-black/50">anstatt per E-Mail</span>
                        </span>
                        <Switch
                          id="wantsWhatsApp"
                          checked={formData.wantsWhatsApp}
                          onCheckedChange={(checked) =>
                            handleFieldChange("wantsWhatsApp", checked === true)
                          }
                          className="shrink-0 data-[state=checked]:bg-black data-[state=unchecked]:bg-black/15"
                        />
                      </label>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white hover:bg-black hover:scale-[0.98] transition-transform text-base py-6 h-auto rounded-xl disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          "Wird gesendet..."
                        ) : (
                          <>
                            Demo anfragen
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-black/50 text-center">
                        Mit dem Absenden akzeptieren Sie unsere{" "}
                        <Link href="/datenschutz" className="underline hover:text-black">
                          Datenschutzerklärung
                        </Link>
                        .
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-black/[0.04] rounded-xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-black" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Danke für Ihre Anfrage
                    </h3>
                    <p className="text-black/70 mb-8">
                      Ich melde mich innerhalb von 24 Stunden bei Ihnen. Wenn Sie direkt einen Termin für ein kurzes Gespräch buchen möchten, können Sie das hier tun.
                    </p>
                    {CALENDLY_URL ? (
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-black text-white hover:bg-black hover:scale-[0.98] transition-transform text-base px-8 py-6 h-auto rounded-xl">
                          <Calendar className="mr-2 h-5 w-5" />
                          Termin buchen
                        </Button>
                      </a>
                    ) : (
                      <Button
                        disabled
                        className="bg-black/10 text-black/40 text-base px-8 py-6 h-auto rounded-xl cursor-not-allowed"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Termin buchen (bald verfügbar)
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="border-t border-black/5" />

        {/* ============ FAQ ============ */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-center mb-16">
                Häufige Fragen
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="bg-white border border-black/10 rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left text-black text-base font-semibold hover:no-underline py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-black/70 text-base leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="px-6 py-12 border-t border-black/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-black">VincialMedia</p>
              <p className="text-sm text-black/50">
                KI-Mitarbeiter für Patientenanfragen.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/impressum" className="text-black/60 hover:text-black transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-black/60 hover:text-black transition-colors">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-black/60 hover:text-black transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
