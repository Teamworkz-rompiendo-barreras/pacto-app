
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PublicProfileProps {
  user?: UserProfile; // Datos del usuario a mostrar
  onBack: () => void;
  onProposeAgreement: () => void;
}

// Datos simulados para la lista de selección de compañeros
const MOCK_COLLEAGUES = [
    { id: '1', name: 'Ana García', role: 'Engineering Manager' },
    { id: '2', name: 'Luis Chen', role: 'Frontend Developer' },
    { id: '3', name: 'Marta Ruiz', role: 'Product Owner' },
    { id: '4', name: 'Carlos Díaz', role: 'QA Engineer' }
];

const PublicProfile: React.FC<PublicProfileProps> = ({ user, onBack, onProposeAgreement }) => {
  // Estado para feedback visual del saludo
  const [greetingSent, setGreetingSent] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Estado para el modal de selección
  const [showGreetingModal, setShowGreetingModal] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  // Datos de fallback si no se pasa usuario
  const displayUser = user || {
    name: 'Alex Rivera',
    role: 'Diseñador de Producto en Teamworkz',
    about: '"Construyendo entornos de trabajo inclusivos donde cada mente pueda brillar a su propia manera."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMM47oiMLJXa2nwIvhtyq4rYZGQh5nHhEcPgWaWoa7Xu0ADpIuPtdQLYKQv3oueKcetRIHXFeND-quocUywbyzTE5r7KV-T9CVC92D7Mq5th2zM5P8TF72AlmMnOuOC4EulcTd3uuwGceMJUM82CsM7ghIEnGsOHPV-I59E-aLShxA_8gmeZXDk7bZIbgH5L9ZMmjX4IklfOeaTExbHUMgxBylgfkG8OzSFwWS-VvH7466Wrteqh6EGjCLmGtvN49N9IftAmXaYco',
    settings: { comm_preference: 'Escrito' }
  };

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

  // Combinar el usuario actual con la lista mock para mostrar opciones
  // Filtramos para no duplicar si el usuario actual ya está en los mocks
  const allPotentialRecipients = [
      { id: 'current', name: displayUser.name, role: displayUser.role },
      ...MOCK_COLLEAGUES.filter(c => c.name !== displayUser.name)
  ];

  return (
    <div className="bg-bg-s1 dark:bg-gray-900 font-public text-text-n900 dark:text-gray-100 min-h-screen flex flex-col animate-fade-in relative">
      {/* Top Navigation Bar - Specific for Public Profile */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-black/10 px-6 py-3 bg-bg-s1 dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={onBack}>
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em] uppercase">PACTO</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={onBack} className="text-text-n900/70 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">Volver</button>
            <span className="text-text-n900 dark:text-gray-200 text-sm font-semibold border-b-2 border-primary pb-0.5">Perfil de {displayUser.name.split(' ')[0]}</span>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
              <div className="text-gray-500 flex border-none bg-white/50 dark:bg-white/10 items-center justify-center pl-4">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 border-none bg-white/50 dark:bg-white/10 focus:ring-0 h-full placeholder:text-gray-500 px-3 text-sm outline-none" 
                placeholder="Buscar en el equipo..." 
              />
            </div>
          </label>
          <button 
             onClick={onBack}
             title="Cerrar"
             className="size-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors" 
          >
              <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 py-12">
        {/* Profile Header */}
        <section className="flex flex-col items-center mb-16">
          <div className="mb-6 relative">
             {displayUser.avatar && !imgError ? (
                <img 
                    src={displayUser.avatar}
                    alt={displayUser.name}
                    className="bg-center bg-no-repeat object-cover aspect-square rounded-full size-32 ring-4 ring-white shadow-xl"
                    onError={() => setImgError(true)}
                />
             ) : (
                <div className="size-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold ring-4 ring-white shadow-xl select-none">
                    {getInitials(displayUser.name)}
                </div>
             )}
          </div>
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-accent-blue/20 text-primary text-xs font-bold rounded-full mb-3 uppercase tracking-wider">Perfil Público</span>
            <h1 className="text-primary dark:text-white text-4xl font-bold tracking-tight mb-2">¡Hola! Soy {displayUser.name}</h1>
            <p className="text-text-n900/70 dark:text-gray-400 text-lg font-medium">{displayUser.role}</p>
            {displayUser.about && (
                <p className="mt-4 max-w-lg mx-auto text-text-n900/60 dark:text-gray-500 text-base italic leading-relaxed">
                    "{displayUser.about}"
                </p>
            )}
          </div>
        </section>

        {/* Working Preferences Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 px-4 pb-6">
            <span className="material-symbols-outlined text-primary">psychology_alt</span>
            <h2 className="text-primary dark:text-white text-[22px] font-bold leading-tight tracking-tight">Cómo trabajar mejor conmigo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {/* Comm Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-black/5 flex flex-col gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[28px]">chat_bubble_outline</span>
              </div>
              <div>
                <p className="text-text-n900 dark:text-white text-lg font-bold">Comunicación</p>
                <p className="text-accent-blue font-semibold text-sm mb-2">
                    {displayUser.settings?.comm_preference || 'Escrito'} / Asíncrono
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {displayUser.settings?.comm_preference === 'Escrito' 
                        ? 'Prefiero Slack o e-mail. Me permite procesar la información a mi ritmo.' 
                        : 'Prefiero hablar directamente. Las llamadas cortas resuelven mis dudas mejor.'}
                </p>
              </div>
            </div>
            {/* Focus Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-black/5 flex flex-col gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[28px]">timer</span>
              </div>
              <div>
                <p className="text-text-n900 dark:text-white text-lg font-bold">Concentración</p>
                <p className="text-accent-blue font-semibold text-sm mb-2">10:00 - 12:00</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Mi bloque de trabajo profundo. Por favor, evita agendar reuniones durante este tiempo si no es urgente.</p>
              </div>
            </div>
            {/* Feedback Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-black/5 flex flex-col gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[28px]">rate_review</span>
              </div>
              <div>
                <p className="text-text-n900 dark:text-white text-lg font-bold">Feedback</p>
                <p className="text-accent-blue font-semibold text-sm mb-2">Directo y privado</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Agradezco la honestidad directa por canales privados. Me ayuda a mejorar sin sentir sobrecarga social.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Agreements Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 px-4 pb-6">
            <span className="material-symbols-outlined text-primary">handshake</span>
            <h2 className="text-primary dark:text-white text-[22px] font-bold leading-tight tracking-tight">Mis acuerdos en PACTO</h2>
          </div>
          <div className="bg-white/40 dark:bg-white/5 rounded-xl p-2 mx-4 border border-primary/10">
            <ul className="flex flex-col gap-1">
              <li className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all group cursor-default">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">videocam_off</span>
                  <span className="font-medium text-text-n900 dark:text-gray-200">Cámara opcional en reuniones</span>
                </div>
                <span className="text-xs font-bold text-accent-blue bg-accent-blue/10 px-2 py-1 rounded">ACTIVO</span>
              </li>
              <li className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all border-t border-black/5 cursor-default">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-medium text-text-n900 dark:text-gray-200">Miércoles de Enfoque (Sin reuniones)</span>
                </div>
                <span className="text-xs font-bold text-accent-blue bg-accent-blue/10 px-2 py-1 rounded">ACTIVO</span>
              </li>
              <li className="flex items-center justify-between p-4 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all border-t border-black/5 cursor-default">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">forum</span>
                  <span className="font-medium text-text-n900 dark:text-gray-200">Uso estricto de hilos en Slack</span>
                </div>
                <span className="text-xs font-bold text-accent-blue bg-accent-blue/10 px-2 py-1 rounded">ACTIVO</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer Action */}
        <footer className="mt-20 flex flex-col items-center gap-6 pb-20">
          <p className="text-gray-500 text-sm text-center max-w-xs leading-normal font-medium">
            ¿Quieres crear un acuerdo con {displayUser.name.split(' ')[0]} o ver los puntos comunes?
          </p>
          <div className="flex gap-4">
            <button 
                onClick={onProposeAgreement}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
                Proponer Nuevo Acuerdo
            </button>
            <button 
                onClick={handleOpenGreetingModal}
                disabled={greetingSent}
                className={`border-2 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 ${
                    greetingSent 
                    ? 'bg-green-100 border-green-200 text-green-700' 
                    : 'border-primary/20 hover:border-primary text-primary'
                }`}
            >
                {greetingSent ? (
                    <>
                      <span className="material-symbols-outlined text-lg">check</span>
                      ¡Saludo Enviado!
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined text-lg">sentiment_satisfied</span>
                        Enviar un Saludo
                    </>
                )}
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
                                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                    selectedRecipients.includes(recipient.name) 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        selectedRecipients.includes(recipient.name) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                        {getInitials(recipient.name)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-text-n900">{recipient.name}</p>
                                        <p className="text-xs text-gray-500">{recipient.role}</p>
                                    </div>
                                </div>
                                <div className={`size-5 rounded border flex items-center justify-center ${
                                    selectedRecipients.includes(recipient.name) 
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
