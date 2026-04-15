import Head from "next/head";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SEO_TITLE = "Impressum | VincialMedia";

export default function ImpressumPage() {
  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="flex items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-black">VincialMedia</span>
                <Badge className="bg-gray-100 text-black border-gray-200">Info</Badge>
              </div>
              <Link href="/">
                <Button variant="outline" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600">
                  Zurück
                </Button>
              </Link>
            </div>

            <div className="pt-8 space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold text-black">Impressum</h1>
              
              <p className="text-sm text-gray-500">
                Angaben gemäss Art. 3 Abs. 1 lit. s UWG (Schweiz)
              </p>

              {/* Company Info */}
              <div className="space-y-1">
                <p className="text-base font-semibold text-black">VincialMedia</p>
                <p className="text-base text-gray-700">Vincent Hänggi</p>
                <p className="text-base text-gray-700">Brandstrasse 21</p>
                <p className="text-base text-gray-700">8952 Schlieren</p>
                <p className="text-base text-gray-700">Schweiz</p>
              </div>

              <div>
                <p className="text-base text-gray-700">
                  E-Mail: <a href="mailto:vincent@vincialmedia.com" className="text-black underline hover:text-red-600 transition-colors">vincent@vincialmedia.com</a>
                </p>
              </div>

              <hr className="border-gray-200" />

              {/* Authorized Representative */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-black">Vertretungsberechtigte Person</h2>
                <p className="text-base text-gray-700">Vincent Hänggi</p>
              </div>

              <hr className="border-gray-200" />

              {/* Commercial Register */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-black">Handelsregister</h2>
                <p className="text-base text-gray-700">Nicht im Handelsregister eingetragen</p>
              </div>

              <hr className="border-gray-200" />

              {/* Disclaimer */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-black">Haftungsausschluss</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>

              <hr className="border-gray-200" />

              {/* Copyright */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-black">Urheberrechte</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}