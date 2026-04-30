CREATE SCHEMA IF NOT EXISTS private;

ALTER FUNCTION public.has_role(uuid, public.app_role) SET SCHEMA private;

GRANT USAGE ON SCHEMA private TO authenticated;
REVOKE USAGE ON SCHEMA private FROM anon, PUBLIC;

GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM anon, PUBLIC;

NOTIFY pgrst, 'reload schema';