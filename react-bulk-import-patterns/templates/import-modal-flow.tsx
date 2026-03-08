import React, { useState } from 'react';
import { parseExcelFile, parseCSVFile, ParsedItem } from './excel-csv-parser';

// Placeholder for external services
const toast = { success: (m: string) => { }, error: (m: string) => { } };
const FirebaseService = {
    addMenuItem: async (eventId: string, item: any) => 'new-id'
};

export function ImportModalFlow({ eventId, existingItemNames, onClose }: { eventId: string, existingItemNames: Set<string>, onClose: () => void }) {
    const [importItems, setImportItems] = useState<ParsedItem[]>([]);
    const [showPreview, setShowPreview] = useState(false);
    const [isImporting, setIsImporting] = useState(false);

    // 1. File Selection & Parsing Phase
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            let items: ParsedItem[] = [];
            if (file.name.endsWith('.xlsx')) {
                items = await parseExcelFile(file);
            } else if (file.name.endsWith('.csv')) {
                items = await parseCSVFile(file);
            } else {
                toast.error('סוג קובץ לא נתמך');
                return;
            }

            setImportItems(items);
            setShowPreview(true); // Transition to Preview Phase

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            e.target.value = ''; // Reset input
        }
    };

    // 2. Execution Phase
    const executeImport = async () => {
        // Only import items that are selected and have no validation errors
        const selectableItems = importItems.filter(item => item.selected && !item.error);

        if (selectableItems.length === 0) {
            toast.error('אין פריטים תקינים לייבוא');
            return;
        }

        // Optional: Duplicate Check
        const duplicates = selectableItems.filter(item => existingItemNames.has(item.name.toLowerCase()));
        if (duplicates.length > 0) {
            // In a real app, transition to a 'Duplicate Confirmation' view here
            console.log(`Found ${duplicates.length} duplicates. Handling logic required.`);
        }

        setIsImporting(true);
        let successCount = 0;
        let errorCount = 0;

        // Loop through and upload valid items
        for (const item of selectableItems) {
            try {
                await FirebaseService.addMenuItem(eventId, {
                    name: item.name,
                    quantity: item.quantity,
                    notes: item.notes || ''
                });
                successCount++;
            } catch (error) {
                console.error(`Error importing ${item.name}:`, error);
                errorCount++;
                // Show specific error for the first failure to aid debugging
                if (errorCount === 1) toast.error(`נכשל ייבוא של: ${item.name}`);
            }
        }

        setIsImporting(false);

        // Provide final summary feedback
        if (successCount > 0) toast.success(`${successCount} פריטים יובאו בהצלחה`);
        if (errorCount > 0) toast.error(`נכשלו ${errorCount} פריטים`);

        if (successCount > 0 && errorCount === 0) {
            onClose(); // Auto-close if completely successful
        }
    };

    // 3. Preview Render Phase (Simplified)
    if (showPreview) {
        return (
            <div className="preview-container">
                <h2>תצוגה מקדימה ({importItems.length} פריטים)</h2>
                <ul>
                    {importItems.map((item, index) => (
                        <li key={index} className={item.error ? 'text-red-500' : ''}>
                            <input
                                type="checkbox"
                                checked={item.selected}
                                disabled={!!item.error}
                                onChange={() => {
                                    const newItems = [...importItems];
                                    newItems[index].selected = !newItems[index].selected;
                                    setImportItems(newItems);
                                }}
                            />
                            {item.name} (כמות: {item.quantity})
                            {item.error && <span> - {item.error}</span>}
                        </li>
                    ))}
                </ul>

                <button onClick={executeImport} disabled={isImporting}>
                    {isImporting ? 'מייבא...' : 'אשר וייבא'}
                </button>
            </div>
        );
    }

    return (
        <div className="upload-container">
            <input type="file" accept=".xlsx,.csv" onChange={handleFileUpload} />
        </div>
    );
}
