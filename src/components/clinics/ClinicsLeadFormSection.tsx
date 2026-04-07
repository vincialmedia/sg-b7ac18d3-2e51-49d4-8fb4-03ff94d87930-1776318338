import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClinicsLeadFormCard } from "@/components/clinics/ClinicsLeadFormCard";

interface ClinicsLeadFormSectionProps {
  calendarBookingUrl: string;
  imprintHref: string;
  privacyHref: string;
}

export function ClinicsLeadFormSection({ calendarBookingUrl, imprintHref, privacyHref }: ClinicsLeadFormSectionProps) {
  return (
    <section id="lead-form" className="px-4 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Kurze Demo anfragen</h2>
              <p className="text-lg text-gray-600 mt-4">
                Ein paar Angaben – damit ich die Demo auf eure Situation zuschneiden kann. Danach bekommst du eine klare Rückmeldung mit den nächsten Schritten.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-black mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-black">Antwort per E-Mail</p>
                    <p className="text-sm text-gray-600">Du erhältst eine kurze Rückmeldung und die nächsten Schritte.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-black mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-black">Oder kurz telefonisch</p>
                    <p className="text-sm text-gray-600">Wenn’s passt, klären wir in 10–15 Minuten die Basics.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-sm font-semibold text-black">Wichtig</p>
                <p className="text-sm text-gray-600 mt-2">
                  In der Demo schauen wir uns an, <span className="text-black font-medium">wo</span> Anfragen heute verloren gehen,{" "}
                  <span className="text-black font-medium">welcher Schritt</span> fehlt und wie ihr den Ablauf so baut, dass ihn das Team wirklich nutzt.
                </p>
              </div>
            </div>

            <div className="w-full">
              <ClinicsLeadFormCard calendarBookingUrl={calendarBookingUrl} />
            </div>
          </div>

          <footer className="max-w-7xl mx-auto mt-10 px-4 pb-10">
            <div className="w-[90%] mx-auto border-t border-gray-200 pt-8 text-center">
              <h3 className="text-2xl font-bold text-black mb-2">Vincialmedia</h3>
              <p className="text-gray-600 mb-6">Lead-Systeme für Termin-Kliniken • Follow-up • Pipeline</p>

              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <Badge className="bg-gray-100 text-black border-gray-200">Lead Conversion</Badge>
                <Badge className="bg-gray-100 text-black border-gray-200">Follow-up</Badge>
                <Badge className="bg-gray-100 text-black border-gray-200">Pipeline</Badge>
              </div>

              <div className="flex justify-center gap-6 text-sm text-gray-600">
                <Link href={imprintHref} className="hover:text-black transition-colors">
                  Impressum
                </Link>
                <Link href={privacyHref} className="hover:text-black transition-colors">
                  Datenschutz
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}