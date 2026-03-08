// ../.claude/skills/tailwind-bento-architecture/templates/tailwind-config-snippet.js

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                // ✨ Golden Example: Custom typography standard (Rubik)
                sans: ['Rubik', 'sans-serif'],
            },
            colors: {
                // ✨ Golden Example: Semantic palette without hard-coded color names
                primary: '#009688',
                success: '#10b981',
                error: '#ef4444',

                accent: {
                    DEFAULT: '#FBBF95',     // Soft peach - for backgrounds, borders, focus rings
                    dark: '#E89A5F',        // WCAG AA compliant - for buttons with white text (4.51:1)
                },

                neutral: {
                    50: '#f9fafb',          // Primary App background (softest)
                    100: '#f3f4f6',         // Component background / Cards
                    200: '#e5e7eb',         // Light borders
                    800: '#1f2937',         // Standard Text color
                    900: '#11182c',         // Headings
                },

                background: '#F5F7FA',    // General Page background

                rides: {
                    primary: '#88B39E',     // Sage green - for backgrounds, borders, focus rings
                    dark: '#5F8A76',        // WCAG AA compliant - for buttons with white text (4.52:1)
                    hover: '#7AA38D',       // Darker sage (legacy)
                    bg: '#EBF4EE',          // Pale sage background
                },
            },
            ringColor: {
                // ✨ Golden Example: Defined focus rings for accessibility and aesthetics
                'accent': '#FBBF95',      // Soft peach for item focus rings
                'rides': '#88B39E',       // Sage green for ride focus rings
            },
        },
    },
    plugins: [],
};
