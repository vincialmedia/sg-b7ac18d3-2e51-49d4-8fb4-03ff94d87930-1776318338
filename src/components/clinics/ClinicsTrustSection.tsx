import React from "react";

export function ClinicsTrustSection() {
  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Vertrauen & Einordnung</h2>
            <p className="text-lg text-gray-600 mt-4">
              Diese Seite ist bewusst fokussiert: kein Portfolio, keine Spielereien. Ziel ist ein sauberer Erstkontakt und ein klarer nächster Schritt.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-500">Testimonial (Platzhalter)</p>
              <p className="text-base text-black mt-3 leading-relaxed">
                „Nach der Umstellung ist klar, wer wann antwortet. Anfragen gehen nicht mehr unter – und aus mehr Kontakten werden tatsächlich Termine.“
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-black">Name folgt</p>
                <p className="text-sm text-gray-600">Position / Klinik</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-gray-500">Case Study (Platzhalter)</p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-black">Ausgangslage</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Viele Anfragen über mehrere Kanäle, unklare Zuständigkeit, Follow-up passiert „wenn Zeit ist“.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">Umsetzung</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Sofort-Antwort, klare Pipeline-Status, Follow-up Rhythmus (Tag 1/3/7), Übergabe-Regeln im Team.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">Resultat</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Schnellere Reaktion, weniger offene Enden, ruhigere interne Abläufe – und mehr gebuchte Gespräche aus bestehenden Anfragen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Hinweis: Platzhalter – echte Referenzen/Beispiele kann ich dir in der Demo zeigen, sobald du kurz anfragst.
          </p>
        </div>
      </div>
    </section>
  );
}