import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type InquiryHandlingOption = "manual" | "slow" | "no-followup" | "unknown";

interface ClinicsLeadPayload {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  inquiryHandling: InquiryHandlingOption;
  sourcePage: string;
  sourceType: string;
  submittedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

interface ClinicsLeadFormValues {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  inquiryHandling: InquiryHandlingOption | "";
}

interface TrackingFields {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

interface ClinicsLeadFormCardProps {
  calendarBookingUrl: string;
}

const SOURCE_PAGE = "/kliniken";
const SOURCE_TYPE = "outreach";

function getInquiryHandlingLabel(value: InquiryHandlingOption): string {
  switch (value) {
    case "manual":
      return "Wir antworten manuell";
    case "slow":
      return "Eher langsam / uneinheitlich";
    case "no-followup":
      return "Kein klares Nachfassen";
    case "unknown":
      return "Weiss nicht genau";
  }
}

function buildPayload(values: ClinicsLeadFormValues, tracking: TrackingFields, submittedAt: string): ClinicsLeadPayload {
  return {
    firstName: values.firstName.trim(),
    company: values.company.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    website: values.website.trim() || undefined,
    inquiryHandling: values.inquiryHandling as InquiryHandlingOption,
    sourcePage: SOURCE_PAGE,
    sourceType: SOURCE_TYPE,
    submittedAt,
    utmSource: tracking.utmSource || undefined,
    utmMedium: tracking.utmMedium || undefined,
    utmCampaign: tracking.utmCampaign || undefined
  };
}

export function ClinicsLeadFormCard({ calendarBookingUrl }: ClinicsLeadFormCardProps) {
  const [values, setValues] = useState<ClinicsLeadFormValues>({
    firstName: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    inquiryHandling: ""
  });

  const [tracking, setTracking] = useState<TrackingFields>({
    utmSource: "",
    utmMedium: "",
    utmCampaign: ""
  });

  const [clientSubmittedAt, setClientSubmittedAt] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTracking({
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || ""
    });
  }, []);

  const inquiryHandlingLabel = useMemo(() => {
    if (!values.inquiryHandling) return "";
    return getInquiryHandlingLabel(values.inquiryHandling as InquiryHandlingOption);
  }, [values.inquiryHandling]);

  async function handleSubmit() {
    setSubmitError("");

    if (!values.firstName.trim()) return setSubmitError("Bitte Vorname ausfüllen.");
    if (!values.company.trim()) return setSubmitError("Bitte Klinik / Firma ausfüllen.");
    if (!values.email.trim()) return setSubmitError("Bitte E-Mail ausfüllen.");
    if (!values.phone.trim()) return setSubmitError("Bitte Telefonnummer ausfüllen.");
    if (!values.inquiryHandling) return setSubmitError("Bitte eine Option wählen.");

    const submittedAt = new Date().toISOString();
    setClientSubmittedAt(submittedAt);

    setIsSubmitting(true);
    try {
      const payload = buildPayload(values, tracking, submittedAt);

      const response = await fetch("/api/clinics-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setSubmitError(result.message || "Unerwarteter Fehler beim Senden. Bitte kurz später nochmals versuchen.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setSubmitError("Netzwerkfehler. Bitte kurz später nochmals versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        {!isSuccess ? (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit();
            }}
          >
            <input type="hidden" name="source_page" value={SOURCE_PAGE} />
            <input type="hidden" name="source_type" value={SOURCE_TYPE} />
            <input type="hidden" name="submitted_at" value={clientSubmittedAt} />
            <input type="hidden" name="utm_source" value={tracking.utmSource} />
            <input type="hidden" name="utm_medium" value={tracking.utmMedium} />
            <input type="hidden" name="utm_campaign" value={tracking.utmCampaign} />

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-black">
                  Vorname
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={(e) => setValues((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                  placeholder="Vorname"
                  autoComplete="given-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-black">
                  Klinik / Firma
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={values.company}
                  onChange={(e) => setValues((prev) => ({ ...prev, company: e.target.value }))}
                  className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                  placeholder="Klinikname"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">
                  E-Mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                  placeholder="name@klinik.ch"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black">
                  Telefonnummer
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                  placeholder="+41 …"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-black">
                Website <span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="website"
                name="website"
                value={values.website}
                onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
                className="bg-white border-gray-200 text-black placeholder:text-gray-400"
                placeholder="https://…"
                autoComplete="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiryHandling" className="text-black">
                Was passiert aktuell mit neuen Anfragen?
              </Label>

              <Select
                value={values.inquiryHandling}
                onValueChange={(val) => setValues((prev) => ({ ...prev, inquiryHandling: val as InquiryHandlingOption }))}
              >
                <SelectTrigger id="inquiryHandling" className="bg-white border-gray-200 text-black">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Wir antworten manuell</SelectItem>
                  <SelectItem value="slow">Eher langsam / uneinheitlich</SelectItem>
                  <SelectItem value="no-followup">Kein klares Nachfassen</SelectItem>
                  <SelectItem value="unknown">Weiss nicht genau</SelectItem>
                </SelectContent>
              </Select>

              <input type="hidden" name="inquiryHandling" value={values.inquiryHandling} />
            </div>

            {submitError ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-800">Bitte kurz prüfen</p>
                <p className="text-sm text-red-800/80 mt-1">{submitError}</p>
              </div>
            ) : null}

            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
            >
              {isSubmitting ? "Wird gesendet…" : "Kurze Demo anfragen"}
              <ArrowRight className="ml-2" size={18} />
            </Button>

            <p className="text-xs text-gray-500">
              Mit dem Absenden bestätigst du, dass wir dich zur Bearbeitung deiner Anfrage kontaktieren dürfen. Datenschutz/Impressum sind unten verlinkt.
            </p>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <p className="text-base font-semibold text-green-900">Danke – deine Anfrage ist eingegangen.</p>
              <p className="text-sm text-green-900/80 mt-2">
                Ich melde mich in Kürze bei dir. Wenn du direkt einen Termin buchen willst, kannst du das hier tun.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500">Termin-Link</p>

              {calendarBookingUrl ? (
                <Button size="lg" className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center" asChild>
                  <a href={calendarBookingUrl} target="_blank" rel="noopener noreferrer">
                    Termin buchen
                    <ArrowRight className="ml-2" size={18} />
                  </a>
                </Button>
              ) : (
                <Button size="lg" className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center" disabled>
                  Termin buchen
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              )}

              {!calendarBookingUrl ? <p className="text-xs text-gray-500">Platzhalter – Calendly-Link kann später eingefügt werden.</p> : null}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-semibold text-black">Gesendet</p>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>
                  <span className="text-gray-500">Vorname:</span> {values.firstName}
                </p>
                <p>
                  <span className="text-gray-500">Klinik/Firma:</span> {values.company}
                </p>
                <p>
                  <span className="text-gray-500">E-Mail:</span> {values.email}
                </p>
                <p>
                  <span className="text-gray-500">Telefon:</span> {values.phone}
                </p>
                {values.website ? (
                  <p>
                    <span className="text-gray-500">Website:</span> {values.website}
                  </p>
                ) : null}
                {values.inquiryHandling ? (
                  <p>
                    <span className="text-gray-500">Status:</span> {inquiryHandlingLabel}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}