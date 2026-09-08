# Virasat Voyage → Virasat AI ecosystem (SIH26197)

## 1. What exists today

- **Landing**: full-screen 3D holographic monument scene with a "Get Started" entry into the dashboard.
- **Six modules** in one page with top tabs: Time Portal (monument stories + language selector), Oral Vault (voice-recording UI), Trail Quest (trail/quiz with points), Craft Connect (artisan marketplace with blockchain-style provenance), Guru-Shishya (masterclasses + simulated UPI checkout), States Atlas (all 36 states/UTs with Wikimedia photos).
- **Real backend data**: 12 seeded tables (heritage master, states/UTs, monuments, festivals, crafts, dances & music, oral vault, cultural trails, guru-shishya, UNESCO ICH, content cards, did-you-know), with typed access helpers and data hooks.
- **Virasat Sathi assistant**: floating chat with 7 languages, quick replies, mic simulation. A full intent + knowledge engine was written but the chat window still uses the old keyword lookup, so answers repeat.
- **No real AI calls yet** — everything is local rules and static text.

## 2. What to preserve

The dark "Lamplight on Stone" look, amber/cyan accents, the hologram landing, all six module names and tabs, existing animations and layouts, current database tables and seeded rows, and all working interactions. No rebuild, no redesign.

## 3. What to improve

- The assistant should genuinely answer questions from the heritage database, not from a fixed reply list.
- Answers should cite where the information came from, and clearly separate verified records from community contributions.
- Oral Vault should actually capture audio, transcribe it and store it, instead of simulating recording.
- Photo-based monument recognition is missing — a big innovation win for the demo.
- Modules are currently islands; they should cross-link (a monument leads to its state, crafts, festivals, trail and masterclass).
- Search is per-module; a single search across all heritage data is needed.

## 4. Build order

**Phase 1 — Make the assistant real (highest demo value)**
- Finish wiring the assistant to the new response engine; one welcome message per open, working suggested questions, per-message answers, awareness of the state selected in Time Portal.
- Move answering to a server-side AI call grounded in the heritage database (retrieve matching monuments/crafts/festivals/trails, then let the AI answer only from those rows), replying in the chosen Indian language.
- Show the source records used for each answer as small citation chips.

**Phase 2 — Preserve & verify**
- Oral Vault: real microphone capture, upload to storage, AI speech-to-text with language detection, AI summary and tags, saved as a community contribution.
- Verification layer: every heritage item carries a status — *Verified archive* vs *Community contributed* — shown as a badge across all modules, with source attribution on monument and state records.

**Phase 3 — See & connect**
- Heritage Lens: upload or capture a photo of a monument/craft; AI identifies it and opens the matching record.
- Cross-links between modules and one global heritage search with an AI-written summary at the top.
- Personal "Heritage Passport": places explored, stories contributed, trail points, masterclass bookings.

**Phase 4 — Polish for judging**
- Impact dashboard (records preserved, languages covered, states covered), an about/architecture page explaining the AI approach, and accessibility/performance passes.

## 5. Files affected

- Assistant: `src/services/chatbot.ts`, `src/components/virasat/ChatWidget.tsx`, plus new server-side AI and retrieval helpers; the selected state passed down from `src/routes/index.tsx` and `TimePortal.tsx`.
- Oral Vault: `src/components/virasat/OralVault.tsx`, new audio storage bucket, new transcription server function, one migration adding contribution/verification columns.
- Verification badges: shared badge component used by `TimePortal`, `CraftConnect`, `StatesAtlas`, `TrailQuest`, `OralVault`.
- Heritage Lens, global search, passport: new components and one new tab or an entry in the top bar (kept within the existing navigation style).
- Data layer: `src/services/heritage.ts`, `src/services/hooks.ts`, `src/types/database.ts`.

## Technical notes

AI runs through Lovable AI on the server (chat, transcription, image understanding); no keys in the browser. Retrieval is grounded on the existing tables so answers stay factual and citable. New columns and buckets are additive — no existing table, route or API changes.
