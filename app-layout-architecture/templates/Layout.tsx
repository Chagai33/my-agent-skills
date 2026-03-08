import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    hideFooter?: boolean;
}

/**
 * Standard Layout wrapper component.
 * ALWAYS wrap application pages with this component to ensure the presence
 * of standard Header and Footer elements.
 */
export const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* REQUIRED: Standard Global Header */}
            <Header />

            {/* REQUIRED: Semantic main container with standardized viewport constraints */}
            <main id="main-content" className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 w-full">
                {children}
            </main>

            {/* REQUIRED: Standard Global Footer (unless explicitly told to hide for an app-style full screen view) */}
            {!hideFooter && <Footer />}
        </div>
    );
};
