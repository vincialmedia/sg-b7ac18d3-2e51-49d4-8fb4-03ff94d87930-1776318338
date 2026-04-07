import React from "react";

const targetGroups = [
  {
    title: "Ästhetische Kliniken",
    text: "Viele Anfragen brauchen Beratung und Vertrauen. Wer schnell und ruhig antwortet, wird als professionell wahrgenommen – und bekommt eher den Termin."
  },
  {
    title: "Laser-Kliniken",
    text: "Viele Erstkontakte mit ähnlichen Fragen. Wenn niemand sauber nachfasst, springt der Interessent ab. Ein klarer Ablauf bringt Ruhe ins Team."
  },
  {
    title: "Premium-Zahnmedizin / Zahnkliniken",
    text: "Termine sind planbar, aber wertvoll. Ein sauberer Erstkontakt und klares Nachfassen reduziert Absagen und bringt mehr Gespräche in den Kalender."
  },
  {
    title: "Beauty / Cosmetic Anbieter",
    text: "Viele Interessenten sind unentschlossen. Wenn nach der Anfrage nichts passiert, sind sie weg. Erinnerungen und klare Schritte holen Termine zurück."
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
              Wenn bei euch regelmässig Anfragen reinkommen, aber nicht jede sauber zu Ende geführt wird, ist das hier meist der grösste Hebel: schneller reagieren, klar
              nachfassen, weniger vergessen.
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

          <p className="text-sm text-gray-600 mt-8">
            Passt das zu euch? Dann frag kurz an – in der Demo klären wir schnell, ob und wie man das bei euch sauber aufsetzen kann.
          </p>
        </div>
      </div>
    </section>
  );
}