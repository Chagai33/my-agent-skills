// ../.claude/skills/i18n-localization-workflow/scripts/update_locales.cjs
/**
 * ✨ Golden Example: Automated Bulk Translation Updates
 * 
 * Instead of editing he.json, en.json, es.json manually when doing 
 * large structural additions, define a `missingTranslations` object 
 * and deep merge it across all locales automatically.
 * 
 * Run via: node update_locales.cjs
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../../../src'); // adjust context
const localesDir = path.join(srcDir, 'locales');

const files = {
    he: path.join(localesDir, 'he.json'),
    en: path.join(localesDir, 'en.json'),
    es: path.join(localesDir, 'es.json'),
};

// Define structure with all languages inline
const newTranslations = {
    newFeature: {
        title: { he: "תכונה חדשה", en: "New Feature", es: "Nueva Característica" },
        save: { he: "שמור", en: "Save", es: "Guardar" }
    }
};

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

function extractLang(source, lang) {
    const result = {};
    for (const key in source) {
        if (key === lang && typeof source[key] === 'string') {
            return source[key];
        }
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (source[key][lang]) {
                result[key] = source[key][lang];
            } else {
                const nested = extractLang(source[key], lang);
                if (Object.keys(nested).length > 0) result[key] = nested;
            }
        }
    }
    return result;
}

['he', 'en', 'es'].forEach(lang => {
    try {
        console.log(`Processing ${lang}...`);
        const filePath = files[lang];
        if (!fs.existsSync(filePath)) return;

        const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const extracted = extractLang(newTranslations, lang);

        // Assuming translations are under an object or root. 
        // Adjust depending on if `translation:` wrapper exists in your json.
        const targetObj = currentData.translation ? currentData.translation : currentData;

        deepMerge(targetObj, extracted);
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 4), 'utf8');

        console.log(`Updated ${lang}.json`);
    } catch (e) {
        console.error(`Error processing ${lang}:`, e);
    }
});
