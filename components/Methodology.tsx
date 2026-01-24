
import React, { useState } from 'react';

interface MethodologyProps {
  onBack: () => void;
}

const Methodology: React.FC<MethodologyProps> = ({ onBack }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadWhitepaper = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Create a dummy text file for download
      const element = document.createElement("a");
      const file = new Blob(["PACTO - Metodología de Inclusión Neurodiversa\n\nEste whitepaper detalla el marco científico..."], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "PACTO_Whitepaper_Metodologia.txt";
      document.body.appendChild(element); 
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInternalNav = (section: string) => {
      alert(`[Simulación] Navegando a la sección detallada de: "${section}"`);
  };

  return (
    <div className="bg-bg-s1 text-text-n900 min-h-screen flex flex-col font-sans animate-fade-in selection:bg-primary selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-bg-s1/90 backdrop-blur-md border-b border-primary/10 px-6 lg:px-20 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
            <div className="size-8 text-primary group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                </svg>
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black text-primary leading-none tracking-tight">PACTO</span>
               <span className="text-[10px] font-bold text-gray-500 font-serif leading-none mt-0.5">by Teamworkz</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('methodology')} className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Metodología</button>
            <button onClick={() => scrollToSection('credits')} className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Créditos</button>
            <button onClick={() => scrollToSection('resources')} className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Recursos</button>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 active:scale-95">
              Volver a la App
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section / Page Heading */}
        <section className="px-6 lg:px-20 pt-16 pb-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/10 pb-12">
              <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Marco Operativo</span>
                <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-text-n900">
                  Nuestra Metodología
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  El marco científico y operativo diseñado por Teamworkz para la inclusión efectiva de perfiles neurodiversos en entornos de alto rendimiento.
                </p>
              </div>
              <button 
                onClick={handleDownloadWhitepaper}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl border border-primary/20 shadow-sm text-sm font-bold hover:bg-primary/5 transition-all disabled:opacity-70 disabled:cursor-wait shrink-0"
              >
                {isDownloading ? (
                    <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                ) : (
                    <span className="material-symbols-outlined text-lg">download</span>
                )}
                {isDownloading ? 'Descargando...' : 'Descargar Whitepaper'}
              </button>
            </div>
          </div>
        </section>

        {/* Methodology Cards Section */}
        <section id="methodology" className="px-6 lg:px-20 py-12 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-12">
            
            {/* Card 1: Ciencia de la Inclusión */}
            <div className="group flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:border-primary/20">
              <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>
                <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105" 
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCc_39MPH4xyXSV0W7gywRAYpVulhN3CZlcY2NC_S9BCKcbB3vu1BRKUuM0t_JAkqfVCLA_RjhNmXfX8nsNwUajhWqT8GN2QVVgvu2Ncu36XGsRd2j6dpaYjNB7hvQ5WFP8mfXAcy0Ma__vmOr9_lgI_CdTvGAcZNRzQRmnk3xFOSReYKlPU09tAWg88HZiAs-tADVaUgt5nc95U0PnUqdQ6TS81vMbkCrcL24_k3JfJXuVqGKATFvvrsj-k9GfNwJobJGc-dPXZxM")'}}
                >
                </div>
              </div>
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Fundamento Científico</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight text-text-n900">Ciencia de la Inclusión</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4 font-medium">
                  Exploramos el paradigma de la neurodiversidad como una ventaja competitiva. Nuestra plataforma utiliza algoritmos adaptativos basados en investigaciones sobre perfiles cognitivos y neuroplasticidad para potenciar el talento único de cada individuo.
                </p>
                <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                  Implementamos ajustes razonables automatizados que reducen la carga cognitiva y eliminan las barreras sensoriales en el entorno digital.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.google.com/search?q=neurociencia+inclusion+laboral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/20 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">menu_book</span>
                    Ver Investigación
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: El Poder de los Acuerdos Vivos */}
            <div className="group flex flex-col lg:flex-row-reverse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:border-primary/20">
              <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-secondary-s3/10 mix-blend-multiply z-10"></div>
                <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105" 
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP8FMG8_4CK2ckLZB8dctBOjZNarxwsfYbyoi-PUzrI2VgBntCe9u2lMgyfSAuhQzLXq7d22_tnZwDbsARblhhYZ0ybRPyuxsWMQU7cStoijKGZ_2sAFJoHbVcFxGQZEHG86_tsHrM1kx45JWYsUh-gN5_UuLcIosUfAwAVmgwrgcbN_lxXqv9KR7Vm3qY3HOgtcVaLF0ximeahyRGITSvVvYYJHyMBEW-5nzCpJGX9ZEW4uZaceYpjWH8YbwaCbfqZMaxuIc6lc0")'}}
                >
                </div>
              </div>
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <div className="p-2 bg-secondary-s3/10 text-secondary-s3 rounded-lg">
                    <span className="material-symbols-outlined text-xl">handshake</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-secondary-s3">Claridad Operativa</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight text-text-n900">El Poder de los Acuerdos Vivos</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4 font-medium">
                  La claridad es accesibilidad. Utilizamos "Acuerdos Vivos", una metodología ágil aplicada a la inclusión sociolaboral que permite que las normas de equipo evolucionen dinámicamente según las necesidades del grupo.
                </p>
                <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
                  Este sistema reduce la ansiedad social y mejora la previsibilidad, facilitando una colaboración transparente y eliminando la ambigüedad en las comunicaciones.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.google.com/search?q=metodologia+agile+rrhh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-primary border-2 border-primary/20 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:border-primary transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">info</span>
                    Más detalles
                  </a>
                </div>
              </div>
            </div>

            {/* Credits Section */}
            <div id="credits" className="mt-8 border-t border-primary/10 pt-16 scroll-mt-24">
              <h2 className="text-3xl font-black mb-10 text-center tracking-tight text-text-n900">Créditos y Colaboradores</h2>
              <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {/* Contributor 1 */}
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-n900">Equipo Core Teamworkz</h4>
                      <p className="text-sm text-gray-500 mt-1 font-medium">Liderazgo estratégico y desarrollo de producto enfocado en impacto social.</p>
                    </div>
                  </div>
                  {/* Contributor 2 */}
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-secondary-s3/10 flex items-center justify-center text-secondary-s3 shrink-0">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-n900">Asesores Científicos</h4>
                      <p className="text-sm text-gray-500 mt-1 font-medium">Expertos en neuropsicología y pedagogía inclusiva de instituciones globales.</p>
                    </div>
                  </div>
                  {/* Contributor 3 */}
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-p1/20 flex items-center justify-center text-yellow-700 shrink-0">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-n900">Desarrollo Tecnológico</h4>
                      <p className="text-sm text-gray-500 mt-1 font-medium">Ingenieros dedicados a crear interfaces accesibles y de bajo impacto cognitivo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Resources Sidebar-style row */}
            <div id="resources" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-20 scroll-mt-24">
              <div className="bg-white p-8 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-8xl text-primary">link</span>
                </div>
                <h4 className="text-primary font-bold mb-4 flex items-center gap-2 text-lg">
                  <span className="material-symbols-outlined">link</span>
                  Recursos de Investigación
                </h4>
                <ul className="space-y-4 relative z-10">
                  <li>
                    <a href="https://www.google.com/search?q=neurodiversidad+y+productividad+estudio" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-text-n900 hover:text-primary transition-colors flex items-center justify-between w-full group/link">
                        <span>Estudio: Neurodiversidad y Productividad</span>
                        <span className="material-symbols-outlined text-sm opacity-0 group-hover/link:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.google.com/search?q=manual+ajustes+razonables+neurodiversidad+2024" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-text-n900 hover:text-primary transition-colors flex items-center justify-between w-full group/link">
                        <span>Manual de Ajustes Razonables 2024</span>
                        <span className="material-symbols-outlined text-sm opacity-0 group-hover/link:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-secondary-s3/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-8xl text-secondary-s3">article</span>
                </div>
                <h4 className="text-secondary-s3 font-bold mb-4 flex items-center gap-2 text-lg">
                  <span className="material-symbols-outlined">article</span>
                  Lecturas Recomendadas
                </h4>
                <ul className="space-y-4 relative z-10">
                  <li>
                    <a href="https://www.google.com/search?q=futuro+del+trabajo+inclusivo" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-text-n900 hover:text-secondary-s3 transition-colors flex items-center justify-between w-full group/link">
                        <span>El futuro del trabajo inclusivo</span>
                        <span className="material-symbols-outlined text-sm opacity-0 group-hover/link:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.google.com/search?q=diseño+para+la+diversidad+cognitiva" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-text-n900 hover:text-secondary-s3 transition-colors flex items-center justify-between w-full group/link">
                        <span>Diseño para la diversidad cognitiva</span>
                        <span className="material-symbols-outlined text-sm opacity-0 group-hover/link:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary/5 py-12 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-6 text-primary">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-primary">PACTO</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed font-medium">
              Potenciando la inclusión neurodiversa a través de la tecnología y el diseño centrado en el ser humano. Una iniciativa de Teamworkz.
            </p>
            <div className="flex gap-4">
              <a href="mailto:hola@teamworkz.co" className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-lg">mail</span></a>
              <a href="https://www.google.com/search?q=teamworkz+branding" target="_blank" rel="noreferrer" className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-lg">public</span></a>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-text-n900">Plataforma</h5>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><button onClick={() => handleInternalNav('Características')} className="hover:text-primary transition-colors cursor-pointer">Características</button></li>
              <li><button onClick={() => handleInternalNav('Seguridad')} className="hover:text-primary transition-colors cursor-pointer">Seguridad</button></li>
              <li><button onClick={() => handleInternalNav('Accesibilidad')} className="hover:text-primary transition-colors cursor-pointer">Accesibilidad</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest text-text-n900">Compañía</h5>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><button onClick={() => handleInternalNav('Sobre Teamworkz')} className="hover:text-primary transition-colors cursor-pointer">Sobre Teamworkz</button></li>
              <li><button onClick={() => handleInternalNav('Privacidad')} className="hover:text-primary transition-colors cursor-pointer">Privacidad</button></li>
              <li><button onClick={() => handleInternalNav('Contacto')} className="hover:text-primary transition-colors cursor-pointer">Contacto</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-bold">
          <p>© 2024 PACTO por Teamworkz. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con</span>
            <span className="material-symbols-outlined text-[12px] text-red-500">favorite</span>
            <span>para un futuro diverso.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Methodology;
