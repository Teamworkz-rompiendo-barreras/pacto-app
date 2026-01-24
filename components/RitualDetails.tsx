
import React from 'react';
import { Ritual } from '../types';

interface RitualDetailsProps {
  ritual: Ritual;
  onBack: () => void;
}

const RitualDetails: React.FC<RitualDetailsProps> = ({ ritual, onBack }) => {
  const handleDownloadSummary = () => {
    alert("Descargando resumen PDF del ritual...");
  };

  // Mock data para detalles específicos que aún no están en la DB
  const agreementsReviewed = [
      { text: "Uso de hilos en Slack para feedback", status: "Mantenido", color: "text-green-700 bg-green-100" },
      { text: "Tiempo de respuesta en Jira (Max 4h)", status: "Ajustado", color: "text-amber-700 bg-amber-100" },
      { text: "Cámaras opcionales en Dailies", status: "Mantenido", color: "text-green-700 bg-green-100" }
  ];

  const nextSteps = [
      { text: "Actualizar guía de onboarding de comunicación", assignee: "Ana", date: "20 Oct" },
      { text: "Redactar nuevas etiquetas de prioridad para Jira", assignee: "Elena", date: "22 Oct" }
  ];

  return (
    <div className="max-w-[1200px] mx-auto w-full animate-fade-in pb-12">
      
      {/* Breadcrumbs & Back Link */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <button onClick={onBack} className="hover:text-primary transition-colors">Rituales</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-bold">Detalle de Replay</span>
        </div>
        <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-primary font-bold text-sm group hover:underline"
        >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1 text-lg">arrow_back</span>
            Volver a Rituales
        </button>
      </div>

      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-text-n900">
                {ritual.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">calendar_today</span>
                    <span>{ritual.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                    <span>45 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">group</span>
                    <div className="flex -space-x-2">
                        <div className="size-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600" title="Ana">AG</div>
                        <div className="size-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold" title="Luis">LC</div>
                        <div className="size-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600" title="Elena">ER</div>
                    </div>
                </div>
            </div>
        </div>
        <button 
            onClick={handleDownloadSummary}
            className="bg-primary hover:brightness-110 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95 h-fit"
        >
            <span className="material-symbols-outlined text-lg">download</span>
            <span className="hidden sm:inline">Descargar Resumen</span>
        </button>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* Acuerdos Revisados */}
            <section className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">handshake</span>
                    <h3 className="text-xl font-bold text-text-n900">Acuerdos Revisados</h3>
                </div>
                <div className="space-y-4">
                    {agreementsReviewed.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-bg-s1/30 border border-gray-border/50">
                            <span className="font-bold text-text-n900 text-sm md:text-base">{item.text}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.color}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Conclusiones y Notas */}
            <section className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">description</span>
                    <h3 className="text-xl font-bold text-text-n900">Conclusiones y Notas</h3>
                </div>
                <div className="prose max-w-none text-text-n900/80 leading-relaxed">
                    <ul className="space-y-3 list-disc pl-5">
                        <li>Se identificó una fatiga digital media durante la mitad de la semana.</li>
                        <li>La transición a hilos de Slack ha reducido el ruido visual en un 30% según la percepción del equipo.</li>
                        <li>Necesidad de clarificar los criterios de "Prioridad Alta" en las tareas para evitar ansiedad innecesaria.</li>
                        <li className="font-bold text-primary">Celebración: Luis completó el módulo de diseño accesible con éxito rotundo.</li>
                    </ul>
                </div>
            </section>

            {/* Próximos Pasos */}
            <section className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">playlist_add_check</span>
                    <h3 className="text-xl font-bold text-text-n900">Próximos Pasos</h3>
                </div>
                <div className="space-y-3">
                    {nextSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-colors group cursor-pointer">
                            <input className="size-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" type="checkbox"/>
                            <div className="flex-1">
                                <p className="font-bold text-sm text-text-n900 group-hover:text-primary transition-colors">{step.text}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Asignado a: <span className="font-bold">{step.assignee}</span></p>
                            </div>
                            <span className="text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">{step.date}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* Nivel de Claridad Sidebar */}
            <div className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm text-center flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary-s3"></div>
                <h3 className="text-lg font-bold mb-8 text-text-n900">Nivel de Claridad</h3>
                
                {/* Circular Gauge */}
                <div className="relative size-48 flex items-center justify-center mb-6">
                    <svg className="size-full transform -rotate-90">
                        <circle className="text-gray-100" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                        <circle className="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="55.29" strokeLinecap="round" strokeWidth="12"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-primary tracking-tighter">90%</span>
                        <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full mt-2">
                            <span className="material-symbols-outlined text-sm">trending_up</span> +5%
                        </span>
                    </div>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                    Este ritual ha mejorado significativamente la alineación del equipo respecto a los canales de comunicación.
                </p>
            </div>

            {/* Stats Summary */}
            <div className="bg-primary text-white rounded-2xl p-8 shadow-lg shadow-primary/20 flex flex-col gap-5 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-white/10 size-24 rounded-full blur-2xl"></div>
                
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Rituales Totales</span>
                    <span className="text-2xl font-black">12</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Acuerdos Activos</span>
                    <span className="text-2xl font-black">8</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Próximo Ritual</span>
                    <span className="text-2xl font-black">22 Oct</span>
                </div>
            </div>

            {/* Accessibility Note */}
            <div className="p-5 border-2 border-dashed border-primary/20 rounded-2xl bg-primary/5">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">accessibility_new</span>
                    <div>
                        <p className="text-sm font-bold text-primary mb-1">Ajuste Sensorial</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Este resumen ha sido optimizado para lectura rápida con espaciado aumentado. Puedes cambiar al "Modo Enfoque" en la configuración.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Action Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-gray-500 font-medium">© 2026 PACTO - Herramienta de inclusión neurodiversa.</p>
        <div className="flex items-center gap-4">
            <button className="px-6 py-3 rounded-xl text-sm font-bold transition-all bg-white border border-gray-300 hover:bg-gray-50 text-text-n900">
                Editar Ritual
            </button>
            <button className="bg-text-n900 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all hover:bg-black flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">share</span>
                Compartir con el Equipo
            </button>
        </div>
      </footer>

    </div>
  );
};

export default RitualDetails;
