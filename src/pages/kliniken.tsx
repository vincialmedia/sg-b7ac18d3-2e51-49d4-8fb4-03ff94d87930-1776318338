import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle, ChevronRight, Mail, Phone, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type InquiryHandlingOption = "manual" | "slow" | "no-followup" | "unknown";

interface ClinicsDemoFormValues {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  inquiryHandling: InquiryHandlingOption | "";
}

const SEO_TITLE = "Lead-System für Kliniken | VincialMedia";
const META_DESCRIPTION =
  "Wir helfen Kliniken, mehr Anfragen in echte Termine umzuwandeln – mit Sofort-Antworten, Follow-up und klarer Lead-Struktur.";
const CANONICAL_URL = "https://vincialmedia.com/kliniken";

const CALENDAR_BOOKING_URL = "";

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getInquiryHandlingLabel(value: InquiryHandlingOption): string {
  switch (value) {
    case "manual":
      return "Wir antworten manuell";
    case "slow":
      return "Eher langsam / uneinheitlich";
    case "no-followup":
      return "Kein klares Follow-up";
    case "unknown":
      return "Weiss nicht genau";
  }
}

export default function ClinicsLandingPage() {
  const [values, setValues] = useState<ClinicsDemoFormValues>({
    firstName: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    inquiryHandling: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const demoMockups = useMemo(
    () => [
      {
        title: "1) Inquiry-Formular (Beispiel)",
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs font-semibold text-black">Vorname</p>
                <p className="text-sm text-gray-600">…</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs font-semibold text-black">Telefon</p>
                <p className="text-sm text-gray-600">…</p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-semibold text-black">Behandlung / Anliegen</p>
              <p className="text-sm text-gray-600">Laser / Injectables / Beratung</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold text-black">CTA</p>
              <p className="text-sm text-gray-600">Anfrage senden</p>
            </div>
          </div>
        )
      },
      {
        title: "2) Sofort-Bestätigung",
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-900">Danke – wir haben deine Anfrage erhalten.</p>
              <p className="text-sm text-green-900/80">
                Wir melden uns kurzfristig mit den nächsten Schritten und einem Terminvorschlag.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold text-black">Automatisch versendet</p>
              <p className="text-sm text-gray-600">E-Mail / SMS / WhatsApp (optional)</p>
            </div>
          </div>
        )
      },
      {
        title: "3) Pipeline (Übersicht)",
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs font-semibold text-black">Neu</p>
                <p className="text-sm text-gray-600">3</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs font-semibold text-black">In Follow-up</p>
                <p className="text-sm text-gray-600">7</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs font-semibold text-black">Termin</p>
                <p className="text-sm text-gray-600">5</p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold text-black">Status klar – ohne Excel</p>
              <p className="text-sm text-gray-600">Wer wartet? Wer ist dran? Was ist nächster Schritt?</p>
            </div>
          </div>
        )
      },
      {
        title: "4) Follow-up / Reminder (Beispiel)",
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold text-black">Follow-up (Tag 1)</p>
              <p className="text-sm text-gray-600">
                „Kurze Rückfrage: Soll ich dir zwei Terminvorschläge für diese Woche senden?“
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold text-black">Termin-Erinnerung</p>
              <p className="text-sm text-gray-600">24h vorher + 2h vorher, klar und freundlich.</p>
            </div>
          </div>
        )
      }
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Brauche ich dafür ein neues CRM?",
        a: "Nicht zwingend. Wir bauen den Ablauf so, dass er zu deinem heutigen Setup passt – oder wir setzen eine schlanke Pipeline auf, wenn aktuell gar nichts sauber strukturiert ist."
      },
      {
        q: "Funktioniert das auch mit meinem bestehenden Ablauf?",
        a: "Ja. Wir starten mit einer kurzen Bestandsaufnahme: Was passiert heute nach der Anfrage? Danach implementieren wir nur das, was wirklich fehlt – ohne unnötige Umstellung."
      },
      {
        q: "Wie schnell kann das live sein?",
        a: "Wenn die Grundlagen (Formular, Zuständigkeiten, Nachrichten) klar sind, kann ein erster produktiver Ablauf sehr schnell stehen. In der Demo klären wir, was bei dir realistisch ist."
      },
      {
        q: "Muss ich meine Website komplett neu machen?",
        a: "Nein. Meist reicht es, den Lead-Eingang sauber zu definieren (Formular/Tracking) und danach die Reaktions- und Follow-up-Logik zu automatisieren."
      }
    ],
    []
  );

  async function handleSubmit() {
    setSubmitError("");

    if (!values.firstName.trim()) return setSubmitError("Bitte Vorname ausfüllen.");
    if (!values.company.trim()) return setSubmitError("Bitte Klinik / Firma ausfüllen.");
    if (!values.email.trim()) return setSubmitError("Bitte E-Mail ausfüllen.");
    if (!values.phone.trim()) return setSubmitError("Bitte Telefonnummer ausfüllen.");
    if (!values.inquiryHandling) return setSubmitError("Bitte eine Option wählen.");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/clinics-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          company: values.company.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          website: values.website.trim(),
          inquiryHandling: values.inquiryHandling
        })
      });

      const result = (await response.json()) as { success?: boolean; message?: string; errors?: string[] };

      if (!response.ok || !result.success) {
        setSubmitError(result.message || "Unerwarteter Fehler beim Senden. Bitte kurz später nochmals versuchen.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setSubmitError("Netzwerkfehler. Bitte kurz später nochmals versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="canonical" href={CANONICAL_URL} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white overflow-x-hidden">
        <section className="px-4 pt-6 pb-16 md:pt-8 md:pb-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 mt-6">
              <div className="flex items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <Link href="/" className="inline-flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold text-black">Vincialmedia</span>
                  <Badge className="bg-gray-100 text-black border-gray-200 hidden sm:inline-flex">Outreach</Badge>
                </Link>

                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1"
                >
                  Hauptseite
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div className="pt-10 md:pt-14">
                <div className="max-w-3xl">
                  <Badge className="bg-black text-white border-0 inline-flex items-center hover:bg-red-600 transition-colors duration-300">
                    <Stethoscope className="mr-2" size={14} />
                    Lead-System für Kliniken
                  </Badge>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black mt-6">
                    Mehr Anfragen zu echten Terminen machen
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mt-6">
                    Wir bauen für ästhetische und terminbasierte Kliniken ein simples System, das neue Anfragen sofort
                    beantwortet, sauber nachfasst und weniger Leads im Alltag verloren gehen lässt.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("demo-form")}
                      className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                    >
                      Kurze Demo anfragen
                      <ArrowRight className="ml-2" size={18} />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => scrollToSection("beispiel")}
                      className="w-full sm:w-auto bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center justify-center"
                    >
                      Beispiel ansehen
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 mt-4">
                    Klare Prozesse statt mehr Ads: Schnellere Reaktion, besseres Follow-up, mehr Buchungen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black">Das Problem ist oft nicht das Marketing</h2>
                <p className="text-lg text-gray-600 mt-4">
                  Viele Anfragen gehen verloren, weil nach dem ersten Kontakt kein sauberer Ablauf steht. Nicht, weil zu
                  wenig Leads reinkommen – sondern weil die Bearbeitung zu langsam, zu unklar oder zu inkonsequent ist.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  {
                    title: "Antworten kommen zu spät",
                    text: "Interessenten fragen bei mehreren Anbietern an. Wer nicht schnell antwortet, verliert."
                  },
                  {
                    title: "Es gibt kein klares Follow-up",
                    text: "Ohne feste Schritte wird „später“ schnell zu „nie“. Leads bleiben liegen."
                  },
                  {
                    title: "Anfragen versanden im Alltag",
                    text: "Telefon, Empfang, Teamwechsel, Rückfragen – am Ende fehlt die Übersicht."
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-black">{item.title}</h3>
                    <p className="text-gray-600 mt-3">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black">Was wir implementieren</h2>
                <p className="text-lg text-gray-600 mt-4">
                  Ein pragmatisches Lead-Conversion-System – sauber, verständlich und für den Klinikalltag gemacht.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {[
                  {
                    title: "Sofort-Antwort auf neue Anfragen",
                    text: "Automatische Bestätigung + nächster Schritt, damit niemand ins Leere fragt."
                  },
                  {
                    title: "Klare Lead-Pipeline",
                    text: "Eine Übersicht, die zeigt, wo jeder Lead steht – und was als nächstes passiert."
                  },
                  {
                    title: "Automatische Follow-ups",
                    text: "Strukturiertes Nachfassen, bis ein Termin steht – ohne dass das Team dran denken muss."
                  },
                  {
                    title: "Termin-Erinnerungen",
                    text: "Reduziert No-Shows und macht die Kommunikation für Patienten klar und ruhig."
                  },
                  {
                    title: "Reaktivierung alter Leads",
                    text: "Alte Anfragen sind oft die günstigsten Buchungen – wenn man sie sauber aktiviert."
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle size={18} className="text-black" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{item.title}</h3>
                        <p className="text-gray-600 mt-2">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-black">Ziel</h3>
                  <p className="text-gray-600 mt-2">
                    Mehr Termine aus den Leads, die heute schon reinkommen – mit weniger Chaos im Ablauf.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => scrollToSection("demo-form")}
                      className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                    >
                      Kurze Demo anfragen
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black">So sieht der Flow aus</h2>
                <p className="text-lg text-gray-600 mt-4">
                  Einfach, klar, schnell erfassbar – damit das Team es wirklich nutzt.
                </p>
              </div>

              <div className="mt-10">
                <div className="grid sm:grid-cols-5 gap-3">
                  {["Anfrage", "Sofort-Antwort", "Pipeline", "Follow-up", "Termin"].map((label, idx) => (
                    <div
                      key={label}
                      className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm"
                    >
                      <p className="text-xs font-semibold text-gray-500">Step {idx + 1}</p>
                      <p className="text-base font-bold text-black mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-600">
                    Anfrage → Sofort-Antwort → Pipeline → Follow-up → Termin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beispiel" className="px-4 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-black">Beispiel / Demo (so wirkt es in der Praxis)</h2>
                  <p className="text-lg text-gray-600 mt-4">
                    Du siehst hier bewusst „clean“ gehaltene Beispiele. In der echten Umsetzung passen wir Texte,
                    Timing und Kanal (E-Mail/SMS) an deinen Ablauf an.
                  </p>

                  <div className="mt-8">
                    <Button
                      onClick={() => scrollToSection("demo-form")}
                      className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                    >
                      Kurze Demo anfragen
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="grid md:grid-cols-2 gap-6">
                    {demoMockups.map((block) => (
                      <Card key={block.title} className="border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                          <p className="text-sm font-bold text-black">{block.title}</p>
                          <div className="mt-4">{block.content}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mt-12">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <p className="text-xs font-semibold text-gray-500">Testimonial (Platzhalter)</p>
                  <p className="text-lg font-semibold text-black mt-3">
                    „Seit der Ablauf steht, verlieren wir deutlich weniger Anfragen – und das Team hat wieder Ruhe.“
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-black">Name Nachname</p>
                    <p className="text-sm text-gray-600">Position, Klinik</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="text-xs font-semibold text-gray-500">Case Study (Platzhalter)</p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-black">Ausgangslage</p>
                      <p className="text-sm text-gray-600 mt-2">Viele Leads, aber langsame Bearbeitung und wenig Follow-up.</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-black">Umsetzung</p>
                      <p className="text-sm text-gray-600 mt-2">Sofort-Antwort, Pipeline, Follow-ups, Reminder.</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-semibold text-black">Resultat</p>
                      <p className="text-sm text-gray-600 mt-2">Mehr Termine aus bestehenden Leads, weniger Chaos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black">Für wen das gebaut ist</h2>
                <p className="text-lg text-gray-600 mt-4">
                  Für Premium-Anbieter mit hochwertigen Leads – wo Geschwindigkeit, Vertrauen und saubere Kommunikation
                  entscheiden.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {[
                  "Ästhetische Kliniken",
                  "Laser-Kliniken",
                  "Beauty / Cosmetic Clinics",
                  "Premium Dental Clinics"
                ].map((label) => (
                  <div
                    key={label}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-sm"
                  >
                    <p className="text-base font-bold text-black">{label}</p>
                    <p className="text-sm text-gray-600 mt-2">Terminbasierte Leads mit hohem Wert</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-black">FAQ</h2>
                <p className="text-lg text-gray-600 mt-4">
                  Kurz beantwortet – in der Demo klären wir, was bei dir konkret Sinn macht.
                </p>
              </div>

              <div className="mt-10">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((item) => (
                    <AccordionItem key={item.q} value={item.q}>
                      <AccordionTrigger className="text-left text-black">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section id="demo-form" className="px-4 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-black">Kurze Demo anfragen</h2>
                  <p className="text-lg text-gray-600 mt-4">
                    Du erhältst eine klare Einschätzung, wie der Ablauf bei dir aussehen kann – ohne Umwege.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-black mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-black">Antwort per E-Mail</p>
                        <p className="text-sm text-gray-600">Wir melden uns mit nächsten Schritten und Fragen.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-black mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-black">Oder kurz telefonisch</p>
                        <p className="text-sm text-gray-600">Wenn’s passt, klären wir in 10–15 Minuten die Basics.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <p className="text-sm font-semibold text-black">Wichtig</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Diese Seite ist bewusst fokussiert für Outreach. Kein Menü, keine Ablenkung – nur das, was für die
                      Entscheidung wichtig ist.
                    </p>
                  </div>
                </div>

                <div className="w-full">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6 sm:p-8">
                      {!isSuccess ? (
                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-black">
                                Vorname
                              </Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                value={values.firstName}
                                onChange={(e) => setValues((prev) => ({ ...prev, firstName: e.target.value }))}
                                className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                                placeholder="Vorname"
                                autoComplete="given-name"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="company" className="text-black">
                                Klinik / Firma
                              </Label>
                              <Input
                                id="company"
                                name="company"
                                value={values.company}
                                onChange={(e) => setValues((prev) => ({ ...prev, company: e.target.value }))}
                                className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                                placeholder="Klinikname"
                                autoComplete="organization"
                              />
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-black">
                                E-Mail
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                                className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                                placeholder="name@klinik.ch"
                                autoComplete="email"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-black">
                                Telefonnummer
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={values.phone}
                                onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                                className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                                placeholder="+41 …"
                                autoComplete="tel"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website" className="text-black">
                              Website <span className="text-gray-500">(optional)</span>
                            </Label>
                            <Input
                              id="website"
                              name="website"
                              value={values.website}
                              onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
                              className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                              placeholder="https://…"
                              autoComplete="url"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="inquiryHandling" className="text-black">
                              Was passiert aktuell mit neuen Anfragen?
                            </Label>

                            <Select
                              value={values.inquiryHandling}
                              onValueChange={(val) =>
                                setValues((prev) => ({ ...prev, inquiryHandling: val as InquiryHandlingOption }))
                              }
                            >
                              <SelectTrigger id="inquiryHandling" className="bg-white border-gray-200 text-black">
                                <SelectValue placeholder="Bitte wählen" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manual">Wir antworten manuell</SelectItem>
                                <SelectItem value="slow">Eher langsam / uneinheitlich</SelectItem>
                                <SelectItem value="no-followup">Kein klares Follow-up</SelectItem>
                                <SelectItem value="unknown">Weiss nicht genau</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {submitError ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                              <p className="text-sm font-semibold text-red-800">Bitte kurz prüfen</p>
                              <p className="text-sm text-red-800/80 mt-1">{submitError}</p>
                            </div>
                          ) : null}

                          <Button
                            size="lg"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                          >
                            {isSubmitting ? "Wird gesendet…" : "Kurze Demo anfragen"}
                            <ArrowRight className="ml-2" size={18} />
                          </Button>

                          <p className="text-xs text-gray-500">
                            Mit dem Absenden bestätigst du, dass wir dich zur Bearbeitung deiner Anfrage kontaktieren
                            dürfen. Datenschutz/Impressum sind unten verlinkt.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                            <p className="text-base font-semibold text-green-900">
                              Danke – deine Anfrage ist eingegangen.
                            </p>
                            <p className="text-sm text-green-900/80 mt-2">
                              Ich melde mich in Kürze bei dir. Wenn du direkt einen Termin buchen willst, kannst du das
                              hier tun.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-500">Termin-Link</p>
                            <Button
                              size="lg"
                              className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                              asChild
                              disabled={!CALENDAR_BOOKING_URL}
                            >
                              <a
                                href={CALENDAR_BOOKING_URL || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-disabled={!CALENDAR_BOOKING_URL}
                              >
                                Termin buchen
                                <ArrowRight className="ml-2" size={18} />
                              </a>
                            </Button>
                            {!CALENDAR_BOOKING_URL ? (
                              <p className="text-xs text-gray-500">Platzhalter – Calendly-Link kann später eingefügt werden.</p>
                            ) : null}
                          </div>

                          <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <p className="text-sm font-semibold text-black">Gesendet</p>
                            <div className="mt-3 space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="text-gray-500">Vorname:</span> {values.firstName}
                              </p>
                              <p>
                                <span className="text-gray-500">Klinik/Firma:</span> {values.company}
                              </p>
                              <p>
                                <span className="text-gray-500">E-Mail:</span> {values.email}
                              </p>
                              <p>
                                <span className="text-gray-500">Telefon:</span> {values.phone}
                              </p>
                              {values.website ? (
                                <p>
                                  <span className="text-gray-500">Website:</span> {values.website}
                                </p>
                              ) : null}
                              {values.inquiryHandling ? (
                                <p>
                                  <span className="text-gray-500">Status:</span>{" "}
                                  {getInquiryHandlingLabel(values.inquiryHandling as InquiryHandlingOption)}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <footer className="max-w-7xl mx-auto mt-10 px-4 pb-10">
              <div className="w-[90%] mx-auto border-t border-gray-200 pt-8 text-center">
                <h3 className="text-2xl font-bold text-black mb-2">Vincialmedia</h3>
                <p className="text-gray-600 mb-6">
                  Fortschrittliche Digitale Architektur • Performance Engineering • Strategische Innovation
                </p>
                <div className="flex justify-center gap-3 flex-wrap mb-6">
                  <Badge className="bg-gray-100 text-black border-gray-200">Lead Conversion</Badge>
                  <Badge className="bg-gray-100 text-black border-gray-200">Follow-up</Badge>
                  <Badge className="bg-gray-100 text-black border-gray-200">Pipeline</Badge>
                </div>

                <div className="flex justify-center gap-6 text-sm text-gray-600">
                  <Link href="/impressum" className="hover:text-black transition-colors">
                    Impressum
                  </Link>
                  <Link href="/datenschutz" className="hover:text-black transition-colors">
                    Datenschutz
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}