import Head from "next/head";
import { ClinicsHero } from "@/components/clinics/ClinicsHero";
import { ClinicsBodySections } from "@/components/clinics/ClinicsBodySections";
import { ClinicsLeadFormSection } from "@/components/clinics/ClinicsLeadFormSection";

const SEO_TITLE = "Mehr Anfragen zu echten Terminen machen | VincialMedia";
const META_DESCRIPTION =
  "Wir helfen Kliniken, schneller auf Anfragen zu reagieren, klar nachzufassen und weniger Interessenten zu verlieren – damit aus mehr Anfragen echte Termine werden.";
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
        <ClinicsHero onPrimaryCtaClick={() => scrollToSection("lead-form")} onSecondaryCtaClick={() => scrollToSection("ablauf")} />
        <ClinicsBodySections onCtaClick={() => scrollToSection("lead-form")} />
        <ClinicsLeadFormSection calendarBookingUrl={CALENDAR_BOOKING_URL} imprintHref={IMPRINT_HREF} privacyHref={PRIVACY_HREF} />
      </main>
    </>
  );
}