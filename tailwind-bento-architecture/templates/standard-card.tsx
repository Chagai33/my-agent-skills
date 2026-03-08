// ../.claude/skills/tailwind-bento-architecture/templates/standard-card.tsx
import React from 'react';
import { Edit } from 'lucide-react';

interface StandardCardProps {
    title: string;
    description?: string;
    onAction?: () => void;
}

/**
 * ✨ Golden Example: Standard Bento Card
 * 
 * Notice the classes used to create the specific aesthetic:
 * - `bg-white`: Crisp foreground.
 * - `rounded-xl`: Soft rounded corners (Bento style).
 * - `shadow-sm hover:shadow-md`: Dynamic elevation layers.
 * - `border border-gray-200 hover:border-gray-300`: Subtle definition.
 * - `transition-all duration-200`: Smooth interactions.
 */
export const StandardCard: React.FC<StandardCardProps> = ({ title, description, onAction }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden group">

            {/* Standard Padding Container */}
            <div className="p-4 sm:p-5">

                {/* Header Row: Title and Top Action */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 break-words group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    {/* Icon Button using neutral styling overlaid with soft brand hover */}
                    <button
                        className="text-gray-400 hover:bg-accent/10 hover:text-accent-dark p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Edit Card"
                    >
                        <Edit size={18} />
                    </button>
                </div>

                {/* Optional Subtle Description Wrapper */}
                {description && (
                    <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        {description}
                    </p>
                )}

                {/* Dedicated Action Area with Semantic Button */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <button
                        onClick={onAction}
                        className="flex-1 bg-accent-dark text-white py-2.5 px-4 text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-offset-1 focus:ring-accent-dark"
                    >
                        Primary Action
                    </button>
                    <button
                        className="flex-1 bg-white text-gray-700 border border-gray-300 py-2.5 px-4 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};
