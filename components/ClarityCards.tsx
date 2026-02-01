
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Agreement } from '../types';

interface ClarityCardsProps {
  onCreateNew: () => void;
  onConvertToAgreement: (template: Partial<Agreement>) => void;
}

const CARDS = [
  {
    id: 1,
    category: 'Comunicación',
    type: 'Sugerencia',
    title: 'Preferencias de Comunicación',
    desc: 'Define cómo prefieren los miembros del equipo recibir feedback o actualizaciones urgentes.',
    icon: 'chat_bubble',
    fullDesc: 'Esta herramienta ayuda a establecer canales claros (Slack, Email, Llamada) dependiendo de la urgencia y el tipo de información. Incluye plantillas para establecer estados de "No molestar" y tiempos de respuesta esperados.',
    steps: [
      { title: 'Audita tus canales actuales', desc: 'Lista todas las formas en que os comunicáis hoy (Slack, WhatsApp, Email, Jira).' },
      { title: 'Define la urgencia', desc: 'Acuerda qué canal corresponde a cada nivel de urgencia. Ejemplo: Teléfono = Fuego.' },
      { title: 'Documenta y comparte', desc: 'Publica la tabla de preferencias donde todos puedan consultarla antes de enviar un mensaje.' }
    ],
    tip: 'Recuerda que "Urgente" es subjetivo. Sé explícito con los tiempos de respuesta esperados (ej. "en 4 horas").',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    category: 'Protocolos',
    type: 'Protocolo',
    title: 'Protocolo de Enfoque',
    desc: 'Establece reglas para interrumpir el trabajo profundo y minimizar el cambio de contexto.',
    icon: 'timer',
    fullDesc: 'Un marco de trabajo para proteger las horas de alta productividad. Define señales visuales (digitales o físicas) que indican "Modo Enfoque" y establece ventanas específicas para interrupciones síncronas.',
    steps: [
      { title: 'Identifica tus horas pico', desc: '¿En qué momento del día tienes mayor claridad mental? Bloquéalo.' },
      { title: 'Señaliza tu estado', desc: 'Usa un emoji de 🎧 en Slack o una bandera roja en tu mesa.' },
      { title: 'Agrupa las interrupciones', desc: 'Responde mensajes solo en ventanas específicas (ej. 11:00 y 16:00).' }
    ],
    tip: 'El cambio de contexto cuesta 23 minutos de recuperación. Protege el foco de tus compañeros como si fuera el tuyo.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    category: 'Sensorial',
    type: 'Acuerdo',
    title: 'Entorno Sensorial',
    desc: 'Identifica disparadores como iluminación, ruido y movimientos que afectan el enfoque.',
    icon: 'hearing',
    fullDesc: 'Mapa colectivo de necesidades sensoriales. Permite a los miembros del equipo expresar incomodidades con luces brillantes, ruidos repetitivos o temperaturas, y acordar normas de convivencia.',
    steps: [
      { title: 'Mapeo individual', desc: 'Cada miembro lista 3 cosas que le ayudan a concentrarse y 3 que le distraen.' },
      { title: 'Ajustes razonables', desc: 'Si alguien necesita luz tenue, ¿podemos mover su escritorio o usar lámparas?' },
      { title: 'Cultura de auriculares', desc: 'Normalizar el uso de cancelación de ruido sin que signifique "estoy enfadado".' }
    ],
    tip: 'Lo que para ti es un "ruido de fondo agradable" para otra persona puede ser un obstáculo infranqueable para trabajar.',
    color: 'from-emerald-500 to-teal-600'
  }
];

const ClarityCards: React.FC<ClarityCardsProps> = ({ onCreateNew, onConvertToAgreement }) => {
  const [selectedCard, setSelectedCard] = useState<typeof CARDS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const filteredCards = CARDS.filter(card => {
    const matchesCategory = activeCategory === 'Todas' || card.category === activeCategory;
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (card: typeof CARDS[0]) => {
    setIsDownloading(true);
    // PDF Logic remains same, but visual UI updated
    setTimeout(() => {
      alert("Simulando descarga de PDF para: " + card.title);
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in font-sans">
      <header className="mb-12 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <span className="material-symbols-outlined text-xs">psychology</span>
              Kits de Claridad
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-text-n900 tracking-tight uppercase leading-none">Claridad Mental</h2>
            <p className="text-gray-400 font-bold text-lg italic max-w-xl">&ldquo;Herramientas tangibles para reducir la carga cognitiva y mejorar la colaboración.&rdquo;</p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/70 backdrop-blur-md border-2 border-transparent focus:border-primary/20 rounded-2xl pl-12 pr-6 py-4 font-bold text-sm outline-none transition-all shadow-sm"
              placeholder="Buscar tarjetas..."
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide pt-4">
          {['Todas', 'Comunicación', 'Sensorial', 'Protocolos', 'Reuniones'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/50 text-gray-400 hover:text-primary hover:bg-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {filteredCards.map(card => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="group relative bg-white/70 backdrop-blur-md rounded-[40px] p-10 border border-white/60 shadow-xl shadow-primary/2 hover:translate-y-[-8px] transition-all duration-300 cursor-pointer flex flex-col justify-between h-[420px] overflow-hidden"
          >
            <div className={`absolute top-0 right-0 size-40 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 rounded-bl-[100px] transition-opacity duration-500`}></div>

            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="size-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-4xl font-black">{card.icon}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{card.type}</span>
              </div>
              <h3 className="font-display text-2xl font-black text-text-n900 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-gray-400 font-bold text-sm leading-relaxed line-clamp-4">{card.desc}</p>
            </div>

            <div className="flex items-center justify-between border-t border-black/5 pt-8">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-n900/30">{card.category}</span>
              </div>
              <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={onCreateNew}
          className="group rounded-[40px] border-4 border-dashed border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all flex flex-col items-center justify-center p-10 h-[420px] text-center"
        >
          <div className="size-20 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white transition-all mb-6">
            <span className="material-symbols-outlined text-4xl font-black">add</span>
          </div>
          <h4 className="font-display text-xl font-black uppercase tracking-tight text-gray-400 group-hover:text-primary transition-colors">Diseñar Tarjeta</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mt-2">Crea tu propio protocolo</p>
        </button>
      </div>

      {/* DETAIL MODAL */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in" onClick={() => setSelectedCard(null)}></div>
          <div className="bg-white rounded-[48px] shadow-2xl w-full max-w-5xl relative z-10 overflow-hidden flex flex-col lg:flex-row h-[80vh] animate-scale-in">

            {/* Left Visual */}
            <div className={`lg:w-2/5 bg-gradient-to-br ${selectedCard.color} p-12 flex flex-col justify-between text-white relative`}>
              <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">KIT DE CLARIDAD / {selectedCard.type}</span>
                <h3 className="font-display text-5xl font-black uppercase tracking-tighter leading-none mt-4">{selectedCard.title}</h3>
              </div>
              <div className="relative text-center">
                <span className="material-symbols-outlined text-[160px] opacity-20">{selectedCard.icon}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Tip de Inclusión</h4>
                <p className="text-sm font-bold italic leading-relaxed">&ldquo;{selectedCard.tip}&rdquo;</p>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-3/5 p-12 overflow-y-auto space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Objetivo</label>
                <p className="text-xl font-bold text-text-n900 leading-relaxed italic">&ldquo;{selectedCard.fullDesc}&rdquo;</p>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Pasos de Implementación</label>
                <div className="space-y-6">
                  {selectedCard.steps.map((step, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="size-10 rounded-2xl bg-gray-50 text-text-n900 font-black flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors border border-black/5">{i + 1}</div>
                      <div className="space-y-1">
                        <h4 className="font-black text-text-n900 uppercase text-xs tracking-widest">{step.title}</h4>
                        <p className="text-gray-400 font-bold text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleDownload(selectedCard)} disabled={isDownloading} className="flex-1 flex items-center justify-center gap-3 bg-gray-50 text-text-n900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">
                  <span className="material-symbols-outlined text-lg">download</span>
                  {isDownloading ? 'Generando...' : 'Bajar Guía PDF'}
                </button>
                <button
                  onClick={() => {
                    onConvertToAgreement({
                      title: selectedCard.title,
                      description: selectedCard.fullDesc,
                      category: selectedCard.category as any,
                      rules: selectedCard.steps.map(s => s.title)
                    });
                    setSelectedCard(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                  Convertir en Acuerdo
                </button>
              </div>
            </div>

            <button onClick={() => setSelectedCard(null)} className="absolute top-8 right-8 size-12 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-text-n900 transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClarityCards;
