# /kliniken – Copy & Conversion Refinement (ohne Redesign)

Ziel: weniger generisch, klinikspezifischer, outcome-driven, klarer Conversion-Flow.
Ton: premium, direkt, praktisch, CH-Schreibweise (ss statt ß). Keine Fake-Proofs, keine erfundenen Zahlen.

**Struktur bleibt wie gebaut** (Hero → Problem → Lösung → Flow → Beispiel → Trust → Für wen → FAQ → Formular).
Das hier sind **reine Text-/Heading-Änderungen + Microcopy**.

---

## Globale Regeln (für konsistenten Outreach-Flow)

- Primär-CTA immer: **Kurze Demo anfragen** → scrollt zum Formular (z. B. `#lead-form`)
- Sekundär-CTA immer: **Beispiel ansehen** → scrollt zur Beispiel-Sektion (z. B. `#beispiel`)
- Keine WhatsApp-CTA (bis Nummer vorhanden).
- Keine „AI revolution“ / kein Agentur-Blabla. Fokus: Prozess, Geschwindigkeit, Klarheit, weniger Verlust, mehr Termine.

Empfohlene Section-IDs für konsistentes Scrollen:
- Formular: `lead-form`
- Beispiel: `beispiel`

---

## 1) HERO (ClinicsHero.tsx)

### H1 (bleibt wie Brief)
**Mehr Anfragen zu echten Terminen machen**

### Subheadline (ersetzen – kliniknah, konkret)
> Wir bauen ein schlankes Lead-System für Termin-Kliniken: neue Anfragen werden **innerhalb von Minuten** bestätigt, es gibt **klare nächste Schritte** und ein **konsequentes Follow-up** – damit weniger Kontakte im Alltag verloren gehen und mehr Beratungstermine zustande kommen.

### „Für wen“ Micro-Satz direkt unter Subheadline (neu, 1 Zeile)
> Für ästhetische Kliniken, Laser-Kliniken, Beauty/Cosmetic Anbieter, Premium-Zahnmedizin und ähnliche Terminanbieter.

### CTAs (Labels bleiben)
- Primär: **Kurze Demo anfragen** (scroll zu `#lead-form`)
- Sekundär: **Beispiel ansehen** (scroll zu `#beispiel`)

### Trust-Line unter CTAs (ersetzen – businesslike, ohne Claims)
> Fokus auf Prozess statt mehr Aufwand: **schneller Erstkontakt, sauberes Follow-up, klare Zuständigkeiten im Team.**

### Optionales Microcopy darunter (neu, conversion-stark, ruhig)
> **Demo dauert 10–15 Minuten.** Du bekommst eine klare Einschätzung, welche Schritte bei euch fehlen – und was sich wirklich lohnt.

---

## 2) PROBLEM (ClinicsBodySections.tsx – Problem Section)

### Heading (ersetzen)
> Marketing bringt Anfragen. Verloren gehen sie danach.

### Intro (ersetzen – konkreter, klinikrealistisch)
> In vielen Kliniken ist nicht die Nachfrage das Problem – sondern der Ablauf nach dem ersten Kontakt.  
> Wenn die Antwort zu spät kommt, der nächste Schritt unklar ist oder niemand konsequent nachfasst, bucht der Patient dort, wo es schneller und ruhiger wirkt.

### 3 Pain-Point Cards (Text schärfen)

1) **Antworten kommen zu spät**  
   > Anfragen kommen zwischen Terminen, am Abend oder am Wochenende rein. Wenn die erste Antwort erst Stunden später kommt, ist das Fenster oft zu.

2) **Es gibt kein klares Follow-up**  
   > „Wir melden uns“ ist kein Prozess. Ohne festen Rhythmus (z. B. Tag 1/3/7) bleiben viele Kontakte liegen – ohne klares Ja oder Nein.

3) **Anfragen versanden im Alltag**  
   > Empfang, Telefon, Teamwechsel, Rückfragen: Infos landen in Postfächern, Notizen oder Chats. Am Ende ist nicht klar, **wer** antwortet – und **was** der nächste Schritt ist.

Mini-Bridge zur Lösung (neu, 1 Satz)
> Genau dort setzen wir an: weniger Lead-Verlust durch klare Schritte nach der Anfrage.

---

## 3) SOLUTION (ClinicsBodySections.tsx – Solution Section)

### Heading (ersetzen – outcome-driven)
> Was sich nach der Umsetzung ändert

### Subline (ersetzen)
> Ein Lead-Flow, den Rezeption und Team wirklich nutzen – damit aus Anfragen planbar **Termine** werden.

### Feature-Cards (Titel können bleiben; Texte outcome-orientiert ersetzen)

- **Sofort-Antwort auf neue Anfragen**  
  > Der Patient erhält sofort eine Bestätigung mit nächstem Schritt. Das wirkt professionell, reduziert Unsicherheit – und hält den Kontakt bei euch.

- **Klare Lead-Pipeline**  
  > Jede Anfrage hat einen Status. Ihr seht auf einen Blick: **neu**, **in Kontakt**, **Termin vereinbart**, **abgesagt** – ohne Excel und ohne Rätselraten.

- **Automatische Follow-ups**  
  > Nachfassen nach Plan, bis ein Termin steht oder ein klares Nein da ist. Weniger „stille Verluste“, weniger Bauchgefühl im Team.

- **Termin-Erinnerungen**  
  > Erinnerungen vor dem Termin reduzieren No-Shows und entlasten die Rezeption (weniger Nachtelefonieren, weniger Unsicherheit).

- **Reaktivierung alter Leads**  
  > Alte Anfragen sind oft der schnellste Hebel. Wir holen sie strukturiert zurück – mit ruhiger Ansprache und klarem nächsten Schritt.

### Ziel-Satz (ersetzen)
> **Ziel:** Mehr gebuchte Termine aus den Anfragen, die heute schon reinkommen – ohne dass das Team ständig „hinterherrennen“ muss.

CTA in/unter der Sektion: **Kurze Demo anfragen** (scroll `#lead-form`)

---

## 4) FLOW (ClinicsBodySections.tsx – Flow Section)

### Heading (ersetzen)
> Der Ablauf – in 10 Sekunden verständlich

### Subline (ersetzen)
> Jede Anfrage hat immer einen nächsten Schritt. Nichts bleibt „irgendwo“ hängen.

### Flow-Text (bleibt, aber mit Nutzenzeile ergänzen)
Flow:
> **Anfrage → Sofort-Antwort → Pipeline → Follow-up → Termin**

Nutzenzeile darunter (neu):
> **Ergebnis:** schnellere Reaktion nach aussen, klare Zuständigkeit nach innen – und weniger Lead-Verlust im Tagesgeschäft.

---

## 5) DEMO / BEISPIEL (ClinicsBodySections.tsx – Beispiel Section)

### Heading (ersetzen)
> Beispiel: So sieht das im Alltag aus

### Intro (ersetzen – glaubwürdig, nicht zu abstrakt)
> Du siehst hier bewusst vereinfachte Beispiele. In der echten Umsetzung passen wir Text, Timing und Kanal (E-Mail/SMS) an euren Ablauf an – damit es für Team und Patienten natürlich wirkt.

### Placeholder-Block Labels (präziser)
1) **Anfrageformular (Website / Landingpage)**  
   - Hinweiszeile (neu): „Kurze Felder, klare Erwartung – weniger Abbrüche.“
2) **Sofort-Bestätigung (E-Mail oder SMS)**  
   - Beispieltext (neu, ruhig):
     > „Danke für deine Anfrage. Wir melden uns zeitnah mit 1–2 Terminvorschlägen. Falls du Rückfragen hast, antworte einfach auf diese Nachricht.“
3) **Pipeline-Übersicht (Team/Empfang)**  
   - Statusbeispiele: „Neu / Kontaktversuch / In Beratung / Termin / Abgesagt“
4) **Follow-up & Reminder (Beispiele)**  
   - Follow-up Beispiel (neu):
     > „Kurze Nachfrage: Hast du unsere Terminvorschläge gesehen? Wenn du willst, sende ich dir gern weitere Optionen.“
   - Reminder Beispiel (neu):
     > „Erinnerung: Dein Termin ist morgen um 14:00. Falls du verschieben musst, gib kurz Bescheid.“

CTA unter Beispiel: **Kurze Demo anfragen** (scroll `#lead-form`)

---

## 6) TRUST (ClinicsBodySections.tsx – unter Beispiel)

Wichtig: klar als Platzhalter markieren, aber hochwertig.

### Testimonial (Platzhalter – später ersetzen)
Label:
> Testimonial (Platzhalter – später ersetzen)

Text:
> „Seit der Prozess steht, sind Anfragen nicht mehr ‘im Posteingang’. Wir reagieren schneller – und es ist klar, wer wann nachfasst.“

Name/Position:
> Name Nachname  
> Position, Klinik

### Case Study (Platzhalter – später ersetzen)
Label:
> Case Study (Platzhalter – später ersetzen)

3 Kacheln:
- **Ausgangslage:** Viele Anfragen, aber unklare Zuständigkeit und zu spätes Follow-up.
- **Umsetzung:** Sofort-Bestätigung, Pipeline-Status, Follow-up-Rhythmus, Reminder.
- **Resultat:** Mehr gebuchte Gespräche, weniger No-Shows, weniger Reibung im Team.

---

## 7) WHO IT IS FOR (ClinicsBodySections.tsx)

### Heading (ersetzen)
> Für welche Kliniken das sinnvoll ist

### Intro (ersetzen – spezifischer, weniger generisch)
> Ideal für Kliniken mit beratungsintensiven Anfragen – wo der Erstkontakt Vertrauen schafft und Geschwindigkeit den Unterschied macht. Besonders dann, wenn im Alltag viele Kontakte parallel laufen und Zuständigkeiten nicht immer glasklar sind.

### Cards (ersetzen – jede Karte mit eigenem Grund)

1) **Ästhetische Kliniken**  
   > Viele Anfragen brauchen Beratung und Vertrauen. Eine schnelle, klare Antwort wirkt professionell – und erhöht die Chance, dass die Beratung bei euch stattfindet.

2) **Laser-Kliniken**  
   > Viele Erstkontakte, oft ähnliche Fragen. Ein sauberer Ablauf sorgt dafür, dass niemand „zwischen Terminen“ verloren geht – und Follow-ups konsequent passieren.

3) **Premium-Zahnmedizin / Zahnkliniken**  
   > Hoher Anfragewert, planbare Termine. Ein strukturierter Erstkontakt und klare Terminführung zahlen direkt auf Auslastung und Qualität der Patientenkommunikation ein.

4) **Beauty / Cosmetic Anbieter**  
   > Viele Interessenten springen ab, wenn nach der Anfrage nichts passiert. Ein klares Follow-up holt Unentschlossene zurück – ohne dass das Team permanent daran denken muss.

---

## 8) FAQ (ClinicsBodySections.tsx – FAQ Section)

Ziel: Reibung rausnehmen, klar & ruhig beantworten.

1) **Brauche ich dafür ein neues CRM?**  
   > Nicht zwingend. Wir können an euer heutiges Setup andocken (E-Mail, Telefon, bestehende Tools). Wenn aktuell keine saubere Übersicht existiert, setzen wir eine schlanke Pipeline auf – so simpel wie nötig.

2) **Funktioniert das auch mit meinem bestehenden Ablauf?**  
   > Ja. Wir starten mit einer kurzen Ist-Aufnahme: Was passiert heute nach der Anfrage? Danach bauen wir nur die fehlenden Schritte (Sofort-Antwort, Follow-up, Übersicht) – ohne unnötige Umstellung.

3) **Wie schnell kann das live sein?**  
   > Ein erster produktiver Ablauf kann schnell stehen, sobald Texte, Zuständigkeiten und Kanäle klar sind. In der Demo klären wir, was bei euch realistisch ist und wo der grösste Hebel liegt.

4) **Muss ich meine Website komplett neu machen?**  
   > Nein. In vielen Fällen reicht ein fokussiertes Formular bzw. eine saubere Anfrage-Strecke plus die Logik danach. Eure bestehende Website kann bleiben, wie sie ist.

Optional (falls ihr 1 Frage ergänzen wollt):
- **Was braucht ihr von uns?**  
  > Zugriff auf den aktuellen Anfrage-Kanal, kurze Abstimmung zu Zuständigkeiten und die Texte für Bestätigung & Follow-up. Mehr nicht.

---

## 9) FORM SECTION (ClinicsLeadFormSection.tsx)

### Intro (ersetzen – kurz, nutzenorientiert)
> Ein paar Angaben – damit ich die Demo auf eure Situation zuschneiden kann. Danach bekommst du eine klare Rückmeldung mit den nächsten Schritten.

### „Wichtig“-Box (ersetzen – mehr Nutzen, weniger Erklärung)
> In der Demo schauen wir uns an, **wo** Anfragen heute verloren gehen, **welcher Schritt** fehlt und wie ihr den Ablauf so baut, dass ihn das Team wirklich nutzt.

### Thank-you State (bestehend, aber Text straffen wie gewünscht)
> Danke – deine Anfrage ist eingegangen. Ich melde mich in Kürze bei dir. Wenn du direkt einen Termin buchen willst, kannst du das hier tun.

Button:
- Label: **Termin buchen**
- Link: Platzhalter, klarer Konfig-Punkt (z. B. `const CALENDLY_URL = ""`), bis hinterlegt.

---

## 10) CTA-Konsistenz & Platzierung (kleine Regeln)

- Hero: Primär + Sekundär CTA
- Nach Lösung: Primär CTA
- Nach Beispiel: Primär CTA
- Vor Formular: kein zusätzlicher „anderer“ CTA (kein „kostenlos“ / kein „Call buchen“), damit der Pfad sauber bleibt.

---

## Umsetzungshinweis

Das sind **Copy-/Heading-Änderungen** + Microcopy. Layout/Spacing/Buttons bleiben wie aktuell.
Für die Umsetzung: In **Standard Mode** ersetze in den drei Clinics-Komponenten die Texte gemäss Abschnitten oben.