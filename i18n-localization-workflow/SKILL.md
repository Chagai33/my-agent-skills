---
name: i18n-localization-workflow
description: Trigger this skill when adding new text to UI components, adding new languages, or when doing bulk translation updates.
---

# i18n Localization Workflow

This project uses `react-i18next` for translations, supporting languages like Hebrew (he), English (en), and Spanish (es). Because the app is heavily localized and supports RTL/LTR, strict rules apply to how text is added and managed.

## When to use this skill
- Adding new UI components that contain text.
- Adding or modifying messages, labels, or tooltips.
- Auditing the project for missing translations or hardcoded text.
- Performing bulk updates to the `.json` language files.

## ❌ What NOT to do
- **Strictly NO Regex for Source Code Parsing**: Never use regular expressions (Regex) to extract translation keys (`t('...')`) or find hardcoded text (e.g., matching Hebrew characters). They are fragile and cause silent failures. Always use an AST parser (like `ts-morph` or `typescript`) for robust static analysis.
- **DO NOT hardcode user-facing text.** Never write `<div>Hello World</div>`. Always use `<div>{t('common.greeting')}</div>`.
- **DO NOT use dynamic keys that cannot be statically analyzed.** Avoid `t("status_" + status)`. Prefer mapping statuses to explicit keys, or sending the exact key. This breaks static analysis scripts.
- **DO NOT manually edit multiple `.json` files for large structural changes.** If you are adding a whole new section (e.g., a new page), use the `update_locales.cjs` script to patch all languages simultaneously using `deepMerge`.
- **DO NOT ignore directional layout (RTL/LTR).** When creating UI, remember that properties like `ml-4` might break in RTL. Use logical properties like `ms-4` (margin-start) or `space-x-4 rtl:space-x-reverse` when relevant.

## Golden Examples

### 1. Standard Component Usage
A typical React component extracting translations via the `useTranslation` hook.

[templates/component-usage.tsx](templates/component-usage.tsx)

### 2. Checking for Missing Translations & Hardcoded Hebrew
Before deploying, it's crucial to verify that all `t('keys')` exist in `he.json` and that no Hebrew text is hardcoded in `.tsx` files.

[scripts/check_translations.js](scripts/check_translations.js)

### 3. Bulk Updating Locales
When adding new features with many strings across multiple languages, use a script to inject them structurally into all `locales/*.json` files at once.

[scripts/update_locales.cjs](scripts/update_locales.cjs)

## Key Concepts
1. **Fallback Language**: Hebrew (`he.json`) is the absolute source of truth and fallback language. If a key is missing in English, the app will show Hebrew.
2. **Namespace**: We use a single namespace structure (often under a root object or direct). Nested objects (like `eventPage.category.addItem`) are the standard way to group keys.
3. **Automated Verification**: The Node.js scripts in the root directory (`check_translations.js`) use Regular Expressions to parse `.tsx` files physically, looking for `t('...')` calls and Hebrew unicode characters `[\u0590-\u05FF]`. Always ensure code plays nicely with these parsers.
