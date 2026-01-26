import { Agreement } from '../types';

// Mock Data
let MOCK_AGREEMENTS: Agreement[] = [
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

export const agreementService = {
    // Obtener acuerdos visibles para un usuario
    getAgreements: async (userId: string, role: string): Promise<Agreement[]> => {
        // En un futuro, filtrar por visibilidad y permisos
        // Por ahora devolvemos todos los mocks + los creados en memoria
        return new Promise((resolve) => {
            setTimeout(() => resolve([...MOCK_AGREEMENTS]), 500); // Simulate delay
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
        MOCK_AGREEMENTS = [newAgreement, ...MOCK_AGREEMENTS];
        return newAgreement;
    },

    // Actualizar acuerdo existente
    updateAgreement: async (id: string, updates: Partial<Agreement>): Promise<Agreement | null> => {
        const index = MOCK_AGREEMENTS.findIndex(a => a.id === id);
        if (index === -1) return null;

        const updatedAgreement = {
            ...MOCK_AGREEMENTS[index],
            ...updates,
            updatedAt: new Date().toISOString(),
            version: MOCK_AGREEMENTS[index].version + 1
        };
        MOCK_AGREEMENTS[index] = updatedAgreement;
        return updatedAgreement;
    },

    // Eliminar (Soft Delete / Archivar)
    deleteAgreement: async (id: string): Promise<boolean> => {
        MOCK_AGREEMENTS = MOCK_AGREEMENTS.filter(a => a.id !== id);
        return true;
    }
};
