import React, { useState } from 'react';
// import { X, Trash2, CheckCheck } from 'lucide-react';

interface GuestActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    activities: any[]; // Domain specific: Array of activity logs / submissions
}

export const GuestActivityModal: React.FC<GuestActivityModalProps> = ({ isOpen, onClose, activities }) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Split activities into "New" and "History" based on read status
    const newActivities = activities.filter(a => !a.isRead);
    const historyActivities = activities.filter(a => a.isRead);

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) newSelected.delete(id);
        else newSelected.add(id);
        setSelectedIds(newSelected);
    };

    const handleBulkApprove = async () => {
        // Process selected items ...
        setSelectedIds(new Set());
    };

    const handleBulkDelete = async () => {
        if (!window.confirm('Are you sure you want to delete these submissions?')) return;
        // Delete selected items ...
        setSelectedIds(new Set());
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[calc(100vh-2rem)] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Recent Guest Activity</h2>
                        <p className="text-sm text-gray-600">Review submissions from magic link users.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {selectedIds.size > 0 && (
                            <>
                                <button onClick={handleBulkDelete} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-medium">
                                    Delete ({selectedIds.size})
                                </button>
                                <button onClick={handleBulkApprove} className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
                                    Approve ({selectedIds.size})
                                </button>
                            </>
                        )}
                        <button onClick={onClose} className="p-3 text-gray-500">Close</button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Render New / History activity list similarly to the extracted Golden Example */}
                    {newActivities.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">New Actions</h3>
                            {newActivities.map(activity => (
                                <div key={activity.id} className="p-4 border rounded-xl mb-2 flex justify-between items-center cursor-pointer" onClick={() => toggleSelect(activity.id)}>
                                    <div>
                                        <input type="checkbox" checked={selectedIds.has(activity.id)} readOnly className="mr-3" />
                                        <span className="font-semibold">{activity.user_name}</span> completed {activity.action_type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
