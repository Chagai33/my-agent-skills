import { format, parseISO } from 'date-fns';

export interface GoogleCalendarEventTemplate {
    title: string;
    startDate: string;
    endDate: string;
    description?: string;
    location?: string;
    recurrence?: string;
}

/**
 * Pure utility function to generate an absolute link that will prefill 
 * a Google Calendar event in the browser. Useful as a fallback without API auth.
 */
export function generateGoogleCalendarLink(event: GoogleCalendarEventTemplate): string {
    const baseUrl = 'https://calendar.google.com/calendar/render';

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${event.startDate}/${event.endDate}`,
    });

    if (event.description) params.append('details', event.description);
    if (event.location) params.append('location', event.location);
    if (event.recurrence) params.append('recur', event.recurrence);

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Formats a Date object specifically for Google APIs (RFC3339 format)
 * Handles "all day" events vs. specific time events.
 */
export function formatDateForGoogleCalendar(date: Date, allDay: boolean = false): string {
    if (allDay) {
        return format(date, 'yyyyMMdd');
    }
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
}

/**
 * Generic mapper function demonstrating how to map customized domain entities
 * into a generic format acceptable by Google Calendar APIs.
 */
export function mapDomainEntityToCalendarEvent(
    entity: any,
    language: string = 'en'
): GoogleCalendarEventTemplate {
    // Extract or parse dates safely
    const startDate = new Date(entity.date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // e.g. all day event

    let title = `${entity.name} | App Event`;
    let description = `Created from generic sync engine.\nNotes: ${entity.notes || ''}`;

    return {
        title,
        startDate: formatDateForGoogleCalendar(startDate, true),
        endDate: formatDateForGoogleCalendar(endDate, true),
        description,
    };
}
