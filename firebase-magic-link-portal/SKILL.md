---
name: firebase-magic-link-portal
description: Secure, temporary access portal using Magic Links and restricted tokens
---

# firebase-magic-link-portal

## Overview
This skill provides an architecture for a "Guest Portal" or temporary access system. It is designed for scenarios where external users (who do not have full accounts) need to perform specific, restricted actions in the app via a Magic Link (e.g., submitting a form, updating a specific entity, RSVPing).

The system uses:
1. Client-side short-lived session storage.
2. A backend validation layer (e.g., Firebase Cloud Functions) that issues and verifies a restricted token.
3. UI components for generating/sharing the links and reviewing the guest activity.

## Golden Templates
The `templates/` folder contains extracted files showing how this system fits together:
- `guest.service.ts`: API client class bridging the frontend to backend token issuance and restricted operations.
- `GuestPortalManagement.tsx`: The UI for admins to generate the magic links and share them via WhatsApp/Copy.
- `GuestActivityModal.tsx`: The UI for admins to review and approve/delete the submissions made by users originating from the portal.

## What NOT to do (Negative Constraints)
- **DO NOT** grant full database read/write access to guests - always use strict Firebase Security Rules (or equivalent backend validation) to ensure guests can only access the exact entity their token specifies.
- **DO NOT** store sensitive auth tokens insecurely. Use HTTP-only cookies if possible, or short-lived `sessionStorage` for temporary access tokens, but NEVER permanent `localStorage`.
- **DO NOT** hardcode Firebase credentials or secrets anywhere in the client code. All validation must happen in the backend.
- **DO NOT** allow the magic links to live forever. Links or the resulting tokens must have strict expiration times (e.g., 30 minutes).
