import React from 'react';

interface FooterProps {
    variant?: 'default' | 'minimal';
}

export const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
    const currentYear = new Date().getFullYear();

    if (variant === 'minimal') {
        return (
            <footer className="w-full py-2 text-center mt-auto" role="contentinfo">
                <nav className="flex justify-center items-center gap-2" aria-label="Legal links">
                    <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-900 transition-colors p-2">
                        Privacy Policy
                    </a>
                    <span aria-hidden="true" className="text-gray-400 select-none">•</span>
                    <a href="/terms" className="text-xs text-gray-600 hover:text-gray-900 transition-colors p-2">
                        Terms of Use
                    </a>
                </nav>
            </footer>
        );
    }

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
                <div className="flex flex-col items-center gap-2 text-center">
                    <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs" role="list">
                        <li><a href="/terms" className="text-gray-800 hover:text-gray-900 transition-colors">Terms of Use</a></li>
                        <li><a href="/privacy" className="text-gray-800 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                        <li><a href="/accessibility" className="text-gray-800 hover:text-gray-900 transition-colors">Accessibility</a></li>
                    </ul>
                    <div className="text-xs text-gray-500">
                        © {currentYear} Application Name. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};