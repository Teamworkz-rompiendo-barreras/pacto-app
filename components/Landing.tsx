
import React from 'react';
import { View, SUPPORTED_LANGUAGES } from '../types';
import { useLanguage } from '../LanguageContext';

interface LandingProps {
  onStart: () => void;
  onContact?: () => void;
  onNavigate: (view: View) => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onContact, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-bg-s1 text-text-n900 selection:bg-primary selection:text-white min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-bg-s1/90 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 select-none cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="size-8 md:size-9 text-primary shrink-0">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-primary leading-none tracking-tight">PACTO</span>
              <span className="text-[9px] md:text-[10px] font-bold text-gray-500 font-serif leading-none mt-0.5">{t('global.brand_suffix')}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => onNavigate(View.MISSION)}
              className="text-base font-bold hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
            >
              {t('landing.nav.mission')}
            </button>
            <button
              onClick={() => scrollToSection('pilares')}
              className="text-base font-bold hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
            >
              {t('landing.nav.pillars')}
            </button>
            <button
              onClick={() => scrollToSection('herramientas')}
              className="text-base font-bold hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
            >
              {t('landing.nav.tools')}
            </button>
          </nav>
          <div className="flex items-center gap-4 shrink-0">
            {/* Language Selector Disabled by User Request */}
            {/* <div className="hidden md:block relative group">
              <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">language</span>
                <span className="max-w-[100px] truncate">{language}</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 hidden group-hover:block p-2 z-50">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${language === lang ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div> */}
            <button onClick={onStart} className="bg-primary text-white px-5 py-2 md:px-8 md:py-2.5 text-sm md:text-base font-bold rounded-full hover:shadow-lg transition-all active:scale-95 whitespace-nowrap">
              {t('landing.nav.start')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 flex-1 w-full">
        <section className="py-12 md:py-32" id="mision">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="flex flex-col gap-6 md:gap-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/50 border border-black/10 text-primary text-xs md:text-sm font-bold uppercase tracking-widest w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('landing.hero.badge')}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-text-n900 text-balance">
                {t('landing.hero.title')}
              </h2>
              <p className="text-lg md:text-2xl text-text-n900/80 leading-relaxed max-w-xl text-balance">
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                <button onClick={onStart} className="h-14 md:h-16 px-8 md:px-10 bg-primary text-white text-base md:text-lg font-bold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto">
                  {t('landing.hero.cta')}
                </button>

              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl hidden md:block"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-warm/10 rounded-full blur-3xl hidden md:block"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl border border-black/5 overflow-hidden">
                  <div className="w-full aspect-[4/3] bg-bg-s1 rounded-2xl overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 scroll-mt-28" id="pilares">
          <div className="flex flex-col gap-6 mb-16">
            <h3 className="text-4xl font-bold tracking-tight">{t('landing.pillars.title')}</h3>
            <p className="text-text-n900/70 max-w-2xl text-xl leading-relaxed">
              {t('landing.pillars.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-black/5 flex flex-col gap-8 hover:shadow-2xl transition-all group">
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">shield_with_heart</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4 text-text-n900">{t('landing.pillars.1.title')}</h4>
                <p className="text-text-n900/70 text-lg leading-relaxed">
                  {t('landing.pillars.1.desc')}
                </p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-black/5 flex flex-col gap-8 hover:shadow-2xl transition-all group">
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">account_tree</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4 text-text-n900">{t('landing.pillars.2.title')}</h4>
                <p className="text-text-n900/70 text-lg leading-relaxed">
                  {t('landing.pillars.2.desc')}
                </p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-black/5 flex flex-col gap-8 hover:shadow-2xl transition-all group">
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">neurology</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-4 text-text-n900">{t('landing.pillars.3.title')}</h4>
                <p className="text-text-n900/70 text-lg leading-relaxed">
                  {t('landing.pillars.3.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 scroll-mt-28" id="herramientas">
          <div className="flex flex-col gap-4 mb-12 text-center">
            <h3 className="text-4xl font-bold tracking-tight">{t('landing.tools.title')}</h3>
            <p className="text-text-n900/70 text-xl leading-relaxed max-w-3xl mx-auto">
              {t('landing.tools.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-bg border border-gray-border rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="h-40 bg-white rounded-xl mb-6 border border-gray-200 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5"></div>
                <span className="material-symbols-outlined text-6xl text-primary/20">dashboard</span>
              </div>
              <h4 className="font-bold text-xl mb-2">{t('landing.tools.1.title')}</h4>
              <p className="text-gray-600 text-sm">{t('landing.tools.1.desc')}</p>
            </div>
            <div className="bg-card-bg border border-gray-border rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="h-40 bg-white rounded-xl mb-6 border border-gray-200 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-p1/10"></div>
                <span className="material-symbols-outlined text-6xl text-p1/40">style</span>
              </div>
              <h4 className="font-bold text-xl mb-2">{t('landing.tools.2.title')}</h4>
              <p className="text-gray-600 text-sm">{t('landing.tools.2.desc')}</p>
            </div>
            <div className="bg-card-bg border border-gray-border rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="h-40 bg-white rounded-xl mb-6 border border-gray-200 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-accent-warm/5"></div>
                <span className="material-symbols-outlined text-6xl text-accent-warm/20">replay</span>
              </div>
              <h4 className="font-bold text-xl mb-2">{t('landing.tools.3.title')}</h4>
              <p className="text-gray-600 text-sm">{t('landing.tools.3.desc')}</p>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="relative bg-primary rounded-[3rem] p-12 md:p-24 overflow-hidden text-center text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: '60px 60px' }}></div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10">
              <h3 className="text-4xl md:text-6xl font-bold leading-tight">{t('landing.cta.title')}</h3>
              <p className="text-white/80 text-2xl">{t('landing.cta.subtitle')}</p>
              <button onClick={onStart} className="bg-white text-primary px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                {t('landing.cta.btn')}
              </button>
              <p className="text-base font-medium text-white/60">Preparado para {t('global.rights')}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-black/5 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-8 text-primary">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-primary leading-none tracking-tight">PACTO</span>
                  <span className="text-[10px] font-bold text-gray-400 font-serif leading-none mt-0.5">{t('global.brand_suffix')}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                {t('landing.footer.desc')}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-text-n900 mb-4 text-base">{t('landing.footer.platform')}</h4>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                <li><button onClick={() => onNavigate(View.MISSION)} className="hover:text-primary transition-colors text-left">{t('landing.footer.mission')}</button></li>
                <li><button onClick={() => onNavigate(View.SUCCESS_STORIES)} className="hover:text-primary transition-colors text-left">{t('landing.footer.success')}</button></li>
                <li><button onClick={() => onNavigate(View.PRICING)} className="hover:text-primary transition-colors text-left">{t('landing.footer.pricing')}</button></li>
                <li className="pt-2 flex flex-col gap-1">
                  <button onClick={onContact} className="hover:text-primary transition-colors font-bold text-left">{t('landing.footer.contact')}</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-text-n900 mb-4 text-base">{t('landing.footer.legal')}</h4>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                <li><button onClick={() => onNavigate(View.ACCESSIBILITY)} className="hover:text-primary transition-colors text-left">{t('landing.footer.accessibility')}</button></li>
                <li><button onClick={() => onNavigate(View.PRIVACY)} className="hover:text-primary transition-colors text-left">{t('landing.footer.privacy')}</button></li>
                <li><button onClick={() => onNavigate(View.COOKIES)} className="hover:text-primary transition-colors text-left">{t('landing.footer.cookies')}</button></li>
                <li><button onClick={() => onNavigate(View.LEGAL)} className="hover:text-primary transition-colors text-left">{t('landing.footer.legal_notice')}</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-bold">
            <p>© 2026 PACTO {t('global.brand_suffix')}. {t('global.copyright')}</p>
            <div className="flex items-center gap-2 text-primary/80">
              <span className="material-symbols-outlined text-lg">verified</span>
              <span>{t('global.rights')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
