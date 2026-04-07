import React from "react";
import { ClinicsProblemSection } from "@/components/clinics/ClinicsProblemSection";
import { ClinicsSolutionSection } from "@/components/clinics/ClinicsSolutionSection";
import { ClinicsFlowSection } from "@/components/clinics/ClinicsFlowSection";
import { ClinicsTrustSection } from "@/components/clinics/ClinicsTrustSection";
import { ClinicsWhoItIsForSection } from "@/components/clinics/ClinicsWhoItIsForSection";
import { ClinicsFaqSection } from "@/components/clinics/ClinicsFaqSection";

interface ClinicsBodySectionsProps {
  onCtaClick: () => void;
}

export function ClinicsBodySections({ onCtaClick }: ClinicsBodySectionsProps) {
  return (
    <>
      <ClinicsProblemSection />
      <ClinicsSolutionSection onCtaClick={onCtaClick} />
      <ClinicsFlowSection />
      <ClinicsTrustSection />
      <ClinicsWhoItIsForSection />
      <ClinicsFaqSection />
    </>
  );
}