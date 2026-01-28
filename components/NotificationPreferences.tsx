
import React, { useState } from 'react';

interface NotificationPreferencesProps {
    onSave: () => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ onSave }) => {
    // Estados para Alertas en Plataforma
    const [platformNew, setPlatformNew] = useState(true);
    const [platformRituals, setPlatformRituals] = useState(true);
    const [platformMessages, setPlatformMessages] = useState(false);

    // Estados para Email
    const [emailWeekly, setEmailWeekly] = useState(true);
    const [emailSecurity, setEmailSecurity] = useState(true);
    const [emailMarketing, setEmailMarketing] = useState(false);

    // Estados para Push
    const [pushUrgent, setPushUrgent] = useState(false);

    // Estados para No Molestar
    const [dndEnabled, setDndEnabled] = useState(true);
    const [dndStart, setDndStart] = useState('19:00');
    const [dndEnd, setDndEnd] = useState('09:00');

    const handleSave = () => {
        // Simular guardado
        const btn = document.getElementById('save-prefs-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = 'Guardado';
            setTimeout(() => {
                btn.innerText = originalText;
                onSave();
            }, 1000);
        } else {
            onSave();
        }
    };

    const handleRestoreDefaults = () => {
        if (confirm('¿Restaurar valores predeterminados?')) {
            setPlatformNew(true);
            setPlatformRituals(true);
            setPlatformMessages(true);
            setEmailWeekly(true);
            setEmailSecurity(true);
            setEmailMarketing(false);
            setPushUrgent(true);
            setDndEnabled(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-bg-s1 relative animate-fade-in font-display">

            {/* Top Header Mobile */}
            {/* Top Header Mobile Removed - Layout handles it */}


            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-10 pb-24 scroll-smooth custom-scrollbar">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Page Heading */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Back button removed */}
                        </div>
                        <h1 className="text-text-n900 text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                            Preferencias de Notificación
                        </h1>
                        <p className="text-gray-600 text-lg font-medium max-w-2xl">
                            Gestiona tus preferencias para crear un entorno de trabajo tranquilo y evitar la sobrecarga sensorial.
                        </p>
                    </div>

                    {/* Sensory Alert Info Box */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        <div className="p-3 bg-white rounded-full text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <h3 className="text-text-n900 text-base font-bold">Diseño Sensorial</h3>
                            <p className="text-gray-600 text-sm lg:text-base leading-relaxed font-medium">
                                Nuestras notificaciones son silenciosas por defecto y no intrusivas. Están diseñadas para respetar tu foco y bienestar cognitivo.
                            </p>
                        </div>
                        <button className="text-primary hover:text-primary/80 text-sm font-bold whitespace-nowrap hover:underline px-2">
                            Más información
                        </button>
                    </div>

                    {/* Notification Channels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 1: Platform Alerts */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col gap-5 h-full">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <span className="material-symbols-outlined text-primary">notifications_active</span>
                                <h2 className="text-lg font-bold text-text-n900">Alertas en la Plataforma</h2>
                            </div>
                            <div className="flex flex-col gap-5">
                                <SwitchItem
                                    label="Nuevos Acuerdos"
                                    subLabel="Cambios en documentos compartidos"
                                    checked={platformNew}
                                    onChange={setPlatformNew}
                                />
                                <SwitchItem
                                    label="Recordatorios de Rituales"
                                    subLabel="Alertas 5 min antes de la reunión"
                                    checked={platformRituals}
                                    onChange={setPlatformRituals}
                                />
                                <SwitchItem
                                    label="Mensajes del Equipo"
                                    subLabel="Menciones directas y respuestas"
                                    checked={platformMessages}
                                    onChange={setPlatformMessages}
                                />
                            </div>
                        </div>

                        {/* Card 2: Email */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col gap-5 h-full">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <h2 className="text-lg font-bold text-text-n900">Correos Electrónicos</h2>
                            </div>
                            <div className="flex flex-col gap-5">
                                <SwitchItem
                                    label="Resumen Semanal"
                                    subLabel="Un solo correo cada Lunes"
                                    checked={emailWeekly}
                                    onChange={setEmailWeekly}
                                />
                                <div className="flex items-center justify-between gap-4 opacity-50 cursor-not-allowed">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-n900">Seguridad</span>
                                        <span className="text-xs text-gray-500 font-medium">Accesos y cambios de contraseña</span>
                                    </div>
                                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out">
                                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                    </div>
                                </div>
                                <SwitchItem
                                    label="Marketing y Novedades"
                                    subLabel="Noticias sobre PACTO"
                                    checked={emailMarketing}
                                    onChange={setEmailMarketing}
                                />
                            </div>
                        </div>

                        {/* Card 3: Push Notifications */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col gap-5 h-full">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <span className="material-symbols-outlined text-primary">smartphone</span>
                                <h2 className="text-lg font-bold text-text-n900">Notificaciones Push</h2>
                            </div>
                            <div className="flex flex-col gap-5">
                                <SwitchItem
                                    label="Mensajes Urgentes"
                                    subLabel="Solo menciones @urgente"
                                    checked={pushUrgent}
                                    onChange={setPushUrgent}
                                />
                            </div>
                        </div>

                        {/* Card 4: Do Not Disturb Mode */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col gap-5 h-full relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute -right-10 -top-10 size-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">bedtime</span>
                                    <h2 className="text-lg font-bold text-text-n900">Modo No Molestar</h2>
                                </div>
                                <button
                                    onClick={() => setDndEnabled(!dndEnabled)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${dndEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${dndEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>

                            <div className={`flex flex-col gap-2 relative z-10 transition-opacity ${dndEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                <p className="text-sm text-gray-500 font-medium">Pausa todas las notificaciones durante tus horas de descanso para recargar energía.</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Desde</label>
                                        <div className="relative">
                                            <select
                                                value={dndStart}
                                                onChange={(e) => setDndStart(e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 bg-bg-s1 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm cursor-pointer"
                                            >
                                                <option>17:00</option>
                                                <option>18:00</option>
                                                <option>19:00</option>
                                                <option>20:00</option>
                                            </select>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 mt-5 material-symbols-outlined">arrow_forward</span>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Hasta</label>
                                        <div className="relative">
                                            <select
                                                value={dndEnd}
                                                onChange={(e) => setDndEnd(e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 bg-bg-s1 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm cursor-pointer"
                                            >
                                                <option>08:00</option>
                                                <option>09:00</option>
                                                <option>10:00</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Sticky Footer Action Bar */}
            <footer className="sticky bottom-0 z-[35] w-full bg-white/90 backdrop-blur-md border-t border-gray-200 py-4 px-6 lg:px-10">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={handleRestoreDefaults}
                        className="text-sm font-bold text-gray-500 hover:text-text-n900 transition-colors hidden sm:block"
                    >
                        Restaurar predeterminados
                    </button>
                    <div className="flex gap-4 w-full sm:w-auto justify-end">
                        <button
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-text-n900 text-sm font-bold hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            id="save-prefs-btn"
                            onClick={handleSave}
                            className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:brightness-110 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95 min-w-[140px]"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </footer>

        </div>
    );
};

const SwitchItem: React.FC<{ label: string; subLabel: string; checked: boolean; onChange: (val: boolean) => void }> = ({ label, subLabel, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
            <span className="text-sm font-bold text-text-n900">{label}</span>
            <span className="text-xs text-gray-500 font-medium">{subLabel}</span>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
            role="switch"
            aria-checked={checked}
        >
            <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}></span>
        </button>
    </div>
);

export default NotificationPreferences;
