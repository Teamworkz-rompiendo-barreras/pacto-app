
import React, { useState } from 'react';
import { View, UserProfile } from '../types';

interface HelpCenterProps {
  user: UserProfile;
  onNavigate: (view: View) => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ user, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAction = (message: string) => {
    // Feedback visual simple
    alert(message);
  };

  const getInitials = (name: string) => name.substring(0, 2).toUpperCase();

  return (
    <div className="bg-[#f2ead9] font-public text-[#121316] min-h-screen flex flex-col animate-fade-in">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#f2ead9]/80 backdrop-blur-md border-b border-[#121316]/5 px-6 lg:px-10 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(View.DASHBOARD)}>
              <div className="size-8 bg-[#3750a4] rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">handshake</span>
              </div>
              <h2 className="text-[#121316] text-xl font-bold tracking-tight">PACTO</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate(View.DASHBOARD)} className="text-[#121316]/70 hover:text-[#3750a4] transition-colors text-sm font-medium">Dashboard</button>
              <button onClick={() => onNavigate(View.DASHBOARD)} className="text-[#121316]/70 hover:text-[#3750a4] transition-colors text-sm font-medium">Acuerdos</button>
              <button onClick={() => onNavigate(View.CLARITY_CARDS)} className="text-[#121316]/70 hover:text-[#3750a4] transition-colors text-sm font-medium">Clarity Cards</button>
              <button className="text-[#121316] text-sm font-bold border-b-2 border-[#3750a4]">Ayuda</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-white/50 hover:bg-white transition-colors" onClick={() => onNavigate(View.NOTIFICATIONS)}>
              <span className="material-symbols-outlined text-lg">notifications</span>
            </button>
            <div className="size-10 rounded-full bg-[#3750a4]/20 border-2 border-[#3750a4]/10 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => onNavigate(View.PROFILE)}>
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-[#3750a4]">{getInitials(user.name)}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
          <div className="bg-white/60 rounded-xl p-6 shadow-[0_4px_20px_-2px_rgba(55,80,164,0.08)]">
            <div className="flex flex-col mb-6">
              <h3 className="text-[#121316] text-lg font-bold leading-normal">Contacto y Soporte</h3>
              <p className="text-[#6a6f81] text-sm">Estamos aquí para acompañarte.</p>
            </div>
            <nav className="flex flex-col gap-1">
              <button onClick={() => handleAction("Abriendo chat de soporte técnico...")} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3750a4]/5 transition-all text-[#121316] w-full text-left">
                <span className="material-symbols-outlined text-[#3750a4]">headset_mic</span>
                <span className="text-sm font-medium">Soporte Técnico</span>
              </button>
              <button onClick={() => onNavigate(View.FEEDBACK)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3750a4]/5 transition-all text-[#121316] w-full text-left">
                <span className="material-symbols-outlined text-[#3750a4]">chat_bubble</span>
                <span className="text-sm font-medium">Enviar Sugerencia</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#3750a4] text-white shadow-lg shadow-[#3750a4]/20 w-full text-left">
                <span className="material-symbols-outlined">description</span>
                <span className="text-sm font-medium">Guías de Uso</span>
              </button>
            </nav>
          </div>
          <div className="bg-[#3750a4]/10 rounded-xl p-6 border border-[#3750a4]/20">
            <p className="text-sm text-[#121316] mb-4 leading-relaxed font-medium">¿Necesitas ayuda inmediata para configurar un ajuste de accesibilidad?</p>
            <button
              onClick={() => handleAction("Conectando con un agente de soporte...")}
              className="w-full py-3 bg-[#3750a4] text-white rounded-xl font-bold text-sm tracking-wide hover:bg-[#3750a4]/90 transition-all shadow-md active:scale-95"
            >
              Hablar con un humano
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-10">
          {/* Hero Search Section */}
          <section className="text-center space-y-6 py-4">
            <h1 className="text-[#121316] text-4xl lg:text-5xl font-extrabold tracking-tight">Centro de Ayuda PACTO</h1>
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#6a6f81] group-focus-within:text-[#3750a4] transition-colors">search</span>
                </div>
                <input
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full h-14 pl-12 pr-6 rounded-2xl border-none bg-white shadow-sm focus:ring-4 focus:ring-[#3750a4]/10 text-lg placeholder:text-[#6a6f81] transition-all outline-none"
                  placeholder="Busca guías, tutoriales y más..."
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Grid Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div onClick={() => onNavigate(View.PROFILE)} className="bg-white/60 p-8 rounded-xl shadow-[0_4px_20px_-2px_rgba(55,80,164,0.08)] hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-[#3750a4]/20 flex flex-col gap-4 group">
              <div className="size-14 bg-blue-50 rounded-full flex items-center justify-center text-[#3750a4] group-hover:bg-[#3750a4] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
              </div>
              <div>
                <h3 className="text-[#121316] text-xl font-bold mb-2">Primeros Pasos</h3>
                <p className="text-[#6a6f81] leading-relaxed">Configura tu perfil y conoce las funciones básicas para empezar con PACTO.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div onClick={() => onNavigate(View.NEW_AGREEMENT)} className="bg-white/60 p-8 rounded-xl shadow-[0_4px_20px_-2px_rgba(55,80,164,0.08)] hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-[#3750a4]/20 flex flex-col gap-4 group">
              <div className="size-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">history_edu</span>
              </div>
              <div>
                <h3 className="text-[#121316] text-xl font-bold mb-2">Cómo crear un Acuerdo Vivo</h3>
                <p className="text-[#6a6f81] leading-relaxed">Guía paso a paso para establecer acuerdos de equipo que evolucionan contigo.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div onClick={() => onNavigate(View.CLARITY_CARDS)} className="bg-white/60 p-8 rounded-xl shadow-[0_4px_20px_-2px_rgba(55,80,164,0.08)] hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-[#3750a4]/20 flex flex-col gap-4 group">
              <div className="size-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">style</span>
              </div>
              <div>
                <h3 className="text-[#121316] text-xl font-bold mb-2">Uso de Clarity Cards</h3>
                <p className="text-[#6a6f81] leading-relaxed">Aprende a usar nuestras herramientas visuales de comunicación no verbal.</p>
              </div>
            </div>
            {/* Card 4 */}
            <div onClick={() => onNavigate(View.RITUALS)} className="bg-white/60 p-8 rounded-xl shadow-[0_4px_20px_-2px_rgba(55,80,164,0.08)] hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-[#3750a4]/20 flex flex-col gap-4 group">
              <div className="size-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">refresh</span>
              </div>
              <div>
                <h3 className="text-[#121316] text-xl font-bold mb-2">Rituales de Replay</h3>
                <p className="text-[#6a6f81] leading-relaxed">Cómo revisar y ajustar tus dinámicas de trabajo de forma saludable y recurrente.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#121316]/10 pb-4">
              <h2 className="text-2xl font-bold text-[#121316]">Preguntas Frecuentes</h2>
              <button className="text-[#3750a4] font-semibold text-sm hover:underline">Ver todas</button>
            </div>
            <div className="space-y-4">
              {/* Accordion 1 */}
              <details className="group bg-white/40 rounded-xl border border-transparent open:border-[#3750a4]/20 transition-all overflow-hidden cursor-pointer">
                <summary className="flex items-center justify-between p-6 list-none font-bold text-[#121316]">
                  ¿Quién puede ver mis Acuerdos Vivos?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-[#6a6f81] leading-relaxed text-sm animate-fade-in">
                  Los Acuerdos Vivos son privados para ti y los miembros del equipo que hayas invitado explícitamente. PACTO nunca compartirá estos datos con RRHH o gerencia sin tu consentimiento previo.
                </div>
              </details>
              {/* Accordion 2 */}
              <details className="group bg-white/40 rounded-xl border border-transparent open:border-[#3750a4]/20 transition-all overflow-hidden cursor-pointer">
                <summary className="flex items-center justify-between p-6 list-none font-bold text-[#121316]">
                  ¿Cómo cambio mis preferencias de notificación?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-[#6a6f81] leading-relaxed text-sm animate-fade-in">
                  Puedes ajustar la frecuencia y el tipo de notificaciones desde tu Perfil &gt; Preferencias. Ofrecemos modos de "Foco Profundo" para evitar interrupciones sensoriales.
                </div>
              </details>
              {/* Accordion 3 */}
              <details className="group bg-white/40 rounded-xl border border-transparent open:border-[#3750a4]/20 transition-all overflow-hidden cursor-pointer">
                <summary className="flex items-center justify-between p-6 list-none font-bold text-[#121316]">
                  ¿Puedo usar PACTO en dispositivos móviles?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-[#6a6f81] leading-relaxed text-sm animate-fade-in">
                  Sí, PACTO está diseñado como una plataforma web responsive. Puedes añadirla a tu pantalla de inicio en iOS o Android para una experiencia similar a una app nativa.
                </div>
              </details>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-12 bg-white/40 border-t border-[#121316]/5">
        <div className="max-w-[1440px] mx-auto px-10 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#3750a4] font-bold">
            <span className="material-symbols-outlined">verified</span>
            <span>PACTO: Neuroinclusión por Diseño</span>
          </div>
          <p className="text-sm text-[#6a6f81]">© 2024 PACTO Platform by Teamworkz. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
