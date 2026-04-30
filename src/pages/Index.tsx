import { useState } from "react";
import {
  Mic, Radio, Settings, Zap, Download, BookOpen, ChevronDown,
  Github, MessageCircle, Server, Gamepad2, Package, ShieldCheck,
  KeyRound, Box, Headphones, Volume2, Wifi, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import showcaseImage from "@/assets/hero-card.jpg";
import bgDragon from "@/assets/bg-dragon.jpg";
import { triggerDownload } from "@/lib/download";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const onDownload = (e: React.MouseEvent) => { e.preventDefault(); triggerDownload(); };

const WAVE_BARS = [22, 38, 60, 30, 52, 80, 44, 70, 90, 55, 36, 68, 84, 48, 30, 62, 78, 40, 56, 28, 70, 50, 82, 34, 58, 44, 72, 30, 50, 64];

const FEATURE_META = [
  { icon: Zap, color: "from-primary to-primary-glow" },
  { icon: Radio, color: "from-accent to-accent-glow" },
  { icon: Settings, color: "from-primary-glow to-accent" },
  { icon: Box, color: "from-accent-glow to-primary" },
];

const STEP_ICONS = [Package, Server, Mic];
const COMPAT_OK = [true, true, true, true, false, false];
const DOWNLOAD_COLORS = ["from-primary to-accent", "from-emerald-500 to-accent"];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { t } = useI18n();

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
            <span className="text-xl font-extrabold tracking-tight">EnderVoice</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-accent transition-smooth">{t.nav.features}</a>
            <a href="#how" className="hover:text-accent transition-smooth">{t.nav.how}</a>
            <a href="#download" className="hover:text-accent transition-smooth">{t.nav.download}</a>
            <a href="#faq" className="hover:text-accent transition-smooth">{t.nav.faq}</a>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-glow border-0">
              <a href="#" onClick={onDownload}><Download className="w-4 h-4 mr-2" />{t.nav.downloadBtn}</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />

        <Mic className="absolute top-32 left-[5%] w-8 h-8 text-accent opacity-40 animate-float hidden md:block" style={{ animationDelay: '0s' }} />
        <Volume2 className="absolute bottom-32 left-[8%] w-10 h-10 text-primary-glow opacity-40 animate-float hidden md:block" style={{ animationDelay: '1.5s' }} />
        <Wifi className="absolute top-1/2 right-[3%] w-8 h-8 text-accent-glow opacity-40 animate-float hidden lg:block" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-muted-foreground">{t.hero.badge}</span>
            </div>
            <h1 className="relative text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
              <span className="block bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.08)]">
                Ender
              </span>
              <span className="block text-gradient drop-shadow-[0_4px_30px_hsl(var(--accent)/0.45)]">
                Voice
              </span>
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent blur-3xl opacity-60 pointer-events-none" />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-4 font-medium">
              {t.hero.subtitle}
            </p>
            <p className="text-base md:text-lg text-foreground/80 max-w-xl mb-10">
              {t.hero.description} <span className="text-accent font-semibold">{t.hero.descriptionHighlight}</span>. Sem Discord, sem TeamSpeak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow border-0 text-base h-14 px-8 animate-pulse-glow">
                <a href="#" onClick={onDownload}><Download className="w-5 h-5 mr-2" />{t.hero.cta}</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> {t.hero.badges.opensource}</div>
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary-glow" /> {t.hero.badges.free}</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> {t.hero.badges.latency}</div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-8 opacity-60 blur-3xl pointer-events-none" style={{ background: 'var(--gradient-glow)' }} />

            <div className="relative bg-gradient-card glass rounded-3xl p-5 md:p-6 shadow-card border border-border/60">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5">
                <img src={showcaseImage} alt="Minecraft characters with neon mic" width={1536} height={768} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-accent/15 border border-accent/40 text-accent text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.hero.card.verified}
                </div>
                <div className="absolute -bottom-6 left-4 w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-glow">
                  <Mic className="w-7 h-7 text-foreground" />
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 pl-[88px] pr-1 mb-5 -mt-2">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">EnderVoice</h2>
                  <p className="text-sm text-muted-foreground">{t.hero.card.team} <span className="text-accent">EnderVoice Team</span></p>
                </div>
                <span className="font-mono text-xs bg-secondary/60 border border-border px-2.5 py-1 rounded-md text-muted-foreground">v1.0.0</span>
              </div>

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

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: Download, value: '10K+', label: t.hero.card.stats.downloads },
                  { icon: Zap, value: '<30ms', label: t.hero.card.stats.latency },
                  { icon: ShieldCheck, value: 'E2E', label: t.hero.card.stats.crypto },
                ].map((s, i) => (
                  <div key={i} className="bg-background/40 border border-border/60 rounded-xl py-3 px-2 text-center hover:border-accent/40 transition-smooth">
                    <s.icon className="w-4 h-4 mx-auto mb-1.5 text-accent" />
                    <div className="font-bold text-base">{s.value}</div>
                    <div className="text-[10px] tracking-widest text-muted-foreground font-mono">{s.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="#"
                onClick={onDownload}
                className="block bg-background/40 border border-border/60 hover:border-accent/60 hover:bg-accent/5 rounded-xl py-3.5 text-center font-semibold transition-smooth group"
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="w-4 h-4 text-accent group-hover:translate-y-0.5 transition-smooth" />
                  {t.hero.card.downloadFor}
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
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">{t.features.tag}</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              {t.features.title}<span className="text-gradient">{t.features.titleHighlight}</span>.
            </h2>
            <p className="text-muted-foreground text-lg">{t.features.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((f, i) => {
              const Icon = FEATURE_META[i].icon;
              return (
                <div key={i} className="group relative bg-gradient-card glass rounded-2xl p-6 shadow-card hover:-translate-y-2 transition-smooth overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-smooth" style={{ background: 'var(--gradient-glow)' }} />
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${FEATURE_META[i].color} flex items-center justify-center mb-5 shadow-glow`}>
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="relative text-xl font-bold mb-2">{f.title}</h3>
                  <p className="relative text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">{t.how.tag}</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              {t.how.title}<span className="text-gradient">{t.how.titleHighlight}</span>
            </h2>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            {t.how.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={i} className="relative text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-50" />
                    <div className="relative w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-accent text-accent-foreground font-black flex items-center justify-center text-sm shadow-cyan">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPATIBILITY */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">{t.compat.tag}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                {t.compat.title}<span className="text-gradient">{t.compat.titleHighlight}</span>.
              </h2>
              <p className="text-muted-foreground text-lg mb-8">{t.compat.subtitle}</p>
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
                {t.compat.items.map((label, i) => {
                  const ok = COMPAT_OK[i];
                  return (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ok ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary-glow'}`}>
                        {ok ? <ShieldCheck className="w-4 h-4" /> : <Gamepad2 className="w-4 h-4" />}
                      </div>
                      <span className="text-foreground/90 group-hover:text-foreground transition-smooth">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">{t.download.tag}</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              {t.download.title}<span className="text-gradient">{t.download.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t.download.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.download.cards.map((p, i) => (
              <a key={i} href="#" onClick={i === 0 ? onDownload : (e) => e.preventDefault()} className="group relative bg-gradient-card glass rounded-3xl p-8 shadow-card hover:-translate-y-2 transition-smooth overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-bold bg-accent text-accent-foreground px-3 py-1 rounded-full shadow-cyan">
                  {t.download.free}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${DOWNLOAD_COLORS[i]} flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-smooth`}>
                  <Download className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-black mb-2">{p.name}</h3>
                <p className="text-muted-foreground mb-6">{p.desc}</p>
                <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-smooth">
                  {t.download.downloadNow} <Download className="w-4 h-4" />
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
                <h4 className="font-bold mb-2">{t.download.requirements.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                  {t.download.requirements.items.map((r, i) => <li key={i}>{r}</li>)}
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
            <p className="text-accent font-mono text-sm mb-3 uppercase tracking-widest">{t.faq.tag}</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              {t.faq.title}<span className="text-gradient">{t.faq.titleHighlight}</span>
            </h2>
          </div>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
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
                {t.cta.title}<span className="text-gradient">{t.cta.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">{t.cta.subtitle}</p>
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow border-0 text-base h-14 px-10 animate-pulse-glow">
                <a href="#" onClick={onDownload}><Download className="w-5 h-5 mr-2" />{t.cta.button}</a>
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
                <span className="text-lg font-extrabold">EnderVoice</span>
              </div>
              <p className="text-muted-foreground text-sm">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">{t.footer.linksTitle}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-accent transition-smooth">{t.nav.features}</a></li>
                <li><a href="#download" className="hover:text-accent transition-smooth">{t.nav.download}</a></li>
                <li><a href="#faq" className="hover:text-accent transition-smooth">{t.nav.faq}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">{t.footer.communityTitle}</h4>
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
            <p>{t.footer.rights}</p>
            <p className="font-mono text-xs">{t.footer.madeWith} <Heart className="w-3 h-3 inline text-primary-glow" /> for the block world</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
