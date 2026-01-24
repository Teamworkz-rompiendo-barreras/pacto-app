import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface UpdatePasswordProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ onSuccess, onCancel }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Verificar que tenemos sesión (el link de supabase loguea al usuario automáticamente)
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError("El enlace ha expirado o no es válido. Vuelve a solicitar el correo.");
            }
        };
        checkSession();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({ password: password });

            if (error) throw error;

            alert("¡Contraseña actualizada con éxito!");
            onSuccess();

        } catch (err: any) {
            setError(err.message || "Error al actualizar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-s1 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-primary mb-2">Nueva Contraseña</h2>
                    <p className="text-gray-600">Introduce tu nueva clave para recuperar el acceso.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nueva Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Confirmar Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-10"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-escribe la contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-12 bg-primary text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Guardando...' : 'Guardar Nueva Contraseña'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="h-12 text-gray-500 font-bold hover:text-primary transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
