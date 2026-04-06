
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, AccessibilitySettings } from '../types';
import { useToast } from '../context/ToastContext';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

interface ProfileProps {
    user: UserProfile;
    settings: AccessibilitySettings;
    onSaveSettings: (settings: AccessibilitySettings) => void;
    onUpdateUser: (user: Partial<UserProfile>) => void;
    onCreateNew: () => void;
    onOpenPublicView: () => void;
    onLogout: () => void;
    onDeleteAccount?: () => void; // Prop para eliminación directa sin modal de confirmación de logout
    onNavigateToLanguage: () => void;
    initialSection?: string;
}

// Datos simulados de sesiones activas
const DEMO_SESSIONS = [
    { id: '1', device: 'Chrome en Windows', location: 'Madrid, ES', lastActive: 'Activo ahora', current: true, icon: 'laptop_mac' },
    { id: '2', device: 'iPhone 13', location: 'Barcelona, ES', lastActive: 'Hace 2 horas', current: false, icon: 'phone_iphone' },
    { id: '3', device: 'Safari en Mac', location: 'Valencia, ES', lastActive: 'Hace 5 días', current: false, icon: 'laptop_mac' }
];

const Profile: React.FC<ProfileProps> = ({ user, settings, onSaveSettings, onUpdateUser, onOpenPublicView, onLogout, onDeleteAccount, onNavigateToLanguage, initialSection = 'personal' }) => {
    const { toast } = useToast();
    // Estado local para el formulario de perfil
    const [name, setName] = useState(user.name);
    const [role, setRole] = useState(user.role);
    const [jobTitle, setJobTitle] = useState(user.jobTitle || '');
    const [about, setAbout] = useState(user.about || '');
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [avatarError, setAvatarError] = useState(false);

    // Estado local para configuraciones
    const [localSettings, setLocalSettings] = useState<AccessibilitySettings>(settings);

    // Estado para configuraciones de cuenta (Simulado para UI)
    const [twoFactorActive, setTwoFactorActive] = useState(false);

    // Estados para Modales
    // Estados para Modales
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [showConfirm2FA, setShowConfirm2FA] = useState(false);

    // Estados para Modales de Zona de Peligro
    const [showDevicesModal, setShowDevicesModal] = useState(false);
    const [activeSessions, setActiveSessions] = useState(DEMO_SESSIONS);
    const [isLoadingSessions, setIsLoadingSessions] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteStep, setDeleteStep] = useState<1 | 2 | 3>(1);
    const [deleteReason, setDeleteReason] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Estados formulario Password
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passMessage, setPassMessage] = useState('');

    // Estados flujo 2FA
    const [otpCode, setOtpCode] = useState('');
    const [is2FASetupComplete, setIs2FASetupComplete] = useState(false);

    // Estado para la navegación activa
    const [activeSection, setActiveSection] = useState(initialSection);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    // Efecto para manejar el scroll inicial si viene definido
    useEffect(() => {
        if (initialSection) {
            setActiveSection(initialSection);
            // Pequeño timeout para asegurar que el DOM está listo
            setTimeout(() => {
                const element = sectionRefs.current[initialSection];
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [initialSection]);

    // Efecto para resetear error de imagen si cambia el avatar
    useEffect(() => {
        setAvatarError(false);
    }, [avatar]);

    // Efecto para previsualizar cambios de accesibilidad en tiempo real
    useEffect(() => {
        const body = document.body;
        const root = document.documentElement;

        if (localSettings.high_contrast) root.classList.add('high-contrast');
        else root.classList.remove('high-contrast');

        if (localSettings.dyslexia_font) body.classList.add('dyslexia-font');
        else body.classList.remove('dyslexia-font');

    }, [localSettings]);

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

    const handleSaveAll = () => {
        onUpdateUser({ name, role, jobTitle, about, avatar });
        onSaveSettings(localSettings);

        // Feedback visual con estado React
        setSaveStatus('saved');
        toast('Configuración guardada correctamente', 'success');

        setTimeout(() => {
            setSaveStatus('idle');
        }, 2000);
    };

    const handleDiscard = () => {
        setName(user.name);
        setRole(user.role);
        setJobTitle(user.jobTitle || '');
        setAbout(user.about || '');
        setAvatar(user.avatar || '');
        setLocalSettings(settings);
        setActiveSection('personal');
        setActiveSection('personal');
        const personalSection = sectionRefs.current['personal'];
        if (personalSection) personalSection.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleSetting = (key: keyof AccessibilitySettings) => {
        setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleCommPreference = (checked: boolean) => {
        setLocalSettings(prev => ({ ...prev, comm_preference: checked ? 'Escrito' : 'Verbal' }));
    };

    const setProfileVisibility = (visibility: 'team' | 'managers' | 'private') => {
        setLocalSettings(prev => ({ ...prev, profile_visibility: visibility }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setActiveSection(id);
        const element = sectionRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // --- Lógica Cambio de Contraseña ---
    const handleChangePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPass !== confirmPass) {
            setPassMessage('Las contraseñas no coinciden.');
            return;
        }
        if (newPass.length < 6) {
            setPassMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // Simulación de éxito
        setPassMessage('');
        setShowPasswordModal(false);
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');

        toast('Contraseña actualizada correctamente. Revisa tu email.', 'success');
    };

    // --- Lógica 2FA ---
    const handle2FAToggle = () => {
        if (twoFactorActive) {
            setShowConfirm2FA(true);
        } else {
            setOtpCode('');
            setIs2FASetupComplete(false);
            setShow2FAModal(true);
        }
    };

    const confirmDisable2FA = () => {
        setTwoFactorActive(false);
        setShowConfirm2FA(false);
        toast('Autenticación en dos pasos desactivada', 'warning');
    };

    const verify2FACode = () => {
        if (otpCode.length >= 4) {
            setIs2FASetupComplete(true);
            setTimeout(() => {
                setTwoFactorActive(true);
                setShow2FAModal(false);
            }, 1500);
        } else {
            toast("Código inválido. Intenta con '1234'", 'error');
        }
    };

    // --- Lógica Gestión de Dispositivos ---
    const handleOpenDevicesModal = () => {
        setShowDevicesModal(true);
        setIsLoadingSessions(true);
        // Simular petición al servidor para detectar dispositivos
        setTimeout(() => {
            setIsLoadingSessions(false);
        }, 1500);
    };

    const handleRevokeSession = (id: string) => {
        setActiveSessions(prev => prev.filter(session => session.id !== id));
    };

    const handleRevokeAll = () => {
        // Mantenemos solo la actual
        setActiveSessions(prev => prev.filter(session => session.current));
    };

    const handleExportData = () => {
        toast("Solicitud enviada. Recibirás un email con tus datos en breve.", 'success');
    };

    // --- Lógica Eliminar Cuenta ---
    const handleDeleteAccount = () => {
        setDeleteStep(1);
        setDeleteReason('');
        setIsDeleting(false);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setIsDeleting(true);

        // Simular tiempo de procesamiento de eliminación
        setTimeout(() => {
            setIsDeleting(false);
            setDeleteStep(3);

            // Esperar 3 segundos para que el usuario lea el mensaje de éxito antes de redirigir
            setTimeout(() => {
                if (onDeleteAccount) {
                    onDeleteAccount();
                } else {
                    onLogout();
                }
            }, 3000);
        }, 2000);
    };

    const handleSaveProfile = () => {
        onUpdateUser({
            name,
            role,
            jobTitle,
            about,
            avatar
        });
        toast("Perfil actualizado correctamente", 'success');
    };

    return (
        <PageContainer>
            <PageHeader
                title="Mi Manual de Usuario"
                subtitle="Configura tus 'instrucciones de uso' para que tu equipo sepa cómo colaborar mejor contigo."
                actionButton={
                    <div className="flex gap-3">
                        <button
                            onClick={onOpenPublicView}
                            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-secondary-s3 text-white font-black rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined">visibility</span>
                            VER MI MANUAL
                        </button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Sidebar Navigation */}
                <aside className="md:col-span-1 space-y-3 sticky top-24">
                    <div className="bg-white/50 backdrop-blur-sm p-2 rounded-[24px] border border-white/40 shadow-sm">
                        <a
                            href="#personal"
                            onClick={(e) => scrollToSection(e, 'personal')}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${activeSection === 'personal'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1'
                                : 'hover:bg-primary/5 text-text-n900/60'
                                }`}
                        >
                            <span className="material-symbols-outlined">face</span>
                            Identidad Persona
                        </a>
                        <a
                            href="#manual"
                            onClick={(e) => scrollToSection(e, 'manual')}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${activeSection === 'manual'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1'
                                : 'hover:bg-primary/5 text-text-n900/60'
                                }`}
                        >
                            <span className="material-symbols-outlined">menu_book</span>
                            Manual de Trabajo
                        </a>
                        <a
                            href="#sensorial"
                            onClick={(e) => scrollToSection(e, 'sensorial')}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${activeSection === 'sensorial'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1'
                                : 'hover:bg-primary/5 text-text-n900/60'
                                }`}
                        >
                            <span className="material-symbols-outlined">neurology</span>
                            Entorno Sensorial
                        </a>
                        <a
                            href="#security"
                            onClick={(e) => scrollToSection(e, 'security')}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${activeSection === 'security'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1'
                                : 'hover:bg-primary/5 text-text-n900/60'
                                }`}
                        >
                            <span className="material-symbols-outlined">shield_person</span>
                            Cuenta y Datos
                        </a>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border-2 border-transparent hover:border-red-100"
                    >
                        <span className="material-symbols-outlined text-md">logout</span>
                        Cerrar Sesión
                    </button>
                </aside>

                {/* Main Settings Content */}
                <div className="md:col-span-2 space-y-10">

                    {/* Section: Identidad */}
                    <section id="personal" ref={el => { sectionRefs.current['personal'] = el; }} className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary/5 border border-white/40 scroll-mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined font-bold text-2xl">face</span>
                                </div>
                                <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">Identidad Persona</h2>
                            </div>
                        </div>

                        <div className="mb-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start p-6 bg-primary/5 rounded-[24px] border border-primary/10">
                            <div className="relative group shrink-0">
                                <div
                                    className="size-32 md:size-36 rounded-[24px] bg-white border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center cursor-pointer rotate-[-2deg] group-hover:rotate-0 transition-all duration-300"
                                    onClick={handleAvatarClick}
                                >
                                    {avatar && !avatarError ? (
                                        <img
                                            src={avatar}
                                            alt="Profile"
                                            className="size-full object-cover"
                                            onError={() => setAvatarError(true)}
                                        />
                                    ) : (
                                        <div className="size-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-5xl text-gray-400">add_a_photo</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="material-symbols-outlined text-white text-3xl font-bold">upload</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <div className="flex-1 space-y-3 text-center sm:text-left pt-2">
                                <h3 className="text-xl font-black text-text-n900 leading-none">Tu Imagen de Perfil</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">Esta foto acompañará tus acuerdos y será lo primero que vean tus compañeros.</p>
                                <button
                                    onClick={handleAvatarClick}
                                    className="text-xs font-black text-primary uppercase tracking-widest bg-white px-4 py-2 rounded-lg shadow-sm border border-primary/10 hover:bg-primary hover:text-white transition-all"
                                >
                                    Subir nueva foto
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="name" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Nombre Público</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[16px] px-6 py-4 font-bold text-text-n900 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="jobTitle" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Cargo Profesional</label>
                                <input
                                    id="jobTitle"
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[16px] px-6 py-4 font-bold text-text-n900 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Permisos de Sistema</label>
                                <div className="w-full bg-gray-100/50 border-2 border-dashed border-black/5 rounded-[16px] px-6 py-4 text-gray-500 font-black text-sm flex items-center gap-3 cursor-not-allowed uppercase tracking-tighter">
                                    <span className="material-symbols-outlined text-lg">verified_user</span>
                                    {role === 'Admin' ? 'Administrador' : (role === 'SuperAdmin' ? 'Super Admin' : 'Usuario Estándar')}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section: Manual de Trabajo */}
                    <section id="manual" ref={el => { sectionRefs.current['manual'] = el; }} className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary/5 border border-white/40 scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-12 rounded-2xl bg-p1/20 flex items-center justify-center text-p1">
                                <span className="material-symbols-outlined font-bold text-2xl text-primary">menu_book</span>
                            </div>
                            <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">Manual de Trabajo</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="about" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Cómo trabajar conmigo (Bio)</label>
                                <textarea
                                    id="about"
                                    rows={4}
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Ej: Prefiero las mañanas para tareas de foco. Valoro la comunicación directa pero constructiva..."
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-6 py-5 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none min-h-[140px]"
                                ></textarea>
                                <div className="flex items-start gap-2 p-4 bg-p1/10 rounded-xl border border-p1/20">
                                    <span className="material-symbols-outlined text-primary text-sm font-bold">tips_and_updates</span>
                                    <p className="text-xs text-primary/80 font-bold leading-relaxed italic">
                                        Consejo: Describe qué te hace feliz en el trabajo y qué situaciones te generan fricción. Esto ayuda a tu equipo a ser más inclusivo.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">forum</span>
                                            <span className="font-display font-black text-sm uppercase tracking-widest text-text-n900">Comunicación</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={localSettings.comm_preference === 'Escrito'}
                                                onChange={(e) => handleCommPreference(e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className={`flex-1 p-3 rounded-xl border-2 transition-all ${localSettings.comm_preference === 'Escrito' ? 'border-primary bg-primary/5' : 'border-black/5 opacity-50'}`}>
                                            <p className="text-[10px] font-black uppercase text-center">Escrito</p>
                                        </div>
                                        <div className={`flex-1 p-3 rounded-xl border-2 transition-all ${localSettings.comm_preference === 'Verbal' ? 'border-primary bg-primary/5' : 'border-black/5 opacity-50'}`}>
                                            <p className="text-[10px] font-black uppercase text-center">Verbal</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs text-gray-400 font-medium">¿Prefieres que te escriban o que te llamen para sincronizar?</p>
                                </div>

                                <div className="bg-white p-6 rounded-[24px] border border-black/5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-secondary-s3">visibility</span>
                                        <span className="font-display font-black text-sm uppercase tracking-widest text-text-n900">Privacidad</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {(['team', 'managers', 'private'] as const).map((v) => (
                                            <button
                                                key={v}
                                                onClick={() => setProfileVisibility(v)}
                                                className={`text-left px-4 py-2 rounded-lg text-xs font-black uppercase tracking-tighter transition-all ${localSettings.profile_visibility === v ? 'bg-secondary-s3 text-white shadow-md' : 'hover:bg-gray-50 text-gray-400'}`}
                                            >
                                                {v === 'team' ? 'Toda la Organización' : v === 'managers' ? 'Solo mi Equipo' : 'Solo Yo'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={handleSaveAll}
                                className={`px-10 py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${saveStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95'}`}
                            >
                                {saveStatus === 'saved' ? '¡CAMBIOS GUARDADOS!' : 'GUARDAR MI MANUAL'}
                            </button>
                        </div>
                    </section>

                    {/* Section: Entorno Sensorial */}
                    <section id="sensorial" ref={el => { sectionRefs.current['sensorial'] = el; }} className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary/5 border border-white/40 scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined font-bold text-2xl">visibility</span>
                            </div>
                            <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">Entorno Sensorial</h2>
                        </div>

                        <div className="space-y-6">
                            <div
                                className={`flex items-start justify-between gap-6 p-6 rounded-[24px] border-2 transition-all cursor-pointer ${localSettings.dyslexia_font ? 'border-primary bg-primary/5' : 'border-black/5 hover:border-primary/20 bg-white'}`}
                                onClick={() => toggleSetting('dyslexia_font')}
                            >
                                <div className="max-w-md flex gap-4">
                                    <span className={`material-symbols-outlined p-2 rounded-xl h-fit ${localSettings.dyslexia_font ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>spellcheck</span>
                                    <div>
                                        <p className="font-black text-lg text-text-n900 uppercase tracking-tighter">Fuentes para Dislexia</p>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Usa tipografías optimizadas para facilitar la lectura y el procesamiento cognitivo.</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer mt-1 pointer-events-none">
                                    <input type="checkbox" className="sr-only peer" checked={localSettings.dyslexia_font} readOnly />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </div>

                            <div
                                className={`flex items-start justify-between gap-6 p-6 rounded-[24px] border-2 transition-all cursor-pointer ${localSettings.high_contrast ? 'border-primary bg-primary/5' : 'border-black/5 hover:border-primary/20 bg-white'}`}
                                onClick={() => toggleSetting('high_contrast')}
                            >
                                <div className="max-w-md flex gap-4">
                                    <span className={`material-symbols-outlined p-2 rounded-xl h-fit ${localSettings.high_contrast ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>contrast</span>
                                    <div>
                                        <p className="font-black text-lg text-text-n900 uppercase tracking-tighter">Máximo Contraste</p>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Aumenta la distinción visual entre el texto y el fondo para reducir la fatiga ocular.</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer mt-1 pointer-events-none">
                                    <input type="checkbox" className="sr-only peer" checked={localSettings.high_contrast} readOnly />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section: Modos de Comunicación */}
                    <section id="comunicacion" ref={el => { sectionRefs.current['comunicacion'] = el; }} className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 scroll-mt-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">chat_bubble</span>
                            <h2 className="text-2xl font-bold text-text-n900">Modos de Comunicación</h2>
                        </div>
                        <p className="text-sm opacity-70 mb-6 leading-relaxed text-text-n900">Selecciona cómo prefieres interactuar con tu equipo.</p>
                        <div className="grid grid-cols-1 gap-4">
                            <label className={`group flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${localSettings.comm_preference === 'Escrito' ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/20 bg-bg-s1/30'}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`material-symbols-outlined transition-colors ${localSettings.comm_preference === 'Escrito' ? 'text-primary' : 'opacity-40 group-hover:text-primary'}`}>edit_note</span>
                                    <span className="font-medium text-text-n900">Prefiero comunicación escrita</span>
                                </div>
                                <input type="checkbox" className="rounded text-primary focus:ring-primary size-5 border-black/10 cursor-pointer" checked={localSettings.comm_preference === 'Escrito'} onChange={(e) => handleCommPreference(e.target.checked)} />
                            </label>
                            <label className={`group flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${localSettings.avoid_calls ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/20 bg-bg-s1/30'}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`material-symbols-outlined transition-colors ${localSettings.avoid_calls ? 'text-primary' : 'opacity-40 group-hover:text-primary'}`}>phone_disabled</span>
                                    <span className="font-medium text-text-n900">Evitar llamadas sin previo aviso</span>
                                </div>
                                <input type="checkbox" className="rounded text-primary focus:ring-primary size-5 border-black/10 cursor-pointer" checked={!!localSettings.avoid_calls} onChange={() => toggleSetting('avoid_calls')} />
                            </label>
                            <label className={`group flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${localSettings.need_processing ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/20 bg-bg-s1/30'}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`material-symbols-outlined transition-colors ${localSettings.need_processing ? 'text-primary' : 'opacity-40 group-hover:text-primary'}`}>hourglass_top</span>
                                    <span className="font-medium text-text-n900">Necesito tiempo de procesamiento</span>
                                </div>
                                <input type="checkbox" className="rounded text-primary focus:ring-primary size-5 border-black/10 cursor-pointer" checked={!!localSettings.need_processing} onChange={() => toggleSetting('need_processing')} />
                            </label>
                        </div>
                    </section>

                    {/* Section: Cuenta y Datos */}
                    <section id="security" ref={el => { sectionRefs.current['security'] = el; }} className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl shadow-primary/5 border border-white/40 scroll-mt-24 space-y-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="size-12 rounded-2xl bg-secondary-s3/10 flex items-center justify-center text-secondary-s3">
                                <span className="material-symbols-outlined font-bold text-2xl">shield_person</span>
                            </div>
                            <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">Cuenta y Datos</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {/* Security Item */}
                            <div className="bg-white p-8 rounded-[24px] border border-black/5 shadow-sm space-y-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex-1">
                                        <p className="font-black text-lg text-text-n900 uppercase tracking-tighter mb-1">Tu Seguridad</p>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Protege tu acceso y revisa las sesiones activas en tus dispositivos.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowPasswordModal(true)}
                                            className="px-6 py-3 bg-text-n900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all"
                                        >
                                            Password
                                        </button>
                                        <button
                                            onClick={handle2FAToggle}
                                            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${twoFactorActive ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'}`}
                                        >
                                            {twoFactorActive ? '2FA Activo' : 'Activar 2FA'}
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-black/5">
                                    <button
                                        onClick={handleOpenDevicesModal}
                                        className="text-xs font-black text-gray-400 hover:text-primary uppercase tracking-widest flex items-center gap-2 group"
                                    >
                                        <span className="material-symbols-outlined text-md">devices</span>
                                        Gestionar Dispositivos
                                        <span className="material-symbols-outlined text-md opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                                    </button>
                                </div>
                            </div>

                            {/* Data Export Item */}
                            <div className="bg-white p-8 rounded-[24px] border border-black/5 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex-1">
                                        <p className="font-black text-lg text-text-n900 uppercase tracking-tighter mb-1">Tus Datos</p>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Cumplimos con el RGPD. Puedes solicitar una copia de tus datos o eliminarlos definitivamente.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleExportData}
                                            className="px-6 py-3 bg-gray-100 text-text-n900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                                        >
                                            Exportar
                                        </button>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="px-6 py-3 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Action Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 py-8 border-t border-black/10">
                        <button
                            onClick={handleDiscard}
                            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold opacity-60 hover:opacity-100 hover:bg-black/5 transition-all text-text-n900"
                        >
                            Descartar cambios
                        </button>
                        <button
                            id="save-btn"
                            onClick={handleSaveAll}
                            className={`w-full sm:w-auto px-10 py-3 text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-primary'
                                }`}
                        >
                            {saveStatus === 'saved' ? '¡Guardado!' : 'Guardar Configuración'}
                        </button>
                    </div>
                </div>
            </div>




            {/* --- MODAL GESTIÓN DE DISPOSITIVOS --- */}
            {
                showDevicesModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-text-n900">Sesiones Activas</h3>
                                <button
                                    onClick={() => setShowDevicesModal(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {isLoadingSessions ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
                                    <p className="text-gray-500 text-sm font-medium animate-pulse">Detectando dispositivos...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100 flex gap-3">
                                        <span className="material-symbols-outlined">info</span>
                                        <p>Aquí puedes ver los dispositivos donde has iniciado sesión recientemente. Si no reconoces alguno, ciérralo y cambia tu contraseña.</p>
                                    </div>

                                    <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar mb-6">
                                        {activeSessions.length === 0 ? (
                                            <p className="text-center text-gray-500 py-4">No hay otras sesiones activas.</p>
                                        ) : (
                                            activeSessions.map(session => (
                                                <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-600`}>
                                                            <span className="material-symbols-outlined">{session.icon}</span>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-bold text-text-n900 text-sm">{session.device}</p>
                                                                {session.current && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">ACTUAL</span>}
                                                            </div>
                                                            <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                                                        </div>
                                                    </div>
                                                    {!session.current && (
                                                        <button
                                                            onClick={() => handleRevokeSession(session.id)}
                                                            className="text-red-600 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded transition-colors"
                                                        >
                                                            Cerrar
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {activeSessions.length > 1 && (
                                        <button
                                            onClick={handleRevokeAll}
                                            className="w-full py-3 border border-gray-300 text-text-n900 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cerrar todas las demás sesiones
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )
            }

            {/* --- MODAL ELIMINAR CUENTA (Flujo Completo) --- */}
            {
                showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
                            {deleteStep !== 3 && !isDeleting && (
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            )}

                            {isDeleting ? (
                                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-text-n900">Eliminando cuenta...</p>
                                        <p className="text-gray-500 text-sm">Por favor espera, no cierres esta ventana.</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {deleteStep === 1 && (
                                        // PASO 1: MOTIVO
                                        <div className="animate-fade-in">
                                            <div className="size-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-center mb-2 text-text-n900">Lamentamos que te vayas</h3>
                                            <p className="text-center text-gray-600 mb-6 text-sm">Ayúdanos a mejorar contándonos por qué decides eliminar tu cuenta.</p>

                                            <div className="space-y-3 mb-8">
                                                {['Ya no lo necesito', 'Es muy caro', 'Es difícil de usar', 'Preocupaciones de privacidad', 'Otro'].map(reason => (
                                                    <label key={reason} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${deleteReason === reason ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="deleteReason"
                                                            className="accent-primary size-4"
                                                            checked={deleteReason === reason}
                                                            onChange={() => setDeleteReason(reason)}
                                                        />
                                                        <span className="text-sm font-bold text-text-n900">{reason}</span>
                                                    </label>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setDeleteStep(2)}
                                                disabled={!deleteReason}
                                                className="w-full py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow-lg"
                                            >
                                                Continuar
                                            </button>
                                        </div>
                                    )}

                                    {deleteStep === 2 && (
                                        // PASO 2: CONFIRMACIÓN FINAL
                                        <div className="animate-fade-in">
                                            <div className="size-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                                <span className="material-symbols-outlined text-3xl">warning</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-center mb-2 text-red-900">¿Estás absolutamente seguro?</h3>
                                            <p className="text-center text-text-n900 font-medium mb-6">
                                                Esta acción <span className="font-bold underline">no se puede deshacer</span>.
                                            </p>

                                            <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-6 text-sm text-red-900 space-y-2">
                                                <p>• Se eliminará tu perfil y datos personales.</p>
                                                <p>• Perderás acceso a todos los equipos y acuerdos.</p>
                                                <p>• No podrás recuperar tu historial.</p>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <button
                                                    onClick={handleConfirmDelete}
                                                    className="w-full py-3 bg-red-800 text-white font-bold rounded-xl hover:bg-red-900 transition-all shadow-lg"
                                                >
                                                    Sí, eliminar mi cuenta
                                                </button>
                                                <button
                                                    onClick={() => setShowDeleteModal(false)}
                                                    className="w-full py-3 bg-transparent text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
                                                >
                                                    Cancelar, quiero quedarme
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {deleteStep === 3 && (
                                        // PASO 3: ÉXITO Y REDIRECCIÓN
                                        <div className="animate-fade-in text-center py-4">
                                            <div className="size-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <span className="material-symbols-outlined text-4xl">check</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-text-n900 mb-2">Cuenta Eliminada</h3>
                                            <p className="text-gray-600 mb-8">
                                                Tus datos han sido borrados correctamente.
                                            </p>
                                            <div className="flex justify-center gap-2">
                                                <span className="size-2 bg-primary rounded-full animate-bounce"></span>
                                                <span className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest font-bold">Redirigiendo...</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )
            }

            {/* --- MODAL CAMBIAR CONTRASEÑA (Existente) --- */}
            {
                showPasswordModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <h3 className="text-2xl font-bold mb-6 text-text-n900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">lock_reset</span>
                                Cambiar Contraseña
                            </h3>

                            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Contraseña Actual</label>
                                    <input
                                        type="password"
                                        required
                                        value={currentPass}
                                        onChange={(e) => setCurrentPass(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        required
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPass}
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                {passMessage && (
                                    <div className="text-red-600 text-sm font-bold bg-red-50 p-2 rounded">
                                        {passMessage}
                                    </div>
                                )}

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordModal(false)}
                                        className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:brightness-110 shadow-md transition-all"
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* --- MODAL CONFIGURACIÓN 2FA (Existente) --- */}
            {
                show2FAModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
                            <button
                                onClick={() => setShow2FAModal(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            {!is2FASetupComplete ? (
                                <div className="space-y-6 text-center">
                                    <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                                        <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-text-n900 mb-2">Configurar 2FA</h3>
                                        <p className="text-gray-600 text-sm">Escanea este código QR con tu aplicación de autenticación (Google Auth, Authy, etc).</p>
                                    </div>

                                    <div className="size-48 bg-black mx-auto rounded-xl flex items-center justify-center relative overflow-hidden group border-4 border-white shadow-xl">
                                        <div className="absolute inset-0 flex flex-wrap content-start">
                                            {/* Simulación visual de código NaviLens (Patrón de colores) */}
                                            <div className="w-1/4 h-full bg-[#f60000]"></div>
                                            <div className="w-1/4 h-full bg-[#ffec00]"></div>
                                            <div className="w-1/4 h-full bg-[#009ee0]"></div>
                                            <div className="w-1/4 h-full bg-black"></div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                                            <span className="material-symbols-outlined text-white text-6xl drop-shadow-lg">qr_code_scanner</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-center text-gray-500 mt-2 font-medium">Compatible con NaviLens GO</p>

                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-left">Ingresa el código de 6 dígitos</label>
                                        <input
                                            type="text"
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            className="w-full text-center text-2xl tracking-widest p-3 border-2 border-gray-300 rounded-xl focus:border-primary outline-none font-mono"
                                            placeholder="000 000"
                                        />
                                    </div>

                                    <button
                                        onClick={verify2FACode}
                                        disabled={otpCode.length < 4}
                                        className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Verificar y Activar
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-8 space-y-4 animate-fade-in">
                                    <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce-in">
                                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-n900">¡Activado!</h3>
                                    <p className="text-gray-600">Tu cuenta ahora tiene una capa extra de seguridad.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

        </PageContainer >
    );
};

export default Profile;
