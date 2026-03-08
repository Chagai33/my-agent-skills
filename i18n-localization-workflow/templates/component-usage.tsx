// ../.claude/skills/i18n-localization-workflow/templates/component-usage.tsx

import React from 'react';
// ✨ Golden Example: Import the hook
import { useTranslation } from 'react-i18next';

export const I18nComponentExample: React.FC = () => {
    // ✨ Golden Example: Initialize the hook
    const { t } = useTranslation();

    return (
        <div className="p-4 bg-white rounded-xl shadow-sm">
            {/* 
              ❌ NOT: <h2>ברוכים הבאים</h2>
              ✨ Golden Example: Use key paths matching locales/he.json
            */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                {t('common.greeting')}
            </h2>

            <p className="text-gray-600 mb-4">
                {t('eventPage.description')}
            </p>

            {/* ✨ Golden Example: Direction-aware styling with `rtl:` utility */}
            <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                    {t('common.saveChanges')}
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                    {t('common.cancel')}
                </button>
            </div>
        </div>
    );
};
