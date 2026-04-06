import { supabase } from '../supabaseClient';
import { UserProfile, AccessibilitySettings } from '../types';

const USER_STORAGE_KEY = 'pacto_users_v1';

// Helper for local storage
const getLocalUsers = (): UserProfile[] => {
    try {
        const stored = localStorage.getItem(USER_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch { return []; }
};

const saveLocalUser = (user: UserProfile) => {
    const users = getLocalUsers();
    const existingIndex = users.findIndex(u => u.id === user.id || u.email === user.email);
    if (existingIndex >= 0) {
        users[existingIndex] = user;
    } else {
        users.push(user);
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

export const userService = {
    // Crear o actualizar un usuario y sus ajustes
    async createUserProfile(user: UserProfile): Promise<UserProfile | null> {
        // Fallback for Demo/Local mode first
        saveLocalUser(user);

        // Try Supabase (Best Effort)
        try {
            console.log('Guardando usuario en Supabase...', user);

            const { data: settingsData, error: settingsError } = await supabase
                .from('accessibility_settings')
                .upsert([{ // Upsert is safer
                    id: user.settings.id,
                    dyslexia_font: user.settings.dyslexia_font,
                    high_contrast: user.settings.high_contrast,
                    comm_preference: user.settings.comm_preference,
                    avoid_calls: user.settings.avoid_calls,
                    need_processing: user.settings.need_processing,
                    profile_visibility: user.settings.profile_visibility
                }])
                .select()
                .single();

            if (settingsError) console.warn('Supabase Settings Error (Demo mode?):', settingsError.message);

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .upsert([{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    job_title: user.jobTitle,
                    organization_id: user.organizationId,
                    about: user.about,
                    avatar_url: user.avatar,
                    settings_id: user.settings.id
                }])
                .select()
                .single();

            if (profileError) console.warn('Supabase Profile Error (Demo mode?):', profileError.message);

            return user; // Return success based on local save
        } catch (error) {
            console.warn('Network error or offline (using local data):', error);
            return user;
        }
    },

    // Obtener perfil por email (simulación de login)
    async getUserProfileByEmail(email: string): Promise<UserProfile | null> {
        // Check local storage first
        const localUsers = getLocalUsers();
        const localUser = localUsers.find(u => u.email === email);
        if (localUser) return localUser;

        // Try Supabase
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                *,
                settings:accessibility_settings(*)
            `)
                .eq('email', email)
                .single();

            if (error || !data) {
                return null;
            }

            return {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role as 'SuperAdmin' | 'Admin' | 'User',
                jobTitle: data.job_title,
                organizationId: data.organization_id,
                about: data.about,
                avatar: data.avatar_url,
                settings: data.settings as AccessibilitySettings
            };

        } catch (error) {
            return null;
        }
    }
};
