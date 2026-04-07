import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
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
];

export function ClinicsFaqSection() {
  return (
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
  );
}