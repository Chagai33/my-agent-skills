// ../.claude/skills/firebase-realtime-auth/templates/auth-flow.tsx

import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export const AuthFlowExample: React.FC = () => {
    // 1. ✨ Golden Example: Local user state
    const [localUser, setLocalUser] = useState<FirebaseUser | null>(null);
    const [showNameModal, setShowNameModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<any>(null);

    // 2. ✨ Golden Example: Background Registration
    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Background auth is complete. Store the User ID.
                setLocalUser(user);
            } else {
                // If they don't have a token, give them one without showing a login screen
                signInAnonymously(auth).catch(err => {
                    console.error("Anonymous sign-in failed:", err);
                });
            }
        });

        // 3. ✨ Golden Example: Cleanup
        return () => {
            unsubAuth();
        };
    }, []);

    // 4. ✨ Golden Example: Delayed Profiling (Name Modal)
    const handleUserAction = (data: any) => {
        if (!localUser) return;

        // Check if the user has already provided their profile name for this session/event
        const isParticipant = false; // Check against your Event participants list in production

        if (localUser.isAnonymous && !isParticipant) {
            // User has the background identity, but hasn't provided a name yet.
            setShowNameModal(true);
            setPendingAction(data); // Save the action to execute after the modal closes
        } else {
            // Safe to execute immediately
            executeAction(data, localUser);
        }
    };

    const executeAction = (data: any, user: FirebaseUser) => {
        console.log("Executing action for user:", user.uid);
    }

    const handleJoinEvent = async (name: string) => {
        if (!localUser || !name.trim()) return;

        try {
            // e.g. await FirebaseService.joinEvent(eventId, localUser.uid, name.trim());
            setShowNameModal(false);

            if (pendingAction) {
                executeAction(pendingAction, localUser);
                setPendingAction(null);
            }
        } catch (error) {
            toast.error('Error joining');
        }
    };

    return (
        <div>
            <button onClick={() => handleUserAction({ action: 'claim-item' })}>Claim Item</button>
            {/* 
                Render your Name Modal here if `showNameModal` is true. 
                It should call `handleJoinEvent(name)` on submit.
             */}
        </div>
    )
}
