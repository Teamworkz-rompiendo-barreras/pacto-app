
import { Ritual } from '../types';

// Mock DB
const RITUALS_KEY = 'pacto_rituals_v1';
const HISTORY_KEY = 'pacto_ritual_history_v1';

export interface RitualHistoryItem {
    id: number;
    ritualId: number; // Link to base ritual definition
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
        ritualId: 101, // Mock
        title: "Sincronización Semanal",
        category: "Sincronización",
        date: "12 de Octubre, 2023 • 09:30 AM",
        timestamp: new Date('2023-10-12T09:30:00').getTime(),
        summary: "Se establecieron 3 nuevos protocolos para comunicación asincrónica durante bloques de trabajo profundo.",
        satisfaction: "very_satisfied",
        icon: "sync",
        participants: ['Ana', 'Carlos']
    },
    // ... more mock data if needed
];

export const ritualService = {
    // --- Ritual Definitions ---
    getRituals: async (userId: string): Promise<Ritual[]> => {
        // Simulating API 
        const stored = localStorage.getItem(`${RITUALS_KEY}_${userId}`);
        if (stored) return JSON.parse(stored);
        return []; // Return empty or default
    },

    saveRitual: async (userId: string, ritual: Ritual): Promise<Ritual> => {
        const rituals = await ritualService.getRituals(userId);
        const updated = [ritual, ...rituals.filter(r => r.id !== ritual.id)];
        localStorage.setItem(`${RITUALS_KEY}_${userId}`, JSON.stringify(updated));
        return ritual;
    },

    // --- History ---
    getHistory: async (userId: string): Promise<RitualHistoryItem[]> => {
        const stored = localStorage.getItem(`${HISTORY_KEY}_${userId}`);
        // If empty, return default mock for demo purposes if desired, or empty
        if (stored) return JSON.parse(stored);
        return DEFAULT_HISTORY;
    },

    addHistoryItem: async (userId: string, item: Omit<RitualHistoryItem, 'id'>): Promise<RitualHistoryItem> => {
        const history = await ritualService.getHistory(userId);
        const newItem = { ...item, id: Date.now() };
        const updated = [newItem, ...history];
        localStorage.setItem(`${HISTORY_KEY}_${userId}`, JSON.stringify(updated));
        return newItem;
    }
};
