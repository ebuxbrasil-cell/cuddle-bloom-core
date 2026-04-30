import { supabase } from "@/integrations/supabase/client";

/** Returns a short-lived signed URL for the currently active .jar, or null. */
export async function getActiveDownloadUrl(): Promise<{ url: string; filename: string } | null> {
  const { data, error } = await supabase
    .from("app_versions")
    .select("storage_path, filename")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  const signed = await supabase.storage.from("app-files").createSignedUrl(data.storage_path, 60 * 5);
  if (signed.error || !signed.data) return null;
  return { url: signed.data.signedUrl, filename: data.filename };
}

export async function triggerDownload() {
  const res = await getActiveDownloadUrl();
  if (!res) {
    // Fallback to bundled jar
    window.location.href = "/EnderVoiceFabric-1.21.1.jar";
    return;
  }
  const a = document.createElement("a");
  a.href = res.url;
  a.download = res.filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
