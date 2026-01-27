
import React, { useState, useRef } from 'react';

import { Agreement } from '../types';

interface AgreementDetailsProps {
  agreement?: Agreement; // Now accepting the actual data
  onBack: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
}

interface Comment {
  id: number;
  user: string;
  initials: string;
  time: string;
  text: string;
  likes: number;
  color: string;
}

const AgreementDetails: React.FC<AgreementDetailsProps> = ({ agreement, onBack, onEdit, onArchive }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'discussion' | 'history'>('rules');

  // Default fallback if no agreement passed (safe-guard)
  const title = agreement?.title || 'Sin Título';
  const category = agreement?.category || 'General';
  const description = agreement?.description || 'Sin descripción';
  const urgency = (agreement as any)?.urgency || 'Estándar'; // Cast as any if type not yet updated

  const [newComment, setNewComment] = useState('');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Start with EMPTY comments for new user experience
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          user: 'Tú',
          initials: 'YO',
          time: 'Ahora',
          text: newComment,
          likes: 0,
          color: 'bg-primary text-white'
        }
      ]);
      setNewComment('');
    }
  };

  const handleReply = (userName: string) => {
    setNewComment(`@${userName} `);
    commentInputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in pb-10">
      {/* Header de Navegación */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-bold mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Volver al Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl">forum</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-text-n900">{title}</h1>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border ${agreement?.status === 'Activo' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                  {agreement?.status || 'Activo'}
                </span>
                <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-gray-200">{category}</span>
                {agreement?.visibility && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border flex items-center gap-1 ${agreement.visibility === 'Organization' ? 'bg-purple-100 text-purple-700 border-purple-200' : (agreement.visibility === 'Private' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-blue-100 text-blue-700 border-blue-200')}`}>
                    <span className="material-symbols-outlined text-[12px]">{agreement.visibility === 'Organization' ? 'public' : (agreement.visibility === 'Private' ? 'lock' : 'group')}</span>
                    {agreement.visibility === 'Organization' ? 'Global' : (agreement.visibility === 'Private' ? 'Privado' : 'Equipo')}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                {description}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {onArchive && agreement?.status !== 'Archivado' && (
              <button
                onClick={onArchive}
                className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 transition-colors"
                title="Archivar/Desactivar Acuerdo"
              >
                <span className="material-symbols-outlined">archive</span>
              </button>
            )}
            <button className="p-2 rounded-lg border border-gray-border hover:bg-gray-50 text-gray-500" title="Compartir Acuerdo">
              <span className="material-symbols-outlined">ios_share</span>
            </button>
            <button
              onClick={onEdit}
              className="px-6 py-2 rounded-lg font-bold text-sm border-2 bg-white text-primary border-primary hover:bg-primary/5 transition-all"
            >
              Editar Acuerdo
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-border mb-8">
        <button
          onClick={() => setActiveTab('rules')}
          className={`pb-4 text-sm font-bold border-b-4 transition-colors ${activeTab === 'rules' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Reglas y Normas
        </button>
        <button
          onClick={() => setActiveTab('discussion')}
          className={`pb-4 text-sm font-bold border-b-4 transition-colors flex items-center gap-2 ${activeTab === 'discussion' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Discusión <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{comments.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-sm font-bold border-b-4 transition-colors ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Historial de Cambios
        </button>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'rules' && (
            <>
              <div className="bg-white border border-gray-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">rule</span>
                    Normas del Acuerdo
                  </h3>
                </div>

                <div className="space-y-3">
                  {agreement?.rules && agreement.rules.length > 0 ? (
                    agreement.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="flex items-center justify-center shrink-0 size-6 bg-primary/10 text-primary rounded-full text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-text-n900 font-medium leading-relaxed">{rule}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      No hay normas definidas aún.
                    </div>
                  )}
                </div>

                {/* Sección Extra: Urgencia y Deadline si existen */}
                {(agreement?.urgency || agreement?.deadline) && (
                  <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agreement.urgency && (
                      <div className="flex items-center gap-3 p-3 bg-red-50 text-red-900 rounded-lg border border-red-100">
                        <span className="material-symbols-outlined text-red-500">timer</span>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Urgencia</p>
                          <p className="font-bold">{agreement.urgency}</p>
                        </div>
                      </div>
                    )}
                    {agreement.deadline && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-900 rounded-lg border border-blue-100">
                        <span className="material-symbols-outlined text-blue-500">calendar_today</span>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Fecha Límite</p>
                          <p className="font-bold">{agreement.deadline}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-border p-4 rounded-xl flex gap-4 animate-fade-in">
                  <div className={`size-10 rounded-full flex items-center justify-center font-bold shrink-0 ${comment.color}`}>
                    {comment.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="font-bold text-sm">{comment.user}</p>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <div className="mt-2 flex gap-3">
                      <button
                        onClick={() => handleReply(comment.user)}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Responder
                      </button>
                      <button className="text-xs font-bold text-gray-500 hover:text-gray-700 flex items-center gap-1">
                        👍 {comment.likes > 0 && comment.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-4 border-t border-gray-100">
                <textarea
                  ref={commentInputRef}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Añade un comentario a la discusión..."
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:brightness-110"
                >
                  Comentar
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white border border-gray-border p-6 rounded-xl text-center text-gray-500">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">history</span>
              <p className="text-sm">No hay cambios recientes en este acuerdo.</p>
            </div>
          )}
        </div>

        {/* Sidebar Contextual */}
        <div className="space-y-6">
          {/* Widget de Salud del Acuerdo */}
          <div className="bg-white p-6 rounded-xl border border-gray-border shadow-sm">
            <h4 className="font-bold text-sm uppercase text-gray-500 mb-4 tracking-wider">Salud del Acuerdo</h4>
            <div className="flex flex-col items-center mb-4">
              <div className="relative size-32 mb-2">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-green-500" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-black text-text-n900">92%</span>
                </div>
              </div>
              <p className="text-xs font-bold text-center text-gray-600">El equipo se siente cómodo con este acuerdo.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgreementDetails;
