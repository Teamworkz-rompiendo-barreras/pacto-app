
import React, { useState, useEffect } from 'react';
import { View, UserProfile, AccessibilitySettings, Ritual, Agreement } from './types';
import { LanguageProvider } from './LanguageContext';
import { authService } from './services/authService';

// Components
import Landing from './components/Landing';
import Login from './components/Login';
import UpdatePassword from './components/UpdatePassword';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import MyCommitments from './components/MyCommitments';
import AgreementForm from './components/AgreementForm';
import AgreementDetails from './components/AgreementDetails';
import EditAgreement from './components/EditAgreement';
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';
import TeamDirectory from './components/TeamDirectory';
import TeamPrivacySettings from './components/TeamPrivacySettings';
import Feedback from './components/Feedback';
import InclusionBox from './components/InclusionBox';
import Achievements from './components/Achievements';
import OrganizationPanel from './components/OrganizationPanel';
import BulkUpload from './components/BulkUpload';
import DataExport from './components/DataExport';
import ClarityCards from './components/ClarityCards';
import Rituals from './components/Rituals';
import NewRitual from './components/NewRitual';
import RitualDetails from './components/RitualDetails';
import RitualHistory from './components/RitualHistory';
import RitualReminder from './components/RitualReminder';
import RitualPreparation from './components/RitualPreparation';
import RitualReflection from './components/RitualReflection';
import RitualConclusions from './components/RitualConclusions';
import MonthlyReport from './components/MonthlyReport';
import WeeklySummary from './components/WeeklySummary';
import Notifications from './components/Notifications';
import NotificationPreferences from './components/NotificationPreferences';
import LanguageRegionSettings from './components/LanguageRegionSettings';
import GlobalSearch from './components/GlobalSearch';
import ContactForm from './components/ContactForm';
import HelpCenter from './components/HelpCenter';
import Library from './components/Library';
import MyLibrary from './components/MyLibrary';
import Methodology from './components/Methodology';
import InfoPage from './components/InfoPage';
import LogoutModal from './components/LogoutModal';
import CelebrationModal from './components/CelebrationModal';

// --- CUSTOM HOOK PARA PERSISTENCIA (EL CEREBRO DE LA APP) ---
function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// DATOS INICIALES (Solo se usan la primera vez)
const DEFAULT_AGREEMENTS: Agreement[] = [
  { id: '1', title: 'Política de Cámaras Opcionales', description: 'Uso de cámaras opcional en reuniones.', category: 'Comunicación', status: 'Activo' },
  { id: '2', title: 'Horas de Foco', description: 'Sin reuniones de 9 a 11 AM.', category: 'Foco', status: 'Activo' },
  { id: '3', title: 'Feedback Asíncrono', description: 'Feedback por escrito antes de 1:1.', category: 'Feedback', status: 'Borrador' },
];

const DEFAULT_RITUALS: Ritual[] = [
  { id: 1, title: 'Replay Semanal', desc: 'Sincronización de equipo', time: 'Hoy, 09:00', type: 'replay', icon: 'sync', status: 'pending', participants: ['Ana', 'Luis'] },
  { id: 2, title: 'Foco Profundo', desc: 'Bloque sin reuniones', time: 'Mañana, 10:00', type: 'focus', icon: 'timer', status: 'pending', participants: ['Todos'] }
];

const AppContent: React.FC = () => {
  const [view, setView] = useState<View>(View.LANDING);

  // ESTADOS PERSISTENTES (Se guardan en el móvil/PC)
  const [user, setUser] = useStickyState<UserProfile | null>(null, 'pacto_user_v1');
  const [agreements, setAgreements] = useStickyState<Agreement[]>(DEFAULT_AGREEMENTS, 'pacto_agreements_v1');
  const [rituals, setRituals] = useStickyState<Ritual[]>(DEFAULT_RITUALS, 'pacto_rituals_v1');

  // Estados temporales (UI)

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | undefined>(undefined);
  const [agreementTemplate, setAgreementTemplate] = useState<Partial<Agreement> | undefined>(undefined);

  // Mock data for Team (Static for now)
  const [teamMembers] = useState<UserProfile[]>([
    { id: '1', name: 'Ana García', email: 'ana@pacto.dev', role: 'Engineering Manager', settings: { id: '1', low_stimulus: false, dyslexia_font: false, high_contrast: false, comm_preference: 'Escrito' } },
    { id: '2', name: 'Luis Chen', email: 'luis@pacto.dev', role: 'Frontend Developer', settings: { id: '2', low_stimulus: true, dyslexia_font: false, high_contrast: false, comm_preference: 'Visual' } },
    { id: '3', name: 'Marta Ruiz', email: 'marta@pacto.dev', role: 'Product Owner', settings: { id: '3', low_stimulus: false, dyslexia_font: false, high_contrast: false, comm_preference: 'Verbal' } },
  ]);

  const navigateTo = (newView: View) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  // --- VERIFICACIÓN DE SESIÓN AL INICIO Y RUTAS ---
  useEffect(() => {
    const checkSession = async () => {
      // 1. Detectar si estamos en flujo de recuperación de contraseña
      const isRecovery = window.location.pathname === '/update-password' || window.location.hash.includes('type=recovery');

      if (isRecovery) {
        setView(View.UPDATE_PASSWORD);
      }

      // 2. Verificar usuario normal
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        // Solo redirigir al dashboard si estábamos en Landing y NO estamos recuperando pass
        if (view === View.LANDING && !isRecovery) setView(View.DASHBOARD);
      }
    };
    checkSession();
  }, []); // Dependencias vacías para ejecutar solo al montar app

  const handleLogin = async (name: string, settings: AccessibilitySettings) => {
    // Ya no creamos el usuario aquí, porque authService.signUp/signIn ya nos devuelve el usuario completo
    const currentUser = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      console.warn("No se pudo recuperar usuario tras login, usando datos locales temporales");
    }
    navigateTo(View.DASHBOARD);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setUser(null); // Esto borra la sesión de localStorage gracias al hook
    navigateTo(View.LANDING);
  };

  // Lógica funcional para Acuerdos
  const handleSaveAgreement = (newAgreementData: Partial<Agreement>) => {
    const newAgreement: Agreement = {
      id: Date.now().toString(),
      title: newAgreementData.title || 'Sin Título',
      description: newAgreementData.description || '',
      category: newAgreementData.category || 'Comunicación',
      status: 'Activo',
      ...newAgreementData
    };
    setAgreements([newAgreement, ...agreements]); // Guarda y actualiza la lista real
    setAgreementTemplate(undefined);
    setShowCelebration(true);
    navigateTo(View.DASHBOARD);
  };

  const handleUpdateAgreement = (updatedData: Partial<Agreement>) => {
    if (selectedAgreement) {
      const updatedList = agreements.map(a =>
        a.id === selectedAgreement.id ? { ...a, ...updatedData } : a
      );
      setAgreements(updatedList);
    }
    setSelectedAgreement(undefined);
    navigateTo(View.DASHBOARD);
  };

  // Lógica funcional para Rituales
  const handleSaveRitual = (newRitualData: Omit<Ritual, 'id' | 'status' | 'icon'>) => {
    const newRitual: Ritual = {
      id: Date.now(),
      ...newRitualData,
      status: 'pending',
      icon: 'event'
    };
    setRituals([...rituals, newRitual]);
    navigateTo(View.RITUALS);
  };

  // Redirección inteligente si ya hay usuario logueado
  useEffect(() => {
    if (user && view === View.LANDING) {
      setView(View.DASHBOARD);
    }
  }, [user]);

  // Helper for generic Info Pages
  const renderInfoPage = (title: string, content: string) => (
    <InfoPage title={title} content={<p>{content}</p>} onBack={() => navigateTo(user ? View.DASHBOARD : View.LANDING)} />
  );

  // Protección de Rutas
  if (!user && view !== View.LANDING && view !== View.LOGIN && !Object.values(View).includes(view as any)) {
    if ([View.METHODOLOGY, View.MISSION, View.PRICING, View.SUCCESS_STORIES, View.ACCESSIBILITY, View.PRIVACY, View.COOKIES, View.LEGAL].includes(view)) {
      // Páginas públicas permitidas
    } else {
      return <Landing onStart={() => navigateTo(View.LOGIN)} onContact={() => navigateTo(View.CONTACT)} onNavigate={navigateTo} />;
    }
  }

  // --- RENDERIZADO CON LAYOUT ---
  const renderContent = () => {
    switch (view) {
      case View.LANDING:
        return <Landing onStart={() => navigateTo(View.LOGIN)} onContact={() => navigateTo(View.CONTACT)} onNavigate={navigateTo} />;

      case View.LOGIN:
        return <div className="min-h-screen bg-bg-s1 flex items-center justify-center p-4"><Login onLogin={handleLogin} onCancel={() => navigateTo(View.LANDING)} /></div>;

      case View.UPDATE_PASSWORD:
        return <UpdatePassword onSuccess={() => navigateTo(View.DASHBOARD)} onCancel={() => navigateTo(View.LOGIN)} />;

      case View.DASHBOARD:
        return (
          <Dashboard
            user={user}
            agreements={agreements}
            onCreateNew={() => { setAgreementTemplate(undefined); navigateTo(View.NEW_AGREEMENT); }}
            onViewAgreement={() => navigateTo(View.AGREEMENT_DETAILS)}
            onEditAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.EDIT_AGREEMENT);
            }}
            onExploreLibrary={() => navigateTo(View.LIBRARY)}
            onNavigate={navigateTo}
          />
        );

      case View.MY_COMMITMENTS:
        return <div className="p-6 md:p-10 w-full"><MyCommitments onBack={() => navigateTo(View.DASHBOARD)} /></div>;

      case View.NEW_AGREEMENT:
        return (
          <div className="p-6 md:p-10 w-full">
            <AgreementForm
              initialData={agreementTemplate}
              onSave={handleSaveAgreement}
              onCancel={() => navigateTo(View.DASHBOARD)}
            />
          </div>
        );

      case View.EDIT_AGREEMENT:
        return (
          <div className="w-full">
            <EditAgreement
              initialData={selectedAgreement}
              onSave={() => { /* Lógica de guardado dummy */ handleUpdateAgreement({}) }}
              onBack={() => navigateTo(View.DASHBOARD)}
            />
          </div>
        );

      case View.AGREEMENT_DETAILS:
        return <AgreementDetails onBack={() => navigateTo(View.DASHBOARD)} onEdit={() => navigateTo(View.EDIT_AGREEMENT)} />;

      case View.PROFILE:
        if (!user) return null;
        return (
          <div className="w-full">
            <Profile
              user={user}
              settings={user.settings}
              onSaveSettings={(s) => setUser({ ...user, settings: s })}
              onUpdateUser={(u) => setUser({ ...user, ...u })}
              onCreateNew={() => navigateTo(View.NEW_AGREEMENT)}
              onOpenPublicView={() => navigateTo(View.PUBLIC_PROFILE)}
              onLogout={() => setShowLogoutModal(true)}
              onDeleteAccount={handleLogout}
              onNavigateToLanguage={() => navigateTo(View.LANGUAGE_REGION)}
              onBack={() => navigateTo(View.DASHBOARD)}
            />
          </div>
        );

      case View.PUBLIC_PROFILE:
        return <PublicProfile user={user || undefined} onBack={() => navigateTo(View.PROFILE)} onProposeAgreement={() => navigateTo(View.NEW_AGREEMENT)} />;

      case View.TEAM:
        return (
          <div className="p-6 md:p-10 w-full">
            <TeamDirectory
              members={teamMembers}
              onViewProfile={() => navigateTo(View.PUBLIC_PROFILE)}
              onGoBack={() => navigateTo(View.DASHBOARD)}
              onNavigateToPrivacy={() => navigateTo(View.TEAM_PRIVACY)}
            />
          </div>
        );

      case View.TEAM_PRIVACY:
        return <TeamPrivacySettings onBack={() => navigateTo(View.TEAM)} onSave={() => navigateTo(View.TEAM)} userAvatar={user?.avatar} />;

      case View.FEEDBACK:
        return <div className="p-6 md:p-10 w-full"><Feedback onSave={() => navigateTo(View.DASHBOARD)} onCancel={() => navigateTo(View.DASHBOARD)} /></div>;

      case View.INCLUSION_BOX:
        return <div className="p-6 md:p-10 w-full"><InclusionBox onBack={() => navigateTo(View.DASHBOARD)} /></div>;

      case View.ACHIEVEMENTS:
        return <div className="p-6 md:p-10 w-full"><Achievements onCelebrate={() => setShowCelebration(true)} onGoBack={() => navigateTo(View.DASHBOARD)} /></div>;

      case View.ORGANIZATION:
        return <div className="w-full overflow-hidden"><OrganizationPanel onNavigateToBulkUpload={() => navigateTo(View.BULK_UPLOAD)} onNavigateToDataExport={() => navigateTo(View.DATA_EXPORT)} /></div>;

      case View.BULK_UPLOAD:
        return <div className="p-6 md:p-10 w-full"><BulkUpload onBack={() => navigateTo(View.ORGANIZATION)} onComplete={() => navigateTo(View.ORGANIZATION)} /></div>;

      case View.DATA_EXPORT:
        return <DataExport onBack={() => navigateTo(View.ORGANIZATION)} />;

      case View.CLARITY_CARDS:
        return <div className="p-6 md:p-10 w-full"><ClarityCards onGoDashboard={() => navigateTo(View.DASHBOARD)} onCreateNew={() => navigateTo(View.NEW_AGREEMENT)} /></div>;

      case View.RITUALS:
        return (
          <div className="p-6 md:p-10 w-full h-full">
            <Rituals
              rituals={rituals}
              onCreate={() => navigateTo(View.NEW_RITUAL)}
              onViewDetails={(r) => {
                setSelectedRitual(r);
                navigateTo(View.RITUAL_DETAILS);
              }}
              onToggleStatus={() => { }}
              onViewHistory={() => navigateTo(View.RITUAL_HISTORY)}
              onStartPreparation={() => navigateTo(View.RITUAL_PREPARATION)}
            />
          </div>
        );

      case View.NEW_RITUAL:
        return <div className="p-6 md:p-10 w-full"><NewRitual onCancel={() => navigateTo(View.RITUALS)} onSave={handleSaveRitual} /></div>;

      case View.RITUAL_DETAILS:
        if (!selectedRitual) return <div className="p-10 text-center">No ritual selected</div>;
        return <div className="p-6 md:p-10 w-full"><RitualDetails ritual={selectedRitual} onBack={() => navigateTo(View.RITUALS)} /></div>;

      case View.RITUAL_HISTORY:
        return <div className="p-6 md:p-10 w-full"><RitualHistory onBack={() => navigateTo(View.RITUALS)} onViewDetails={(item) => {/* Logic for history details */ }} /></div>;

      case View.RITUAL_REMINDER:
        return <RitualReminder onJoin={() => navigateTo(View.RITUAL_PREPARATION)} onSnooze={() => navigateTo(View.DASHBOARD)} />;

      case View.RITUAL_PREPARATION:
        return <RitualPreparation onBack={() => navigateTo(View.RITUALS)} onNext={() => navigateTo(View.RITUAL_REFLECTION)} />

      case View.RITUAL_REFLECTION:
        return <RitualReflection onBack={() => navigateTo(View.RITUAL_PREPARATION)} onNext={() => navigateTo(View.RITUAL_CONCLUSIONS)} userAvatar={user?.avatar} />;

      case View.RITUAL_CONCLUSIONS:
        return <RitualConclusions onBack={() => navigateTo(View.RITUAL_REFLECTION)} onFinish={() => navigateTo(View.RITUALS)} />;

      case View.REPORTS:
        return (
          <div className="p-6 md:p-10 w-full">
            <MonthlyReport
              onBack={() => navigateTo(View.DASHBOARD)}
              onNavigateToWeekly={() => navigateTo(View.WEEKLY_SUMMARY)}
            />
          </div>
        );

      case View.WEEKLY_SUMMARY:
        return <WeeklySummary onBack={() => navigateTo(View.REPORTS)} onNavigateToCards={() => navigateTo(View.CLARITY_CARDS)} />;

      case View.NOTIFICATIONS:
        return <div className="p-6 md:p-10 w-full"><Notifications onBack={() => navigateTo(View.DASHBOARD)} onConfigure={() => navigateTo(View.NOTIFICATION_SETTINGS)} onViewItem={(type) => navigateTo(type === 'weekly' ? View.WEEKLY_SUMMARY : View.DASHBOARD)} /></div>;

      case View.NOTIFICATION_SETTINGS:
        return <NotificationPreferences onBack={() => navigateTo(View.NOTIFICATIONS)} onSave={() => navigateTo(View.NOTIFICATIONS)} />;

      case View.LANGUAGE_REGION:
        return <LanguageRegionSettings onBack={() => navigateTo(View.PROFILE)} onSave={() => navigateTo(View.PROFILE)} userAvatar={user?.avatar} />;

      case View.GLOBAL_SEARCH:
        return <div className="w-full"><GlobalSearch onBack={() => navigateTo(View.DASHBOARD)} onAdoptAgreement={() => navigateTo(View.NEW_AGREEMENT)} /></div>;

      case View.CONTACT:
        return (
          <div className="w-full bg-bg-s1 min-h-screen p-6 md:p-10">
            <button onClick={() => navigateTo(View.LANDING)} className="mb-4 flex items-center gap-2 text-gray-500 hover:text-primary font-bold"><span className="material-symbols-outlined">arrow_back</span> Volver</button>
            <ContactForm onCancel={() => navigateTo(View.LANDING)} onSend={() => navigateTo(View.LANDING)} isPublic={true} />
          </div>
        );

      case View.HELP_CENTER:
        if (!user) return <Landing onStart={() => navigateTo(View.LOGIN)} onNavigate={navigateTo} />;
        return <HelpCenter user={user} onNavigate={navigateTo} />;

      case View.LIBRARY:
        return (
          <Library
            onBack={() => navigateTo(View.DASHBOARD)}
            onUseTemplate={(template) => {
              setAgreementTemplate(template);
              navigateTo(View.NEW_AGREEMENT);
            }}
          />
        );

      case View.MY_LIBRARY:
        return <div className="p-6 md:p-10 w-full"><MyLibrary onGoToExplore={() => navigateTo(View.LIBRARY)} /></div>;

      case View.METHODOLOGY:
        return <Methodology onBack={() => navigateTo(View.LANDING)} />;

      // Generic Info Pages
      case View.MISSION:
        return renderInfoPage("Nuestra Misión", "Empoderar a equipos neurodiversos a través de la claridad y la empatía.");
      case View.SUCCESS_STORIES:
        return renderInfoPage("Casos de Éxito", "Descubre cómo empresas líderes están transformando su cultura.");
      case View.PRICING:
        return renderInfoPage("Precios", "Planes flexibles para equipos de todos los tamaños.");
      case View.ACCESSIBILITY:
        return renderInfoPage("Declaración de Accesibilidad", "Comprometidos con WCAG 2.2 AAA.");
      case View.PRIVACY:
        return renderInfoPage("Política de Privacidad", "Tus datos son tuyos. Transparencia total.");
      case View.COOKIES:
        return renderInfoPage("Política de Cookies", "Solo lo esencial para que la plataforma funcione.");
      case View.LEGAL:
        return renderInfoPage("Aviso Legal", "Información legal de Teamworkz.");

      default:
        // Si hay usuario y es una vista desconocida, dashboard; si no, landing
        return user ? (
          <Dashboard
            user={user}
            agreements={agreements}
            onCreateNew={() => navigateTo(View.NEW_AGREEMENT)}
            onViewAgreement={() => navigateTo(View.AGREEMENT_DETAILS)}
            onEditAgreement={() => navigateTo(View.EDIT_AGREEMENT)}
            onExploreLibrary={() => navigateTo(View.LIBRARY)}
            onNavigate={navigateTo}
          />
        ) : <Landing onStart={() => navigateTo(View.LOGIN)} onContact={() => navigateTo(View.CONTACT)} onNavigate={navigateTo} />;
    }
  };

  return (
    <>
      {showLogoutModal && (
        <LogoutModal
          user={user}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}

      {showCelebration && (
        <CelebrationModal onClose={() => setShowCelebration(false)} />
      )}

      {/* APLICAR LAYOUT SOLO SI HAY USUARIO Y NO ES UNA PÁGINA PÚBLICA */}
      {user && ![View.LANDING, View.LOGIN, View.UPDATE_PASSWORD].includes(view) ? (
        <Layout user={user} currentView={view} onNavigate={navigateTo} onLogout={() => setShowLogoutModal(true)}>
          {renderContent()}
        </Layout>
      ) : (
        renderContent()
      )}

    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
