
export interface InclusionBoxSubmission {
    id: string;
    category: string; // 'entorno_fisico', 'comunicacion', 'cultura', 'procesos', 'otro'
    suggestion: string;
    impact: string;
    createdAt: number;
}

const INCLUSION_KEY = 'pacto_inclusion_v1';

export const wellbeingService = {
    // --- Inclusion Box ---
    submitSuggestion: async (submission: Omit<InclusionBoxSubmission, 'id' | 'createdAt'>): Promise<boolean> => {
        // Simulating API latency
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, this would be a POST request excluding personal data if anonymous
        const newSubmission: InclusionBoxSubmission = {
            id: Date.now().toString(),
            createdAt: Date.now(),
            ...submission
        };

        // Store locally for demo purposes (usually this goes to a secure DB)
        const stored = localStorage.getItem(INCLUSION_KEY);
        const history = stored ? JSON.parse(stored) : [];
        localStorage.setItem(INCLUSION_KEY, JSON.stringify([...history, newSubmission]));

        return true;
    },

    // --- Clarity Cards Tracking (Optional Analytics) ---
    trackCardUsage: async (cardTitle: string, action: 'view' | 'download' | 'use_template') => {
        console.log(`[Analytics] Card ${action}: ${cardTitle}`);
        // Here we could send stats to an analytics endpoint
    }
};
