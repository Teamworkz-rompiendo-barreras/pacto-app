
import React, { useState, useEffect } from 'react';
import { Agreement, View, UserProfile } from '../types';

interface DashboardProps {
    user: UserProfile | null;
    agreements: Agreement[];
    onCreateNew: () => void;
    onViewAgreement: (agreement: Agreement) => void;
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

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in font-display pb-12 px-6 md:px-10 pt-6">

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black text-text-n900 tracking-tight leading-tight">
                        Hola, {user ? user.name.split(' ')[0] : 'Equipo'}
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
                            <div key={agreement.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between gap-4 cursor-pointer" onClick={() => onViewAgreement(agreement)}>
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
                    {/* Stats Widget (Dynamic) */}
                    <div className="bg-primary text-white p-8 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-8xl">
                                {agreements.length > 0 ? 'sentiment_satisfied' : 'rocket_launch'}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold mb-1 opacity-90">Salud del Equipo</h3>

                        {agreements.length > 0 ? (
                            <>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-5xl font-black">100%</span>
                                    <span className="text-sm font-bold mb-2 opacity-80">Inicio</span>
                                </div>
                                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
                                    <div className="bg-white h-full w-full rounded-full"></div>
                                </div>
                                <p className="text-sm font-medium opacity-90 leading-relaxed">
                                    ¡Todo listo! Tu equipo está alineado y listo para colaborar.
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-5xl font-black">--</span>
                                    <span className="text-sm font-bold mb-2 opacity-80">Por iniciar</span>
                                </div>
                                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
                                    <div className="bg-white h-full w-[5%] rounded-full"></div>
                                </div>
                                <p className="text-sm font-medium opacity-90 leading-relaxed">
                                    Aún no hay datos. Crea tu primer <strong>Acuerdo Vivo</strong> para empezar a medir el pulso.
                                </p>
                            </>
                        )}
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
