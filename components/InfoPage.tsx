
import React from 'react';

interface InfoPageProps {
  title: string;
  content: React.ReactNode;
  onBack: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, content, onBack }) => {
  return (
    <div className="min-h-screen bg-bg-s1 text-text-n900 font-sans flex flex-col animate-fade-in">
      <header className="w-full border-b border-black/5 bg-white/90 px-6 h-20 flex items-center justify-between sticky top-0 z-[100] backdrop-blur-sm">
        <button 
          type="button"
          onClick={onBack} 
          className="flex items-center gap-2 p-2 -ml-2 rounded-lg hover:bg-black/5 transition-colors group cursor-pointer"
          aria-label="Volver atrás"
        >
           <span className="material-symbols-outlined text-primary group-hover:-translate-x-1 transition-transform">arrow_back</span>
           <span className="font-bold text-text-n900">Volver</span>
        </button>
        <div className="flex items-center gap-3 select-none">
          <div className="size-8 text-primary">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-black text-primary leading-none tracking-tight">PACTO</span>
             <span className="text-[10px] font-bold text-gray-400 font-serif leading-none">by Teamworkz</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
        <article className="bg-white p-8 md:p-12 rounded-2xl border border-gray-border shadow-sm">
          <h1 className="text-3xl md:text-4xl font-black text-primary mb-8 pb-4 border-b border-gray-100">{title}</h1>
          <div className="prose prose-lg prose-p:text-text-n900/80 prose-headings:text-text-n900 prose-headings:font-bold max-w-none">
            {content}
          </div>
        </article>
      </main>

      <footer className="py-6 px-6 border-t border-black/5 bg-white/50 text-center">
        <p className="text-[10px] text-gray-400 font-bold">© 2026 PACTO by Teamworkz. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default InfoPage;
