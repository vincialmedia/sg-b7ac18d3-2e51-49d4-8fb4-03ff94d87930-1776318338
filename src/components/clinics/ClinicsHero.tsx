import Link from "next/link";
import { ArrowRight, ChevronRight, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ClinicsHeroProps {
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick: () => void;
}

export function ClinicsHero({ onPrimaryCtaClick, onSecondaryCtaClick }: ClinicsHeroProps) {
  return (
    <section className="px-4 pt-6 pb-16 md:pt-8 md:pb-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 mt-6">
          <div className="flex items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold text-black">Vincialmedia</span>
              <Badge className="bg-gray-100 text-black border-gray-200 hidden sm:inline-flex">Kliniken</Badge>
            </Link>

            <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1">
              Hauptseite
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="pt-10 md:pt-14">
            <div className="max-w-3xl">
              <Badge className="bg-black text-white border-0 inline-flex items-center hover:bg-red-600 transition-colors duration-300">
                <Stethoscope className="mr-2" size={14} />
                Mehr Termine aus bestehenden Anfragen
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black mt-6">
                Mehr Anfragen zu echten Terminen machen
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mt-6">
                Wir helfen ästhetischen und terminbasierten Kliniken, <span className="font-medium text-black">schneller zu reagieren</span>,{" "}
                <span className="font-medium text-black">klar nachzufassen</span> und <span className="font-medium text-black">weniger Anfragen zu verlieren</span>.
                Damit aus mehr Interessenten wirklich Termine werden.
              </p>

              <p className="text-sm text-gray-600 mt-3">
                Für ästhetische Kliniken, Laser-Kliniken, Beauty/Cosmetic Anbieter, Premium-Zahnmedizin und ähnliche Terminanbieter.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={onPrimaryCtaClick}
                  className="w-full sm:w-auto bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                >
                  Kurze Demo anfragen
                  <ArrowRight className="ml-2" size={18} />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={onSecondaryCtaClick}
                  className="w-full sm:w-auto bg-white border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-300 inline-flex items-center justify-center"
                >
                  So funktioniert es
                </Button>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                <span className="text-black font-medium">Was passiert als Nächstes:</span> 10–15 Minuten Call. Wir schauen kurz auf euren Ablauf – und du bekommst eine
                klare Einschätzung, ob das bei euch Sinn macht.
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Ohne Fachbegriffe, ohne Software-Zwang. Einfach: schneller antworten, nichts vergessen, mehr Termine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}