import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Brauche ich dafür ein neues CRM?",
    a: "Nein. Wenn ihr heute schon mit einem Tool arbeitet, knüpfen wir daran an. Wenn nicht, reicht oft eine einfache Übersicht. Wichtig ist nicht das Tool – sondern dass Anfragen nicht liegen bleiben."
  },
  {
    q: "Funktioniert das auch mit meinem bestehenden Ablauf?",
    a: "Ja. Wir reissen nichts um. Wir ergänzen nur die fehlenden Schritte: schnelle Rückmeldung, klare nächste Schritte und sauberes Nachfassen."
  },
  {
    q: "Wie schnell kann das live sein?",
    a: "Oft in 1–2 Wochen startklar – je nachdem, über welche Kanäle die Anfragen kommen und wer im Team was übernimmt. In der Demo klären wir das realistisch."
  },
  {
    q: "Muss ich meine Website komplett neu machen?",
    a: "Nein. In vielen Fällen reicht es, den Weg nach der Anfrage sauber zu machen. Das Formular kann bleiben, wie es ist – oder wir ergänzen es minimal."
  },
  {
    q: "Was braucht ihr von uns?",
    a: "Kurz: Wo kommen Anfragen rein? Wer antwortet? Und welche Texte sollen rausgehen? Den Rest setzen wir so auf, dass es im Alltag funktioniert."
  }
];

export function ClinicsFaqSection() {
  return (
    <section className="px-4 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">FAQ</h2>
            <p className="text-lg text-gray-600 mt-4">Kurz beantwortet. Wenn du Fragen hast, klären wir sie im Gespräch.</p>
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