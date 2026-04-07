import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClinicsSolutionSectionProps {
  onCtaClick: () => void;
}

export function ClinicsSolutionSection({ onCtaClick }: ClinicsSolutionSectionProps) {
  return (
    <section className="px-4 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Was danach anders läuft</h2>
            <p className="text-lg text-gray-600 mt-4">
              Ein einfacher Ablauf, den dein Team im Alltag nutzen kann. Ziel: <span className="text-black font-medium">weniger verpasste Anfragen</span> und{" "}
              <span className="text-black font-medium">mehr gebuchte Termine</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Sofortige Rückmeldung",
                text: "Jede Anfrage bekommt direkt eine kurze Bestätigung mit nächstem Schritt. Das reduziert Unsicherheit – und hält den Kontakt bei euch."
              },
              {
                title: "Klare Übersicht",
                text: "Ihr seht auf einen Blick: neu, beantwortet, in Abklärung, Termin steht, erledigt. Damit nichts „einfach liegen bleibt“."
              },
              {
                title: "Konsequent nachfassen",
                text: "Wir helfen euch, ein klares Nachfassen aufzusetzen. Nicht aggressiv – einfach zuverlässig, bis ein Termin steht oder es ein klares Nein gibt."
              },
              {
                title: "Termin-Erinnerungen",
                text: "Eine kurze Erinnerung vor dem Termin. Weniger No-Shows, weniger Nachtelefonieren, weniger Stress."
              },
              {
                title: "Alte Anfragen wieder aufnehmen",
                text: "Viele Interessenten sind nicht weg – sie sind nur abgelenkt. Wir holen sie sauber zurück, wenn es Sinn macht."
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
              <h3 className="text-xl font-bold text-black">Kurz gesagt</h3>
              <p className="text-gray-600 mt-2">
                Mehr Termine aus den Anfragen, die heute schon reinkommen – und weniger Chaos im Team.
              </p>
              <div className="mt-6">
                <Button onClick={onCtaClick} className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center">
                  Kurze Demo anfragen
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">10–15 Minuten. Du bekommst klare nächste Schritte – oder wir sagen dir ehrlich, wenn es sich nicht lohnt.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}