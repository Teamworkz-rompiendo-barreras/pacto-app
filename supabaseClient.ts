import { createClient } from '@supabase/supabase-js';
// import { Database } from './types_db';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Evitar crash si faltan variables (común en primer despliegue)
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⛔ CRITICAL: Missing Supabase environment variables! Check Vercel Settings.');
}

// Usar valores dummy para que 'createClient' no lance excepción al inicio y la UI pueda cargar
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
