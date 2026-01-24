
import React, { useState } from 'react';

interface RitualPreparationProps {
  onBack: () => void;
  onNext: () => void;
}

const RitualPreparation: React.FC<RitualPreparationProps> = ({ onBack, onNext }) => {
  const [agreements, setAgreements] = useState([
    { id: 1, title: 'Escucha Activa sin Juicios', desc: 'Escuchar para entender, no para responder. Permitir pausas.', checked: true },
    { id: 2, title: 'Cámaras Opcionales', desc: 'Respetar la necesidad de privacidad o regulación sensorial.', checked: true },
    { id: 3, title: 'Turnos de Palabra', desc: 'Levantar la mano (física o digital) para evitar interrupciones sonoras.', checked: true },
    { id: 4, title: 'Minutos de Aterrizaje', desc: 'Dedicar los primeros 5 minutos a llegar mentalmente.', checked: false },
  ]);

  const toggleAgreement = (id: number) => {
    setAgreements(prev => prev.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  };

  const selectAll = () => {
    setAgreements(prev => prev.map(a => ({ ...a, checked: true })));
  };

  return (
    <div className="bg-bg-s1 font-display text-text-n900 antialiased flex flex-col min-h-screen animate-fade-in">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 w-full bg-bg-s1/90 backdrop-blur-md border-b border-primary/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">diversity_3</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-primary">PACTO</h1>
                </div>
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">help</span>
                        <span className="hidden sm:block">Ayuda</span>
                    </button>
                </div>
            </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-grow flex flex-col items-center px-4 md:px-8 py-8 md:py-12">
            <div className="w-full max-w-6xl flex flex-col gap-8">
                
                {/* Wizard Stepper */}
                <nav aria-label="Progress" className="w-full max-w-3xl mx-auto mb-4">
                    <ol className="flex items-center w-full" role="list">
                        {/* Step 1: Active */}
                        <li className="flex-1">
                            <div className="group flex flex-col border-b-4 border-primary py-2 md:pl-4 transition-colors">
                                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Paso 1</span>
                                <span className="text-sm font-bold text-text-n900">Preparación</span>
                            </div>
                        </li>
                        {/* Step 2: Upcoming */}
                        <li className="flex-1">
                            <div className="group flex flex-col border-b-4 border-gray-200 py-2 md:pl-4 transition-colors">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Paso 2</span>
                                <span className="text-sm font-medium text-gray-500">Reflexión</span>
                            </div>
                        </li>
                        {/* Step 3: Upcoming */}
                        <li className="flex-1">
                            <div className="group flex flex-col border-b-4 border-gray-200 py-2 md:pl-4 transition-colors">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Paso 3</span>
                                <span className="text-sm font-medium text-gray-500">Compromiso</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Main Action Card (8 cols) */}
                    <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-transparent relative overflow-hidden">
                        {/* Decorative subtle accent */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/40 to-primary"></div>
                        
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <h2 className="text-3xl font-bold text-text-n900 leading-tight mb-2">Preparación de la Sesión</h2>
                                    <p className="text-gray-500 font-medium">Define el tono y los acuerdos previos</p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                    <span className="size-1.5 rounded-full bg-primary"></span>
                                    Sesión Replay
                                </span>
                            </div>
                        </div>

                        {/* Objective Box */}
                        <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                            <h3 className="text-sm font-bold text-text-n900 uppercase tracking-wide mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">target</span>
                                Objetivo de la sesión
                            </h3>
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                Esta sesión busca alinear al equipo revisando los acuerdos previos para asegurar un espacio de trabajo inclusivo y neurodivergente, donde la seguridad psicológica sea la prioridad.
                            </p>
                        </div>

                        {/* Agreement Selection Form */}
                        <form className="space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <h3 className="text-lg font-bold text-text-n900">Selecciona los Acuerdos Activos</h3>
                                <button 
                                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors" 
                                    type="button"
                                    onClick={selectAll}
                                >
                                    Seleccionar todos
                                </button>
                            </div>

                            {/* Checkbox List Grid */}
                            <div className="grid grid-cols-1 gap-4">
                                {agreements.map((agreement) => (
                                    <label 
                                        key={agreement.id}
                                        className={`group relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50 ${agreement.checked ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                                    >
                                        <div className="flex h-6 items-center">
                                            <input 
                                                checked={agreement.checked}
                                                onChange={() => toggleAgreement(agreement.id)}
                                                className="peer size-5 accent-primary rounded focus:ring-primary focus:ring-offset-2 cursor-pointer" 
                                                type="checkbox"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-base font-bold ${agreement.checked ? 'text-primary' : 'text-text-n900'}`}>{agreement.title}</span>
                                            <span className="text-sm text-gray-500 mt-1 font-medium">{agreement.desc}</span>
                                        </div>
                                        <div className={`absolute right-4 top-4 transition-opacity text-primary ${agreement.checked ? 'opacity-100' : 'opacity-0'}`}>
                                            <span className="material-symbols-outlined filled">check_circle</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-4">
                                <button 
                                    className="px-6 py-3.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition-colors" 
                                    type="button"
                                    onClick={onBack}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    className="px-8 py-3.5 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:brightness-110 focus:ring-4 focus:ring-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2" 
                                    type="button"
                                    onClick={onNext}
                                >
                                    Continuar a Reflexión
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Sidebar (4 cols) */}
                    <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
                        {/* Facilitation Tip Card */}
                        <div className="bg-[#EEF2FF] rounded-xl p-6 border border-blue-100 shadow-sm relative overflow-hidden group">
                            {/* Decorative circle */}
                            <div className="absolute -right-6 -top-6 size-24 bg-blue-200/50 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                            
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <span className="material-symbols-outlined filled text-[28px]">lightbulb</span>
                                    <h4 className="text-sm font-bold uppercase tracking-wider">Tip de Facilitación</h4>
                                </div>
                                <hr className="border-blue-200"/>
                                <p className="text-text-n900 text-base leading-relaxed font-medium">
                                    Sugerimos iniciar con <strong className="text-primary">5 minutos de silencio</strong> para permitir que todos procesen la información y lleguen mentalmente a la sesión.
                                </p>
                                <div className="mt-2 p-3 bg-white/60 rounded-lg flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">timer</span>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Temporizador sugerido</p>
                                        <button className="text-xs font-bold text-primary underline mt-1 hover:text-primary/80">Activar timer de 5 min</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Context */}
                        <div className="rounded-xl p-6 border border-dashed border-gray-300 flex flex-col gap-3 bg-white/50">
                            <div className="flex items-center gap-2 text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">info</span>
                                <span className="text-xs font-bold uppercase">Estado del equipo</span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                3 miembros han marcado "Necesito tiempo extra hoy". Considera extender la fase de preparación.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>

        {/* Footer Simple */}
        <footer className="mt-auto py-6 text-center text-sm text-gray-400 font-bold border-t border-primary/5">
            <p>© 2026 PACTO. Inclusion by Design.</p>
        </footer>
    </div>
  );
};

export default RitualPreparation;
