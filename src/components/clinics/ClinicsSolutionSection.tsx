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
  );
}