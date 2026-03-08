// ../.claude/skills/zustand-state-architecture/templates/selectors.ts

// 1. Types for context
interface SpecificDomainModel {
    id: string;
    items?: Record<string, unknown>;
    assignments?: Record<string, Assignment>;
}
interface AppState { currentEvent: SpecificDomainModel | null; }
interface Assignment { id: string; itemId: string; }

// 2. ✨ Golden Example: Standard Entity Array Selector
// Firebase returns an object. Convert it to an array and inject the ID.
export const selectItems = (state: AppState) => {
    const event = state.currentEvent;
    if (!event?.items) return [];

    return Object.entries(event.items).map(([id, item]) => ({
        ...(item as Record<string, unknown>),
        id,
        eventId: event.id, // Inject parent ID for convenience
    }));
};

// 3. ✨ Golden Example: O(1) Optimized Lookup Selector
/**
 * 🚀 OPTIMIZATION: Returns assignments organized by itemId (O(1) lookup).
 * Improves performance for large lists - instead of O(n) filter for every item.
 */
export const selectAssignmentsByItemId = (state: AppState): Map<string, Assignment[]> => {
    const event = state.currentEvent;
    if (!event?.assignments) return new Map();

    const map = new Map<string, Assignment[]>();

    Object.entries(event.assignments).forEach(([id, assignment]) => {
        const fullAssignment = { ...(assignment as Omit<Assignment, 'id'>), id };
        const itemId = fullAssignment.itemId;

        if (!map.has(itemId)) {
            map.set(itemId, []);
        }
        map.get(itemId)!.push(fullAssignment);
    });

    return map;
};
