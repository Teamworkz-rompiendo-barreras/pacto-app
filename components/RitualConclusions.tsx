
import React from 'react';

interface RitualConclusionsProps {
    onBack: () => void;
    onFinish: () => void;
}

const RitualConclusions: React.FC<RitualConclusionsProps> = ({ onBack, onFinish }) => {
    return (
        <div className="bg-[#F0E8D1] text-[#121316] font-display min-h-screen flex flex-col antialiased animate-fade-in">
            {/* Top Navigation */}


            <main className="flex-1 flex flex-col items-center w-full px-4 sm:px-6 py-8">
                <div className="w-full max-w-[960px] flex flex-col gap-8">

                    {/* Progress Bar Section */}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-6 justify-between items-end">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs font-bold">3</span>
                                <p className="text-primary text-sm font-bold uppercase tracking-wider">Conclusiones</p>
                            </div>
                            <p className="text-[#121316] text-sm font-bold">100%</p>
                        </div>
                        <div className="rounded-full bg-[#E6DCC3] h-2 w-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    {/* Header Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-2">
                        <div className="flex flex-col gap-3 max-w-2xl">
                            <h1 className="text-[#121316] text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight">
                                Conclusiones y <br /><span className="text-primary">Compromisos</span>
                            </h1>
                            <p className="text-[#4a4d5e] text-lg font-medium leading-relaxed max-w-lg">
                                Un espacio seguro para celebrar lo logrado y definir juntos los pasos para un futuro más inclusivo.
                            </p>
                        </div>
                        {/* Celebratory Icon */}
                        <div className="bg-white/50 p-6 rounded-full border border-white shadow-sm hidden md:flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-[#DBC384] animate-pulse">spa</span>
                        </div>
                    </div>

                    {/* Two Column Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card: Acuerdos Mantenidos */}
                        <section className="bg-[#FCF8ED] rounded-xl border border-white/60 shadow-[0_4px_20px_rgba(55,73,164,0.03)] overflow-hidden flex flex-col h-full">
                            <div className="p-6 border-b border-[#EBE3D0] bg-white/40 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-green-700">check_circle</span>
                                    <h3 className="text-lg font-bold text-[#121316]">Acuerdos Mantenidos</h3>
                                </div>
                                <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-md">3 Logrados</span>
                            </div>
                            <div className="p-6 flex flex-col gap-4 h-full">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px] text-green-600">
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                    </div>
                                    <div>
                                        <p className="text-[#121316] font-semibold text-base">Escucha activa en reuniones</p>
                                        <p className="text-[#6a6d81] text-sm mt-0.5">Se redujeron las interrupciones en un 40%.</p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-[#EBE3D0]"></div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px] text-green-600">
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                    </div>
                                    <div>
                                        <p className="text-[#121316] font-semibold text-base">Agenda enviada 24h antes</p>
                                        <p className="text-[#6a6d81] text-sm mt-0.5">Todos los participantes llegaron preparados.</p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-[#EBE3D0]"></div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px] text-green-600">
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                    </div>
                                    <div>
                                        <p className="text-[#121316] font-semibold text-base">Espacios de silencio</p>
                                        <p className="text-[#6a6d81] text-sm mt-0.5">Respetados después de preguntas complejas.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Card: Nuevos Compromisos */}
                        <section className="bg-white rounded-xl border-l-4 border-l-primary shadow-[0_4px_20px_rgba(55,73,164,0.05)] overflow-hidden flex flex-col h-full relative">
                            {/* Subtle background pattern */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <span className="material-symbols-outlined text-9xl text-primary">flag</span>
                            </div>
                            <div className="p-6 border-b border-[#f1f1f4] flex items-center justify-between bg-white relative z-10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">flag</span>
                                    <h3 className="text-lg font-bold text-[#121316]">Nuevos Compromisos</h3>
                                </div>
                                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">2 Metas</span>
                            </div>
                            <div className="p-6 flex flex-col gap-4 h-full relative z-10">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f8f9fc] border border-transparent hover:border-primary/20 transition-colors">
                                    <div className="mt-1 min-w-[20px] text-primary">
                                        <span className="material-symbols-outlined text-[20px]">arrow_circle_right</span>
                                    </div>
                                    <div>
                                        <p className="text-[#121316] font-bold text-base">Rotar el rol de facilitador</p>
                                        <p className="text-[#6a6d81] text-sm mt-0.5">Para fomentar el liderazgo compartido.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f8f9fc] border border-transparent hover:border-primary/20 transition-colors">
                                    <div className="mt-1 min-w-[20px] text-primary">
                                        <span className="material-symbols-outlined text-[20px]">arrow_circle_right</span>
                                    </div>
                                    <div>
                                        <p className="text-[#121316] font-bold text-base">Feedback asíncrono los viernes</p>
                                        <p className="text-[#6a6d81] text-sm mt-0.5">Reducir la presión de la respuesta inmediata.</p>
                                    </div>
                                </div>
                                <button className="mt-auto flex items-center justify-center gap-2 text-sm font-bold text-primary hover:text-primary/80 py-2 border-2 border-dashed border-primary/20 rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Añadir otro compromiso
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Replay Scheduler */}
                    <section className="w-full bg-[#EBE3D0]/30 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-[#DBC384]">
                        <div className="flex-1 flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-[#121316] flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#8a7a51]">update</span>
                                Próximo Replay
                            </h3>
                            <p className="text-[#4a4d5e] text-base">
                                Establecer una fecha para revisar el progreso ayuda a consolidar el hábito. Recomendamos dentro de 2 semanas.
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex flex-col gap-2 min-w-[300px]">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#6a6d81]" htmlFor="date-replay">Fecha Sugerida</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-primary group-focus-within:text-primary">event</span>
                                </div>
                                <input
                                    id="date-replay"
                                    name="date-replay"
                                    type="date"
                                    defaultValue="2023-11-15"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm font-bold shadow-sm"
                                />
                            </div>
                            <p className="text-xs text-[#6a6d81] text-right mt-1">Se enviará una invitación al calendario del equipo.</p>
                        </div>
                    </section>

                    {/* Action Footer */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-6 border-t border-[#E6DCC3] gap-4">
                        <button
                            onClick={onBack}
                            className="text-[#6a6d81] hover:text-[#121316] font-bold text-sm px-4 py-2 flex items-center gap-2 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Revisar pasos anteriores
                        </button>
                        <button
                            onClick={onFinish}
                            className="w-full sm:w-auto bg-primary hover:brightness-110 text-white text-base font-bold px-8 py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                        >
                            <span className="material-symbols-outlined">celebration</span>
                            Finalizar Ritual y Notificar al Equipo
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer decoration */}
            <div className="w-full flex justify-center py-6 opacity-40">
                <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#8a7a51]"></div>
                    <div className="h-1 w-1 rounded-full bg-[#8a7a51]"></div>
                    <div className="h-1 w-1 rounded-full bg-[#8a7a51]"></div>
                </div>
            </div>
        </div>
    );
};

export default RitualConclusions;
