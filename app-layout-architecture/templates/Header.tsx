import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Added icons for the hamburger menu

export const Header: React.FC = () => {
    const user = { display_name: 'Guest User', email: 'guest@example.com' };
    const navigate = (path: string) => console.log('Navigate to:', path);
    const signOut = async () => console.log('Signing out');

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // ... (Keep existing useEffect hooks for clicking outside/escape)

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                {/* Dynamic height & Flex-wrap for safe RTL/Mobile rendering */}
                <div className="flex justify-between items-center min-h-[3.5rem] sm:min-h-[4rem] py-2 gap-2 sm:gap-4 flex-wrap">

                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <button onClick={() => navigate('/')} className="flex flex-col items-start transition-opacity hover:opacity-80">
                            <h1 className="text-xl font-bold break-words">AppLogo</h1>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Desktop User Menu (Unchanged, hidden on mobile) */}
                        <div className="hidden md:flex items-center gap-2">
                            {/* ... (Keep existing desktop user menu code here) ... */}
                        </div>

                        {/* Mobile View: Hamburger Menu */}
                        <div className="md:hidden flex items-center" ref={mobileMenuRef}>
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            {/* Safe Mobile Menu Dropdown */}
                            {showMobileMenu && (
                                <div className="absolute top-full start-0 end-0 bg-white border-b border-gray-200 shadow-lg py-2 z-50">
                                    {user && (
                                        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-white text-sm">U</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{user.display_name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    <button className="w-full text-start px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">Settings</button>
                                    
                                    {/* SAFE LOGOUT: Hidden inside the menu */}
                                    <button onClick={handleSignOut} className="w-full text-start px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};