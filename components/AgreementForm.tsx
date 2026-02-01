
import React, { useState, useEffect } from 'react';
import { Agreement } from '../types';
import { useToast } from '../context/ToastContext';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

interface AgreementFormProps {
  onSave: (data: Partial<Agreement>) => void;
  onCancel: () => void;
  onArchive?: () => void;
  initialData?: Partial<Agreement>;
}

const AgreementForm: React.FC<AgreementFormProps> = ({ onSave, onCancel, onArchive, initialData }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Comunicación');
  const [visibility, setVisibility] = useState<'Organization' | 'Team' | 'Private'>('Team');
  const [rules, setRules] = useState<string[]>(['']);
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const addRule = () => setRules([...rules, '']);
  const updateRule = (index: number, val: string) => {
    const newRules = [...rules];
    newRules[index] = val;
    setRules(newRules);
  };
  const removeRule = (index: number) => setRules(rules.filter((_, i) => i !== index));

  const parseUrgency = (str: string) => {
    if (!str) return;
    const daysMatch = str.match(/(\d+)\s*d/i);
    const hoursMatch = str.match(/(\d+)\s*h/i);
    const minsMatch = str.match(/(\d+)\s*m/i);
    if (daysMatch) setDays(daysMatch[1]);
    if (hoursMatch) setHours(hoursMatch[1]);
    if (minsMatch) setMinutes(minsMatch[1]);
    if (str.includes('Inmediato')) {
      setMinutes('0'); setHours('0'); setDays('0');
    }
  };

  useEffect(() => {
    if (initialData) {
      if (initialData.title) setTitle(initialData.title);
      if (initialData.description) setDesc(initialData.description);
      if (initialData.category) setCategory(initialData.category);
      if (initialData.urgency) parseUrgency(initialData.urgency);
      if (initialData.deadline) setDeadline(initialData.deadline);
      if (initialData.visibility) setVisibility(initialData.visibility);
      if (initialData.rules && initialData.rules.length > 0) {
        setRules(initialData.rules);
      }
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      let urgencyStr = '';
      if (days && days !== '0') urgencyStr += `${days}d `;
      if (hours && hours !== '0') urgencyStr += `${hours}h `;
      if (minutes && minutes !== '0') urgencyStr += `${minutes}m`;
      urgencyStr = urgencyStr.trim();
      if (!urgencyStr && (days === '0' || hours === '0' || minutes === '0')) urgencyStr = 'Inmediato (Blocker)';
      if (!urgencyStr) urgencyStr = 'Sin urgencia';

      onSave({
        title,
        description: desc,
        category: category as any,
        urgency: urgencyStr,
        deadline,
        visibility,
        rules: rules.filter(r => r.trim() !== '')
      });
    } else {
      toast("Por favor inserta un título para el acuerdo.", 'error');
    }
  };

  const AI_TEMPLATES = [
    {
      title: "Política de 'Cámaras Opcionales'",
      desc: "Para reducir la fatiga por zoom y la ansiedad social, se acuerda que el uso de cámaras es completamente opcional.",
      category: "Comunicación",
      rules: [
        "Cámara opcional en reuniones internas.",
        "Cámara recomendada (no obligatoria) con clientes nuevos.",
        "Obligatorio: Foto de perfil clara si no hay cámara."
      ]
    },
    {
      title: "Horas de Foco Sin Interrupciones",
      desc: "Bloque de tiempo diario donde el equipo se compromete a no enviar mensajes ni convocar reuniones.",
      category: "Foco",
      rules: [
        "De 09:00 a 11:00 no se programan reuniones.",
        "Slack/Teams en modo 'No Molestar'.",
        "Urgencias reales solo por teléfono."
      ]
    },
    {
      title: "Feedback Radicalmente Honesto",
      desc: "Fomentar una cultura donde el feedback constructivo es bienvenido y esperado en cualquier momento.",
      category: "Feedback",
      rules: [
        "El feedback se da en privado, el elogio en público.",
        "Usar la estructura: Situación - Comportamiento - Impacto.",
        "Siempre asumir intenciones positivas."
      ]
    }
  ];

  const handleGenerateAI = () => {
    if ((title || desc) && !window.confirm("¿Reemplazar el contenido actual con una nueva sugerencia de IA?")) return;
    setIsGenerating(true);
    setTimeout(() => {
      let template = AI_TEMPLATES[Math.floor(Math.random() * AI_TEMPLATES.length)];
      setTitle(template.title);
      setDesc(template.desc);
      setCategory(template.category);
      setRules(template.rules);
      setIsGenerating(false);
      toast("Sugerencia mágica aplicada", "success");
    }, 1200);
  };

  const isEdit = initialData && (initialData as any).id;

  return (
    <div className="max-w-5xl mx-auto w-full pb-20 px-4 animate-fade-in">
      <PageHeader
        title={isEdit ? "Refinando el Pacto" : "Creando un Nuevo Pacto Vivo"}
        subtitle="Los mejores equipos no asumen, acuerdan. Define las reglas del juego para una colaboración sin fricciones."
        actionButton={
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="flex items-center gap-3 bg-gradient-to-br from-primary to-secondary-s3 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-primary/20"
          >
            {isGenerating ? (
              <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-lg">magic_button</span>
            )}
            {isGenerating ? 'Inspirándome...' : 'Sugerencia Mágica (IA)'}
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="mt-12 space-y-8">
        {/* Section 1: Core Identity */}
        <section className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/40 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-bold">edit_document</span>
            </div>
            <h2 className="font-display text-xl font-black text-text-n900 tracking-tight uppercase">Definición General</h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="title" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Título del Acuerdo</label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-6 py-5 font-bold text-text-n900 outline-none transition-all shadow-inner"
                placeholder="Ej. Desconexión Digital Post-Working"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="desc" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Propósito y Mantra</label>
              <textarea
                id="desc"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[24px] px-6 py-5 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none"
                placeholder="¿Por qué este pacto beneficia la salud del equipo?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label htmlFor="category" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Categoría</label>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-6 py-5 font-bold text-text-n900 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                  >
                    <option>Comunicación</option>
                    <option>Foco</option>
                    <option>Feedback</option>
                    <option>Social/Inclusión</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="visibility" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Quién lo ve</label>
                <div className="relative">
                  <select
                    id="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-6 py-5 font-bold text-text-n900 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="Team">Todo el Equipo</option>
                    <option value="Organization">Toda la Organización</option>
                    <option value="Private">Solo Yo (Borrador)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">visibility</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Rules of the Game */}
        <section className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/40 shadow-xl shadow-primary/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-secondary-s3/10 flex items-center justify-center text-secondary-s3">
                <span className="material-symbols-outlined font-bold">rocket_launch</span>
              </div>
              <h2 className="font-display text-xl font-black text-text-n900 tracking-tight uppercase">Reglas del Juego</h2>
            </div>
            <button
              type="button"
              onClick={addRule}
              className="px-4 py-2 bg-secondary-s3/10 text-secondary-s3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary-s3 hover:text-white transition-all"
            >
              + Añadir Regla
            </button>
          </div>

          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4 animate-fade-in group">
                <div className="size-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center font-black text-primary transition-all group-hover:scale-110">
                  {idx + 1}
                </div>
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateRule(idx, e.target.value)}
                  placeholder={`Redacta la norma nº ${idx + 1}...`}
                  className="flex-1 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[20px] px-6 py-4 font-bold text-text-n900 outline-none transition-all shadow-inner"
                />
                {rules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRule(idx)}
                    className="size-14 rounded-2xl hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Time & Deadlines */}
        <section className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/40 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="size-10 rounded-xl bg-p1/20 flex items-center justify-center text-p1">
              <span className="material-symbols-outlined font-bold text-primary">timer</span>
            </div>
            <h2 className="font-display text-xl font-black text-text-n900 tracking-tight uppercase">Tiempos y Compromisos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Urgencia Esperada</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-4 font-black text-center text-lg outline-none transition-all shadow-inner"
                    placeholder="0"
                  />
                  <p className="text-[10px] text-center font-black uppercase text-gray-400 mt-2">Días</p>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-4 font-black text-center text-lg outline-none transition-all shadow-inner"
                    placeholder="0"
                  />
                  <p className="text-[10px] text-center font-black uppercase text-gray-400 mt-2">Horas</p>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-4 font-black text-center text-lg outline-none transition-all shadow-inner"
                    placeholder="0"
                  />
                  <p className="text-[10px] text-center font-black uppercase text-gray-400 mt-2">Mins</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="deadline" className="text-xs font-black text-text-n900 uppercase tracking-widest px-1">Fecha de Revisión (Opcional)</label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 font-bold text-text-n900 outline-none transition-all shadow-inner"
              />
              <p className="text-[10px] font-bold text-gray-400 px-1 leading-relaxed">Poner una fecha ayuda a revisar si el pacto sigue siendo útil para el equipo.</p>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-12">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-8 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest text-text-n900/40 hover:text-text-n900 hover:bg-white/50 transition-all"
          >
            Cancelar y Salir
          </button>

          <div className="flex-[2] flex flex-col sm:flex-row gap-4">
            {onArchive && (
              <button
                type="button"
                onClick={onArchive}
                className="flex-1 bg-red-50 text-red-500 px-8 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-red-100 transition-all border-2 border-transparent"
              >
                Archivar
              </button>
            )}
            <button
              type="submit"
              className="flex-[2] bg-primary text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isEdit ? 'Actualizar Pacto' : 'Publicar Pacto Vivo'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgreementForm;
