---
name: app-layout-architecture
description: Apply standard layout rules, mobile responsiveness, RTL support, and UI safety. Use when creating or modifying pages, auth flows, Header/Footer, responsive designs, or adding floating elements (FABs).
---

# App Layout Architecture

## 📂 Golden Templates
Reference these existing files instead of recreating them:
- `templates/Layout.tsx`: MUST wrap all pages. Contains necessary bottom padding for FABs.
- `templates/Header.tsx`: Contains safe mobile grouping and dynamic height.
- `templates/Footer.tsx`: Compact design.

## 📋 Mandatory Verification Checklist
Copy this checklist into your response and verify each item step-by-step before finalizing layout changes:
- [ ] **Layout Wrapper**: Is the page content strictly wrapped inside the `<Layout>` component?
- [ ] **Mobile Header**: Are secondary actions (Settings, Profile, Logout) safely grouped inside a hamburger or dropdown menu?
- [ ] **Dynamic Height**: Is the Header height dynamic (e.g., `min-h-[3.5rem]`, no fixed `h-16`) to allow text wrapping without truncating?
- [ ] **Footer Compactness**: Is the Footer minimal and compact (e.g., `py-2`, `text-xs`)?
- [ ] **RTL Flexbox**: Are elements aligned using Flexbox (`justify-between`, `gap`) instead of hardcoded directional margins?
- [ ] **RTL Modifiers**: Are asymmetrical elements correctly using `ltr:` and `rtl:` prefixes?
- [ ] **FAB Support**: Do floating elements have sufficient bottom margin (e.g., `bottom-20`), and does the main content have corresponding padding-bottom (`pb-20` or `pb-24`)?

## 🚫 Negative Constraints (NEVER DO THESE)
- **NEVER** expose a Logout button directly in the mobile navigation bar. It MUST be protected inside a menu.
- **NEVER** use directional margins that break RTL (e.g., `ml-auto`, `mr-auto`, `pl-4`, `pr-4`). Use logical properties or Flexbox.
- **NEVER** set a fixed physical height on the Header in mobile view.
- **NEVER** create a page without the global Header and Footer.

## 📐 Golden Example: RTL-Safe Mobile Layout with FAB
```tsx
import React from 'react';
import { Layout } from './Layout';

export const ExamplePage: React.FC = () => {
    return (
        <Layout>
            {/* Main content requires pb-24 to prevent FAB overlap */}
            <div className="pb-24 flex flex-col gap-4">
                <h2 className="text-xl font-bold">Page Content</h2>
                <p>Content goes here...</p>
            </div>

            {/* FAB with proper bottom spacing (bottom-20) to avoid Footer collision */}
            <button className="fixed bottom-20 ltr:right-6 rtl:left-6 rounded-full px-4 py-2 bg-blue-600 text-white shadow-lg">
                + Add Item
            </button>
        </Layout>
    );
};