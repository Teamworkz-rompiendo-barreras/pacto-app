
import React from 'react';
import { View } from '../types';
import { useLanguage } from '../LanguageContext';

interface LandingProps {
  onStart: () => void;
  onContact?: () => void;
  onNavigate: (view: View) => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onContact, onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-bg-s1 text-text-n900 selection:bg-primary selection:text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed top-[-10%] right-[-10%] size-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] size-[800px] bg-p1/10 blur-[120px] rounded-full pointer-events-none"></div>

      <header className="sticky top-0 z-50 w-full bg-bg-s1/60 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="size-10 text-primary rotate-3 group-hover:rotate-12 transition-transform">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black text-primary leading-none tracking-tighter">PACTO</span>
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Acuerdos Vivos</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {['Misión', 'Pilares', 'Herramientas'].map((item, idx) => (
              <button
                key={item}
                onClick={() => {
                  if (idx === 0) onNavigate(View.MISSION);
                  else {
                    const id = item.toLowerCase();
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-text-n900/60 hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <button onClick={onStart} className="bg-text-n900 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-black/10 hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all">
            {t('landing.nav.start')}
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-40 md:pb-48 text-center md:text-left">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] w-fit mx-auto md:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('landing.hero.badge')}
              </div>
              <h1 className="font-display text-[14vw] md:text-8xl font-black leading-[0.9] tracking-tighter text-text-n900 text-balance uppercase">
                {t('landing.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-text-n900/40 font-bold leading-relaxed max-w-xl text-balance italic">
                &ldquo;{t('landing.hero.subtitle')}&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={onStart} className="px-12 py-6 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-[24px] shadow-2xl shadow-primary/30 hover:scale-[1.05] hover:rotate-[-1deg] transition-all">
                  {t('landing.hero.cta')}
                </button>
                <div className="flex items-center gap-4 px-8 justify-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => <div key={i} className="size-10 rounded-full border-4 border-bg-s1 bg-gray-200"></div>)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">+500 Equipos</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/3 transition-colors duration-1000"></div>
              <div className="relative bg-white/40 backdrop-blur-md p-4 rounded-[48px] border border-white/60 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  className="w-full aspect-[4/3] object-cover rounded-[36px] grayscale-0 group-hover:grayscale-0 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PILARES SECTION */}
        <section className="py-32 bg-white/40" id="pilares">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-24 space-y-6">
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">{t('landing.pillars.title')}</h2>
              <p className="text-gray-400 font-bold text-xl leading-relaxed italic">{t('landing.pillars.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: 'shield_with_heart', title: t('landing.pillars.1.title'), desc: t('landing.pillars.1.desc'), color: 'bg-rose-500' },
                { icon: 'account_tree', title: t('landing.pillars.2.title'), desc: t('landing.pillars.2.desc'), color: 'bg-primary' },
                { icon: 'neurology', title: t('landing.pillars.3.title'), desc: t('landing.pillars.3.desc'), color: 'bg-secondary-s3' }
              ].map((pillar) => (
                <div key={pillar.title} className="bg-white/70 backdrop-blur-sm rounded-[40px] p-10 border border-white focus-within:ring-4 ring-primary/10 hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-300 group">
                  <div className={`size-20 rounded-[28px] ${pillar.color} text-white flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-4xl font-black">{pillar.icon}</span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-text-n900 uppercase tracking-tight mb-4">{pillar.title}</h3>
                  <p className="text-gray-400 font-bold text-lg leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS SECTION */}
        <section className="py-32" id="herramientas">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-6 mb-24">
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight uppercase">{t('landing.tools.title')}</h2>
              <p className="text-gray-400 font-bold text-xl italic max-w-2xl mx-auto">{t('landing.tools.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: 'dashboard', title: t('landing.tools.1.title'), desc: t('landing.tools.1.desc'), bg: 'bg-primary/5' },
                { icon: 'style', title: t('landing.tools.2.title'), desc: t('landing.tools.2.desc'), bg: 'bg-p1/20' },
                { icon: 'replay', title: t('landing.tools.3.title'), desc: t('landing.tools.3.desc'), bg: 'bg-indigo-50' }
              ].map((tool) => (
                <div key={tool.title} className="group cursor-default">
                  <div className={`h-64 ${tool.bg} rounded-[40px] mb-8 flex items-center justify-center border border-black/5 overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                    <span className="material-symbols-outlined text-8xl text-text-n900/10 group-hover:text-text-n900/20 group-hover:scale-110 transition-all duration-500">{tool.icon}</span>
                  </div>
                  <h4 className="font-display text-2xl font-black text-text-n900 uppercase tracking-tight mb-2 tracking-widest">{tool.title}</h4>
                  <p className="text-gray-400 font-bold text-sm leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative bg-text-n900 rounded-[64px] p-20 md:p-32 overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute top-0 right-0 size-96 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 space-y-12 max-w-4xl mx-auto">
              <h3 className="font-display text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">{t('landing.cta.title')}</h3>
              <p className="text-white/40 text-2xl font-bold italic leading-relaxed">&ldquo;{t('landing.cta.subtitle')}&rdquo;</p>
              <button onClick={onStart} className="px-16 py-8 bg-white text-text-n900 font-black text-xl uppercase tracking-widest rounded-[32px] hover:scale-110 hover:rotate-3 active:scale-95 transition-all shadow-2xl">
                {t('landing.cta.btn')}
              </button>
              <div className="flex items-center justify-center gap-2 text-white/20 text-xs font-black uppercase tracking-[0.3em] pt-8">
                <span className="material-symbols-outlined">verified</span>
                {t('global.rights')}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-32 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-20 border-b border-black/5 pb-20 mb-16">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="size-10 text-primary">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                  </svg>
                </div>
                <span className="font-display text-3xl font-black text-primary tracking-tighter leading-none">PACTO</span>
              </div>
              <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-sm italic">
                &ldquo;{t('landing.footer.desc')}&rdquo;
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-n900/30">{t('landing.footer.platform')}</h4>
              <ul className="space-y-4">
                <li><button className="text-sm font-black uppercase tracking-widest text-text-n900/60 hover:text-primary transition-all underline-offset-4 hover:underline">Misión</button></li>
                <li><button className="text-sm font-black uppercase tracking-widest text-text-n900/60 hover:text-primary transition-all underline-offset-4 hover:underline">Escuelas</button></li>
                <li><button className="text-sm font-black uppercase tracking-widest text-text-n900/60 hover:text-primary transition-all underline-offset-4 hover:underline">Precios</button></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-n900/30">{t('landing.footer.legal')}</h4>
              <ul className="space-y-4">
                <li><button className="text-sm font-black uppercase tracking-widest text-text-n900/60 hover:text-primary transition-all underline-offset-4 hover:underline">Privacidad</button></li>
                <li><button className="text-sm font-black uppercase tracking-widest text-text-n900/60 hover:text-primary transition-all underline-offset-4 hover:underline">Cookies</button></li>
                <li><button className="text-sm font-black uppercase tracking-widest text-text-n900/60 hover:text-primary transition-all underline-offset-4 hover:underline">Legal</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">© 2026 PACTO. {t('global.copyright')}</p>
            <div className="flex items-center gap-6">
              <div className="size-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">share</span></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
