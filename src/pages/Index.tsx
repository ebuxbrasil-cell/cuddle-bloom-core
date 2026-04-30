import { useState } from "react";
import {
  Mic, Radio, Settings, Zap, Download, BookOpen, ChevronDown,
  Github, MessageCircle, Server, Gamepad2, Package, ShieldCheck,
  KeyRound, Box, Headphones, Volume2, Wifi, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.jpg";
import showcaseImage from "@/assets/hero-card.jpg";
import bgDragon from "@/assets/bg-dragon.jpg";

const WAVE_BARS = [22, 38, 60, 30, 52, 80, 44, 70, 90, 55, 36, 68, 84, 48, 30, 62, 78, 40, 56, 28, 70, 50, 82, 34, 58, 44, 72, 30, 50, 64];

const FEATURES = [
  { icon: Zap, title: "Voz em Tempo Real", desc: "Latência ultra-baixa abaixo de 100ms. Conversas fluidas como se estivessem na mesma sala.", color: "from-primary to-primary-glow" },
  { icon: Radio, title: "Proximidade 3D", desc: "Áudio espacial que diminui conforme a distância. Sussurros, conversas e gritos no momento certo.", color: "from-accent to-accent-glow" },
  { icon: Settings, title: "Fácil Configuração", desc: "Zero complicação. Instalou, abriu o jogo, apertou V. Funciona em qualquer servidor Fabric.", color: "from-primary-glow to-accent" },
  { icon: Box, title: "Compatível 1.20+", desc: "Suporte completo para as versões mais recentes do Minecraft Fabric. Sempre atualizado.", color: "from-accent-glow to-primary" },
];

const STEPS = [
  { icon: Package, title: "Instale o Mod", desc: "Baixe o Fabric Loader e o EnderCall. Arraste para a pasta mods. Pronto." },
  { icon: Server, title: "Entre no Servidor", desc: "Singleplayer ou multiplayer, qualquer mundo, qualquer modpack. Funciona automaticamente." },
  { icon: Mic, title: "Aperte V para Falar", desc: "Push-to-talk padrão. Customize a tecla nas opções e comece a conversar com a galera." },
];

const COMPAT = [
  { ok: true, label: "Todos os servidores Fabric" },
  { ok: true, label: "Singleplayer & Multiplayer" },
  { ok: true, label: "Modpacks populares (Create, Origins, Fabulously Optimized)" },
  { ok: true, label: "Windows, macOS e Linux" },
  { ok: false, label: "Não requer mods do servidor — instala só no cliente" },
  { ok: false, label: "Sem Discord, sem TeamSpeak, sem nada extra" },
];

const FAQ = [
  { q: "Precisa instalar no servidor?", a: "Não! O EnderCall funciona 100% no cliente. Cada jogador instala o mod e pronto — qualquer servidor Fabric vanilla funciona." },
  { q: "Funciona com outros mods de voz?", a: "Sim, é compatível com a maioria dos mods. Mas honestamente? O EnderCall foi feito do zero pra ser mais leve, mais rápido e mais fácil de usar. 😉" },
  { q: "É seguro? Posso confiar no mod?", a: "100% open source. Todo o código está no GitHub, qualquer pessoa pode auditar. Sem telemetria, sem dados pessoais coletados." },
  { q: "Quanto custa?", a: "Totalmente gratuito. Para sempre. Sem anúncios, sem versão premium, sem pegadinhas." },
  { q: "Funciona em modpacks?", a: "Sim! Foi testado nos modpacks mais populares do CurseForge e Modrinth. Se rodar Fabric, roda EnderCall." },
  { q: "Posso silenciar jogadores específicos?", a: "Claro! Menu de jogadores integrado. Mute, ajuste volume individual, bloqueie quem encher o saco. Você no controle." },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* GLOBAL BACKGROUND — Ender Dragon, blurred & fixed */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${bgDragon})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(20px) saturate(1.15)',
          transform: 'scale(1.2)',
          opacity: 0.85,
        }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none bg-background/40" />
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
              <Headphones className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">EnderCall</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-accent transition-smooth">Features</a>
            <a href="#how" className="hover:text-accent transition-smooth">Como Funciona</a>
            <a href="#download" className="hover:text-accent transition-smooth">Download</a>
            <a href="#faq" className="hover:text-accent transition-smooth">FAQ</a>
          </div>
          <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-glow border-0">
            <a href="#download"><Download className="w-4 h-4 mr-2" />Baixar</a>
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* hero-only gradient overlay (background image is global) */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />

        {/* floating audio icons */}
        <Mic className="absolute top-32 left-[5%] w-8 h-8 text-accent opacity-40 animate-float hidden md:block" style={{ animationDelay: '0s' }} />
        <Volume2 className="absolute bottom-32 left-[8%] w-10 h-10 text-primary-glow opacity-40 animate-float hidden md:block" style={{ animationDelay: '1.5s' }} />
        <Wifi className="absolute top-1/2 right-[3%] w-8 h-8 text-accent-glow opacity-40 animate-float hidden lg:block" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: copy */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-muted-foreground">v1.0 • Minecraft Fabric 1.20+</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tighter mb-6">
              <span className="block">Ender</span>
              <span className="block text-gradient">Call</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-4 font-medium">
              Chat de Voz Nativo no Minecraft
            </p>
            <p className="text-base md:text-lg text-foreground/80 max-w-xl mb-10">
              Jogue com amigos <span className="text-accent font-semibold">SEM sair do jogo</span>. Sem Discord, sem TeamSpeak, sem complicação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow border-0 text-base h-14 px-8 animate-pulse-glow">
                <a href="#download"><Download className="w-5 h-5 mr-2" />Download Agora</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass border-accent/40 hover:bg-accent/10 hover:border-accent text-base h-14 px-8">
                <a href="#how"><BookOpen className="w-5 h-5 mr-2" />Documentação</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> 100% Open Source</div>
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary-glow" /> Gratuito</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> {'<30ms latência'}</div>
            </div>
          </div>

          {/* RIGHT: showcase card */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {/* glow behind card */}
            <div className="absolute -inset-8 opacity-60 blur-3xl pointer-events-none" style={{ background: 'var(--gradient-glow)' }} />

            <div className="relative bg-gradient-card glass rounded-3xl p-5 md:p-6 shadow-card border border-border/60">
              {/* image header */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5">
                <img src={showcaseImage} alt="Personagens Minecraft com microfone neon" width={1536} height={768} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-accent/15 border border-accent/40 text-accent text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFICADO
                </div>
                {/* mic badge overlapping bottom-left */}
                <div className="absolute -bottom-6 left-4 w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-glow">
                  <Mic className="w-7 h-7 text-foreground" />
                </div>
              </div>

              {/* title row */}
              <div className="flex items-end justify-between gap-4 pl-[88px] pr-1 mb-5 -mt-2">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">EnderCall</h2>
                  <p className="text-sm text-muted-foreground">por <span className="text-accent">EnderCall Team</span></p>
                </div>
                <span className="font-mono text-xs bg-secondary/60 border border-border px-2.5 py-1 rounded-md text-muted-foreground">v1.0.0</span>
              </div>

              {/* waveform */}
              <div className="bg-background/60 border border-border/60 rounded-xl h-20 flex items-center justify-center gap-[3px] px-4 mb-4 overflow-hidden">
                {WAVE_BARS.map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-primary to-accent animate-wave"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${(i % 7) * 0.09}s`,
                      animationDuration: `${0.9 + ((i * 37) % 10) * 0.07}s`,
                    }}
                  />
                ))}
              </div>

              {/* stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: Download, value: '10K+', label: 'DOWNLOADS' },
                  { icon: Zap, value: '<30ms', label: 'LATÊNCIA' },
                  { icon: ShieldCheck, value: 'E2E', label: 'CRIPTO' },
                ].map((s, i) => (
                  <div key={i} className="bg-background/40 border border-border/60 rounded-xl py-3 px-2 text-center hover:border-accent/40 transition-smooth">
                    <s.icon className="w-4 h-4 mx-auto mb-1.5 text-accent" />
                    <div className="font-bold text-base">{s.value}</div>
                    <div className="text-[10px] tracking-widest text-muted-foreground font-mono">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* download bar */}
              <a
                href="#download"
                className="block bg-background/40 border border-border/60 hover:border-accent/60 hover:bg-accent/5 rounded-xl py-3.5 text-center font-semibold transition-smooth group"
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-smooth" />
                  Baixar para Minecraft 1.21.1
                </span>
              </a>
            </div>
          </div>
        </div>

        <ChevronDown className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-6 text-accent animate-bounce hidden md:block" />
      </header>

      {/* FEATURES */}
      <section id="features" className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">Features</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Feito pra <span className="text-gradient">jogar com a galera</span>.
            </h2>
            <p className="text-muted-foreground text-lg">Tudo que você precisa pra conversar in-game. Nada que você não precisa.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="group relative bg-gradient-card glass rounded-2xl p-6 shadow-card hover:-translate-y-2 transition-smooth overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-smooth" style={{ background: 'var(--gradient-glow)' }} />
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-glow`}>
                  <f.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="relative text-xl font-bold mb-2">{f.title}</h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">Como Funciona</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              3 passos. <span className="text-gradient">Zero stress.</span>
            </h2>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-50" />
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                    <s.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-accent text-accent-foreground font-black flex items-center justify-center text-sm shadow-cyan">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPATIBILITY */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">Compatibilidade</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Funciona em <span className="text-gradient">tudo que importa</span>.
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Se é Fabric, roda. Se é mod popular, roda. Se é seu servidor pessoal com 3 amigos, roda.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Fabric Loader', 'Minecraft 1.20+', 'OpenAL', 'Cliente Only'].map((tag) => (
                  <span key={tag} className="font-mono text-xs glass px-3 py-1.5 rounded-full border-accent/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-card glass rounded-3xl p-8 shadow-card">
              <ul className="space-y-4">
                {COMPAT.map((c, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${c.ok ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary-glow'}`}>
                      {c.ok ? <ShieldCheck className="w-4 h-4" /> : <Gamepad2 className="w-4 h-4" />}
                    </div>
                    <span className="text-foreground/90 group-hover:text-foreground transition-smooth">{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">Download</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Pronto pra <span className="text-gradient">conversar?</span>
            </h2>
            <p className="text-muted-foreground text-lg">Escolha sua plataforma favorita. Os dois links são oficiais.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'CurseForge', color: 'from-orange-600 to-amber-500', url: '#', desc: 'A maior plataforma de mods Minecraft' },
              { name: 'Modrinth', color: 'from-emerald-500 to-accent', url: '#', desc: 'Open source e amigável aos devs' },
            ].map((p, i) => (
              <a key={i} href={p.url} className="group relative bg-gradient-card glass rounded-3xl p-8 shadow-card hover:-translate-y-2 transition-smooth overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-bold bg-accent text-accent-foreground px-3 py-1 rounded-full shadow-cyan">
                  100% GRATUITO
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-smooth`}>
                  <Download className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-black mb-2">{p.name}</h3>
                <p className="text-muted-foreground mb-6">{p.desc}</p>
                <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-smooth">
                  Baixar agora <Download className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-gradient-card glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-2">Requisitos mínimos</h4>
                <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                  <li>→ Minecraft Java Edition 1.20 ou superior</li>
                  <li>→ Fabric Loader 0.14.0+</li>
                  <li>→ Microfone (qualquer um, até o do notebook)</li>
                  <li>→ 50 MB de espaço livre</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">FAQ</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Perguntas <span className="text-gradient">frequentes</span>.
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-gradient-card glass rounded-2xl overflow-hidden transition-smooth">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-primary/5 transition-smooth"
                >
                  <span className="font-bold text-lg">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-accent shrink-0 transition-smooth ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-muted-foreground animate-fade-up">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="relative max-w-4xl mx-auto text-center bg-gradient-card glass rounded-3xl p-12 md:p-16 overflow-hidden shadow-card">
            <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-glow)' }} />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Bora <span className="text-gradient">jogar junto?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Junte-se a milhares de jogadores que já trocaram o Discord por uma experiência mais imersiva.
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow border-0 text-base h-14 px-10 animate-pulse-glow">
                <a href="#download"><Download className="w-5 h-5 mr-2" />Baixar EnderCall</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border/50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Headphones className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-extrabold">EnderCall</span>
              </div>
              <p className="text-muted-foreground text-sm">Chat de voz nativo pro Minecraft Fabric. Feito por jogadores, pra jogadores.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-accent transition-smooth">Features</a></li>
                <li><a href="#download" className="hover:text-accent transition-smooth">Download</a></li>
                <li><a href="#faq" className="hover:text-accent transition-smooth">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Comunidade</h4>
              <div className="flex gap-3">
                {[
                  { icon: MessageCircle, label: 'Discord' },
                  { icon: Github, label: 'GitHub' },
                  { icon: BookOpen, label: 'Docs' },
                ].map((s, i) => (
                  <a key={i} href="#" aria-label={s.label} className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-accent/20 hover:text-accent hover:-translate-y-1 transition-smooth">
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 EnderCall. Não afiliado à Mojang ou Microsoft.</p>
            <p className="font-mono text-xs">Made with <Heart className="w-3 h-3 inline text-primary-glow" /> for the block world</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
