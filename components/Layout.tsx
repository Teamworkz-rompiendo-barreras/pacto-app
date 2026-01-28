import React, { useState } from 'react';
import { View, UserProfile } from '../types';
import { useLanguage } from '../LanguageContext';

interface LayoutProps {
    children: React.ReactNode;
    user: UserProfile | null;
    currentView: View;
    unreadCount?: number; // New prop
    onNavigate: (view: View) => void;
    onLogout: () => void;
    onOpenNotifications?: () => void; // New prop
}

const Layout: React.FC<LayoutProps> = ({ children, user, currentView, unreadCount = 0, onNavigate, onLogout, onOpenNotifications }) => {
    const { t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: View.DASHBOARD, label: t('nav.dashboard'), icon: 'dashboard' },
        { id: View.MY_AGREEMENTS, label: t('nav.my_agreements'), icon: 'handshake' },
        { id: View.MY_COMMITMENTS, label: t('nav.my_commitments'), icon: 'task_alt' },
        { id: View.TEAM, label: t('nav.team'), icon: 'groups' },
        { id: View.RITUALS, label: t('nav.rituals'), icon: 'event_repeat' },
        { id: View.ACHIEVEMENTS, label: t('nav.achievements'), icon: 'emoji_events' },
        { id: View.INCLUSION_BOX, label: t('nav.inbox'), icon: 'mark_email_unread' },
        { id: View.REPORTS, label: t('nav.reports'), icon: 'bar_chart' },
        { id: View.CLARITY_CARDS, label: t('nav.clarity_kits'), icon: 'style' },
    ];

    const bottomItems = [
        { id: View.PROFILE, label: t('nav.profile'), icon: 'person' },
        { id: View.HELP_CENTER, label: t('nav.help'), icon: 'help' },
    ];

    if (!user) return <>{children}</>;

    return (
        <div className="flex min-h-screen bg-bg-s1 font-display">
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full z-30">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-8 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <span className="text-xl font-black text-primary tracking-tight">PACTO</span>
                </div>

                <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${currentView === item.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-text-n900'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="p-4 mt-auto border-t border-gray-100 space-y-1">
                    {bottomItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${currentView === item.id
                                ? 'bg-gray-100 text-text-n900'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-text-n900'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold text-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        {t('nav.logout')}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between z-40">
                <div className="flex items-center gap-2">
                    <div className="size-6 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <span className="text-lg font-black text-primary">PACTO</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Notification Bell (Mobile) */}
                    <button
                        onClick={onOpenNotifications}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-1"
                        title={t('global.notifications')}
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 size-2.5 bg-red-500 border border-white rounded-full"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-white animate-fade-in flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <span className="font-black text-xl text-text-n900">{t('global.menu')}</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {[...menuItems, ...bottomItems].map(item => (
                            <button
                                key={item.id}
                                onClick={() => { setIsMobileMenuOpen(false); onNavigate(item.id); }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold text-lg ${currentView === item.id ? 'bg-primary/5 text-primary' : 'text-gray-500'}`}
                            >
                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={() => { setIsMobileMenuOpen(false); onLogout(); }}
                            className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 font-bold justify-center"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            {t('nav.logout')}
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 w-full pt-16 lg:pt-0 relative">

                {/* Desktop Top Bar (Notification Bell) - Floating -> Now Sticky/Flex to avoid overlap */}
                <div className="hidden lg:flex w-full justify-end items-center px-8 py-6 gap-3 sticky top-0 bg-bg-s1/90 backdrop-blur-sm z-20">
                    <button
                        onClick={onOpenNotifications}
                        className="bg-white p-3 rounded-full shadow-sm text-gray-500 hover:text-primary hover:shadow-md transition-all relative border border-gray-100"
                        title={t('global.notifications')}
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 size-3 bg-red-500 border-2 border-white rounded-full"></span>
                        )}
                    </button>
                    <div className="bg-white pl-2 pr-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all" onClick={() => onNavigate(View.PROFILE)}>
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs overflow-hidden">
                            {user.avatar ? <img src={user.avatar} className="size-full object-cover" /> : user.name[0]}
                        </div>
                        <span className="text-xs font-bold text-gray-700 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    </div>
                </div>

                {/* Back Button Context (Optional Breadcrumb-like logic could go here) */}
                {(currentView !== View.DASHBOARD) && (
                    <div className="lg:hidden px-4 pt-4 pb-2">
                        <button
                            onClick={() => onNavigate(View.DASHBOARD)}
                            className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-text-n900"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            {t('global.back_home')}
                        </button>
                    </div>
                )}

                {children}
            </main>
        </div>
    );
};

export default Layout;
