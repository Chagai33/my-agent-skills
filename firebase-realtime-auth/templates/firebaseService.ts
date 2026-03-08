// ../.claude/skills/firebase-realtime-auth/templates/firebaseService.ts

import { ref, onValue, off, runTransaction } from 'firebase/database';
import { database } from '../lib/firebase';

export class FirebaseService {
    /**
     * ✨ Golden Example: Granular Subscriptions
     * Listen only to specific paths to reduce bandwidth.
     * Don't listen to the parent object if it contains heavy lists.
     */
    static subscribeToDetails(
        eventId: string,
        callback: (details: any | null) => void
    ): () => void {
        const detailsRef = ref(database, `events/${eventId}/details`);

        const onValueChange = (snapshot: any) => {
            callback(snapshot.exists() ? snapshot.val() : null);
        };

        onValue(detailsRef, onValueChange, (error) => {
            console.error(`❌ Error subscribing tracking details:`, error);
            callback(null);
        });

        // CRITICAL: Always return cleanup function
        return () => off(detailsRef, 'value', onValueChange);
    }

    /**
     * ✨ Golden Example: runTransaction for safe writes
     * Use this when multiple users might try to write simultaneously.
     * It re-runs automatically if the data changed during execution.
     */
    static async addRestrictedItem(eventId: string, itemData: any): Promise<string> {
        const eventRef = ref(database, `events/${eventId}`);
        let newItemId: string | null = null;

        await runTransaction(eventRef, (currentEventData: any | null) => {
            // 1. Return current state if null (Firebase internal retry logic)
            if (currentEventData === null) return currentEventData;

            // 2. Validate Constraints
            const details = currentEventData.details;
            const creatorId = itemData.creatorId;
            const itemCount = currentEventData.userCounts?.[creatorId] || 0;

            if (!details.allowItems) {
                throw new Error('Not allowed to add items.');
            }

            if (itemCount >= details.limit) {
                throw new Error('Limit reached.');
            }

            // 3. Prepare Update (generate IDs inside or manually mapped)
            const newItemIdKey = `item_${Date.now()}`;
            newItemId = newItemIdKey;

            if (!currentEventData.items) currentEventData.items = {};
            if (!currentEventData.userCounts) currentEventData.userCounts = {};

            // 4. Update the object
            currentEventData.items[newItemId] = { ...itemData, id: newItemId };
            currentEventData.userCounts[creatorId] = itemCount + 1;

            // 5. Must return the mutated original object
            return currentEventData;
        });

        if (!newItemId) throw new Error("Failed generating ID.");
        return newItemId;
    }
}
