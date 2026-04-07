import Head from "next/head";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SEO_TITLE = "Datenschutz | VincialMedia";

export default function DatenschutzPage() {
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
                <span className="text-lg sm:text-xl font-bold text-black">Vincialmedia</span>
                <Badge className="bg-gray-100 text-black border-gray-200">Info</Badge>
              </div>
              <Link href="/">
                <Button variant="outline" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600">
                  Zurueck
                </Button>
              </Link>
            </div>

            <div className="pt-8 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-black">Datenschutz</h1>
              <p className="text-gray-600">
                Platzhalter-Seite. Bitte ersetze diesen Inhalt mit deiner Datenschutzerklaerung (inkl. Hinweis zu Formularen/E-Mail Versand, Hosting und ggf. spaeterem Tracking).
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-black">Welche Daten wir erheben</p>
                  <p className="text-sm text-gray-600">Kontaktangaben aus dem Demo-Formular (Vorname, Klinik/Firma, E-Mail, Telefon, Website optional, Status).</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Wofuer</p>
                  <p className="text-sm text-gray-600">Bearbeitung der Anfrage und Kontaktaufnahme.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Aufbewahrung</p>
                  <p className="text-sm text-gray-600">Bitte definieren (z. B. Loeschfristen / CRM).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}