
import React, { useState, useRef } from 'react';
import { Agreement } from '../types';

interface AgreementDetailsProps {
  agreement?: Agreement;
  onEdit?: () => void;
  onArchive?: () => void;
  onBack?: () => void;
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

const AgreementDetails: React.FC<AgreementDetailsProps> = ({ agreement, onEdit, onArchive, onBack }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'discussion' | 'history'>('rules');

  const title = agreement?.title || 'Sin Título';
  const category = agreement?.category || 'General';
  const description = agreement?.description || 'Sin descripción';

  const [newComment, setNewComment] = useState('');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'Pau Pérez',
      initials: 'PP',
      time: 'Hace 2 horas',
      text: '¿Podríamos ajustar la norma 2 para que sea más flexible los viernes?',
      likes: 2,
      color: 'bg-indigo-500 text-white'
    }
  ]);

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
    <div className="max-w-5xl mx-auto w-full animate-fade-in pb-20 px-4">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-n900/40 hover:text-primary font-black text-xs uppercase tracking-widest transition-all"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver al Panel
        </button>
      </div>

      {/* Header section with Premium Card */}
      <section className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 md:p-12 border border-white/40 shadow-2xl shadow-primary/5 flex flex-col md:flex-row items-start justify-between gap-8 mb-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 size-48 bg-primary/5 rounded-bl-[200px] -z-10 group-hover:scale-110 transition-transform duration-700"></div>

        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
              {agreement?.status || 'Activo'}
            </span>
            <span className="px-3 py-1 bg-white border border-primary/20 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
              {category}
            </span>
            <span className="px-3 py-1 bg-white border border-purple-200 text-purple-600 text-[10px] font-black rounded-full uppercase tracking-widest">
              {agreement?.visibility === 'Organization' ? 'Global' : (agreement?.visibility === 'Private' ? 'Privado' : 'Equipo')}
            </span>
          </div>

          <h1 className="font-display text-text-n900 text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-text-n900/60 text-lg md:text-xl font-bold leading-relaxed max-w-2xl italic">
            &ldquo;{description}&rdquo;
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 bg-text-n900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            Editar Acuerdo
          </button>
          {onArchive && agreement?.status !== 'Archivado' && (
            <button
              onClick={onArchive}
              className="flex items-center justify-center gap-2 bg-white border-2 border-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all"
            >
              <span className="material-symbols-outlined text-lg">archive</span>
              Archivar
            </button>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Navigation - Vertical for Desktop */}
        <aside className="lg:col-span-3 space-y-3 sticky top-24 h-fit order-2 lg:order-1">
          <button
            onClick={() => setActiveTab('rules')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'rules' ? 'bg-primary text-white shadow-xl shadow-primary/30 translate-x-2' : 'bg-white/40 hover:bg-white/60 text-text-n900/50'}`}
          >
            <span className="material-symbols-outlined">gavel</span>
            Normas
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'discussion' ? 'bg-primary text-white shadow-xl shadow-primary/30 translate-x-2' : 'bg-white/40 hover:bg-white/60 text-text-n900/50'}`}
          >
            <span className="material-symbols-outlined">comment</span>
            Discusión
            <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'discussion' ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
              {comments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-primary text-white shadow-xl shadow-primary/30 translate-x-2' : 'bg-white/40 hover:bg-white/60 text-text-n900/50'}`}
          >
            <span className="material-symbols-outlined">history</span>
            Historial
          </button>

          {/* Health Score Mini Widget */}
          <div className="mt-12 p-8 bg-gradient-to-br from-green-500 to-green-600 rounded-[32px] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] size-24 bg-white/10 rounded-full blur-xl"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Salud del Pacto</p>
            <div className="text-5xl font-black mb-2 leading-none">92%</div>
            <p className="text-xs font-bold leading-relaxed opacity-90">El equipo ha reportado un cumplimiento excelente este mes.</p>
          </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-9 order-1 lg:order-2">
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4 px-2">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined font-bold">format_list_bulleted</span>
                </div>
                <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">Normas y Guías</h2>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-[32px] p-8 md:p-10 shadow-sm space-y-4">
                {agreement?.rules && agreement.rules.length > 0 ? (
                  agreement.rules.map((rule, idx) => (
                    <div key={idx} className="group flex items-start gap-6 p-6 bg-white/50 hover:bg-white rounded-[24px] border border-black/5 transition-all">
                      <div className="size-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-sm shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                        {idx + 1}
                      </div>
                      <p className="text-text-n900 font-bold text-lg leading-relaxed pt-1">
                        {rule}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-4">list_alt</span>
                    <p className="text-gray-400 font-bold tracking-tight">No hay normas definidas por ahora.</p>
                  </div>
                )}
              </div>

              {/* Urgency & Deadline Extras */}
              {(agreement?.urgency || agreement?.deadline) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {agreement.urgency && (
                    <div className="bg-pink-50 p-8 rounded-[32px] border border-pink-100 flex items-center gap-6">
                      <div className="size-14 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-200">
                        <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-1">Nivel de Urgencia</p>
                        <p className="text-xl font-black text-pink-900">{agreement.urgency}</p>
                      </div>
                    </div>
                  )}
                  {agreement.deadline && (
                    <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100 flex items-center gap-6">
                      <div className="size-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <span className="material-symbols-outlined text-3xl font-bold">event</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Fecha Límite</p>
                        <p className="text-xl font-black text-blue-900">{agreement.deadline}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-4 px-2">
                <div className="size-10 rounded-xl bg-secondary-s3/10 flex items-center justify-center text-secondary-s3">
                  <span className="material-symbols-outlined font-bold">chat</span>
                </div>
                <h2 className="font-display text-2xl font-black text-text-n900 tracking-tight uppercase">Mesa de Diálogo</h2>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white/60 backdrop-blur-sm border border-white/60 p-6 rounded-[24px] flex gap-5 animate-fade-in hover:shadow-lg transition-all">
                    <div className={`size-12 rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg ${comment.color}`}>
                      {comment.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <p className="font-black text-text-n900">{comment.user}</p>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed mb-4">{comment.text}</p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleReply(comment.user)}
                          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:scale-105 transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">reply</span>
                          Responder
                        </button>
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-sm">thumb_up</span>
                          {comment.likes > 0 ? comment.likes : 'Me gusta'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[32px] p-8 shadow-xl border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">Añadir Comentario</p>
                <textarea
                  ref={commentInputRef}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-[24px] p-6 font-bold text-text-n900 outline-none transition-all shadow-inner resize-none min-h-[120px]"
                  placeholder="Escribe tu opinión o sugerencia aquí..."
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-lg">send</span>
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white/40 backdrop-blur-sm border border-black/5 p-20 rounded-[40px] text-center">
              <div className="size-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
              </div>
              <h3 className="text-xl font-black text-text-n900 uppercase tracking-tight mb-2">Historial de Versiones</h3>
              <p className="text-gray-400 font-bold max-w-xs mx-auto">Aún no se han realizado modificaciones estructurales en este pacto.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AgreementDetails;
