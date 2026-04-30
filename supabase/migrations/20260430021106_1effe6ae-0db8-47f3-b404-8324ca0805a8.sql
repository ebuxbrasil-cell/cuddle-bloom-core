DROP TRIGGER IF EXISTS trg_first_user_admin ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
DROP FUNCTION IF EXISTS public.handle_first_user_admin();