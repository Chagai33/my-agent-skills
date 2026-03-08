// ../.claude/skills/zustand-state-architecture/templates/useStore.ts
import { create } from 'zustand';

// 1. Differentiate between data types
interface Item { id: string; name: string; }
interface Assignment { id: string; itemId: string; userId: string; }

// 2. Clear state interface with Actions
interface ExampleState {
    currentEvent: any | null;
    isLoading: boolean;

    // Actions
    setLoading: (loading: boolean) => void;
    updateCurrentEventPartial: (updates: Partial<any>) => void;
    deleteItem: (itemId: string) => void;
}

export const useStore = create<ExampleState>((set, get) => ({
    currentEvent: null,
    isLoading: true,

    setLoading: (loading) => set({ isLoading: loading }),

    // 3. ✨ Golden Example: Partial Updates
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

        return {
            currentEvent: { ...state.currentEvent, ...updates },
            isLoading: false
        };
    }),

    // 4. ✨ Golden Example: Cascading Deletions and Immer-like updates
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
            }
        };
    }),
}));
