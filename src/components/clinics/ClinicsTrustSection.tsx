import React from "react";

export function ClinicsTrustSection() {
  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Vertrauen & Vorgehen</h2>
            <p className="text-lg text-gray-600 mt-4">
              Kein grosses Projekt, keine Spielereien. Wir machen euren Ablauf nach der Anfrage klarer – damit weniger liegen bleibt.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-500">Referenz (Platzhalter)</p>
              <p className="text-base text-black mt-3 leading-relaxed">
                „Seit wir schneller antworten und konsequent nachfassen, geht viel weniger unter. Das Team weiss, was zu tun ist – und mehr Anfragen werden zu Terminen.“
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-black">Name folgt</p>
                <p className="text-sm text-gray-600">Position / Klinik</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-500">Kurzbeispiel (Platzhalter)</p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-black">Vorher</p>
                  <p className="text-sm text-gray-600 mt-1">Anfragen über mehrere Kanäle, Rückfragen, niemand weiss genau, was als Nächstes passiert.</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">Nachher</p>
                  <p className="text-sm text-gray-600 mt-1">Sofortige Rückmeldung, klare Übersicht, ruhiges Nachfassen, Erinnerungen vor dem Termin.</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">Ergebnis</p>
                  <p className="text-sm text-gray-600 mt-1">Weniger verpasste Anfragen, weniger Chaos im Alltag, mehr gebuchte Gespräche.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Hinweis: Platzhalter – echte Beispiele/Referenzen zeige ich dir gerne im Gespräch, wenn du kurz anfragst.
          </p>
        </div>
      </div>
    </section>
  );
}