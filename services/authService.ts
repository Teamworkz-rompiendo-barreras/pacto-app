import { supabase } from '../supabaseClient';
import { UserProfile, AccessibilitySettings } from '../types';
import { userService } from './userService';

export const authService = {
    // Registrar nuevo usuario
    async signUp(email: string, password: string, name: string, settings: AccessibilitySettings, companyName?: string, phone?: string, language?: string, plan?: 'SEED' | 'GROWTH' | 'ENTERPRISE'): Promise<{ user: UserProfile | null, error: string | null }> {
        try {
            const maxMembers = plan === 'SEED' ? 5 : (plan === 'GROWTH' ? 50 : 9999);

            // 1. Crear usuario en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    data: {
                        full_name: name,
                        company_name: companyName,
                        phone,
                        language,
                        plan,
                        max_members: maxMembers
                    }
                }
            });

            if (authError) return { user: null, error: authError.message };
            if (!authData.user) return { user: null, error: "No se pudo crear el usuario." };

            // 2. Preparar perfil de usuario
            const newUser: UserProfile = {
                id: authData.user.id, // IMPORTANTE: Usar el ID real de Auth
                name,
                email: email.trim(),
                role: companyName ? 'Administrador' : 'Miembro de Equipo',
                phone,
                language,
                plan,
                maxMembers,
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
                email: email.trim(),
                password
            });

            if (error) return { user: null, error: "Credenciales incorrectas" }; // Mensaje amigable
            if (!data.user) return { user: null, error: "Error de inicio de sesión." };

            // Obtener el perfil completo de la base de datos
            let userProfile = await userService.getUserProfileByEmail(email);

            if (!userProfile) {
                console.warn("⚠️ Usuario autenticado pero sin perfil. Intentando autorrecuperación...");

                // Intento de autocuración (Self-healing)
                // Usamos los metadatos del usuario o valores por defecto
                const meta = data.user.user_metadata || {};

                const recoveredUser: UserProfile = {
                    id: data.user.id,
                    name: meta.full_name || email.split('@')[0], // Fallback al nombre del email
                    email: email,
                    role: 'Miembro de Equipo',
                    settings: {
                        id: crypto.randomUUID(),
                        low_stimulus: false,
                        dyslexia_font: false,
                        high_contrast: false,
                        comm_preference: 'Escrito'
                    },
                    avatar: `https://ui-avatars.com/api/?name=${meta.full_name || 'User'}&background=random`
                };

                const savedProfile = await userService.createUserProfile(recoveredUser);

                if (savedProfile) {
                    userProfile = savedProfile;
                    console.log("✅ Perfil recuperado exitosamente.");
                } else {
                    return { user: null, error: "Error crítico: Tu cuenta existe pero no se pudo generar tu perfil. Contacta soporte." };
                }
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

    // Recuperar contraseña
    async resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
        try {
            // 1. Verificar si el usuario existe en nuestra base de datos (requisito explícito del usuario)
            const profile = await userService.getUserProfileByEmail(email);

            if (!profile) {
                return { success: false, error: "No existe ninguna cuenta con este correo electrónico." };
            }

            // 2. Enviar correo de recuperación real de Supabase
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/update-password', // URL a la que volverá el usuario (habría que crear esta vista si se quiere flujo completo, pero el email llega igual)
            });

            if (error) return { success: false, error: error.message };

            return { success: true, error: null };

        } catch (error) {
            console.error("Error recuperación:", error);
            return { success: false, error: "Error al procesar la solicitud." };
        }
    },

    // Obtener usuario actual (sesión activa)
    async getCurrentUser(): Promise<UserProfile | null> {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.email) return null;

        return await userService.getUserProfileByEmail(session.user.email);
    }
};
