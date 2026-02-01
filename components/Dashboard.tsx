
import React, { useState, useEffect } from 'react';
import { Agreement, View, UserProfile, Notification } from '../types';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../LanguageContext';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

interface DashboardProps {
    user: UserProfile | null;
    agreements: Agreement[];
    notifications?: Notification[];
    onCreateNew: () => void;
    onViewAgreement: (agreement: Agreement) => void;
    onEditAgreement: (agreement: Agreement) => void;
    onExploreLibrary: () => void;
    onNavigate: (view: View) => void;
    onSendTip?: (tip: string) => void;
    isArchivedView?: boolean;
}

const TIPS_DB = [
    "Evita usar 'ASAP' o 'lo antes posible', ya que son ambiguos y causan ansiedad. Sé específico con la fecha y hora límite.",
    "Envía la agenda de las reuniones con al menos 24 horas de antelación para permitir el procesamiento cognitivo previo.",
    "Normaliza el no encender la cámara en reuniones si no es estrictamente necesario para reducir la fatiga visual.",
    "Utiliza negritas y listas (bullet points) en tus mensajes de texto largos para facilitar el escaneo visual y la comprensión.",
    "Antes de una llamada sorpresa, envía un mensaje preguntando: '¿Es buen momento para una llamada rápida?' para evitar la parálisis por interrupción.",
    "Graba las reuniones importantes. Para personas con TDAH, poder revisar la grabación a 1.5x velocidad es una herramienta vital."
];

const Dashboard: React.FC<DashboardProps> = ({ user, agreements, notifications, onCreateNew, onViewAgreement, onEditAgreement, onExploreLibrary, onNavigate, onSendTip, isArchivedView = false }) => {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [tipStatus, setTipStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [currentTip, setCurrentTip] = useState(TIPS_DB[0]);
    const [focusModeActive, setFocusModeActive] = useState(false);

    const isAdmin = user?.role === 'Admin' || user?.role === 'SuperAdmin';
    const [showAdminPanel, setShowAdminPanel] = useState(isAdmin);

    useEffect(() => {
        if (user?.role === 'Admin' || user?.role === 'SuperAdmin') {
            setShowAdminPanel(true);
        } else {
            setShowAdminPanel(false);
        }
    }, [user]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * TIPS_DB.length);
        setCurrentTip(TIPS_DB[randomIndex]);
    }, []);

    const handleApplyTip = () => {
        setTipStatus('sending');
        if (onSendTip) onSendTip(currentTip);
        setTimeout(() => {
            setTipStatus('success');
            setTimeout(() => setTipStatus('idle'), 2000);
        }, 1500);
    };

    const toggleFocusMode = () => {
        const newState = !focusModeActive;
        setFocusModeActive(newState);
        if (newState) {
            toast("Modo Foco activado. Notificaciones silenciadas por 1h.", 'info');
        } else {
            toast("Modo Foco desactivado.", 'info');
        }
    };

    // --- RENDERIZADO VIEW: ADMIN (PANEL DE CONTROL) ---
    if (isAdmin && showAdminPanel) {
        return (
            <PageContainer>
                <PageHeader
                    title={t('admin.title')}
                    subtitle={t('admin.subtitle').replace('{name}', user?.name.split(' ')[0] || 'la Organización')}
                    actionButton={
                        <button
                            onClick={() => setShowAdminPanel(false)}
                            className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-primary/20 text-primary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all group shadow-xl shadow-primary/5"
                        >
                            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">swap_vert</span>
                            <span>{t('admin.btn.switch')}</span>
                        </button>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Metric Card Health */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[32px] border border-white/40 shadow-xl shadow-primary/5 flex flex-col gap-6 group hover:translate-y-[-4px] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined font-black">health_metrics</span>
                            </div>
                            <span className="font-display font-black text-xs uppercase tracking-widest text-text-n900/40">{t('admin.metric.health')}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-display text-5xl font-black text-text-n900 tracking-tighter leading-none">92%</span>
                            <div className="bg-green-100 text-green-700 font-black text-[10px] px-2 py-1 rounded-full flex items-center gap-1 uppercase">
                                +5% <span className="material-symbols-outlined text-xs">trending_up</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 font-bold leading-relaxed">{t('admin.metric.health.desc')}</p>
                    </div>

                    {/* Metric Card Members */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[32px] border border-white/40 shadow-xl shadow-primary/5 flex flex-col gap-6 group hover:translate-y-[-4px] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined font-black">person</span>
                            </div>
                            <span className="font-display font-black text-xs uppercase tracking-widest text-text-n900/40">{t('admin.metric.members')}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-display text-5xl font-black text-text-n900 tracking-tighter leading-none">12</span>
                            <span className="text-gray-400 font-black text-xs">/ 20 TOTAL</span>
                        </div>
                        <button onClick={() => onNavigate(View.ORGANIZATION)} className="text-primary font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform text-left flex items-center gap-2">
                            {t('admin.btn.manage_team')}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>

                    {/* Metric Card Agreements */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[32px] border border-white/40 shadow-xl shadow-primary/5 flex flex-col gap-6 group hover:translate-y-[-4px] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-2xl bg-secondary-s3/10 flex items-center justify-center text-secondary-s3">
                                <span className="material-symbols-outlined font-black">handshake</span>
                            </div>
                            <span className="font-display font-black text-xs uppercase tracking-widest text-text-n900/40">{t('admin.metric.agreements')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-display text-5xl font-black text-text-n900 tracking-tighter leading-none">{agreements.length}</span>
                        </div>
                        <button onClick={onExploreLibrary} className="text-secondary-s3 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform text-left flex items-center gap-2">
                            {t('admin.btn.templates')}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Admin Actions */}
                    <div className="space-y-6">
                        <h3 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase px-4">{t('admin.actions.title')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: 'person_add', label: t('admin.action.invite'), view: View.ORGANIZATION },
                                { icon: 'groups', label: t('admin.action.teams'), view: View.ORGANIZATION },
                                { icon: 'bar_chart', label: t('admin.action.reports'), view: View.REPORTS },
                                { icon: 'settings_suggest', label: t('admin.action.accessibility'), view: View.ORGANIZATION }
                            ].map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onNavigate(action.view)}
                                    className="p-8 rounded-[32px] bg-white/40 hover:bg-white/80 border border-white/60 hover:shadow-2xl hover:-translate-y-1 transition-all text-left flex flex-col gap-6 group overflow-hidden relative"
                                >
                                    <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-bl-full group-hover:scale-150 transition-transform"></div>
                                    <div className="size-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-3xl font-bold">{action.icon}</span>
                                    </div>
                                    <span className="font-display font-black text-text-n900 uppercase tracking-widest text-xs z-10">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Admin activity */}
                    <div className="space-y-6">
                        <h3 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase px-4">{t('admin.activity.title')}</h3>
                        <div className="bg-white/60 backdrop-blur-md p-8 rounded-[40px] border border-white/60 shadow-xl shadow-primary/5 space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="size-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-white shadow-sm flex items-center justify-center shrink-0 font-black text-text-n900/30 text-xs">U{i}</div>
                                    <div className="pt-2">
                                        <p className="text-gray-600 font-bold leading-relaxed">
                                            <span className="text-text-n900">Usuario {i}</span> ha completado el ritual de <span className="text-primary italic">Cierre Semanal</span>.
                                        </p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Hace {i * 15} min</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageContainer>
        );
    }

    // --- RENDERIZADO VIEW: EMPLEADO ---
    return (
        <PageContainer>
            <PageHeader
                title={isArchivedView ? "Acuerdos Archivados" : `Hola, ${user?.name.split(' ')[0]}`}
                subtitle={isArchivedView ? "Historial de acuerdos antiguos." : t('dash.subtitle')}
                actionButton={
                    <div className="flex gap-4">
                        {isAdmin && (
                            <button
                                onClick={() => setShowAdminPanel(true)}
                                className="hidden md:flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-200 text-gray-400 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-xl shadow-black/5"
                            >
                                <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                                {t('admin.badge')}
                            </button>
                        )}
                        {!isArchivedView && (
                            <button
                                onClick={onCreateNew}
                                className="flex items-center justify-center gap-3 bg-gradient-to-br from-primary to-secondary-s3 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <span className="material-symbols-outlined font-bold text-lg">add</span>
                                <span>{t('dashboard.btn.new')}</span>
                            </button>
                        )}
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                {/* Main Agreements List */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">
                            {isArchivedView ? 'Archivo Histórico' : t('dash.section.agreements')}
                        </h2>
                        {!isArchivedView ? (
                            <button
                                onClick={() => onNavigate(View.ARCHIVED_AGREEMENTS)}
                                className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">archive</span>
                                <span>Ver Archivados</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => onNavigate(View.DASHBOARD)}
                                className="font-black text-[10px] uppercase tracking-[0.2em] text-primary hover:translate-x-[-4px] transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                <span>Regresar</span>
                            </button>
                        )}
                    </div>

                    <div className="grid gap-6">
                        {agreements.length === 0 ? (
                            <div className="bg-white/40 backdrop-blur-md p-20 rounded-[40px] border-2 border-dashed border-primary/20 text-center flex flex-col items-center gap-6">
                                <div className="size-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary/30">
                                    <span className="material-symbols-outlined text-5xl">folder_off</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-display text-xl font-black text-text-n900 uppercase tracking-tight">{t('dash.empty.title')}</p>
                                    <p className="text-gray-400 font-bold max-w-xs mx-auto leading-relaxed">{t('dash.empty.desc')}</p>
                                </div>
                                <button onClick={onCreateNew} className="bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">{t('dash.empty.btn')}</button>
                            </div>
                        ) : (
                            agreements.map((agreement) => (
                                <div
                                    key={agreement.id}
                                    className="relative group overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-md border border-white/60 shadow-xl shadow-primary/2 shadow-inner-white hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300"
                                >
                                    <div className="absolute top-0 right-0 size-32 bg-primary/2 group-hover:scale-150 transition-transform duration-700 rounded-bl-full -z-10"></div>

                                    <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                        <div className="flex-1 space-y-4">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${agreement.category === 'Comunicación' ? 'bg-blue-100 text-blue-600' :
                                                    agreement.category === 'Foco' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    {agreement.category}
                                                </span>
                                                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/50 text-[10px] font-black uppercase tracking-widest text-gray-400 border border-black/5">
                                                    <span className="material-symbols-outlined text-sm">
                                                        {agreement.visibility === 'Organization' ? 'public' : (agreement.visibility === 'Private' ? 'lock' : 'group')}
                                                    </span>
                                                    {agreement.visibility}
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${agreement.status === 'Activo' ? 'text-green-500' : 'text-amber-500'}`}>
                                                    <span className="size-1.5 rounded-full bg-current"></span>
                                                    {agreement.status}
                                                </span>
                                            </div>

                                            <h4 className="font-display text-2xl font-black text-text-n900 group-hover:text-primary transition-colors tracking-tight leading-none">
                                                {agreement.title}
                                            </h4>
                                            <p className="text-gray-400 font-bold text-sm line-clamp-1 italic">
                                                &ldquo;{agreement.description}&rdquo;
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => onEditAgreement(agreement)}
                                                className="size-12 rounded-2xl bg-white border border-black/5 text-gray-400 hover:text-primary hover:shadow-lg transition-all flex items-center justify-center group/btn"
                                            >
                                                <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">edit</span>
                                            </button>
                                            <button
                                                onClick={() => onViewAgreement(agreement)}
                                                className="px-6 py-4 rounded-2xl bg-text-n900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-black/10"
                                            >
                                                Ver Pacto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Visual Pulse Widget */}
                    <div className="bg-gradient-to-br from-primary to-secondary-s3 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-[-20%] right-[-20%] size-48 bg-white/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <p className="font-black text-[10px] uppercase tracking-[0.2em] mb-6 opacity-70">Pulso de Bienestar</p>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="font-display text-6xl font-black leading-none tracking-tighter">92%</span>
                                <span className="font-black text-xs uppercase tracking-widest mb-2 opacity-80">Claridad</span>
                            </div>
                            <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden mb-8">
                                <div className="h-full w-[92%] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                            </div>
                            <p className="text-sm font-bold leading-relaxed opacity-90 italic">
                                &ldquo;Tu equipo reporta una alineación excelente con los acuerdos actuales. ¡Buen trabajo!&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Tools Hub */}
                    <div className="bg-white/70 backdrop-blur-md p-8 rounded-[40px] border border-white/60 shadow-xl shadow-primary/5 space-y-6">
                        <h3 className="font-display text-xl font-black text-text-n900 tracking-tight uppercase px-2">Herramientas</h3>
                        <div className="space-y-4">
                            <button
                                onClick={toggleFocusMode}
                                className={`w-full p-6 rounded-[28px] text-left transition-all border-2 group ${focusModeActive ? 'bg-secondary-s3 border-secondary-s3 text-white shadow-2xl shadow-secondary-s3/30' : 'bg-white border-transparent hover:border-secondary-s3/20 shadow-sm'}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${focusModeActive ? 'bg-white text-secondary-s3' : 'bg-secondary-s3 text-white shadow-lg shadow-secondary-s3/20'}`}>
                                        <span className="material-symbols-outlined text-3xl font-black">{focusModeActive ? 'check_circle' : 'timer'}</span>
                                    </div>
                                    <div>
                                        <span className={`block font-black uppercase tracking-tighter text-lg leading-none ${focusModeActive ? 'text-white' : 'text-text-n900'}`}>{focusModeActive ? 'Modo Foco ON' : 'Modo Foco'}</span>
                                        <span className={`mt-1 block text-[10px] font-bold uppercase tracking-widest ${focusModeActive ? 'text-white/70' : 'text-gray-400'}`}>
                                            {focusModeActive ? 'Silenciando alertas' : 'Bloquea distracciones'}
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => onNavigate(View.CLARITY_CARDS)}
                                className="w-full p-6 rounded-[28px] bg-white border-2 border-transparent hover:border-primary/20 transition-all text-left group shadow-sm"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                                        <span className="material-symbols-outlined text-3xl font-black">psychology</span>
                                    </div>
                                    <div>
                                        <span className="block font-black uppercase tracking-tighter text-lg leading-none text-text-n900">Tarjetas</span>
                                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-gray-400">Guía de comunicación</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Tip of the day Card */}
                    <div className="bg-secondary-s3 text-white p-10 rounded-[40px] shadow-2xl shadow-secondary-s3/20 relative overflow-hidden flex flex-col gap-8">
                        <div className="absolute bottom-[-10%] left-[-10%] size-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-4xl p-2 bg-white/20 rounded-2xl">auto_awesome</span>
                            <div>
                                <p className="font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Tip de Inclusión</p>
                                <h4 className="font-display font-black text-xl tracking-tight">Cultura PACTO</h4>
                            </div>
                        </div>
                        <p className="text-lg font-bold leading-relaxed italic opacity-95">
                            &ldquo;{currentTip}&rdquo;
                        </p>
                        <button
                            onClick={handleApplyTip}
                            disabled={tipStatus !== 'idle'}
                            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${tipStatus === 'success' ? 'bg-green-500 text-white shadow-xl' : 'bg-white text-secondary-s3 hover:shadow-2xl hover:translate-y-[-2px]'}`}
                        >
                            {tipStatus === 'sending' ? (
                                <><span className="material-symbols-outlined animate-spin">refresh</span><span>Enviando...</span></>
                            ) : tipStatus === 'success' ? (
                                <><span className="material-symbols-outlined">verified</span><span>¡Compartido!</span></>
                            ) : (
                                <><span className="material-symbols-outlined">share</span><span>Compartir tip</span></>
                            )}
                        </button>
                    </div>
                </aside>
            </div>
        </PageContainer>
    );
};

export default Dashboard;
