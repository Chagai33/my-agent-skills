import React from 'react';
// import { X, AlertTriangle } from 'lucide-react';
// import { useGoogleCalendar } from '../../contexts/GoogleCalendarContext';
// import { useAccessibility } from '../../hooks'; // generic focus management hook

interface GoogleCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GoogleCalendarModal: React.FC<GoogleCalendarModalProps> = ({ isOpen, onClose }) => {
    // const { isConnected, isPrimaryCalendar } = useGoogleCalendar();

    // Example dummy states to replace context context for generic example
    const isConnected = true;
    const isPrimaryCalendar = true;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Google Calendar Settings</h2>
                    <button onClick={onClose} className="p-3 text-gray-500 rounded-full">
                        Close
                        {/* <X className="w-5 h-5" /> */}
                    </button>
                </div>

                <div className="flex flex-col items-center gap-4 pb-4">

                    {/* CRITICAL WARNING: If user is connected to primary calendar, warn them! */}
                    {isConnected && isPrimaryCalendar && (
                        <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 text-start mb-2">
                            {/* <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> */}
                            <div className="space-y-1">
                                <p className="font-semibold text-amber-900 text-sm">
                                    Setup Required
                                </p>
                                <p className="text-xs text-amber-800">
                                    The app is currently connected to your primary calendar. We strongly recommend creating or selecting a dedicated secondary calendar for syncing app events.
                                </p>
                            </div>
                        </div>
                    )}

                    {!isConnected && (
                        <p className="text-sm text-gray-600 text-center">
                            Connect your Google Calendar to synchronize entities.
                        </p>
                    )}

                    <div className="w-full flex justify-center">
                        {/* Connect / Disconnect Buttons */}
                        {/* <GoogleCalendarConnectButton /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
