import { useMemo } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ClinicsBodySectionsProps {
  onCtaClick: () => void;
}

export function ClinicsBodySections({ onCtaClick }: ClinicsBodySectionsProps) {
  const demoMockups = useMemo(
    () => [
      {
        title: "1) Anfrageformular (Website / Landingpage)",
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold text-black">Hinweis</p>
              <p className="text-sm text-gray-600">Kurze Felder, klare Erwartung – weniger Abbrüche.</p>
            </div>
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
            <div className="rounded-lg border border-gray-200 bg-white p-3">
              <p className="text-xs font-semibold text-black">CTA</p>
              <p className="text-sm text-gray-600">Anfrage senden</p>
            </div>
          </div>
        )
      },
      {
        title: "2) Sofort-Bestätigung (E-Mail oder SMS)",
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-900">Danke für deine Anfrage.</p>
              <p className="text-sm text-green-900/80 mt-1">
                Wir melden uns zeitnah mit 1–2 Terminvorschlägen. Falls du Rückfragen hast, antworte einfach auf diese Nachricht.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold text-black">Automatisch versendet</p>
              <p className="text-sm text-gray-600">E-Mail / SMS</p>
            </div>
          </div>
        )
      },
      {
        title: "3) Pipeline-Übersicht (Team/Empfang)",
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {["Neu", "Kontaktversuch", "In Beratung", "Termin vereinbart"].map((status) => (
                <div key={status} className="rounded-lg border border-gray-200 bg-white p-3">
                  <p className="text-xs font-semibold text-black">{status}</p>
                  <p className="text-sm text-gray-600">…</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold text-black">Status klar</p>
              <p className="text-sm text-gray-600">Wer ist dran? Was ist der nächste Schritt?</p>
            </div>
          </div>
        )
      },
      {
        title: "4) Follow-up & Reminder (Beispiele)",
        content: (
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold text-black">Follow-up</p>
              <p className="text-sm text-gray-600 mt-1">
                „Kurze Nachfrage: Hast du unsere Terminvorschläge gesehen? Wenn du willst, sende ich dir gern weitere Optionen.“
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold text-black">Reminder</p>
              <p className="text-sm text-gray-600 mt-1">
                „Erinnerung: Dein Termin ist morgen um 14:00. Falls du verschieben musst, gib kurz Bescheid.“
              </p>
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
        q: "Brauche ich dafür ein neues CRM?",
        a: "Nicht zwingend. Wir können an euer heutiges Setup andocken (E-Mail, Telefon, bestehende Tools). Wenn aktuell keine saubere Übersicht existiert, setzen wir eine schlanke Pipeline auf – so simpel wie nötig."
      },
      {
        q: "Funktioniert das auch mit meinem bestehenden Ablauf?",
        a: "Ja. Wir starten mit einer kurzen Ist-Aufnahme: Was passiert heute nach der Anfrage? Danach bauen wir nur die fehlenden Schritte (Sofort-Antwort, Follow-up, Übersicht) – ohne unnötige Umstellung."
      },
      {
        q: "Wie schnell kann das live sein?",
        a: "Ein erster produktiver Ablauf kann schnell stehen, sobald Texte, Zuständigkeiten und Kanäle klar sind. In der Demo klären wir, was bei euch realistisch ist und wo der grösste Hebel liegt."
      },
      {
        q: "Muss ich meine Website komplett neu machen?",
        a: "Nein. In vielen Fällen reicht ein fokussiertes Formular bzw. eine saubere Anfrage-Strecke plus die Logik danach. Eure bestehende Website kann bleiben, wie sie ist."
      },
      {
        q: "Was braucht ihr von uns?",
        a: "Zugriff auf den aktuellen Anfrage-Kanal, kurze Abstimmung zu Zuständigkeiten und die Texte für Bestätigung & Follow-up. Mehr nicht."
      }
    ],
    []
  );

  const targetGroups = useMemo(
    () => [
      {
        title: "Ästhetische Kliniken",
        text: "Viele Anfragen brauchen Beratung und Vertrauen. Eine schnelle, klare Antwort wirkt professionell – und erhöht die Chance, dass die Beratung bei euch stattfindet."
      },
      {
        title: "Laser-Kliniken",
        text: "Viele Erstkontakte, oft ähnliche Fragen. Ein sauberer Ablauf sorgt dafür, dass niemand „zwischen Terminen“ verloren geht – und Follow-ups konsequent passieren."
      },
      {
        title: "Premium-Zahnmedizin / Zahnkliniken",
        text: "Hoher Anfragewert, planbare Termine. Ein strukturierter Erstkontakt und klare Terminführung zahlen direkt auf Auslastung und Qualität der Patientenkommunikation ein."
      },
      {
        title: "Beauty / Cosmetic Anbieter",
        text: "Viele Interessenten springen ab, wenn nach der Anfrage nichts passiert. Ein klares Follow-up holt Unentschlossene zurück – ohne dass das Team permanent daran denken muss."
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
              <h2 className="text-3xl md:text-4xl font-bold text-black">Marketing bringt Anfragen. Verloren gehen sie danach.</h2>
              <p className="text-lg text-gray-600 mt-4">
                In vielen Kliniken ist nicht die Nachfrage das Problem – sondern der Ablauf nach dem ersten Kontakt.
                <br />
                Wenn die Antwort zu spät kommt, der nächste Schritt unklar ist oder niemand konsequent nachfasst, bucht der Patient dort,
                wo es schneller und ruhiger wirkt.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {[
                {
                  title: "Antworten kommen zu spät",
                  text: "Anfragen kommen zwischen Terminen, am Abend oder am Wochenende rein. Wenn die erste Antwort erst Stunden später kommt, ist das Fenster oft zu."
                },
                {
                  title: "Es gibt kein klares Follow-up",
                  text: "„Wir melden uns“ ist kein Prozess. Ohne festen Rhythmus (z. B. Tag 1/3/7) bleiben viele Kontakte liegen – ohne klares Ja oder Nein."
                },
                {
                  title: "Anfragen versanden im Alltag",
                  text: "Empfang, Telefon, Teamwechsel, Rückfragen: Infos landen in Postfächern, Notizen oder Chats. Am Ende ist nicht klar, wer antwortet – und was der nächste Schritt ist."
                }
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-xl font-bold text-black">{item.title}</h3>
                  <p className="text-gray-600 mt-3">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-8">Genau dort setzen wir an: weniger Lead-Verlust durch klare Schritte nach der Anfrage.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Was sich nach der Umsetzung ändert</h2>
              <p className="text-lg text-gray-600 mt-4">
                Ein Lead-Flow, den Rezeption und Team wirklich nutzen – damit aus Anfragen planbar <span className="text-black font-medium">Termine</span> werden.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[
                {
                  title: "Sofort-Antwort auf neue Anfragen",
                  text: "Der Patient erhält sofort eine Bestätigung mit nächstem Schritt. Das wirkt professionell, reduziert Unsicherheit – und hält den Kontakt bei euch."
                },
                {
                  title: "Klare Lead-Pipeline",
                  text: "Jede Anfrage hat einen Status. Ihr seht auf einen Blick: neu, in Kontakt, Termin vereinbart, abgesagt – ohne Excel und ohne Rätselraten."
                },
                {
                  title: "Automatische Follow-ups",
                  text: "Nachfassen nach Plan, bis ein Termin steht oder ein klares Nein da ist. Weniger stille Verluste, weniger Bauchgefühl im Team."
                },
                {
                  title: "Termin-Erinnerungen",
                  text: "Erinnerungen vor dem Termin reduzieren No-Shows und entlasten die Rezeption (weniger Nachtelefonieren, weniger Unsicherheit)."
                },
                {
                  title: "Reaktivierung alter Leads",
                  text: "Alte Anfragen sind oft der schnellste Hebel. Wir holen sie strukturiert zurück – mit ruhiger Ansprache und klarem nächsten Schritt."
                }
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
                <p className="text-gray-600 mt-2">
                  Mehr gebuchte Termine aus den Anfragen, die heute schon reinkommen – ohne dass das Team ständig „hinterherrennen“ muss.
                </p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-black">Der Ablauf – in 10 Sekunden verständlich</h2>
              <p className="text-lg text-gray-600 mt-4">Jede Anfrage hat immer einen nächsten Schritt. Nichts bleibt „irgendwo“ hängen.</p>
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

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-2">
                <p className="text-sm text-gray-600">Anfrage → Sofort-Antwort → Pipeline → Follow-up → Termin</p>
                <p className="text-sm text-gray-600">
                  <span className="text-black font-medium">Ergebnis:</span> schnellere Reaktion nach aussen, klare Zuständigkeit nach innen – und weniger Lead-Verlust im
                  Tagesgeschäft.
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
                <h2 className="text-3xl md:text-4xl font-bold text-black">Beispiel: So sieht das im Alltag aus</h2>
                <p className="text-lg text-gray-600 mt-4">
                  Du siehst hier bewusst vereinfachte Beispiele. In der echten Umsetzung passen wir Text, Timing und Kanal (E-Mail/SMS) an euren Ablauf an – damit es für
                  Team und Patienten natürlich wirkt.
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
                <p className="text-xs font-semibold text-gray-500">Testimonial (Platzhalter – später ersetzen)</p>
                <p className="text-lg font-semibold text-black mt-3">
                  „Seit der Prozess steht, sind Anfragen nicht mehr ‘im Posteingang’. Wir reagieren schneller – und es ist klar, wer wann nachfasst.“
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-black">Name Nachname</p>
                  <p className="text-sm text-gray-600">Position, Klinik</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <p className="text-xs font-semibold text-gray-500">Case Study (Platzhalter – später ersetzen)</p>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-black">Ausgangslage</p>
                    <p className="text-sm text-gray-600 mt-2">Viele Anfragen, aber unklare Zuständigkeit und zu spätes Follow-up.</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-black">Umsetzung</p>
                    <p className="text-sm text-gray-600 mt-2">Sofort-Bestätigung, Pipeline-Status, Follow-up-Rhythmus, Reminder.</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-black">Resultat</p>
                    <p className="text-sm text-gray-600 mt-2">Mehr gebuchte Gespräche, weniger No-Shows, weniger Reibung im Team.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button onClick={onCtaClick} className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center">
                Kurze Demo anfragen
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Für welche Kliniken das sinnvoll ist</h2>
              <p className="text-lg text-gray-600 mt-4">
                Ideal für Kliniken mit beratungsintensiven Anfragen – wo der Erstkontakt Vertrauen schafft und Geschwindigkeit den Unterschied macht. Besonders dann, wenn im
                Alltag viele Kontakte parallel laufen und Zuständigkeiten nicht immer glasklar sind.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {targetGroups.map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="text-base font-bold text-black">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-2">{item.text}</p>
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
              <p className="text-lg text-gray-600 mt-4">Kurz beantwortet – in der Demo klären wir, was bei euch konkret Sinn macht.</p>
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