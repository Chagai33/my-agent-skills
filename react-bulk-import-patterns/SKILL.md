---
name: react-bulk-import-patterns
description: Standardized patterns for bulk importing data (Excel/CSV/Smart AI) with preview and async validation.
---

# Bulk Import Patterns

This skill defines the standard approach for implementing bulk data import features in the project. It covers parsing files (Excel, CSV), processing AI-generated lists (Smart Import), managing the preview state, and executing batch uploads.

## When to use
* When building administrative or user interfaces that allow uploading multiple items at once.
* When integrating file uploads (XLSX, CSV) or pasting large texts for processing.
* When implementing "Smart Import" features using AI to parse unstructured data into structured records.

## ❌ What NOT to do
* **NEVER** upload parsed rows directly to the database without a user-review (Preview) step.
* **NEVER** block the main UI thread during parsing. Use asynchronous functions (Promises or Web Workers) for file reading and parsing.
* **NEVER** swallow errors during import. If a specific row fails, present the error to the user for that specific row. The entire import should not crash due to one bad record.
* **AVOID** hardcoded column indexes if possible. Try to identify columns by header names (e.g., checking if the first row contains "שם" or "name").

## Golden Examples

### 1. File Parsing (Excel/CSV)
**File:** `templates/excel-csv-parser.ts`
Demonstrates how to asynchronously parse `.xlsx` and `.csv` files using `xlsx` and `papaparse` libraries, including basic client-side validation and formatting the output into a standardized `ImportItem` structure.

### 2. Import Modal & Preview Flow
**File:** `templates/import-modal-flow.tsx`
A simplified structural example of the import modal lifecycle:
1.  **Input:** File selection or Smart AI text input.
2.  **State:** Storing parsed items in a local state array (`importItems`).
3.  **Preview:** Displaying the items to the user, allowing them to correct errors, change quantities, and select/deselect rows.
4.  **Execution:** Looping through selected, error-free items and writing them to the database (or triggering an atomic migration).

## Key Concepts

*   **`ImportItem` Interface:** A temporary data structure used during the preview phase. It should extend the target data model with UI-specific fields like `selected: boolean` and `error?: string`.
*   **Asynchronous Parsing:** Both `FileReader` (for Excel) and `Papa.parse` (for CSV) operate asynchronously. Wrap them in Promises to keep the UI responsive.
*   **Duplicate Handling:** Before executing the final import, check for duplicates against the existing database records and present the user with a choice to skip or merge them.
