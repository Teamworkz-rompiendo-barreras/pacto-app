-- Eliminar tablas existentes si es necesario (para reiniciar)
-- DROP TABLE IF EXISTS rituals;
-- DROP TABLE IF EXISTS agreements;
-- DROP TABLE IF EXISTS profiles;
-- DROP TABLE IF EXISTS accessibility_settings;
-- DROP TABLE IF EXISTS teams;
-- DROP TABLE IF EXISTS organizations;

-- 1. Organizaciones (Tenant - Core de Multi-tenancy)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    domain TEXT, -- Para validación por dominio de email
    plan TEXT DEFAULT 'SEED', -- 'SEED', 'GROWTH', 'ENTERPRISE'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Configuraciones de Accesibilidad
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

-- 3. Equipos
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id), -- Multi-tenancy
    name TEXT NOT NULL,
    description TEXT,
    lead_id UUID,
    color TEXT DEFAULT '#000000',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Perfiles de Usuario
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- Coincide con auth.users.id
    organization_id UUID REFERENCES organizations(id), -- Multi-tenancy
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'User', -- 'SuperAdmin', 'Admin', 'User'
    job_title TEXT, -- Cargo del usuario
    about TEXT,
    avatar_url TEXT,
    settings_id UUID REFERENCES accessibility_settings(id),
    team_id UUID REFERENCES teams(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Acuerdos Vivos
CREATE TABLE IF NOT EXISTS agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id), -- Multi-tenancy
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'Activo',
    rules TEXT[],
    participants UUID[],
    team_id UUID REFERENCES teams(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Rituales de Seguimiento
CREATE TABLE IF NOT EXISTS rituals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id), -- Multi-tenancy
    title TEXT NOT NULL,
    description TEXT,
    ritual_time TIMESTAMP WITH TIME ZONE,
    type TEXT,
    icon TEXT,
    status TEXT DEFAULT 'pending',
    participants UUID[],
    agenda TEXT[],
    team_id UUID REFERENCES teams(id),
    clarity_level INTEGER CHECK (clarity_level >= 1 AND clarity_level <= 5),
    summary_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de Seguridad (RLS) - Multi-tenant Isolation
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessibility_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE rituals ENABLE ROW LEVEL SECURITY;

-- Helper Function para obtener org_id del usuario actual
CREATE OR REPLACE FUNCTION get_current_org_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT organization_id FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLICIES

-- Organizations: Users can view their own organization
DROP POLICY IF EXISTS "Users can view own organization" ON organizations;
CREATE POLICY "Users can view own organization" ON organizations
    FOR SELECT USING (id = get_current_org_id());

-- Profiles: Users can view profiles in their organization
DROP POLICY IF EXISTS "Users can view org profiles" ON profiles;
CREATE POLICY "Users can view org profiles" ON profiles
    FOR SELECT USING (organization_id = get_current_org_id());

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (true); -- Permitir insert inicial (SignUp)

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (id = auth.uid());

-- Teams: Isolated by Organization
DROP POLICY IF EXISTS "Users can view org teams" ON teams;
CREATE POLICY "Users can view org teams" ON teams
    FOR ALL USING (organization_id = get_current_org_id());

-- Agreements: Isolated by Organization
DROP POLICY IF EXISTS "Users can view org agreements" ON agreements;
CREATE POLICY "Users can view org agreements" ON agreements
    FOR ALL USING (organization_id = get_current_org_id());

-- Rituals: Isolated by Organization
DROP POLICY IF EXISTS "Users can view org rituals" ON rituals;
CREATE POLICY "Users can view org rituals" ON rituals
    FOR ALL USING (organization_id = get_current_org_id());

-- Accessibility Settings: Own settings only or Org admins? 
-- Simplificación: All accessible for now if you have the ID (linked from profile)
DROP POLICY IF EXISTS "Public settings access" ON accessibility_settings;
CREATE POLICY "Public settings access" ON accessibility_settings FOR ALL USING (true);


-- Funciones y Triggers de Timestamp
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

DROP TRIGGER IF EXISTS set_timestamp_orgs ON organizations;
CREATE TRIGGER set_timestamp_orgs BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

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
