/**
 * ✨ Golden Example: Static Translation Checker (AST Based)
 * 
 * This robust Node.js script uses `ts-morph` to traverse the AST of React files securely.
 * It replaces fragile Regex and detects:
 * 1. Missing keys: Exact literal strings passed to `t("key")`.
 * 2. Unresolvable Dynamic Keys: Will warn you if a dynamic variable is passed to `t`.
 * 3. Hardcoded Hebrew: Precise string literacy checks for `[\u0590-\u05FF]` 
 *    in JSX Text and String Literals.
 * 
 * Run via: npx ts-node check_translations.ts
 */

import { Project, SyntaxKind, StringLiteral, JsxText, CallExpression } from 'ts-morph';
import fs from 'fs';
import path from 'path';

// Note: Ensure ts-morph is installed (`npm install ts-morph`)

const projectRoot = path.resolve(__dirname, '../../../../');
const hePath = path.join(projectRoot, 'src/locales/he.json');

// Graceful exit if locale isn't found
if (!fs.existsSync(hePath)) {
    console.error(`Locale file missing: ${hePath}`);
    process.exit(1);
}

const heContent = JSON.parse(fs.readFileSync(hePath, 'utf8'));

// Utility to flatten JSON keys
function flattenKeys(obj: any, prefix = ''): string[] {
    let keys: string[] = [];
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
let standardizedKeys = new Set<string>();
flatKeys.forEach(k => {
    standardizedKeys.add(k);
    if (k.startsWith('translation.')) {
        standardizedKeys.add(k.replace('translation.', ''));
    }
});

const project = new Project({
    // Optional: Load tsconfig directly if running from root
    // tsConfigFilePath: path.join(projectRoot, "tsconfig.json"), 
});

// Target the appropriate files (adjust glob as needed)
project.addSourceFilesAtPaths(path.join(projectRoot, "src/**/*.{ts,tsx}"));

type Finding = { file: string, line: number, content: string };
const missingKeys: Finding[] = [];
const dynamicKeyWarnings: Finding[] = [];
const hardcodedHebrew: Finding[] = [];

const HEBREW_REGEX = /[\u0590-\u05FF]+/;

project.getSourceFiles().forEach(sourceFile => {
    const filePath = sourceFile.getFilePath();
    const fileName = path.basename(filePath);

    // 1. Analyze function calls to `t`
    const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

    callExpressions.forEach((callExpr: CallExpression) => {
        const expression = callExpr.getExpression();
        const funcName = expression.getText();

        if (funcName === 't' || funcName === 'i18n.t') {
            const args = callExpr.getArguments();
            if (args.length === 0) return;

            const firstArg = args[0];

            if (firstArg.isKind(SyntaxKind.StringLiteral)) {
                // Exact key matched accurately
                const key = firstArg.getLiteralValue();
                if (!standardizedKeys.has(key)) {
                    missingKeys.push({ file: fileName, line: firstArg.getStartLineNumber(), content: key });
                }
            } else {
                // Dynamic variable or template literal that breaks static resolving
                dynamicKeyWarnings.push({ file: fileName, line: firstArg.getStartLineNumber(), content: firstArg.getText() });
            }
        }
    });

    // 2. Discover Hardcoded Hebrew accurately in literal strings and JSX text
    // Only search true text values, ignoring code property names or structure

    sourceFile.getDescendantsOfKind(SyntaxKind.JsxText).forEach((jsxText: JsxText) => {
        const text = jsxText.getLiteralText().trim();
        if (text && HEBREW_REGEX.test(text)) {
            hardcodedHebrew.push({ file: fileName, line: jsxText.getStartLineNumber(), content: text });
        }
    });

    sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((strLit: StringLiteral) => {
        // Skip strings that are part of JSON imports or known properties if needed, 
        // but generally string literals inside TS code containing Hebrew are hardcoded outputs
        const text = strLit.getLiteralValue().trim();
        if (text && HEBREW_REGEX.test(text)) {

            // Minor exclusion check: Ignore string literals that are passed exactly to `t()`
            const parent = strLit.getParent();
            if (parent && parent.isKind(SyntaxKind.CallExpression)) {
                const callParent = parent as CallExpression;
                if (callParent.getExpression().getText() === 't') return;
            }

            hardcodedHebrew.push({ file: fileName, line: strLit.getStartLineNumber(), content: text });
        }
    });
});

console.log('\n--- Missing Keys (used in code but not in he.json) ---');
missingKeys.forEach(m => console.log(`${m.file}:${m.line} - ${m.content}`));

console.log('\n--- Dynamic Translation Warnings (Cannot be statically analyzed) ---');
dynamicKeyWarnings.forEach(m => console.log(`[WARNING] ${m.file}:${m.line} - ${m.content}`));

console.log('\n--- Hardcoded Hebrew (Needs to be extracted to translations) ---');
hardcodedHebrew.forEach(h => console.log(`${h.file}:${h.line} - "${h.content}"`));
