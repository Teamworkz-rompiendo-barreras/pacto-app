
import React, { useState } from 'react';

interface AchievementsProps {
    onCelebrate: () => void;
    onGoBack: () => void;
}

interface AchievementItem {
    id: string | number;
    type: 'badge' | 'event';
    title: string;
    desc: string;
    date: string;
    icon: string;
    colorClass?: string; // Para personalización del icono en el modal
    participants?: string[]; // Datos extra para el modal
}

const Achievements: React.FC<AchievementsProps> = ({ onCelebrate, onGoBack }) => {
    const [showChallengeDetails, setShowChallengeDetails] = useState(false);

    // Estado para la expansión del historial
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

    // Estado para el Modal de Detalles
    const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

    // Datos Mock de la línea de tiempo (Extendidos)
    const timelineEvents: AchievementItem[] = [
        {
            id: 1,
            type: 'event',
            title: "Lanzamiento del manual de comunicación interna",
            desc: "Un documento vivo diseñado por y para el equipo que define nuestras preferencias de comunicación visual y escrita.",
            date: "Hoy",
            icon: "menu_book",
            colorClass: "text-blue-600 bg-blue-100",
            participants: ["Ana García", "Carlos Ruiz"]
        },
        {
            id: 2,
            type: 'event',
            title: "Certificación de Espacio Seguro nivel Bronce",
            desc: "Reconocimiento por completar el primer ciclo de formación en accesibilidad cognitiva y apoyos visuales.",
            date: "Hace 2 días",
            icon: "workspace_premium",
            colorClass: "text-amber-600 bg-amber-100",
            participants: ["Equipo Completo"]
        },
        {
            id: 3,
            type: 'event',
            title: "Primer feedback circular completado",
            desc: "Un hito en nuestra transparencia radical. Todo el equipo participó en una sesión de retroalimentación adaptada.",
            date: "La semana pasada",
            icon: "sync_alt",
            colorClass: "text-purple-600 bg-purple-100",
            participants: ["Elena Soler", "Marta Ruiz"]
        },
        // Datos adicionales para la expansión
        {
            id: 4,
            type: 'event',
            title: "Adopción de tipografía accesible",
            desc: "Migración de todos los documentos internos a Atkinson Hyperlegible.",
            date: "Hace 2 semanas",
            icon: "text_fields",
            colorClass: "text-gray-600 bg-gray-200",
            participants: ["Diseño", "IT"]
        },
        {
            id: 5,
            type: 'event',
            title: "Taller de Neurodiversidad",
            desc: "Workshop de 4 horas con expertos externos.",
            date: "Hace 1 mes",
            icon: "school",
            colorClass: "text-green-600 bg-green-100",
            participants: ["Equipo Completo"]
        }
    ];

    // Datos de las Insignias para el Modal
    const badgeData: Record<string, AchievementItem> = {
        gold: {
            id: 'badge_gold',
            type: 'badge',
            title: "Primer Acuerdo Vivo",
            desc: "Establecimos normas de convivencia que respetan y potencian la neurodiversidad de cada integrante. Un hito fundacional para nuestra cultura.",
            date: "Marzo 2024",
            icon: "handshake",
            colorClass: "text-[#D97706] bg-[#FEF3C7]",
            participants: ["Liderazgo", "RRHH"]
        },
        blue: {
            id: 'badge_blue',
            type: 'badge',
            title: "10 Rituales Completados",
            desc: "Constancia en nuestros procesos comunitarios. Hemos mantenido el ritmo de check-ins y replays durante 10 semanas consecutivas sin cancelaciones.",
            date: "Abril 2024",
            icon: "verified",
            colorClass: "text-[#374BA6] bg-[#EEF2FF]",
            participants: ["Ana", "Luis", "Carlos", "+7"]
        },
        clarity: {
            id: 'badge_clarity',
            type: 'badge',
            title: "Equipo de Alta Claridad",
            desc: "Nuestros canales internos han alcanzado el máximo nivel de accesibilidad cognitiva (Nivel 5/5). Toda la documentación está actualizada y accesible.",
            date: "Mayo 2024",
            icon: "lightbulb",
            colorClass: "text-primary bg-white border-2 border-primary",
            participants: ["Equipo de Operaciones"]
        }
    };

    const displayedEvents = isHistoryExpanded ? timelineEvents : timelineEvents.slice(0, 3);

    const handleOpenModal = (item: AchievementItem) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className="animate-fade-in pb-12 space-y-10 max-w-[1200px] mx-auto w-full relative">

            {/* Header */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest cursor-pointer hover:underline w-fit" onClick={onGoBack}>
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Inclusión en Acción
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                            <span className="material-symbols-outlined text-sm">emoji_events</span>
                            Logros
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-text-n900 leading-tight tracking-tight">
                            Nuestros Logros
                        </h1>
                        <p className="text-xl text-gray-600 font-medium leading-relaxed">
                            Celebrando cada paso hacia una inclusión real y el progreso colectivo de nuestro equipo neurodiverso.
                        </p>
                    </div>
                    <button
                        onClick={onCelebrate}
                        className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">celebration</span>
                        Celebrar con el equipo
                    </button>
                </div>
            </div>

            {/* Grid de Insignias y Desafíos */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-text-n900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">military_tech</span>
                    Insignias de Logros
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Insignia 1: Gold (Interactive) */}
                    <button
                        onClick={() => handleOpenModal(badgeData.gold)}
                        className="text-left bg-[#F2D680] p-8 rounded-3xl relative overflow-hidden group hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer w-full focus:outline-none focus:ring-4 focus:ring-[#D97706]/30"
                    >
                        {/* Background Decoration */}
                        <span className="material-symbols-outlined absolute -right-4 -bottom-8 text-[180px] text-white/20 rotate-[-15deg] pointer-events-none group-hover:scale-110 transition-transform duration-500">handshake</span>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                            <div className="size-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-[#D97706] text-2xl">favorite</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#78350F] mb-2 leading-tight">Primer Acuerdo Vivo</h3>
                                <p className="text-[#92400E] text-sm font-bold leading-relaxed">
                                    Establecimos normas de convivencia que respetan y potencian la neurodiversidad de cada integrante.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#78350F] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">Meta Alcanzada</span>
                                <span className="text-[#92400E] text-xs font-bold">Marzo 2024</span>
                            </div>
                        </div>
                    </button>

                    {/* Insignia 2: Blue (Interactive) */}
                    <button
                        onClick={() => handleOpenModal(badgeData.blue)}
                        className="text-left bg-[#374BA6] p-8 rounded-3xl relative overflow-hidden group hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer w-full focus:outline-none focus:ring-4 focus:ring-primary/30"
                    >
                        <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[180px] text-white/10 rotate-[15deg] pointer-events-none group-hover:scale-110 transition-transform duration-500">verified</span>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                            <div className="size-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-white text-2xl">block</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2 leading-tight">10 Rituales Completados</h3>
                                <p className="text-white/80 text-sm font-medium leading-relaxed">
                                    Constancia en nuestros procesos comunitarios y check-ins diarios.
                                </p>
                            </div>
                            <div className="flex items-center -space-x-2 pt-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="size-8 rounded-full border-2 border-[#374BA6] bg-white flex items-center justify-center text-[10px] font-bold text-primary">
                                        {['AG', 'LC', 'MR'][i - 1]}
                                    </div>
                                ))}
                                <div className="size-8 rounded-full border-2 border-[#374BA6] bg-[#8095F2] flex items-center justify-center text-[10px] font-bold text-white">
                                    +7
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Insignia 3: High Clarity (Interactive) */}
                    <button
                        onClick={() => handleOpenModal(badgeData.clarity)}
                        className="text-left bg-white border-2 border-primary p-8 rounded-3xl relative overflow-hidden group hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer w-full text-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <div className="size-32 rounded-full border-[12px] border-primary"></div>
                        </div>
                        <div className="absolute top-8 right-8 p-8 opacity-5">
                            <div className="size-16 rounded-full bg-primary"></div>
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                            <div className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-2xl">lightbulb</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2 leading-tight text-primary">Equipo de Alta Claridad</h3>
                                <p className="text-primary/80 text-sm font-bold leading-relaxed">
                                    Nuestros canales internos han alcanzado el máximo nivel de accesibilidad cognitiva.
                                </p>
                            </div>
                            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-2 border border-gray-200">
                                <div className="bg-primary h-full rounded-full w-full"></div>
                            </div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-primary">Nivel 5/5 Alcanzado</p>
                        </div>
                    </button>

                    {/* Tarjeta Próximo Desafío */}
                    <div className={`md:col-span-2 lg:col-span-3 bg-white border border-gray-border rounded-3xl p-8 shadow-sm relative overflow-hidden flex flex-col gap-8 transition-all ${showChallengeDetails ? 'ring-4 ring-primary/5' : ''}`}>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                            <div className="flex-1 space-y-4">
                                <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg">Próximo Desafío</span>
                                <h3 className="text-3xl font-black text-text-n900">Semanas de Bienestar 2.0</h3>
                                <p className="text-gray-600 font-medium max-w-xl">
                                    Implementando el nuevo sistema de gestión de energía colectiva para prevenir el burnout antes de que ocurra.
                                </p>
                            </div>

                            <div className="shrink-0 flex items-center gap-6">
                                <button
                                    onClick={() => setShowChallengeDetails(!showChallengeDetails)}
                                    className="text-gray-500 font-bold hover:text-primary transition-colors text-sm hidden md:block"
                                >
                                    {showChallengeDetails ? 'Ocultar detalles' : 'Ver detalles'}
                                </button>

                                {/* Botón Funcional con Flecha */}
                                <button
                                    onClick={() => setShowChallengeDetails(!showChallengeDetails)}
                                    className={`size-24 bg-primary rounded-2xl flex items-center justify-center text-white relative group cursor-pointer hover:brightness-110 transition-all shadow-lg shadow-primary/20 active:scale-95 ${showChallengeDetails ? 'bg-text-n900' : ''}`}
                                    aria-label={showChallengeDetails ? "Ocultar detalles" : "Ver detalles"}
                                >
                                    <span className={`material-symbols-outlined text-4xl transition-transform duration-300 ${showChallengeDetails ? '' : 'group-hover:scale-110'}`}>
                                        {showChallengeDetails ? 'keyboard_arrow_up' : 'trending_up'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Detalles Ampliados */}
                        {showChallengeDetails && (
                            <div className="mt-2 pt-8 border-t border-gray-100 animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">checklist</span>
                                        Plan de Acción
                                    </h4>
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider border border-primary/20">En Progreso: 50%</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Item Completado */}
                                    <div className="flex items-start gap-4 p-5 bg-green-50/50 rounded-2xl border border-green-100 transition-colors">
                                        <div className="mt-0.5 text-green-600 bg-white rounded-full border border-green-200 p-1 shadow-sm">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-n900 line-through opacity-60 decoration-green-600/50">Definir métricas de energía</p>
                                            <p className="text-xs text-green-700 font-bold mt-1 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[10px]">person</span>
                                                Completado ayer por Ana
                                            </p>
                                        </div>
                                    </div>

                                    {/* Item Pendiente */}
                                    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer">
                                        <div className="mt-0.5 text-gray-300 bg-gray-50 rounded-full border border-gray-200 p-1 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm font-bold">radio_button_unchecked</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-n900 group-hover:text-primary transition-colors">Configurar alertas automáticas</p>
                                            <p className="text-xs text-gray-500 mt-1 font-medium">Pendiente de integración con Slack</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button className="py-3 px-6 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:text-primary hover:border-primary/30 transition-all text-sm flex items-center gap-2 shadow-sm">
                                        <span>Ir al tablero del proyecto</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Línea de Tiempo de Éxitos (Funcional) */}
            <div className="space-y-6 pt-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-n900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">history</span>
                        Línea de Tiempo de Éxitos
                    </h2>
                    <button
                        onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                        className="text-primary font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1"
                    >
                        {isHistoryExpanded ? 'Ver menos' : 'Ver historial completo'}
                        <span className={`material-symbols-outlined text-sm transition-transform ${isHistoryExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                </div>

                <div className="relative pl-4 space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    {displayedEvents.map((event) => (
                        <div key={event.id} className="relative pl-8 group">
                            {/* Dot */}
                            <div className={`absolute left-[13px] top-1.5 size-3.5 rounded-full border-2 border-white shadow-sm z-10 transition-colors ${event.date === 'Hoy' ? 'bg-primary scale-110' : 'bg-gray-300 group-hover:bg-primary'}`}></div>

                            <button
                                onClick={() => handleOpenModal(event)}
                                className="w-full text-left bg-white p-6 rounded-2xl border border-gray-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                                    <h3 className="text-lg font-bold text-text-n900 group-hover:text-primary transition-colors">{event.title}</h3>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit shrink-0 ${event.date === 'Hoy' ? 'bg-blue-50 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                        {event.date}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{event.desc}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL DE DETALLES (Unificado para Badge e Historial) */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={handleCloseModal}>
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative animate-bounce-in"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Header Content */}
                        <div className="flex flex-col items-center text-center gap-4 mb-6">
                            <div className={`size-20 rounded-2xl flex items-center justify-center shadow-md ${selectedItem.colorClass || 'bg-primary/10 text-primary'}`}>
                                <span className="material-symbols-outlined text-4xl">{selectedItem.icon}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-3 py-1 rounded-full mb-2 inline-block">
                                    {selectedItem.type === 'badge' ? 'Insignia Obtenida' : 'Hito del Equipo'}
                                </span>
                                <h3 className="text-2xl font-black text-text-n900 leading-tight">{selectedItem.title}</h3>
                                <p className="text-sm font-bold text-gray-400 mt-1">{selectedItem.date}</p>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <p className="text-text-n900 font-medium leading-relaxed text-center">
                                    {selectedItem.desc}
                                </p>
                            </div>

                            {selectedItem.participants && (
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Participantes</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {selectedItem.participants.map((p, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-text-n900 shadow-sm">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                Cerrar
                            </button>
                            <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">share</span>
                                Compartir
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Achievements;
