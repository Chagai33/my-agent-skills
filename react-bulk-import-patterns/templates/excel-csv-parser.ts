import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// The temporary structure used during the preview phase
export interface ParsedItem {
    name: string;
    quantity: number;
    notes?: string;
    selected: boolean;
    error?: string; // Presence of this string indicates validation failure
}

/**
 * Parses an Excel file (.xlsx, .xls) into a standardized array of items.
 * Uses a Promise to avoid blocking the main thread.
 */
export const parseExcelFile = (file: File): Promise<ParsedItem[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert sheet to array of arrays
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number)[][];
                const items: ParsedItem[] = [];

                // Simple header detection: If the first row, first column contains 'שם' or 'name', skip to row 1
                const startRow = jsonData[0] && typeof jsonData[0][0] === 'string' &&
                    (jsonData[0][0].includes('שם') || jsonData[0][0].includes('name')) ? 1 : 0;

                for (let i = startRow; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (!row || !row[0]) continue; // Skip empty rows

                    const name = String(row[0]).trim();
                    const quantity = row[1] ? parseInt(String(row[1])) || 1 : 1;
                    const notes = row[2] ? String(row[2]).trim() : undefined;

                    // Client-side Validation
                    if (name.length < 2) {
                        items.push({ name, quantity: 1, notes, selected: false, error: 'שם קצר מדי' });
                        continue;
                    }
                    if (quantity < 1 || quantity > 100) {
                        items.push({ name, quantity: 1, notes, selected: false, error: 'כמות לא תקינה' });
                        continue;
                    }

                    items.push({ name, quantity, notes, selected: true });
                }
                resolve(items);
            } catch (error) {
                reject(new Error('שגיאה אירעה בעת קריאת קובץ האקסל'));
            }
        };

        reader.onerror = () => reject(new Error('שגיאה אירעה בעת קריאת הקובץ'));
        reader.readAsArrayBuffer(file);
    });
};

/**
 * Parses a CSV file using PapaParse.
 * Uses a Promise to wrap the callback-based Papa.parse API.
 */
export const parseCSVFile = (file: File): Promise<ParsedItem[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => {
                try {
                    const items: ParsedItem[] = [];
                    const data = results.data as string[][];

                    // Simple header detection
                    const startRow = data[0] && data[0][0] &&
                        (data[0][0].includes('שם') || data[0][0].includes('name')) ? 1 : 0;

                    for (let i = startRow; i < data.length; i++) {
                        const row = data[i];
                        if (!row || !row[0] || !row[0].trim()) continue;

                        const name = row[0].trim();
                        const quantity = row[1] ? parseInt(row[1]) || 1 : 1;
                        const notes = row[2] ? row[2].trim() : undefined;

                        // Client-side Validation
                        if (name.length < 2) {
                            items.push({ name, quantity: 1, notes, selected: false, error: 'שם קצר מדי' });
                            continue;
                        }

                        items.push({ name, quantity, notes, selected: true });
                    }
                    resolve(items);
                } catch (error) {
                    reject(new Error('שגיאה בעת פיענוח מחרוזת ה-CSV'));
                }
            },
            error: () => reject(new Error('שגיאה בעת קריאת קובץ ה-CSV')),
            encoding: 'UTF-8' // Crucial for Hebrew support
        });
    });
};
