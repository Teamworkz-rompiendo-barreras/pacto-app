import { supabase } from '../supabaseClient';
import { UserProfile, AccessibilitySettings } from '../types';
import { userService } from './userService';

export const authService = {
    // Registrar nuevo usuario
    async signUp(email: string, password: string, name: string, settings: AccessibilitySettings, companyName?: string, phone?: string, language?: string, plan?: 'SEED' | 'GROWTH' | 'ENTERPRISE'): Promise<{ user: UserProfile | null, error: string | null }> {
        try {
            const maxMembers = plan === 'SEED' ? 5 : (plan === 'GROWTH' ? 50 : 9999);

            // 1. Crear usuario en Supabase Auth
            let authData = { user: { id: crypto.randomUUID() } } as any;
            let authError = null;

            if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
                console.warn("⚠️ DEMO MODE: Bypassing Supabase SignUp");
            } else {
                const response = await supabase.auth.signUp({
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
                authData = response.data;
                authError = response.error;
            }

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
            // --- DEMO MODE BYPASS ---
            if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
                console.warn("⚠️ DEMO MODE: Bypassing Supabase Auth");
                let mockProfile = await userService.getUserProfileByEmail(email);
                if (!mockProfile) {
                    mockProfile = {
                        id: 'demo-user-id',
                        name: 'Usuario Demo',
                        email: email,
                        role: 'Administrador',
                        settings: {
                            id: 'demo-settings',
                            low_stimulus: false,
                            dyslexia_font: false,
                            high_contrast: false,
                            comm_preference: 'Visual'
                        },
                        avatar: `https://ui-avatars.com/api/?name=Usuario+Demo&background=random`
                    };
                }
                return { user: mockProfile, error: null };
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password
            });

            if (error) return { user: null, error: "Credenciales incorrectas" };
            if (!data.user) return { user: null, error: "Error de inicio de sesión." };

            let userProfile = await userService.getUserProfileByEmail(email);

            if (!userProfile) {
                console.warn("⚠️ Usuario autenticado pero sin perfil. Intentando autorrecuperación...");
                const meta = data.user.user_metadata || {};
                const recoveredUser: UserProfile = {
                    id: data.user.id,
                    name: meta.full_name || email.split('@')[0],
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
                if (savedProfile) userProfile = savedProfile;
                else return { user: null, error: "Error crítico: Tu cuenta existe pero no se pudo generar tu perfil." };
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
            const profile = await userService.getUserProfileByEmail(email);
            if (!profile) return { success: false, error: "No existe ninguna cuenta con este correo electrónico." };

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/update-password',
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
        if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
            return null;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.email) return null;
        return await userService.getUserProfileByEmail(session.user.email);
    }
};
