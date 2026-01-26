import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Tipos de Toast
export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-slide-up bg-white min-w-[300px]
              ${t.type === 'success' ? 'border-green-200 text-green-800' : ''}
              ${t.type === 'error' ? 'border-red-200 text-red-800' : ''}
              ${t.type === 'info' ? 'border-blue-200 text-blue-800' : ''}
              ${t.type === 'warning' ? 'border-amber-200 text-amber-800' : ''}
            `}
                    >
                        <span className="material-symbols-outlined text-xl">
                            {t.type === 'success' && 'check_circle'}
                            {t.type === 'error' && 'error'}
                            {t.type === 'info' && 'info'}
                            {t.type === 'warning' && 'warning'}
                        </span>
                        <span className="font-bold text-sm flex-1">{t.message}</span>
                        <button
                            onClick={() => removeToast(t.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
