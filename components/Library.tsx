import React, { useState } from 'react';
import { Agreement } from '../types';

interface LibraryProps {
    onUseTemplate: (template: Partial<Agreement>) => void;
}

const TEMPLATES = [
    {
        id: 't1',
        title: "Protocolo de Miércoles sin Llamadas",
        description: "Dedicamos los miércoles a trabajo profundo sin interrupciones de reuniones síncronas. Ideal para perfiles que necesitan largos periodos de concentración sin cambios de contexto.",
        category: "Foco",
        tag: "Reduce fatiga social",
        tagIcon: "auto_awesome",
        tagColor: "bg-[#50A78F]/10 text-[#50A78F]"
    },
    {
        id: 't2',
        title: "Agendas de 5 Minutos",
        description: "Todas las reuniones deben incluir una agenda clara enviada con al menos 24h de antelación. Permite procesar la información y preparar aportaciones con calma.",
        category: "Comunicación",
        tag: "Mejora la predictibilidad",
        tagIcon: "psychology",
        tagColor: "bg-[#50A78F]/10 text-[#50A78F]"
    },
    {
        id: 't3',
        title: "Crítica Constructiva Escrita",
        description: "El feedback correctivo se entrega por escrito antes de hablarlo en persona. Esto permite el procesamiento emocional y cognitivo del mensaje sin la presión de una respuesta inmediata.",
        category: "Feedback",
        tag: "Reduce la ansiedad",
        tagIcon: "edit_note",
        tagColor: "bg-[#50A78F]/10 text-[#50A78F]"
    },
    {
        id: 't4',
        title: "Derecho a la Desconexión",
        description: "Respeto total al tiempo personal fuera del horario laboral acordado. No se esperan respuestas a mensajes asíncronos después del cierre de jornada.",
        category: "Social",
        tag: "Protege el bienestar",
        tagIcon: "shield",
        tagColor: "bg-[#50A78F]/10 text-[#50A78F]"
    },
    {
        id: 't5',
        title: "Uso de Hilos en Slack",
        description: "Mantener las conversaciones secundarias dentro de hilos para evitar el ruido visual en los canales generales. Ayuda a filtrar información relevante.",
        category: "Comunicación",
        tag: "Claridad en canales",
        tagIcon: "forum",
        tagColor: "bg-[#50A78F]/10 text-[#50A78F]"
    }
];

const Library: React.FC<LibraryProps> = ({ onUseTemplate }) => {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [previewTemplate, setPreviewTemplate] = useState<typeof TEMPLATES[0] | null>(null);

    const filteredTemplates = TEMPLATES.filter(t => {
        const matchesFilter = filter === 'Todos' || t.category === filter;
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="w-full animate-fade-in font-display">
            {/* Top Header Inside Component */}
            <div className="sticky top-0 z-[35] w-full bg-bg-s1/95 backdrop-blur-md border-b border-[#D1C8B1] px-6 lg:px-12 py-4 mb-8 -mt-4 -mx-4 lg:-mt-8 lg:-mx-8">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-black tracking-tight text-text-n900">Biblioteca de Acuerdos</h1>
                    </div>

                    <div className="relative w-64 hidden sm:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input
                            className="w-full bg-white border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 text-sm outline-none shadow-sm"
                            placeholder="Buscar plantillas..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-6 lg:px-12 pb-12">
                {/* Page Heading */}
                <div className="mb-10">
                    <h2 className="text-4xl md:text-5xl font-black text-text-n900 tracking-tight mb-4">Inspírate y adopta</h2>
                    <p className="text-lg text-gray-700 max-w-2xl leading-relaxed font-medium">
                        Explora plantillas de acuerdos diseñadas para la inclusión neurodiversa.
                        Construye una cultura de equipo basada en la claridad y el respeto.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                    {['Todos', 'Comunicación', 'Foco', 'Feedback', 'Social'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border transition-all ${filter === cat
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white text-gray-700 border-[#D1C8B1] hover:border-primary hover:text-primary'
                                }`}
                        >
                            {cat === 'Todos' && <span className="material-symbols-outlined text-sm">grid_view</span>}
                            {cat === 'Comunicación' && <span className="material-symbols-outlined text-sm">chat_bubble</span>}
                            {cat === 'Foco' && <span className="material-symbols-outlined text-sm">timer</span>}
                            {cat === 'Feedback' && <span className="material-symbols-outlined text-sm">rate_review</span>}
                            {cat === 'Social' && <span className="material-symbols-outlined text-sm">favorite</span>}
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTemplates.map(template => (
                        <div key={template.id} className="bg-[#FFFBF5] rounded-xl p-6 border border-[#D1C8B1] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="mb-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${template.tagColor}`}>
                                    <span className="material-symbols-outlined text-xs">{template.tagIcon}</span>
                                    {template.tag}
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-text-n900 mb-3 leading-tight group-hover:text-primary transition-colors">
                                {template.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow font-medium">
                                {template.description}
                            </p>
                            <div className="flex flex-col gap-3 mt-auto relative z-10">
                                <button
                                    onClick={() => onUseTemplate({ title: template.title, description: template.description, category: template.category as any })}
                                    className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-sm active:scale-95"
                                >
                                    Usar esta plantilla
                                </button>
                                <button
                                    onClick={() => setPreviewTemplate(template)}
                                    className="w-full text-gray-500 py-2 text-sm font-bold hover:text-primary transition-colors flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                    Previsualizar
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Custom Idea Card */}
                    <div className="bg-white rounded-xl p-6 border-2 border-dashed border-[#D1C8B1] flex flex-col h-full shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
                            </div>
                            <h3 className="text-xl font-black text-primary mb-2 leading-tight">¿Tienes una idea?</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                                Crea un acuerdo desde cero si no encuentras lo que buscas.
                            </p>
                            <button
                                onClick={() => onUseTemplate({ title: '', description: '', category: 'Comunicación' })}
                                className="px-6 py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm"
                            >
                                Crear en blanco
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-24 border-t border-[#D1C8B1] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-bold">
                    <p>© 2026 PACTO. Parte de Teamworkz Branding.</p>
                    <div className="flex gap-8">
                        <a className="hover:text-primary transition-colors cursor-pointer">Accesibilidad</a>
                        <a className="hover:text-primary transition-colors cursor-pointer">Términos</a>
                    </div>
                </footer>
            </main>

            {/* Preview Modal */}
            {previewTemplate && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setPreviewTemplate(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border-b border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${previewTemplate.tagColor}`}>
                                    <span className="material-symbols-outlined text-sm">{previewTemplate.tagIcon}</span>
                                    {previewTemplate.tag}
                                </span>
                                <button
                                    onClick={() => setPreviewTemplate(null)}
                                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-gray-500">close</span>
                                </button>
                            </div>
                            <h2 className="text-3xl font-black text-text-n900 mb-2">{previewTemplate.title}</h2>
                            <p className="text-sm font-bold text-primary uppercase tracking-wide">{previewTemplate.category}</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-text-n900 mb-3">Descripción</h3>
                            <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                                {previewTemplate.description}
                            </p>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Vista previa del acuerdo</h4>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary">description</span>
                                        <span className="font-bold text-text-n900">{previewTemplate.title}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-3">{previewTemplate.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setPreviewTemplate(null)}
                                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={() => {
                                    onUseTemplate({
                                        title: previewTemplate.title,
                                        description: previewTemplate.description,
                                        category: previewTemplate.category as any
                                    });
                                    setPreviewTemplate(null);
                                }}
                                className="flex-[2] bg-primary text-white py-3 rounded-lg font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all"
                            >
                                Usar esta plantilla
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Library;
