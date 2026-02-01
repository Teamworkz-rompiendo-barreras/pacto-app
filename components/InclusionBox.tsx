
import React, { useState } from 'react';
import { wellbeingService } from '../services/wellbeingService';
import { PageContainer } from './common/PageContainer';
import { PageHeader } from './common/PageHeader';

const InclusionBox: React.FC = () => {
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
      await wellbeingService.submitSuggestion({ category, suggestion, impact });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setCategory('');
        setSuggestion('');
        setImpact('');
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      setIsSubmitting(false);
      alert("Error al enviar. Intenta de nuevo.");
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Escucha Activa"
        subtitle="Un canal de comunicación 100% anónimo para mejorar nuestra cultura."
        actionButton={
          <div className="flex items-center gap-3 bg-indigo-50 px-5 py-2.5 rounded-2xl border border-indigo-100">
            <span className="material-symbols-outlined text-indigo-500">verified_user</span>
            <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Canal Cifrado</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 relative">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 md:p-12 border border-white/60 shadow-xl shadow-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 size-32 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-n900 tracking-widest px-1">Área de Mejora</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: 'entorno_fisico', label: 'Sensorial', icon: 'visibility' },
                    { id: 'comunicacion', label: 'Comunicación', icon: 'chat' },
                    { id: 'cultura', label: 'Cultura', icon: 'diversity_1' },
                    { id: 'procesos', label: 'Procesos', icon: 'account_tree' },
                    { id: 'otro', label: 'Otro', icon: 'more_horiz' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${category === cat.id ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-gray-50 border-transparent text-gray-400 hover:border-primary/20 hover:text-primary'}`}
                    >
                      <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-n900 tracking-widest px-1">Tu Sugerencia</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[24px] px-8 py-6 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none text-lg"
                  placeholder="Describe el cambio que te gustaría ver..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-text-n900 tracking-widest px-1">¿Qué impacto tendría?</label>
                <textarea
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[24px] px-8 py-6 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none text-lg"
                  placeholder="¿Cómo ayudaría esto al equipo?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !category}
                className="w-full bg-primary text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30"
              >
                {isSubmitting ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span>Enviar de forma Anónima</span>}
                <span className="material-symbols-outlined">shield</span>
              </button>
            </form>

            {showSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center p-12 text-center animate-fade-in z-20 rounded-[40px]">
                <div className="space-y-6 animate-scale-in">
                  <div className="size-24 bg-green-500 text-white rounded-[32px] flex items-center justify-center mx-auto shadow-2xl rotate-12">
                    <span className="material-symbols-outlined text-5xl">verified</span>
                  </div>
                  <h3 className="font-display text-4xl font-black uppercase tracking-tight">¡Enviado!</h3>
                  <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-sm">Tu voz ha sido guardada en el buzón. Gracias por ayudarnos a ser mejores.</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-indigo-600 text-white p-10 rounded-[40px] shadow-2xl shadow-indigo-100 relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] size-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl font-black">security</span>
              </div>
              <h3 className="font-display text-2xl font-black uppercase tracking-tight">Privacidad Total</h3>
              <p className="text-white/80 font-bold leading-relaxed italic">
                &ldquo;Ni nombres, ni correos, ni IPs. Pacto elimina cualquier rastro para que puedas hablar con libertad absoluta.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 border border-white/60 shadow-xl shadow-primary/5 space-y-6">
            <h4 className="font-display text-lg font-black uppercase tracking-widest px-2">Cultura de Escucha</h4>
            <div className="space-y-4">
              {[
                { title: 'Transparencia', icon: 'insights' },
                { title: 'Seguridad Psicológica', icon: 'psychology' },
                { title: 'Mejora Continua', icon: 'trending_up' }
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
};

export default InclusionBox;
