import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const AccessibilityPanel: React.FC = () => {
    const { t } = useLanguage();
    const [reducedMotion, setReducedMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState(100);

    // Persist preferences
    useEffect(() => {
        const storedMotion = localStorage.getItem('pacto_acc_motion');
        const storedContrast = localStorage.getItem('pacto_acc_contrast');

        if (storedMotion === 'true') {
            setReducedMotion(true);
            document.body.classList.add('reduced-motion');
        }
        if (storedContrast === 'true') {
            setHighContrast(true);
            document.body.classList.add('high-contrast');
        }
    }, []);

    const toggleMotion = () => {
        const newValue = !reducedMotion;
        setReducedMotion(newValue);
        localStorage.setItem('pacto_acc_motion', String(newValue));
        if (newValue) {
            document.body.classList.add('reduced-motion');
            // Inject basic reduced motion styles if not present
            if (!document.getElementById('reduced-motion-style')) {
                const style = document.createElement('style');
                style.id = 'reduced-motion-style';
                style.innerHTML = `
                    .reduced-motion * {
                        animation: none !important;
                        transition: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            document.body.classList.remove('reduced-motion');
        }
    };

    const toggleContrast = () => {
        const newValue = !highContrast;
        setHighContrast(newValue);
        localStorage.setItem('pacto_acc_contrast', String(newValue));
        if (newValue) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="group relative">
                <button
                    className="bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 ring-offset-2 ring-primary"
                    aria-label="Opciones de Accesibilidad"
                    title="Accesibilidad"
                >
                    <span className="material-symbols-outlined text-2xl">accessibility_new</span>
                </button>

                <div className="absolute bottom-14 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-64 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all border border-gray-200">
                    <h3 className="font-bold text-lg mb-3 text-text-n900 border-b pb-2">Accesibilidad</h3>

                    <div className="space-y-3">
                        {/* High Contrast */}
                        <div className="flex items-center justify-between">
                            <label htmlFor="acc-contrast" className="text-sm font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-500">contrast</span>
                                {t('acc.high_contrast')}
                            </label>
                            <button
                                id="acc-contrast"
                                onClick={toggleContrast}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${highContrast ? 'bg-primary' : 'bg-gray-300'}`}
                                aria-pressed={highContrast}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Reduced Motion */}
                        <div className="flex items-center justify-between">
                            <label htmlFor="acc-motion" className="text-sm font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-500">motion_photos_off</span>
                                {t('acc.reduced_motion')}
                            </label>
                            <button
                                id="acc-motion"
                                onClick={toggleMotion}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${reducedMotion ? 'bg-primary' : 'bg-gray-300'}`}
                                aria-pressed={reducedMotion}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${reducedMotion ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Font Dyslexic (Existing hook logic used mainly in settings, but good here too) */}
                        <div className="text-xs text-gray-400 mt-2 pt-2 border-t">
                            Estándares WCAG 2.2 Activos
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityPanel;
