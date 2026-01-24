
import React from 'react';

interface WeeklySummaryProps {
  onBack: () => void;
  onNavigateToCards: () => void;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ onBack, onNavigateToCards }) => {
  return (
    <div className="w-full h-full bg-bg-s1 animate-fade-in font-display overflow-y-auto pb-20 custom-scrollbar">
      {/* Header Section */}
      <header className="w-full px-6 py-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={onBack}>
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-white shadow-sm transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-2xl">diversity_3</span>
            </div>
            <h1 className="text-primary text-2xl font-bold tracking-tight">PACTO</h1>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#EAEBF1]">
              <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
              <span className="text-text-n900 text-sm font-bold">12 - 18 de Octubre, 2023</span>
            </div>
            <button 
                onClick={onBack}
                className="text-sm font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1 md:hidden"
            >
                <span className="material-symbols-outlined">arrow_back</span> Volver
            </button>
          </div>
        </div>
        <div className="mt-12 mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-primary leading-[1.1] tracking-tight">Tu semana en PACTO</h2>
          <p className="text-lg text-text-n900/80 mt-3 font-medium max-w-2xl leading-relaxed">
            Un vistazo a tus logros y bienestar. Has mantenido un ritmo constante esta semana, priorizando la claridad y la colaboración.
          </p>
        </div>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Logros Clave (Hero Card) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">emoji_events</span>
              </div>
              <h3 className="text-xl font-bold text-text-n900">Logros Clave</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-auto z-10">
              <div className="flex flex-col gap-1 p-4 rounded-xl hover:bg-bg-s1/50 transition-colors cursor-default border border-transparent hover:border-gray-100">
                <span className="text-gray-500 text-base font-bold">Rituales completados</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-primary tracking-tighter">3</span>
                  <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> +1
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 p-4 rounded-xl hover:bg-bg-s1/50 transition-colors cursor-default border border-transparent hover:border-gray-100">
                <span className="text-gray-500 text-base font-bold">Nuevo acuerdo creado</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-primary tracking-tighter">1</span>
                  <span className="text-secondary-s3 text-sm font-bold bg-secondary-s3/10 px-2 py-0.5 rounded-full">Esta semana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tip de la Semana */}
          <div className="lg:col-span-4 bg-primary text-white rounded-2xl shadow-sm p-8 flex flex-col relative overflow-hidden">
            {/* Abstract decorative circles */}
            <div className="absolute -right-8 -top-8 size-40 rounded-full border-4 border-white/10"></div>
            <div className="absolute -right-4 -top-4 size-20 rounded-full border-4 border-white/20"></div>
            
            <div className="flex items-center gap-3 mb-4 z-10">
              <span className="material-symbols-outlined text-3xl text-white">lightbulb</span>
              <h3 className="text-lg font-bold text-white/90 uppercase tracking-widest text-xs">Tip de la Semana</h3>
            </div>
            <div className="z-10 mt-auto">
              <h4 className="text-2xl font-bold mb-3 leading-tight">Claridad ante todo</h4>
              <p className="text-white/80 leading-relaxed font-medium text-sm">
                Si las instrucciones son ambiguas, usa la "Clarity Card" antes de comenzar. Preguntar ahorra tiempo.
              </p>
              <button 
                onClick={onNavigateToCards}
                className="mt-6 flex items-center gap-2 text-sm font-bold bg-white text-primary px-4 py-2 rounded-lg hover:bg-white/90 transition-colors w-max shadow-sm active:scale-95"
              >
                Ver Clarity Card
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Impacto en el equipo */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <h3 className="text-xl font-bold text-text-n900">Impacto en el equipo</h3>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-transparent hover:border-bg-s1 hover:bg-bg-s1/30 transition-all cursor-pointer group">
                <div className="relative flex items-center pt-1">
                  <input defaultChecked readOnly className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-secondary-s3 bg-white checked:border-primary checked:bg-primary transition-all focus:ring-0 focus:ring-offset-0" type="checkbox"/>
                  <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base opacity-0 peer-checked:opacity-100 pointer-events-none mt-0.5">check</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-n900 font-bold text-lg leading-tight group-hover:text-primary transition-colors">Has aportado 2 sugerencias</span>
                  <span className="text-gray-500 text-sm mt-1 font-medium">Reunión de Sincronización - Martes</span>
                </div>
              </label>
              <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-transparent hover:border-bg-s1 hover:bg-bg-s1/30 transition-all cursor-pointer group">
                <div className="relative flex items-center pt-1">
                  <input defaultChecked readOnly className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-secondary-s3 bg-white checked:border-primary checked:bg-primary transition-all focus:ring-0 focus:ring-offset-0" type="checkbox"/>
                  <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base opacity-0 peer-checked:opacity-100 pointer-events-none mt-0.5">check</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-n900 font-bold text-lg leading-tight group-hover:text-primary transition-colors">Ayudaste a desbloquear 1 tarea</span>
                  <span className="text-gray-500 text-sm mt-1 font-medium">Proyecto Alpha - Jueves</span>
                </div>
              </label>
            </div>
          </div>

          {/* Tu Bienestar (Chart) */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">self_improvement</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-n900">Tu Bienestar</h3>
                  <p className="text-gray-500 text-sm font-bold">Horas de Deep Work preservadas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-primary">14.5</span>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Horas Totales</span>
              </div>
            </div>
            
            {/* Chart Container */}
            <div className="flex-1 w-full min-h-[200px] flex items-end justify-between px-2 gap-2 sm:gap-4 md:gap-8 pb-4 relative">
              {/* Horizontal Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-10">
                <div className="w-full h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
                <div className="w-full h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
                <div className="w-full h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
                <div className="w-full h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
              </div>
              
              {/* Bar: Lunes */}
              <div className="flex flex-col items-center gap-2 z-10 w-full group cursor-pointer">
                <div className="relative w-full max-w-[48px] bg-primary/10 rounded-t-lg h-32 group-hover:bg-primary/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all h-[60%] group-hover:bg-secondary-s3"></div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-n900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">2.5 hrs</div>
                </div>
                <span className="text-sm font-bold text-gray-500">Lun</span>
              </div>
              
              {/* Bar: Martes */}
              <div className="flex flex-col items-center gap-2 z-10 w-full group cursor-pointer">
                <div className="relative w-full max-w-[48px] bg-primary/10 rounded-t-lg h-32 group-hover:bg-primary/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all h-[85%] group-hover:bg-secondary-s3"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-n900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">4.0 hrs</div>
                </div>
                <span className="text-sm font-bold text-gray-500">Mar</span>
              </div>
              
              {/* Bar: Miércoles */}
              <div className="flex flex-col items-center gap-2 z-10 w-full group cursor-pointer">
                <div className="relative w-full max-w-[48px] bg-primary/10 rounded-t-lg h-32 group-hover:bg-primary/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all h-[45%] group-hover:bg-secondary-s3"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-n900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">1.8 hrs</div>
                </div>
                <span className="text-sm font-bold text-gray-500">Mié</span>
              </div>
              
              {/* Bar: Jueves */}
              <div className="flex flex-col items-center gap-2 z-10 w-full group cursor-pointer">
                <div className="relative w-full max-w-[48px] bg-primary/10 rounded-t-lg h-32 group-hover:bg-primary/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all h-[70%] group-hover:bg-secondary-s3"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-n900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">3.2 hrs</div>
                </div>
                <span className="text-sm font-bold text-gray-500">Jue</span>
              </div>
              
              {/* Bar: Viernes */}
              <div className="flex flex-col items-center gap-2 z-10 w-full group cursor-pointer">
                <div className="relative w-full max-w-[48px] bg-primary/10 rounded-t-lg h-32 group-hover:bg-primary/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all h-[65%] group-hover:bg-secondary-s3"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-n900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">3.0 hrs</div>
                </div>
                <span className="text-sm font-bold text-gray-500">Vie</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WeeklySummary;
