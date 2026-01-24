
import React, { useState, useEffect } from 'react';
import { Agreement, View, UserProfile } from '../types';

interface DashboardProps {
    user: UserProfile | null;
    agreements: Agreement[];
    onCreateNew: () => void;
    onViewAgreement: () => void;
    onEditAgreement: (agreement: Agreement) => void;
    onExploreLibrary: () => void;
    onNavigate: (view: View) => void;
}

const TIPS_DB = [
    "Evita usar 'ASAP' o 'lo antes posible', ya que son ambiguos y causan ansiedad. Sé específico con la fecha y hora límite.",
    "Envía la agenda de las reuniones con al menos 24 horas de antelación para permitir el procesamiento cognitivo previo.",
    "Normaliza el no encender la cámara en reuniones si no es estrictamente necesario para reducir la fatiga visual.",
    "Utiliza negritas y listas (bullet points) en tus mensajes de texto largos para facilitar el escaneo visual y la comprensión.",
    "Antes de una llamada sorpresa, envía un mensaje preguntando: '¿Es buen momento para una llamada rápida?' para evitar la parálisis por interrupción.",
    "Fomenta el 'Stimming' (movimientos de autorregulación) discretos en reuniones; garabatear o usar fidget toys ayuda a la concentración.",
    "Graba las reuniones importantes. Para personas con TDAH, poder revisar la grabación a 1.5x velocidad es una herramienta vital."
];

const Dashboard: React.FC<DashboardProps> = ({ user, agreements, onCreateNew, onViewAgreement, onEditAgreement, onExploreLibrary, onNavigate }) => {
    const [tipStatus, setTipStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [currentTip, setCurrentTip] = useState(TIPS_DB[0]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [focusModeActive, setFocusModeActive] = useState(false);

    // Simular carga de "Tip del Día"
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * TIPS_DB.length);
        setCurrentTip(TIPS_DB[randomIndex]);
    }, []);

    const handleApplyTip = () => {
        setTipStatus('sending');
        setTimeout(() => {
            setTipStatus('success');
            setTimeout(() => {
                setTipStatus('idle');
            }, 2000);
        }, 1500);
    };

    const toggleFocusMode = () => {
        const newState = !focusModeActive;
        setFocusModeActive(newState);
        if (newState) {
            alert("Modo Foco activado. Las notificaciones se han silenciado por 1 hora.");
        } else {
            alert("Modo Foco desactivado. Has vuelto a recibir notificaciones.");
        }
    };

    const menuItems = [
        { id: View.MY_COMMITMENTS, label: 'Mis Compromisos', icon: 'task_alt' },
        { id: View.TEAM, label: 'Equipo', icon: 'groups' },
        { id: View.RITUALS, label: 'Rituales', icon: 'event_repeat' },
        { id: View.ACHIEVEMENTS, label: 'Logros', icon: 'emoji_events' },
        { id: View.INCLUSION_BOX, label: 'Buzón de Inclusión', icon: 'mark_email_unread' },
        { id: View.REPORTS, label: 'Reportes', icon: 'bar_chart' },
        { id: View.PROFILE, label: 'Mi Perfil', icon: 'person' },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in font-display pb-12 px-6 md:px-10 pt-6">

            {/* Top Navbar */}
            <nav className="flex items-center justify-between mb-8 pb-4 border-b border-black/5 sticky top-0 bg-bg-s1/95 backdrop-blur-md z-30 -mx-6 px-6 pt-2">
                <div className="flex items-center gap-3">
                    <div className="size-8 text-primary">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <span className="text-xl font-black text-primary leading-none tracking-tight hidden sm:inline-block">PACTO</span>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <button onClick={() => onNavigate(View.RITUALS)} className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Rituales</button>
                    <button onClick={() => onNavigate(View.TEAM)} className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Equipo</button>
                    {user?.role === 'Administrador' && (
                        <button onClick={() => onNavigate(View.ORGANIZATION)} className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">Admin Panel</button>
                    )}
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button onClick={() => onNavigate(View.NOTIFICATIONS)} className="p-2 rounded-full hover:bg-black/5 text-gray-600">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <button onClick={() => onNavigate(View.PROFILE)} className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-transparent hover:ring-primary/20 transition-all">
                        AL
                    </button>
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">menu</span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white animate-fade-in flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="size-8 text-primary">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-black text-primary leading-none tracking-tight">Menú</span>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { setIsMobileMenuOpen(false); onNavigate(item.id); }}
                                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100 active:bg-primary/5 active:border-primary/20 transition-all"
                                >
                                    <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                                    <span className="font-bold text-text-n900 text-sm">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <button onClick={() => { setIsMobileMenuOpen(false); onNavigate(View.HELP_CENTER); }} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 text-gray-600 font-medium">
                                <span className="material-symbols-outlined">help</span> Centro de Ayuda
                            </button>
                            <button onClick={() => { setIsMobileMenuOpen(false); onNavigate(View.CONTACT); }} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 text-gray-600 font-medium">
                                <span className="material-symbols-outlined">mail</span> Contacto
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black text-text-n900 tracking-tight leading-tight">
                        Hola, Alex
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Aquí tienes el pulso de los acuerdos de tu equipo hoy.
                    </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={onExploreLibrary}
                        className="hidden sm:flex items-center gap-2 bg-white border-2 border-primary/10 text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/5 transition-all"
                    >
                        <span className="material-symbols-outlined">library_books</span>
                        <span>Explorar Biblioteca</span>
                    </button>
                    <button
                        onClick={onCreateNew}
                        className="flex-1 md:flex-none justify-center items-center gap-2 bg-primary hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex"
                    >
                        <span className="material-symbols-outlined">add</span>
                        <span>Nuevo Acuerdo</span>
                    </button>
                </div>
            </header>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Content (Acuerdos) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-text-n900">Mis Acuerdos Vivos</h3>
                        <button className="text-sm font-bold text-primary hover:underline">Ver todos</button>
                    </div>

                    <div className="grid gap-4">
                        {agreements.map((agreement) => (
                            <div key={agreement.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between gap-4 cursor-pointer" onClick={onViewAgreement}>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${agreement.category === 'Comunicación' ? 'bg-blue-100 text-blue-700' :
                                                agreement.category === 'Foco' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {agreement.category}
                                        </span>
                                        <span className={`text-[10px] font-bold ${agreement.status === 'Activo' ? 'text-green-600' : 'text-amber-600'}`}>• {agreement.status}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-text-n900 group-hover:text-primary transition-colors">{agreement.title}</h4>
                                    <p className="text-gray-500 font-medium text-sm line-clamp-1">{agreement.description}</p>
                                </div>
                                <div className="flex items-center gap-2 sm:self-center">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEditAgreement(agreement); }}
                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Stats Widget */}
                    <div className="bg-primary text-white p-8 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-8xl">sentiment_satisfied</span>
                        </div>
                        <h3 className="text-lg font-bold mb-1 opacity-90">Salud del Equipo</h3>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-5xl font-black">94%</span>
                            <span className="text-sm font-bold mb-2 opacity-80">Satisfacción</span>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
                            <div className="bg-white h-full w-[94%] rounded-full"></div>
                        </div>
                        <p className="text-sm font-medium opacity-90 leading-relaxed">
                            Tu equipo reporta altos niveles de claridad esta semana. ¡Buen trabajo!
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-text-n900 mb-4">Accesos Rápidos</h3>
                        <div className="space-y-3">
                            <button
                                onClick={toggleFocusMode}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left group ${focusModeActive ? 'bg-secondary-s3/10 border-2 border-secondary-s3' : 'hover:bg-gray-50 border-2 border-transparent'}`}
                            >
                                <div className={`size-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${focusModeActive ? 'bg-secondary-s3 text-white' : 'bg-secondary-s3/10 text-secondary-s3'}`}>
                                    <span className="material-symbols-outlined">{focusModeActive ? 'check' : 'timer'}</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-text-n900 text-sm">
                                        {focusModeActive ? 'Foco Activo (59:00)' : 'Iniciar Modo Foco'}
                                    </span>
                                    <span className="block text-xs text-gray-500">
                                        {focusModeActive ? 'Silenciando notificaciones' : 'Silenciar notificaciones por 1h'}
                                    </span>
                                </div>
                            </button>
                            <button onClick={() => onNavigate(View.CLARITY_CARDS)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group border-2 border-transparent">
                                <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-text-n900 text-sm">Consultar Clarity Cards</span>
                                    <span className="block text-xs text-gray-500">Guías visuales de comunicación</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tip Inclusivo */}
                <div className="col-span-1 lg:col-span-12 bg-white p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6 border-2 border-secondary-s3/30 shadow-lg shadow-secondary-s3/5 mt-4">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="shrink-0 size-12 bg-secondary-s3/10 rounded-full flex items-center justify-center text-secondary-s3">
                            <span className="material-symbols-outlined text-3xl">lightbulb</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-text-n900 text-lg">Tip del Día</h4>
                                <span className="bg-secondary-s3/10 text-secondary-s3 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Inclusión</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                {currentTip}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleApplyTip}
                        disabled={tipStatus !== 'idle'}
                        className={`w-full md:w-auto flex items-center justify-center gap-2 shrink-0 px-6 py-3 text-white text-sm font-bold rounded-xl shadow-md transition-all min-w-[180px] ${tipStatus === 'success'
                                ? 'bg-green-600 hover:bg-green-700'
                                : (tipStatus === 'sending' ? 'bg-secondary-s3/70 cursor-wait' : 'bg-secondary-s3 hover:brightness-110 active:scale-95')
                            }`}
                    >
                        {tipStatus === 'sending' ? (
                            <>
                                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                <span>Enviando...</span>
                            </>
                        ) : tipStatus === 'success' ? (
                            <>
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                <span>¡Enviado!</span>
                            </>
                        ) : (
                            <>
                                <span>Enviar Tip al Equipo</span>
                                <span className="material-symbols-outlined text-lg">send</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
