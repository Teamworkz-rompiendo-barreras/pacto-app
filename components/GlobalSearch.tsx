
import React, { useState } from 'react';

interface GlobalSearchProps {
    onAdoptAgreement: (title: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onAdoptAgreement }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="w-full animate-fade-in font-display">

            {/* Top Header - Sticky adjusted with negative margins to fit dashboard padding */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 shadow-sm flex justify-between items-center -mx-4 -mt-4 md:-mx-8 md:-mt-8 mb-6">
                <div className="flex items-center gap-4">
                    {/* Back button removed */}

                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-8 flex items-center justify-center bg-primary text-white rounded-lg shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">handshake</span>
                        </div>
                        <h2 className="text-text-n900 text-xl font-bold tracking-tight">Buscador Global</h2>
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <button className="text-primary font-bold text-sm leading-normal border-b-2 border-primary pb-0.5">Explorar</button>
                    <button className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">Mis Acuerdos</button>
                    <button className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">Tendencias</button>
                </nav>
            </header>

            {/* Main Content Layout */}
            <main className="w-full max-w-[1440px] mx-auto">
                {/* Header Section */}
                <div className="mb-8 px-2">
                    <h1 className="text-3xl md:text-4xl font-black text-text-n900 mb-3 tracking-tight">Explora Acuerdos de la Organización</h1>
                    <p className="text-gray-600 text-lg max-w-3xl font-medium">
                        Descubre iniciativas de inclusión y bienestar adoptadas por otros equipos. Encuentra inspiración para hacer tu entorno de trabajo más neurodiverso.
                    </p>
                </div>

                {/* Sticky Search & Filter Container */}
                <div className="sticky top-[72px] z-30 bg-bg-s1/95 backdrop-blur-md pt-2 pb-6 -mx-4 px-4 md:-mx-8 md:px-8 mb-4 transition-all duration-300 border-b border-transparent">
                    <div className="flex flex-col gap-4 max-w-[1440px] mx-auto">
                        {/* Search Bar */}
                        <div className="relative w-full shadow-sm rounded-xl">
                            <div className="flex w-full items-stretch rounded-xl h-14 bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                                <div className="text-primary flex items-center justify-center pl-5 pr-2">
                                    <span className="material-symbols-outlined text-[28px]">search</span>
                                </div>
                                <input
                                    className="flex w-full min-w-0 flex-1 resize-none bg-transparent border-none text-text-n900 placeholder:text-gray-400 px-2 text-lg font-normal focus:ring-0 h-full outline-none"
                                    placeholder="Buscar acuerdos, equipos o beneficios (ej. Reducción de Ansiedad)..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="m-2 px-6 bg-primary hover:brightness-110 text-white rounded-lg font-bold transition-all shadow-md">
                                    Buscar
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-3 flex-wrap items-center">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mr-2">Filtrar por:</span>
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white border border-gray-200 hover:border-primary pl-4 pr-3 transition-all shadow-sm">
                                <span className="text-text-n900 text-sm font-medium">Departamento</span>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[20px]">keyboard_arrow_down</span>
                            </button>
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-primary/10 border border-primary/20 pl-4 pr-3 transition-all shadow-sm">
                                <span className="text-primary text-sm font-bold">Equipo: Diseño</span>
                                <span className="material-symbols-outlined text-primary text-[20px]">close</span>
                            </button>
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white border border-gray-200 hover:border-primary pl-4 pr-3 transition-all shadow-sm">
                                <span className="text-text-n900 text-sm font-medium">Tipo de Acuerdo</span>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[20px]">keyboard_arrow_down</span>
                            </button>
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-white border border-gray-200 hover:border-primary pl-4 pr-3 transition-all shadow-sm">
                                <span className="text-text-n900 text-sm font-medium">Beneficio Neurodiverso</span>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[20px]">keyboard_arrow_down</span>
                            </button>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="ml-auto text-sm text-gray-500 hover:text-primary font-bold underline decoration-dashed underline-offset-4"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8 pb-12 px-2">
                    {/* Sidebar: Trends */}
                    <aside className="col-span-12 lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-5 border border-white/50">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary filled">trending_up</span>
                                <h3 className="text-lg font-bold text-text-n900">Tendencias</h3>
                            </div>
                            <div className="space-y-1">
                                {/* Trend Item 1 */}
                                <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-bg-s1 transition-colors cursor-pointer">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-text-n900 group-hover:text-primary transition-colors">Viernes sin reuniones</span>
                                        <span className="text-xs text-gray-500 font-medium">Productividad</span>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-xs font-black px-2 py-1 rounded-full">+12%</span>
                                </div>
                                {/* Trend Item 2 */}
                                <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-bg-s1 transition-colors cursor-pointer">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-text-n900 group-hover:text-primary transition-colors">Cámaras opcionales</span>
                                        <span className="text-xs text-gray-500 font-medium">Bienestar</span>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-1 rounded-full">Popular</span>
                                </div>
                                {/* Trend Item 3 */}
                                <div className="group flex items-center justify-between p-3 rounded-lg hover:bg-bg-s1 transition-colors cursor-pointer">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-text-n900 group-hover:text-primary transition-colors">Bloques de foco</span>
                                        <span className="text-xs text-gray-500 font-medium">Gestión de tiempo</span>
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">8 eqs</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <button className="flex items-center gap-2 text-sm text-primary font-bold hover:underline">
                                    Ver todas las tendencias
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Promo / Help Widget */}
                        <div className="bg-primary text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 bg-white/10 rounded-full size-24 blur-xl"></div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2">¿No encuentras lo que buscas?</h3>
                                <p className="text-blue-100 text-sm mb-4 font-medium">Propón un nuevo acuerdo para tu equipo y compártelo con la organización.</p>
                                <button
                                    onClick={() => onAdoptAgreement('Nuevo Acuerdo Personalizado')}
                                    className="w-full bg-white text-primary text-sm font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
                                >
                                    Crear Nuevo Acuerdo
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid: Agreement Cards */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Card 1: Featured (Image Header) */}
                            <article className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-3 left-4 text-white">
                                        <p className="text-xs font-bold opacity-90 uppercase tracking-wide">Equipo de Diseño</p>
                                    </div>
                                    <button className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-md p-1.5 rounded-full text-white transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    </button>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-xl font-black text-text-n900 leading-tight mb-2 group-hover:text-primary transition-colors">Protocolo de Respeto Asíncrono</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                        Establece normas claras para la comunicación no inmediata, reduciendo la ansiedad por respuestas rápidas y mejorando el foco profundo.
                                    </p>
                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold">#Ansiedad</span>
                                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">#Comunicación</span>
                                        </div>
                                        <button className="w-full border-2 border-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2">
                                            <span>Ver detalles</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Card 2: Standard */}
                            <article className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide bg-primary/10 px-2 py-1 rounded">Ingeniería Backend</span>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[22px]">favorite</span>
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black text-text-n900 leading-tight mb-3 group-hover:text-primary transition-colors">Documentación Primero</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                        Fomentamos escribir antes de hablar. Ayuda a la memoria de trabajo y permite procesar la información a ritmo propio antes de las reuniones.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">#Memoria</span>
                                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">#Claridad</span>
                                        </div>
                                        <button
                                            onClick={() => onAdoptAgreement('Documentación Primero')}
                                            className="w-full bg-primary text-white hover:brightness-110 font-bold text-sm py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                                        >
                                            Adoptar
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Card 3: Standard */}
                            <article className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide bg-primary/10 px-2 py-1 rounded">Recursos Humanos</span>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[22px]">favorite</span>
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black text-text-n900 leading-tight mb-3 group-hover:text-primary transition-colors">Horarios Flexibles Core</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                        Definimos horas núcleo (10am - 3pm) para colaboración síncrona, dejando el resto del día libre para gestión de energía personal.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">#Flexibilidad</span>
                                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">#Conciliación</span>
                                        </div>
                                        <button
                                            onClick={() => onAdoptAgreement('Horarios Flexibles Core')}
                                            className="w-full bg-primary text-white hover:brightness-110 font-bold text-sm py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                                        >
                                            Adoptar
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Card 4: Standard */}
                            <article className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide bg-primary/10 px-2 py-1 rounded">Ventas B2B</span>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[22px]">favorite</span>
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black text-text-n900 leading-tight mb-3 group-hover:text-primary transition-colors">Mentoría Inclusiva</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                        Programa de pares para nuevos ingresos, enfocado en navegación social y cultural de la empresa, no solo técnica.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2.5 py-1 rounded-md bg-pink-50 text-pink-700 text-xs font-bold">#Onboarding</span>
                                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">#Social</span>
                                        </div>
                                        <button
                                            onClick={() => onAdoptAgreement('Mentoría Inclusiva')}
                                            className="w-full bg-primary text-white hover:brightness-110 font-bold text-sm py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                                        >
                                            Adoptar
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Card 5: With Image */}
                            <article className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                                <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=2536&auto=format&fit=crop")' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-3 left-4 text-white">
                                        <p className="text-xs font-bold opacity-90 uppercase tracking-wide">Operaciones</p>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-xl font-black text-text-n900 leading-tight mb-2 group-hover:text-primary transition-colors">Días de Recarga Mental</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                        Días libres adicionales específicamente designados para desconexión total cuando se detectan picos de estrés.
                                    </p>
                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold">#SaludMental</span>
                                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">#Descanso</span>
                                        </div>
                                        <button className="w-full border-2 border-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2">
                                            <span>Ver detalles</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Card 6: Standard */}
                            <article className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide bg-primary/10 px-2 py-1 rounded">Producto</span>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[22px]">favorite</span>
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black text-text-n900 leading-tight mb-3 group-hover:text-primary transition-colors">Instrucciones Visuales</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                        Acompañar todas las tareas complejas de diagramas de flujo o videos cortos (Loom) para facilitar la comprensión.
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">#Visual</span>
                                            <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">#Procesos</span>
                                        </div>
                                        <button
                                            onClick={() => onAdoptAgreement('Instrucciones Visuales')}
                                            className="w-full bg-primary text-white hover:brightness-110 font-bold text-sm py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                                        >
                                            Adoptar
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Load More */}
                        <div className="mt-12 flex justify-center">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 font-bold hover:bg-gray-50 transition-colors shadow-sm">
                                <span>Cargar más acuerdos</span>
                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GlobalSearch;
