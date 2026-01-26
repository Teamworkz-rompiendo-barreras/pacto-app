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
    'back': 'Volver'
  },
  'en-us': {
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
    'back': 'Back'
  },
  'pt-br': {
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
    'back': 'Voltar'
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
