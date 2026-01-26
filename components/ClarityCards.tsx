
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Agreement } from '../types';

interface ClarityCardsProps {
  onGoDashboard: () => void;
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
    tip: 'Recuerda que "Urgente" es subjetivo. Sé explícito con los tiempos de respuesta esperados (ej. "en 4 horas").'
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
    tip: 'El cambio de contexto cuesta 23 minutos de recuperación. Protege el foco de tus compañeros como si fuera el tuyo.'
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
    tip: 'Lo que para ti es un "ruido de fondo agradable" para otra persona puede ser un obstáculo infranqueable para trabajar.'
  },
  {
    id: 4,
    category: 'Reuniones',
    type: 'Sugerencia',
    title: 'Etiqueta de Reuniones',
    desc: 'Pautas claras sobre el uso de la cámara, pedir la palabra y expectativas del chat.',
    icon: 'video_camera_front',
    fullDesc: 'Normaliza prácticas inclusivas como: agenda enviada con 24h de antelación, cámara opcional para reducir fatiga, uso de reacciones para participar sin interrumpir, y grabación para consumo asíncrono.',
    steps: [
      { title: 'Agenda obligatoria', desc: 'Sin agenda clara y objetivos, la reunión se cancela o se convierte en email.' },
      { title: 'Roles rotativos', desc: 'Asigna quién toma notas y quién modera para evitar sesgos de participación.' },
      { title: 'Cierre con claridad', desc: 'Nadie se va sin saber qué tiene que hacer y para cuándo.' }
    ],
    tip: 'Permitir cámaras apagadas reduce la fatiga por Zoom y ayuda a personas que procesan mejor escuchando o moviéndose.'
  },
  {
    id: 5,
    category: 'Feedback',
    type: 'Herramienta',
    title: 'Bucles de Feedback',
    desc: 'Estandarizando cómo compartimos puntos de crecimiento sin ansiedad.',
    icon: 'sync_alt',
    fullDesc: 'Estructura predecible para dar y recibir comentarios. Fomenta el feedback constructivo, específico y orientado a la acción, eliminando la ambigüedad que a menudo genera ansiedad.',
    steps: [
      { title: 'Pregunta primero', desc: '¿Es un buen momento para recibir feedback? Da espacio para prepararse.' },
      { title: 'Formato Escrito + Verbal', desc: 'Envía los puntos principales por escrito antes de la charla.' },
      { title: 'Centrado en la tarea', desc: 'Habla sobre el trabajo y el resultado, no sobre la persona.' }
    ],
    tip: 'La incertidumbre es el enemigo. Elimina el "tenemos que hablar" sorpresa y sustitúyelo por agendas claras.'
  },
  {
    id: 6,
    category: 'Salud',
    type: 'Crítico',
    title: 'Sobrecarga Cognitiva',
    desc: 'Herramientas para reconocer y señalar cuando el agotamiento es inminente.',
    icon: 'warning',
    fullDesc: 'Sistema de semáforo para comunicar niveles de energía y capacidad cognitiva. Permite a los miembros pedir apoyo o reajustar prioridades antes de llegar al burnout.',
    steps: [
      { title: 'Check-in de Semáforo', desc: 'Verde (OK), Amarillo (Lleno), Rojo (Desbordado). Úsalo en dailies.' },
      { title: 'Protocolo de apoyo', desc: 'Si alguien está en Rojo, el equipo redistribuye carga temporalmente.' },
      { title: 'Sin preguntas', desc: 'Acepta el estado del compañero sin juzgar ni exigir explicaciones inmediatas.' }
    ],
    tip: 'Prevenir el burnout es más rentable que curarlo. Normaliza decir "no puedo más hoy".'
  },
];

const ClarityCards: React.FC<ClarityCardsProps> = ({ onGoDashboard, onCreateNew, onConvertToAgreement }) => {
  const [selectedCard, setSelectedCard] = useState<typeof CARDS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCardClick = (card: typeof CARDS[0]) => {
    setSelectedCard(card);
  };

  const handleShareKit = () => {
    alert("Enlace al Kit de Claridad copiado al portapapeles.");
  };

  const handleDownload = async (card: typeof CARDS[0]) => {
    setIsDownloading(true);

    // 1. Crear el elemento temporal para el PDF
    const printContainer = document.createElement('div');
    // Estilos inline críticos para asegurar que html2canvas capture todo correctamente
    printContainer.style.width = '800px';
    printContainer.style.padding = '40px';
    printContainer.style.backgroundColor = '#ffffff';
    printContainer.style.position = 'absolute';
    printContainer.style.top = '-9999px';
    printContainer.style.left = '-9999px';

    // Contenido HTML (Sin <html>/<body> tags externos, solo el contenido del body y estilos)
    printContainer.innerHTML = `
      <style>
        .pdf-container { font-family: sans-serif; color: #111827; line-height: 1.6; }
        .pdf-header { border-bottom: 2px solid #f3f4f6; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; }
        .pdf-logo { color: #4b37a4; font-weight: 900; font-size: 24px; text-transform: uppercase; }
        .pdf-meta { display: flex; gap: 10px; margin-top: 5px; }
        .pdf-tag { background: #eee; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #4b5563; }
        .pdf-title { font-size: 36px; font-weight: 800; margin: 10px 0; color: #111827; line-height: 1.1; }
        .pdf-lead { font-size: 16px; color: #4b5563; font-weight: 500; margin-bottom: 0; }
        .pdf-divider { height: 4px; width: 60px; background: #4b37a4; border-radius: 2px; margin-top: 20px; }
        .pdf-section { margin-top: 40px; }
        .pdf-section-title { color: #4b37a4; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        .pdf-box { font-size: 16px; line-height: 1.8; }
        .pdf-step { display: flex; gap: 15px; margin-bottom: 20px; }
        .pdf-step-num { width: 28px; height: 28px; background: #4b37a4; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; font-size: 14px; }
        .pdf-step-content h4 { margin: 0 0 4px 0; font-size: 15px; font-weight: 700; }
        .pdf-step-content p { margin: 0; font-size: 14px; color: #4b5563; }
        .pdf-tip { background: #fdf2f8; border-left: 4px solid #4b37a4; padding: 20px; border-radius: 0 10px 10px 0; display: flex; gap: 15px; margin-top: 40px; }
        .pdf-footer { margin-top: 50px; border-top: 1px solid #f3f4f6; padding-top: 20px; text-align: center; font-size: 10px; color: #9ca3af; }
      </style>
      
      <div class="pdf-container">
        <div class="pdf-header">
            <div>
                <div class="pdf-logo">PACTO</div>
                <div class="pdf-meta">
                    <span class="pdf-tag">${card.category}</span>
                    <span class="pdf-tag" style="background: rgba(75, 55, 164, 0.1); color: #4b37a4;">${card.type}</span>
                </div>
            </div>
        </div>

        <div class="pdf-title">${card.title}</div>
        <div class="pdf-lead">${card.desc}</div>
        <div class="pdf-divider"></div>

        <div class="pdf-section">
            <div class="pdf-section-title">OBJETIVO</div>
            <div class="pdf-box">${card.fullDesc}</div>
        </div>

        <div class="pdf-section">
            <div class="pdf-section-title">CÓMO USAR ESTA HERRAMIENTA</div>
            <div>
                ${card.steps?.map((step, i) => `
                <div class="pdf-step">
                    <div class="pdf-step-num">${i + 1}</div>
                    <div class="pdf-step-content">
                        <h4>${step.title}</h4>
                        <p>${step.desc}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>

        <div class="pdf-tip">
            <div>
                <strong style="color: #4b37a4; display: block; margin-bottom: 5px;">TIP DE INCLUSIÓN</strong>
                <em style="color: #111827; font-size: 14px;">"${card.tip}"</em>
            </div>
        </div>

        <div class="pdf-footer">
            <p>Generado por PACTO · Herramientas para equipos neurodiversos · ${new Date().getFullYear()}</p>
        </div>
      </div>
    `;

    document.body.appendChild(printContainer);

    try {
      // 2. Generar el Canvas desde el HTML
      const canvas = await html2canvas(printContainer, {
        scale: 2, // Mayor calidad
        useCORS: true, // Para imágenes si las hubiera
        logging: false
      });

      // 3. Crear PDF con jsPDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Primera página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Páginas adicionales si el contenido es muy largo (aunque las tarjetas suelen ser cortas)
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`PACTO_Guia_${card.title.replace(/\s+/g, '_')}.pdf`);

    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor intenta de nuevo.");
    } finally {
      document.body.removeChild(printContainer);
      setIsDownloading(false);
    }
  };

  // Lógica de filtrado combinada (Categoría + Búsqueda)
  const filteredCards = CARDS.filter(card => {
    const matchesCategory = activeCategory === 'Todas' || card.category === activeCategory;
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex gap-6 h-full relative animate-fade-in">
      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <button
              onClick={onGoDashboard}
              className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors w-fit"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Volver
            </button>
            <h2 className="text-4xl font-bold tracking-tight text-primary">Kits de Claridad</h2>
            <p className="text-gray-700 text-lg mt-1 font-medium">Herramientas prácticas para la inclusión neurodiversa.</p>
          </div>
          <div className="relative max-w-xs w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input
              className="w-full bg-white border border-gray-border rounded-xl pl-10 h-10 text-sm focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              placeholder="Buscar tarjetas..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveCategory('Todas')}
            className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all border ${activeCategory === 'Todas' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-border hover:border-primary hover:text-primary'}`}
          >
            Todas las tarjetas
          </button>
          {['Comunicación', 'Sensorial', 'Protocolos', 'Reuniones', 'Feedback'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all border ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-border hover:border-primary hover:text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
          {filteredCards.length > 0 ? (
            filteredCards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`p-6 rounded-2xl transition-all cursor-pointer flex flex-col justify-between h-[280px] border border-gray-border hover:shadow-lg hover:-translate-y-1 bg-white animate-fade-in`}
              >
                <div>
                  <div className={`size-12 rounded-xl flex items-center justify-center mb-5 bg-p1/30 text-primary`}>
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold text-text-n900 mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3 font-medium">{card.desc}</p>
                </div>
                <div className={`flex items-center justify-between mt-4 pt-4 border-t border-gray-border`}>
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded border bg-bg-s1 text-primary border-gray-border`}>
                    {card.type}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(card);
                    }}
                    className="rounded-full p-1 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-gray-400 hover:text-primary">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center opacity-60">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-2">filter_none</span>
              <p className="text-gray-500 font-bold">No se encontraron tarjetas</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('Todas'); }}
                className="text-primary text-sm font-bold hover:underline mt-2"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          <button
            onClick={onCreateNew}
            className="p-6 rounded-2xl border-2 border-dashed border-gray-400 bg-white/30 hover:bg-white/50 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center h-[280px] text-center group"
          >
            <div className="size-14 rounded-full bg-white border border-gray-border flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <h4 className="font-bold text-gray-600 group-hover:text-primary">Tarjeta Personalizada</h4>
            <p className="text-xs text-gray-500 max-w-[140px] mt-1 font-bold uppercase tracking-tighter">Diseñar nueva</p>
          </button>
        </div>
      </div>

      {/* Sidebar Derecha (Contextual) - Mantenido */}
      <aside className="w-80 border-l border-gray-border pl-8 hidden 2xl:flex flex-col shrink-0">
        <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Acuerdo Activo</h5>
        <div className="flex-1 space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-gray-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold">Ingeniería Q4</span>
              <span className="text-xs font-bold text-primary">60%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full w-[60%]"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-4 leading-relaxed font-bold">3 tarjetas activas. 2 pendientes de revisión.</p>
          </div>
          <div>
            <h6 className="text-sm font-bold mb-4 text-text-n900">Tarjetas en Vivo</h6>
            <div className="space-y-3">
              {[
                { label: 'Protocolo de Feedback', status: 'check_circle' },
                { label: 'Flujo Asíncrono', status: 'check_circle' },
                { label: 'Mapa Sensorial', status: 'pending', color: 'text-p1' }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border border-gray-border bg-white/50 ${item.status === 'pending' ? 'border-p1 bg-p1/5' : ''}`}>
                  <span className={`material-symbols-outlined ${item.color || 'text-primary'} text-sm`}>{item.status}</span>
                  <span className="text-xs font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <div className="size-full rounded-xl overflow-hidden bg-p1/30 aspect-video relative p-4 flex flex-col justify-end">
            <p className="text-text-n900 text-[10px] font-bold uppercase opacity-60">Info Semanal</p>
            <p className="text-primary text-xs leading-tight font-bold italic mt-1">
              "La estructura visual reduce la carga cognitiva en un 22%."
            </p>
          </div>
          <button onClick={handleShareKit} className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all">
            Compartir Kit
          </button>
        </div>
      </aside>

      {/* Modal / Overlay Expandido */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-display"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="max-w-6xl w-full bg-[#fffdf8] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px] max-h-[90vh] border border-black/5 animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Visual Anchor */}
            <div className="w-full md:w-5/12 bg-primary/5 flex flex-col items-center justify-center p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-p1/20 rounded-full translate-x-1/4 translate-y-1/4"></div>

              <div className="relative z-10 text-center">
                <div className="size-64 mx-auto mb-8 bg-white rounded-2xl shadow-inner flex items-center justify-center p-8">
                  {/* Dynamic Icon Large */}
                  <span className="material-symbols-outlined text-[120px] text-primary/80">{selectedCard.icon}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm mb-4">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  {selectedCard.category}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {selectedCard.desc}
                </p>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col relative overflow-y-auto">
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isDownloading}
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <div className="flex-grow">
                {/* Header */}
                <div className="mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-text-n900 mb-4 tracking-tight">
                    {selectedCard.title}
                  </h1>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>

                {/* Objetivo */}
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-3 text-primary font-semibold uppercase text-xs tracking-widest">
                    <span className="material-symbols-outlined text-base">flag</span>
                    Objetivo
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {selectedCard.fullDesc}
                  </p>
                </section>

                {/* Step by Step */}
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-6 text-primary font-semibold uppercase text-xs tracking-widest">
                    <span className="material-symbols-outlined text-base">format_list_numbered</span>
                    Cómo usar esta herramienta
                  </div>
                  <div className="space-y-6">
                    {selectedCard.steps?.map((step, idx) => (
                      <div key={idx} className="relative flex gap-4 group">
                        {/* Step Line (Tailwind Pseudo) */}
                        {idx !== (selectedCard.steps?.length || 0) - 1 && (
                          <div className="absolute left-[15px] top-8 -bottom-2 w-0.5 bg-primary/20"></div>
                        )}
                        <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-n900">{step.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Inclusion Tip */}
                <div className="bg-p1/40 border-l-4 border-p1 p-6 rounded-r-xl mb-12">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">lightbulb</span>
                    <div>
                      <h5 className="font-bold text-primary mb-1">Tip de Inclusión</h5>
                      <p className="text-text-n900 text-sm leading-relaxed italic">
                        "{selectedCard.tip}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-gray-100">
                <button
                  onClick={() => handleDownload(selectedCard)}
                  disabled={isDownloading}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait"
                >
                  {isDownloading ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
                      Generando PDF...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">file_download</span>
                      Descargar PDF
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    onConvertToAgreement({
                      title: selectedCard.title,
                      description: selectedCard.fullDesc,
                      category: selectedCard.category as any,
                      rules: selectedCard.steps?.map(s => s.title) || []
                    });
                  }}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-[#4b37a4] text-[#4b37a4] font-semibold hover:bg-[#4b37a4]/5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                  Convertir en Acuerdo
                </button>
                <button
                  onClick={handleShareKit}
                  className="flex-1 px-6 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">share</span>
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClarityCards;
