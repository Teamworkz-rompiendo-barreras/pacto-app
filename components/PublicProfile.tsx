
import React, { useState } from 'react';
import { UserProfile, Agreement } from '../types';

interface PublicProfileProps {
  user?: UserProfile; // Datos del usuario a mostrar
  agreements?: Agreement[]; // Acuerdos reales
  colleagues?: UserProfile[]; // Lista de compañeros para saludo
  onBack: () => void;
  onProposeAgreement: () => void;
}

const DEFAULT_COLLEAGUES: UserProfile[] = [];

const PublicProfile: React.FC<PublicProfileProps> = ({ user, agreements = [], onBack, onProposeAgreement, colleagues = DEFAULT_COLLEAGUES }) => {
  // Estado para feedback visual del saludo
  const [greetingSent, setGreetingSent] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Estado para el modal de selección
  const [showGreetingModal, setShowGreetingModal] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  // Si no hay usuario, mostrar estado de carga o error
  if (!user) {
    return (
      <div className="bg-bg-s1 dark:bg-gray-900 min-h-screen flex items-center justify-center text-text-n900 font-display">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-gray-400">person_off</span>
          <p className="text-xl font-bold">Usuario no encontrado</p>
          <button onClick={onBack} className="text-primary hover:underline">Volver</button>
        </div>
      </div>
    );
  }

  const displayUser = user;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleOpenGreetingModal = () => {
    // Al abrir, pre-seleccionamos al usuario del perfil actual
    if (!selectedRecipients.includes(displayUser.name)) {
      setSelectedRecipients([displayUser.name]);
    }
    setShowGreetingModal(true);
  };

  const toggleRecipient = (name: string) => {
    if (selectedRecipients.includes(name)) {
      setSelectedRecipients(selectedRecipients.filter(r => r !== name));
    } else {
      setSelectedRecipients([...selectedRecipients, name]);
    }
  };

  const handleConfirmGreeting = () => {
    setShowGreetingModal(false);
    setGreetingSent(true);
    // Resetear estado después de 2 segundos
    setTimeout(() => {
      setGreetingSent(false);
      setSelectedRecipients([]); // Limpiar selección
    }, 2000);
  };

  // Combinar el usuario actual con la lista real para mostrar opciones
  const allPotentialRecipients = [
    { id: 'current', name: displayUser.name, role: displayUser.role },
    ...(colleagues.filter(c => c.name !== displayUser.name))
  ];

  return (
    <div className="bg-bg-s1 dark:bg-gray-900 font-sans text-text-n900 dark:text-gray-100 min-h-screen flex flex-col animate-fade-in relative transition-colors duration-300">
      {/* Dynamic Background Accents */}
      <div className="fixed top-[-10%] right-[-10%] size-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] size-96 bg-p1/20 blur-[100px] rounded-full pointer-events-none"></div>

      <main className="max-w-4xl mx-auto w-full px-4 py-8 md:py-16 relative z-10">
        {/* Profile Card Header */}
        <section className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-white/20 shadow-2xl shadow-primary/5 flex flex-col md:flex-row items-center gap-8 mb-12 overflow-hidden relative group">
          <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-700"></div>

          <div className="relative shrink-0">
            {displayUser.avatar && !imgError ? (
              <img
                src={displayUser.avatar}
                alt={displayUser.name}
                className="size-32 md:size-40 object-cover rounded-[24px] ring-4 ring-white shadow-xl rotate-[-2deg] group-hover:rotate-0 transition-all duration-500"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="size-32 md:size-40 rounded-[24px] bg-gradient-to-br from-primary to-secondary-s3 text-white flex items-center justify-center text-5xl font-black shadow-xl rotate-[-2deg] group-hover:rotate-0 transition-all duration-500">
                {getInitials(displayUser.name)}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 size-10 bg-p1 rounded-full flex items-center justify-center shadow-lg transform scale-100 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-xl font-bold">star</span>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                {displayUser.role}
              </span>
              <span className="px-3 py-1 bg-white border border-primary/20 text-primary text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                Verificado
              </span>
            </div>
            <h1 className="font-display text-primary dark:text-white text-4xl md:text-5xl font-black tracking-tight mb-2 leading-tight">
              {displayUser.name}
            </h1>
            <p className="text-text-n900/60 dark:text-gray-400 text-lg md:text-xl font-bold mb-6 italic leading-relaxed">
              &ldquo;{displayUser.about || 'Listo para colaborar de forma inclusiva.'}&rdquo;
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  const filename = `twz_logo_color_rgb.pdf`;
                  alert(`Generando Manual de Usuario: ${filename} (Simulado)`);
                }}
                className="flex items-center gap-2 bg-text-n900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Exportar Manual
              </button>
              <button
                onClick={onBack}
                className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-black/10 text-text-n900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white transition-all"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Atrás
              </button>
            </div>
          </div>
        </section>

        {/* Working Preferences Section - Instruction Manual */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined font-bold">menu_book</span>
              </div>
              <h2 className="font-display text-primary dark:text-white text-2xl font-black tracking-tight uppercase">Instrucciones de Uso</h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent ml-6 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
            {/* Communication Card */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-[24px] shadow-sm border border-white/40 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">chat_bubble</span>
              </div>
              <div>
                <h3 className="font-display text-text-n900 dark:text-white text-xl font-black mb-1 uppercase">Comunicación</h3>
                <div className="h-1 w-10 bg-primary rounded-full mb-4"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-secondary-s3 font-black text-sm uppercase tracking-tighter">Preferencia:</span>
                  <span className="px-2 py-0.5 bg-secondary-s3/10 text-secondary-s3 text-[10px] font-black rounded uppercase">
                    {displayUser.settings?.comm_preference || 'Escrito'}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  {displayUser.settings?.comm_preference === 'Escrito'
                    ? 'Valoro la comunicación asíncrona. Escríbeme por Slack para que pueda darte una respuesta pensada.'
                    : 'Prefiero una llamada rápida para sincronizar. Me ayuda a entender el contexto visualmente.'}
                </p>
              </div>
            </div>

            {/* Focus Card */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-[24px] shadow-sm border border-white/40 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-p1/20 to-accent-warm/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-warm text-3xl">target</span>
              </div>
              <div>
                <h3 className="font-display text-text-n900 dark:text-white text-xl font-black mb-1 uppercase">Foco Directo</h3>
                <div className="h-1 w-10 bg-p1 rounded-full mb-4"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent-warm font-black text-sm uppercase tracking-tighter">Horario:</span>
                  <span className="px-2 py-0.5 bg-accent-warm/10 text-accent-warm text-[10px] font-black rounded uppercase">
                    10:00 - 12:00
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  Es mi bloque de trabajo profundo. No suelo responder mensajes instantáneos en este periodo para maximizar mi entrega.
                </p>
              </div>
            </div>

            {/* Feedback Card */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-[24px] shadow-sm border border-white/40 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-3xl">edit_note</span>
              </div>
              <div>
                <h3 className="font-display text-text-n900 dark:text-white text-xl font-black mb-1 uppercase">Feedback</h3>
                <div className="h-1 w-10 bg-green-500 rounded-full mb-4"></div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-600 font-black text-sm uppercase tracking-tighter">Estilo:</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-black rounded uppercase">
                    Directo
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  Me ayuda mucho el feedback claro y específico. Prefiero leerlo por escrito antes de comentarlo en persona.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Agreements Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 px-4 pb-8">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-bold">handshake</span>
            </div>
            <h2 className="font-display text-primary dark:text-white text-2xl font-black tracking-tight uppercase">Pactos Activos</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 px-2">
            {agreements && agreements.length > 0 ? (
              agreements.filter(a => a.status === 'Activo').map((agreement) => (
                <div key={agreement.id} className="bg-white/40 dark:bg-white/5 backdrop-blur-[2px] border border-primary/20 rounded-[20px] p-6 flex items-center justify-between group hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="size-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-primary/10 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">
                        {agreement.category === 'Comunicación' ? 'forum' :
                          agreement.category === 'Foco' ? 'timer' :
                            agreement.category === 'Feedback' ? 'rate_review' : 'groups'}
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-text-n900 dark:text-gray-200 uppercase tracking-tight">{agreement.title}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{agreement.category}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary/30 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white/30 rounded-3xl border-2 border-dashed border-primary/10 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-4">folder_open</span>
                <p className="font-bold">Aún no hay pactos públicos definidos.</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer Action - Call to Action */}
        <footer className="mt-20 bg-gradient-to-br from-primary to-secondary-s3 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>

          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
            ¿Colaboramos mejor?
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-bold mb-10 max-w-lg mx-auto leading-relaxed">
            Puedes proponer un nuevo acuerdo con {displayUser.name.split(' ')[0]} basado en sus preferencias o enviarle un saludo de reconocimiento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onProposeAgreement}
              className="bg-white text-primary hover:bg-p1 hover:text-primary font-black py-5 px-10 rounded-2xl shadow-xl transition-all active:scale-95 group flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined font-bold">add_circle</span>
              PROPONER ACUERDO
            </button>
            <button
              onClick={handleOpenGreetingModal}
              disabled={greetingSent}
              className={`font-black py-5 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 backdrop-blur-md shadow-xl ${greetingSent
                ? 'bg-green-500 text-white'
                : 'bg-white/10 border-2 border-white/30 text-white hover:bg-white/20'
                }`}
            >
              <span className="material-symbols-outlined font-bold">
                {greetingSent ? 'check_circle' : 'celebration'}
              </span>
              {greetingSent ? '¡SALUDO ENVIADO!' : 'ENVIAR SALUDO'}
            </button>
          </div>
        </footer>
      </main>

      {/* MODAL SELECCIÓN DE DESTINATARIOS */}
      {showGreetingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-text-n900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">sentiment_satisfied</span>
                Enviar Saludo
              </h3>
              <button
                onClick={() => setShowGreetingModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Selecciona a quién quieres enviar un reconocimiento o saludo rápido:</p>
              <div className="space-y-2 overflow-y-auto max-h-60 pr-1 custom-scrollbar">
                {allPotentialRecipients.map((recipient) => (
                  <label
                    key={recipient.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selectedRecipients.includes(recipient.name)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedRecipients.includes(recipient.name) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                        {getInitials(recipient.name)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-text-n900">{recipient.name}</p>
                        <p className="text-xs text-gray-500">{recipient.role}</p>
                      </div>
                    </div>
                    <div className={`size-5 rounded border flex items-center justify-center ${selectedRecipients.includes(recipient.name)
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                      }`}>
                      {selectedRecipients.includes(recipient.name) && (
                        <span className="material-symbols-outlined text-white text-sm">check</span>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedRecipients.includes(recipient.name)}
                      onChange={() => toggleRecipient(recipient.name)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowGreetingModal(false)}
                className="flex-1 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmGreeting}
                disabled={selectedRecipients.length === 0}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Enviar ({selectedRecipients.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
