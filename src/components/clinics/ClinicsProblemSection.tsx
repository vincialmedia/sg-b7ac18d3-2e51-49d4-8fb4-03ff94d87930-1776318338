import React from "react";

export function ClinicsProblemSection() {
  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Marketing bringt Anfragen. Verloren gehen sie danach.</h2>
            <p className="text-lg text-gray-600 mt-4">
              In vielen Kliniken ist nicht die Nachfrage das Problem – sondern der Ablauf nach dem ersten Kontakt.
              <br />
              Wenn die Antwort zu spät kommt, der nächste Schritt unklar ist oder niemand konsequent nachfasst, bucht der Patient dort, wo es schneller und ruhiger wirkt.
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
  );
}