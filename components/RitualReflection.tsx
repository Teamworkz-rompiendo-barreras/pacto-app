
import React, { useState } from 'react';

import { Agreement } from '../types';

interface RitualReflectionProps {
  onNext: () => void;
  userAvatar?: string;
  agreements: Agreement[];
}

const RitualReflection: React.FC<RitualReflectionProps> = ({ onNext, userAvatar, agreements }) => {
  // State to track the decision for each agreement: 'keep', 'adjust', or null
  const [decisions, setDecisions] = useState<Record<string, 'keep' | 'adjust' | null>>(() => {
    const initial: Record<string, 'keep' | 'adjust' | null> = {};
    agreements.forEach(a => initial[a.id] = null);
    return initial;
  });

  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const handleDecisionChange = (id: string, decision: 'keep' | 'adjust') => {
    setDecisions(prev => ({ ...prev, [id]: decision }));
  };

  const handleFeedbackChange = (id: string, text: string) => {
    setFeedback(prev => ({ ...prev, [id]: text }));
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Comunicación': return { color: 'bg-blue-100 text-blue-800', accent: 'bg-primary/80', icon: 'chat', iconColor: 'text-primary' };
      case 'Reuniones': return { color: 'bg-amber-100 text-amber-800', accent: 'bg-amber-500/80', icon: 'calendar_month', iconColor: 'text-amber-600' };
      case 'Feedback': return { color: 'bg-emerald-100 text-emerald-800', accent: 'bg-emerald-600/80', icon: 'rate_review', iconColor: 'text-emerald-700' };
      case 'Foco': return { color: 'bg-purple-100 text-purple-800', accent: 'bg-purple-600/80', icon: 'timer', iconColor: 'text-purple-700' };
      default: return { color: 'bg-gray-100 text-gray-800', accent: 'bg-gray-500/80', icon: 'article', iconColor: 'text-gray-700' };
    }
  };

  const reviewedCount = Object.values(decisions).filter(v => v !== null).length;

  return (
    <div className="bg-[#F0E8D1] min-h-screen flex flex-col text-text-n900 antialiased font-display selection:bg-primary/20 animate-fade-in">
      {/* Top Navigation */}


      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col gap-8">
        {/* Progress Bar & Breadcrumbs */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <span>Primer Ritual</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-primary font-bold">Paso 2 de 4</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#D4CDB6]/50 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-4 md:pr-20">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-n900 leading-[1.15]">
            Reflexión y Ajuste
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-medium">
            Tómate un momento para revisar lo que seleccionaste. Este es tu espacio para moldear cómo trabajamos juntos. Si algo no se siente bien, propón un cambio.
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col gap-8 mt-4 pb-24">
          {agreements.map((agreement) => {
            const styles = getCategoryStyles(agreement.category);
            return (
              <article
                key={agreement.id}
                className="group relative bg-[#FCFBF7] rounded-2xl shadow-sm border border-[#E6E2D6] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full ${styles.accent}`}></div>
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${styles.color}`}>
                        {agreement.category}
                      </span>
                    </div>
                    <div className={`hidden sm:flex shrink-0 size-12 items-center justify-center rounded-full bg-[#F0E8D1] ${styles.iconColor}`}>
                      <span className="material-symbols-outlined text-2xl">{styles.icon}</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-[#E6E2D6]"></div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4">
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">¿Cómo te sientes con esto?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Option 1: Keep */}
                      <label className="cursor-pointer relative group/option">
                        <input
                          type="radio"
                          name={`agreement_${agreement.id}`}
                          className="peer sr-only"
                          checked={decisions[agreement.id] === 'keep'}
                          onChange={() => handleDecisionChange(agreement.id, 'keep')}
                        />
                        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#E6E2D6] bg-white transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/40">
                          <div className="flex items-center gap-3">
                            <div className="size-5 rounded-full border border-current text-primary flex items-center justify-center">
                              <div className="size-2.5 rounded-full bg-current opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="font-semibold text-text-n900">Mantener como está</span>
                          </div>
                          <span className="material-symbols-outlined text-[#6C7D64]">thumb_up</span>
                        </div>
                      </label>

                      {/* Option 2: Adjust */}
                      <label className="cursor-pointer relative group/option">
                        <input
                          type="radio"
                          name={`agreement_${agreement.id}`}
                          className="peer sr-only"
                          checked={decisions[agreement.id] === 'adjust'}
                          onChange={() => handleDecisionChange(agreement.id, 'adjust')}
                        />
                        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#E6E2D6] bg-white transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/40">
                          <div className="flex items-center gap-3">
                            <div className="size-5 rounded-full border border-current text-primary flex items-center justify-center">
                              <div className="size-2.5 rounded-full bg-current opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="font-semibold text-text-n900">Necesita un ajuste</span>
                          </div>
                          <span className="material-symbols-outlined text-primary">edit_note</span>
                        </div>
                      </label>
                    </div>

                    {/* Expanded Text Area for Feedback */}
                    {decisions[agreement.id] === 'adjust' && (
                      <div className="mt-2 animate-fade-in">
                        <label className="block text-sm font-bold text-text-n900 mb-2">Propuesta de cambio:</label>
                        <textarea
                          className="w-full rounded-xl border-2 border-primary/30 bg-white p-4 text-base focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none transition-shadow shadow-sm outline-none"
                          placeholder="Describe cómo te gustaría adaptar este acuerdo... Por ejemplo: 'Prefiero que sea 48h antes para temas complejos'."
                          rows={3}
                          value={feedback[agreement.id] || ''}
                          onChange={(e) => handleFeedbackChange(agreement.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Footer / CTA */}
      <div className="sticky bottom-0 z-40 bg-[#F0E8D1]/90 border-t border-[#D4CDB6] backdrop-blur-md py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold text-gray-600 hidden sm:block">
            {reviewedCount} de {agreements.length} acuerdos revisados
          </div>
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 focus:ring-4 focus:ring-primary/30"
          >
            <span>Continuar a Conclusiones</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RitualReflection;
