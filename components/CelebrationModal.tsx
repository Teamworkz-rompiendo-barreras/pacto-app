
import React, { useEffect } from 'react';

interface CelebrationModalProps {
  onClose: () => void;
  onShare?: () => void;
  title?: string;
  subtitle?: string;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ 
  onClose, 
  onShare, 
  title = "¡Primer acuerdo creado!", 
  subtitle = "Has dado el primer paso para una colaboración más clara e inclusiva. Tu equipo te lo agradecerá."
}) => {
  
  // Efecto de confeti simple al montar (opcional, aquí usamos solo CSS/animación)
  useEffect(() => {
    // Podríamos disparar confeti JS aquí si tuviéramos la librería
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative group bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full animate-bounce-in">
        
        {/* Barra de Acento Superior */}
        <div className="h-2 w-full flex">
            <div className="h-full flex-1 bg-p1"></div>
            <div className="h-full flex-1 bg-secondary-s3"></div>
            <div className="h-full flex-1 bg-primary"></div>
        </div>

        <div className="p-8 md:p-12 flex flex-col items-center text-center">
            
            {/* Iconos Festivos */}
            <div className="mb-6 flex items-center justify-center gap-4">
                <span className="material-symbols-outlined text-p1 text-5xl animate-pulse">auto_awesome</span>
                <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="material-symbols-outlined text-primary text-6xl">task_alt</span>
                </div>
                <span className="material-symbols-outlined text-secondary-s3 text-5xl animate-pulse">celebration</span>
            </div>

            {/* Texto Principal */}
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">¡LOGRO ALCANZADO!</p>
            <h2 className="text-text-n900 text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
                {title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-8">
                {subtitle}
            </p>

            {/* Caja de Resumen */}
            <div className="w-full bg-bg-s1/50 border-2 border-dashed border-primary/20 rounded-xl p-6 mb-8 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-6xl text-primary">description</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-sm">verified</span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Acuerdo registrado</span>
                </div>
                <p className="text-text-n900 text-xl font-bold">Protocolo de Comunicación</p>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Creado hoy • Disponible para el equipo
                </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button 
                    onClick={onClose}
                    className="flex-1 min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold transition-transform active:scale-95 hover:brightness-110 shadow-lg shadow-primary/20 flex gap-2"
                >
                    <span>Ver mi Dashboard</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button 
                    onClick={onShare || onClose}
                    className="flex-1 min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white border-2 border-gray-100 text-text-n900 text-base font-bold transition-transform active:scale-95 hover:bg-gray-50 flex gap-2"
                >
                    <span className="material-symbols-outlined">share</span>
                    <span>Compartir</span>
                </button>
            </div>

            {/* Meta info */}
            <p className="text-gray-400 text-sm font-medium mt-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">info</span>
                Este documento ya está disponible para revisión.
            </p>
        </div>

        {/* Decoración Inferior */}
        <div className="flex justify-center pb-6 opacity-30 gap-6">
             <div className="size-4 rounded-full bg-p1 animate-bounce [animation-delay:-0.3s]"></div>
             <div className="size-4 rounded-full bg-secondary-s3 animate-bounce [animation-delay:-0.15s]"></div>
             <div className="size-4 rounded-full bg-primary animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;
