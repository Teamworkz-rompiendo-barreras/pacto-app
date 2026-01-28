// Verified Deployment
import React, { useState } from 'react';
import { AccessibilitySettings } from '../types';
import { authService } from '../services/authService';
import { useLanguage } from '../LanguageContext';

interface LoginProps {
    onLogin: (name: string, settings: AccessibilitySettings) => void;
    onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP_COMPANY' | 'SIGNUP_EMPLOYEE' | 'RECOVERY'>('LOGIN');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [phone, setPhone] = useState('');
    const { language = 'es-la' } = useLanguage(); // Default safe value

    // Pricing States
    const [selectedPlanTier, setSelectedPlanTier] = useState<'SEED' | 'GROWTH' | 'ENTERPRISE'>('SEED');
    const [showPlanSelection, setShowPlanSelection] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const [settings, setSettings] = useState<AccessibilitySettings>({
        id: 'temp',
        low_stimulus: false,
        dyslexia_font: false,
        high_contrast: false,
        comm_preference: 'Escrito'
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotification(null);
        setLoading(true);

        try {
            if (mode === 'LOGIN') {
                const { user, error } = await authService.signIn(email, password);
                if (error) {
                    let msg = error;
                    if (error === "Credenciales incorrectas") msg = "Correo o contraseña incorrectos.";
                    if (error.includes("rate limit")) msg = "Has intentado demasiadas veces. Espera unos minutos.";
                    if (error.includes("Email not confirmed")) msg = "Debes confirmar tu correo electrónico antes de entrar.";
                    setNotification(msg);
                } else if (user) {
                    onLogin(user.name, user.settings);
                }

            } else if (mode === 'SIGNUP_COMPANY' || mode === 'SIGNUP_EMPLOYEE') {

                // Si es empresa y aún no se eligió plan, mostrar selección
                if (mode === 'SIGNUP_COMPANY' && !showPlanSelection) {
                    // Validar campos previos antes de pasar a plan
                    if (!name || !companyName || !email || !password || !phone || !language) {
                        setNotification("Por favor completa todos los datos antes de elegir plan.");
                        setLoading(false);
                        return;
                    }
                    setShowPlanSelection(true);
                    setLoading(false);
                    return;
                }

                // Validación final
                if (!name || !email || !password || !phone) {
                    setNotification("Por favor completa todos los campos obligatorios.");
                    setLoading(false);
                    return;
                }

                if (mode === 'SIGNUP_EMPLOYEE' && !invitationCode) {
                    setNotification("Necesitas un código de invitación para unirte.");
                    setLoading(false);
                    return;
                }

                // Validación Codigo Invitación
                if (mode === 'SIGNUP_EMPLOYEE' && invitationCode !== (import.meta.env.VITE_INVITATION_CODE || 'PACTO2026')) {
                    // Demo validation
                    if (invitationCode.length < 4) {
                        setNotification("Código de invitación inválido.");
                        setLoading(false);
                        return;
                    }
                }

                const finalCompanyName = mode === 'SIGNUP_COMPANY' ? companyName : undefined;
                const finalPlan = mode === 'SIGNUP_COMPANY' ? selectedPlanTier : undefined;

                const { user, error } = await authService.signUp(email, password, name, settings, finalCompanyName, phone, language || 'es-la', finalPlan);

                if (error) {
                    let msg = error;
                    if (error.includes("rate limit")) msg = "Límite de intentos seguridad excedido. Espera 1h.";
                    if (error.includes("already registered")) msg = "Este correo ya está registrado.";
                    setNotification(msg);
                } else if (user) {
                    onLogin(user.name, user.settings);
                }
            } else {
                // RECOVERY
                if (email) {
                    const { success, error } = await authService.resetPassword(email);
                    if (!success && error) {
                        let msg = error;
                        if (error.includes("rate limit")) msg = "Espera unos minutos antes de volver a intentarlo.";
                        setNotification(msg);
                    } else {
                        setNotification('¡Listo! Revisa tu email para restablecer la contraseña.');
                        setTimeout(() => setMode('LOGIN'), 3000);
                    }
                } else {
                    setNotification('Por favor, introduce tu correo electrónico.');
                }
            }
        } catch (error) {
            setNotification("Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    const isErrorCallback = (txt: string) => {
        if (txt.includes('¡Listo!')) return false;
        return true;
    };

    const getTitle = () => {
        if (showPlanSelection) return 'Elige tu Plan';
        if (mode === 'LOGIN') return 'Bienvenido de nuevo';
        if (mode === 'SIGNUP_COMPANY') return 'Registrar Empresa';
        if (mode === 'SIGNUP_EMPLOYEE') return 'Unirse a un Equipo';
        if (mode === 'RECOVERY') return 'Recuperar Cuenta';
    };

    return (
        <div className={`w-full ${showPlanSelection ? 'max-w-4xl' : 'max-w-lg'} mx-auto animate-fade-in my-10 transition-all duration-500`}>
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    {!showPlanSelection && (
                        <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary text-white mb-4 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-2xl">diversity_3</span>
                        </div>
                    )}
                    <h2 className="text-3xl font-black text-text-n900 tracking-tight">
                        {getTitle()}
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        {showPlanSelection && 'Selecciona el tamaño de tu organización para continuar.'}
                        {!showPlanSelection && mode === 'LOGIN' && 'Tu espacio de trabajo inclusivo te espera.'}
                        {!showPlanSelection && mode === 'SIGNUP_COMPANY' && 'Crea el entorno ideal para tu organización.'}
                        {!showPlanSelection && mode === 'SIGNUP_EMPLOYEE' && 'Usa tu invitación para colaborar.'}
                        {!showPlanSelection && mode === 'RECOVERY' && 'Ingresa tu correo para restablecer.'}
                    </p>
                </div>

                {notification && (
                    <div role="alert" aria-live="polite" className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 border ${isErrorCallback(notification) ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                        <span className="material-symbols-outlined text-lg">
                            {isErrorCallback(notification) ? 'error' : 'check_circle'}
                        </span>
                        {notification}
                    </div>
                )}

                {/* VISTA DE SELECCIÓN DE PLAN */}
                {showPlanSelection ? (
                    <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* SEMILLA */}
                            <button
                                type="button"
                                onClick={() => setSelectedPlanTier('SEED')}
                                className={`w-full text-left p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20 ${selectedPlanTier === 'SEED' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-gray-100 hover:border-primary/50'}`}
                            >
                                <div className="mb-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Semilla</span>
                                </div>
                                <h3 className="text-2xl font-black text-text-n900 mb-2">Gratis</h3>
                                <p className="text-gray-500 text-sm mb-6">Para startups y equipos pequeños.</p>
                                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Hasta 5 usuarios</li>
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Acuerdos ilimitados</li>
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Rituales básicos</li>
                                </ul>
                                <div className={`size-6 rounded-full border-2 ml-auto flex items-center justify-center ${selectedPlanTier === 'SEED' ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                                    {selectedPlanTier === 'SEED' && <span className="material-symbols-outlined text-sm">check</span>}
                                </div>
                            </button>

                            {/* CRECIMIENTO */}
                            <button
                                type="button"
                                onClick={() => setSelectedPlanTier('GROWTH')}
                                className={`w-full text-left p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary-s3/20 ${selectedPlanTier === 'GROWTH' ? 'border-secondary-s3 bg-secondary-s3/5 shadow-lg shadow-secondary-s3/10' : 'border-gray-100 hover:border-secondary-s3/50'}`}
                            >
                                <div className="mb-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-secondary-s3 bg-secondary-s3/10 px-2 py-1 rounded">Crecimiento</span>
                                </div>
                                <h3 className="text-2xl font-black text-text-n900 mb-2">6€ <span className="text-sm font-medium text-gray-400">/ usuario</span></h3>
                                <p className="text-gray-500 text-sm mb-6">Para PYMES en expansión.</p>
                                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Hasta 50 usuarios</li>
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Análisis de equipo</li>
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Soporte prioritario</li>
                                </ul>
                                <div className={`size-6 rounded-full border-2 ml-auto flex items-center justify-center ${selectedPlanTier === 'GROWTH' ? 'border-secondary-s3 bg-secondary-s3 text-white' : 'border-gray-300'}`}>
                                    {selectedPlanTier === 'GROWTH' && <span className="material-symbols-outlined text-sm">check</span>}
                                </div>
                            </button>

                            {/* CORPORATIVO */}
                            <button
                                type="button"
                                onClick={() => setSelectedPlanTier('ENTERPRISE')}
                                className={`w-full text-left p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 ${selectedPlanTier === 'ENTERPRISE' ? 'border-text-n900 bg-gray-50 shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <div className="mb-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-text-n900 bg-gray-200 px-2 py-1 rounded">Corporativo</span>
                                </div>
                                <h3 className="text-2xl font-black text-text-n900 mb-2">A medida</h3>
                                <p className="text-gray-500 text-sm mb-6">Grandes organizaciones (+50).</p>
                                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Usuarios ilimitados</li>
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> SSO & Auditoría</li>
                                    <li className="flex gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check</span> Gestor de cuenta</li>
                                </ul>
                                <div className={`size-6 rounded-full border-2 ml-auto flex items-center justify-center ${selectedPlanTier === 'ENTERPRISE' ? 'border-text-n900 bg-text-n900 text-white' : 'border-gray-300'}`}>
                                    {selectedPlanTier === 'ENTERPRISE' && <span className="material-symbols-outlined text-sm">check</span>}
                                </div>
                            </button>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowPlanSelection(false)}
                                className="px-6 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors"
                            >
                                Atrás
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                            >
                                {loading ? 'Procesando...' : (selectedPlanTier === 'ENTERPRISE' ? 'Solicitar Acceso' : 'Confirmar y Crear Cuenta')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Campos Específicos de Registro */}
                        {(mode === 'SIGNUP_COMPANY' || mode === 'SIGNUP_EMPLOYEE') && (
                            <>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-text-n900">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                        placeholder="Ej. Alex Rivera"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-text-n900">Teléfono</label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                            placeholder="+34 600..."
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {mode === 'SIGNUP_COMPANY' && (
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-text-n900">Nombre de la Organización</label>
                                <input
                                    type="text"
                                    required
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                    placeholder="Ej. Teamworkz Inc"
                                />
                            </div>
                        )}

                        {mode === 'SIGNUP_EMPLOYEE' && (
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-text-n900">Código de Invitación</label>
                                <input
                                    type="text"
                                    required
                                    value={invitationCode}
                                    onChange={(e) => setInvitationCode(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                    placeholder="Pega el código aquí"
                                />
                            </div>
                        )}

                        {/* Campos Comunes (Email/Pass) */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-text-n900">Correo Electrónico</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                placeholder="nombre@empresa.com"
                            />
                        </div>

                        {mode !== 'RECOVERY' && (
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="text-sm font-bold text-text-n900">Contraseña</label>
                                    {mode === 'LOGIN' && (
                                        <button
                                            type="button"
                                            onClick={() => setMode('RECOVERY')}
                                            className="text-xs font-bold text-primary hover:underline"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <span className="material-symbols-outlined">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Accesibilidad en Registro */}
                        {(mode === 'SIGNUP_COMPANY' || mode === 'SIGNUP_EMPLOYEE') && (
                            <fieldset className="p-5 border border-primary/20 rounded-xl bg-primary/5 mt-6 animate-fade-in">
                                <legend className="px-2 font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">accessibility_new</span>
                                    Configuración de Accesibilidad
                                </legend>

                                <div className="space-y-4 mt-2">
                                    <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-white rounded-lg transition-colors">
                                        <span className="flex flex-col">
                                            <span className="font-bold text-text-n900">Modo Bajo Estímulo</span>
                                            <span className="text-sm opacity-70">Reduce animaciones y distracciones.</span>
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={settings.low_stimulus}
                                            onChange={(e) => setSettings({ ...settings, low_stimulus: e.target.checked })}
                                            className="w-6 h-6 accent-primary cursor-pointer rounded focus:ring-primary"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between cursor-pointer group p-2 hover:bg-white rounded-lg transition-colors">
                                        <span className="flex flex-col">
                                            <span className="font-bold text-text-n900">Alto Contraste</span>
                                            <span className="text-sm opacity-70">Mejora la legibilidad de elementos.</span>
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={settings.high_contrast}
                                            onChange={(e) => setSettings({ ...settings, high_contrast: e.target.checked })}
                                            className="w-6 h-6 accent-primary cursor-pointer rounded focus:ring-primary"
                                        />
                                    </label>
                                </div>
                            </fieldset>
                        )}

                        {/* Botón Acción Principal */}
                        <div className="flex flex-col gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Procesando...' : (mode === 'LOGIN'
                                    ? 'Iniciar Sesión'
                                    : (mode === 'RECOVERY'
                                        ? 'Enviar Contraseña Provisional'
                                        : 'Siguiente: Elegir Plan'))}
                            </button>

                            {/* Opciones de Login */}
                            {mode === 'LOGIN' ? (
                                <>
                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-gray-200"></div>
                                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">¿Eres nuevo?</span>
                                        <div className="flex-grow border-t border-gray-200"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setMode('SIGNUP_EMPLOYEE'); setNotification(null); }}
                                            className="w-full bg-gray-50 border border-gray-200 text-text-n900 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex flex-col items-center justify-center p-4 gap-1"
                                        >
                                            <span className="material-symbols-outlined text-primary">badge</span>
                                            Soy Empleado
                                            <span className="text-[10px] font-normal text-gray-500">Tengo código de invitación</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setMode('SIGNUP_COMPANY'); setNotification(null); }}
                                            className="w-full bg-gray-50 border border-gray-200 text-text-n900 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex flex-col items-center justify-center p-4 gap-1"
                                        >
                                            <span className="material-symbols-outlined text-primary">business_center</span>
                                            Soy Empresa
                                            <span className="text-[10px] font-normal text-gray-500">Quiero administrar mi equipo</span>
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={onCancel}
                                        className="w-full bg-transparent text-gray-400 py-2 rounded-xl font-bold text-xs hover:text-text-n900 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                                    >
                                        Cancelar y volver a inicio
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode('LOGIN');
                                        setNotification(null);
                                    }}
                                    className="w-full bg-transparent text-gray-500 py-3 rounded-xl font-bold text-sm hover:text-text-n900 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    Volver al inicio de sesión
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </section>

            <div className="mt-8 text-center px-8">
                <p className="text-sm italic opacity-60">"De la intención a la práctica: Acuerdos vivos para equipos humanos."</p>
            </div>
        </div >
    );
};

export default Login;