import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { SUPPORTED_LANGUAGES, SUPPORTED_REGIONS, SUPPORTED_TIMEZONES } from '../types';

interface LanguageRegionSettingsProps {
    onBack: () => void;
    onSave: () => void;
    userAvatar?: string;
}

const LanguageRegionSettings: React.FC<LanguageRegionSettingsProps> = ({ onBack, onSave, userAvatar }) => {
    const { language, setLanguage, t } = useLanguage();
    const [region, setRegion] = useState('');
    const [timezone, setTimezone] = useState('bogota');
    const [dateFormat, setDateFormat] = useState('dmy_24');
    const [isSaving, setIsSaving] = useState(false);

    // Synchronize local state with context if needed, but for language we use context directly

    const handleSave = () => {
        setIsSaving(true);
        // Simular guardado
        setTimeout(() => {
            setIsSaving(false);
            onSave();
        }, 1000);
    };

    return (
        <div className="bg-bg-s1 min-h-full font-display text-text-n900 flex flex-col animate-fade-in">
            {/* Top Navigation */}
            <header className="w-full px-6 py-4 flex items-center justify-between sticky top-0 bg-bg-s1/90 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                    <div className="bg-primary text-white p-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-[24px]">diversity_3</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-text-n900">PACTO</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-gray-600"
                        title="Cerrar"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm bg-gray-200 overflow-hidden">
                        {userAvatar ? (
                            <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">U</div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                {/* Central Settings Card */}
                <div className="bg-white w-full max-w-2xl rounded-xl shadow-sm p-8 md:p-10 border border-white/50 relative overflow-hidden">
                    {/* Decorative accent at top */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary-s3 to-primary"></div>

                    {/* Header Section */}
                    <div className="mb-10">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary mb-4 transition-colors md:hidden"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            {t('back')}
                        </button>
                        <h2 className="text-3xl font-black text-text-n900 mb-3 tracking-tight">{t('settings.title')}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed font-medium max-w-xl">
                            {t('settings.desc')}
                        </p>
                    </div>

                    {/* Form Content */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Language Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-n900 uppercase tracking-wide opacity-80" htmlFor="language">{t('label.language')}</label>
                                <div className="relative">
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value as any)}
                                        className="w-full bg-gray-50 border border-gray-200 text-text-n900 text-base rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3.5 hover:bg-gray-100 transition-colors cursor-pointer font-medium appearance-none"
                                    >
                                        {SUPPORTED_LANGUAGES.map((lang) => (
                                            <option key={lang} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            {/* Region Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-n900 uppercase tracking-wide opacity-80" htmlFor="region">{t('label.region')}</label>
                                <div className="relative">
                                    <select
                                        id="region"
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 text-text-n900 text-base rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3.5 hover:bg-gray-100 transition-colors cursor-pointer font-medium appearance-none"
                                    >
                                        <option disabled value="">{t('region.select')}</option>
                                        {SUPPORTED_REGIONS.map((reg) => (
                                            <option key={reg.code} value={reg.code}>
                                                {reg.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Timezone Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-n900 uppercase tracking-wide opacity-80" htmlFor="timezone">{t('label.timezone')}</label>
                                <div className="relative">
                                    <select
                                        id="timezone"
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 text-text-n900 text-base rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3.5 hover:bg-gray-100 transition-colors cursor-pointer font-medium appearance-none"
                                    >
                                        <option disabled value="">(UTC-05:00) {t('timezone.select')}</option>
                                        {SUPPORTED_TIMEZONES.map((tz) => (
                                            <option key={tz.value} value={tz.value}>
                                                {tz.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            {/* Date Format Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-text-n900 uppercase tracking-wide opacity-80" htmlFor="dateformat">{t('label.dateformat')}</label>
                                <div className="relative">
                                    <select
                                        id="dateformat"
                                        value={dateFormat}
                                        onChange={(e) => setDateFormat(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 text-text-n900 text-base rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block p-3.5 hover:bg-gray-100 transition-colors cursor-pointer font-medium appearance-none"
                                    >
                                        <option value="dmy_24">DD/MM/AAAA (24h)</option>
                                        <option value="dmy_12">DD/MM/AAAA (12h am/pm)</option>
                                        <option value="mdy_12">MM/DD/AAAA (12h am/pm)</option>
                                        <option value="ymd_24">AAAA-MM-DD (24h)</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Supportive Tip Box */}
                        <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-5 flex gap-4 items-start mt-2">
                            <div className="bg-blue-100 text-primary p-2 rounded-full shrink-0">
                                <span className="material-symbols-outlined text-[20px] filled">lightbulb</span>
                            </div>
                            <div>
                                <h4 className="text-primary font-bold text-sm mb-1">{t('tip.title')}</h4>
                                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                    {t('tip.desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-4">
                        <button
                            onClick={onBack}
                            className="px-6 py-3.5 rounded-lg text-gray-600 font-bold hover:bg-gray-50 hover:text-text-n900 transition-all text-sm sm:w-auto w-full"
                        >
                            {t('btn.cancel')}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-8 py-3.5 rounded-lg bg-primary text-white font-bold hover:brightness-110 focus:ring-4 focus:ring-primary/30 transition-all shadow-md text-sm sm:w-auto w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isSaving ? (
                                <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                            ) : (
                                <span className="material-symbols-outlined text-[18px]">check</span>
                            )}
                            {isSaving ? t('btn.saving') : t('btn.save')}
                        </button>
                    </div>
                </div>
            </main>

            <footer className="w-full py-6 text-center text-gray-500 text-xs font-medium">
                <p>© 2026 PACTO. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default LanguageRegionSettings;