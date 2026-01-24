import React, { useState } from 'react';
import { AccessibilitySettings } from '../types';
import { authService } from '../services/authService';

interface LoginProps {
    onLogin: (name: string, settings: AccessibilitySettings) => void;
    onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP' | 'RECOVERY'>('LOGIN');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState(''); // Estado para nombre de empresa

    const [isOrgCreator, setIsOrgCreator] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'ENTERPRISE'>('FREE');
    const [notification, setNotification] = useState<string | null>(null);

    const [settings, setSettings] = useState<AccessibilitySettings>({
        id: 'temp',
        low_stimulus: false,
        dyslexia_font: false,
        high_contrast: false,
        comm_preference: 'Escrito'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotification(null); // Limpiar notificaciones previas

        if (mode === 'LOGIN') {
            const { user, error } = await authService.signIn(email, password);
            if (error) {
                // Traducción de errores comunes
                let msg = error;
                if (error === "Credenciales incorrectas") msg = "Correo o contraseña incorrectos.";
                if (error.includes("rate limit")) msg = "Has intentado demasiadas veces. Espera unos minutos.";
                setNotification(msg);
            } else if (user) {
                onLogin(user.name, user.settings);
            }

        } else if (mode === 'SIGNUP') {
            if (name) {
                // Pasamos companyName al registro
                const { user, error } = await authService.signUp(email, password, name, settings, companyName);
                if (error) {
                    let msg = error;
                    if (error.includes("rate limit")) msg = "Límite de intentos seguridad excedido. Espera 1h.";
                    if (error.includes("already registered")) msg = "Este correo ya está registrado.";
                    setNotification(msg);
                } else if (user) {
                    onLogin(user.name, user.settings);
                }
            }
        } else {
            // Recuperación Real
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
    };

    // Helper para determinar si es error (Rojo) o éxito (Verde)
    const isErrorCallback = (txt: string) => {
        if (txt.includes('¡Listo!')) return false;
        return true; // Por defecto es error (rojo) para evitar falsos positivos verdes
    };

    return (
        <div className="w-full max-w-md mx-auto animate-fade-in">
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary text-white mb-4 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-2xl">diversity_3</span>
                    </div>
                    <h2 className="text-3xl font-black text-text-n900 tracking-tight">
                        {mode === 'LOGIN' ? 'Bienvenido de nuevo' : (mode === 'SIGNUP' ? 'Únete a PACTO' : 'Recuperar Cuenta')}
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        {mode === 'LOGIN'
                            ? 'Tu espacio de trabajo inclusivo te espera.'
                            : (mode === 'SIGNUP' ? 'Crea acuerdos vivos para tu equipo.' : 'Ingresa tu correo para restablecer.')}
                    </p>
                </div>

                {notification && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 border ${isErrorCallback(notification) ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                        <span className="material-symbols-outlined text-lg">
                            {isErrorCallback(notification) ? 'error' : 'check_circle'}
                        </span>
                        {notification}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'SIGNUP' && (
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
                    )}

                    {mode === 'SIGNUP' && (
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-text-n900">
                                {isOrgCreator ? 'Nombre de tu Organización' : 'Empresa / Equipo al que te unes'}
                            </label>
                            <input
                                type="text"
                                required={isOrgCreator} // Obligatorio si crea la org, opcional si es miembro (aunque recomendable)
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                placeholder={isOrgCreator ? "Ej. Teamworkz Inc" : "Ej. Teamworkz (Opcional)"}
                            />
                        </div>
                    )}

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
                    {/* ... Resto del form sin cambios significativos ... usage of companyName above */}


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
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    {/* Settings (Login y Signup - Oculto en Recovery) */}
                    {(mode === 'LOGIN' || mode === 'SIGNUP') && (
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

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                        >
                            {mode === 'LOGIN'
                                ? 'Iniciar Sesión'
                                : (mode === 'SIGNUP'
                                    ? (isOrgCreator && selectedPlan === 'ENTERPRISE' ? 'Solicitar Presupuesto' : (isOrgCreator && selectedPlan !== 'FREE' ? 'Continuar' : 'Crear Perfil'))
                                    : 'Enviar Contraseña Provisional')}
                        </button>

                        {mode === 'LOGIN' ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => { setMode('SIGNUP'); setNotification(null); setIsOrgCreator(false); }}
                                    className="w-full bg-transparent text-gray-500 py-3 rounded-xl font-bold text-sm hover:text-text-n900 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    ¿No tienes cuenta? Unirse como Miembro
                                </button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Organizaciones</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => { setMode('SIGNUP'); setNotification(null); setIsOrgCreator(true); }}
                                    className="w-full bg-white border-2 border-primary/20 text-primary py-4 rounded-xl font-bold text-sm hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                                >
                                    <span className="material-symbols-outlined">domain_add</span>
                                    Crear Espacio de Trabajo (Empresa)
                                </button>

                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="w-full bg-transparent text-gray-400 py-2 rounded-xl font-bold text-xs hover:text-text-n900 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                                >
                                    Cancelar y salir
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    if (mode === 'SIGNUP') {
                                        onCancel();
                                    } else {
                                        setMode('LOGIN');
                                        setNotification(null);
                                    }
                                }}
                                className="w-full bg-transparent text-gray-500 py-3 rounded-xl font-bold text-sm hover:text-text-n900 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {mode === 'SIGNUP' ? (
                                    'Cancelar y salir'
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                                        Volver al inicio de sesión
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <div className="mt-8 text-center px-8">
                <p className="text-sm italic opacity-60">"De la intención a la práctica: Acuerdos vivos para equipos humanos."</p>
            </div>
        </div>
    );
};

export default Login;