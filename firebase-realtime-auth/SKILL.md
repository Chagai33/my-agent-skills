---
name: firebase-realtime-auth
description: Trigger this skill when adding new Realtime DB listeners, modifying data safely (transactions), or integrating anonymous user authentication.
---

# Firebase Realtime DB & Anonymous Auth Flow

This project uses Firebase Realtime Database with a Flat Model architecture and Anonymous Authentication. This approach ensures low latency, minimal bandwidth usage via granular subscriptions, and a frictionless onboarding experience.

## When to use this skill
- Adding new real-time listeners (`onValue`) for a collection.
- Performing complex atomic updates or limits checks (`runTransaction`).
- Handling user identity where users aren't explicitly registered (frictionless join).

## ❌ What NOT to do
- **Strictly No 'any' Types**: Do not declare callbacks or models using `any` (e.g., `callback: (details: any)`). You must use TypeScript Generics (e.g., `static subscribeToDetails<T>`) to enforce type safety in our abstract service methods.
- **No Client-Side Backend Wipes**: If deleting an item requires nested operations (like cleaning up child nodes in the Realtime Database), do NOT perform this cascading delete from the client. Use a Firebase Cloud Function (e.g., `onDelete` trigger) so it handles the wipe securely and reliably on the server.
- **Do not listen to the entire root or event object (`/events/eventId`)**. Always use **Granular Subscriptions** (e.g., `/events/eventId/details`, `/events/eventId/menuItems`).
- **Do not forget to clean up listeners.** Always return the `off()` function in `useEffect`.
- **Do not force a login screen.** The app relies on "Anonymous Auth First". Always call `signInAnonymously(auth)` in the background.
- **Do not query data linearly before an update if it relies on strict rules (like item limits).** Use `runTransaction` to read and write atomically.

## Golden Examples

### 1. Granular Subscriptions & Atomic Transactions
Instead of constantly fetching heavy JSON objects, we split listeners. Instead of `get` followed by `set`, we use `runTransaction` for concurrency safety.

See the complete example of how to implement optimized Firebase Services:
[templates/firebaseService.ts](templates/firebaseService.ts)

### 2. Anonymous Auth "Frictionless" Flow
Users are authenticated in the background immediately. We only ask for their name *right before* they perform an action (like joining an event or claiming an item).

See the example of standardized Auth logic inside a component:
[templates/auth-flow.tsx](templates/auth-flow.tsx)

## Key Concepts
1. **Background Anonymous Sign-In**: `onAuthStateChanged` listens for the user. If they don't exist, we immediately call `signInAnonymously()`. We store this in `localUser`.
2. **Delayed Profiling (NameModal)**: A local state (`showNameModal`) prompts the user for their name *only* when they try to perform a restricted action (like `handleJoinEvent` or `handleAssignClick`).
3. **Atomic `runTransaction`**: Always check constraints (like `allowUserItems` or `userItemLimit`) inside the transaction block, because another user might have just claimed the last spot.
