
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
                                {ritual.participants && ritual.participants.length > 0 ? (
                                    ritual.participants.map((p, idx) => (
                                        <div key={idx} className="size-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold" title={p}>
                                            {p.substring(0, 2).toUpperCase()}
                                        </div>
                                    ))
                                ) : (
                                    <div className="size-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">--</div>
                                )}
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

                    {/* Agenda del Ritual (Antes Acuerdos Revisados) */}
                    <section className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">list_alt</span>
                            <h3 className="text-xl font-bold text-text-n900">Agenda de la Sesión</h3>
                        </div>
                        <div className="space-y-4">
                            {ritual.agenda && ritual.agenda.length > 0 ? (
                                ritual.agenda.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-bg-s1/30 border border-gray-border/50">
                                        <span className="font-bold text-text-n900 text-sm md:text-base">{item}</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-100">
                                            Pendiente
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No hay puntos de agenda definidos.</p>
                            )}
                        </div>
                    </section>

                    {/* Descripción / Objetivo */}
                    <section className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">description</span>
                            <h3 className="text-xl font-bold text-text-n900">Objetivo del Ritual</h3>
                        </div>
                        <div className="prose max-w-none text-text-n900/80 leading-relaxed">
                            <p>{ritual.desc || "Sin descripción."}</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar (4 Columns) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Nivel de Claridad Sidebar */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm text-center flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary-s3"></div>
                        <h3 className="text-lg font-bold mb-8 text-text-n900">Nivel de Claridad</h3>

                        {/* Circular Gauge Placeholder (Static for MVP) */}
                        <div className="relative size-48 flex items-center justify-center mb-6">
                            <svg className="size-full transform -rotate-90">
                                <circle className="text-gray-100" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                                <circle className="text-primary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="55.29" strokeLinecap="round" strokeWidth="12"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-primary tracking-tighter">90%</span>
                                <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full mt-2">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> Proyectado
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Este ritual está diseñado para maximizar la alineación del equipo.
                        </p>
                    </div>

                    {/* Accessibility Note */}
                    <div className="p-5 border-2 border-dashed border-primary/20 rounded-2xl bg-primary/5">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary">accessibility_new</span>
                            <div>
                                <p className="text-sm font-bold text-primary mb-1">Ajuste Sensorial</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Recuerda compartir la agenda con anticipación para los miembros que necesitan tiempo de procesamiento.
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
