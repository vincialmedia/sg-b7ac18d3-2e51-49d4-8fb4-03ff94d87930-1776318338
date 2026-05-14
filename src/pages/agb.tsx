import Head from "next/head";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SEO_TITLE = "AGB | VincialMedia";

export default function AGBPage() {
  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="flex items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold text-black">VincialMedia</span>
                <Badge className="bg-gray-100 text-black border-gray-200">AGB</Badge>
              </div>
              <Link href="/">
                <Button variant="outline" className="bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600">
                  Zurück
                </Button>
              </Link>
            </div>

            <div className="pt-8 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Allgemeine Geschäftsbedingungen (AGB)
                </h1>
                <p className="text-sm text-gray-500">Stand: Mai 2026</p>
              </div>

              {/* 1. Geltungsbereich */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">1. Geltungsbereich</h2>
                <p className="text-gray-600">
                  <strong>1.1</strong> Diese Allgemeinen Geschäftsbedingungen (nachfolgend «AGB») gelten für sämtliche Verträge zwischen Vincent Hänggi, handelnd unter der Bezeichnung VincialMedia (nachfolgend «VincialMedia», «wir» oder «uns»), und Auftraggebern (nachfolgend «Kunde» oder «Sie») über die Erbringung digitaler Dienstleistungen.
                </p>
                <p className="text-gray-600">
                  <strong>1.2</strong> VincialMedia richtet sich ausschliesslich an Unternehmen, juristische Personen des öffentlichen Rechts und öffentlich-rechtliche Sondervermögen. Verträge mit Konsumenten werden nicht abgeschlossen.
                </p>
                <p className="text-gray-600">
                  <strong>1.3</strong> Abweichende, entgegenstehende oder ergänzende Geschäftsbedingungen des Kunden werden nur dann und insoweit Vertragsbestandteil, als wir ihrer Geltung ausdrücklich schriftlich zugestimmt haben.
                </p>
              </div>

              {/* 2. Vertragsgegenstand und Leistungsumfang */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">2. Vertragsgegenstand und Leistungsumfang</h2>
                <p className="text-gray-600">
                  <strong>2.1</strong> VincialMedia erbringt Dienstleistungen in den Bereichen Webdesign und Webentwicklung, Social Media Management, Marketing Automation, KI-gestützte Systeme sowie damit verbundene Beratungs- und Strategieleistungen.
                </p>
                <p className="text-gray-600">
                  <strong>2.2</strong> Der konkrete Leistungsumfang ergibt sich aus dem schriftlichen Angebot, der Auftragsbestätigung oder dem individuellen Projektvertrag («Einzelvereinbarung»). Bei Widersprüchen zwischen Einzelvereinbarung und diesen AGB gehen die Bestimmungen der Einzelvereinbarung vor.
                </p>
                <p className="text-gray-600">
                  <strong>2.3</strong> VincialMedia ist berechtigt, zur Erbringung der Leistungen Subunternehmer und Dienstleister beizuziehen.
                </p>
              </div>

              {/* 3. Vertragsschluss */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">3. Vertragsschluss</h2>
                <p className="text-gray-600">
                  <strong>3.1</strong> Angebote von VincialMedia sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
                </p>
                <p className="text-gray-600">
                  <strong>3.2</strong> Ein Vertrag kommt zustande durch schriftliche Auftragsbestätigung von VincialMedia, durch Unterzeichnung einer Einzelvereinbarung oder durch Aufnahme der Leistungserbringung.
                </p>
                <p className="text-gray-600">
                  <strong>3.3</strong> Mündliche Nebenabreden bestehen nicht. Änderungen und Ergänzungen bedürfen der Schriftform; dies gilt auch für die Aufhebung des Schriftformerfordernisses. Die Textform (E-Mail) ist hierbei der Schriftform gleichgestellt.
                </p>
              </div>

              {/* 4. Mitwirkungspflichten des Kunden */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">4. Mitwirkungspflichten des Kunden</h2>
                <p className="text-gray-600">
                  <strong>4.1</strong> Der Kunde stellt VincialMedia rechtzeitig, vollständig und in geeigneter Form sämtliche Informationen, Inhalte, Materialien, Texte, Bilder, Logos, Zugangsdaten und Freigaben zur Verfügung, die zur Erbringung der vereinbarten Leistungen erforderlich sind.
                </p>
                <p className="text-gray-600">
                  <strong>4.2</strong> Der Kunde garantiert, dass er an sämtlichen von ihm bereitgestellten Inhalten und Materialien die erforderlichen Rechte besitzt und dass deren Verwendung weder Rechte Dritter (insbesondere Urheber-, Persönlichkeits- oder Markenrechte) noch geltendes Recht verletzt.
                </p>
                <p className="text-gray-600">
                  <strong>4.3</strong> Verzögert sich die Leistungserbringung aufgrund mangelnder Mitwirkung des Kunden, verlängern sich vereinbarte Termine entsprechend. Daraus resultierende Mehraufwände werden nach Aufwand zu unserem jeweils gültigen Stundensatz berechnet.
                </p>
              </div>

              {/* 5. Vergütung und Zahlungsbedingungen */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">5. Vergütung und Zahlungsbedingungen</h2>
                <p className="text-gray-600">
                  <strong>5.1</strong> Sämtliche Preise verstehen sich in Schweizer Franken (CHF) und exklusive der gesetzlichen Mehrwertsteuer, sofern nicht ausdrücklich anders ausgewiesen.
                </p>
                <p className="text-gray-600">
                  <strong>5.2</strong> Die im Angebot oder in der Einzelvereinbarung genannten Preise sind verbindlich. Zusätzliche Leistungen, die nicht im vereinbarten Umfang enthalten sind, werden gesondert in Rechnung gestellt.
                </p>
                <p className="text-gray-600">
                  <strong>5.3</strong> Bei Projektaufträgen sind 50 % der vereinbarten Vergütung bei Vertragsschluss und der Restbetrag nach Abnahme bzw. Lieferung zur Zahlung fällig, sofern nichts anderes vereinbart wurde.
                </p>
                <p className="text-gray-600">
                  <strong>5.4</strong> Bei laufenden Dienstleistungen (z. B. Social Media Betreuung, Marketing Automation Betrieb) erfolgt die Rechnungsstellung monatlich im Voraus.
                </p>
                <p className="text-gray-600">
                  <strong>5.5</strong> Rechnungen sind innert 14 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug ist VincialMedia berechtigt, einen Verzugszins von 5 % p. a. sowie Mahngebühren von CHF 30.– pro Mahnung zu erheben.
                </p>
                <p className="text-gray-600">
                  <strong>5.6</strong> Bei Zahlungsverzug von mehr als 30 Tagen ist VincialMedia berechtigt, die Erbringung der Leistungen einzustellen, bis sämtliche fälligen Forderungen beglichen sind. Daraus entstehende Verzögerungen gehen zulasten des Kunden.
                </p>
              </div>

              {/* 6. Termine und Lieferzeiten */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">6. Termine und Lieferzeiten</h2>
                <p className="text-gray-600">
                  <strong>6.1</strong> Vereinbarte Termine sind nur dann verbindlich, wenn sie ausdrücklich als verbindlich bezeichnet wurden. Im Übrigen handelt es sich um voraussichtliche Termine.
                </p>
                <p className="text-gray-600">
                  <strong>6.2</strong> Termine verlängern sich angemessen bei Ereignissen höherer Gewalt sowie bei Verzögerungen, die der Kunde zu vertreten hat (insbesondere durch verspätete Zulieferungen, Freigaben oder Mitwirkungshandlungen).
                </p>
              </div>

              {/* 7. Abnahme */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">7. Abnahme</h2>
                <p className="text-gray-600">
                  <strong>7.1</strong> Bei Werkleistungen (insbesondere Webentwicklung, Designarbeiten) ist der Kunde verpflichtet, die Leistung unverzüglich nach Lieferung zu prüfen und allfällige Mängel innert 10 Tagen schriftlich zu rügen.
                </p>
                <p className="text-gray-600">
                  <strong>7.2</strong> Erfolgt innert dieser Frist keine Mängelrüge, gilt die Leistung als abgenommen. Gleiches gilt bei produktiver Nutzung der Leistung durch den Kunden.
                </p>
              </div>

              {/* 8. Gewährleistung */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">8. Gewährleistung</h2>
                <p className="text-gray-600">
                  <strong>8.1</strong> VincialMedia gewährleistet, dass die erbrachten Leistungen den vertraglich vereinbarten Spezifikationen entsprechen.
                </p>
                <p className="text-gray-600">
                  <strong>8.2</strong> Bei berechtigten und fristgerecht gerügten Mängeln hat VincialMedia das Recht zur Nachbesserung. Schlägt die Nachbesserung trotz mindestens zwei Versuchen fehl, kann der Kunde eine angemessene Herabsetzung der Vergütung verlangen oder vom Vertrag zurücktreten.
                </p>
                <p className="text-gray-600">
                  <strong>8.3</strong> Eine Gewährleistung für Drittsoftware, Open-Source-Komponenten, Hosting-Dienste oder von Dritten betriebene Plattformen (z. B. Meta, Google, HubSpot, Make.com, OpenAI, Anthropic) ist ausgeschlossen. Hier gelten die Geschäftsbedingungen der jeweiligen Anbieter.
                </p>
                <p className="text-gray-600">
                  <strong>8.4</strong> VincialMedia übernimmt keine Gewähr dafür, dass durch die erbrachten Leistungen ein bestimmter wirtschaftlicher Erfolg, eine bestimmte Reichweite oder eine bestimmte Conversion-Rate erzielt wird.
                </p>
              </div>

              {/* 9. Haftung */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">9. Haftung</h2>
                <p className="text-gray-600">
                  <strong>9.1</strong> VincialMedia haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Personenschäden.
                </p>
                <p className="text-gray-600">
                  <strong>9.2</strong> Im Übrigen ist die Haftung von VincialMedia für leicht fahrlässig verursachte Schäden ausgeschlossen, soweit dies gesetzlich zulässig ist. Bei Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, bei Vertragsschluss vorhersehbaren Schaden begrenzt, höchstens jedoch auf die Höhe der vom Kunden für die betreffende Leistung gezahlten Vergütung.
                </p>
                <p className="text-gray-600">
                  <strong>9.3</strong> Die Haftung für mittelbare Schäden, Folgeschäden, entgangenen Gewinn, Datenverlust, Betriebsunterbrechungen und ähnliche Vermögensschäden ist im Rahmen des gesetzlich Zulässigen ausgeschlossen.
                </p>
                <p className="text-gray-600">
                  <strong>9.4</strong> VincialMedia haftet nicht für Schäden, die durch Ausfälle, Fehler oder Änderungen von Drittanbieterdiensten entstehen, auf die kein Einfluss besteht.
                </p>
              </div>

              {/* 10. Urheber- und Nutzungsrechte */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">10. Urheber- und Nutzungsrechte</h2>
                <p className="text-gray-600">
                  <strong>10.1</strong> Sämtliche von VincialMedia im Rahmen der Vertragserfüllung geschaffenen Werke (Designs, Quellcode, Konzepte, Texte, Strategien, Automatisierungs-Workflows) bleiben bis zur vollständigen Bezahlung der vereinbarten Vergütung Eigentum von VincialMedia.
                </p>
                <p className="text-gray-600">
                  <strong>10.2</strong> Mit vollständiger Bezahlung erhält der Kunde ein nicht-exklusives, zeitlich und räumlich unbeschränktes Nutzungsrecht für den vertraglich vereinbarten Verwendungszweck.
                </p>
                <p className="text-gray-600">
                  <strong>10.3</strong> Eine Übertragung oder Unterlizenzierung an Dritte ist nur mit vorheriger schriftlicher Zustimmung von VincialMedia zulässig.
                </p>
                <p className="text-gray-600">
                  <strong>10.4</strong> VincialMedia ist berechtigt, die für den Kunden erbrachten Leistungen zu Referenzzwecken auf der eigenen Website, in Portfolios und in Marketingmaterialien namentlich zu nennen und visuell darzustellen, sofern keine berechtigten Geheimhaltungsinteressen des Kunden entgegenstehen. Der Kunde kann dieser Nutzung jederzeit schriftlich widersprechen.
                </p>
                <p className="text-gray-600">
                  <strong>10.5</strong> An vom Kunden bereitgestellten Inhalten erwirbt VincialMedia ausschliesslich die für die Vertragsdurchführung notwendigen Nutzungsrechte.
                </p>
              </div>

              {/* 11. Vertraulichkeit */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">11. Vertraulichkeit</h2>
                <p className="text-gray-600">
                  <strong>11.1</strong> Beide Parteien verpflichten sich, alle ihnen im Rahmen der Geschäftsbeziehung bekannt gewordenen vertraulichen Informationen der jeweils anderen Partei vertraulich zu behandeln und nicht an Dritte weiterzugeben.
                </p>
                <p className="text-gray-600">
                  <strong>11.2</strong> Diese Verpflichtung gilt auch nach Beendigung der Geschäftsbeziehung fort.
                </p>
                <p className="text-gray-600">
                  <strong>11.3</strong> Ausgenommen sind Informationen, die öffentlich bekannt sind oder ohne Verschulden der empfangenden Partei werden, die der empfangenden Partei bereits vor Mitteilung bekannt waren oder deren Offenlegung aufgrund gesetzlicher oder behördlicher Anordnung erforderlich ist.
                </p>
              </div>

              {/* 12. Datenschutz */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">12. Datenschutz</h2>
                <p className="text-gray-600">
                  <strong>12.1</strong> VincialMedia verarbeitet personenbezogene Daten ausschliesslich im Einklang mit dem Schweizerischen Datenschutzgesetz (DSG) sowie, soweit anwendbar, der EU-Datenschutz-Grundverordnung (DSGVO).
                </p>
                <p className="text-gray-600">
                  <strong>12.2</strong> Einzelheiten zur Datenverarbeitung ergeben sich aus der Datenschutzerklärung von VincialMedia, abrufbar unter{" "}
                  <Link href="/datenschutz" className="text-red-600 hover:underline">
                    https://www.vincialmedia.com/datenschutz
                  </Link>
                  .
                </p>
                <p className="text-gray-600">
                  <strong>12.3</strong> Soweit VincialMedia personenbezogene Daten im Auftrag des Kunden verarbeitet (Auftragsverarbeitung), schliessen die Parteien einen separaten Auftragsverarbeitungsvertrag (AVV).
                </p>
              </div>

              {/* 13. Vertragsdauer und Kündigung */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">13. Vertragsdauer und Kündigung</h2>
                <p className="text-gray-600">
                  <strong>13.1</strong> Projektverträge enden mit Erbringung und Abnahme der vereinbarten Leistungen.
                </p>
                <p className="text-gray-600">
                  <strong>13.2</strong> Verträge über laufende Dienstleistungen werden auf unbestimmte Zeit geschlossen und können von beiden Parteien mit einer Frist von 30 Tagen zum Ende eines Kalendermonats schriftlich gekündigt werden, sofern in der Einzelvereinbarung keine andere Frist vorgesehen ist.
                </p>
                <p className="text-gray-600">
                  <strong>13.3</strong> Das Recht zur ausserordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei wiederholtem Zahlungsverzug, schwerwiegenden Vertragsverletzungen oder bei Eröffnung des Konkursverfahrens über das Vermögen einer Partei.
                </p>
              </div>

              {/* 14. Höhere Gewalt */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">14. Höhere Gewalt</h2>
                <p className="text-gray-600">
                  <strong>14.1</strong> Keine Partei haftet für die Nichterfüllung ihrer Verpflichtungen, soweit diese auf Ereignissen höherer Gewalt beruht. Als höhere Gewalt gelten insbesondere Naturkatastrophen, Krieg, Terroranschläge, Pandemien, Streiks, behördliche Anordnungen sowie grossflächige Ausfälle der Internet- oder Energieinfrastruktur.
                </p>
                <p className="text-gray-600">
                  <strong>14.2</strong> Dauert ein Ereignis höherer Gewalt länger als 60 Tage an, sind beide Parteien berechtigt, den Vertrag schriftlich zu kündigen.
                </p>
              </div>

              {/* 15. Schlussbestimmungen */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">15. Schlussbestimmungen</h2>
                <p className="text-gray-600">
                  <strong>15.1</strong> Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchsetzbar sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                </p>
                <p className="text-gray-600">
                  <strong>15.2</strong> Auf das Vertragsverhältnis findet ausschliesslich Schweizer Recht unter Ausschluss des Übereinkommens der Vereinten Nationen über Verträge über den internationalen Warenkauf (CISG) Anwendung.
                </p>
                <p className="text-gray-600">
                  <strong>15.3</strong> Ausschliesslicher Gerichtsstand für sämtliche Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist Zürich, Schweiz. VincialMedia ist jedoch berechtigt, den Kunden auch an dessen Sitz zu klagen.
                </p>
                <p className="text-gray-600">
                  <strong>15.4</strong> VincialMedia behält sich vor, diese AGB jederzeit zu ändern. Bei laufenden Verträgen werden Änderungen dem Kunden schriftlich mitgeteilt; widerspricht der Kunde nicht innert 30 Tagen, gelten die geänderten AGB als angenommen.
                </p>
              </div>

              {/* Kontakt */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-bold text-black">Kontakt</h2>
                <div className="text-gray-600 space-y-1">
                  <p className="font-semibold text-black">VincialMedia</p>
                  <p>Vincent Hänggi</p>
                  <p>Brandstrasse 21</p>
                  <p>8952 Schlieren, Schweiz</p>
                </div>
                <div className="text-gray-600">
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:vincent@vincialmedia.com" className="text-red-600 hover:underline">
                      vincent@vincialmedia.com
                    </a>
                  </p>
                  <p>
                    Telefon:{" "}
                    <a href="tel:+41796891420" className="text-red-600 hover:underline">
                      +41 79 689 14 20
                    </a>
                  </p>
                </div>
              </div>

              {/* Stand */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Diese AGB wurden zuletzt aktualisiert im Mai 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
