
import React, { useState } from 'react';
import { Agreement } from '../types';

interface MyAgreementsProps {
    agreements: Agreement[];
    onCreateNew: () => void;
    onViewAgreement: (agreement: Agreement) => void;
    onEditAgreement: (agreement: Agreement) => void;
    onGoBack?: () => void;
}

const MyAgreements: React.FC<MyAgreementsProps> = ({ agreements, onCreateNew, onViewAgreement, onEditAgreement }) => {
    const [filter, setFilter] = useState<'All' | 'Activo' | 'Borrador'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAgreements = agreements.filter(a => {
        const matchesStatus = filter === 'All' || a.status === filter;
        const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in font-display pb-12 px-6 md:px-10 pt-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                        <span className="material-symbols-outlined text-sm">handshake</span>
                        Gestión de Acuerdos
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-text-n900 tracking-tight leading-tight">
                        Mis Acuerdos
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Consulta y gestiona todos los acuerdos vivos de tu equipo.
                    </p>
                </div>
                <button
                    onClick={onCreateNew}
                    className="flex justify-center items-center gap-2 bg-primary hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>Nuevo Acuerdo</span>
                </button>
            </header>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Buscar acuerdos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl w-fit">
                    {['All', 'Activo', 'Borrador'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === status ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
                        >
                            {status === 'All' ? 'Todos' : status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredAgreements.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 text-center flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-5xl text-gray-300">search_off</span>
                        <div className="space-y-1">
                            <p className="font-bold text-gray-500 text-lg">No se encontraron acuerdos</p>
                            <p className="text-gray-400 text-sm">Intenta ajustar los filtros o crea uno nuevo.</p>
                        </div>
                        {agreements.length === 0 && (
                            <button onClick={onCreateNew} className="text-primary font-bold hover:underline mt-2">Crear mi primer acuerdo</button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredAgreements.map((agreement) => (
                            <div key={agreement.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between gap-4 cursor-pointer" onClick={() => onViewAgreement(agreement)}>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${agreement.category === 'Comunicación' ? 'bg-blue-100 text-blue-700' :
                                            agreement.category === 'Foco' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {agreement.category}
                                        </span>
                                        {agreement.visibility && (
                                            <span className="text-gray-400 flex items-center" title={agreement.visibility === 'Organization' ? 'Global' : (agreement.visibility === 'Private' ? 'Privado' : 'Equipo')}>
                                                <span className="material-symbols-outlined text-[14px]">
                                                    {agreement.visibility === 'Organization' ? 'public' : (agreement.visibility === 'Private' ? 'lock' : 'group')}
                                                </span>
                                            </span>
                                        )}
                                        <span className={`text-[10px] font-bold ${agreement.status === 'Activo' ? 'text-green-600' : 'text-amber-600'}`}>• {agreement.status}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-text-n900 group-hover:text-primary transition-colors">{agreement.title}</h4>
                                    <p className="text-gray-500 font-medium text-sm line-clamp-1">{agreement.description}</p>
                                </div>
                                <div className="flex items-center gap-2 sm:self-center">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEditAgreement(agreement); }}
                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAgreements;
