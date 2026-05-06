# VincialMedia Site — Repo Guide

This file gives Claude Code persistent context for this codebase.

## Project

Marketing site for **VincialMedia**, a Swiss agency selling KI-Lead-Automation to clinics. The site is the landing destination for cold-email + Loom outreach campaigns and the place inbound prospects evaluate before booking a demo call. Vincent Hänggi is the founder and personal brand on the site.

## Tech stack

- Next.js (TypeScript)
- Tailwind for styling
- Form submissions POST to Make.com webhooks (hardcoded URLs per page)
- CRM: HubSpot
- Booking: Google Calendar (`calendar.app.google` links)

## Language & brand voice — non-negotiable

- All user-facing copy is in **Swiss German**: use `ss`, never `ß`
- Address visitors in `Sie` form, never `du`
- Tone: warm, direct, professional — not marketing-fluff. First-person `ich` is fine for personal sections about Vincent
- Currency: `CHF X'000` with apostrophe thousands separator (Swiss convention)
- Dates: DD.MM.YYYY
- German typography quotes: `„..."` not `"..."`
- **When given exact German strings in a prompt, use them verbatim.** Do not "polish" or paraphrase — brand voice is too specific to improvise

## Form / webhook integrity — critical

Each landing page POSTs form data to a **Make.com webhook**. The webhook URL on each page is hardcoded and **must never be changed** without explicit instruction.

Make scenarios expect exact field names. When refactoring a form:

- **Never rename** existing payload fields
- **Never remove** fields the Make scenario reads — check first
- If you cut a UI field that maps to a webhook field, send an empty string in the payload — don't omit the key
- Phone numbers must be digits-only on submit: `value.replace(/\D/g, '')`
- Boolean form fields are submitted as **strings** (`"true"` / `"false"`), not booleans — the Make modules parse strings
- After any form change, test-submit and verify the Make execution log fires with the expected payload before declaring done

## Working agreements

- **Never auto-commit.** Run `git diff` and show me before any commit. Always.
- Run `npm run build` before declaring a content change done — TypeScript can break silently
- Small, focused commits. One feature or one page per commit
- For copy changes: use the exact strings provided. Don't paraphrase
- For exploration: discover the file structure before assuming (this repo may use Pages Router or App Router — check)

## Useful context

- The `/kliniken` page is the destination for cold-email + Loom outreach targeting aesthetic, laser, cosmetic, and premium dental clinics in Switzerland
- The Make scenario **"Kliniken Landing Page Form Handler"** (ID 5181814) processes those submissions and routes them to email or WhatsApp branches based on the `wantsWhatsApp` flag
- A KB-grounded Claude assistant runs the multi-turn conversation; pre-call AI summaries land in HubSpot as the contact property `lead_intent_summary`
- Other Make scenarios (Email Reply Handler, WhatsApp Handler) handle follow-up dialogue — don't touch their webhooks either
