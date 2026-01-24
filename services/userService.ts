import { supabase } from '../supabaseClient';
import { UserProfile, AccessibilitySettings } from '../types';

export const userService = {
    // Crear o actualizar un usuario y sus ajustes
    async createUserProfile(user: UserProfile): Promise<UserProfile | null> {
        try {
            console.log('Guardando usuario en Supabase...', user);

            // 1. Guardar ajustes de accesibilidad primero
            const { data: settingsData, error: settingsError } = await supabase
                .from('accessibility_settings')
                .insert([{
                    id: user.settings.id, // Usamos el mismo ID que en el objeto local (o generamos uno nuevo si es necesario)
                    low_stimulus: user.settings.low_stimulus,
                    dyslexia_font: user.settings.dyslexia_font,
                    high_contrast: user.settings.high_contrast,
                    comm_preference: user.settings.comm_preference,
                    avoid_calls: user.settings.avoid_calls,
                    need_processing: user.settings.need_processing,
                    profile_visibility: user.settings.profile_visibility
                }])
                .select()
                .single();

            if (settingsError) {
                console.error('Error guardando ajustes:', settingsError);
                // Si falla porque ya existe (ej. login repetido con mismo ID generado), intentamos actualizar o ignorar
                // Por simplificación en MVP, asumimos éxito o logueamos error
            }

            // 2. Guardar perfil de usuario
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    about: user.about,
                    avatar_url: user.avatar,
                    settings_id: user.settings.id // Enlazamos con los ajustes creados
                }])
                .select()
                .single();

            if (profileError) {
                console.error('Error guardando perfil:', profileError);
                return null;
            }

            console.log('Usuario guardado con éxito:', profileData);
            return user;

        } catch (error) {
            console.error('Error inesperado en createUserProfile:', error);
            return null;
        }
    },

    // Obtener perfil por email (simulación de login)
    async getUserProfileByEmail(email: string): Promise<UserProfile | null> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                *,
                settings:accessibility_settings(*)
            `)
                .eq('email', email)
                .single();

            if (error) {
                console.log('Usuario no encontrado o error:', error.message);
                return null;
            }

            // Mapear respuesta de Supabase a nuestro tipo UserProfile
            if (data) {
                return {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    about: data.about,
                    avatar: data.avatar_url,
                    settings: data.settings as AccessibilitySettings
                };
            }
            return null;

        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            return null;
        }
    }
};
