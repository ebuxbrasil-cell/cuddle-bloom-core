REVOKE EXECUTE ON FUNCTION private.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, app_role) TO postgres, service_role;