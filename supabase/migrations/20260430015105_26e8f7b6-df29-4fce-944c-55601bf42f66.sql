
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SITE CONTENT ============
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site content"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert site content"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site content"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_site_content()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_touch_site_content
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_site_content();

-- ============ APP VERSIONS ============
CREATE TABLE public.app_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text NOT NULL,
  filename text NOT NULL,
  storage_path text NOT NULL,
  size_bytes bigint,
  notes text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_app_versions_active ON public.app_versions (is_active) WHERE is_active;
CREATE INDEX idx_app_versions_created_at ON public.app_versions (created_at DESC);

ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read app versions"
  ON public.app_versions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins manage app versions"
  ON public.app_versions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only one active version at a time
CREATE OR REPLACE FUNCTION public.enforce_single_active_version()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.is_active THEN
    UPDATE public.app_versions
       SET is_active = false
     WHERE id <> NEW.id AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_single_active_version
  AFTER INSERT OR UPDATE OF is_active ON public.app_versions
  FOR EACH ROW WHEN (NEW.is_active)
  EXECUTE FUNCTION public.enforce_single_active_version();

-- ============ STORAGE BUCKET ============
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-files', 'app-files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Admins can upload app files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'app-files' AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update app files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'app-files' AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete app files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'app-files' AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can read app files directly"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'app-files' AND public.has_role(auth.uid(), 'admin')
  );

-- ============ SEED INITIAL CONTENT ============
INSERT INTO public.site_content (key, value) VALUES
  ('hero', jsonb_build_object(
    'badge', 'v1.0 • Minecraft Fabric 1.20+',
    'title_line1', 'Ender',
    'title_line2', 'Call',
    'subtitle', 'Chat de Voz Nativo no Minecraft',
    'description', 'Jogue com amigos SEM sair do jogo. Sem Discord, sem TeamSpeak, sem complicação.',
    'cta_primary', 'Download Agora',
    'cta_secondary', 'Documentação',
    'badges', jsonb_build_array('100% Open Source', 'Gratuito', '<30ms latência')
  )),
  ('showcase_card', jsonb_build_object(
    'verified', 'VERIFICADO',
    'name', 'EnderCall',
    'author', 'EnderCall Team',
    'version', 'v1.0.0',
    'download_button', 'Baixar para Minecraft 1.21.1',
    'stats', jsonb_build_array(
      jsonb_build_object('value', '10K+', 'label', 'DOWNLOADS'),
      jsonb_build_object('value', '<30ms', 'label', 'LATÊNCIA'),
      jsonb_build_object('value', 'E2E', 'label', 'CRIPTO')
    )
  )),
  ('features_section', jsonb_build_object(
    'eyebrow', 'Features',
    'title_pre', 'Feito pra ',
    'title_highlight', 'jogar com a galera',
    'subtitle', 'Tudo que você precisa pra conversar in-game. Nada que você não precisa.'
  )),
  ('features', jsonb_build_array(
    jsonb_build_object('icon', 'Zap', 'title', 'Voz em Tempo Real', 'desc', 'Latência ultra-baixa abaixo de 100ms. Conversas fluidas como se estivessem na mesma sala.'),
    jsonb_build_object('icon', 'Radio', 'title', 'Proximidade 3D', 'desc', 'Áudio espacial que diminui conforme a distância. Sussurros, conversas e gritos no momento certo.'),
    jsonb_build_object('icon', 'Settings', 'title', 'Fácil Configuração', 'desc', 'Zero complicação. Instalou, abriu o jogo, apertou V. Funciona em qualquer servidor Fabric.'),
    jsonb_build_object('icon', 'Box', 'title', 'Compatível 1.20+', 'desc', 'Suporte completo para as versões mais recentes do Minecraft Fabric. Sempre atualizado.')
  )),
  ('how_section', jsonb_build_object(
    'eyebrow', 'Como Funciona',
    'title_pre', '3 passos. ',
    'title_highlight', 'Zero stress.'
  )),
  ('steps', jsonb_build_array(
    jsonb_build_object('icon', 'Package', 'title', 'Instale o Mod', 'desc', 'Baixe o Fabric Loader e o EnderCall. Arraste para a pasta mods. Pronto.'),
    jsonb_build_object('icon', 'Server', 'title', 'Entre no Servidor', 'desc', 'Singleplayer ou multiplayer, qualquer mundo, qualquer modpack. Funciona automaticamente.'),
    jsonb_build_object('icon', 'Mic', 'title', 'Aperte V para Falar', 'desc', 'Push-to-talk padrão. Customize a tecla nas opções e comece a conversar com a galera.')
  )),
  ('compat_section', jsonb_build_object(
    'eyebrow', 'Compatibilidade',
    'title_pre', 'Funciona em ',
    'title_highlight', 'tudo que importa',
    'description', 'Se é Fabric, roda. Se é mod popular, roda. Se é seu servidor pessoal com 3 amigos, roda.'
  )),
  ('compat_items', jsonb_build_array(
    jsonb_build_object('ok', true,  'label', 'Todos os servidores Fabric'),
    jsonb_build_object('ok', true,  'label', 'Singleplayer & Multiplayer'),
    jsonb_build_object('ok', true,  'label', 'Modpacks populares (Create, Origins, Fabulously Optimized)'),
    jsonb_build_object('ok', true,  'label', 'Windows, macOS e Linux'),
    jsonb_build_object('ok', false, 'label', 'Não requer mods do servidor — instala só no cliente'),
    jsonb_build_object('ok', false, 'label', 'Sem Discord, sem TeamSpeak, sem nada extra')
  )),
  ('download_section', jsonb_build_object(
    'eyebrow', 'Download',
    'title_pre', 'Pronto pra ',
    'title_highlight', 'conversar?',
    'subtitle', 'Escolha sua plataforma favorita. Os dois links são oficiais.',
    'requirements_title', 'Requisitos mínimos',
    'requirements', jsonb_build_array(
      'Minecraft Java Edition 1.20 ou superior',
      'Fabric Loader 0.14.0+',
      'Microfone (qualquer um, até o do notebook)',
      '50 MB de espaço livre'
    )
  )),
  ('faq_section', jsonb_build_object(
    'eyebrow', 'FAQ',
    'title_pre', 'Perguntas ',
    'title_highlight', 'frequentes'
  )),
  ('faq', jsonb_build_array(
    jsonb_build_object('q', 'Precisa instalar no servidor?', 'a', 'Não! O EnderCall funciona 100% no cliente. Cada jogador instala o mod e pronto — qualquer servidor Fabric vanilla funciona.'),
    jsonb_build_object('q', 'Funciona com outros mods de voz?', 'a', 'Sim, é compatível com a maioria dos mods. Mas honestamente? O EnderCall foi feito do zero pra ser mais leve, mais rápido e mais fácil de usar. 😉'),
    jsonb_build_object('q', 'É seguro? Posso confiar no mod?', 'a', '100% open source. Todo o código está no GitHub, qualquer pessoa pode auditar. Sem telemetria, sem dados pessoais coletados.'),
    jsonb_build_object('q', 'Quanto custa?', 'a', 'Totalmente gratuito. Para sempre. Sem anúncios, sem versão premium, sem pegadinhas.'),
    jsonb_build_object('q', 'Funciona em modpacks?', 'a', 'Sim! Foi testado nos modpacks mais populares do CurseForge e Modrinth. Se rodar Fabric, roda EnderCall.'),
    jsonb_build_object('q', 'Posso silenciar jogadores específicos?', 'a', 'Claro! Menu de jogadores integrado. Mute, ajuste volume individual, bloqueie quem encher o saco. Você no controle.')
  )),
  ('cta_section', jsonb_build_object(
    'title_pre', 'Bora ',
    'title_highlight', 'jogar junto?',
    'description', 'Junte-se a milhares de jogadores que já trocaram o Discord por uma experiência mais imersiva.',
    'button', 'Baixar EnderCall'
  )),
  ('footer', jsonb_build_object(
    'tagline', 'Chat de voz nativo pro Minecraft Fabric. Feito por jogadores, pra jogadores.',
    'copyright', '© 2026 EnderCall. Não afiliado à Mojang ou Microsoft.',
    'made_with', 'Made with ♥ for the block world'
  ));
