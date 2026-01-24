
import React, { useState } from 'react';

interface MyLibraryProps {
  onGoToExplore: () => void;
}

const MyLibrary: React.FC<MyLibraryProps> = ({ onGoToExplore }) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'agreements'>('cards');
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos simulados para Clarity Cards favoritas
  const cards = [
    {
      id: 1,
      title: "Instrucciones por Escrito",
      desc: "Preferencia por recibir tareas detalladas vía chat o email para evitar malentendidos y reducir carga cognitiva.",
      category: "Comunicación",
      date: "Visto hace 2 días",
      icon: "description",
      gradient: "from-primary/20 to-secondary-s3/20",
      accentColor: "text-primary"
    },
    {
      id: 2,
      title: "Tiempo de Procesamiento",
      desc: "Espacio de 5-10 minutos tras una pregunta compleja para organizar ideas antes de responder.",
      category: "Productividad",
      date: "Visto hace 1 semana",
      icon: "hourglass_empty",
      gradient: "from-secondary-s3/20 to-primary/20",
      accentColor: "text-primary"
    },
    {
      id: 3,
      title: "Entorno Sensorial",
      desc: "Ajustes proactivos en iluminación y control de ruido para mantener el enfoque durante el día.",
      category: "Bienestar",
      date: "Visto ayer",
      icon: "psychology",
      gradient: "from-primary/10 via-secondary-s3/10 to-white/5",
      accentColor: "text-primary"
    }
  ];

  const filteredCards = cards.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'Todos' || card.category === filter; // Simple mapping logic can be improved
      return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12 font-display">
      
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-text-n900 text-4xl font-black leading-tight tracking-tight">Mi Biblioteca Personal</h1>
          <p className="text-gray-600 text-lg font-medium">Tus herramientas de confianza a un clic.</p>
        </div>
        <div className="flex items-center gap-2 text-primary font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-border">
          <span className="material-symbols-outlined text-xl">auto_awesome</span>
          <span>{cards.length} recursos guardados</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-b border-gray-border">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('cards')}
            className={`flex items-center gap-2 border-b-[3px] pb-4 px-2 transition-colors ${activeTab === 'cards' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-lg">style</span>
            <p className="text-sm font-bold tracking-wide uppercase">Clarity Cards Favoritas</p>
          </button>
          <button 
            onClick={() => setActiveTab('agreements')}
            className={`flex items-center gap-2 border-b-[3px] pb-4 px-2 transition-colors ${activeTab === 'agreements' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-lg">handshake</span>
            <p className="text-sm font-bold tracking-wide uppercase">Acuerdos Guardados</p>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['Todos', 'Comunicación', 'Productividad', 'Bienestar'].map(cat => (
             <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === cat ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'}`}
             >
                {cat}
             </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en favoritos..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
        </div>
      </div>

      {/* Content Grid */}
      {activeTab === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCards.length > 0 ? (
                filteredCards.map(card => (
                    <div key={card.id} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-border hover:-translate-y-1">
                        <div className="relative h-48 w-full bg-primary/5 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}></div>
                            <div className="absolute top-4 right-4 z-10">
                                <button className="size-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:scale-110 transition-transform cursor-pointer">
                                    <span className="material-symbols-outlined text-[20px] filled">favorite</span>
                                </button>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`material-symbols-outlined ${card.accentColor}/40 text-7xl`}>{card.icon}</span>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-white/80 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg backdrop-blur-sm border border-primary/10">
                                    {card.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col grow">
                            <h3 className="text-text-n900 text-xl font-bold mb-2">{card.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed grow font-medium">{card.desc}</p>
                            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{card.date}</span>
                                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 cursor-pointer">
                                    <span>Ver detalle</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center opacity-60">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">bookmarks</span>
                    <p className="text-lg font-bold text-gray-500">No tienes favoritos en esta categoría</p>
                </div>
            )}
        </div>
      ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">handshake</span>
              <h3 className="text-xl font-bold text-text-n900 mb-2">Aún no has guardado acuerdos</h3>
              <p className="text-gray-500 max-w-md text-center mb-6">Explora la biblioteca general para encontrar plantillas útiles para tu equipo.</p>
              <button 
                onClick={onGoToExplore}
                className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-md"
              >
                  Explorar Catálogo
              </button>
          </div>
      )}

      {/* Footer Help Section */}
      <div className="mt-8 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm rotate-[-3deg]">
            <span className="material-symbols-outlined text-primary text-5xl">lightbulb</span>
        </div>
        <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-primary mb-2">¿Necesitas algo más?</h4>
            <p className="text-gray-600 font-medium">Puedes añadir nuevas Clarity Cards explorando el catálogo completo o creando las tuyas propias.</p>
        </div>
        <button 
            onClick={onGoToExplore}
            className="whitespace-nowrap bg-white text-primary border-2 border-primary/20 hover:border-primary hover:text-primary transition-all px-8 py-3 rounded-xl font-bold shadow-sm"
        >
            Explorar catálogo
        </button>
      </div>

    </div>
  );
};

export default MyLibrary;
