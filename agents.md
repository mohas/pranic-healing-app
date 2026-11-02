Energy Healing App: Feature Checklist & Build Spec
A build brief to hand back to Claude. Work through it top to bottom, tick items as they are finished, and resolve the open questions in section 20 before or during the build.
1. Project Constraints
[x] Language: TypeScript everywhere, strict mode on
[x] UI: React with Tauri v2, mobile first (iOS and Android are the first targets, desktop later); design every screen for a phone first, then scale up
[x] Required libraries: zustand (all client state) and dayjs (all date/time handling, with locale plugins)
[x] UI library: Mantine (components, theming, dark mode, RTL through its direction provider, dates through @mantine/dates, which is dayjs-based); forms with @mantine/form
[x] zod defines every entity once as a schema; TypeScript types are inferred from it and the same schemas validate forms and API responses
[x] Routing: a custom zustand router, with no routing library (details in section 16)
[x] i18n from day 1: no hard-coded user-facing strings anywhere, ever, days and calendars should be wrapped in locale aware components and return localized date time views, calendars or date pickers; both LTR and RTL layouts are supported
[ ] Online only: no offline mode, no local database and no sync for now; the app always talks to the server
[ ] REST API through fetch: all data goes through a typed API client layer behind repository interfaces (for example PatientRepository, CaseRepository, RecordRepository, plus one repository per component type). A mock adapter with fixture data is used first and is switched to the real API later by configuration, without touching the UI
[ ] The server-side technology is open (CouchDB may be used there later); the client must not depend on it
[ ] Authentication is required; there are no roles. Every user can be a healer, a patient, or both at once
2. Vocabulary
• Patient: a person receiving healing
• Healer: a person giving healing
• Case: a health issue of one patient, with a title, diagnosis, start date, status and many Records, there can be multiple cases open at once for one patient
• Record: the main unit of data collection and storage. A Record holds only the common data (case, date/time, author, kind, status) and can optionally have components attached, or none at all (for example a Record that only holds a status change such as created)
• Component: a separate entity that can be attached to a Record or used on its own: chakra conditions, symptoms, memos, after-visit items. Each component is stored and loaded independently through the API
• Session: a Record that documents a healing visit, usually with several components attached
• General chat: a chat page between one patient and one healer, not related to any Case, where they exchange text messages
• Supervision link: a supervisor healer is allowed to view the work of another healer, supervisors are assigned case by case not user by user, also one case may have several supervisors
3. Data Model (TypeScript types)
[x] User: id, email, display name, handle (short shareable code that other healers use to request supervision), preferred language, timezone, avatar
[x] Patient relationship: links a healer to a patient (a patient can be a patient of several healers; a healer can also be a patient of someone else)
[x] Case: id, patientId, title, description, diagnosis (free text written by the healer), status (open/closed/abandoned), openedAt, closedAt, owning healerId
[x] SupervisionLink: caseId, supervisorId, status (pending/active/ended), createdAt, endedAt, endReason (supervision is per Case, never per user)
[x] Record: the main object, with common data only: id, caseId, patientId, kind (healing session, standalone measurement, note, status change), date/time, authorId, status (created/draft/completed), and a status-change Record carries one of: created, open, closed, reopened, abandoned. No component data lives on the Record, and a Record may have no components at all
[x] Component base (shared by every component below): id, type, caseId, patientId, recordId (optional, so a component can exist without a Record), authorId, createdAt, updatedAt; each component type is its own API resource, filterable by patient, case, record, type, author and time
[x] ChakraConditions (component): phase (none = measured outside a healing, before, after), measuredAt, one reading per chakra with two states: activity (unscanned / n / ua / oa) and second state (unscanned / n / d / c), stored as plain codes
[x] Symptom (component, a persistent identity inside a Case): id, caseId, title (required), status (active/completed), completedAt, completedInRecordId; the same Symptom is measured in many Records
[x] SymptomEntry (one measurement of a Symptom in one Record): id, symptomId, recordId, note, severity 1-10, pain 1-10, pin on the body (view front/back, normalized x/y)
[x] Memo (component, text only): id, text, creatorId (healer, supervisor or patient), createdAt, and either caseId (a memo in a Case, optionally with recordId) or chatId (a message in the general chat)
[x] GeneralChat: id, patientId, healerId; one per patient and healer pair, not related to any Case; its messages are Memos with a chatId
[x] AfterVisitItem (component): id, caseId, recordId (optional), type (medication/exercise/practice/diet/rest/other), title, instructions, frequency, duration, start/end dates, status (pending/in progress/done/dropped), completion log of timestamped check-ins
[x] Appointment: id, healerId, patientId, caseId (optional), start, end, status (scheduled/completed/cancelled), notes, recordId (set when converted into a Record)
[x] All entities carry id, type, createdAt, updatedAt, createdBy; ids and timestamps are assigned by the server (the mock adapter generates them)
[x] Every entity above is defined as a zod schema (one file per entity), and its TypeScript type is inferred with z.infer; request and response DTOs, form values and mock fixtures all reuse these schemas
4. Authentication & Accounts
[ ] Sign up, log in, log out, password reset (mock-backed for now)
[ ] Persist the session token safely (zustand store plus Tauri secure storage if available)
[ ] Route guards: unauthenticated users only see auth screens
[ ] Profile screen: name, picture, language, timezone, password change
[ ] A single user sees both a Healer workspace and a My Health (patient) dashboard and can switch between them from the main navigation, with no role selection step, the link to patient dashboard is only visible if he has any cases in the database
[ ] Patient registration/invitation: a healer can invite a person by email to become their patient; accepting links the accounts. Healers can also create a patient record for someone not yet on the app (unclaimed profile that can be claimed later)
5. Supervision
[ ] A healer can request another healers to supervise any of his cases, this has to be easy to do so maybe any healer should have a handle (a 6 char hashid of their id?) that can be told ove the phone or a message
[ ] One supervisor can supervise many cases; a case can have more than one supervisor 
[ ] Supervised Cases and patients are viewable in the patients of supervisor as if he has that patient, but marked with a tag of owning healer, so Sessions views are not different othervise
[ ] Supervisor can leave a review comment as a text memo, attached to a Record of a supervised Case or placed in the Case memo list, visible to the supervisee; memos are the only thing a supervisor can write, everything else is view-only
[ ] Either side can end the supervision link; access disappears immediately, but this is a soft delete with endDate set in the database and possibly a reason for ending the supervision
[ ] there is no need for patients to see they are being supervised
6. Patient List & Patient Page (healer side)
[ ] Patient list with search, sort (recent activity, name), and open-cased patients should be at top
[ ] Add/edit patient: name, contact, birth date, gender (optional), general notes
[ ] Patient page shows: header with basic info, next appointment, and the list of Cases
[ ] Cases are split into Open (highlighted, usually one or two, at the top) and Past/Closed (collapsed section)
[ ] Create case, edit case, close case, reopen case, mark case abandoned
[ ] case state changes should be logged in a Record object
[ ] Clicking a case opens the Case page
7. Case Page
[ ] Case header: title, diagnosis (editable by the owning healer), status, opened date, number of Records, healers and supervisors involved
[ ] Records list, newest first, each row showing date, kind, author (with a supervised badge where relevant), small chips for the attached components (symptoms, chakra conditions, memos, after-visit items), and a severity and pain summary
[ ] Button: New record, where the healer picks a healing session or a single component (for example only a chakra measurement or only a memo)
[ ] Open symptoms panel: every active Symptom with its title, latest severity and pain, and a way to mark a Symptom completed
[ ] Memos list showing the text memos of this Case
[ ] Progress panel with charts (section 11) and summary stats (first vs latest severity, percentage change, Records count, days since opening)
[ ] Record row opens the Record view; a Record and its components can be edited by their author only, supervisors are view-only apart from memos
8. Records & Components
A Record stores only the common data; everything else is a separate component. Suggested layout: common data on top, then one tab per attached component, with autosave of drafts.
[ ] Record (common data only): case, date/time (defaults to now), author, kind (healing session, standalone measurement, note, status change), status: Created / Draft / Completed; a Record may have no components at all, for example a Record that only holds a status change (created); completed Records can still be edited but keep an edit history timestamp
[ ] Components are optional: a Record can have none, one or several, and more can be added later; each component is its own entity with its own id
[ ] A component can also be created and used without a Record (for example a standalone chakra measurement)
[ ] Loading: every component is its own API resource, filterable by patient, case, record, type, author and time range, so lists and charts load components directly with pagination (section 16)
[ ] Validation: severity and pain must be integers 1-10 entered using a progress bar liked component; empty is allowed and means not recorded; these rules live in the zod schemas and are shared by forms and API responses
Symptom component
[ ] A Symptom is one persistent problem inside a Case, with a required title (for example lower back pain). The same Symptom is measured again in later Records, so the change in severity and pain can be charted (section 11)
[ ] Each measurement is a symptom entry with: note, severity 1-10, pain 1-10 and a pin on the body, front or back (section 9)
[ ] The healer enters one or several Symptoms from the interview with the patient, patients do not enter symptoms, and the diagnosis itself is a field on the Case
[ ] Carry-forward: a new Record with the Symptom component starts with all active Symptoms of the Case already loaded, showing the last values for reference, so the healer only updates what changed
[ ] Completed: marking a Symptom completed removes it from the next Records; it stays in history and charts and can be reopened
[ ] New Symptoms can be added in any Record; a Symptom belongs to one Case only
Chakra conditions component
[ ] Details in section 10. Each measurement has a phase (none, before healing, after healing) and a measurement time; a healing session normally has two, shown as two tabs that behave like two components
Memo component and general chat
[ ] A memo is one short text message (no voice memos for now). In a Case, memos show as a simple list in time order, each with date and creatorId, new ones at the bottom
[ ] Healers and supervisors can add memos in a Case (the one thing supervisors can write); patients do not write in Cases
[ ] Memos can be attached to a Record or stand alone in the Case memo list
[ ] General chat: a separate chat page between one patient and one healer, not related to any Case, made of text memos with a chatId. It is the only place where patients write, and it opens from the patient page (healer side) and from the patient dashboard
After-visit component
[ ] Instructions and notes for the patient, one entity per item (section 12)
Out of scope for now
[ ] Pictures and voice memos are dropped for now (no attachments, no file uploads, no audio recording). The healer's diagnosis is a field on the Case, not on a Record
9. Body Map Component
[ ] Reusable SVG component with Front and Back views and a toggle (or side-by-side on wide screens)
[ ] A pin is the location part of a symptom entry (section 8): one pin per entry, with view (front/back) and normalized x/y; the pin panel edits that entry. When a Symptom is carried forward into a new Record, its pin starts at the previous position
[ ] Tap/click to drop a pin; drag to adjust;
[ ] Each pin opens a small panel: note text, severity 1-10, pain 1-10, delete option
[ ] Pins are color-coded by severity (consistent scale used app-wide) and numbered
[ ] A list beside the map mirrors the pins; selecting one highlights the other
[ ] Usable by both patient and healer; works with touch and mouse; keyboard accessible
[ ] Read-only mode for review and for the patient dashboard
[ ] Optional compare mode: show pins from two Records (first vs latest) side by side
[ ] Coordinates stored normalized so the map scales to any size
10. Chakra Input (the speed-critical screen)
Chakras: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown (keep the list in config so it is extensible). Two qualities are recorded per chakra:
• Activity state: stored as one of n, ua, oa
• Second state: stored as one of n, d, c
• Every chakra and every state also has a neutral state = not scanned (stored as no value), which is the default
• Each ChakraConditions component stores its phase (none = measured outside a healing, before, after) and the time of measurement
• Only the states are stored for now; abbreviations and labels are not designed yet
Checklist:
[ ] One screen with all 7 chakras as rows, each row showing two segmented controls (Activity: UA | N | OA, Size: C | N | D) with large tap targets
[ ] Default is not scanned (visually grey/empty) for every control; tapping a selected option again returns it to not scanned
[ ] Each control is a single tap, with no dropdowns and no modals
[ ] Clear visual encoding: colors or icons for under/normal/over so a glance shows the whole picture, plus a small chakra-colored indicator
[ ] Before and After tabs, one per measurement phase; each phase is a separate chakra conditions component, so a session with two measurements shows two tabs, and a standalone measurement shows one view
[ ] Shortcuts: Set all normal, Clear all, Copy before to after, and a swipe/keyboard navigation (arrow keys, number keys for the options)
[ ] Optional tiny body silhouette preview showing the seven chakras colored by state
[ ] A per-chakra optional note (collapsed by default so it never slows entry)
[ ] Not-scanned values are excluded from charts rather than treated as zero or normal
[ ] Autosave on every tap
11. Progress & Charts
Use a charting library that works well in React/Tauri (suggestion: Recharts, used directly or through Mantine Charts, which is built on it; confirm before adding any dependency). All charts have i18n labels, dayjs-formatted axes, tooltips, and a date range filter.
[ ] Symptom severity over time: one line per Symptom, built from the entries that share its symptomId across Records (completed Symptoms stay in the chart), plus an optional derived overall line such as the mean severity of active Symptoms
[ ] Pain over time: pain 1-10 over Records, per Symptom (each with its body site) and as a derived overall line
[ ] Chakra condition over time: per chakra, both stored states (n / ua / oa and n / d / c) as step charts or a heatmap grid (rows = chakras, columns = measurements in time order with the phase marked, colors = state)
[ ] Before vs after comparison per session: chakra states improving or not, shown as an arrow or delta indicator
[ ] Per-session improvement score: simple derived metric (for example number of chakras moved toward normal)
[ ] Summary cards: first vs latest severity, trend direction, sessions count
[ ] Handle sparse data gracefully (not scanned or missing values leave gaps, not zeros)
[ ] Same chart components reused in the healer Case page and the patient dashboard
[ ] Charts read directly from components (symptom entries, chakra conditions) through their indexes, never by loading whole Records
12. After-Visit Component
[ ] Every instruction or note for the patient is a separate after-visit item entity with its own id, not a list inside the Record, so items can be tracked and charted later
[ ] Fields: type (medication, exercise, practice, diet, rest, other), title, instructions, frequency, duration, start/end dates, status (pending, in progress, done, dropped), and a completion log of timestamped check-ins
[ ] An item belongs to a Case and optionally to the Record (visit) that prescribed it
[ ] Visible to the patient on their dashboard; the patient ticks items as done, which writes a check-in (adherence tracking)
[ ] The healer sees adherence per item on the Case page
[ ] Optional: items that are still active are offered again in the next Record, like Symptoms, with one tap to continue, change or drop them
13. Patient Dashboard (shown when you are a patient of some healer)
[ ] Visible whenever the logged-in user is registered as a patient of at least one healer
[ ] If the user is a patient of several healers, show a selector or a grouped view
[ ] Next appointment card with date/time in the user's timezone, healer name, and add-to-calendar action
[ ] My cases (open first, then past), tap to see the case; the general chat with each healer is a separate page, not a case
[ ] My Records per case, read-only, with their components (symptoms, chakra conditions, memos, after-visit items)
[ ] Same progress charts as in section 11
[ ] After-visit plan checklist for the patient to tick
[ ] Patients cannot create or edit symptoms (the healer enters them, and the diagnosis is a field on the Case); patients write only in the general chat with their healer and tick after-visit items
[ ] Patient can never edit the healer's session content
14. Appointments
[ ] Healer creates, edits, cancels appointments for a patient
[ ] Calendar or list view (day/week), with filters by patient
[ ] Appointment can be converted into a new Record (healing session) with one click
[ ] Patient sees upcoming and past appointments
[ ] Reminders: in-app for now (real notifications later)
15. Internationalization (day 1)
[x] i18n library (suggestion: i18next with react-i18next), with typed translation keys
[x] Namespaced translation files per feature; English is the only shipped language at first, with stub fa and ar locale files from day 1 (not offered to users yet) so RTL layouts are tested early
[x] Language switcher in settings; the choice is saved to the user profile
[x] Detect initial language from the OS/browser
[x] dayjs locales loaded dynamically and kept in sync with the active language; dates, relative times, and calendars all locale-aware
[x] Use Intl for numbers and plurals; ICU-style plural handling
[x] RTL support from day 1, required even though English ships first: the app supports both LTR and RTL, and RTL applies only to the fa and ar locales (direction follows the active locale and flips at runtime through Mantine's DirectionProvider and the html dir attribute; logical CSS properties, mirrored layout and gestures, body map and charts handled correctly in RTL)
[x] Chakra names and all enum labels live in translation files, while stored values stay language-neutral codes (labels for the chakra states are not defined yet, so the stored codes show until then)
[x] Locale formatting for fa and ar: numbers and digits through Intl; fa uses the Jalali (Persian) calendar, so dates, calendars and date pickers must support Jalali for fa and Gregorian for the other locales (Mantine's date components are Gregorian, so build a small locale-aware wrapper that renders a Jalali picker for fa, for example with a dayjs Jalali plugin or react-day-picker/persian); digits follow the Intl defaults
[x] Self-host a Persian and Arabic capable font (for example Vazirmatn) with the app so nothing loads from a CDN, with per-locale font stacks set in the Mantine theme
[ ] CI/lint check that fails on hard-coded strings and on missing translation keys
[ ] User-written content (notes, symptoms) is stored as entered and is not translated
16. Architecture & Tech
The app is online only and talks to a REST API through fetch. PouchDB was dropped: it would replicate patient data to every device and turn partial sync, per-Case permissions and long-term data growth into client problems. A server-side database (CouchDB or anything else) stays an implementation detail behind the API.
[x] Vite + React + TypeScript project scaffolded with Tauri v2, mobile first (run and test on iOS and Android targets first, desktop later), the base project is provided
[x] Folder structure by feature (auth, patients, cases, records, components/symptoms, components/chakras, components/memos, components/after-visit, general-chat, body-map, charts, appointments, supervision, api, i18n, shared)
[x] UI: Mantine with one shared theme (colors, spacing, dark mode, fonts, direction), @mantine/dates for date inputs, and the app's own wrapper components for anything locale-sensitive (dates, numbers, pickers)
[x] Entities and validation: zod schemas for every entity (section 3), reused for form validation (through the @mantine/form zod resolver), API response parsing and mock fixtures
[ ] API client layer: one typed fetch wrapper (base URL, auth header, JSON, error mapping, timeouts, cancellation with AbortController, retry for safe GET requests), hidden behind repository interfaces so the UI never calls fetch directly
[ ] Mock adapter implementing the same repository interfaces with fixture data, simulated latency and occasional errors, kept in memory for the session; the adapter is chosen by configuration, so switching to the real API is a config change
[ ] API contract first: define endpoints and DTO types (an OpenAPI spec kept in sync with the TypeScript types, written alongside the mock layer) so the real backend can be built against it
[ ] Built to scale: every list endpoint is paginated (cursor), filterable by case, record, type and date range, and sortable; chart endpoints return data already shaped for the chart (for example symptom entries per Symptom between two dates), so the client never loads a patient's whole history
[x] Zustand stores per domain (auth, patients, cases, records, components, ui, settings) that cache fetched lists by query key with loading, error and stale state; optimistic updates with rollback for quick actions such as chakra taps; stores talk to repositories only
[ ] Online only: detect lost connection, show an offline banner and disable writes instead of queueing them; drafts autosave to the server with debounced requests
[ ] Auth: token handling with refresh, stored in secure storage (Tauri), and a global handler for expired sessions
[x] Routing: a custom zustand router and no routing library. A navigation store holds a typed stack of screens (a union such as { name: 'case', caseId }) with push, pop, replace and reset, and screens render by selecting the top entry. It includes route guards (login, patient-of-healer checks), the Android back button and iOS swipe-back mapped to pop (exit at the root), a separate stack per main tab, screen transitions, optional persistence of the stack, and one navigate() interface so a library can replace it later
[ ] Forms with @mantine/form and zod resolvers; custom inputs (body map pin, chakra controls, severity slider, symptom entry editor) are written as value/onChange components and dropped into forms through getInputProps, with a small Field helper for label and error layout
[ ] Mobile-first layout and an accessible design (safe areas, large touch targets, one-handed use, keyboard navigation, ARIA, contrast, scalable text)
[ ] Light and dark themes
[ ] Error boundaries, loading and empty states everywhere, and a global toast system
[ ] Unit tests for stores, repositories and the symptom carry-forward and completion logic, component tests for chakra input and body map, a basic e2e smoke test (the mock adapter makes these easy)
[ ] Seed/demo data for the mock adapter so charts can be developed against realistic data
17. Privacy & Security (health data)
[ ] Consent text for patients, shown at link time and stored with a timestamp (patients are not shown who supervises their Case, as decided; this is not a medical application)
[ ] Visibility rules enforced by the server (and imitated by the mock adapter): a patient sees only their own data; a healer sees their own patients; a supervisor additionally sees the Cases they supervise, view-only apart from memos
[ ] Audit log of who viewed or changed a record (supervisors especially)
[ ] Patient can export their data (PDF/JSON) and request deletion
[ ] Never log sensitive content; secure token storage; auto-logout after inactivity
[ ] Plan for encryption in transit and at rest: HTTPS for all API traffic and encryption at rest on the server, with tokens in secure storage and no patient data kept on the device once the real backend arrives
18. Suggestions Beyond the Brief
• Add a baseline intake when a Case is opened (initial symptoms, history, goals) so the first chart point exists
• Add a patient-reported wellbeing score (1-10) and energy/mood/sleep sliders as extra trend metrics
• Let a Case have goals (for example 'pain below 3') drawn as a target line on charts
• Add tags for symptoms (for example headache, anxiety) so recurring symptoms are matched across Cases
• Session templates: preset sets of components for a new Record (symptom carry-forward is already part of the Symptom component)
• Printable/PDF progress report per case that a patient can share
• Search across notes and diagnoses
• Record session type (in person, remote/distance) and technique used, so results can later be compared per technique
• Add a disclaimer that the app tracks wellbeing and is not a substitute for medical care, shown to patients
19. Suggested Build Order
1. Scaffold (Tauri v2 mobile first, Vite, TypeScript), i18n with LTR and RTL from day 1, dayjs setup, Mantine theme and direction provider, zod entity schemas, the zustand router, zustand stores
2. API layer: typed fetch client, repository interfaces, mock adapter with fixtures, adapter switch, OpenAPI spec
3. Auth and profile, language switcher
4. Patients, Cases (with the diagnosis field), Case page shell
5. Record and component framework: base component entity, loading and pagination
6. Symptom component with title, carry-forward and completion, then body map pins
7. Chakra conditions component with before and after tabs
8. Memo component and the general chat
9. After-visit item component
10. Charts and progress panel
11. Supervision per Case: handles, requests, merged view, view-only rules
12. Patient dashboard and appointments
13. Privacy features, export, audit log
14. Polish: accessibility, tests, RTL review for fa and ar, more languages
15. Switch from the mock adapter to the real API and test against it
20. Decisions & Open Questions
Decided
• Chakra states are only stored, as codes (activity: n, ua, oa; second state: n, d, c; plus not scanned); abbreviations and labels come later
• Supervision is per Case; a Case can have several supervisors; healers do not have supervisors
• Supervisors are view-only, except that they can add text memos
• Patients do not enter symptoms; the healer enters them, and the diagnosis is a field on the Case
• Symptoms have a required title
• A Record may have no components, for example a Record that only holds a status change
• Case statuses are open, closed and abandoned; a status-change Record carries one of created, open, closed, reopened, abandoned
• Records belong to Cases only
• Pictures and voice memos are dropped for now
• Patients write only in the general chat with their healer: one thread per patient and healer pair, not related to any Case, and supervisors do not see it
• Patients are not told who supervises their Case; acceptable, this is not a medical application
• Online only, REST API through fetch with a mock layer first; an OpenAPI spec is written alongside the mock layer; PouchDB dropped, CouchDB may be used on the server
• Mobile first
• English ships first; both LTR and RTL are supported, with RTL only for the fa and ar locales
• fa uses the Jalali calendar; digits follow the Intl defaults
• UI library Mantine with @mantine/form; zod for entity schemas and validation; a custom zustand router instead of a routing library
Still open
No open questions right now; new ones get added here as the build raises them.