
import React, { useState, useRef, useEffect } from 'react';
import { Ritual } from '../types';

interface RitualsProps {
  rituals: Ritual[];
  onCreate: () => void;
  onViewDetails: (ritual: Ritual) => void;
  onToggleStatus: (id: number) => void;
  onViewHistory?: () => void;
  onStartPreparation?: () => void;
}

const Rituals: React.FC<RitualsProps> = ({ rituals, onCreate, onViewDetails, onToggleStatus, onViewHistory, onStartPreparation }) => {
  const [activeView, setActiveView] = useState<'programados' | 'preparacion' | 'borradores' | 'archivados'>('programados');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const getRitualStyles = (type: string) => {
    switch (type) {
      case 'replay':
        return { border: 'border-secondary-s3', icon: 'groups', color: 'text-secondary-s3', label: 'Sincronización' };
      case 'focus':
        return { border: 'border-gray-400', icon: 'do_not_disturb_on', color: 'text-gray-500', label: 'Foco Profundo' };
      case 'social':
        return { border: 'border-primary', icon: 'coffee', color: 'text-primary', label: 'Social' };
      case 'edit':
      default:
        return { border: 'border-p1', icon: 'edit_note', color: 'text-yellow-600', label: 'Estrategia' };
    }
  };

  // Separar rituales pendientes y completados para el cálculo de energía
  const pendingCount = rituals.filter(r => r.status === 'pending').length;
  const energyLevel = pendingCount > 3 ? 'Alto' : (pendingCount > 1 ? 'Medio' : 'Óptimo');
  const energyColor = pendingCount > 3 ? 'from-secondary-s3 to-primary' : (pendingCount > 1 ? 'from-yellow-300 to-yellow-500' : 'from-green-300 to-green-500');

  const getViewLabel = () => {
      switch(activeView) {
          case 'programados': return 'Programados';
          case 'preparacion': return 'Por Preparar';
          case 'borradores': return 'Borradores';
          case 'archivados': return 'Archivados';
          default: return 'Vistas';
      }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-fade-in font-display pb-10">
      
      {/* Left Column: Content Stream (8/9 Cols) */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-black text-text-n900 tracking-tight">Rituales de Equipo</h2>
            <p className="text-gray-600 max-w-lg font-medium">Gestiona tu energía cognitiva y colaborativa. Sin cuadrículas, solo claridad.</p>
          </div>
          <div className="flex items-center gap-3">
            
            {/* View Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-text-n900 font-bold text-sm hover:border-primary/50 transition-all shadow-sm min-w-[160px] justify-between"
                >
                    <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                            {activeView === 'programados' ? 'calendar_month' : (activeView === 'preparacion' ? 'fact_check' : (activeView === 'borradores' ? 'edit_note' : 'inventory_2'))}
                        </span>
                        {getViewLabel()}
                    </span>
                    <span className={`material-symbols-outlined text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-fade-in flex flex-col">
                        <button onClick={() => { setActiveView('programados'); setShowDropdown(false); }} className={`px-4 py-3 text-left text-sm font-bold hover:bg-gray-50 flex items-center gap-3 ${activeView === 'programados' ? 'text-primary bg-primary/5' : 'text-gray-600'}`}>
                            <span className="material-symbols-outlined">calendar_month</span> Programados
                        </button>
                        <button onClick={() => { setActiveView('preparacion'); setShowDropdown(false); }} className={`px-4 py-3 text-left text-sm font-bold hover:bg-gray-50 flex items-center gap-3 ${activeView === 'preparacion' ? 'text-primary bg-primary/5' : 'text-gray-600'}`}>
                            <span className="material-symbols-outlined">fact_check</span> Por Preparar
                            <span className="ml-auto bg-red-100 text-red-600 text-[10px] px-1.5 rounded-full">1</span>
                        </button>
                        <button onClick={() => { setActiveView('borradores'); setShowDropdown(false); }} className={`px-4 py-3 text-left text-sm font-bold hover:bg-gray-50 flex items-center gap-3 ${activeView === 'borradores' ? 'text-primary bg-primary/5' : 'text-gray-600'}`}>
                            <span className="material-symbols-outlined">edit_note</span> Borradores
                        </button>
                        <button onClick={() => { setActiveView('archivados'); setShowDropdown(false); }} className={`px-4 py-3 text-left text-sm font-bold hover:bg-gray-50 flex items-center gap-3 border-t border-gray-100 ${activeView === 'archivados' ? 'text-primary bg-primary/5' : 'text-gray-600'}`}>
                            <span className="material-symbols-outlined">inventory_2</span> Archivados
                        </button>
                    </div>
                )}
            </div>

            <button 
                onClick={onCreate}
                className="bg-primary hover:brightness-110 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all transform active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="hidden sm:inline">Programar</span>
            </button>
          </div>
        </header>

        {/* Content Views */}
        <div className="flex flex-col gap-10">
            
            {/* VISTA: PROGRAMADOS (Original) */}
            {activeView === 'programados' && (
                <section className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-5">
                        <h3 className="text-xl font-bold text-text-n900">Hoy</h3>
                        <div className="h-px bg-gray-300 flex-grow"></div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${energyLevel === 'Alto' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'}`}>
                            Carga: {energyLevel}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {rituals.map((ritual) => {
                            const style = getRitualStyles(ritual.type);
                            
                            if (ritual.type === 'focus') {
                                return (
                                    <article key={ritual.id} className="bg-[#F8F6F0] rounded-xl p-4 border border-dashed border-gray-300 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-200 rounded-lg text-gray-500">
                                                <span className="material-symbols-outlined">{style.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-gray-700">{ritual.title}</h4>
                                                <p className="text-xs text-gray-500 font-bold">{ritual.time} • Sin notificaciones</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold px-2 py-1 bg-gray-200 rounded text-gray-600">Automático</span>
                                    </article>
                                );
                            }

                            return (
                                <article 
                                    key={ritual.id}
                                    onClick={() => onViewDetails(ritual)}
                                    className={`group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border-l-[6px] ${style.border} flex flex-col sm:flex-row gap-5 items-start sm:items-center relative overflow-hidden cursor-pointer`}
                                >
                                    {ritual.status === 'completed' && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center">
                                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-black uppercase text-sm border-2 border-green-200 flex items-center gap-2">
                                                <span className="material-symbols-outlined">check</span> Completado
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute right-0 top-0 p-2 opacity-10 pointer-events-none">
                                        <span className="material-symbols-outlined text-[80px] -mt-4 -mr-4">{style.icon}</span>
                                    </div>

                                    <div className="flex flex-col items-start min-w-[90px]">
                                        <span className="text-2xl font-black text-text-n900 tracking-tight">{ritual.time.split(',')[1] || '09:00'}</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase">{ritual.time.split(',')[0] || 'Hoy'}</span>
                                    </div>

                                    <div className="h-10 w-px bg-gray-100 hidden sm:block"></div>

                                    <div className="flex-grow z-10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-2 h-2 rounded-full ${style.color.replace('text-', 'bg-')}`}></span>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${style.color}`}>{style.label}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-text-n900 mb-1 group-hover:text-primary transition-colors">{ritual.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium">{ritual.desc}</p>
                                    </div>

                                    <div className="flex items-center gap-4 z-10 mt-2 sm:mt-0">
                                        <div className="flex -space-x-2">
                                            {ritual.participants?.slice(0, 3).map((p, idx) => (
                                                <div key={idx} className="size-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600" title={p}>
                                                    {p.charAt(0)}
                                                </div>
                                            ))}
                                            {(ritual.participants?.length || 0) > 3 && (
                                                <div className="size-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    +{ (ritual.participants?.length || 0) - 3 }
                                                </div>
                                            )}
                                        </div>
                                        <button 
                                            className="size-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                            onClick={(e) => { e.stopPropagation(); onViewDetails(ritual); }}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* VISTA: POR PREPARAR (Nueva) */}
            {activeView === 'preparacion' && (
                <section className="animate-fade-in flex flex-col gap-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-amber-800">
                            <span className="material-symbols-outlined text-2xl">warning</span>
                            <h3 className="font-bold text-lg">Requiere Atención</h3>
                        </div>
                        <p className="text-amber-900/80 text-sm leading-relaxed font-medium">
                            Tienes 1 ritual próximo que aún no tiene agenda o materiales preparados. Una buena preparación reduce la ansiedad del equipo.
                        </p>
                    </div>

                    <article className="bg-white rounded-xl p-6 shadow-md border-l-8 border-primary flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-9xl">fact_check</span>
                        </div>
                        
                        <div className="flex flex-col gap-1 min-w-[120px]">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Próximo Ritual</span>
                            <span className="text-2xl font-black text-primary">09:00</span>
                            <span className="text-sm font-bold text-gray-500">Hoy</span>
                        </div>

                        <div className="flex-1 z-10">
                            <h4 className="text-xl font-bold text-text-n900 mb-2">Replay Semanal</h4>
                            <p className="text-gray-600 text-sm font-medium mb-4">Sincronización de equipo. Revisa los acuerdos previos y define el tono de la sesión.</p>
                            <div className="flex gap-2">
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">group</span> 4 participantes
                                </span>
                                <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 border border-red-100">
                                    <span className="material-symbols-outlined text-[14px]">priority_high</span> Sin Agenda
                                </span>
                            </div>
                        </div>

                        <div className="z-10 w-full md:w-auto">
                            <button 
                                onClick={onStartPreparation}
                                className="w-full bg-primary hover:brightness-110 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined">play_arrow</span>
                                Preparar Ahora
                            </button>
                        </div>
                    </article>

                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm font-medium">No hay más rituales pendientes de preparación.</p>
                    </div>
                </section>
            )}

            {/* VISTA: BORRADORES */}
            {activeView === 'borradores' && (
                <section className="animate-fade-in flex flex-col items-center justify-center py-16 opacity-60 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">edit_note</span>
                    <h3 className="text-lg font-bold text-gray-500">No hay borradores</h3>
                    <p className="text-sm text-gray-400 mb-6">Todos tus rituales están publicados o completados.</p>
                    <button onClick={onCreate} className="text-primary font-bold text-sm hover:underline">Crear nuevo ritual</button>
                </section>
            )}

            {/* VISTA: ARCHIVADOS */}
            {activeView === 'archivados' && (
                <section className="animate-fade-in flex flex-col gap-4">
                    <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                                <span className="material-symbols-outlined">inventory_2</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-text-n900">Retrospectiva Q3</h4>
                                <p className="text-xs text-gray-500">Septiembre 2023</p>
                            </div>
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline">Restaurar</button>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={onViewHistory} className="text-primary font-bold text-sm flex items-center justify-center gap-2 hover:underline">
                            <span className="material-symbols-outlined text-lg">history</span>
                            Ver historial completo
                        </button>
                    </div>
                </section>
            )}

            {/* Sección Historial Link (visible en programados) */}
            {activeView === 'programados' && (
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={onViewHistory}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold text-sm transition-colors"
                    >
                        <span className="material-symbols-outlined">history</span>
                        Ver historial de rituales pasados
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Right Column: Sidebar (Energy & Widgets) */}
      <div className="lg:col-span-4 sticky top-6 h-fit space-y-6">
        
        {/* Energy Header */}
        <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-p1 text-[28px] fill-current">bolt</span>
            <h3 className="text-lg font-bold text-text-n900">Sugerencias de Energía</h3>
        </div>

        {/* Widget: Daily Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4"></div>
            
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Análisis de hoy</h4>
            
            <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black text-text-n900">{energyLevel}</span>
                <span className="text-sm font-bold text-gray-500 mb-1">Nivel de Carga</span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <div className={`bg-gradient-to-r ${energyColor} h-2 rounded-full`} style={{ width: pendingCount > 3 ? '85%' : '40%' }}></div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium">
                {pendingCount > 3 
                    ? <>Hemos detectado <strong className="text-primary">{pendingCount} rituales</strong>. Tu carga cognitiva está por encima del promedio recomendado.</> 
                    : <>Tu carga de rituales está equilibrada. Buen momento para trabajo profundo.</>
                }
            </p>
            
            {pendingCount > 3 && (
                <div className="bg-primary/5 rounded-xl p-3 flex gap-3 items-start border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">lightbulb</span>
                    <p className="text-xs text-text-n900 font-bold">Sugerencia: Bloquea 15 min después del almuerzo para desconexión sensorial.</p>
                </div>
            )}
        </div>

        {/* Widget: Quick Actions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Herramientas Rápidas</h4>
            <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group border border-transparent hover:border-gray-200">
                    <div className="size-8 rounded-lg bg-[#E0F2F1] text-[#00695C] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">timer</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-text-n900">Modo Pomodoro</p>
                        <p className="text-xs text-gray-500 font-medium">25m enfoque / 5m descanso</p>
                    </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group border border-transparent hover:border-gray-200">
                    <div className="size-8 rounded-lg bg-[#FFF3E0] text-[#E65100] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">do_not_disturb_on</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-text-n900">Silenciar Todo</p>
                        <p className="text-xs text-gray-500 font-medium">Hasta las 05:00 PM</p>
                    </div>
                </button>
            </div>
        </div>

        {/* Mini Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 text-center">
            <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-sm font-bold text-text-n900">Octubre 2023</span>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded"><span className="material-symbols-outlined text-gray-400 text-[16px]">chevron_left</span></button>
                    <button className="p-1 hover:bg-gray-100 rounded"><span className="material-symbols-outlined text-gray-400 text-[16px]">chevron_right</span></button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-400 font-bold mb-2 uppercase">
                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs font-bold text-gray-600">
                {[...Array(31)].map((_, i) => (
                    <span key={i} className={`p-1.5 rounded-full cursor-pointer hover:bg-gray-100 ${i + 1 === 24 ? 'bg-primary text-white hover:bg-primary shadow-md' : ''}`}>
                        {i + 1}
                    </span>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
                <span className="size-1.5 rounded-full bg-secondary-s3"></span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Eventos de Equipo</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Rituals;
