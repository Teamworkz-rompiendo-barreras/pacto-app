import React, { useState } from 'react';
import { wellbeingService } from '../services/wellbeingService';

interface InclusionBoxProps {
  onBack: () => void;
}

const InclusionBox: React.FC<InclusionBoxProps> = ({ onBack }) => {
  const [category, setCategory] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [impact, setImpact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !suggestion.trim() || !impact.trim()) return;

    setIsSubmitting(true);

    try {
      await wellbeingService.submitSuggestion({
        category,
        suggestion,
        impact
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setCategory('');
        setSuggestion('');
        setImpact('');
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitting(false);
      alert("Error al enviar la sugerencia. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 animate-fade-in relative pb-20">

      <div className="mb-10 space-y-2 lg:pr-64">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors w-fit mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Volver
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <span className="material-symbols-outlined text-sm">mark_email_unread</span>
          Buzón de Inclusión
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-n900 tracking-tight leading-tight">
          Buzón de Sugerencias
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-lg leading-relaxed">
          Un espacio seguro y anónimo diseñado para escuchar tu voz y mejorar juntos nuestra cultura laboral.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-gray-100 overflow-hidden">

        {/* Aviso de Privacidad */}
        <div className="bg-[#EEF2FF] p-6 border-b border-[#E0E7FF] flex gap-4 items-start">
          <div className="size-10 rounded-full bg-[#374BA6] flex items-center justify-center shrink-0 mt-1">
            <span className="material-symbols-outlined text-white text-xl">security</span>
          </div>
          <div>
            <h3 className="text-[#374BA6] font-bold text-sm mb-1 uppercase tracking-wide">Aviso de Privacidad</h3>
            <p className="text-[#4338ca] text-sm leading-relaxed">
              Tu identidad está 100% protegida. No recolectamos nombres, correos ni direcciones IP. Este es un canal anónimo dedicado a tu seguridad psicológica.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Categoría */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-bold text-text-n900">
              Tipo de sugerencia
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none cursor-pointer font-medium text-gray-700"
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option value="entorno_fisico">Entorno Físico / Sensorial</option>
                <option value="comunicacion">Comunicación y Herramientas</option>
                <option value="cultura">Cultura y Convivencia</option>
                <option value="procesos">Procesos y Rituales</option>
                <option value="otro">Otro</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Sugerencia */}
          <div className="space-y-2">
            <label htmlFor="suggestion" className="block text-sm font-bold text-text-n900">
              Tu sugerencia
            </label>
            <textarea
              id="suggestion"
              rows={4}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none font-medium placeholder:text-gray-400"
              placeholder="Describe detalladamente el cambio o mejora que propones..."
              required
            />
            <p className="text-xs text-gray-400 italic text-right">Evita incluir nombres propios para mantener el anonimato.</p>
          </div>

          {/* Impacto */}
          <div className="space-y-2">
            <label htmlFor="impact" className="block text-sm font-bold text-text-n900">
              Impacto esperado
            </label>
            <textarea
              id="impact"
              rows={3}
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none font-medium placeholder:text-gray-400"
              placeholder="¿Cómo crees que este cambio ayudaría al equipo o a personas neurodivergentes?"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!category || !suggestion.trim() || !impact.trim() || isSubmitting}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin">refresh</span>
                Enviando...
              </>
            ) : (
              <>
                Enviar sugerencia de forma anónima
                <span className="material-symbols-outlined">send</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-gray-400 text-center leading-normal px-4">
            Al enviar, confirmas que esta información será compartida con el equipo de RRHH y Diversidad de forma agregada.
          </p>

        </form>
      </div>

      <div className="mt-12 text-center opacity-60">
        <p className="text-xs font-bold tracking-widest uppercase text-text-n900 mb-1">PACTO • Inclusion by Design</p>
        <p className="text-[10px] text-gray-500">© 2024 PACTO. Todos los derechos reservados.</p>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center max-w-sm mx-4 transform scale-100 animate-bounce-in">
            <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-text-n900 mb-2">¡Recibido!</h3>
            <p className="text-gray-600 font-medium">
              Tu sugerencia ha sido enviada al buzón de forma segura y anónima. Gracias por ayudarnos a mejorar.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default InclusionBox;
