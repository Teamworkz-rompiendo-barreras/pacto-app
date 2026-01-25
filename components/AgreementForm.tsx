
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
  const [urgency, setUrgency] = useState('15 Min'); // Default value
  const [deadline, setDeadline] = useState(''); // Optional deadline
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-fill data if available
  useEffect(() => {
    if (initialData) {
      if (initialData.title) setTitle(initialData.title);
      if (initialData.description) setDesc(initialData.description);
      if (initialData.category) setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        title,
        description: desc,
        category: category as any,
        urgency, // New field, assuming types.ts will be updated or it accepts partial
        deadline // New field
      });
    } else {
      alert("Por favor inserta un título para el acuerdo.");
    }
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTitle("Política de 'Cámaras Opcionales'");
      setDesc("Para reducir la fatiga por zoom y la ansiedad social, se acuerda que el uso de cámaras es completamente opcional en todas las reuniones internas, excepto en la social mensual.");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="urgency" className="block text-lg font-bold text-text-n900">Urgencia Esperada</label>
            <div className="relative">
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none bg-white appearance-none cursor-pointer font-medium"
              >
                <option>Inmediato (Blocker)</option>
                <option>15 Min</option>
                <option>4 Horas</option>
                <option>24 Horas</option>
                <option>3 días</option>
                <option>Sin urgencia</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
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
          <label htmlFor="desc" className="block text-lg font-bold text-text-n900">Descripción del Acuerdo</label>
          <div className="relative">
            <textarea
              id="desc"
              rows={5}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-4 border-2 border-gray-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 font-medium resize-none"
              placeholder="Describe qué se espera de este acuerdo y por qué es importante para el equipo..."
            />
            {isGenerating && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                <span className="text-primary font-bold animate-pulse">Redactando...</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Usa un lenguaje directo, positivo y libre de ambigüedades.
          </p>
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
