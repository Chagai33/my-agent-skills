import React, { useState } from 'react';
// import { X, Link as LinkIcon, MessageCircle, Users, Check } from 'lucide-react';
// import { useTenant } from '../../contexts/TenantContext';

interface GuestPortalManagementProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GuestPortalManagement: React.FC<GuestPortalManagementProps> = ({ isOpen, onClose }) => {
    const [isGuestPortalEnabled, setIsGuestPortalEnabled] = useState(true);
    const [copiedLink, setCopiedLink] = useState(false);

    // Generate portal URL based on environment/tenant
    const portalUrl = `${window.location.origin}/portal/guest-access`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(portalUrl);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error('Error copying link:', err);
        }
    };

    const getMessage = () => {
        return `Hi! 👋\n\nYou have been granted temporary access to the portal.\n\nPlease use this magic link to enter:\n${portalUrl}\n\nThank you!`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-2xl w-full p-4 sm:p-6"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Guest Portal Management
                    </h2>
                    <button onClick={onClose} className="p-3 text-gray-500 rounded-lg">
                        Close
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Share Section */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
                        <h3 className="font-semibold text-gray-900">Share Magic Link</h3>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-2">Portal Link:</p>
                            <p className="text-sm text-gray-700 break-all font-mono">{portalUrl}</p>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={handleCopyLink}
                                className="flex flex-col items-center gap-1.5 p-3 bg-blue-50 text-blue-600 rounded-xl"
                            >
                                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                            </button>

                            <button
                                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(getMessage())}`, '_blank')}
                                className="flex flex-col items-center gap-1.5 p-3 bg-green-50 text-green-700 rounded-xl"
                            >
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Portal Access Settings */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Enable Guest Portal</h3>
                            <p className="text-sm text-gray-600">Allow guests to access restricted areas using magic links.</p>
                        </div>

                        <button
                            onClick={() => setIsGuestPortalEnabled(!isGuestPortalEnabled)}
                            className={`relative h-8 w-14 rounded-full ${isGuestPortalEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isGuestPortalEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
