---
name: Project Tech Stack & Architecture Rules
description: Defines the global technical stack, architecture guidelines, and restrictions for the project.
---

# Tech Stack & Architecture Rules

## 1. Tech Stack
* **Frontend:** React 18+, TypeScript (Strict Mode), Vite.
* **State Management:** Zustand (Strictly avoid Context API for complex state. Use O(1) lookups).
* **Styling:** Tailwind CSS. Adhere to my "Bento Architecture" (soft rounded corners, utility-first, modern UI).
* **Backend/BaaS:** Extensive use of Firebase (Auth, Realtime Database, Firestore, and Cloud Functions). Ensure solutions perfectly fit the specific project scope and infrastructure.

## 2. Global Project Rules (Non-Negotiables)
* **App Layout:** NEVER create a new page, screen, or auth flow (including Login/Register) without the global Header and Footer components.
* **Localization (i18n):** STRICTLY NO hardcoded user-facing strings. Always use translation keys and our automated Node.js scripts for bulk locale updates.
* **Data Operations:** For large data imports (Excel/CSV), always implement an asynchronous, non-blocking flow with a Preview/Validation state before DB upload.
* **Agent Skills:** I have a global repository of Agent Skills located at `~/.claude/skills/`. Actively use them when you need to build UI components, sync with Google Calendar, manage virtual currency (Ledger), or create magic-link portals.

## 3. Architecture & Security Restrictions
* **Strict TypeScript:** Absolute ban on using the `any` type anywhere in the project (especially in Zustand stores and Firebase callbacks). Enforce the creation and use of exact `interface` or `type` definitions (and strongly encourage Generics for templates).
* **Server-Side Business Logic:** Cascading deletes (e.g., deleting an Event and its associated Assignments) MUST be handled on the server via Firebase Cloud Functions (e.g., `onDocumentDeleted` or `onDelete` triggers). Client-side *database* cascading deletes are strictly forbidden to prevent orphaned data.
