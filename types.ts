
export type CommPreference = 'Visual' | 'Escrito' | 'Verbal';

export interface AccessibilitySettings {
  id: string;
  dyslexia_font: boolean;
  high_contrast: boolean;
  comm_preference: CommPreference;
  avoid_calls?: boolean;
  need_processing?: boolean;
  profile_visibility?: 'team' | 'managers' | 'private';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  about?: string;
  avatar?: string; // Nuevo campo para la foto
  phone?: string;
  language?: string;
  plan?: 'SEED' | 'GROWTH' | 'ENTERPRISE';
  maxMembers?: number;
  settings: AccessibilitySettings;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leadId?: string; // ID del usuario líder
  memberCount: number;
  color: string;
}

export interface Agreement {
  id: string;
  title: string;
  description: string;
  category: 'Comunicación' | 'Foco' | 'Feedback' | 'Social';
  status: 'Activo' | 'Borrador' | 'Archivado';
  rules?: string[];
  participants?: string[];
  urgency?: string;
  deadline?: string;
  createdBy: string; // User ID
  updatedAt: string; // ISO String
  version: number;
  visibility: 'Organization' | 'Team' | 'Private';
}

export interface Ritual {
  id: number;
  title: string;
  desc: string;
  time: string;
  type: string;
  icon: string;
  status: 'pending' | 'completed';
  participants?: string[];
  agenda?: string[];
}

export interface RitualHistoryItem {
  id: number;
  ritualId: number;
  title: string;
  category: string;
  date: string;
  timestamp: number;
  summary: string;
  satisfaction: 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very_dissatisfied';
  icon: string;
  participants: string[];
}

export enum View {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  MY_AGREEMENTS = 'MY_AGREEMENTS',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD', // Nueva vista para recuperación
  MY_COMMITMENTS = 'MY_COMMITMENTS',
  NEW_AGREEMENT = 'NEW_AGREEMENT',
  AGREEMENT_DETAILS = 'AGREEMENT_DETAILS',
  EDIT_AGREEMENT = 'EDIT_AGREEMENT',
  PROFILE = 'PROFILE',
  PUBLIC_PROFILE = 'PUBLIC_PROFILE',
  TEAM = 'TEAM',
  TEAM_PRIVACY = 'TEAM_PRIVACY',
  FEEDBACK = 'FEEDBACK',
  INCLUSION_BOX = 'INCLUSION_BOX',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  ORGANIZATION = 'ORGANIZATION',
  BULK_UPLOAD = 'BULK_UPLOAD',
  DATA_EXPORT = 'DATA_EXPORT',
  CLARITY_CARDS = 'CLARITY_CARDS',
  ARCHIVED_AGREEMENTS = 'ARCHIVED_AGREEMENTS',
  RITUALS = 'RITUALS',
  NEW_RITUAL = 'NEW_RITUAL',
  RITUAL_DETAILS = 'RITUAL_DETAILS',
  RITUAL_HISTORY = 'RITUAL_HISTORY',
  RITUAL_REMINDER = 'RITUAL_REMINDER',
  RITUAL_PREPARATION = 'RITUAL_PREPARATION',
  RITUAL_REFLECTION = 'RITUAL_REFLECTION',
  RITUAL_CONCLUSIONS = 'RITUAL_CONCLUSIONS', // Nueva vista
  REPORTS = 'REPORTS',
  WEEKLY_SUMMARY = 'WEEKLY_SUMMARY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  NOTIFICATION_SETTINGS = 'NOTIFICATION_SETTINGS',
  LANGUAGE_REGION = 'LANGUAGE_REGION',
  GLOBAL_SEARCH = 'GLOBAL_SEARCH',
  CONTACT = 'CONTACT',
  HELP_CENTER = 'HELP_CENTER',
  LIBRARY = 'LIBRARY',
  MY_LIBRARY = 'MY_LIBRARY',
  METHODOLOGY = 'METHODOLOGY',
  // Páginas Informativas y Legales
  ACCESSIBILITY = 'ACCESSIBILITY',
  PRIVACY = 'PRIVACY',
  COOKIES = 'COOKIES',
  LEGAL = 'LEGAL',
  PRICING = 'PRICING',
  SUCCESS_STORIES = 'SUCCESS_STORIES',
  MISSION = 'MISSION'
}

export interface Notification {
  id: string;
  userId: string; // The recipient
  type: 'agreement' | 'ritual' | 'report' | 'accessibility' | 'weekly' | 'tip';
  title: string;
  message: string;
  isRead: boolean;
  date: string; // ISO string
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
  };
}

export const SUPPORTED_LANGUAGES = [
  "Español (España)", "Español (Latinoamérica)",
  "English (US)", "English (UK)", "English (EU)",
  "Português (Brasil)", "Português (Portugal)",
  "Français", "Deutsch", "Italiano", "Ελληνικά (Greek)",
  "Nederlands", "Polski", "Svenska", "Dansk", "Suomi",
  "Čeština", "Magyar", "Română", "Български"
];

export const SUPPORTED_REGIONS = [
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "be", name: "Bélgica" },
  { code: "bo", name: "Bolivia" },
  { code: "br", name: "Brasil" },
  { code: "ca", name: "Canadá" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "cr", name: "Costa Rica" },
  { code: "dk", name: "Dinamarca" },
  { code: "ec", name: "Ecuador" },
  { code: "sv", name: "El Salvador" },
  { code: "es", name: "España" },
  { code: "us", name: "Estados Unidos" },
  { code: "fi", name: "Finlandia" },
  { code: "fr", name: "Francia" },
  { code: "de", name: "Alemania" },
  { code: "gt", name: "Guatemala" },
  { code: "hn", name: "Honduras" },
  { code: "ie", name: "Irlanda" },
  { code: "it", name: "Italia" },
  { code: "mx", name: "México" },
  { code: "nl", name: "Países Bajos" },
  { code: "nz", name: "Nueva Zelanda" },
  { code: "ni", name: "Nicaragua" },
  { code: "no", name: "Noruega" },
  { code: "pa", name: "Panamá" },
  { code: "py", name: "Paraguay" },
  { code: "pe", name: "Perú" },
  { code: "pl", name: "Polonia" },
  { code: "pt", name: "Portugal" },
  { code: "pr", name: "Puerto Rico" },
  { code: "do", name: "República Dominicana" },
  { code: "gb", name: "Reino Unido" },
  { code: "se", name: "Suecia" },
  { code: "ch", name: "Suiza" },
  { code: "uy", name: "Uruguay" },
  { code: "ve", name: "Venezuela" }
];

export const SUPPORTED_TIMEZONES = [
  { value: "utc-12", label: "(UTC-12:00) Línea internacional de fecha del oeste" },
  { value: "utc-11", label: "(UTC-11:00) Isla Midway, Samoa" },
  { value: "utc-10", label: "(UTC-10:00) Hawái" },
  { value: "utc-09", label: "(UTC-09:00) Alaska" },
  { value: "utc-08", label: "(UTC-08:00) Hora del Pacífico (USA y Canadá)" },
  { value: "utc-07", label: "(UTC-07:00) Hora de la Montaña (USA y Canadá)" },
  { value: "utc-06", label: "(UTC-06:00) Hora Central (USA y Canadá), Ciudad de México" },
  { value: "utc-05", label: "(UTC-05:00) Hora del Este (USA y Canadá), Bogotá, Lima" },
  { value: "utc-04", label: "(UTC-04:00) Hora del Atlántico (Canadá), Santiago" },
  { value: "utc-03", label: "(UTC-03:00) Buenos Aires, Brasilia" },
  { value: "utc-02", label: "(UTC-02:00) Atlántico Central" },
  { value: "utc-01", label: "(UTC-01:00) Azores, Cabo Verde" },
  { value: "utc+00", label: "(UTC+00:00) Londres, Dublín, Lisboa" },
  { value: "utc+01", label: "(UTC+01:00) Madrid, París, Berlín, Roma" },
  { value: "utc+02", label: "(UTC+02:00) Atenas, Bucarest, Estambul" },
  { value: "utc+03", label: "(UTC+03:00) Moscú, San Petersburgo" },
  { value: "utc+04", label: "(UTC+04:00) Abu Dabi, Mascate" },
  { value: "utc+05", label: "(UTC+05:00) Islamabad, Karachi" },
  { value: "utc+06", label: "(UTC+06:00) Almaty, Dhaka" },
  { value: "utc+07", label: "(UTC+07:00) Bangkok, Hanoi, Yakarta" },
  { value: "utc+08", label: "(UTC+08:00) Pekín, Hong Kong, Singapur" },
  { value: "utc+09", label: "(UTC+09:00) Tokio, Seúl" },
  { value: "utc+10", label: "(UTC+10:00) Sídney, Melbourne" },
  { value: "utc+11", label: "(UTC+11:00) Islas Salomón, Nueva Caledonia" },
  { value: "utc+12", label: "(UTC+12:00) Fiyi, Kamchatka" }
];
