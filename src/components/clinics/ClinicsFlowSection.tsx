import React from "react";

export function ClinicsFlowSection() {
  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Der Ablauf – in 10 Sekunden verständlich</h2>
            <p className="text-lg text-gray-600 mt-4">Jede Anfrage hat immer einen nächsten Schritt. Nichts bleibt „irgendwo“ hängen.</p>
          </div>

          <div className="mt-10">
            <div className="grid sm:grid-cols-5 gap-3">
              {["Anfrage", "Sofort-Antwort", "Pipeline", "Follow-up", "Termin"].map((label, idx) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                  <p className="text-xs font-semibold text-gray-500">Step {idx + 1}</p>
                  <p className="text-base font-bold text-black mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-2">
              <p className="text-sm text-gray-600">Anfrage → Sofort-Antwort → Pipeline → Follow-up → Termin</p>
              <p className="text-sm text-gray-600">
                <span className="text-black font-medium">Ergebnis:</span> schnellere Reaktion nach aussen, klare Zuständigkeit nach innen – und weniger Lead-Verlust im
                Tagesgeschäft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}