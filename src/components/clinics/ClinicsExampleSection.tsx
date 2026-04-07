import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ClinicsExampleSectionProps {
  onCtaClick: () => void;
}

const demoMockups: { title: string; content: React.ReactNode }[] = [
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
          <p className="text-sm text-gray-600 mt-1">„Erinnerung: Dein Termin ist morgen um 14:00. Falls du verschieben musst, gib kurz Bescheid.“</p>
        </div>
      </div>
    )
  }
];

export function ClinicsExampleSection({ onCtaClick }: ClinicsExampleSectionProps) {
  return (
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
  );
}