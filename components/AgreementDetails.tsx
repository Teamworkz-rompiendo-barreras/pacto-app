
import React, { useState, useRef } from 'react';

interface AgreementDetailsProps {
  onBack: () => void;
  onEdit?: () => void; // Prop opcional para manejar la navegación a edición
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

const AgreementDetails: React.FC<AgreementDetailsProps> = ({ onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'discussion' | 'history'>('rules');
  const [urgencyTime, setUrgencyTime] = useState('15 Min');
  const [newComment, setNewComment] = useState('');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: 'Juan Soto', initials: 'JS', time: 'Hace 2 horas', text: 'Creo que 15 minutos para urgencia alta es muy estresante si estamos en "Deep Work". ¿Podemos subirlo a 30?', likes: 2, color: 'bg-blue-200 text-blue-700' },
    { id: 2, user: 'Marta Ruiz', initials: 'MR', time: 'Ayer', text: 'Propongo añadir una regla sobre no enviar mensajes después de las 18:00.', likes: 0, color: 'bg-gray-200 text-gray-600' }
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
                 <h1 className="text-3xl font-black text-text-n900">Preferencias de Comunicación</h1>
                 <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-green-200">Activo</span>
               </div>
               <p className="text-lg text-gray-600 max-w-2xl">
                 Estándares acordados para el uso de Slack, Email y tiempos de respuesta para proteger el foco del equipo.
               </p>
             </div>
          </div>
          
          <div className="flex gap-3">
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
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    Tiempos de Respuesta
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-bold text-text-n900">Urgencia Alta (Blocker)</p>
                      <p className="text-xs text-gray-500">Servidor caído, cliente bloqueado.</p>
                    </div>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{urgencyTime}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-bold text-text-n900">Estándar (Slack/Email)</p>
                      <p className="text-xs text-gray-500">Preguntas generales, actualizaciones.</p>
                    </div>
                    <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-bold">4 Horas</span>
                  </div>
                </div>
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
