
import React, { useState } from 'react';
import { Ritual, Agreement } from '../types';

interface NewRitualProps {
  activeAgreements: Agreement[];
  onCancel: () => void;
  onSave: (ritual: Omit<Ritual, 'id' | 'status' | 'icon'>) => void;
}

const NewRitual: React.FC<NewRitualProps> = ({ activeAgreements, onCancel, onSave }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  const [time, setTime] = useState('');
  const [participantText, setParticipantText] = useState('');
  const [participants, setParticipants] = useState<string[]>(['Ana García', 'Luis Chen']);
  const [checklist, setChecklist] = useState<string[]>([
    "Revisión de metodologías de trabajo remoto",
    "Tiempos de respuesta en comunicación asíncrona"
  ]);

  const handleRemoveParticipant = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    setParticipants(prev => prev.filter(p => p !== name));
  };

  const handleParticipantKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (participantText.trim()) {
        setParticipants([...participants, participantText]);
        setParticipantText('');
      }
    }
  };

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, "Nuevo acuerdo a revisar"]);
  };

  const handleChecklistChange = (index: number, value: string) => {
    const newChecklist = [...checklist];
    newChecklist[index] = value;
    setChecklist(newChecklist);
  };

  const handleRemoveChecklistItem = (index: number) => {
    setChecklist(checklist.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !date || !time) {
      alert("Por favor completa el título, la fecha y la hora.");
      return;
    }

    onSave({
      title,
      desc: desc || "Sesión de alineación operativa.",
      time: `${date} ${time}`,
      type: 'custom',
      participants: participants,
      agenda: checklist.length > 0 ? checklist : ["Check-in", "Discusión abierta", "Cierre"]
    });
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="max-w-[800px] w-full mx-auto flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-text-n900 text-4xl font-black leading-tight tracking-tight">Nuevo Ritual de Replay</h1>
            <p className="text-text-n900/60 text-lg font-normal">Define los detalles para tu próxima sesión de alineación.</p>
          </div>
          <button onClick={onCancel} className="flex items-center justify-center rounded-lg h-10 px-6 bg-white border border-gray-border text-text-n900 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
            <span className="truncate">Cerrar</span>
          </button>
        </div>

        {/* Accessibility Action Panel */}
        <div className="w-full">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 md:flex-row md:items-center">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-text-n900 text-base font-bold leading-tight">Sugerencia de Accesibilidad</p>
                <p className="text-text-n900/70 text-sm font-normal leading-normal">
                  Enviar la agenda con 24 horas de antelación ayuda a que todos los participantes se preparen mejor y reduce la ansiedad.
                </p>
              </div>
            </div>
            <button className="text-sm font-bold leading-normal tracking-wide flex items-center gap-2 text-primary hover:underline whitespace-nowrap">
              Ver más tips
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-xl shadow-primary/5 p-8 flex flex-col gap-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-text-n900 text-sm font-semibold tracking-wide">Título del Ritual</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg text-text-n900 border border-gray-border bg-gray-50 h-14 placeholder:text-gray-400 px-4 text-base font-normal focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Ej. Sincronización Semanal de Diseño"
                type="text"
              />
            </div>
            {/* Fecha y Hora */}
            {/* Fecha y Hora */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-text-n900 text-sm font-semibold tracking-wide">Fecha</label>
                <div className="relative group">
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg text-text-n900 border border-gray-border bg-gray-50 h-14 px-4 pr-12 text-base font-normal focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                    type="date"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors pointer-events-none">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-text-n900 text-sm font-semibold tracking-wide">Hora</label>
                <div className="relative group">
                  <input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg text-text-n900 border border-gray-border bg-gray-50 h-14 px-4 pr-12 text-base font-normal focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                    type="time"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors pointer-events-none">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Participantes */}
            <div className="flex flex-col gap-2">
              <label className="text-text-n900 text-sm font-semibold tracking-wide">Participantes</label>
              <div className="relative">
                <div className="flex flex-wrap gap-2 w-full min-h-[56px] items-center rounded-lg border border-gray-border bg-gray-50 px-3 py-2">
                  {participants.map(p => (
                    <span key={p} className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-fade-in">
                      {p} <button type="button" onClick={(e) => handleRemoveParticipant(e, p)} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-500 flex items-center">close</button>
                    </span>
                  ))}
                  <input
                    className="bg-transparent border-none focus:ring-0 p-0 text-sm flex-1 min-w-[100px] outline-none"
                    placeholder="Añadir + Enter..."
                    type="text"
                    value={participantText}
                    onChange={(e) => setParticipantText(e.target.value)}
                    onKeyDown={handleParticipantKeyDown}
                  />
                </div>
              </div>
            </div>
            {/* Objetivo */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-text-n900 text-sm font-semibold tracking-wide">Objetivo de la Sesión</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full rounded-lg text-text-n900 border border-gray-border bg-gray-50 min-h-[120px] placeholder:text-gray-400 p-4 text-base font-normal resize-none focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Describe brevemente lo que se espera lograr en esta sesión..."
              />
            </div>
          </div>

          {/* Active Agreements Selector */}
          {activeAgreements.length > 0 && (
            <div className="flex flex-col gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">link</span>
                Vincular Acuerdos Activos
              </h3>
              <p className="text-xs text-gray-600 mb-2">Selecciona un acuerdo para añadirlo automáticamente a la agenda de revisión.</p>
              <div className="flex flex-wrap gap-2">
                {activeAgreements.map(agreement => (
                  <button
                    key={agreement.id}
                    onClick={() => {
                      if (!checklist.includes(`Revisar: ${agreement.title}`)) {
                        setChecklist([...checklist, `Revisar: ${agreement.title}`]);
                      }
                    }}
                    className="px-3 py-1.5 bg-white border border-primary/20 text-text-n900 text-xs font-bold rounded-lg shadow-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    {agreement.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <h3 className="text-text-n900 text-lg font-bold">Agenda del Ritual</h3>
            <div className="grid grid-cols-1 gap-3">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100 transition-all group">
                  <input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer" type="checkbox" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChecklistChange(index, e.target.value)}
                    className="bg-transparent border-none focus:ring-0 w-full text-text-n900 text-sm font-medium p-0"
                  />
                  <button onClick={() => handleRemoveChecklistItem(index)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddChecklistItem}
                className="flex items-center gap-2 text-primary text-sm font-bold mt-2 hover:opacity-80 w-fit group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">add_circle</span>
                Añadir otro acuerdo
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
            <button onClick={onCancel} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-text-n900 transition-colors">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="px-8 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Programar Ritual
            </button>
          </div>
        </div>

        {/* Visual Decoration / Context */}
        <div className="flex justify-center py-6 opacity-30 grayscale contrast-125">
          <div className="flex gap-12">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">diversity_3</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Inclusión</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">psychology</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Bienestar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl">verified_user</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Acuerdos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Depth Decoration */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end pointer-events-none opacity-50 z-0">
        <div className="text-[120px] leading-none text-primary/5 select-none font-black rotate-[-15deg]">PACTO</div>
      </div>
    </div>
  );
};

export default NewRitual;
