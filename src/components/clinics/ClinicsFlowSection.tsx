import React from "react";

export function ClinicsFlowSection() {
  return (
    <section id="ablauf" className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Der Ablauf – in 10 Sekunden klar</h2>
            <p className="text-lg text-gray-600 mt-4">
              Nach der Anfrage passiert sofort etwas – und niemand muss raten, was als Nächstes dran ist. So gehen weniger Anfragen im Alltag unter.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid sm:grid-cols-5 gap-3">
              {["Anfrage", "Sofort-Antwort", "Übersicht", "Nachfassen", "Termin"].map((label, idx) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                  <p className="text-xs font-semibold text-gray-500">Schritt {idx + 1}</p>
                  <p className="text-base font-bold text-black mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-2">
              <p className="text-sm text-gray-600">Anfrage → Sofort-Antwort → Übersicht → Nachfassen → Termin</p>
              <p className="text-sm text-gray-600">
                <span className="text-black font-medium">Nutzen:</span> schneller zurückmelden, weniger vergessen, mehr Termine aus den Anfragen, die heute schon reinkommen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}