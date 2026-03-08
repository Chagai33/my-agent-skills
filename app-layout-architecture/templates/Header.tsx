import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { LogOut, Settings, Menu, Bell, User, ChevronDown } from 'lucide-react';
// import { Logo } from '../common/Logo';
// import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const Header: React.FC = () => {
    // const { user, signOut } = useAuth();
    // const navigate = useNavigate();

    // Mock implementations for the template
    const user = { display_name: 'Guest User', email: 'guest@example.com', photo_url: '' };
    const navigate = (path: string) => console.log('Navigate to:', path);
    const signOut = async () => console.log('Signing out');

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close menus when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setShowUserMenu(false);
                setShowMobileMenu(false);
            }
        }

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showUserMenu, showMobileMenu]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 gap-1 sm:gap-4">

                    {/* Default Logo and Home Link */}
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <button
                            onClick={() => navigate('/')}
                            className="flex flex-col items-start transition-opacity hover:opacity-80"
                            aria-label="Home"
                        >
                            <h1>
                                {/* <Logo variant="app-header" /> */}
                                <span className="text-xl font-bold">AppLogo</span>
                            </h1>
                        </button>
                    </div>

                    {/* Center Area (Optional, e.g., current date, search bar) */}
                    <div className="flex-1 flex justify-center min-w-0 mt-2">
                        {/* Standard Middle Content Space */}
                    </div>

                    {/* Right Action Bar */}
                    <div className="flex items-center gap-2">

                        {/* Desktop View */}
                        <div className="hidden md:flex items-center gap-2">
                            {/* Notifications, Settings etc. */}

                            {user && (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-expanded={showUserMenu}
                                        aria-haspopup="true"
                                        aria-label="User menu"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-xs">U</span>
                                        </div>
                                        <span className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}>▼</span>
                                    </button>

                                    {/* Standard Dropdown Structure */}
                                    {showUserMenu && (
                                        <ul className="absolute top-full mt-2 end-0 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 min-w-[220px]" role="menu">
                                            <li className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                        <span className="text-white text-sm">U</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.display_name}</p>
                                                        <p className="text-xs text-gray-500 truncate pointer-events-none select-none cursor-default">{user.email}</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li role="none">
                                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" role="menuitem">
                                                    Settings
                                                </button>
                                            </li>

                                            <li role="separator" aria-hidden="true" className="border-t border-gray-100 my-1"></li>

                                            <li role="none">
                                                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors" role="menuitem">
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};
