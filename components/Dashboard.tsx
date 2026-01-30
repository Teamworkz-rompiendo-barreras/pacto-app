// Verified Deployment
import React, { useState, useEffect } from 'react';
import { Agreement, View, UserProfile, Notification } from '../types';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../LanguageContext';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';
interface DashboardProps {
    user: UserProfile | null;
    agreements: Agreement[];
    notifications?: Notification[]; // Added
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
    "Fomenta el 'Stimming' (movimientos de autorregulación) discretos en reuniones; garabatear o usar fidget toys ayuda a la concentración.",
    "Graba las reuniones importantes. Para personas con TDAH, poder revisar la grabación a 1.5x velocidad es una herramienta vital."
];

const Dashboard: React.FC<DashboardProps> = ({ user, agreements, notifications, onCreateNew, onViewAgreement, onEditAgreement, onExploreLibrary, onNavigate, onSendTip, isArchivedView = false }) => {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [tipStatus, setTipStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [currentTip, setCurrentTip] = useState(TIPS_DB[0]);
    const [focusModeActive, setFocusModeActive] = useState(false);

    const isAdmin = user?.role === 'Admin' || user?.role === 'SuperAdmin';
    // Estado para controlar qué vista ve el admin (Admin vs Personal)
    const [showAdminPanel, setShowAdminPanel] = useState(isAdmin);

    // Efecto para sincronizar si cambia el usuario
    useEffect(() => {
        if (user?.role === 'Admin' || user?.role === 'SuperAdmin') {
            setShowAdminPanel(true);
        } else {
            setShowAdminPanel(false);
        }
    }, [user]);

    // Simular carga de "Tip del Día"
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * TIPS_DB.length);
        setCurrentTip(TIPS_DB[randomIndex]);
    }, []);

    const handleApplyTip = () => {
        setTipStatus('sending');

        // Use the new prop to send real notification
        if (onSendTip) {
            onSendTip(currentTip);
        }

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
                    badge={
                        <>
                            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                            {t('admin.badge')}
                        </>
                    }
                    actionButton={
                        <button
                            onClick={() => setShowAdminPanel(false)}
                            className="flex items-center gap-3 bg-white border-2 border-primary text-primary px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-primary hover:text-white transition-all group"
                        >
                            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform">swap_vert</span>
                            <span>{t('admin.btn.switch')}</span>
                        </button>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase tracking-wider">
                            <span className="material-symbols-outlined">health_metrics</span>
                            {t('admin.metric.health')}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-text-n900">92%</span>
                            <span className="text-green-500 font-bold flex items-center text-sm">+5% <span className="material-symbols-outlined text-sm">trending_up</span></span>
                        </div>
                        <p className="text-sm text-gray-500">{t('admin.metric.health.desc')}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase tracking-wider">
                            <span className="material-symbols-outlined">person</span>
                            {t('admin.metric.members')}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-text-n900">12</span>
                            <span className="text-gray-400 font-medium text-sm">/ 20 {t('admin.metric.members.suffix')}</span>
                        </div>
                        <button onClick={() => onNavigate(View.ORGANIZATION)} className="text-primary font-bold text-sm hover:underline text-left">{t('admin.btn.manage_team')} &rarr;</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase tracking-wider">
                            <span className="material-symbols-outlined">handshake</span>
                            {t('admin.metric.agreements')}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-text-n900">{agreements.length}</span>
                            <span className="text-gray-400 font-medium text-sm">{t('admin.metric.agreements.total')}</span>
                        </div>
                        <button onClick={onExploreLibrary} className="text-primary font-bold text-sm hover:underline text-left">{t('admin.btn.templates')} &rarr;</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Accesos Rápidos Admin */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-text-n900 mb-6">{t('admin.actions.title')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => onNavigate(View.ORGANIZATION)} className="p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-left flex flex-col gap-3 group">
                                <div className="size-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary transition-colors">
                                    <span className="material-symbols-outlined">person_add</span>
                                </div>
                                <span className="font-bold text-text-n900">{t('admin.action.invite')}</span>
                            </button>
                            <button onClick={() => onNavigate(View.ORGANIZATION)} className="p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-left flex flex-col gap-3 group">
                                <div className="size-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary transition-colors">
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <span className="font-bold text-text-n900">{t('admin.action.teams')}</span>
                            </button>
                            <button onClick={() => onNavigate(View.REPORTS)} className="p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-left flex flex-col gap-3 group">
                                <div className="size-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary transition-colors">
                                    <span className="material-symbols-outlined">bar_chart</span>
                                </div>
                                <span className="font-bold text-text-n900">{t('admin.action.reports')}</span>
                            </button>
                            <button onClick={() => onNavigate(View.ORGANIZATION)} className="p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-left flex flex-col gap-3 group">
                                <div className="size-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary transition-colors">
                                    <span className="material-symbols-outlined">settings_suggest</span>
                                </div>
                                <span className="font-bold text-text-n900">{t('admin.action.accessibility')}</span>
                            </button>
                        </div>
                    </div>

                    {/* Actividad Reciente */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-text-n900 mb-6">{t('admin.activity.title')}</h3>
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500 font-bold text-xs">U{i}</div>
                                    <div>
                                        <p className="text-sm font-medium text-text-n900">
                                            <span className="font-bold">Usuario {i}</span> ha completado el ritual de <span className="font-bold text-primary">Cierre Semanal</span>.
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">Hace {i * 15} minutos</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageContainer>
        );
    }

    // --- RENDERIZADO VIEW: EMPLEADO (MIEMBRO) ---
    return (
        <PageContainer>
            {/* Header Normal */}
            <PageHeader
                title={isArchivedView ? "Acuerdos Archivados" : `Hola, ${user?.name.split(' ')[0]}`}
                subtitle={isArchivedView ? "Historial de acuerdos antiguos." : t('dash.subtitle')}
                badge={isArchivedView ? (
                    <>
                        <span className="material-symbols-outlined text-sm">archive</span>
                        Archivo
                    </>
                ) : undefined}
                badgeColor={isArchivedView ? "bg-gray-100 text-gray-600" : undefined}
                actionButton={
                    <div className="flex gap-3">
                        {isAdmin && (
                            <button
                                onClick={() => setShowAdminPanel(true)}
                                className="hidden md:flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-600 px-4 py-3 rounded-xl font-bold hover:border-primary hover:text-primary transition-all"
                            >
                                <span className="material-symbols-outlined">admin_panel_settings</span>
                                {t('admin.badge')}
                            </button>
                        )}
                        {!isArchivedView && (
                            <button
                                onClick={onCreateNew}
                                className="flex justify-center items-center gap-2 bg-primary hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <span className="material-symbols-outlined">add</span>
                                <span>{t('dashboard.btn.new')}</span>
                            </button>
                        )}
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content (Acuerdos) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-text-n900">
                            {isArchivedView ? 'Acuerdos Archivados' : t('dash.section.agreements')}
                        </h2>
                        {!isArchivedView ? (
                            <button
                                onClick={() => onNavigate(View.ARCHIVED_AGREEMENTS)}
                                className="text-sm font-bold text-gray-400 hover:text-text-n900 flex items-center gap-1 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">archive</span>
                                Ver Archivados
                            </button>
                        ) : (
                            <button
                                onClick={() => onNavigate(View.DASHBOARD)}
                                className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Volver al Dashboard
                            </button>
                        )}
                    </div>

                    <div className="grid gap-4">
                        {agreements.length === 0 ? (
                            <div className="bg-white p-10 rounded-2xl border-2 border-dashed border-gray-200 text-center flex flex-col items-center gap-4">
                                <span className="material-symbols-outlined text-4xl text-gray-300">sentiment_content</span>
                                <div className="space-y-1">
                                    <p className="font-bold text-gray-500 text-lg">{t('dash.empty.title')}</p>
                                    <p className="text-gray-400 text-sm">{t('dash.empty.desc')}</p>
                                </div>
                                <button onClick={onCreateNew} className="text-primary font-bold hover:underline">{t('dash.empty.btn')}</button>
                            </div>
                        ) : (
                            agreements.map((agreement) => (
                                <div
                                    key={agreement.id}
                                    className="w-full text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between gap-4 relative"
                                >
                                    {/* Main Click Area Overlay */}
                                    <button
                                        onClick={() => onViewAgreement(agreement)}
                                        className="absolute inset-0 w-full h-full rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 cursor-pointer z-0 opacity-0"
                                        aria-label={`Ver detalles de ${agreement.title}`}
                                    ></button>

                                    <div className="flex flex-col gap-1 z-10 pointer-events-none">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${agreement.category === 'Comunicación' ? 'bg-blue-100 text-blue-700' :
                                                agreement.category === 'Foco' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {agreement.category}
                                            </span>
                                            {agreement.visibility && (
                                                <span className="text-gray-400 flex items-center" title={agreement.visibility === 'Organization' ? 'Global' : (agreement.visibility === 'Private' ? 'Privado' : 'Equipo')}>
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        {agreement.visibility === 'Organization' ? 'public' : (agreement.visibility === 'Private' ? 'lock' : 'group')}
                                                    </span>
                                                </span>
                                            )}
                                            <span className={`text-[10px] font-bold ${agreement.status === 'Activo' ? 'text-green-600' : 'text-amber-600'}`}>• {agreement.status}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-text-n900 group-hover:text-primary transition-colors">{agreement.title}</h4>
                                        <p className="text-gray-500 font-medium text-sm line-clamp-1">{agreement.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:self-center z-20">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEditAgreement(agreement); }}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors focus:ring-2 focus:ring-primary pointer-events-auto"
                                            title="Editar"
                                            aria-label={`Editar ${agreement.title}`}
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <div className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors pointer-events-none">
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
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
                        <h3 className="text-lg font-bold mb-1 opacity-90">{t('dash.widget.wellbeing')}</h3>

                        {agreements.length > 0 ? (
                            <>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-5xl font-black">100%</span>
                                    <span className="text-sm font-bold mb-2 opacity-80">{t('dash.widget.clarity')}</span>
                                </div>
                                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
                                    <div className="bg-white h-full w-full rounded-full"></div>
                                </div>
                                <p className="text-sm font-medium opacity-90 leading-relaxed">
                                    {t('dash.widget.ready')}
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-5xl font-black">--</span>
                                    <span className="text-sm font-bold mb-2 opacity-80">{t('dash.widget.tostart')}</span>
                                </div>
                                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
                                    <div className="bg-white h-full w-[5%] rounded-full"></div>
                                </div>
                                <p className="text-sm font-medium opacity-90 leading-relaxed">
                                    {t('dash.widget.nodata')}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-text-n900 mb-4">{t('dash.tools.title')}</h3>
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
                                        {focusModeActive ? t('dash.tools.focus.active') : t('dash.tools.focus.start')}
                                    </span>
                                    <span className="block text-xs text-gray-500">
                                        {focusModeActive ? t('dash.tools.focus.muting') : t('dash.tools.focus.desc')}
                                    </span>
                                </div>
                            </button>
                            <button onClick={() => onNavigate(View.CLARITY_CARDS)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group border-2 border-transparent">
                                <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-text-n900 text-sm">{t('dash.tools.clarity.title')}</span>
                                    <span className="block text-xs text-gray-500">{t('dash.tools.clarity.desc')}</span>
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
                                <h4 className="font-bold text-text-n900 text-lg">{t('dash.tip.title')}</h4>
                                <span className="bg-secondary-s3/10 text-secondary-s3 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t('dash.tag.inclusion')}</span>
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
                                <span>{t('dash.tip.btn.sending')}</span>
                            </>
                        ) : tipStatus === 'success' ? (
                            <>
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                <span>{t('dash.tip.btn.success')}</span>
                            </>
                        ) : (
                            <>
                                <span>{t('dash.tip.btn.idle')}</span>
                                <span className="material-symbols-outlined text-lg">send</span>
                            </>
                        )}
                    </button>
                </div>

            </div >
        </PageContainer >
    );
};

export default Dashboard;
