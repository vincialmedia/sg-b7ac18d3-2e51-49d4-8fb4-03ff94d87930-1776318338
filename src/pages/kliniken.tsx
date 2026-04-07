import Head from "next/head";
import { ClinicsHero } from "@/components/clinics/ClinicsHero";
import { ClinicsBodySections } from "@/components/clinics/ClinicsBodySections";
import { ClinicsLeadFormSection } from "@/components/clinics/ClinicsLeadFormSection";

const SEO_TITLE = "Lead-System für Kliniken | VincialMedia";
const META_DESCRIPTION =
  "Wir helfen Kliniken, mehr Anfragen in echte Termine umzuwandeln – mit Sofort-Antworten, Follow-up und klarer Lead-Struktur.";
const CANONICAL_URL = "https://vincialmedia.com/kliniken";

const CALENDAR_BOOKING_URL = "";

const IMPRINT_HREF = "/impressum";
const PRIVACY_HREF = "/datenschutz";

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ClinicsLandingPage() {
  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="canonical" href={CANONICAL_URL} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white overflow-x-hidden">
        <ClinicsHero onPrimaryCtaClick={() => scrollToSection("lead-form")} onSecondaryCtaClick={() => scrollToSection("beispiel")} />
        <ClinicsBodySections onCtaClick={() => scrollToSection("lead-form")} />
        <ClinicsLeadFormSection calendarBookingUrl={CALENDAR_BOOKING_URL} imprintHref={IMPRINT_HREF} privacyHref={PRIVACY_HREF} />
      </main>
    </>
  );
}