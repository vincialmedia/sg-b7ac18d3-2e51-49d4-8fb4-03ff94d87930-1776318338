import React from "react";

const targetGroups = [
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
];

export function ClinicsWhoItIsForSection() {
  return (
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
  );
}