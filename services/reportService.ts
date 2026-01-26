
import { ritualService } from './ritualService';
import { agreementService } from './agreementService';

export interface MonthlyKPI {
    id: string;
    label: string;
    value: string | number;
    trend: number; // percentage change
    trendDirection: 'up' | 'down' | 'neutral';
    icon: string;
    color: string;
}

export interface WeeklySummaryData {
    ritualsCompleted: number;
    agreementsCreated: number;
    focusHours: number[]; // Mon-Fri
    topAchievements: string[];
}

export const reportService = {
    // Generates monthly report data aggregating from other services + mocks
    getMonthlyMetrics: async (userId: string) => {
        // Real data aggregation would happen here
        // For now we mock the aggregation logic based on the user's "activity"

        return {
            month: 'Octubre 2023',
            kpis: [
                { id: 'clarity', label: 'Índice de Claridad', value: '88%', trend: 5.2, trendDirection: 'up', icon: 'clarify', color: 'text-primary' },
                { id: 'rituals', label: 'Participación', value: '92%', trend: -1.5, trendDirection: 'down', icon: 'event_available', color: 'text-p1' },
                { id: 'agreements', label: 'Salud Acuerdos', value: '75%', trend: 10, trendDirection: 'up', icon: 'handshake', color: 'text-secondary-s3' },
                { id: 'satisfaction', label: 'Satisfacción', value: '4.8', trend: 0.2, trendDirection: 'up', icon: 'sentiment_satisfied', color: 'text-green-600' }
            ],
            psychologicalSafetyTrend: [62, 58, 71, 68, 79, 82], // last 6 months
            recommendations: [
                { category: 'Fatiga Cognitiva', text: 'Considerar ajustar el acuerdo de reuniones para reducir la fatiga cognitiva.', type: 'primary' },
                { category: 'Claridad de Roles', text: 'Detectada ambigüedad en la asignación de tareas del Equipo A.', type: 'warning' }
            ]
        };
    },

    getWeeklySummary: async (userId: string): Promise<WeeklySummaryData> => {
        return {
            ritualsCompleted: 3,
            agreementsCreated: 1,
            focusHours: [2.5, 4.0, 1.8, 3.2, 3.0], // Mon, Tue, Wed, Thu, Fri
            topAchievements: [
                'Has aportado 2 sugerencias en Reunión de Sincronización',
                'Ayudaste a desbloquear 1 tarea en Proyecto Alpha'
            ]
        };
    }
};
