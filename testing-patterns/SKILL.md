---
name: testing-patterns
description: Trigger this skill when writing Unit or Integration tests. Contains strict rules for mocking Firebase, Zustand, preventing test bleeding, and enforcing TypeScript strict mode.
---

# Testing Patterns & Best Practices

This skill outlines the golden standards for testing React components integrating with Firebase and Zustand. It enforces strict TypeScript constraints to ensure our bounds are secure even during tests.

## ❌ What NOT to do (Negative Constraints)
- **Strictly No 'any' Types**: Do NOT use `any` when mocking Firebase or Zustand. Utilize `ReturnType<typeof jest.fn>`, `jest.MockedFunction`, or explicit interfaces to maintain TypeScript strict mode in tests.
- **Do not mock the entire `firebase/app` module**: Only mock the specific functions you explicitly test (e.g., `firebase/database`, `firebase/functions`).
- **Do not test implementation details**: Avoid asserting internal Zustand state properties directly where possible; assert what the React component renders given a specific state.
- **Do not allow Test Bleeding**: Zustand is a singleton in testing environments. Neglecting to reset it between tests will cause cross-contamination.
- **Do not ignore `act(...)` warnings**: When testing async Firebase calls, component re-renders happen asynchronously. Use `findBy...` or `waitFor()` instead of suppressing warnings.

## Golden Examples

### 1. Type-Safe Zustand Mocking & Resetting
Learn how to mock the Zustand store while preserving Generics, and how to safely reset the state between tests to avoid bleeding.
[templates/store.mock.ts](templates/store.mock.ts)

### 2. Type-Safe Firebase Mocking
Learn how to mock Firebase Realtime Database and Cloud Functions using correct TypeScript typings.
[templates/auth.mock.ts](templates/auth.mock.ts)

### 3. Integration Testing with Async Rendering
Bringing it all together: testing a component that fetches from Firebase, updates Zustand, and resolving asynchronous `act` warnings securely.
[templates/EventComponent.test.tsx](templates/EventComponent.test.tsx)
