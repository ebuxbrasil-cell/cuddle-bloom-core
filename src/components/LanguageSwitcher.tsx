import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/I18nProvider";
import { LANG_FLAGS, LANG_LABELS, type Lang } from "@/i18n/translations";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const langs: Lang[] = ["pt", "en", "es"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-border/60 hover:border-accent/60 gap-1.5 px-2.5">
          <Globe className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline text-xs font-mono uppercase">{lang}</span>
          <span className="sm:hidden text-base leading-none">{LANG_FLAGS[lang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-border/60 min-w-[160px]">
        {langs.map((l) => (
          <DropdownMenuItem key={l} onClick={() => setLang(l)} className="cursor-pointer gap-2">
            <span className="text-base leading-none">{LANG_FLAGS[l]}</span>
            <span className="flex-1">{LANG_LABELS[l]}</span>
            {lang === l && <Check className="w-3.5 h-3.5 text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
