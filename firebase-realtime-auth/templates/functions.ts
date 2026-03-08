import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp();
}

/**
 * ✨ Golden Example: Server-Side Cascading Delete with Idempotency
 * 
 * This Cloud Function listens to the deletion of a parent entity (e.g., an Item) 
 * and securely wipes all associated child entities (e.g., Assignments) on the backend.
 * 
 * IMPORTANT: 
 * - Client-side implementations (like Zustand stores) may delete objects optimistically for the UI, 
 *   but the actual authoritative wipe MUST happen here to prevent orphaned data on network failures.
 * - Idempotency is crucial: functions may trigger more than once. We check if the data exists before acting.
 */

export const onDeleteItemCascade = functions.database
    .ref('/events/{eventId}/items/{itemId}')
    .onDelete(async (snap, context) => {
        const { eventId, itemId } = context.params;
        const db = admin.database();

        console.log(`[onDeleteItemCascade] Triggered for event ${eventId}, item ${itemId}`);

        try {
            // Target the associated assignments collection
            const assignmentsRef = db.ref(`/events/${eventId}/assignments`);

            // Fetch assignments to query the ones matching the deleted itemId
            const snapshot = await assignmentsRef.orderByChild('itemId').equalTo(itemId).once('value');

            if (!snapshot.exists()) {
                console.log(`[onDeleteItemCascade] No assignments found related to item ${itemId}. Skipping (Idempotency check).`);
                return null;
            }

            const updates: Record<string, null> = {};

            // Build the multi-path update object to delete all matching assignments
            snapshot.forEach((childSnap) => {
                updates[childSnap.key!] = null;
            });

            console.log(`[onDeleteItemCascade] Proceeding to securely delete ${Object.keys(updates).length} assignments.`);

            // Execute the batch wipe
            await assignmentsRef.update(updates);

            console.log(`[onDeleteItemCascade] Successfully wiped assignments for item ${itemId}.`);
            return null;

        } catch (error) {
            console.error(`[onDeleteItemCascade] Error securely wiping assignments for item ${itemId}:`, error);
            // In a production app, you might want to report this error to an alerting service
            throw new functions.https.HttpsError('internal', 'Cascading delete failed on the server.');
        }
    });
