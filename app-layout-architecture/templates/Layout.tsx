import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* REQUIRED: Added pb-20/pb-24 to prevent overlap with FABs */}
            <main id="main-content" className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-20 sm:pt-4 sm:pb-24 w-full">
                {children}
            </main>

            {!hideFooter && <Footer />}
        </div>
    );
};