---
name: app-layout-architecture
description: Standard layout rules for the application. ALWAYS use this skill when creating a new page, screen, auth flow (login/register), or modifying the main UI layout.
---

# app-layout-architecture

## Overview
This skill defines the standard layout architecture for the application. It ensures a consistent user experience across all screens by enforcing the presence of the global Header, Footer, and proper semantic HTML structure.

## Golden Templates
- `templates/Header.tsx`: The standard top navigation bar.
- `templates/Footer.tsx`: The standard bottom footer containing legal links.
- `templates/Layout.tsx`: The standard wrapper component that MUST be used for all pages.

## What NOT to do (Negative Constraints)
- **DO NOT** create any page or screen (even Login/Register) without the global Header, Footer, and Logo present.
- **DO NOT** reinvent the page wrapper. Always use the standardized `<Layout>` component to wrap your page content.
- **DO NOT** hardcode standard padding/margins for the main container on every page; rely on the `Layout` component's structure.
