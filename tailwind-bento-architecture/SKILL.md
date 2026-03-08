---
name: tailwind-bento-architecture
description: Trigger this skill when creating UI elements like Cards, Event Layouts, and Modals, enforcing Bento styling and strict Tailwind rules.
---

# Tailwind Bento Architecture

This project uses a strict **Bento UI Architecture** built exclusively with Tailwind CSS. It relies on soft pastel colors defined in the `tailwind.config.js`, layered containers with rounded corners (`rounded-lg`, `rounded-xl`), and subtle drop shadows.

## When to use this skill
- Building new UI components (Cards, Modals, Lists).
- Restyling or standardizing existing UI.
- Structuring layout wrappers for a clean, app-like feel.

## ❌ What NOT to do
- **DO NOT use inline styles (`style={{...}}`).** ONLY use Tailwind utility classes.
- **DO NOT create custom CSS files or `<style>` blocks.** Everything must be in Tailwind.
- **DO NOT invent new colors or hardcode hex codes in classes.** Strictly use the semantic palette defined in `tailwind.config.js` (e.g., `text-primary`, `bg-accent-dark`, `border-rides-primary`).
- **DO NOT use sharp corners.** Avoid standard `rounded` or `rounded-none` unless specifically required. Prefer `rounded-lg`, `rounded-xl`, or `rounded-2xl` for containers.
- **DO NOT use harsh shadows.** Prefer `shadow-sm` for resting states and `shadow-md` for hover states.

## Golden Examples

### 1. The Color Palette Foundation
The core aesthetic comes from our specific Tailwind configuration. Note the use of semantic naming rather than color descriptions, and specific contrast compliance choices.

[templates/tailwind-config-snippet.js](templates/tailwind-config-snippet.js)

### 2. Standard Bento Card
Our UI relies on standard, self-contained cards that feel tactile and use specific structural layers (header, content, actions).

[templates/standard-card.tsx](templates/standard-card.tsx)

## Key Concepts
1. **Container Softness**: Cards and interactive elements should almost always have `rounded-lg` or higher to match the Bento visual language.
2. **Semantic Hover/Focus**: Interactive buttons must include `.hover:bg-` variations from the same color family and explicit `focus:ring-2` rules for accessibility.
3. **Layered Layouts**: Page layouts should generally have a light neutral background (`bg-background` or `bg-gray-50`), while cards sit on top with a solid white background (`bg-white`) and a light border (`border-gray-200`) to create separation.
