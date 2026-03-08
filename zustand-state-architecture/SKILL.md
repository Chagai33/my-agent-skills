---
name: zustand-state-architecture
description: Trigger this skill when creating or modifying global state using Zustand, especially for new stores or complex state manipulations.
---

# Zustand State Architecture

This project uses a standardized Multi-Tenant approach to global state management using `zustand`. This ensures predictable updates, bandwidth optimization using partial updates, and optimized selector patterns.

## When to use this skill
- Creating a new Zustand store
- Adding new state slices or actions to an existing store
- Writing selectors for complex derived state
- Refactoring `useState`, `useContext`, or prop-drilling into global state

## ❌ What NOT to do
- **Strictly No 'any' Types**: Do not declare generic objects using `any` (e.g., `currentEvent: any`). You must use TypeScript Generics (e.g., `State<T>`) so the skill can be injected gracefully into specific domains.
- **No Client-Side Database Cascading Wipes**: You must NEVER securely wipe nested documents or collections from the client. Condition the Zustand `delete` action as a strictly **UI Optimistic Update** for immediate feedback, but the authoritative deletion of children (like `Assignments` belonging to an `Event`) MUST occur on the Backend (e.g., Firebase Cloud Functions triggered via `onDelete`).
- **Do not use React Context** for application-wide data that updates frequently.
- **Do not mutate state directly**. Always return a new object in the `set()` function.
- **Do not put complex business logic directly in components**. Move update actions to the store.
- **Do not subscribe to the entire store** (`useStore()`). Always select specific parts using a selector (`useStore((state) => state.piece)`).
- **Do not repeatedly filter large lists inside components.** Use optimized selectors (O(1) lookups) like Maps.

## Golden Examples

### 1. Store Definition & Partial Updates
The application structure strictly separates the current user session from data objects (e.g., current event), initializes gracefully, and supports **Partial Updates** to avoid overwriting state.

See the complete example of how to implement State, Actions, and Partial Updates:
[templates/useStore.ts](templates/useStore.ts)

### 2. Optimized Selectors
Selectors should be separated from the component logic. For large lists or frequent lookups, transform Arrays into Maps (O(1) lookup).

See the example of standardized and optimized selectors:
[templates/selectors.ts](templates/selectors.ts)

## Key Concepts
1. **Initial State Handling**: Handle gracefully when data (`currentEvent`) is null vs when partial updates arrive. Use Generics and `DeepPartial<T>` utility types for type safety during shallow merges.
2. **UX Optimistic Updates vs Cascading Deletions**: If you delete a parent entity (e.g. `MenuItem`), ensure associated child entities (e.g. `Assignments`) are cleaned up instantly from the UI via the action. However, do NOT manage backend cascading wipes here.
3. **Map Transformations**: For relational data (e.g. assignments mapped to items), convert `Object.entries` outputs to arrays or `Map` collections at the selector level so the components stay clean.
