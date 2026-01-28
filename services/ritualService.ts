import { Ritual } from '../types';

const RITUALS_KEY = 'pacto_rituals_v1';
const HISTORY_KEY = 'pacto_ritual_history_v1';

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

const DEFAULT_HISTORY: RitualHistoryItem[] = [
    {
        id: 1,
        ritualId: 101,
        title: "Sincronización Semanal",
        category: "Sincronización",
        date: "12 de Octubre, 2023 • 09:30 AM",
        timestamp: new Date('2023-10-12T09:30:00').getTime(),
        summary: "Se establecieron 3 nuevos protocolos para comunicación asincrónica durante bloques de trabajo profundo.",
        satisfaction: "very_satisfied",
        icon: "sync",
        participants: ['Ana', 'Carlos']
    }
];

// Helper to get stored rituals
const getStoredRituals = (userId: string): Ritual[] => {
    try {
        const stored = localStorage.getItem(`${RITUALS_KEY}_${userId}`);
        if (stored) return JSON.parse(stored);
        return [];
    } catch {
        return [];
    }
};

const setStoredRituals = (userId: string, rituals: Ritual[]) => {
    localStorage.setItem(`${RITUALS_KEY}_${userId}`, JSON.stringify(rituals));
};

const getStoredHistory = (userId: string): RitualHistoryItem[] => {
    try {
        const stored = localStorage.getItem(`${HISTORY_KEY}_${userId}`);
        if (stored) return JSON.parse(stored);
        return DEFAULT_HISTORY;
    } catch {
        return DEFAULT_HISTORY;
    }
};

const setStoredHistory = (userId: string, history: RitualHistoryItem[]) => {
    localStorage.setItem(`${HISTORY_KEY}_${userId}`, JSON.stringify(history));
};

export const ritualService = {
    // --- Ritual Definitions ---
    getRituals: async (userId: string): Promise<Ritual[]> => {
        return new Promise(resolve => {
            // Simulate small delay
            setTimeout(() => resolve(getStoredRituals(userId)), 50);
        });
    },

    saveRitual: async (userId: string, ritual: Ritual): Promise<Ritual> => {
        const rituals = getStoredRituals(userId);
        const exists = rituals.find(r => r.id === ritual.id);
        let updated: Ritual[];
        if (exists) {
            updated = rituals.map(r => r.id === ritual.id ? ritual : r);
        } else {
            updated = [ritual, ...rituals];
        }
        setStoredRituals(userId, updated);
        return ritual;
    },

    // --- History ---
    getHistory: async (userId: string): Promise<RitualHistoryItem[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(getStoredHistory(userId)), 50);
        });
    },

    addHistoryItem: async (userId: string, item: Omit<RitualHistoryItem, 'id'>): Promise<RitualHistoryItem> => {
        const history = getStoredHistory(userId);
        const newItem = { ...item, id: Date.now() };
        const updated = [newItem, ...history];
        setStoredHistory(userId, updated);
        return newItem;
    }
};
