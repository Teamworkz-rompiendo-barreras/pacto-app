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
    const [showPassword, setShowPassword] = useState(false);

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

    const [loading, setLoading] = useState(false);

    // ...

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNotification(null); // Limpiar notificaciones previas
        setLoading(true); // START LOADING

        try {
            if (mode === 'LOGIN') {
                const { user, error } = await authService.signIn(email, password);
                if (error) {
                    // Traducción de errores comunes
                    let msg = error;
                    if (error === "Credenciales incorrectas") msg = "Correo o contraseña incorrectos.";
                    if (error.includes("rate limit")) msg = "Has intentado demasiadas veces. Espera unos minutos.";
                    if (error.includes("Email not confirmed")) msg = "Debes confirmar tu correo electrónico antes de entrar.";
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
        } catch (error) {
            setNotification("Ocurrió un error inesperado.");
        } finally {
            setLoading(false); // END LOADING
        }
    };

    // ...

    <div className="flex flex-col gap-3 pt-4">
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Procesando...' : (mode === 'LOGIN'
                ? 'Iniciar Sesión'
                : (mode === 'SIGNUP'
                    ? (isOrgCreator && selectedPlan === 'ENTERPRISE' ? 'Solicitar Presupuesto' : (isOrgCreator && selectedPlan !== 'FREE' ? 'Continuar' : 'Crear Perfil'))
                    : 'Enviar Contraseña Provisional'))}
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
                </form >
            </section >

    <div className="mt-8 text-center px-8">
        <p className="text-sm italic opacity-60">"De la intención a la práctica: Acuerdos vivos para equipos humanos."</p>
    </div>
        </div >
    );
};

export default Login;