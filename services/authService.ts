import { supabase } from '../supabaseClient';
import { UserProfile, AccessibilitySettings } from '../types';
import { userService } from './userService';

export const authService = {
    // Registrar nuevo usuario
    async signUp(email: string, password: string, name: string, settings: AccessibilitySettings): Promise<{ user: UserProfile | null, error: string | null }> {
        try {
            // 1. Crear usuario en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    }
                }
            });

            if (authError) return { user: null, error: authError.message };
            if (!authData.user) return { user: null, error: "No se pudo crear el usuario." };

            // 2. Preparar perfil de usuario
            const newUser: UserProfile = {
                id: authData.user.id, // IMPORTANTE: Usar el ID real de Auth
                name,
                email,
                role: name.toLowerCase().includes('admin') ? 'Administrador' : 'Miembro de Equipo', // Lógica básica de roles
                settings: { ...settings, id: crypto.randomUUID() }, // Ajustes nuevos
                avatar: `https://ui-avatars.com/api/?name=${name}&background=374BA6&color=fff`
            };

            // 3. Guardar perfil en base de datos (usando userService existente)
            const createdUser = await userService.createUserProfile(newUser);

            if (!createdUser) {
                // Si falla guardar el perfil, podríamos querer deshacer el auth.signUp, 
                // pero por simplicidad retornamos error.
                return { user: null, error: "Usuario creado pero falló al guardar perfil." };
            }

            return { user: createdUser, error: null };

        } catch (error) {
            console.error("Error en signUp:", error);
            return { user: null, error: "Error inesperado al registrarse." };
        }
    },

    // Iniciar sesión
    async signIn(email: string, password: string): Promise<{ user: UserProfile | null, error: string | null }> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) return { user: null, error: "Credenciales incorrectas" }; // Mensaje amigable
            if (!data.user) return { user: null, error: "Error de inicio de sesión." };

            // Obtener el perfil completo de la base de datos
            const userProfile = await userService.getUserProfileByEmail(email);

            if (!userProfile) {
                return { user: null, error: "Usuario autenticado pero sin perfil." };
            }

            return { user: userProfile, error: null };

        } catch (error) {
            console.error("Error en signIn:", error);
            return { user: null, error: "Error inesperado al iniciar sesión." };
        }
    },

    // Cerrar sesión
    async signOut() {
        await supabase.auth.signOut();
    },

    // Obtener usuario actual (sesión activa)
    async getCurrentUser(): Promise<UserProfile | null> {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.email) return null;

        return await userService.getUserProfileByEmail(session.user.email);
    }
};
