// ../.claude/skills/zustand-state-architecture/templates/useStore.ts
import { create } from 'zustand';

// 1. Utility Type for deep object updates
type DeepPartial<T> = T extends Function ? T : T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;

// 2. Differentiate between data types
interface Item { id: string; name: string; }
interface Assignment { id: string; itemId: string; userId: string; }

// 3. Clear generic state interface with Actions
interface State<T> {
    currentEvent: T | null;
    isLoading: boolean;

    // Actions
    setLoading: (loading: boolean) => void;
    updateCurrentEventPartial: (updates: DeepPartial<T>) => void;
    deleteItem: (itemId: string) => void;
}

export const useStore = <T extends { id?: string; items?: Record<string, any>; assignments?: Record<string, any> }>() => create<State<T>>((set, get) => ({
    currentEvent: null,
    isLoading: true,

    setLoading: (loading) => set({ isLoading: loading }),

    // 4. ✨ Golden Example: Partial Updates
    // Safe initialization - creates base event if doesn't exist yet
    updateCurrentEventPartial: (updates) => set((state) => {
        if (!state.currentEvent) {
            // First data arriving - initialize with minimal structure
            return {
                currentEvent: {
                    id: updates.id || '',
                    items: {}, // Init default properties
                    assignments: {},
                    ...updates
                },
                isLoading: false
            };
        }

        // Note: This relies on a spread which is shallow. 
        // For production using DeepPartial, consider using a deep merge utility (like lodash merge or similar structure)
        return {
            currentEvent: { ...state.currentEvent, ...updates } as T,
            isLoading: false
        };
    }),

    // 5. ✨ Golden Example: UX Optimistic Updates
    // IMPORTANT: This cascading delete is strictly a UI-level optimistic update for immediate feedback.
    // The ACTUAL secure database wipe is exclusively managed by the backend (e.g., Cloud Functions).
    deleteItem: (itemId) => set((state) => {
        if (!state.currentEvent?.items) return state;

        // Remove Item
        const updatedItems = { ...state.currentEvent.items };
        delete updatedItems[itemId];

        // Cascading delete: also delete all assignments related to this item
        const updatedAssignments = { ...state.currentEvent.assignments };
        Object.keys(updatedAssignments).forEach(assignmentId => {
            if (updatedAssignments[assignmentId].itemId === itemId) {
                delete updatedAssignments[assignmentId];
            }
        });

        return {
            currentEvent: {
                ...state.currentEvent,
                items: updatedItems,
                assignments: updatedAssignments
            } as T
        };
    }),
}));
