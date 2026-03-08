// Abstracted Guest/Temporary Access Service
// Uses Firebase Cloud Functions for secure token generation and validation

export interface GuestVerificationData {
    type: 'email' | 'phone' | 'magic_link';
    identifier?: string;
    code?: string;
}

export interface GuestSession {
    entityId: string;
    firstName: string;
    lastName: string;
    verification: GuestVerificationData;
    expiresAt: number;
    token: string;
}

export interface GuestLoginResponse {
    success: boolean;
    token?: string;
    entityId?: string;
    // other domain-specific payload
}

const SESSION_KEY = 'guest_portal_session';

export const guestService = {
    // Login with restricted credentials to receive a temporary token
    async login(firstName: string, lastName: string, verification: GuestVerificationData): Promise<GuestLoginResponse> {
        // const fn = httpsCallable(functions, 'guestPortalOps');
        // const result = await fn({ mode: 'login', firstName, lastName, verification });
        // const data = result.data as GuestLoginResponse;
        const data: GuestLoginResponse = { success: true, token: 'mock_token', entityId: 'mock_id' };

        if (data.success && data.token && data.entityId) {
            this.saveSession(data.entityId, firstName, lastName, verification, data.token);
        }

        return data;
    },

    // Perform an authenticated action using the temporary token
    async performRestrictedAction(action: string, payload: any): Promise<any> {
        const session = this.getSession();
        if (!session) throw new Error('No active session. Please log in again using your magic link.');

        // const fn = httpsCallable(functions, 'guestPortalOps');
        // return await fn({
        //   mode: 'restricted_action',
        //   action: action,
        //   token: session.token, // Token verified by backend!
        //   payload: payload
        // });
        return { success: true };
    },

    // Session Management (Client-Side)
    saveSession(entityId: string, firstName: string, lastName: string, verification: GuestVerificationData, token: string) {
        const session: GuestSession = {
            entityId,
            firstName,
            lastName,
            verification,
            expiresAt: Date.now() + (30 * 60 * 1000), // e.g., 30 minutes
            token
        };
        // Ensure tokens are cleared when session ends or expires
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    },

    getSession(): GuestSession | null {
        const json = sessionStorage.getItem(SESSION_KEY);
        if (!json) return null;

        try {
            const session = JSON.parse(json) as GuestSession;
            if (Date.now() > session.expiresAt) {
                this.clearSession();
                return null; // Expired
            }
            return session;
        } catch {
            return null;
        }
    },

    clearSession() {
        sessionStorage.removeItem(SESSION_KEY);
    }
};
