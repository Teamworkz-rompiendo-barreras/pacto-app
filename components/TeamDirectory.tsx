
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface TeamDirectoryProps {
    members: UserProfile[];
    onViewProfile: (user: UserProfile) => void;
    onGoBack: () => void;
    onNavigateToPrivacy?: () => void; // Nueva prop
}

const TeamDirectory: React.FC<TeamDirectoryProps> = ({ members, onViewProfile, onGoBack, onNavigateToPrivacy }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

    // Estados para Filtros
    const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
    const [selectedComm, setSelectedComm] = useState<string[]>([]);

    // Estado para Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Resetear paginación cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedDepts, selectedComm]);

    const handleImgError = (id: string) => {
        setImgErrors(prev => ({ ...prev, [id]: true }));
    };

    const toggleDept = (dept: string) => {
        if (dept === 'Todos') {
            setSelectedDepts([]);
            return;
        }
        setSelectedDepts(prev =>
            prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
        );
    };

    const toggleComm = (type: string) => {
        setSelectedComm(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const clearFilters = () => {
        setSelectedDepts([]);
        setSelectedComm([]);
        setSearchTerm('');
    };

    // Lógica de Filtrado Avanzada
    const filteredMembers = members.filter(member => {
        // 1. Búsqueda por Texto
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Filtro por Departamento (Mapeo de Roles a Depts)
        let matchesDept = true;
        if (selectedDepts.length > 0) {
            const role = member.role.toLowerCase();
            matchesDept = selectedDepts.some(dept => {
                if (dept === 'Ingeniería') return role.includes('developer') || role.includes('engineer') || role.includes('devops') || role.includes('cto');
                if (dept === 'Diseño') return role.includes('diseñador') || role.includes('designer') || role.includes('ux') || role.includes('ui') || role.includes('product');
                if (dept === 'Operaciones') return role.includes('manager') || role.includes('owner') || role.includes('rrhh') || role.includes('people');
                return false;
            });
        }

        // 3. Filtro por Comunicación
        let matchesComm = true;
        if (selectedComm.length > 0) {
            const pref = member.settings.comm_preference; // 'Escrito', 'Verbal', 'Visual'
            // Mapeo simple para la demo
            matchesComm = selectedComm.some(filter => {
                if (filter === 'Texto' || filter === 'Asíncrono') return pref === 'Escrito';
                if (filter === 'Videollamada') return pref === 'Verbal';
                if (filter === 'Visual') return pref === 'Visual';
                return true; // Otros tags no filtran por preferencia estricta en este MVP
            });
        }

        return matchesSearch && matchesDept && matchesComm;
    });

    // Lógica de Paginación
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Helpers UI
    const getUserTags = (user: UserProfile) => {
        const tags = [];
        if (user.settings.comm_preference === 'Escrito') tags.push('Texto', 'Asíncrono');
        if (user.settings.comm_preference === 'Verbal') tags.push('Videollamada');
        if (user.settings.comm_preference === 'Visual') tags.push('Visual', 'Miro');

        const idNum = parseInt(user.id.replace(/\D/g, '') || '0');
        if (idNum % 2 === 0) tags.push('Mañanas');
        else tags.push('Tardes');

        return tags;
    };

    const getStatus = (user: UserProfile) => {
        const idNum = parseInt(user.id.replace(/\D/g, '') || '0');
        if (idNum % 3 === 0) return { label: 'Ausente', color: 'bg-yellow-100 text-yellow-700' };
        if (idNum % 2 === 0) return { label: 'Offline', color: 'bg-gray-100 text-gray-500' };
        return { label: 'Online', color: 'bg-green-100 text-green-700' };
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full animate-fade-in pb-12">

            {/* Sidebar Filters (Desktop) */}
            <aside className="w-full md:w-72 flex-shrink-0 hidden md:block h-fit sticky top-4">

                {/* Desktop Back Button */}
                <button
                    onClick={onGoBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm mb-4 group"
                >
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Volver al Dashboard
                </button>

                <div className="bg-white rounded-xl p-6 flex flex-col gap-8 shadow-sm border border-gray-border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-text-n900 text-lg font-bold">Filtros</h3>
                        <span className="material-symbols-outlined text-gray-400">tune</span>
                    </div>

                    {/* Filter: Departamento */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Departamento</h4>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                                <input
                                    type="checkbox"
                                    checked={selectedDepts.length === 0}
                                    onChange={() => toggleDept('Todos')}
                                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 accent-primary cursor-pointer"
                                />
                                <span className={`text-sm font-bold ${selectedDepts.length === 0 ? 'text-primary' : 'text-text-n900'}`}>Todos</span>
                            </label>
                            {['Diseño', 'Ingeniería', 'Operaciones'].map(dept => (
                                <label key={dept} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        checked={selectedDepts.includes(dept)}
                                        onChange={() => toggleDept(dept)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 accent-primary cursor-pointer"
                                    />
                                    <span className={`text-sm font-medium ${selectedDepts.includes(dept) ? 'text-primary font-bold' : 'text-text-n900'}`}>{dept}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filter: Comunicación */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Comunicación</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Asíncrono', 'Texto', 'Mañanas', 'Videollamada'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => toggleComm(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedComm.includes(tag)
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-primary/20 hover:text-primary'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="mt-2 w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">

                {/* Mobile Back Button */}
                <button
                    onClick={onGoBack}
                    className="md:hidden flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Volver
                </button>

                {/* Header & Search */}
                <div className="bg-white rounded-xl p-8 pr-20 shadow-sm border border-gray-border flex flex-col gap-6 relative overflow-hidden">
                    {/* Header Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 relative z-10">
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                <span className="material-symbols-outlined text-sm">group</span>
                                Directorio de Equipo
                            </div>
                            <h1 className="text-text-n900 text-4xl md:text-5xl font-black tracking-tight leading-tight">Nuestro Equipo</h1>
                            <p className="text-gray-600 text-xl font-medium">Encuentra a tus compañeros y descubre sus mejores formas de colaborar.</p>
                        </div>
                        {onNavigateToPrivacy && (
                            <button
                                onClick={onNavigateToPrivacy}
                                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                                <span className="hidden sm:inline">Privacidad</span>
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 relative z-10">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400">search</span>
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary text-text-n900 placeholder:text-gray-500 font-medium border-transparent transition-all"
                                placeholder="Buscar compañero por nombre o rol..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>

                {/* Categories / Chips (Synced with Dept Filters) */}
                <div className="flex flex-wrap gap-3 pb-4 px-1">
                    <button
                        onClick={() => setSelectedDepts([])}
                        className={`flex h-12 items-center justify-center gap-x-2 rounded-xl px-6 font-bold transition-all ${selectedDepts.length === 0
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:border-primary/30 hover:text-primary hover:shadow-md'
                            }`}
                    >
                        Todos <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${selectedDepts.length === 0 ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                            {members.length}
                        </span>
                    </button>

                    {['Ingeniería', 'Diseño', 'Operaciones'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => {
                                // Comportamiento tipo "Radio" para los chips superiores para simplicidad UX
                                setSelectedDepts([cat]);
                            }}
                            className={`flex h-12 items-center justify-center gap-x-2 rounded-xl px-6 font-bold transition-all ${selectedDepts.includes(cat) && selectedDepts.length === 1
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:border-primary/30 hover:text-primary hover:shadow-md'
                                }`}
                        >
                            {cat === 'Ingeniería' ? 'IT / Eng' : (cat === 'Operaciones' ? 'RRHH / Ops' : cat)}
                        </button>
                    ))}
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                    {paginatedMembers.map(member => {
                        const status = getStatus(member);
                        const tags = getUserTags(member);
                        const showImage = member.avatar && !imgErrors[member.id];

                        return (
                            <div
                                key={member.id}
                                onClick={() => onViewProfile(member)}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-border flex flex-col gap-6 border-t-4 border-t-primary hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="size-20 rounded-2xl shadow-inner bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                                        {showImage ? (
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="size-full object-cover"
                                                onError={() => handleImgError(member.id)}
                                            />
                                        ) : (
                                            <span className="text-2xl font-black text-primary/40 select-none">{getInitials(member.name)}</span>
                                        )}
                                    </div>
                                    <span className={`${status.color} text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md`}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-black text-text-n900 group-hover:text-primary transition-colors">{member.name}</h3>
                                    <p className="text-sm font-bold text-primary/80">{member.role}</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preferencias</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-bg-s1/50 text-text-n900 text-xs font-bold">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-auto w-full py-3 rounded-xl border-2 border-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all">
                                    Ver Perfil
                                </button>
                            </div>
                        );
                    })}

                    {filteredMembers.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
                            <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">person_search</span>
                            <p className="text-xl font-bold text-text-n900">No se encontraron miembros</p>
                            <p className="text-gray-500">Intenta ajustar los filtros o la búsqueda</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Limpiar todos los filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination Dinámica */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 py-4 mt-auto">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="size-10 rounded-xl bg-white border border-gray-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        <div className="flex items-center gap-2">
                            {getPageNumbers().map(pageNum => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`size-10 rounded-xl font-bold flex items-center justify-center transition-all ${currentPage === pageNum
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white border border-gray-border text-text-n900 hover:bg-gray-50'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="size-10 rounded-xl bg-white border border-gray-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TeamDirectory;
