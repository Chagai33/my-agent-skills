// ../.claude/skills/i18n-localization-workflow/scripts/check_translations.js
/**
 * ✨ Golden Example: Static Translation Checker
 * 
 * This script scans the project's .tsx files to find:
 * 1. Missing keys: `t('key')` where 'key' doesn't exist in `he.json`.
 * 2. Hardcoded Hebrew: Raw Hebrew text `[\u0590-\u05FF]` inside files.
 * 
 * Run via: node check_translations.js
 */

const fs = require('fs');
const path = require('path');

// Target specific files or scan dirs
const filesToCheck = [
    'src/pages/EventPage.tsx',
    'src/components/Admin/BulkItemsManager.tsx',
    // ... add more dynamically
];

const hePath = 'src/locales/he.json';
const heContent = JSON.parse(fs.readFileSync(hePath, 'utf8'));

// Utility to flatten JSON keys (e.g., eventPage: { title: "..." } -> eventPage.title)
function flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            keys = keys.concat(flattenKeys(obj[k], prefix + k + '.'));
        } else {
            keys.push(prefix + k);
        }
    }
    return keys;
}

const flatKeys = new Set(flattenKeys(heContent));

// Identify if 'translation' is top level wrapper
let standardizedKeys = new Set();
flatKeys.forEach(k => {
    standardizedKeys.add(k);
    if (k.startsWith('translation.')) {
        standardizedKeys.add(k.replace('translation.', ''));
    }
});

const tRegex = /\bt\(['"]([^'"]+)['"]\)/g;
const hebrewRegex = /[\u0590-\u05FF]+/g;

let missingKeys = [];
let hardcodedHebrew = [];

filesToCheck.forEach(file => {
    const fullPath = path.resolve(__dirname, '../../../../', file); // adjust based on execution context
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Find t('key')
        let match;
        while ((match = tRegex.exec(line)) !== null) {
            const key = match[1];
            if (key.includes('${') || key.includes('+')) continue; // Skip dynamic templates

            if (!standardizedKeys.has(key)) {
                missingKeys.push({ file, line: lineNum, key });
            }
        }

        // Find Hardcoded Hebrew
        if (line.trim().startsWith('import ') || line.trim().startsWith('//')) return;
        if (hebrewRegex.test(line)) {
            hardcodedHebrew.push({ file, line: lineNum, content: line.trim() });
        }
    });
});

console.log('\n--- Missing Keys (used in code but not in he.json) ---');
missingKeys.forEach(m => console.log(`${m.file}:${m.line} - ${m.key}`));

console.log('\n--- Potential Hardcoded Hebrew ---');
hardcodedHebrew.forEach(h => console.log(`${h.file}:${h.line} - ${h.content}`));
