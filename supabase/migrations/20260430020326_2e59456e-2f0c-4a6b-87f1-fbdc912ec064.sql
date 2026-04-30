
-- Disable the "first user becomes admin" trigger if attached (safety)
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

-- Create the admin user if not exists
DO $$
DECLARE
  new_user_id uuid;
  existing_id uuid;
BEGIN
  SELECT id INTO existing_id FROM auth.users WHERE email = 'admin@gmail.com' LIMIT 1;

  IF existing_id IS NULL THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      'admin@gmail.com',
      crypt('12345endercall', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      false, false
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (
      gen_random_uuid(), new_user_id,
      jsonb_build_object('sub', new_user_id::text, 'email', 'admin@gmail.com', 'email_verified', true),
      'email', new_user_id::text, now(), now(), now()
    );
    existing_id := new_user_id;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (existing_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;
