
import React, { useState } from 'react';
import { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  onBack: () => void;
  onMarkRead?: () => void;
  onConfigure: () => void;
  onViewItem: (type: 'agreement' | 'ritual' | 'report' | 'accessibility' | 'weekly' | 'tip') => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onBack, onMarkRead, onConfigure, onViewItem }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleMarkAllAsRead = () => {
    if (onMarkRead) onMarkRead();
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Hoy, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  // Group notifications by Today / Earlier could be done here, but simple list for now is better than hardcoded.

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
      <div className="flex flex-col gap-4">

        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">notifications_off</span>
            <p className="text-gray-500 font-medium">No tienes notificaciones nuevas.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onViewItem(notif.type)}
              className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border ${notif.isRead ? 'border-gray-100 opacity-80' : 'border-primary/30 shadow-sm'} rounded-xl p-5 hover:shadow-md transition-all overflow-hidden cursor-pointer`}
            >
              {!notif.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              )}

              <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 group-hover:scale-110 transition-transform ${notif.type === 'tip' ? 'bg-secondary-s3/10 text-secondary-s3' :
                  notif.type === 'weekly' ? 'bg-purple-100 text-purple-600' :
                    'bg-blue-50 text-blue-600'
                }`}>
                <span className="material-symbols-outlined">
                  {notif.type === 'tip' ? 'lightbulb' :
                    notif.type === 'weekly' ? 'auto_awesome' :
                      notif.type === 'agreement' ? 'handshake' : 'notifications'}
                </span>
              </div>

              <div className="flex flex-col flex-1 gap-1 w-full">
                <div className="flex justify-between items-center w-full">
                  <p className={`text-text-n900 font-bold text-base group-hover:text-primary transition-colors ${!notif.isRead ? 'text-black' : 'text-gray-600'}`}>
                    {notif.title}
                  </p>
                  <p className="text-gray-400 text-xs font-medium whitespace-nowrap ml-2">{formatDate(notif.date)}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{notif.message}</p>
                {notif.sender && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="size-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] overflow-hidden">
                      {notif.sender.avatar ? <img src={notif.sender.avatar} alt={notif.sender.name} className="size-full object-cover" /> : notif.sender.name[0]}
                    </div>
                    <span className="text-xs text-gray-500 font-bold">Enviado por {notif.sender.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Notifications;
