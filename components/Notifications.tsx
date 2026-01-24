
import React, { useState } from 'react';

interface NotificationsProps {
  onBack: () => void;
  onMarkRead?: () => void;
  onConfigure: () => void;
  onViewItem: (type: 'agreement' | 'ritual' | 'report' | 'accessibility' | 'weekly') => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack, onMarkRead, onConfigure, onViewItem }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleMarkAllAsRead = () => {
    if (onMarkRead) onMarkRead();
    const btn = document.getElementById('mark-read-btn');
    if (btn) {
        const originalText = btn.innerText;
        btn.innerText = '¡Leídas!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 1500);
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      setHasMore(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1 max-w-[800px] mx-auto w-full animate-fade-in pb-12">
      
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6 md:hidden">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-bold"
        >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Volver
        </button>
      </div>

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-text-n900 text-4xl font-black leading-tight tracking-tight">Centro de Notificaciones</h1>
          <p className="text-gray-600 text-base font-normal">Gestiona tus actualizaciones y recordatorios de inclusión.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button 
            id="mark-read-btn"
            onClick={handleMarkAllAsRead}
            className="flex items-center justify-center rounded-xl h-11 px-6 bg-primary text-white text-sm font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Marcar todas como leídas
          </button>
          <button 
            onClick={onConfigure}
            className="text-primary text-sm font-bold hover:underline flex items-center gap-1 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:rotate-45 transition-transform">settings</span>
            Configuración de Notificaciones
          </button>
        </div>
      </div>

      {/* Notification Content Area */}
      <div className="flex flex-col gap-8">
        
        {/* Section: Hoy */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-text-n900 text-lg font-bold tracking-tight">Hoy</h3>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Item 0 - Weekly Summary (NEW) */}
          <div 
            onClick={() => onViewItem('weekly')}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-primary/5 to-white border border-primary/20 rounded-xl p-5 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-s3"></div>
            <div className="flex items-center justify-center rounded-lg bg-secondary-s3 text-white shrink-0 size-12 group-hover:scale-110 transition-transform shadow-sm">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="flex flex-col flex-1 gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-text-n900 font-bold text-base group-hover:text-primary transition-colors">Tu Resumen Semanal está listo</p>
                <p className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">¡Nuevo!</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Descubre tus logros de la semana y tips personalizados de bienestar.</p>
            </div>
          </div>

          {/* Item 1 - Acuerdo */}
          <div 
            onClick={() => onViewItem('agreement')}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all overflow-hidden cursor-pointer"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">handshake</span>
            </div>
            <div className="flex flex-col flex-1 gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-text-n900 font-bold text-base group-hover:text-primary transition-colors">Nuevo Acuerdo Creado</p>
                <p className="text-gray-400 text-xs font-medium">Hace 10 min</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Se ha formalizado el acuerdo de flexibilidad horaria con el equipo de diseño.</p>
            </div>
          </div>

          {/* Item 2 - Ritual */}
          <div 
            onClick={() => onViewItem('ritual')}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-blue-50/50 border border-primary/20 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary transition-all overflow-hidden cursor-pointer"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-center justify-center rounded-lg bg-primary text-white shrink-0 size-12 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <div className="flex flex-col flex-1 gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-text-n900 font-bold text-base group-hover:text-primary transition-colors">Próximo Ritual: Replay Semanal</p>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">En 15 min</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Prepara tus notas y revisa los logros de la semana. Haz clic para ver detalles.</p>
            </div>
          </div>
        </div>

        {/* Section: Ayer */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-text-n900 text-lg font-bold tracking-tight">Ayer</h3>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Item 3 - Reports */}
          <div 
            onClick={() => onViewItem('report')}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/60 border border-gray-200 rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-center rounded-lg bg-green-100 text-green-700 shrink-0 size-12 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">insights</span>
            </div>
            <div className="flex flex-col flex-1 gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-text-n900 font-bold text-base group-hover:text-primary transition-colors">Métrica Actualizada</p>
                <p className="text-gray-400 text-xs font-medium">Ayer, 14:20</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">El índice de bienestar del departamento ha subido un 5% este mes.</p>
            </div>
          </div>

          {/* Item 4 - Accessibility */}
          <div 
            onClick={() => onViewItem('accessibility')}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/60 border border-gray-200 rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-center rounded-lg bg-orange-100 text-orange-600 shrink-0 size-12 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">accessibility_new</span>
            </div>
            <div className="flex flex-col flex-1 gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-text-n900 font-bold text-base group-hover:text-primary transition-colors">Recordatorio de Accesibilidad</p>
                <p className="text-gray-400 text-xs font-medium">Ayer, 09:15</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Recuerda añadir texto alternativo a las imágenes de tu última presentación para asegurar la inclusión de todo el equipo.</p>
            </div>
          </div>
        </div>

        {/* Pagination / Footer */}
        {hasMore && (
            <div className="mt-4 flex justify-center">
            <button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="text-primary font-bold text-sm flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/10 hover:bg-primary/5 transition-all disabled:opacity-50"
            >
                {isLoadingMore ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                        Cargando...
                    </>
                ) : (
                    <>
                        Cargar notificaciones anteriores
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                    </>
                )}
            </button>
            </div>
        )}
        
        {!hasMore && (
            <p className="text-center text-gray-400 text-sm font-medium mt-4">No tienes más notificaciones.</p>
        )}

      </div>
    </div>
  );
};

export default Notifications;
