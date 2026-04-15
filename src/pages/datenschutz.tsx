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
                <span className="text-lg sm:text-xl font-bold text-black">VincialMedia</span>
                <Badge className="bg-gray-100 text-black border-gray-200">Datenschutz</Badge>
              </div>
              <Link href="/">
                <Button variant="outline" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600">
                  Zurück
                </Button>
              </Link>
            </div>

            <div className="pt-8 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Datenschutzerklärung</h1>
                <p className="text-gray-600">
                  Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
                </p>
              </div>

              {/* Verantwortlicher */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Verantwortlicher</h2>
                <div className="text-gray-600 space-y-1">
                  <p className="font-semibold text-black">VincialMedia</p>
                  <p>Vincent Hänggi</p>
                  <p>Brandstrasse 21</p>
                  <p>8952 Schlieren, Schweiz</p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:vincent@vincialmedia.com" className="text-red-600 hover:underline">
                      vincent@vincialmedia.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hosting und Datenstandort */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Hosting und Datenstandort</h2>
                <p className="text-gray-600">
                  Unsere Website und die damit verbundenen Dienste werden auf Servern in der <strong>Schweiz</strong> und in <strong>Deutschland (Frankfurt)</strong> gehostet. 
                  Die Verarbeitung personenbezogener Daten erfolgt unter Einhaltung der geltenden Datenschutzgesetze, insbesondere des Schweizer Datenschutzgesetzes (DSG) und der Europäischen Datenschutz-Grundverordnung (DSGVO).
                </p>
              </div>

              {/* Erhobene Daten */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Welche Daten wir erheben</h2>
                <p className="text-gray-600">Wir erheben folgende Daten:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                  <li><strong>Kontaktformular-Daten:</strong> Vorname, Klinik/Firma, E-Mail-Adresse, Telefonnummer, Website (optional), aktuelle Situation</li>
                  <li><strong>Technische Daten:</strong> IP-Adresse, Browsertyp, Betriebssystem, Zugriffszeit, besuchte Seiten</li>
                  <li><strong>Nutzungsdaten:</strong> Interaktionen mit der Website, Klickverhalten, Verweildauer</li>
                </ul>
              </div>

              {/* Zweck der Datenverarbeitung */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Zweck der Datenverarbeitung</h2>
                <p className="text-gray-600">Wir verwenden Ihre Daten für folgende Zwecke:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                  <li>Bearbeitung und Beantwortung Ihrer Anfragen</li>
                  <li>Kontaktaufnahme im Zusammenhang mit Ihren Anfragen</li>
                  <li>Verbesserung unserer Website und Dienstleistungen</li>
                  <li>Analyse des Nutzerverhaltens zur Optimierung der Benutzererfahrung</li>
                  <li>Personalisierung von Inhalten und Empfehlungen</li>
                </ul>
              </div>

              {/* Google Analytics */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Google Analytics</h2>
                <p className="text-gray-600">
                  Diese Website nutzt Google Analytics, einen Webanalysedienst der Google LLC. Google Analytics verwendet Cookies, um die Nutzung der Website zu analysieren. 
                  Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                </p>
                <p className="text-gray-600">
                  Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung gekürzt wird.
                </p>
                <p className="text-gray-600">
                  Sie können die Erfassung durch Google Analytics verhindern, indem Sie ein Browser-Add-on zur Deaktivierung von Google Analytics installieren: 
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline ml-1">
                    https://tools.google.com/dlpage/gaoptout
                  </a>
                </p>
              </div>

              {/* HubSpot */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">HubSpot</h2>
                <p className="text-gray-600">
                  Wir verwenden HubSpot als Customer-Relationship-Management-System (CRM) zur Verwaltung von Kundenanfragen und zur Kommunikation. 
                  Wenn Sie ein Formular auf unserer Website ausfüllen, werden Ihre Daten an HubSpot übertragen und dort gespeichert.
                </p>
                <p className="text-gray-600">
                  HubSpot, Inc. ist ein US-amerikanisches Unternehmen und hat sich zur Einhaltung des EU-US Data Privacy Framework verpflichtet. 
                  Weitere Informationen zum Datenschutz bei HubSpot finden Sie unter:{" "}
                  <a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                    https://legal.hubspot.com/privacy-policy
                  </a>
                </p>
              </div>

              {/* KI und prädiktive Analyse */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Künstliche Intelligenz und prädiktive Analyse</h2>
                <p className="text-gray-600">
                  Auf unserer Website setzen wir eigene KI-gestützte Tools und prädiktive Analyseverfahren ein. Diese dienen dazu:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                  <li>Anfragen schneller zu bearbeiten und zu kategorisieren</li>
                  <li>Häufig gestellte Fragen automatisiert zu beantworten</li>
                  <li>Nutzerverhalten zu analysieren, um relevante Inhalte bereitzustellen</li>
                  <li>Vorhersagen über Nutzerbedürfnisse zu treffen und die Benutzererfahrung zu personalisieren</li>
                </ul>
                <p className="text-gray-600">
                  Die KI-Verarbeitung erfolgt auf Servern in der <strong>Schweiz</strong> und <strong>Deutschland (Frankfurt)</strong>. 
                  Es werden keine automatisierten Entscheidungen getroffen, die rechtliche Auswirkungen auf Sie haben. 
                  Bei Bedarf übernimmt jederzeit eine Person die weitere Bearbeitung.
                </p>
              </div>

              {/* Cookies */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Cookies</h2>
                <p className="text-gray-600">
                  Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden. 
                  Einige Cookies sind technisch notwendig, andere helfen uns, die Website zu verbessern und Ihr Nutzererlebnis zu personalisieren.
                </p>
                <p className="text-gray-600">
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden, oder Cookies generell ablehnen. 
                  Bitte beachten Sie, dass bei Deaktivierung von Cookies die Funktionalität dieser Website eingeschränkt sein kann.
                </p>
              </div>

              {/* Ihre Rechte */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Ihre Rechte</h2>
                <p className="text-gray-600">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                  <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre bei uns gespeicherten Daten verlangen.</li>
                  <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
                  <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</li>
                  <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
                  <li><strong>Datenübertragbarkeit:</strong> Sie können verlangen, dass wir Ihnen Ihre Daten in einem strukturierten, gängigen Format übermitteln.</li>
                  <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Um Ihre Rechte auszuüben, kontaktieren Sie uns bitte unter:{" "}
                  <a href="mailto:vincent@vincialmedia.com" className="text-red-600 hover:underline">
                    vincent@vincialmedia.com
                  </a>
                </p>
              </div>

              {/* Aufbewahrung */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Aufbewahrung von Daten</h2>
                <p className="text-gray-600">
                  Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung der jeweiligen Zwecke erforderlich ist oder wie es gesetzliche Aufbewahrungsfristen vorsehen. 
                  Kontaktanfragen werden in der Regel nach Abschluss der Bearbeitung und nach Ablauf allfälliger Gewährleistungsfristen gelöscht, sofern keine längere Aufbewahrung erforderlich ist.
                </p>
              </div>

              {/* Änderungen */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Änderungen dieser Datenschutzerklärung</h2>
                <p className="text-gray-600">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen. 
                  Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
              </div>

              {/* Stand */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Stand: April 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}