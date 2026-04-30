export type Lang = "pt" | "en" | "es";

export const LANG_LABELS: Record<Lang, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const LANG_FLAGS: Record<Lang, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export type Dict = {
  nav: { features: string; how: string; download: string; faq: string; downloadBtn: string };
  hero: {
    badge: string;
    subtitle: string;
    description: string;
    descriptionHighlight: string;
    cta: string;
    badges: { opensource: string; free: string; latency: string };
    card: { verified: string; team: string; downloadFor: string; stats: { downloads: string; latency: string; crypto: string } };
  };
  features: { tag: string; title: string; titleHighlight: string; subtitle: string; items: { title: string; desc: string }[] };
  how: { tag: string; title: string; titleHighlight: string; steps: { title: string; desc: string }[] };
  compat: { tag: string; title: string; titleHighlight: string; subtitle: string; items: string[] };
  download: {
    tag: string; title: string; titleHighlight: string; subtitle: string;
    free: string; downloadNow: string;
    cards: { name: string; desc: string }[];
    requirements: { title: string; items: string[] };
  };
  faq: { tag: string; title: string; titleHighlight: string; items: { q: string; a: string }[] };
  cta: { title: string; titleHighlight: string; subtitle: string; button: string };
  footer: { tagline: string; linksTitle: string; communityTitle: string; rights: string; madeWith: string };
};

export const DICTS: Record<Lang, Dict> = {
  pt: {
    nav: { features: "Features", how: "Como Funciona", download: "Download", faq: "FAQ", downloadBtn: "Baixar" },
    hero: {
      badge: "v1.0 • Minecraft Fabric 1.20+",
      subtitle: "Chat de Voz Nativo no Minecraft",
      description: "Jogue com amigos",
      descriptionHighlight: "SEM sair do jogo",
      cta: "Download Agora",
      badges: { opensource: "100% Open Source", free: "Gratuito", latency: "<30ms latência" },
      card: { verified: "VERIFICADO", team: "por", downloadFor: "Baixar para Minecraft 1.21.1", stats: { downloads: "DOWNLOADS", latency: "LATÊNCIA", crypto: "CRIPTO" } },
    },
    features: {
      tag: "Features", title: "Feito pra ", titleHighlight: "jogar com a galera", subtitle: "Tudo que você precisa pra conversar in-game. Nada que você não precisa.",
      items: [
        { title: "Voz em Tempo Real", desc: "Latência ultra-baixa abaixo de 100ms. Conversas fluidas como se estivessem na mesma sala." },
        { title: "Proximidade 3D", desc: "Áudio espacial que diminui conforme a distância. Sussurros, conversas e gritos no momento certo." },
        { title: "Fácil Configuração", desc: "Zero complicação. Instalou, abriu o jogo, apertou V. Funciona em qualquer servidor Fabric." },
        { title: "Compatível 1.20+", desc: "Suporte completo para as versões mais recentes do Minecraft Fabric. Sempre atualizado." },
      ],
    },
    how: {
      tag: "Como Funciona", title: "3 passos. ", titleHighlight: "Zero stress.",
      steps: [
        { title: "Instale o Mod", desc: "Baixe o Fabric Loader e o EnderVoice. Arraste para a pasta mods. Pronto." },
        { title: "Entre no Servidor", desc: "Singleplayer ou multiplayer, qualquer mundo, qualquer modpack. Funciona automaticamente." },
        { title: "Aperte V para Falar", desc: "Push-to-talk padrão. Customize a tecla nas opções e comece a conversar com a galera." },
      ],
    },
    compat: {
      tag: "Compatibilidade", title: "Funciona em ", titleHighlight: "tudo que importa", subtitle: "Se é Fabric, roda. Se é mod popular, roda. Se é seu servidor pessoal com 3 amigos, roda.",
      items: ["Todos os servidores Fabric", "Singleplayer & Multiplayer", "Modpacks populares (Create, Origins, Fabulously Optimized)", "Windows, macOS e Linux", "Não requer mods do servidor — instala só no cliente", "Sem Discord, sem TeamSpeak, sem nada extra"],
    },
    download: {
      tag: "Download", title: "Pronto pra ", titleHighlight: "conversar?", subtitle: "Escolha sua plataforma favorita. Os dois links são oficiais.",
      free: "100% GRATUITO", downloadNow: "Baixar agora",
      cards: [
        { name: "Download Direto", desc: "Baixe o .jar mais recente — sempre a versão ativa" },
        { name: "Modrinth", desc: "Open source e amigável aos devs" },
      ],
      requirements: { title: "Requisitos mínimos", items: ["→ Minecraft Java Edition 1.20 ou superior", "→ Fabric Loader 0.14.0+", "→ Microfone (qualquer um, até o do notebook)", "→ 50 MB de espaço livre"] },
    },
    faq: {
      tag: "FAQ", title: "Perguntas ", titleHighlight: "frequentes.",
      items: [
        { q: "Precisa instalar no servidor?", a: "Não! O EnderVoice funciona 100% no cliente. Cada jogador instala o mod e pronto — qualquer servidor Fabric vanilla funciona." },
        { q: "Funciona com outros mods de voz?", a: "Sim, é compatível com a maioria dos mods. Mas honestamente? O EnderVoice foi feito do zero pra ser mais leve, mais rápido e mais fácil de usar. 😉" },
        { q: "É seguro? Posso confiar no mod?", a: "100% open source. Todo o código está no GitHub, qualquer pessoa pode auditar. Sem telemetria, sem dados pessoais coletados." },
        { q: "Quanto custa?", a: "Totalmente gratuito. Para sempre. Sem anúncios, sem versão premium, sem pegadinhas." },
        { q: "Funciona em modpacks?", a: "Sim! Foi testado nos modpacks mais populares do CurseForge e Modrinth. Se rodar Fabric, roda EnderVoice." },
        { q: "Posso silenciar jogadores específicos?", a: "Claro! Menu de jogadores integrado. Mute, ajuste volume individual, bloqueie quem encher o saco. Você no controle." },
      ],
    },
    cta: { title: "Bora ", titleHighlight: "jogar junto?", subtitle: "Junte-se a milhares de jogadores que já trocaram o Discord por uma experiência mais imersiva.", button: "Baixar EnderVoice" },
    footer: { tagline: "Chat de voz nativo pro Minecraft Fabric. Feito por jogadores, pra jogadores.", linksTitle: "Links", communityTitle: "Comunidade", rights: "© 2026 EnderVoice. Não afiliado à Mojang ou Microsoft.", madeWith: "Made with" },
  },
  en: {
    nav: { features: "Features", how: "How it Works", download: "Download", faq: "FAQ", downloadBtn: "Download" },
    hero: {
      badge: "v1.0 • Minecraft Fabric 1.20+",
      subtitle: "Native Voice Chat for Minecraft",
      description: "Play with friends",
      descriptionHighlight: "WITHOUT leaving the game",
      cta: "Download Now",
      badges: { opensource: "100% Open Source", free: "Free", latency: "<30ms latency" },
      card: { verified: "VERIFIED", team: "by", downloadFor: "Download for Minecraft 1.21.1", stats: { downloads: "DOWNLOADS", latency: "LATENCY", crypto: "CRYPTO" } },
    },
    features: {
      tag: "Features", title: "Built to ", titleHighlight: "play with friends", subtitle: "Everything you need to talk in-game. Nothing you don't.",
      items: [
        { title: "Real-Time Voice", desc: "Ultra-low latency below 100ms. Conversations flow as if you were in the same room." },
        { title: "3D Proximity", desc: "Spatial audio that fades with distance. Whispers, talks, and shouts at the right moment." },
        { title: "Easy Setup", desc: "Zero hassle. Install, open the game, press V. Works on any Fabric server." },
        { title: "Compatible 1.20+", desc: "Full support for the latest Minecraft Fabric versions. Always up to date." },
      ],
    },
    how: {
      tag: "How it Works", title: "3 steps. ", titleHighlight: "Zero stress.",
      steps: [
        { title: "Install the Mod", desc: "Download Fabric Loader and EnderVoice. Drop into the mods folder. Done." },
        { title: "Join a Server", desc: "Singleplayer or multiplayer, any world, any modpack. Works automatically." },
        { title: "Press V to Talk", desc: "Default push-to-talk. Customize the key in options and start chatting." },
      ],
    },
    compat: {
      tag: "Compatibility", title: "Works on ", titleHighlight: "everything that matters", subtitle: "If it's Fabric, it runs. If it's a popular mod, it runs. If it's your personal server with 3 friends, it runs.",
      items: ["All Fabric servers", "Singleplayer & Multiplayer", "Popular modpacks (Create, Origins, Fabulously Optimized)", "Windows, macOS and Linux", "No server-side mods needed — client only", "No Discord, no TeamSpeak, nothing extra"],
    },
    download: {
      tag: "Download", title: "Ready to ", titleHighlight: "chat?", subtitle: "Pick your favorite platform. Both links are official.",
      free: "100% FREE", downloadNow: "Download now",
      cards: [
        { name: "Direct Download", desc: "Get the latest .jar — always the active version" },
        { name: "Modrinth", desc: "Open source and dev-friendly" },
      ],
      requirements: { title: "Minimum requirements", items: ["→ Minecraft Java Edition 1.20 or higher", "→ Fabric Loader 0.14.0+", "→ Microphone (any, even your laptop's)", "→ 50 MB free space"] },
    },
    faq: {
      tag: "FAQ", title: "Frequently asked ", titleHighlight: "questions.",
      items: [
        { q: "Do I need to install it on the server?", a: "No! EnderVoice runs 100% client-side. Each player installs the mod and that's it — any vanilla Fabric server works." },
        { q: "Does it work with other voice mods?", a: "Yes, it's compatible with most. But honestly? EnderVoice was built from scratch to be lighter, faster, and easier. 😉" },
        { q: "Is it safe? Can I trust the mod?", a: "100% open source. All the code is on GitHub, anyone can audit. No telemetry, no personal data collected." },
        { q: "How much does it cost?", a: "Totally free. Forever. No ads, no premium tier, no catches." },
        { q: "Does it work in modpacks?", a: "Yes! Tested on the most popular modpacks on CurseForge and Modrinth. If Fabric runs, EnderVoice runs." },
        { q: "Can I mute specific players?", a: "Of course! Built-in player menu. Mute, adjust individual volume, block whoever's annoying. You're in control." },
      ],
    },
    cta: { title: "Let's ", titleHighlight: "play together?", subtitle: "Join thousands of players who already swapped Discord for a more immersive experience.", button: "Download EnderVoice" },
    footer: { tagline: "Native voice chat for Minecraft Fabric. Made by players, for players.", linksTitle: "Links", communityTitle: "Community", rights: "© 2026 EnderVoice. Not affiliated with Mojang or Microsoft.", madeWith: "Made with" },
  },
  es: {
    nav: { features: "Funciones", how: "Cómo Funciona", download: "Descargar", faq: "FAQ", downloadBtn: "Descargar" },
    hero: {
      badge: "v1.0 • Minecraft Fabric 1.20+",
      subtitle: "Chat de Voz Nativo en Minecraft",
      description: "Juega con amigos",
      descriptionHighlight: "SIN salir del juego",
      cta: "Descargar Ahora",
      badges: { opensource: "100% Open Source", free: "Gratis", latency: "<30ms latencia" },
      card: { verified: "VERIFICADO", team: "por", downloadFor: "Descargar para Minecraft 1.21.1", stats: { downloads: "DESCARGAS", latency: "LATENCIA", crypto: "CIFRADO" } },
    },
    features: {
      tag: "Funciones", title: "Hecho para ", titleHighlight: "jugar con amigos", subtitle: "Todo lo que necesitas para hablar dentro del juego. Nada que no necesites.",
      items: [
        { title: "Voz en Tiempo Real", desc: "Latencia ultrabaja por debajo de 100ms. Conversaciones fluidas como si estuvieran en la misma sala." },
        { title: "Proximidad 3D", desc: "Audio espacial que disminuye con la distancia. Susurros, charlas y gritos en el momento justo." },
        { title: "Configuración Fácil", desc: "Cero complicaciones. Instala, abre el juego, presiona V. Funciona en cualquier servidor Fabric." },
        { title: "Compatible 1.20+", desc: "Soporte completo para las versiones más recientes de Minecraft Fabric. Siempre actualizado." },
      ],
    },
    how: {
      tag: "Cómo Funciona", title: "3 pasos. ", titleHighlight: "Cero estrés.",
      steps: [
        { title: "Instala el Mod", desc: "Descarga Fabric Loader y EnderVoice. Arrastra a la carpeta mods. Listo." },
        { title: "Entra al Servidor", desc: "Un jugador o multijugador, cualquier mundo, cualquier modpack. Funciona automáticamente." },
        { title: "Presiona V para Hablar", desc: "Push-to-talk por defecto. Personaliza la tecla en opciones y empieza a charlar." },
      ],
    },
    compat: {
      tag: "Compatibilidad", title: "Funciona en ", titleHighlight: "todo lo que importa", subtitle: "Si es Fabric, corre. Si es un mod popular, corre. Si es tu servidor personal con 3 amigos, corre.",
      items: ["Todos los servidores Fabric", "Un jugador y multijugador", "Modpacks populares (Create, Origins, Fabulously Optimized)", "Windows, macOS y Linux", "No requiere mods del servidor — solo cliente", "Sin Discord, sin TeamSpeak, sin nada extra"],
    },
    download: {
      tag: "Descargar", title: "¿Listo para ", titleHighlight: "hablar?", subtitle: "Elige tu plataforma favorita. Los dos enlaces son oficiales.",
      free: "100% GRATIS", downloadNow: "Descargar ahora",
      cards: [
        { name: "Descarga Directa", desc: "Obtén el .jar más reciente — siempre la versión activa" },
        { name: "Modrinth", desc: "Open source y amigable con devs" },
      ],
      requirements: { title: "Requisitos mínimos", items: ["→ Minecraft Java Edition 1.20 o superior", "→ Fabric Loader 0.14.0+", "→ Micrófono (cualquiera, incluso el del portátil)", "→ 50 MB de espacio libre"] },
    },
    faq: {
      tag: "FAQ", title: "Preguntas ", titleHighlight: "frecuentes.",
      items: [
        { q: "¿Hay que instalarlo en el servidor?", a: "¡No! EnderVoice funciona 100% en el cliente. Cada jugador instala el mod y listo — cualquier servidor Fabric vanilla funciona." },
        { q: "¿Funciona con otros mods de voz?", a: "Sí, es compatible con la mayoría. ¿Pero honestamente? EnderVoice fue hecho desde cero para ser más ligero, rápido y fácil. 😉" },
        { q: "¿Es seguro? ¿Puedo confiar en el mod?", a: "100% open source. Todo el código está en GitHub, cualquiera puede auditar. Sin telemetría, sin datos personales recogidos." },
        { q: "¿Cuánto cuesta?", a: "Totalmente gratis. Para siempre. Sin anuncios, sin versión premium, sin trucos." },
        { q: "¿Funciona en modpacks?", a: "¡Sí! Probado en los modpacks más populares de CurseForge y Modrinth. Si corre Fabric, corre EnderVoice." },
        { q: "¿Puedo silenciar jugadores específicos?", a: "¡Claro! Menú de jugadores integrado. Silencia, ajusta volumen individual, bloquea a quien moleste. Tú tienes el control." },
      ],
    },
    cta: { title: "¿Vamos a ", titleHighlight: "jugar juntos?", subtitle: "Únete a miles de jugadores que ya cambiaron Discord por una experiencia más inmersiva.", button: "Descargar EnderVoice" },
    footer: { tagline: "Chat de voz nativo para Minecraft Fabric. Hecho por jugadores, para jugadores.", linksTitle: "Enlaces", communityTitle: "Comunidad", rights: "© 2026 EnderVoice. No afiliado a Mojang o Microsoft.", madeWith: "Hecho con" },
  },
};

export function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "pt";
  const stored = typeof localStorage !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
  if (stored && stored in DICTS) return stored;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of langs) {
    const code = raw.toLowerCase().split("-")[0];
    if (code === "pt") return "pt";
    if (code === "es") return "es";
    if (code === "en") return "en";
  }
  return "pt";
}
