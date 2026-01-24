
import React, { useState } from 'react';

interface RitualReminderProps {
  onJoin: () => void;
  onSnooze: () => void;
}

const RitualReminder: React.FC<RitualReminderProps> = ({ onJoin, onSnooze }) => {
  const [calmMode, setCalmMode] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] bg-[#14161e]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-display">
        {/* Background decorative image simulating depth */}
        <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <main className="w-full max-w-[900px] bg-[#F0E8D1] rounded-2xl shadow-[0_20px_40px_-4px_rgba(60,59,55,0.15)] relative overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Decorative Side (Optional visual anchor or just padding wrapper) */}
            <div className="flex-1 flex flex-col p-8 md:p-12 h-full">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#3C3B37] text-3xl md:text-[32px] font-bold tracking-tight leading-tight">
                            Próximo Ritual: Replay Semanal
                        </h1>
                        <div className="flex items-center gap-2 text-[#5C5B55]">
                            <span className="material-symbols-outlined text-lg filled">timer</span>
                            <p className="text-lg font-medium">Comienza en 15 minutos</p>
                        </div>
                    </div>
                    
                    {/* Calm Mode Toggle */}
                    <div className={`flex items-center gap-3 bg-[#E6DEC5]/60 pl-4 pr-2 py-2 rounded-full border border-[#3C3B37]/5 transition-colors ${calmMode ? 'bg-[#374ba4]/10 border-[#374ba4]/20' : ''}`}>
                        <span className={`material-symbols-outlined ${calmMode ? 'text-primary' : 'text-[#3C3B37]'}`}>self_improvement</span>
                        <span className={`font-medium text-sm mr-2 ${calmMode ? 'text-primary' : 'text-[#3C3B37]'}`}>Modo Calma</span>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={calmMode}
                                onChange={(e) => setCalmMode(e.target.checked)}
                            />
                            <div className="w-12 h-7 bg-[#cfc8b0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                        </label>
                    </div>
                </header>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
                    
                    {/* Card 1: Qué esperar (Agenda) */}
                    <section className="bg-[#F8F5EE] rounded-xl p-6 shadow-[0_4px_20px_-2px_rgba(60,59,55,0.1)] flex flex-col h-full border border-[#3C3B37]/5">
                        <div className="flex items-center gap-2 mb-6 border-b border-[#3C3B37]/10 pb-4">
                            <span className="material-symbols-outlined text-primary">list_alt</span>
                            <h2 className="text-[#3C3B37] text-xl font-bold">Qué esperar</h2>
                        </div>
                        <ul className={`flex flex-col gap-5 flex-1 justify-center transition-opacity duration-500 ${calmMode ? 'opacity-70' : 'opacity-100'}`}>
                            <li className="flex items-start gap-3 group">
                                <div className="mt-1 text-primary/70 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#3C3B37] text-lg leading-snug font-medium">Revisión de logros</span>
                                    <span className="text-[#5C5B55] text-sm font-normal">(5 min)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="mt-1 text-primary/70 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#3C3B37] text-lg leading-snug font-medium">Bloqueos y soluciones</span>
                                    <span className="text-[#5C5B55] text-sm font-normal">(10 min)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="mt-1 text-primary/70 group-hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#3C3B37] text-lg leading-snug font-medium">Planificación siguiente semana</span>
                                    <span className="text-[#5C5B55] text-sm font-normal">(10 min)</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Card 2: Preparación sugerida (Actionable) */}
                    <section className="bg-[#F8F5EE] rounded-xl p-6 shadow-[0_4px_20px_-2px_rgba(60,59,55,0.1)] flex flex-col h-full border border-[#3C3B37]/5">
                        <div className="flex items-center gap-2 mb-6 border-b border-[#3C3B37]/10 pb-4">
                            <span className="material-symbols-outlined text-primary">psychology</span>
                            <h2 className="text-[#3C3B37] text-xl font-bold">Preparación sugerida</h2>
                        </div>
                        <div className="flex flex-col gap-4 flex-1">
                            {/* Tip 1 */}
                            <div className="bg-[#F0E8D1]/50 p-4 rounded-xl border border-[#3C3B37]/5 hover:border-primary/20 transition-colors flex items-start gap-4 cursor-pointer group">
                                <div className="bg-white p-2.5 rounded-lg text-primary shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined">sticky_note_2</span>
                                </div>
                                <div>
                                    <p className="text-[#3C3B37] font-bold text-base mb-1">Ten a mano tus notas</p>
                                    <p className="text-[#5C5B55] text-sm leading-relaxed">Revisa brevemente lo que anotaste durante la semana.</p>
                                </div>
                            </div>
                            {/* Tip 2 */}
                            <div className="bg-[#F0E8D1]/50 p-4 rounded-xl border border-[#3C3B37]/5 hover:border-primary/20 transition-colors flex items-start gap-4 cursor-pointer group">
                                <div className="bg-white p-2.5 rounded-lg text-primary shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined">spa</span>
                                </div>
                                <div>
                                    <p className="text-[#3C3B37] font-bold text-base mb-1">Tómate un minuto para respirar</p>
                                    <p className="text-[#5C5B55] text-sm leading-relaxed">Haz una pausa consciente antes de entrar a la sesión.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Action Footer */}
                <footer className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#3C3B37]/10">
                    <button 
                        onClick={onSnooze}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-[#3C3B37] font-semibold text-base hover:bg-[#3C3B37]/5 transition-colors focus:ring-2 focus:ring-[#3C3B37]/20 focus:outline-none text-center"
                    >
                        Necesito 5 minutos más
                    </button>
                    <button 
                        onClick={onJoin}
                        className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary/25 hover:brightness-110 hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-primary/30 focus:outline-none flex items-center justify-center gap-2 group"
                    >
                        <span>Unirse ahora</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </footer>
            </div>

            {/* Subtle decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full pointer-events-none"></div>
        </main>
    </div>
  );
};

export default RitualReminder;
