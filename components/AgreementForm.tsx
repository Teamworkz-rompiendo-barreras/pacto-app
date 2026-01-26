
import React, { useState, useEffect } from 'react';
import { Agreement } from '../types';

interface AgreementFormProps {
  onSave: (data: Partial<Agreement>) => void;
  onCancel: () => void;
  initialData?: Partial<Agreement>; // Allow pre-filling
}

const AgreementForm: React.FC<AgreementFormProps> = ({ onSave, onCancel, initialData }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Comunicación');
  const [visibility, setVisibility] = useState<'Organization' | 'Team' | 'Private'>('Team');

  // Rules List State
  const [rules, setRules] = useState<string[]>(['']);

  // Granular Urgency State
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

  // Helper to parse urgency string
  const parseUrgency = (str: string) => {
    if (!str) return;
    // Simple heuristic parsing for legacy and new formats
    if (str.includes('Min') || str.includes('m')) {
      const m = str.match(/(\d+)/);
      if (m) setMinutes(m[1]);
    }
    if (str.includes('Hora') || str.includes('h')) {
      const h = str.match(/(\d+)/);
      if (h) setHours(h[1]);
    }
    if (str.includes('día') || str.includes('d')) {
      const d = str.match(/(\d+)/);
      if (d) setDays(d[1]);
    }
    // Blockers
    if (str.includes('Inmediato')) {
      setMinutes('0'); setHours('0'); setDays('0');
    }
  };

  // Pre-fill data
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
      // Construct urgency string
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
      alert("Por favor inserta un título para el acuerdo.");
    }
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTitle("Política de 'Cámaras Opcionales'");
      setDesc("Para reducir la fatiga por zoom y la ansiedad social, se acuerda que el uso de cámaras es completamente opcional.");
      setRules([
        "Cámara opcional en reuniones internas.",
        "Cámara recomendada (no obligatoria) con clientes nuevos.",
        "Obligatorio: Foto de perfil clara si no hay cámara."
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-20">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-text-n900">Crear un Nuevo Acuerdo Vivo</h2>
          <p className="text-gray-600 mt-2 font-medium">Define expectativas claras para que todo el equipo sepa cómo colaborar mejor.</p>
        </div>
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="hidden md:flex items-center gap-2 bg-primary hover:brightness-110 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-primary/40"
          aria-label="Sugerir contenido usando Inteligencia Artificial"
        >
          {isGenerating ? (
            <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
          ) : (
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
          )}
          {isGenerating ? 'Generando...' : 'Sugerir con IA'}
        </button>
      </header>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-border p-8 rounded-xl space-y-8 shadow-xl shadow-primary/5">

        {/* Botón IA Móvil */}
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="md:hidden w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border-2 border-primary/20 px-4 py-2 rounded-lg text-xs font-bold mb-4 active:bg-primary/20"
        >
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          Sugerir Contenido con IA
        </button>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-lg font-bold text-text-n900">Nombre del Acuerdo</label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 font-medium"
            placeholder="Ej. Ventanas de Respuesta Rápida"
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="category" className="block text-lg font-bold text-text-n900">Categoría</label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-white appearance-none cursor-pointer font-medium"
              >
                <option>Comunicación</option>
                <option>Foco</option>
                <option>Feedback</option>
                <option>Social</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="visibility" className="block text-lg font-bold text-text-n900">Visibilidad</label>
            <div className="relative">
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-white appearance-none cursor-pointer font-medium"
              >
                <option value="Team">Equipo (Miembros)</option>
                <option value="Organization">Organización (Global)</option>
                <option value="Private">Privado (Solo yo)</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">visibility</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-lg font-bold text-text-n900">Urgencia Esperada</label>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-border">
              <p className="text-xs text-gray-500 mb-3 font-bold uppercase tracking-wider">Tiempo de respuesta máximo</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min="0"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full h-12 pl-3 pr-8 rounded-lg border border-gray-300 font-bold text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="0"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 pointer-events-none uppercase">Días</span>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full h-12 pl-3 pr-8 rounded-lg border border-gray-300 font-bold text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="0"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 pointer-events-none uppercase">Hrs</span>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-full h-12 pl-3 pr-8 rounded-lg border border-gray-300 font-bold text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="0"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 pointer-events-none uppercase">Min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="deadline" className="block text-lg font-bold text-text-n900">Fecha Límite (Opcional)</label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="desc" className="block text-lg font-bold text-text-n900">Propósito (El "Por Qué")</label>
          <div className="relative">
            <textarea
              id="desc"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 font-medium resize-none"
              placeholder="Describe por qué este acuerdo es importante para el bienestar del equipo..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-lg font-bold text-text-n900">Reglas del Juego (El "Cómo")</label>
            <button type="button" onClick={addRule} className="text-sm font-bold text-primary hover:underline">+ Añadir Regla</button>
          </div>

          <div className="space-y-3">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-2 animate-fade-in">
                <span className="flex-shrink-0 w-8 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 font-bold">{idx + 1}</span>
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateRule(idx, e.target.value)}
                  placeholder={`Regla nº ${idx + 1}`}
                  className="flex-grow p-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-medium"
                />
                {rules.length > 1 && (
                  <button type="button" onClick={() => removeRule(idx)} className="text-gray-400 hover:text-red-500 p-2">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-transparent text-gray-500 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:text-text-n900 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-[2] bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Publicar Acuerdo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgreementForm;
