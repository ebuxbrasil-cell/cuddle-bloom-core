import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Save, Upload, Check, Trash2, ExternalLink, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent, refreshSiteContent } from "@/hooks/useSiteContent";

type Version = {
  id: string; version: string; filename: string; storage_path: string;
  size_bytes: number | null; notes: string | null; is_active: boolean; created_at: string;
};

const ContentEditor = () => {
  const { content, loading } = useSiteContent();
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const next: Record<string, string> = {};
    Object.entries(content).forEach(([k, v]) => { next[k] = JSON.stringify(v, null, 2); });
    setDraft(next);
  }, [content, loading]);

  const save = async (key: string) => {
    let parsed: any;
    try { parsed = JSON.parse(draft[key]); }
    catch { toast.error(`JSON inválido em "${key}"`); return; }
    setSavingKey(key);
    const { error } = await supabase.from("site_content").update({ value: parsed }).eq("key", key);
    setSavingKey(null);
    if (error) { toast.error(error.message); return; }
    toast.success(`"${key}" atualizado`);
    await refreshSiteContent();
  };

  if (loading) return <p className="text-muted-foreground">Carregando…</p>;

  const keys = Object.keys(content).sort();
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Cada bloco é um JSON com os textos da seção. Edite os valores entre aspas e clique em <strong>Salvar</strong>. Mantenha a estrutura.
      </p>
      {keys.map((key) => (
        <div key={key} className="bg-card/60 border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold font-mono text-sm text-accent">{key}</h3>
            <Button size="sm" onClick={() => save(key)} disabled={savingKey === key} className="bg-gradient-primary border-0">
              <Save className="w-3.5 h-3.5 mr-1.5" />{savingKey === key ? "Salvando…" : "Salvar"}
            </Button>
          </div>
          <Textarea
            value={draft[key] ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
            className="font-mono text-xs min-h-[160px] bg-background/50"
            spellCheck={false}
          />
        </div>
      ))}
    </div>
  );
};

const FileManager = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [version, setVersion] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("app_versions").select("*").order("created_at", { ascending: false });
    if (error) { toast.error(error.message); return; }
    setVersions((data ?? []) as Version[]);
  };

  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error("Escolha um arquivo .jar"); return; }
    if (!version.trim()) { toast.error("Informe a versão (ex: 1.0.0)"); return; }
    if (file.size > 50 * 1024 * 1024) { toast.error("Arquivo maior que 50MB"); return; }
    setBusy(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${Date.now()}-${safeName}`;
      const up = await supabase.storage.from("app-files").upload(path, file, { contentType: "application/java-archive" });
      if (up.error) throw up.error;
      const ins = await supabase.from("app_versions").insert({
        version: version.trim(),
        filename: file.name,
        storage_path: path,
        size_bytes: file.size,
        notes: notes.trim() || null,
        is_active: true,
      });
      if (ins.error) throw ins.error;
      toast.success("Versão enviada e ativada");
      setVersion(""); setNotes(""); setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value && ((document.getElementById("file-input") as HTMLInputElement).value = "");
      load();
    } catch (err: any) {
      toast.error(err.message ?? "Falha no upload");
    } finally { setBusy(false); }
  };

  const setActive = async (v: Version) => {
    const { error } = await supabase.from("app_versions").update({ is_active: true }).eq("id", v.id);
    if (error) { toast.error(error.message); return; }
    toast.success(`v${v.version} agora é a ativa`);
    load();
  };

  const remove = async (v: Version) => {
    if (!confirm(`Excluir v${v.version}?`)) return;
    await supabase.storage.from("app-files").remove([v.storage_path]);
    const { error } = await supabase.from("app_versions").delete().eq("id", v.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Versão excluída");
    load();
  };

  const downloadOne = async (v: Version) => {
    const { data, error } = await supabase.storage.from("app-files").createSignedUrl(v.storage_path, 60);
    if (error) { toast.error(error.message); return; }
    window.open(data.signedUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={upload} className="bg-card/60 border border-border rounded-xl p-5 space-y-4">
        <h3 className="font-bold flex items-center gap-2"><Upload className="w-4 h-4 text-accent" /> Enviar nova versão</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="version">Versão</Label>
            <Input id="version" placeholder="1.0.1" value={version} onChange={(e) => setVersion(e.target.value)} maxLength={50} required />
          </div>
          <div>
            <Label htmlFor="file-input">Arquivo .jar (máx 50MB)</Label>
            <Input id="file-input" type="file" accept=".jar" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
          </div>
        </div>
        <div>
          <Label htmlFor="notes">Notas (opcional)</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} placeholder="O que mudou nesta versão?" />
        </div>
        <Button type="submit" disabled={busy} className="bg-gradient-primary border-0">
          <Upload className="w-4 h-4 mr-2" />{busy ? "Enviando…" : "Enviar e ativar"}
        </Button>
      </form>

      <div>
        <h3 className="font-bold flex items-center gap-2 mb-3"><History className="w-4 h-4 text-accent" /> Histórico</h3>
        {versions.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhuma versão enviada ainda.</p>
        ) : (
          <div className="space-y-2">
            {versions.map((v) => (
              <div key={v.id} className={`bg-card/60 border rounded-xl p-4 flex items-center gap-4 ${v.is_active ? "border-accent/60" : "border-border"}`}>
                <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold">v{v.version}</span>
                    {v.is_active && <span className="text-[10px] font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">ATIVA</span>}
                    <span className="text-xs text-muted-foreground font-mono">{v.filename}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(v.created_at).toLocaleString("pt-BR")} · {v.size_bytes ? `${(v.size_bytes / 1024 / 1024).toFixed(2)} MB` : "—"}
                  </div>
                  {v.notes && <p className="text-sm mt-1">{v.notes}</p>}
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => downloadOne(v)}><ExternalLink className="w-3.5 h-3.5" /></Button>
                  {!v.is_active && <Button size="sm" variant="outline" onClick={() => setActive(v)}><Check className="w-3.5 h-3.5" /></Button>}
                  <Button size="sm" variant="outline" onClick={() => remove(v)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando…</div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-gradient-card glass rounded-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Acesso negado</h1>
          <p className="text-muted-foreground mb-6">Sua conta não tem permissão de admin.</p>
          <Button onClick={logout} variant="outline"><LogOut className="w-4 h-4 mr-2" />Sair</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-2">
              <ArrowLeft className="w-4 h-4" /> Ver site
            </Link>
            <h1 className="text-3xl font-black tracking-tight">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button onClick={logout} variant="outline"><LogOut className="w-4 h-4 mr-2" />Sair</Button>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Conteúdo do site</TabsTrigger>
            <TabsTrigger value="files">Arquivo .jar</TabsTrigger>
          </TabsList>
          <TabsContent value="content"><ContentEditor /></TabsContent>
          <TabsContent value="files"><FileManager /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
