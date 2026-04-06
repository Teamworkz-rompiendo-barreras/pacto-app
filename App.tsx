import React, { useState, useEffect } from 'react';
import { View, UserProfile, AccessibilitySettings, Ritual, Agreement, RitualHistoryItem, Notification } from './types';
import { useLanguage, LanguageProvider } from './LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { authService } from './services/authService';
import { agreementService } from './services/agreementService';
import { ritualService } from './services/ritualService';
import { notificationService } from './services/notificationService';

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
import MyAgreements from './components/MyAgreements';
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
import RitualReplayLive from './components/RitualReplayLive';
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
    if (typeof window === 'undefined') return defaultValue;
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  // Actualizar estado si cambia la key (ej: cambio de usuario)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    } else {
      setValue(defaultValue);
    }
  }, [key, defaultValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// DATOS INICIALES (Vacíos para nuevos usuarios)
const DEFAULT_AGREEMENTS: Agreement[] = [];
const DEFAULT_RITUALS: Ritual[] = [];

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<View>(View.LANDING);

  // 1. ESTADO DE USUARIO (Global)
  const [user, setUser] = useStickyState<UserProfile | null>(null, 'pacto_user_v1');

  // 2. ESTADOS DE DATOS (Scopeados por ID de usuario para evitar mezclar datos)
  const userKey = user ? `pacto_data_${user.id}` : 'pacto_data_guest';

  // Agreements & Rituals State
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [rituals, setRituals] = useStickyState<Ritual[]>(DEFAULT_RITUALS, `${userKey}_rituals`);
  const [ritualHistory, setRitualHistory] = useState<RitualHistoryItem[]>([]);

  // Notifications State (New)
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load Initial Data
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const [loadedAgreements, loadedHistory, loadedNotifications] = await Promise.all([
          agreementService.getAgreements(user.id, user.role),
          ritualService.getHistory(user.id),
          notificationService.getNotifications(user.id)
        ]);
        setAgreements(loadedAgreements);
        setRitualHistory(loadedHistory);
        setNotifications(loadedNotifications);
      } else {
        setAgreements([]);
        setRitualHistory([]);
        setNotifications([]);
      }
    };
    loadData();

    // Poll for new notifications every 10 seconds (Simple real-time sim)
    const interval = setInterval(() => {
      if (user) {
        notificationService.getNotifications(user.id).then(setNotifications);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  // Estados temporales (UI)
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | undefined>(undefined);
  const [agreementTemplate, setAgreementTemplate] = useState<Partial<Agreement> | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Demo data for Team
  const DEMO_TEAM: UserProfile[] = [
    {
      id: '2',
      name: 'Ana García',
      email: 'ana@team.com',
      role: 'Admin',
      jobTitle: 'Engineering Manager',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      about: 'Liderando equipos con empatía y estructura.',
      settings: { id: 'temp2', dyslexia_font: false, high_contrast: false, comm_preference: 'Visual', avoid_calls: false, need_processing: false, profile_visibility: 'team' }
    },
    {
      id: '3',
      name: 'Carlos Ruiz',
      email: 'carlos@team.com',
      role: 'User',
      jobTitle: 'Frontend Developer',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      about: 'Apasionado por UX y accesibilidad.',
      settings: { id: 'temp3', dyslexia_font: false, high_contrast: false, comm_preference: 'Escrito', avoid_calls: true, need_processing: true, profile_visibility: 'team' }
    },
    {
      id: '4',
      name: 'Marta Díaz',
      email: 'marta@team.com',
      role: 'Admin',
      jobTitle: 'Product Owner',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
      about: 'Definiendo el futuro del producto.',
      settings: { id: 'temp4', dyslexia_font: false, high_contrast: false, comm_preference: 'Verbal', avoid_calls: false, need_processing: false, profile_visibility: 'team' }
    }
  ];

  const [teamMembers] = useState<UserProfile[]>(() => {
    // Intentar cargar usuarios desde Persistent Storage del Admin Panel para sincronización
    const savedUsers = localStorage.getItem('demo_org_users');

    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        // Mapear OrgUser (formato Admin) a UserProfile (formato App)
        // Preservamos los usuarios originales DE DEMO_TEAM si existen por ID para mantener sus 'settings' ricos
        return parsedUsers.map((u: any) => {
          const original = DEMO_TEAM.find(dt => dt.id === u.id);
          if (original) return original;

          // Para nuevos usuarios invitados, creamos un perfil default
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role === 'Manager' ? 'Admin' : 'User',
            jobTitle: u.role === 'Manager' ? 'Engineering Manager' : 'Team Member',
            avatar: u.avatar,
            about: 'Nuevo miembro del equipo.',
            settings: {
              id: `temp-${u.id}`,
              dyslexia_font: false,
              high_contrast: false,
              comm_preference: 'Escrito',
              avoid_calls: false,
              need_processing: false,
              profile_visibility: 'team'
            }
          };
        });
      } catch (e) {
        console.error('Error parsing demo_org_users', e);
        return DEMO_TEAM;
      }
    } else {
      // Si no hay datos, inicializamos el storage con DEMO_TEAM para que el Admin Panel tenga datos
      const initialAdminUsers = DEMO_TEAM.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role, // Ahora ya es Admin/User desde DEMO_TEAM
        status: 'Activo',
        teamId: 't1', // Asignar a equipo default
        avatar: u.avatar
      }));
      localStorage.setItem('demo_org_users', JSON.stringify(initialAdminUsers));
      return DEMO_TEAM;
    }
  });

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

  const handleLogin = async (userProfile: UserProfile) => {
    // Directly use the user object returned from Login (which comes from AuthService -> UserService)
    if (userProfile) {
      setUser(userProfile);
    } else {
      console.warn("Login exitoso pero sin datos de usuario.");
    }
    navigateTo(View.DASHBOARD);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setUser(null); // Esto borra la sesión de localStorage gracias al hook
    navigateTo(View.LANDING);
  };

  // Lógica funcional para Acuerdos
  const handleSaveAgreement = async (newAgreementData: Partial<Agreement>) => {
    if (!user) return;

    // Completar datos faltantes para el servicio
    const agreementToCreate = {
      title: newAgreementData.title || 'Sin Título',
      description: newAgreementData.description || '',
      category: newAgreementData.category || 'Comunicación',
      status: 'Activo' as const,
      rules: newAgreementData.rules || [],
      participants: newAgreementData.participants || [],
      urgency: newAgreementData.urgency,
      deadline: newAgreementData.deadline,
      createdBy: user.id, // Asignar creador actual
      visibility: newAgreementData.visibility || 'Team' // Default visibility
    };

    const created = await agreementService.createAgreement(agreementToCreate);
    setAgreements(prev => [created, ...prev]);
    setAgreementTemplate(undefined);
    setShowCelebration(true);
    navigateTo(View.DASHBOARD);
  };

  const handleUpdateAgreement = async (updatedData: Partial<Agreement>) => {
    if (selectedAgreement) {
      const updated = await agreementService.updateAgreement(selectedAgreement.id, updatedData);
      if (updated) {
        setAgreements(prev => prev.map(a => a.id === selectedAgreement.id ? updated : a));
      }
    }
    setSelectedAgreement(undefined);
    navigateTo(View.DASHBOARD);
    setSelectedAgreement(undefined);
    navigateTo(View.DASHBOARD);
  };

  const handleArchiveAgreement = async () => {
    if (selectedAgreement) {
      if (confirm("¿Estás seguro de que quieres archivar este acuerdo? Dejará de ser visible en el Dashboard.")) {
        const updated = await agreementService.updateAgreement(selectedAgreement.id, { status: 'Archivado' });
        if (updated) {
          setAgreements(prev => prev.map(a => a.id === selectedAgreement.id ? updated : a));
        }
        setSelectedAgreement(undefined);
        navigateTo(View.DASHBOARD);
      }
    }
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
    setShowCelebration(true); // Feedback visual
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
            agreements={agreements.filter(a => a.status !== 'Archivado')}
            onCreateNew={() => { setAgreementTemplate(undefined); navigateTo(View.NEW_AGREEMENT); }}
            onViewAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.AGREEMENT_DETAILS);
            }}
            onEditAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.EDIT_AGREEMENT);
            }}
            onExploreLibrary={() => navigateTo(View.LIBRARY)}
            onNavigate={navigateTo}
            // NEW: Notification Props
            notifications={notifications}
            onSendTip={async (tip) => {
              if (user) {
                await notificationService.sendNotification(
                  { name: user.name, avatar: user.avatar },
                  'tip',
                  'Nuevo Tip de Inclusión',
                  `${user.name.split(' ')[0]} compartió: "${tip}"`,
                  'ALL'
                );
                // Refresh instantly
                notificationService.getNotifications(user.id).then(setNotifications);
              }
            }}
          />
        );

      case View.ARCHIVED_AGREEMENTS:
        return (
          <Dashboard
            user={user}
            agreements={agreements.filter(a => a.status === 'Archivado')}
            onCreateNew={() => { setAgreementTemplate(undefined); navigateTo(View.NEW_AGREEMENT); }}
            onViewAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.AGREEMENT_DETAILS);
            }}
            onEditAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.EDIT_AGREEMENT);
            }}
            onExploreLibrary={() => navigateTo(View.LIBRARY)}
            onNavigate={navigateTo}
            notifications={notifications}
            isArchivedView={true}
          />
        );

      case View.MY_AGREEMENTS:
        return (
          <MyAgreements
            agreements={agreements.filter(a => a.status !== 'Archivado')}
            onCreateNew={() => { setAgreementTemplate(undefined); navigateTo(View.NEW_AGREEMENT); }}
            onViewAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.AGREEMENT_DETAILS);
            }}
            onEditAgreement={(agreement) => {
              setSelectedAgreement(agreement);
              navigateTo(View.EDIT_AGREEMENT);
            }}
          />
        );

      case View.MY_COMMITMENTS:
        return <MyCommitments />;

      case View.NEW_AGREEMENT:
        return (
          <AgreementForm
            initialData={agreementTemplate}
            onSave={handleSaveAgreement}
            onCancel={() => navigateTo(View.DASHBOARD)}
          />
        );

        return (
          <div className="w-full">
            <EditAgreement
              initialData={selectedAgreement}
              onSave={(data) => { handleUpdateAgreement(data) }}
              onBack={() => navigateTo(View.DASHBOARD)}
              onArchive={handleArchiveAgreement}
            />
          </div>
        );

      case View.AGREEMENT_DETAILS:
        return <AgreementDetails agreement={selectedAgreement} onEdit={() => navigateTo(View.EDIT_AGREEMENT)} onArchive={handleArchiveAgreement} />;

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
              onOpenPublicView={() => { setSelectedUser(user); navigateTo(View.PUBLIC_PROFILE); }}
              onLogout={() => setShowLogoutModal(true)}
              onDeleteAccount={handleLogout}
              onNavigateToLanguage={() => navigateTo(View.LANGUAGE_REGION)}
            />
          </div>
        );

      case View.PUBLIC_PROFILE:
        return <PublicProfile user={selectedUser || user || undefined} agreements={agreements} colleagues={teamMembers} onBack={() => navigateTo(View.PROFILE)} onProposeAgreement={() => navigateTo(View.NEW_AGREEMENT)} />;

      case View.TEAM:
        return (
          <TeamDirectory
            members={teamMembers}
            onViewProfile={(u) => { setSelectedUser(u); navigateTo(View.PUBLIC_PROFILE); }}
            onNavigateToPrivacy={() => navigateTo(View.TEAM_PRIVACY)}
          />
        );

      case View.TEAM_PRIVACY:
        return <TeamPrivacySettings onBack={() => navigateTo(View.TEAM)} onSave={() => navigateTo(View.TEAM)} userAvatar={user?.avatar} />;

      case View.FEEDBACK:
        return <Feedback onSave={() => navigateTo(View.DASHBOARD)} onCancel={() => navigateTo(View.DASHBOARD)} />;

      case View.INCLUSION_BOX:
        return <InclusionBox />;

      case View.ACHIEVEMENTS:
        return <Achievements onCelebrate={() => setShowCelebration(true)} />;

      case View.ORGANIZATION:
        return <div className="w-full overflow-hidden"><OrganizationPanel onNavigateToBulkUpload={() => navigateTo(View.BULK_UPLOAD)} onNavigateToDataExport={() => navigateTo(View.DATA_EXPORT)} /></div>;

      case View.BULK_UPLOAD:
        return <div className="p-6 md:p-10 w-full"><BulkUpload onBack={() => navigateTo(View.ORGANIZATION)} onComplete={() => navigateTo(View.ORGANIZATION)} /></div>;

      case View.DATA_EXPORT:
        return <DataExport />;

      case View.CLARITY_CARDS:
        return (
          <div className="p-6 md:p-10 w-full">
            <ClarityCards
              onCreateNew={() => navigateTo(View.NEW_AGREEMENT)}
              onConvertToAgreement={(template) => {
                setAgreementTemplate(template);
                navigateTo(View.NEW_AGREEMENT);
              }}
            />
          </div>
        );

      case View.RITUALS:
        return (
          <Rituals
            rituals={rituals}
            onCreate={() => navigateTo(View.NEW_RITUAL)}
            onViewDetails={(r) => {
              setSelectedRitual(r);
              navigateTo(View.RITUAL_DETAILS);
            }}
            onToggleStatus={() => { }}
            onViewHistory={() => navigateTo(View.RITUAL_HISTORY)}
            onStartPreparation={() => navigateTo(View.RITUAL_REPLAY_LIVE)}
          />
        );

      case View.NEW_RITUAL:
        return <div className="p-6 md:p-10 w-full"><NewRitual activeAgreements={agreements.filter(a => a.status === 'Activo')} onCancel={() => navigateTo(View.RITUALS)} onSave={handleSaveRitual} /></div>;

      case View.RITUAL_DETAILS:
        if (!selectedRitual) return <div className="p-10 text-center">No ritual selected</div>;
        return <div className="p-6 md:p-10 w-full"><RitualDetails ritual={selectedRitual} /></div>;

      case View.RITUAL_HISTORY:
        return <div className="p-6 md:p-10 w-full"><RitualHistory history={ritualHistory} onBack={() => navigateTo(View.RITUALS)} onViewDetails={(item) => {/* Logic for history details */ }} /></div>;

      case View.RITUAL_REMINDER:
        return <RitualReminder onJoin={() => navigateTo(View.RITUAL_PREPARATION)} onSnooze={() => navigateTo(View.DASHBOARD)} />;

      case View.RITUAL_PREPARATION:
        return <RitualPreparation agreements={agreements.filter(a => a.status === 'Activo')} onBack={() => navigateTo(View.RITUALS)} onNext={() => navigateTo(View.RITUAL_REFLECTION)} />

      case View.RITUAL_REFLECTION:
        return <RitualReflection agreements={agreements} onNext={() => navigateTo(View.RITUAL_CONCLUSIONS)} userAvatar={user?.avatar} />;

      case View.RITUAL_CONCLUSIONS:
        return <RitualConclusions onBack={() => navigateTo(View.RITUAL_REFLECTION)} onFinish={() => navigateTo(View.RITUALS)} />;

      case View.RITUAL_REPLAY_LIVE:
        return (
          <RitualReplayLive
            agreements={agreements.filter(a => a.status === 'Activo')}
            teamMembers={teamMembers}
            onBack={() => navigateTo(View.RITUALS)}
            onFinish={() => {
              setShowCelebration(true);
              navigateTo(View.RITUALS);
            }}
          />
        );

      case View.REPORTS:
        return (
          <MonthlyReport
            onNavigateToWeekly={() => navigateTo(View.WEEKLY_SUMMARY)}
          />
        );

      case View.WEEKLY_SUMMARY:
        return <WeeklySummary onNavigateToCards={() => navigateTo(View.CLARITY_CARDS)} />;

      case View.NOTIFICATIONS:
        return (
          <Notifications
            notifications={notifications}
            onConfigure={() => navigateTo(View.NOTIFICATION_SETTINGS)}
            onViewItem={(type) => navigateTo(type === 'weekly' ? View.WEEKLY_SUMMARY : View.DASHBOARD)}
            onMarkRead={() => user && notificationService.markAsRead(user.id).then(() => notificationService.getNotifications(user.id).then(setNotifications))}
          />
        );

      case View.NOTIFICATION_SETTINGS:
        return <NotificationPreferences onSave={() => navigateTo(View.NOTIFICATIONS)} />;

      case View.LANGUAGE_REGION:
        return <LanguageRegionSettings onBack={() => navigateTo(View.PROFILE)} onSave={() => navigateTo(View.PROFILE)} userAvatar={user?.avatar} />;

      case View.GLOBAL_SEARCH:
        return <div className="w-full"><GlobalSearch onAdoptAgreement={() => navigateTo(View.NEW_AGREEMENT)} /></div>;

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
        return renderInfoPage(t('page.mission'), t('page.mission.content'));
      case View.SUCCESS_STORIES:
        return renderInfoPage(t('page.success'), t('page.success.content'));
      case View.PRICING:
        return renderInfoPage(t('page.pricing'), t('page.pricing.content'));
      case View.ACCESSIBILITY:
        return renderInfoPage(t('page.accessibility'), t('page.accessibility.content'));
      case View.PRIVACY:
        return renderInfoPage(t('page.privacy'), t('page.privacy.content'));
      case View.COOKIES:
        return renderInfoPage(t('page.cookies'), t('page.cookies.content'));
      case View.LEGAL:
        return renderInfoPage(t('page.legal'), t('page.legal.content'));

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
            notifications={notifications}
            onSendTip={() => { }}
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
        <Layout
          user={user}
          currentView={view}
          onNavigate={navigateTo}
          onLogout={() => setShowLogoutModal(true)}
          unreadCount={notifications.filter(n => !n.isRead).length}
          onOpenNotifications={() => navigateTo(View.NOTIFICATIONS)}
          onBack={(() => {
            if ([
              View.PROFILE, View.CLARITY_CARDS, View.FEEDBACK, View.MY_COMMITMENTS,
              View.AGREEMENT_DETAILS, View.EDIT_AGREEMENT, View.NEW_AGREEMENT,
              View.INCLUSION_BOX, View.ACHIEVEMENTS, View.ORGANIZATION,
              View.REPORTS, View.NOTIFICATIONS, View.GLOBAL_SEARCH, View.LIBRARY,
              View.RITUALS, View.RITUAL_REMINDER, View.RITUAL_DETAILS,
              View.TEAM, View.MY_AGREEMENTS
            ].includes(view)) return () => navigateTo(View.DASHBOARD);
            if (view === View.PUBLIC_PROFILE) return () => navigateTo(View.PROFILE);
            if (view === View.TEAM_PRIVACY) return () => navigateTo(View.TEAM);
            if (view === View.BULK_UPLOAD || view === View.DATA_EXPORT) return () => navigateTo(View.ORGANIZATION);
            if (view === View.NEW_RITUAL || view === View.RITUAL_HISTORY || view === View.RITUAL_PREPARATION) return () => navigateTo(View.RITUALS);
            if (view === View.RITUAL_REFLECTION) return () => navigateTo(View.RITUAL_PREPARATION);
            if (view === View.RITUAL_CONCLUSIONS) return () => navigateTo(View.RITUAL_REFLECTION);
            if (view === View.WEEKLY_SUMMARY) return () => navigateTo(View.REPORTS);
            if (view === View.NOTIFICATION_SETTINGS) return () => navigateTo(View.NOTIFICATIONS);
            if (view === View.LANGUAGE_REGION) return () => navigateTo(View.PROFILE);
            if (view === View.MY_LIBRARY) return () => navigateTo(View.LIBRARY);
            return undefined;
          })()}
        >
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
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
