import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type InquiryHandlingOption = "manual" | "slow" | "no-followup" | "unknown";

interface ClinicsDemoFormValues {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  inquiryHandling: InquiryHandlingOption | "";
}

interface ClinicsLeadFormSectionProps {
  calendarBookingUrl: string;
  imprintHref: string;
  privacyHref: string;
}

function getInquiryHandlingLabel(value: InquiryHandlingOption): string {
  switch (value) {
    case "manual":
      return "Wir antworten manuell";
    case "slow":
      return "Eher langsam / uneinheitlich";
    case "no-followup":
      return "Kein klares Follow-up";
    case "unknown":
      return "Weiss nicht genau";
  }
}

export function ClinicsLeadFormSection({
  calendarBookingUrl,
  imprintHref,
  privacyHref
}: ClinicsLeadFormSectionProps) {
  const [values, setValues] = useState<ClinicsDemoFormValues>({
    firstName: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    inquiryHandling: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit() {
    setSubmitError("");

    if (!values.firstName.trim()) return setSubmitError("Bitte Vorname ausfüllen.");
    if (!values.company.trim()) return setSubmitError("Bitte Klinik / Firma ausfüllen.");
    if (!values.email.trim()) return setSubmitError("Bitte E-Mail ausfüllen.");
    if (!values.phone.trim()) return setSubmitError("Bitte Telefonnummer ausfüllen.");
    if (!values.inquiryHandling) return setSubmitError("Bitte eine Option wählen.");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/clinics-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          company: values.company.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          website: values.website.trim(),
          inquiryHandling: values.inquiryHandling
        })
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
    <section id="demo-form" className="px-4 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Kurze Demo anfragen</h2>
              <p className="text-lg text-gray-600 mt-4">
                Du erhältst eine klare Einschätzung, wie der Ablauf bei dir aussehen kann – ohne Umwege.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-black mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-black">Antwort per E-Mail</p>
                    <p className="text-sm text-gray-600">Wir melden uns mit nächsten Schritten und Fragen.</p>
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
                  Diese Seite ist bewusst fokussiert für Outreach. Keine Ablenkung – nur das, was für die Entscheidung wichtig ist.
                </p>
              </div>
            </div>

            <div className="w-full">
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
                            <SelectItem value="no-followup">Kein klares Follow-up</SelectItem>
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
                          <Button
                            size="lg"
                            className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                            asChild
                          >
                            <a href={calendarBookingUrl} target="_blank" rel="noopener noreferrer">
                              Termin buchen
                              <ArrowRight className="ml-2" size={18} />
                            </a>
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="w-full bg-black text-white hover:bg-red-600 inline-flex items-center justify-center"
                            disabled
                          >
                            Termin buchen
                            <ArrowRight className="ml-2" size={18} />
                          </Button>
                        )}

                        {!calendarBookingUrl ? (
                          <p className="text-xs text-gray-500">Platzhalter – Calendly-Link kann später eingefügt werden.</p>
                        ) : null}
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
                              <span className="text-gray-500">Status:</span>{" "}
                              {getInquiryHandlingLabel(values.inquiryHandling as InquiryHandlingOption)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="max-w-7xl mx-auto mt-10 px-4 pb-10">
            <div className="w-[90%] mx-auto border-t border-gray-200 pt-8 text-center">
              <h3 className="text-2xl font-bold text-black mb-2">Vincialmedia</h3>
              <p className="text-gray-600 mb-6">Fortschrittliche Digitale Architektur • Performance Engineering • Strategische Innovation</p>
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