import { useMemo } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ClinicsBodySectionsProps {
  onCtaClick: () => void;
}

export function ClinicsBodySections({ onCtaClick }: ClinicsBodySectionsProps) {
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
        title: "2) Sofort-Bestaetigung",
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-900">Danke – wir haben deine Anfrage erhalten.</p>
              <p className="text-sm text-green-900/80">
                Wir melden uns kurzfristig mit den naechsten Schritten und einem Terminvorschlag.
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
        title: "3) Pipeline (Uebersicht)",
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
              <p className="text-sm text-gray-600">Wer wartet? Wer ist dran? Was ist naechster Schritt?</p>
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
              <p className="text-sm text-gray-600">„Kurze Rueckfrage: Soll ich dir zwei Terminvorschlaege fuer diese Woche senden?“</p>
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
        q: "Brauche ich dafuer ein neues CRM?",
        a: "Nicht zwingend. Wir bauen den Ablauf so, dass er zu deinem heutigen Setup passt – oder wir setzen eine schlanke Pipeline auf, wenn aktuell gar nichts sauber strukturiert ist."
      },
      {
        q: "Funktioniert das auch mit meinem bestehenden Ablauf?",
        a: "Ja. Wir starten mit einer kurzen Bestandsaufnahme: Was passiert heute nach der Anfrage? Danach implementieren wir nur das, was wirklich fehlt – ohne unnoetige Umstellung."
      },
      {
        q: "Wie schnell kann das live sein?",
        a: "Wenn die Grundlagen (Formular, Zustaendigkeiten, Nachrichten) klar sind, kann ein erster produktiver Ablauf sehr schnell stehen. In der Demo klaeren wir, was bei dir realistisch ist."
      },
      {
        q: "Muss ich meine Website komplett neu machen?",
        a: "Nein. Meist reicht es, den Lead-Eingang sauber zu definieren (Formular/Tracking) und danach die Reaktions- und Follow-up-Logik zu automatisieren."
      }
    ],
    []
  );

  return (
    <>
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Das Problem ist oft nicht das Marketing</h2>
              <p className="text-lg text-gray-600 mt-4">
                Viele Anfragen gehen verloren, weil nach dem ersten Kontakt kein sauberer Ablauf steht. Nicht, weil zu wenig Leads
                reinkommen – sondern weil die Bearbeitung zu langsam, zu unklar oder zu inkonsequent ist.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {[
                { title: "Antworten kommen zu spaet", text: "Interessenten fragen bei mehreren Anbietern an. Wer nicht schnell antwortet, verliert." },
                { title: "Es gibt kein klares Follow-up", text: "Ohne feste Schritte wird „spaeter“ schnell zu „nie“. Leads bleiben liegen." },
                { title: "Anfragen versanden im Alltag", text: "Telefon, Empfang, Teamwechsel, Rueckfragen – am Ende fehlt die Uebersicht." }
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                Ein pragmatisches Lead-Conversion-System – sauber, verstaendlich und fuer den Klinikalltag gemacht.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[
                { title: "Sofort-Antwort auf neue Anfragen", text: "Automatische Bestaetigung + naechster Schritt, damit niemand ins Leere fragt." },
                { title: "Klare Lead-Pipeline", text: "Eine Uebersicht, die zeigt, wo jeder Lead steht – und was als naechstes passiert." },
                { title: "Automatische Follow-ups", text: "Strukturiertes Nachfassen, bis ein Termin steht – ohne dass das Team dran denken muss." },
                { title: "Termin-Erinnerungen", text: "Reduziert No-Shows und macht die Kommunikation fuer Patienten klar und ruhig." },
                { title: "Reaktivierung alter Leads", text: "Alte Anfragen sind oft die guenstigsten Buchungen – wenn man sie sauber aktiviert." }
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                <p className="text-gray-600 mt-2">Mehr Termine aus den Leads, die heute schon reinkommen – mit weniger Chaos im Ablauf.</p>
                <div className="mt-6">
                  <Button onClick={onCtaClick} className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center">
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
              <p className="text-lg text-gray-600 mt-4">Einfach, klar, schnell erfassbar – damit das Team es wirklich nutzt.</p>
            </div>

            <div className="mt-10">
              <div className="grid sm:grid-cols-5 gap-3">
                {["Anfrage", "Sofort-Antwort", "Pipeline", "Follow-up", "Termin"].map((label, idx) => (
                  <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                    <p className="text-xs font-semibold text-gray-500">Step {idx + 1}</p>
                    <p className="text-base font-bold text-black mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-600">Anfrage → Sofort-Antwort → Pipeline → Follow-up → Termin</p>
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
                  Du siehst hier bewusst „clean“ gehaltene Beispiele. In der echten Umsetzung passen wir Texte, Timing und Kanal (E-Mail/SMS) an deinen Ablauf an.
                </p>

                <div className="mt-8">
                  <Button onClick={onCtaClick} className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center">
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
                <p className="text-lg font-semibold text-black mt-3">„Seit der Ablauf steht, verlieren wir deutlich weniger Anfragen – und das Team hat wieder Ruhe.“</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-black">Fuer wen das gebaut ist</h2>
              <p className="text-lg text-gray-600 mt-4">
                Fuer Premium-Anbieter mit hochwertigen Leads – wo Geschwindigkeit, Vertrauen und saubere Kommunikation entscheiden.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {["Aesthetische Kliniken", "Laser-Kliniken", "Beauty / Cosmetic Clinics", "Premium Dental Clinics"].map((label) => (
                <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center shadow-sm">
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
              <p className="text-lg text-gray-600 mt-4">Kurz beantwortet – in der Demo klaeren wir, was bei dir konkret Sinn macht.</p>
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
    </>
  );
}