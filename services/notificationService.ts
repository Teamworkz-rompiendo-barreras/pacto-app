
import { Notification } from '../types';

// Clave para almacenamiento local de notificaciones personales
const NOTIFICATIONS_KEY_PREFIX = 'pacto_notifications_';
// Clave para "Buzón de Salida" compartido (Simulación de backend)
const SHARED_INBOX_KEY = 'pacto_shared_inbox';

export const notificationService = {
    // Obtener notificaciones para un usuario específico (Combinando personales y nuevas compartidas)
    getNotifications: async (userId: string): Promise<Notification[]> => {
        // 1. Leer buzón personal
        const personalKey = `${NOTIFICATIONS_KEY_PREFIX}${userId}`;
        const personalData = localStorage.getItem(personalKey);
        let personalNotifications: Notification[] = personalData ? JSON.parse(personalData) : [];

        // 2. Leer buzón compartido y "descargar" lo que sea para este usuario (o broadcast)
        // En esta simulación, asumimos que los mensajes 'broadcast' se copian a todos al leer.
        // Para simplificar: Si hay mensajes en shared_inbox con target 'ALL' o userId, los movemos.
        const sharedData = localStorage.getItem(SHARED_INBOX_KEY);
        let sharedInbox: any[] = sharedData ? JSON.parse(sharedData) : [];

        // Filtrar mensajes para este usuario que aún no tenga
        // Nota: En una app real esto lo haría el backend. Aquí simulamos el "fetch".
        const newMessages = sharedInbox.filter(msg => {
            // Mensaje es para todos o para mí
            const isForMe = msg.targetUser === 'ALL' || msg.targetUser === userId;
            // Y no lo tengo ya (por ID)
            const alreadyHave = personalNotifications.some(n => n.id === msg.id);
            return isForMe && !alreadyHave;
        });

        if (newMessages.length > 0) {
            // Convertir formato de envío a formato Notification
            const incomingNotifications: Notification[] = newMessages.map(msg => ({
                id: msg.id,
                userId: userId,
                type: msg.type,
                title: msg.title,
                message: msg.message,
                isRead: false,
                date: msg.date,
                sender: msg.sender,
                actionUrl: msg.actionUrl
            }));

            personalNotifications = [...incomingNotifications, ...personalNotifications];

            // Guardar actualizado
            localStorage.setItem(personalKey, JSON.stringify(personalNotifications));

            // (Opcional) Limpiar del compartido si fuera 1:1, pero como es broadcast 'ALL',
            // no podemos borrarlo fácilmente sin afectar a otros usuarios simulados.
            // Lo dejamos ahí, la lógica de "alreadyHave" evita duplicados.
        }

        // Ordenar por fecha (más reciente primero)
        return personalNotifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    // Enviar notificación (Broadcast o Directa)
    sendNotification: async (
        fromUser: { name: string, avatar?: string },
        type: Notification['type'],
        title: string,
        message: string,
        targetUser: string = 'ALL' // 'ALL' para broadcast a todo el equipo
    ) => {
        const newMsg = {
            id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            targetUser, // 'ALL' or specific ID
            type,
            title,
            message,
            date: new Date().toISOString(),
            sender: fromUser,
            readBy: [] as string[]
        };

        // Guardar en buzón compartido
        const sharedData = localStorage.getItem(SHARED_INBOX_KEY);
        const sharedInbox = sharedData ? JSON.parse(sharedData) : [];
        sharedInbox.push(newMsg);

        // Limitar tamaño del buzón compartido para no explotar localStorage
        if (sharedInbox.length > 50) sharedInbox.shift();

        localStorage.setItem(SHARED_INBOX_KEY, JSON.stringify(sharedInbox));
        return newMsg;
    },

    markAsRead: async (userId: string, notificationId?: string) => {
        const personalKey = `${NOTIFICATIONS_KEY_PREFIX}${userId}`;
        const personalData = localStorage.getItem(personalKey);
        if (!personalData) return;

        let notifications: Notification[] = JSON.parse(personalData);

        if (notificationId) {
            notifications = notifications.map(n => n.id === notificationId ? { ...n, isRead: true } : n);
        } else {
            // Mark all
            notifications = notifications.map(n => ({ ...n, isRead: true }));
        }

        localStorage.setItem(personalKey, JSON.stringify(notifications));
    }
};
