import React, { createContext, useState, useContext, ReactNode } from 'react';


// Allow any string to support the full list from SUPPORTED_LANGUAGES, 
// allows 'es-la', 'en-us' as legacy or full names.
type Language = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  'es-la': {
    // --- SETTINGS (Existing) ---
    'settings.title': 'Ajustes de Idioma y Región',
    'settings.desc': 'Personaliza tu experiencia en PACTO para que se adapte a tu ubicación y preferencias de trabajo.',
    'label.language': 'Idioma de la plataforma',
    'label.region': 'País/Región',
    'label.timezone': 'Zona Horaria',
    'label.dateformat': 'Formato de Fecha/Hora',
    'tip.title': '¿Por qué es importante esto?',
    'tip.desc': 'Configurar tu zona horaria correcta ayuda a tu equipo a respetar tus horas de "Deep Work" y sincronizar mejor las reuniones.',
    'btn.cancel': 'Cancelar',
    'btn.save': 'Guardar cambios',
    'btn.saving': 'Guardando...',
    'region.select': 'Selecciona tu país',
    'timezone.select': 'Seleccionar...',
    'back': 'Volver',

    // --- LANDING PAGE ---
    'landing.nav.mission': 'Misión',
    'landing.nav.pillars': 'Pilares',
    'landing.nav.tools': 'Herramientas',
    'landing.nav.start': 'Empezar',
    'landing.hero.badge': 'Innovación Neurodiversa',
    'landing.hero.title': 'De la intención a la práctica',
    'landing.hero.subtitle': 'Una plataforma digital diseñada para la inclusión neurodiversa y acuerdos operativos reales. Accesible, clara y construida para humanos.',
    'landing.hero.cta': 'Crear mi cuenta',
    'landing.pillars.title': 'Nuestros Pilares',
    'landing.pillars.subtitle': 'PACTO reduce la carga cognitiva priorizando la estructura visual y la seguridad psicológica.',
    'landing.pillars.1.title': 'Seguridad Psicológica',
    'landing.pillars.1.desc': 'Creamos ciclos de retroalimentación seguros donde cada miembro comparte sus necesidades cognitivas.',
    'landing.pillars.2.title': 'Claridad Operativa',
    'landing.pillars.2.desc': 'Eliminamos la ambigüedad. Definimos expectativas claras y canales efectivos para todos.',
    'landing.pillars.3.title': 'Neuro-Inclusión',
    'landing.pillars.3.desc': 'Herramientas creadas para acomodar TDAH, Autismo y diversos estilos de procesamiento.',
    'landing.tools.title': 'Herramientas Visuales',
    'landing.tools.subtitle': 'Diseñamos interfaces que reducen el ruido y maximizan la claridad.',
    'landing.tools.1.title': 'Canvas de Acuerdos',
    'landing.tools.1.desc': 'Visualiza todas las normas operativas en un solo lugar accesible.',
    'landing.tools.2.title': 'Kits de Claridad',
    'landing.tools.2.desc': 'Tarjetas pre-diseñadas para resolver conflictos comunes de comunicación.',
    'landing.tools.3.title': 'Rituales de Replay',
    'landing.tools.3.desc': 'Estructuras para reuniones que aseguran que todos estén alineados.',
    'landing.cta.title': '¿Listo para construir una cultura verdaderamente inclusiva?',
    'landing.cta.subtitle': 'Únete a empresas que ya usan PACTO para mejorar la claridad y la empatía operativa.',
    'landing.cta.btn': 'Empezar gratis hoy',
    'landing.footer.desc': 'Plataforma de acuerdos vivos para la inclusión laboral neurodiversa. Diseñamos estructuras que permiten a cada mente trabajar mejor.',

    // --- DASHBOARD ---
    'dash.welcome': 'Hola, {name}',
    'dash.subtitle': 'Tu espacio personal de claridad y acuerdos.',
    'dash.btn.library': 'Explorar Biblioteca',
    'dash.btn.new': 'Nuevo Acuerdo',
    'dash.section.agreements': 'Mis Acuerdos Vivos',
    'dash.link.viewall': 'Ver todos',
    'dash.empty.title': 'Aún no tienes acuerdos',
    'dash.empty.desc': 'Crea uno nuevo para mejorar la claridad con tu equipo.',
    'dash.empty.btn': 'Crear mi primer acuerdo',
    'dash.widget.wellbeing': 'Mi Bienestar',
    'dash.widget.clarity': 'Claridad',
    'dash.widget.tostart': 'Por iniciar',
    'dash.widget.ready': '¡Todo listo! Estás alineado y listo para colaborar.',
    'dash.widget.nodata': 'Aún no hay datos. Crea tu primer Acuerdo Vivo.',
    'dash.tools.title': 'Herramientas Personales',
    'dash.tools.focus.active': 'Foco Activo',
    'dash.tools.focus.start': 'Iniciar Modo Foco',
    'dash.tools.focus.muting': 'Silenciando notificaciones',
    'dash.tools.focus.desc': 'Silenciar notificaciones por 1h',
    'dash.tools.clarity.title': 'Consultar Clarity Cards',
    'dash.tools.clarity.desc': 'Guías visuales de comunicación',
    'dash.tip.title': 'Tip del Día',
    'dash.tip.btn.idle': 'Enviar Tip al Equipo',
    'dash.tip.btn.sending': 'Enviando...',
    'dash.tip.btn.success': '¡Enviado!'
  },
  'en-us': {
    // --- SETTINGS (Existing) ---
    'settings.title': 'Language & Region Settings',
    'settings.desc': 'Customize your PACTO experience to match your location and work preferences.',
    'label.language': 'Platform Language',
    'label.region': 'Country/Region',
    'label.timezone': 'Timezone',
    'label.dateformat': 'Date/Time Format',
    'tip.title': 'Why is this important?',
    'tip.desc': 'Setting your correct timezone helps your team respect your "Deep Work" hours and synchronize meetings better.',
    'btn.cancel': 'Cancel',
    'btn.save': 'Save Changes',
    'btn.saving': 'Saving...',
    'region.select': 'Select your country',
    'timezone.select': 'Select...',
    'back': 'Back',

    // --- LANDING PAGE ---
    'landing.nav.mission': 'Mission',
    'landing.nav.pillars': 'Pillars',
    'landing.nav.tools': 'Tools',
    'landing.nav.start': 'Start',
    'landing.hero.badge': 'Neurodiverse Innovation',
    'landing.hero.title': 'From Intention to Practice',
    'landing.hero.subtitle': 'A digital platform designed for neurodiverse inclusion and real operational agreements. Accessible, clear, and built for humans.',
    'landing.hero.cta': 'Create my account',
    'landing.pillars.title': 'Our Pillars',
    'landing.pillars.subtitle': 'PACTO reduces cognitive load by prioritizing visual structure and psychological safety.',
    'landing.pillars.1.title': 'Psychological Safety',
    'landing.pillars.1.desc': 'We create safe feedback loops where every member shares their cognitive needs.',
    'landing.pillars.2.title': 'Operational Clarity',
    'landing.pillars.2.desc': 'We eliminate ambiguity. We define clear expectations and effective channels for everyone.',
    'landing.pillars.3.title': 'Neuro-Inclusion',
    'landing.pillars.3.desc': 'Tools created to accommodate ADHD, Autism, and diverse processing styles.',
    'landing.tools.title': 'Visual Tools',
    'landing.tools.subtitle': 'We design interfaces that reduce noise and maximize clarity.',
    'landing.tools.1.title': 'Agreements Canvas',
    'landing.tools.1.desc': 'Visualize all operational norms in one accessible place.',
    'landing.tools.2.title': 'Clarity Kits',
    'landing.tools.2.desc': 'Pre-designed cards to resolve common communication conflicts.',
    'landing.tools.3.title': 'Replay Rituals',
    'landing.tools.3.desc': 'Meeting structures that ensure everyone is aligned.',
    'landing.cta.title': 'Ready to build a truly inclusive culture?',
    'landing.cta.subtitle': 'Join companies already using PACTO to improve clarity and operational empathy.',
    'landing.cta.btn': 'Start for free today',
    'landing.footer.desc': 'Living agreements platform for neurodiverse workplace inclusion. We design structures that allow every mind to work better.',

    // --- DASHBOARD ---
    'dash.welcome': 'Hello, {name}',
    'dash.subtitle': 'Your personal space for clarity and agreements.',
    'dash.btn.library': 'Explore Library',
    'dash.btn.new': 'New Agreement',
    'dash.section.agreements': 'My Living Agreements',
    'dash.link.viewall': 'View all',
    'dash.empty.title': 'No agreements yet',
    'dash.empty.desc': 'Create a new one to improve clarity with your team.',
    'dash.empty.btn': 'Create my first agreement',
    'dash.widget.wellbeing': 'My Wellbeing',
    'dash.widget.clarity': 'Clarity',
    'dash.widget.tostart': 'To start',
    'dash.widget.ready': 'All set! You are aligned and ready to collaborate.',
    'dash.widget.nodata': 'No data yet. Create your first Living Agreement.',
    'dash.tools.title': 'Personal Tools',
    'dash.tools.focus.active': 'Focus Active',
    'dash.tools.focus.start': 'Start Focus Mode',
    'dash.tools.focus.muting': 'Muting notifications',
    'dash.tools.focus.desc': 'Mute notifications for 1h',
    'dash.tools.clarity.title': 'View Clarity Cards',
    'dash.tools.clarity.desc': 'Visual communication guides',
    'dash.tip.title': 'Tip of the Day',
    'dash.tip.btn.idle': 'Send Tip to Team',
    'dash.tip.btn.sending': 'Sending...',
    'dash.tip.btn.success': 'Sent!'
  },
  'pt-br': {
    // --- SETTINGS (Existing) ---
    'settings.title': 'Configurações de Idioma e Região',
    'settings.desc': 'Personalize sua experiência no PACTO para se adequar à sua localização e preferências de trabalho.',
    'label.language': 'Idioma da plataforma',
    'label.region': 'País/Região',
    'label.timezone': 'Fuso Horário',
    'label.dateformat': 'Formato de Data/Hora',
    'tip.title': 'Por que isso é importante?',
    'tip.desc': 'Configurar seu fuso horário correto ajuda sua equipe a respeitar suas horas de "Deep Work" e sincronizar melhor as reuniões.',
    'btn.cancel': 'Cancelar',
    'btn.save': 'Salvar alterações',
    'btn.saving': 'Salvando...',
    'region.select': 'Selecione seu país',
    'timezone.select': 'Selecionar...',
    'back': 'Voltar',

    // --- LANDING PAGE ---
    'landing.nav.mission': 'Missão',
    'landing.nav.pillars': 'Pilares',
    'landing.nav.tools': 'Ferramentas',
    'landing.nav.start': 'Começar',
    'landing.hero.badge': 'Inovação Neurodiversa',
    'landing.hero.title': 'Da Intenção à Prática',
    'landing.hero.subtitle': 'Uma plataforma digital projetada para inclusão neurodiversa e acordos operacionais reais. Acessível, clara e construída para humanos.',
    'landing.hero.cta': 'Criar minha conta',
    'landing.pillars.title': 'Nossos Pilares',
    'landing.pillars.subtitle': 'PACTO reduz a carga cognitiva priorizando a estrutura visual e a segurança psicológica.',
    'landing.pillars.1.title': 'Segurança Psicológica',
    'landing.pillars.1.desc': 'Criamos ciclos de feedback seguros onde cada membro compartilha suas necessidades cognitivas.',
    'landing.pillars.2.title': 'Clareza Operacional',
    'landing.pillars.2.desc': 'Eliminamos a ambiguidade. Definimos expectativas claras e canais eficazes para todos.',
    'landing.pillars.3.title': 'Neuroinclusão',
    'landing.pillars.3.desc': 'Ferramentas criadas para acomodar TDAH, Autismo e diversos estilos de processamento.',
    'landing.tools.title': 'Ferramentas Visuais',
    'landing.tools.subtitle': 'Projetamos interfaces que reduzem o ruído e maximizam a clareza.',
    'landing.tools.1.title': 'Canvas de Acordos',
    'landing.tools.1.desc': 'Visualize todas as normas operacionais em um único lugar acessível.',
    'landing.tools.2.title': 'Kits de Clareza',
    'landing.tools.2.desc': 'Cartões pré-desenhados para resolver conflitos comuns de comunicação.',
    'landing.tools.3.title': 'Rituais de Replay',
    'landing.tools.3.desc': 'Estruturas para reuniões que garantem que todos estejam alinhados.',
    'landing.cta.title': 'Pronto para construir uma cultura verdadeiramente inclusiva?',
    'landing.cta.subtitle': 'Junte-se a empresas que já usam o PACTO para melhorar a clareza e a empatia operacional.',
    'landing.cta.btn': 'Começar grátis hoje',
    'landing.footer.desc': 'Plataforma de acordos vivos para inclusão laboral neurodiversa. Projetamos estruturas que permitem que cada mente trabalhe melhor.',

    // --- DASHBOARD ---
    'dash.welcome': 'Olá, {name}',
    'dash.subtitle': 'Seu espaço pessoal de clareza e acordos.',
    'dash.btn.library': 'Explorar Biblioteca',
    'dash.btn.new': 'Novo Acordo',
    'dash.section.agreements': 'Meus Acordos Vivos',
    'dash.link.viewall': 'Ver todos',
    'dash.empty.title': 'Ainda não tem acordos',
    'dash.empty.desc': 'Crie um novo para melhorar a clareza com sua equipe.',
    'dash.empty.btn': 'Criar meu primeiro acordo',
    'dash.widget.wellbeing': 'Meu Bem-estar',
    'dash.widget.clarity': 'Clareza',
    'dash.widget.tostart': 'A iniciar',
    'dash.widget.ready': 'Tudo pronto! Você está alinhado e pronto para colaborar.',
    'dash.widget.nodata': 'Sem dados ainda. Crie seu primeiro Acordo Vivo.',
    'dash.tools.title': 'Ferramentas Pessoais',
    'dash.tools.focus.active': 'Foco Ativo',
    'dash.tools.focus.start': 'Iniciar Modo Foco',
    'dash.tools.focus.muting': 'Silenciando notificações',
    'dash.tools.focus.desc': 'Silenciar notificações por 1h',
    'dash.tools.clarity.title': 'Ver Clarity Cards',
    'dash.tools.clarity.desc': 'Guias visuais de comunicação',
    'dash.tip.title': 'Dica do Dia',
    'dash.tip.btn.idle': 'Enviar Dica para Equipe',
    'dash.tip.btn.sending': 'Enviando...',
    'dash.tip.btn.success': 'Enviado!'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es-la');


  const t = (key: string): string => {
    const langDict = translations[language] || translations['es-la'] || {};
    return langDict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
