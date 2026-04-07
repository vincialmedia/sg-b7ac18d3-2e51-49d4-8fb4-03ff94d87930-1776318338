import React from "react";

export function ClinicsProblemSection() {
  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Anfragen kommen rein. Verloren gehen sie danach.</h2>
            <p className="text-lg text-gray-600 mt-4">
              In vielen Kliniken ist nicht „zu wenig Nachfrage“ das Problem – sondern der Alltag nach der Anfrage.
              <br />
              Zwischen Telefon, Terminen und Teamwechseln bleiben Kontakte liegen. Und wenn die Antwort zu spät kommt, bucht der Patient dort, wo es schneller und klarer
              wirkt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Antworten kommen zu spät",
                text: "Anfragen kommen abends, am Wochenende oder zwischen Terminen rein. Wenn die erste Rückmeldung erst Stunden später kommt, ist der Interessent oft schon weg."
              },
              {
                title: "Es gibt kein klares Nachfassen",
                text: "Viele sagen „wir melden uns“, aber es passiert nichts. Ohne festen Ablauf wird nicht konsequent nachgefasst – und aus einer Anfrage wird kein Termin."
              },
              {
                title: "Anfragen versanden im Alltag",
                text: "Infos landen in Postfächern, Notizen oder Chats. Am Ende ist nicht klar: Wer kümmert sich? Was ist der nächste Schritt?"
              }
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
                <p className="text-gray-600 mt-3">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 mt-8">
            Ergebnis: Ihr habt Anfragen – aber ihr macht zu wenig daraus. Genau dort setzen wir an.
          </p>
        </div>
      </div>
    </section>
  );
}