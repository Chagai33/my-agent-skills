---
name: google-calendar-sync-engine
description: Generic full-featured Google Calendar synchronization engine structure
---

# google-calendar-sync-engine

## Overview
This skill implements a full-featured Google Calendar synchronization engine. It provides a React Context wrapper for OAuth and state management, an API service client for backend interactions (e.g., syncing single/bulk events, cleaning orphans), and UI components to manage calendar configuration. 

It handles advanced use cases such as:
1. Connecting to Google OAuth2.
2. Managing "Primary" vs "Secondary" calendars to prevent polluting the user's main calendar.
3. Bulk synchronization, rate limiting awareness, and background jobs.
4. Error handling and accessibility (Focus Management, Screen Reader announcements).

## Golden Templates
The `templates/` folder contains extracted, abstracted files showing how the system fits together:
- `GoogleCalendarContext.tsx`: The primary state machine Context wrapper.
- `googleCalendar.service.ts`: API client class bridging the frontend to cloud functions.
- `GoogleCalendarModal.tsx`: UI modal with connection warnings and accessibility.
- `googleCalendar.ts`: Utilities for transforming domain entities into Google Calendar events.

## What NOT to do (Negative Constraints)
- **DO NOT** hardcode Google Client IDs or API keys. Always use environment variables (e.g., `import.meta.env`).
- **DO NOT** block the main thread during bulk syncing. Offload bulk processing to background jobs/cloud functions and use optimistic UI updates.
- **DO NOT** store tokens insecurely in LocalStorage. Let the backend manage Refresh Tokens, or manage sessions safely via HTTP-only cookies.
- **DO NOT** bypass user consent or blindly sync to the user's primary calendar. Always encourage the creation of a dedicated secondary calendar for the app.
