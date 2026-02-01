
import React from 'react';

interface PactUpdateNotificationProps {
    userName: string;
    onClose: () => void;
}

const PactUpdateNotification: React.FC<PactUpdateNotificationProps> = ({ userName, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-text-n900/60 backdrop-blur-sm" onClick={onClose}></div>

            {/* Email Container */}
            <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-[32px] overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header: Logo P1 over background P2 */}
                <header className="bg-primary p-8 flex items-center justify-center relative overflow-hidden shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] size-40 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] size-40 bg-p1 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="size-12 bg-p1 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
                            <span className="material-symbols-outlined text-primary text-3xl font-black">handshake</span>
                        </div>
                        <span className="font-display text-2xl font-black text-p1 uppercase tracking-tighter">PACTO</span>
                    </div>
                </header>

                {/* Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 font-sans text-text-n900 leading-[1.5]">

                    {/* Subject Line simulation */}
                    <div className="mb-10 pb-6 border-b border-black/5">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">Asunto:</span>
                        <h1 className="text-xl md:text-2xl font-black text-text-n900 tracking-tight">
                            🔄 Hemos actualizado nuestro PACTO de equipo
                        </h1>
                    </div>

                    <p className="text-lg font-bold mb-8">
                        Hola <span className="text-primary">{userName}</span>,
                    </p>

                    <p className="text-lg font-medium text-gray-600 mb-10">
                        Tras nuestro reciente Ritual de Replay, hemos ajustado nuestros acuerdos operativos para seguir rompiendo barreras y mejorar nuestra colaboración diaria.
                    </p>

                    {/* What changed section */}
                    <section className="space-y-8 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-black/5"></div>
                            <h2 className="font-display text-sm font-black uppercase tracking-[0.3em] text-primary shrink-0">📍 ¿Qué ha cambiado?</h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-black/5"></div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-6 items-start">
                                <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                                    <span className="material-symbols-outlined text-xl font-black">forum</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-wider mb-1">Comunicación</h3>
                                    <p className="text-gray-500 font-medium">Se ha modificado la norma de hilos en Slack para reducir la sobrecarga de notificaciones.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                                    <span className="material-symbols-outlined text-xl font-black">lightbulb</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-wider mb-1">Claridad</h3>
                                    <p className="text-gray-500 font-medium">Se han actualizado las etiquetas de urgencia en el Canvas de acuerdos vivos.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10 shadow-sm">
                                    <span className="material-symbols-outlined text-xl font-black">verified_user</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-wider mb-1">Respeto</h3>
                                    <p className="text-gray-500 font-medium">Se ha añadido un nuevo horario de máxima concentración (Deep Work) solicitado durante la sesión.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Next steps section */}
                    <section className="space-y-8 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-black/5"></div>
                            <h2 className="font-display text-sm font-black uppercase tracking-[0.3em] text-p1 shrink-0">🛠️ Próximos pasos</h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-black/5"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-6 bg-gray-50/50 rounded-2xl border border-black/5 hover:border-black/10 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-3 block">dashboard</span>
                                <p className="text-xs font-bold leading-relaxed">Revisa el PACTO actualizado en el Dashboard.</p>
                            </div>
                            <div className="p-6 bg-gray-50/50 rounded-2xl border border-black/5 hover:border-black/10 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-3 block">style</span>
                                <p className="text-xs font-bold leading-relaxed">Consulta las Clarity Cards actualizadas.</p>
                            </div>
                            <div className="p-6 bg-gray-50/50 rounded-2xl border border-black/5 hover:border-black/10 transition-colors">
                                <span className="material-symbols-outlined text-primary mb-3 block">download</span>
                                <p className="text-xs font-bold leading-relaxed">Descarga tu copia en PDF para tenerla a mano.</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Button */}
                    <div className="text-center mb-12">
                        <button className="bg-primary text-white font-black text-xs uppercase tracking-[0.3em] px-12 py-6 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                            Acceder a mi PACTO
                        </button>
                    </div>

                    {/* Quote */}
                    <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10 text-center italic relative overflow-hidden">
                        <span className="material-symbols-outlined absolute top-4 left-4 text-4xl text-primary/10 font-black">format_quote</span>
                        <p className="text-lg font-bold text-primary/80 relative z-10 leading-relaxed">
                            "Convertimos la neurodiversidad en ventaja competitiva a través de acuerdos claros y medibles".
                        </p>
                    </div>
                </div>

                {/* Footer simple (accessibility) */}
                <footer className="bg-gray-50 p-6 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">© 2026 Teamworkz PACTO</span>
                    <button onClick={onClose} className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline px-4 py-2 bg-white rounded-lg border border-black/5">
                        Versión solo texto
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PactUpdateNotification;
