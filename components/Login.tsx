
import React, { useState } from 'react';
import { AccessibilitySettings, UserProfile } from '../types';
import { authService } from '../services/authService';
import { useLanguage } from '../LanguageContext';

interface LoginProps {
    onLogin: (user: UserProfile) => void;
    onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP_COMPANY' | 'SIGNUP_EMPLOYEE' | 'RECOVERY'>('LOGIN');
    const { t } = useLanguage();

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [phone, setPhone] = useState('');
    const { language = 'es-la' } = useLanguage();

    // Pricing States
    const [selectedPlanTier, setSelectedPlanTier] = useState<'SEED' | 'GROWTH' | 'ENTERPRISE'>('SEED');
    const [showPlanSelection, setShowPlanSelection] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const [settings, setSettings] = useState<AccessibilitySettings>({
        id: 'temp',
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
                    setNotification(msg);
                } else if (user) {
                    onLogin(user);
                }
            } else if (mode === 'SIGNUP_COMPANY' || mode === 'SIGNUP_EMPLOYEE') {
                if (mode === 'SIGNUP_COMPANY' && !showPlanSelection) {
                    if (!name || !companyName || !email || !password || !phone) {
                        setNotification("Completa todos los datos para continuar.");
                        setLoading(false);
                        return;
                    }
                    setShowPlanSelection(true);
                    setLoading(false);
                    return;
                }

                const { user, error } = await authService.signUp(email, password, name, settings, mode === 'SIGNUP_COMPANY' ? companyName : undefined, phone, language || 'es-la', mode === 'SIGNUP_COMPANY' ? selectedPlanTier : undefined);
                if (error) setNotification(error);
                else if (user) onLogin(user);
            } else {
                if (email) {
                    const { success, error } = await authService.resetPassword(email);
                    if (!success && error) setNotification(error);
                    else {
                        setNotification('¡Listo! Revisa tu email.');
                        setTimeout(() => setMode('LOGIN'), 3000);
                    }
                }
            }
        } catch (error) {
            setNotification("Error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        if (showPlanSelection) return 'Selecciona tu Plan';
        if (mode === 'LOGIN') return 'Entrada';
        if (mode === 'SIGNUP_COMPANY') return 'Regístrate';
        if (mode === 'SIGNUP_EMPLOYEE') return 'Únete';
        return 'Recuperar';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed top-[-10%] right-[-10%] size-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="fixed bottom-[-10%] left-[-10%] size-[500px] bg-p1/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

            <main className={`w-full ${showPlanSelection ? 'max-w-5xl' : 'max-w-lg'} relative z-10 animate-fade-in`}>
                <section className="bg-white/70 backdrop-blur-2xl rounded-[48px] p-10 md:p-16 border border-white/40 shadow-2xl shadow-primary/10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center size-20 rounded-3xl bg-gradient-to-br from-primary to-secondary-s3 text-white mb-8 shadow-2xl shadow-primary/30 rotate-3">
                            <span className="material-symbols-outlined text-4xl font-black">lock_open</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-text-n900 tracking-tight uppercase leading-none mb-4">
                            {getTitle()}
                        </h2>
                        <p className="text-gray-400 font-bold text-lg italic">
                            {mode === 'LOGIN' ? 'Entra a tu cultura de acuerdos.' : 'Comienza tu viaje hacia la inclusión.'}
                        </p>
                    </div>

                    {notification && (
                        <div className="mb-10 p-6 rounded-2xl bg-red-50 text-red-600 border border-red-100 font-black text-sm flex items-center gap-4 animate-shake">
                            <span className="material-symbols-outlined">warning</span>
                            {notification}
                        </div>
                    )}

                    {showPlanSelection ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-scale-in">
                            {[
                                { tier: 'SEED', name: 'Semilla', price: 'Gratis', desc: 'Equipos < 5', color: 'border-primary' },
                                { tier: 'GROWTH', name: 'Crecimiento', price: '6€', desc: 'PYMES < 50', color: 'border-secondary-s3' },
                                { tier: 'ENTERPRISE', name: 'Corporativo', price: 'Custom', desc: 'Grandes orgs', color: 'border-text-n900' }
                            ].map((plan) => (
                                <button
                                    key={plan.tier}
                                    onClick={() => setSelectedPlanTier(plan.tier as any)}
                                    className={`relative p-8 rounded-[32px] border-4 text-left transition-all duration-300 group hover:translate-y-[-4px] ${selectedPlanTier === plan.tier ? `${plan.color} bg-white shadow-2xl` : 'border-transparent bg-gray-50/50 grayscale opacity-60'}`}
                                >
                                    <h3 className="font-display text-2xl font-black text-text-n900 uppercase mb-1">{plan.name}</h3>
                                    <p className="text-4xl font-black text-text-n900 mb-4 tracking-tighter">{plan.price}</p>
                                    <p className="text-sm font-bold text-gray-400 mb-8">{plan.desc}</p>
                                    <div className={`size-8 rounded-full border-4 flex items-center justify-center transition-colors ${selectedPlanTier === plan.tier ? 'bg-primary border-primary text-white' : 'border-gray-200'}`}>
                                        {selectedPlanTier === plan.tier && <span className="material-symbols-outlined text-xs">check</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {mode !== 'LOGIN' && mode !== 'RECOVERY' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Nombre</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner" placeholder="Tu nombre" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Teléfono</label>
                                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner" placeholder="+34..." />
                                    </div>
                                </div>
                            )}

                            {mode === 'SIGNUP_COMPANY' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Organización</label>
                                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner" placeholder="Nombre de tu empresa" />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Email Profesional</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner" placeholder="hola@pacto.dev" />
                            </div>

                            {mode !== 'RECOVERY' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between px-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contraseña</label>
                                        {mode === 'LOGIN' && <button type="button" onClick={() => setMode('RECOVERY')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Recuperar</button>}
                                    </div>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 font-bold outline-none transition-all shadow-inner" placeholder="••••••••" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors"><span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span></button>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 space-y-6">
                                <button type="submit" disabled={loading} className="w-full bg-gradient-to-br from-primary to-secondary-s3 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                    {loading ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span>{mode === 'LOGIN' ? 'Entrar ahora' : 'Siguiente Paso'}</span>}
                                </button>

                                <div className="flex items-center justify-center gap-6">
                                    {mode === 'LOGIN' ? (
                                        <>
                                            <button type="button" onClick={() => setMode('SIGNUP_EMPLOYEE')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">Soy Empleado</button>
                                            <div className="size-1 rounded-full bg-gray-200"></div>
                                            <button type="button" onClick={() => setMode('SIGNUP_COMPANY')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">Soy Empresa</button>
                                        </>
                                    ) : (
                                        <button type="button" onClick={() => setMode('LOGIN')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                                            Volver al Login
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                </section>

                <div className="text-center mt-12 px-10">
                    <p className="text-sm font-bold text-text-n900/30 italic">
                        &ldquo;Diseñado para la neuroinclusión, construido para la excelencia.&rdquo;
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;