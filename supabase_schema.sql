-- Eliminar tablas existentes si es necesario (para reiniciar)
-- DROP TABLE IF EXISTS rituals;
-- DROP TABLE IF EXISTS agreements;
-- DROP TABLE IF EXISTS profiles;
-- DROP TABLE IF EXISTS accessibility_settings;
-- DROP TABLE IF EXISTS teams;

-- 1. Configuraciones de Accesibilidad
CREATE TABLE IF NOT EXISTS accessibility_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    low_stimulus BOOLEAN DEFAULT false,
    dyslexia_font BOOLEAN DEFAULT false,
    high_contrast BOOLEAN DEFAULT false,
    comm_preference TEXT DEFAULT 'Escrito', -- 'Visual', 'Escrito', 'Verbal'
    avoid_calls BOOLEAN DEFAULT false,
    need_processing BOOLEAN DEFAULT false,
    profile_visibility TEXT DEFAULT 'team', -- 'team', 'managers', 'private'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Equipos (Nuevo, necesario para relacionar acuerdos y rituales)
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    lead_id UUID, -- Se relacionará con profiles.id más adelante
    color TEXT DEFAULT '#000000',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Perfiles de Usuario
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- Este ID debe coincidir con auth.users.id de Supabase Auth
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'Miembro del equipo',
    about TEXT,
    avatar_url TEXT,
    settings_id UUID REFERENCES accessibility_settings(id),
    team_id UUID REFERENCES teams(id), -- Relación con equipo
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Acuerdos Vivos
CREATE TABLE IF NOT EXISTS agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'Comunicación', 'Foco', 'Feedback', 'Social'
    status TEXT DEFAULT 'Activo', -- 'Activo', 'Borrador', 'Archivado'
    rules TEXT[], -- Array de strings
    participants UUID[], -- Array de UUIDs de perfiles
    team_id UUID REFERENCES teams(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Rituales de Seguimiento
CREATE TABLE IF NOT EXISTS rituals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    ritual_time TIMESTAMP WITH TIME ZONE, -- 'time' en interfaces, cambiado a timestamp
    type TEXT,
    icon TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'completed'
    participants UUID[], -- Array de UUIDs
    agenda TEXT[], -- Array de strings
    team_id UUID REFERENCES teams(id),
    clarity_level INTEGER CHECK (clarity_level >= 1 AND clarity_level <= 5),
    summary_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de Seguridad (RLS) - Ejemplos Básicos
-- Habilitar RLS
ALTER TABLE accessibility_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE rituals ENABLE ROW LEVEL SECURITY;

-- Políticas de ejemplo (ajustar según necesidad real)

-- PROFILES
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (true); -- Cambiado a true para MVP sin auth real

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (true); -- Cambiado a true para MVP sin auth real

-- TEAMS
DROP POLICY IF EXISTS "Public teams access" ON teams;
CREATE POLICY "Public teams access" ON teams FOR ALL USING (true);

-- ACCESSIBILITY SETTINGS
DROP POLICY IF EXISTS "Public settings access" ON accessibility_settings;
CREATE POLICY "Public settings access" ON accessibility_settings FOR ALL USING (true);

-- AGREEMENTS
DROP POLICY IF EXISTS "Public agreements access" ON agreements;
CREATE POLICY "Public agreements access" ON agreements FOR ALL USING (true);

-- RITUALS
DROP POLICY IF EXISTS "Public rituals access" ON rituals;
CREATE POLICY "Public rituals access" ON rituals FOR ALL USING (true);

-- Funciones útiles
-- Función para manejar timestamps de actualización
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualización automática
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); -- Necesitarás definir esta función si quieres creación automática

DROP TRIGGER IF EXISTS set_timestamp_settings ON accessibility_settings;
CREATE TRIGGER set_timestamp_settings BEFORE UPDATE ON accessibility_settings FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_profiles ON profiles;
CREATE TRIGGER set_timestamp_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_teams ON teams;
CREATE TRIGGER set_timestamp_teams BEFORE UPDATE ON teams FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_agreements ON agreements;
CREATE TRIGGER set_timestamp_agreements BEFORE UPDATE ON agreements FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_rituals ON rituals;
CREATE TRIGGER set_timestamp_rituals BEFORE UPDATE ON rituals FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
