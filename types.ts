
export type CommPreference = 'Visual' | 'Escrito' | 'Verbal';

export interface AccessibilitySettings {
  id: string;
  low_stimulus: boolean;
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

export const SUPPORTED_LANGUAGES = [
  "Español (España)", "Español (Latinoamérica)",
  "English (US)", "English (UK)", "English (EU)",
  "Português (Brasil)", "Português (Portugal)",
  "Français", "Deutsch", "Italiano", "Ελληνικά (Greek)",
  "Nederlands", "Polski", "Svenska", "Dansk", "Suomi",
  "Čeština", "Magyar", "Română", "Български"
];
