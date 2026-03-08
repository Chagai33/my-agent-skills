# 🚀 Global Agent Skills & Architecture Library

[![Developer](https://img.shields.io/badge/Chagai_Yechiel-IT_Operations_%26_Automation-0077b5?logo=linkedin)](https://www.linkedin.com/in/chagai-yechiel/)
[![Stack](https://img.shields.io/badge/Tech_Stack-Python_%7C_GCP_%7C_Serverless_%7C_React-success)](#)

Welcome to a comprehensive catalog of **AI Agent Skills and Architectural Patterns**. 

This repository serves as a centralized knowledge base of tribal knowledge, robust architectural templates, and production-ready code examples. It is explicitly designed to empower AI coding assistants (like Claude, Gemini, etc.) to build complex systems securely across Python, GCP, Serverless environments, and modern React stacks.

Bridging the gap between scalable IT infrastructure and high-quality application code, these skills enforce engineering standards that prioritize zero-downtime, automation, and maintainability.

## 🛠️ Core Engineering Philosophy
* **Strict Typing & Type Safety:** Zero tolerance for `any` types. Widespread use of TypeScript Generics and explicit validation.
* **Server-Side Authority:** Critical business logic and cascading data operations always run securely via Cloud Functions or Serverless endpoints—never blindly trusted from the client.
* **Idempotency & Resilience:** All background tasks and automation scripts are built to handle retries gracefully without corrupting state.
* **Ast-Based Static Analysis:** No fragile Regex. Utilizing Abstract Syntax Trees (AST) for bulletproof internal code auditing (e.g., i18n string extraction).
* **Frictionless UI/UX:** Optimistic UI updates with isolated state managers (Zustand), avoiding expensive React Context re-renders.

## 🗂️ Skills Catalog

| Skill Name | Domain | Description |
|-----------|--------|-------------|
| **[il-privacy-amendment13-skill](./il-privacy-amendment13-skill)** | Security & Legal | Israel Privacy Law (Amendment 13) Auditor Skill. Ensures compliance with local data protection regulations out-of-the-box. |
| **[testing-patterns](./testing-patterns)** | Quality Assurance | Strict standards for unit and integration testing. Covers mock isolation (avoiding Zustand bleeding) and safe, strongly-typed generic mocks. |
| **[firebase-realtime-auth](./firebase-realtime-auth)** | Backend | Golden examples for atomic `runTransaction` operations, graceful granular subscriptions, and idempotent Cloud Functions. |
| **[zustand-state-architecture](./zustand-state-architecture)** | State Management | Temporal state management, O(1) lookups, DeepPartial generic updates, and optimistic UI rendering for high-performance apps. |
| **[i18n-localization-workflow](./i18n-localization-workflow)** | Localization | End-to-end AST-based translation workflow for React. Totally eliminates volatile Regex parsing in favor of TS-Morph. |
| **[tailwind-bento-architecture](./tailwind-bento-architecture)** | UI/UX | Tailwind CSS patterns featuring Bento Grid layouts, soft rounded corners, and a strict utility-first minimal aesthetic. |
| **[react-bulk-import-patterns](./react-bulk-import-patterns)** | Data Engineering | Excel/CSV parsing patterns built for async validation, interactive preview states, and a non-blocking UI thread. |
| **[google-calendar-sync-engine](./google-calendar-sync-engine)** | Integration | Robust synchronization engine with Google Calendar APIs, OAuth, token lifecycle management, and Serverless handlers. |
| **[firebase-magic-link-portal](./firebase-magic-link-portal)** | Authentication | Secure, passwordless guest portal utilizing temporary sessions and strict Backend Security Rules. |
| **[virtual-currency-ledger](./virtual-currency-ledger)** | Finance | Internal virtual currency ledger enforcing immutable, append-only audit trails and avoiding floating-point math errors. |
| **[app-layout-architecture](./app-layout-architecture)** | Architecture | Standard layout rules enforcing the global structural hierarchy (Header, Footer, and Page Wrapper) preventing rogue standalone screens. |

## 🌐 Connect
* **LinkedIn:** [Chagai Yechiel](https://www.linkedin.com/in/chagai-yechiel/)
