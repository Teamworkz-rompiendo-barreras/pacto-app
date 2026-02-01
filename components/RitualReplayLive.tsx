import React, { useState } from 'react';
import { Agreement, UserProfile } from '../types';
import { PageContainer } from './common/PageContainer';
import PactUpdateNotification from './PactUpdateNotification';

interface RitualReplayLiveProps {
    agreements: Agreement[];
    teamMembers: UserProfile[];
    onFinish: (updatedAgreements: Agreement[]) => void;
    onBack: () => void;
}

const RitualReplayLive: React.FC<RitualReplayLiveProps> = ({ agreements, teamMembers, onFinish, onBack }) => {
    const [step, setStep] = useState(1);
    const [showNotification, setShowNotification] = useState(false);
    const [clarityRating, setClarityRating] = useState<number | null>(null);
    const [auditResults, setAuditResults] = useState<Record<string, 'green' | 'amber' | 'red' | null>>(() => {
        const initial: Record<string, 'green' | 'amber' | 'red' | null> = {};
        agreements.forEach(a => initial[a.id] = null);
        return initial;
    });

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleConfirmPact = () => {
        setShowNotification(true);
    };

    const handleFinalize = () => {
        onFinish(agreements);
    };

    return (
        <PageContainer>
            <div className="max-w-5xl mx-auto w-full animate-fade-in pb-32">
                {/* Wizard Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-s3/10 text-secondary-s3 text-[10px] font-black uppercase tracking-widest mb-4">
                            <span className="material-symbols-outlined text-xs">replay</span>
                            Ritual de Replay
                        </div>
                        <h2 className="font-display text-4xl font-black text-text-n900 tracking-tight uppercase leading-none">Sincronización de Equipo</h2>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-secondary-s3' : 'bg-gray-100'}`}></div>
                        ))}
                    </div>
                </div>

                {/* STEP 1: CHECK-IN */}
                {step === 1 && (
                    <div className="space-y-12 animate-scale-in">
                        <section className="bg-white/70 backdrop-blur-md rounded-[48px] p-12 md:p-16 border border-white/60 shadow-xl shadow-primary/5 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-64 bg-secondary-s3/5 rounded-bl-full pointer-events-none"></div>

                            <div className="size-24 bg-white shadow-2xl rounded-[32px] flex items-center justify-center text-secondary-s3 mx-auto mb-10 rotate-3">
                                <span className="material-symbols-outlined text-5xl font-black">shield_with_heart</span>
                            </div>

                            <h3 className="font-display text-3xl font-black text-text-n900 uppercase tracking-tight mb-6">Apertura: Seguridad Psicológica</h3>
                            <p className="text-gray-400 font-bold text-xl leading-relaxed italic max-w-2xl mx-auto mb-12">
                                &ldquo;Este es un espacio valiente. Aquí los valores de Respeto y Claridad de Teamworkz son nuestra brújula.&rdquo;
                            </p>

                            <div className="space-y-10">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-text-n900">Pregunta de Apertura</label>
                                <p className="text-2xl font-black text-primary tracking-tight">¿Cuánta claridad has sentido en las prioridades de este mes?</p>

                                <div className="flex justify-center gap-4">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => setClarityRating(val)}
                                            className={`size-16 rounded-2xl font-black text-2xl transition-all ${clarityRating === val ? 'bg-primary text-white scale-110 shadow-xl shadow-primary/30' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between max-w-sm mx-auto text-[10px] font-black uppercase text-gray-300 tracking-widest pt-4">
                                    <span>Poca Claridad</span>
                                    <span>Claridad Total</span>
                                </div>
                            </div>
                        </section>

                        <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[40px] flex items-center gap-6 text-indigo-900 shadow-sm border-l-8 border-l-indigo-500">
                            <span className="material-symbols-outlined text-3xl font-black">timer</span>
                            <p className="font-bold text-lg leading-tight">Sugerencia: Dedica los primeros 5 minutos a que todos lleguen mentalmente. No corras.</p>
                        </div>
                    </div>
                )}

                {/* STEP 2: CLARITY CARDS */}
                {step === 2 && (
                    <div className="space-y-12 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-8">
                                <section className="bg-white/70 backdrop-blur-md rounded-[48px] p-12 border border-white/60 shadow-xl shadow-primary/5 space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="font-display text-3xl font-black text-text-n900 uppercase tracking-tight leading-none">Revisión de Clarity Cards</h3>
                                        <p className="text-gray-400 font-bold text-lg italic">&ldquo;Validemos si las necesidades individuales han cambiado.&rdquo;</p>
                                    </div>

                                    <div className="p-8 bg-gray-50/50 rounded-[32px] border border-black/5 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center">
                                                <span className="material-symbols-outlined font-black">visibility</span>
                                            </div>
                                            <p className="font-black text-text-n900 uppercase text-xs tracking-widest">Acción de Equipo</p>
                                        </div>
                                        <p className="text-gray-600 font-bold text-lg leading-relaxed">Cada miembro debe abrir su perfil de PACTO y revisar sus <span className="text-primary">Instrucciones de Uso</span>. ¿Algo ya no encaja?</p>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Debate de Grupo</label>
                                        <p className="text-2xl font-black text-text-n900 tracking-tight">¿Hay algo nuevo en tu forma de trabajar o comunicarte que el equipo deba saber para apoyarte mejor?</p>
                                        <textarea
                                            className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[24px] px-8 py-6 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none h-40"
                                            placeholder="Anota aquí cualquier cambio importante que el equipo mencione..."
                                        />
                                    </div>
                                </section>
                            </div>

                            <aside className="lg:col-span-4 space-y-8">
                                <div className="bg-primary text-white p-10 rounded-[40px] shadow-2xl shadow-primary/20">
                                    <h4 className="font-display text-xl font-black uppercase mb-6">Participantes</h4>
                                    <div className="space-y-4">
                                        {teamMembers.map((m, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 group hover:bg-white/20 transition-all">
                                                <div className="size-10 rounded-xl bg-white text-primary flex items-center justify-center font-black uppercase tracking-tighter">{m.name.charAt(0)}</div>
                                                <span className="font-bold text-sm tracking-tight">{m.name}</span>
                                                <div className="ml-auto size-2 rounded-full bg-green-400 animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                )}

                {/* STEP 3: AUDITORÍA DEL PACTO */}
                {step === 3 && (
                    <div className="space-y-12 animate-fade-in">
                        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
                            <h3 className="font-display text-4xl font-black uppercase text-text-n900 tracking-tight">Auditoría del PACTO</h3>
                            <p className="text-gray-400 font-bold text-xl italic leading-relaxed">&ldquo;¿Son nuestros acuerdos operativos efectivos o son solo ruido?&rdquo;</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-green-500/5 p-10 rounded-[40px] border border-green-500/20 space-y-6 group hover:bg-green-500/10 transition-all">
                                <div className="size-16 rounded-[24px] bg-green-500 text-white flex items-center justify-center shadow-xl shadow-green-500/20 group-hover:rotate-12 transition-transform">
                                    <span className="material-symbols-outlined text-4xl font-black">check_circle</span>
                                </div>
                                <h4 className="font-display text-2xl font-black text-green-700 uppercase tracking-tight">Verde</h4>
                                <p className="text-green-900/60 font-bold leading-relaxed">¿Qué acuerdo estamos cumpliendo bien y nos da tranquilidad?</p>
                            </div>

                            <div className="bg-amber-500/5 p-10 rounded-[40px] border border-amber-500/20 space-y-6 group hover:bg-amber-500/10 transition-all">
                                <div className="size-16 rounded-[24px] bg-amber-500 text-white flex items-center justify-center shadow-xl shadow-amber-500/20 group-hover:rotate-12 transition-transform">
                                    <span className="material-symbols-outlined text-4xl font-black">warning</span>
                                </div>
                                <h4 className="font-display text-2xl font-black text-amber-700 uppercase tracking-tight">Ámbar</h4>
                                <p className="text-amber-900/60 font-bold leading-relaxed">¿Qué norma de comunicación genera fricción o confusión?</p>
                            </div>

                            <div className="bg-rose-500/5 p-10 rounded-[40px] border border-rose-500/20 space-y-6 group hover:bg-rose-500/10 transition-all">
                                <div className="size-16 rounded-[24px] bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-500/20 group-hover:rotate-12 transition-transform">
                                    <span className="material-symbols-outlined text-4xl font-black">cancel</span>
                                </div>
                                <h4 className="font-display text-2xl font-black text-rose-700 uppercase tracking-tight">Rojo</h4>
                                <p className="text-rose-900/60 font-bold leading-relaxed">¿Qué acuerdo estamos ignorando por completo y debemos eliminar?</p>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-md rounded-[48px] p-12 border border-white/60 shadow-xl mt-12 overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-black/5">
                                        <th className="pb-8 text-[10px] font-black uppercase text-gray-300 tracking-[0.3em]">Acuerdo Actual</th>
                                        <th className="pb-8 text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] text-center">Estado del Semáforo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {agreements.map(a => (
                                        <tr key={a.id} className="group">
                                            <td className="py-8">
                                                <p className="font-black text-text-n900 text-lg uppercase tracking-tight">{a.title}</p>
                                                <p className="text-sm font-bold text-gray-400 mt-1">{a.category}</p>
                                            </td>
                                            <td className="py-8">
                                                <div className="flex justify-center gap-6">
                                                    {['green', 'amber', 'red'].map(color => (
                                                        <button
                                                            key={color}
                                                            onClick={() => setAuditResults(prev => ({ ...prev, [a.id]: color as any }))}
                                                            className={`size-10 rounded-full transition-all border-4 ${auditResults[a.id] === color
                                                                ? (color === 'green' ? 'bg-green-500 border-green-200 scale-125 shadow-lg shadow-green-200' : (color === 'amber' ? 'bg-amber-500 border-amber-200 scale-125 shadow-lg shadow-amber-200' : 'bg-rose-500 border-rose-200 scale-125 shadow-lg shadow-rose-200'))
                                                                : 'bg-gray-100 border-transparent opacity-20 hover:opacity-100'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* STEP 4: ADJUST & CLOSE */}
                {step === 4 && (
                    <div className="space-y-12 animate-fade-in pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-8">
                                <section className="bg-white/70 backdrop-blur-md rounded-[48px] p-12 border border-white/60 shadow-xl shadow-primary/5 space-y-10">
                                    <div className="space-y-4 text-center">
                                        <h3 className="font-display text-3xl font-black text-text-n900 uppercase tracking-tight leading-none">Canvas de Acuerdos Vivos</h3>
                                        <p className="text-gray-400 font-bold text-lg italic">&ldquo;Edita el pacto según el consenso del equipo.&rdquo;</p>
                                    </div>

                                    <div className="space-y-6">
                                        {agreements.map((a) => (
                                            <div key={a.id} className="p-8 rounded-[32px] bg-gray-50/50 border border-black/5 hover:bg-white hover:shadow-xl transition-all group">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">{a.category}</span>
                                                    <div className={`size-3 rounded-full ${auditResults[a.id] === 'red' ? 'bg-rose-500 shadow-lg shadow-rose-200' : (auditResults[a.id] === 'amber' ? 'bg-amber-500 shadow-lg shadow-amber-200' : 'bg-green-500 shadow-lg shadow-green-200')}`}></div>
                                                </div>
                                                <input
                                                    type="text"
                                                    defaultValue={a.title}
                                                    className="w-full bg-transparent font-display text-2xl font-black text-text-n900 uppercase tracking-tight outline-none border-b-2 border-transparent focus:border-primary/20 mb-2"
                                                />
                                                <textarea
                                                    defaultValue={a.description}
                                                    className="w-full bg-transparent font-bold text-gray-400 outline-none border-none resize-none h-20"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <aside className="lg:col-span-4 space-y-8">
                                <section className="bg-text-n900 text-white rounded-[40px] p-10 shadow-2xl space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 size-32 bg-primary/20 rounded-bl-full"></div>
                                    <div className="size-16 rounded-[24px] bg-white/10 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-3xl font-black">send</span>
                                    </div>
                                    <h4 className="font-display text-2xl font-black uppercase tracking-tight leading-none">Compromiso Renovado</h4>
                                    <p className="text-white/40 font-bold leading-relaxed italic">Al finalizar, el sistema enviará el PACTO actualizado a todo el equipo automáticamente.</p>

                                    <button
                                        onClick={handleConfirmPact}
                                        className="w-full py-8 bg-secondary-s3 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-secondary-s3/20 flex items-center justify-center gap-3"
                                    >
                                        Confirmamos el nuevo PACTO
                                        <span className="material-symbols-outlined">rocket_launch</span>
                                    </button>
                                </section>
                            </aside>
                        </div>
                    </div>
                )}

                {/* Notification Preview Modal */}
                {showNotification && (
                    <PactUpdateNotification
                        userName={teamMembers[0]?.name || 'Equipo'}
                        onClose={handleFinalize}
                    />
                )}

                {/* Wizard Footer Nav */}
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="bg-white/80 backdrop-blur-md px-10 py-5 rounded-[24px] border border-black/5 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-text-n900 transition-all flex items-center gap-3"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Anterior
                        </button>
                    )}
                    {step < 4 && (
                        <button
                            onClick={nextStep}
                            className="bg-secondary-s3 text-white px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-secondary-s3/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                        >
                            Siguiente Paso
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default RitualReplayLive;
