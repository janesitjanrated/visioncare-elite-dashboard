-- =====================================================
-- ClinicVision Pro Authentication & User Management
-- Migration: 20250712184555_clinic_auth_system.sql
-- =====================================================

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('owner', 'manager', 'staff', 'patient');
CREATE TYPE public.subscription_status AS ENUM ('active', 'inactive', 'trial', 'expired');
CREATE TYPE public.webhook_status AS ENUM ('active', 'inactive', 'error');

-- 2. User Profiles Table (PostgREST Compatible)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'staff'::public.user_role,
    avatar_url TEXT,
    clinic_id UUID,
    subscription_status public.subscription_status DEFAULT 'trial'::public.subscription_status,
    subscription_expires_at TIMESTAMPTZ,
    line_user_id TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Clinic Information Table
CREATE TABLE public.clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    email TEXT,
    registration_number TEXT UNIQUE,
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Line Webhook Configuration (Owner role only)
CREATE TABLE public.line_webhook_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES public.clinics(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    channel_access_token TEXT NOT NULL,
    channel_secret TEXT NOT NULL,
    webhook_url TEXT NOT NULL,
    status public.webhook_status DEFAULT 'inactive'::public.webhook_status,
    last_verified_at TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. User Sessions Table
CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    session_token TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_clinic_id ON public.user_profiles(clinic_id);
CREATE INDEX idx_clinics_owner_id ON public.clinics(owner_id);
CREATE INDEX idx_line_webhook_configs_clinic_id ON public.line_webhook_configs(clinic_id);
CREATE INDEX idx_line_webhook_configs_owner_id ON public.line_webhook_configs(owner_id);
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON public.user_sessions(expires_at);

-- 7. Add foreign key relationship to user_profiles
ALTER TABLE public.user_profiles ADD CONSTRAINT fk_user_profiles_clinic_id 
    REFERENCES public.clinics(id) ON DELETE SET NULL;

-- 8. Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.line_webhook_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- 9. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'owner'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_clinic_member(clinic_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.clinic_id = clinic_uuid
)
$$;

CREATE OR REPLACE FUNCTION public.owns_clinic(clinic_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.clinics c
    WHERE c.id = clinic_uuid AND c.owner_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_manage_line_webhook(webhook_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.line_webhook_configs lwc
    WHERE lwc.id = webhook_uuid AND lwc.owner_id = auth.uid()
)
$$;

-- 10. RLS Policies
-- User Profiles: Users can view/edit own profile, owners can view clinic members
CREATE POLICY "users_view_own_profile" ON public.user_profiles FOR SELECT
    USING (auth.uid() = id OR public.is_clinic_member(clinic_id));

CREATE POLICY "users_update_own_profile" ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Clinics: Members can view their clinic, owners can manage
CREATE POLICY "clinic_members_view" ON public.clinics FOR SELECT
    USING (public.is_clinic_member(id));

CREATE POLICY "clinic_owners_manage" ON public.clinics FOR ALL
    USING (public.owns_clinic(id)) WITH CHECK (public.owns_clinic(id));

-- Line Webhook: Only owners can manage
CREATE POLICY "owners_manage_line_webhook" ON public.line_webhook_configs FOR ALL
    USING (public.can_manage_line_webhook(id)) WITH CHECK (public.can_manage_line_webhook(id));

-- User Sessions: Users can view own sessions
CREATE POLICY "users_view_own_sessions" ON public.user_sessions FOR SELECT
    USING (auth.uid() = user_id);

-- 11. Automatic Profile Creation Function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role, phone)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'staff'::public.user_role),
        NEW.raw_user_meta_data->>'phone'
    );
    RETURN NEW;
END;
$$;

-- 12. Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 13. Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 14. Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clinics_updated_at
    BEFORE UPDATE ON public.clinics
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_line_webhook_configs_updated_at
    BEFORE UPDATE ON public.line_webhook_configs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 15. Line Webhook Validation Function
CREATE OR REPLACE FUNCTION public.validate_line_webhook(
    webhook_id UUID,
    access_token TEXT,
    webhook_url TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    is_valid BOOLEAN := false;
BEGIN
    -- Basic validation logic (extend with actual Line API validation)
    IF access_token IS NOT NULL AND LENGTH(access_token) > 10 
       AND webhook_url LIKE 'https://%' THEN
        is_valid := true;
        
        -- Update webhook status
        UPDATE public.line_webhook_configs
        SET status = 'active'::public.webhook_status,
            last_verified_at = CURRENT_TIMESTAMP,
            error_message = NULL
        WHERE id = webhook_id;
    ELSE
        -- Update with error
        UPDATE public.line_webhook_configs
        SET status = 'error'::public.webhook_status,
            error_message = 'Invalid webhook configuration'
        WHERE id = webhook_id;
    END IF;
    
    RETURN is_valid;
END;
$$;

-- 16. Mock Data for Development
DO $$
DECLARE
    owner_uuid UUID := gen_random_uuid();
    manager_uuid UUID := gen_random_uuid();
    staff_uuid UUID := gen_random_uuid();
    clinic_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (owner_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'owner@clinicvision.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Dr. Michael Rodriguez", "role": "owner", "phone": "+1234567890"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (manager_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'manager@clinicvision.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "manager", "phone": "+1234567891"}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (staff_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'staff@clinicvision.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Alex Chen", "role": "staff", "phone": "+1234567892"}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create clinic
    INSERT INTO public.clinics (id, name, address, phone, email, registration_number, owner_id) VALUES
        (clinic_uuid, 'ClinicVision Downtown', '123 Main St, Downtown', '+1-555-0123', 'info@clinicvision.com', 'CV-001', owner_uuid);

    -- Update user profiles with clinic association
    UPDATE public.user_profiles 
    SET clinic_id = clinic_uuid, subscription_status = 'active'::public.subscription_status
    WHERE id = owner_uuid;

    UPDATE public.user_profiles 
    SET clinic_id = clinic_uuid
    WHERE id IN (manager_uuid, staff_uuid);

    -- Create Line webhook configuration for owner
    INSERT INTO public.line_webhook_configs (clinic_id, owner_id, channel_access_token, channel_secret, webhook_url, status) VALUES
        (clinic_uuid, owner_uuid, 'demo_access_token_123', 'demo_channel_secret_456', 'https://your-domain.com/api/line/webhook', 'inactive'::public.webhook_status);

END $$;

-- 17. Cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_demo_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    demo_user_ids UUID[];
BEGIN
    -- Get demo user IDs
    SELECT ARRAY_AGG(id) INTO demo_user_ids
    FROM auth.users
    WHERE email LIKE '%@clinicvision.com';

    -- Delete in dependency order
    DELETE FROM public.user_sessions WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.line_webhook_configs WHERE owner_id = ANY(demo_user_ids);
    DELETE FROM public.user_profiles WHERE id = ANY(demo_user_ids);
    DELETE FROM public.clinics WHERE owner_id = ANY(demo_user_ids);

    -- Delete auth users last
    DELETE FROM auth.users WHERE id = ANY(demo_user_ids);
END;
$$;