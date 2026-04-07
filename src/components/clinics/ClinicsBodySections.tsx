import React from "react";
import { ClinicsProblemSection } from "@/components/clinics/ClinicsProblemSection";
import { ClinicsSolutionSection } from "@/components/clinics/ClinicsSolutionSection";
import { ClinicsFlowSection } from "@/components/clinics/ClinicsFlowSection";
import { ClinicsExampleSection } from "@/components/clinics/ClinicsExampleSection";
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
      <ClinicsExampleSection onCtaClick={onCtaClick} />
      <ClinicsWhoItIsForSection />
      <ClinicsFaqSection />
    </>
  );
}