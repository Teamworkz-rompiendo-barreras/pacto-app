
import React, { useState, useEffect, useRef } from 'react';

interface RitualHistoryProps {
    onBack?: () => void;
    onViewDetails?: (item: any) => void;
}

// Datos Mock con categorías añadidas
const INITIAL_HISTORY_DATA = [
    {
        id: 1,
        title: "Sincronización Semanal",
        category: "Sincronización",
        date: "12 de Octubre, 2023 • 09:30 AM",
        timestamp: new Date('2023-10-12T09:30:00').getTime(),
        summary: "Se establecieron 3 nuevos protocolos para comunicación asincrónica durante bloques de trabajo profundo.",
        satisfaction: "very_satisfied",
        icon: "sync",
        iconColor: "text-primary",
        iconBg: "bg-primary/10",
        satisfactionColor: "text-primary"
    },
    {
        id: 2,
        title: "Feedback Retrospectivo",
        category: "Feedback",
        date: "08 de Octubre, 2023 • 11:15 AM",
        timestamp: new Date('2023-10-08T11:15:00').getTime(),
        summary: "Ajuste de tiempos de entrega para el proyecto 'Zigma' considerando las necesidades de procesamiento cognitivo.",
        satisfaction: "satisfied",
        icon: "feedback",
        iconColor: "text-amber-600",
        iconBg: "bg-amber-100",
        satisfactionColor: "text-amber-500"
    },
    {
        id: 3,
        title: "Chequeo de Bienestar",
        category: "Bienestar",
        date: "01 de Octubre, 2023 • 04:00 PM",
        timestamp: new Date('2023-10-01T16:00:00').getTime(),
        summary: "Implementación de 'Luces de Estado' físicas y digitales para indicar disponibilidad sensorial.",
        satisfaction: "very_satisfied",
        icon: "diversity_3",
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-100",
        satisfactionColor: "text-emerald-500"
    },
    {
        id: 4,
        title: "Taller de Herramientas",
        category: "Taller",
        date: "25 de Septiembre, 2023 • 10:00 AM",
        timestamp: new Date('2023-09-25T10:00:00').getTime(),
        summary: "Definición de tags estándar en Slack para diferenciar urgencia vs. importancia.",
        satisfaction: "satisfied",
        icon: "auto_fix_high",
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100",
        satisfactionColor: "text-primary"
    }
];

// Datos adicionales para "Cargar anteriores"
const OLDER_DATA = [
    {
        id: 5,
        title: "Revisión Q3",
        category: "Revisión",
        date: "15 de Septiembre, 2023 • 09:00 AM",
        timestamp: new Date('2023-09-15T09:00:00').getTime(),
        summary: "Análisis completo del trimestre. Se acordó reducir las reuniones de los viernes a cero.",
        satisfaction: "very_satisfied",
        icon: "assessment",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        satisfactionColor: "text-blue-500"
    },
    {
        id: 6,
        title: "Onboarding Grupal",
        category: "Onboarding",
        date: "10 de Septiembre, 2023 • 11:00 AM",
        timestamp: new Date('2023-09-10T11:00:00').getTime(),
        summary: "Bienvenida a nuevos miembros con énfasis en la cultura de documentación asíncrona.",
        satisfaction: "neutral",
        icon: "group_add",
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-100",
        satisfactionColor: "text-gray-400"
    }
];

const RitualHistory: React.FC<RitualHistoryProps> = ({ onBack, onViewDetails }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedItems, setDisplayedItems] = useState(INITIAL_HISTORY_DATA);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    // Estados para filtros visuales
    const [dateOrder, setDateOrder] = useState<'desc' | 'asc'>('desc');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

    // Referencia para click outside del menú
    const categoryMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
                setShowCategoryMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Lógica combinada de búsqueda y filtrado
    const getFilteredAndSortedHistory = () => {
        let filtered = displayedItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.summary.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        return filtered.sort((a, b) => {
            return dateOrder === 'desc'
                ? b.timestamp - a.timestamp
                : a.timestamp - b.timestamp;
        });
    };

    const filteredHistory = getFilteredAndSortedHistory();

    // Obtener categorías únicas disponibles en los datos mostrados
    const availableCategories = ['Todos', ...Array.from(new Set([...INITIAL_HISTORY_DATA, ...OLDER_DATA].map(i => i.category)))];

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        // Simular petición al servidor
        setTimeout(() => {
            setDisplayedItems(prev => {
                // Evitar duplicados si ya se cargaron (por si acaso)
                const existingIds = new Set(prev.map(i => i.id));
                const newItems = OLDER_DATA.filter(i => !existingIds.has(i.id));
                return [...prev, ...newItems];
            });
            setIsLoadingMore(false);
            setHasMore(false); // En este mock solo hay una página extra
        }, 1200);
    };

    const handleToggleDateOrder = () => {
        setDateOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    const handleExportReport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert("Reporte histórico descargado correctamente (PDF).");
        }, 2000);
    };

    return (
        <div className="animate-fade-in flex flex-col h-full">
            {/* Header */}
            <header className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-text-n900 tracking-tight">Historial de Rituales</h1>
                        <p className="text-gray-600 text-lg mt-1 font-medium">Revisa tus sesiones pasadas de Replay y acuerdos alcanzados.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-border shadow-sm flex flex-col items-center min-w-[120px]">
                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Completados</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-primary">{displayedItems.length}</span>
                                <span className="text-xs text-primary/60 font-bold uppercase">Total</span>
                            </div>
                        </div>
                        <button
                            onClick={handleExportReport}
                            disabled={isExporting}
                            className="bg-primary hover:brightness-110 text-white px-6 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isExporting ? (
                                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                            ) : (
                                <span className="material-symbols-outlined text-sm">download</span>
                            )}
                            <span>{isExporting ? 'Generando...' : 'Reporte'}</span>
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-gray-border shadow-sm z-10 relative">
                    <div className="relative flex-1 w-full">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-bg-s1/30 border-none focus:ring-2 focus:ring-primary/50 rounded-xl text-sm transition-all placeholder:text-gray-400 outline-none"
                            placeholder="Buscar por nombre de ritual o palabra clave..."
                            type="text"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto relative">
                        <button
                            onClick={handleToggleDateOrder}
                            className="flex-1 md:flex-none flex items-center justify-between gap-3 px-4 py-3 bg-bg-s1/30 hover:bg-primary/10 rounded-xl text-sm font-semibold transition-all text-text-n900 min-w-[160px]"
                        >
                            <span>{dateOrder === 'desc' ? 'Más Recientes' : 'Más Antiguas'}</span>
                            <span className={`material-symbols-outlined text-sm transition-transform ${dateOrder === 'asc' ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                        </button>

                        {/* Categoría Dropdown */}
                        <div className="relative" ref={categoryMenuRef}>
                            <button
                                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                                className={`flex-1 md:flex-none flex items-center justify-between gap-3 px-4 py-3 bg-bg-s1/30 hover:bg-primary/10 rounded-xl text-sm font-semibold transition-all text-text-n900 min-w-[180px] ${showCategoryMenu ? 'ring-2 ring-primary/50' : ''}`}
                            >
                                <span>{selectedCategory === 'Todos' ? 'Tipo de Acuerdo' : selectedCategory}</span>
                                <span className={`material-symbols-outlined text-sm transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                            </button>

                            {showCategoryMenu && (
                                <div className="absolute top-full right-0 mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-20">
                                    {availableCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setShowCategoryMenu(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-between ${selectedCategory === cat ? 'text-primary bg-primary/5' : 'text-text-n900'}`}
                                        >
                                            {cat === 'Todos' ? 'Todos los tipos' : cat}
                                            {selectedCategory === cat && <span className="material-symbols-outlined text-sm">check</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map(item => (
                        <div key={item.id} className="bg-white rounded-3xl border border-gray-border p-6 flex flex-col shadow-sm hover:shadow-md hover:border-primary/50 transition-all group animate-fade-in">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`${item.iconBg} ${item.iconColor} p-2 rounded-xl`}>
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Satisfacción</span>
                                    <div className={`flex ${item.satisfactionColor}`}>
                                        <span className="material-symbols-outlined text-lg fill-current">{item.satisfaction}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 mb-2">
                                    {item.category}
                                </span>
                                <h3 className="text-xl font-bold mb-1 text-text-n900 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-sm text-gray-500 font-medium">{item.date}</p>
                            </div>

                            <div className="bg-bg-s1/50 p-4 rounded-2xl mb-6 flex-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Resumen de Acuerdos</p>
                                <p className="text-sm leading-relaxed text-text-n900/80">
                                    {item.summary}
                                </p>
                            </div>

                            <button
                                onClick={() => onViewDetails && onViewDetails(item)}
                                className="w-full py-3 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-active:scale-[0.98]"
                            >
                                <span>Ver detalles</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-50">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                        <p className="text-lg font-bold text-gray-600">No se encontraron rituales</p>
                        <p className="text-sm text-gray-400">Intenta ajustar tu búsqueda o filtros.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
                            className="mt-4 text-primary font-bold hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination / Load More */}
            {hasMore && !searchTerm && selectedCategory === 'Todos' && (
                <div className="mt-auto flex justify-center pb-8">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-border rounded-2xl font-bold text-text-n900 hover:bg-bg-s1 transition-all shadow-sm disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isLoadingMore ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                                <span>Cargando...</span>
                            </>
                        ) : (
                            <>
                                <span>Cargar rituales anteriores</span>
                                <span className="material-symbols-outlined">expand_more</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {!hasMore && !searchTerm && selectedCategory === 'Todos' && filteredHistory.length > 0 && (
                <p className="text-center text-gray-400 text-sm font-bold pb-8">No hay más rituales en el historial.</p>
            )}
        </div>
    );
};

export default RitualHistory;
