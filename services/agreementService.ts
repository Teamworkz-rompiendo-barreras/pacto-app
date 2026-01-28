import { Agreement } from '../types';

const STORAGE_KEY = 'pacto_agreements';

// Initial default data if storage is empty
const DEFAULT_AGREEMENTS: Agreement[] = [
    {
        id: '1',
        title: 'Sin reuniones los viernes',
        description: 'Dedicamos los viernes a trabajo profundo y cierre de semana.',
        category: 'Foco',
        status: 'Activo',
        rules: [
            'No agendar reuniones internas los viernes.',
            'Excepción: Urgencias con clientes.',
            'Usar el tiempo para planificación y formación.'
        ],
        participants: [],
        createdBy: 'admin-1',
        updatedAt: new Date().toISOString(),
        version: 1,
        visibility: 'Organization'
    },
    {
        id: '2',
        title: 'Canales de Comunicación',
        description: 'Uso correcto de Slack, Email y WhatsApp.',
        category: 'Comunicación',
        status: 'Activo',
        rules: [
            'Slack: Comunicación asíncrona diaria.',
            'Email: Temas formales o externos.',
            'WhatsApp: Solo para urgencias reales (+24h sin respuesta).'
        ],
        participants: [],
        createdBy: 'admin-1',
        updatedAt: new Date().toISOString(),
        version: 1,
        visibility: 'Organization'
    }
];

// Helper to get data
const getStoredAgreements = (): Agreement[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_AGREEMENTS));
            return DEFAULT_AGREEMENTS;
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error("Error reading agreements from storage", e);
        return DEFAULT_AGREEMENTS;
    }
};

// Helper to set data
const setStoredAgreements = (agreements: Agreement[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agreements));
};

export const agreementService = {
    // Obtener acuerdos visibles para un usuario
    getAgreements: async (userId: string, role: string): Promise<Agreement[]> => {
        return new Promise((resolve) => {
            const agreements = getStoredAgreements();
            // Simulate network delay slightly for realism, but much faster
            setTimeout(() => resolve(agreements), 100);
        });
    },

    // Crear nuevo acuerdo
    createAgreement: async (agreement: Omit<Agreement, 'id' | 'updatedAt' | 'version'>): Promise<Agreement> => {
        const newAgreement: Agreement = {
            ...agreement,
            id: crypto.randomUUID(),
            updatedAt: new Date().toISOString(),
            version: 1
        };
        const current = getStoredAgreements();
        const updated = [newAgreement, ...current];
        setStoredAgreements(updated);
        return newAgreement;
    },

    // Actualizar acuerdo existente
    updateAgreement: async (id: string, updates: Partial<Agreement>): Promise<Agreement | null> => {
        const current = getStoredAgreements();
        const index = current.findIndex(a => a.id === id);
        if (index === -1) return null;

        const updatedAgreement = {
            ...current[index],
            ...updates,
            updatedAt: new Date().toISOString(),
            version: current[index].version + 1
        };
        current[index] = updatedAgreement;
        setStoredAgreements(current);
        return updatedAgreement;
    },

    // Eliminar (Soft Delete / Archivar)
    deleteAgreement: async (id: string): Promise<boolean> => {
        const current = getStoredAgreements();
        const filtered = current.filter(a => a.id !== id);
        setStoredAgreements(filtered);
        return true;
    }
};
