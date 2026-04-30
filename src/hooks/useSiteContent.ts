import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContentMap = Record<string, any>;

let cache: ContentMap | null = null;
const listeners = new Set<(c: ContentMap) => void>();

async function loadAll(): Promise<ContentMap> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const map: ContentMap = {};
  (data ?? []).forEach((row: any) => { map[row.key] = row.value; });
  cache = map;
  listeners.forEach((l) => l(map));
  return map;
}

export function useSiteContent() {
  const [content, setContent] = useState<ContentMap | null>(cache);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    const listener = (c: ContentMap) => setContent({ ...c });
    listeners.add(listener);
    if (!cache) {
      loadAll().finally(() => setLoading(false));
    }
    return () => { listeners.delete(listener); };
  }, []);

  return { content: content ?? {}, loading };
}

export async function refreshSiteContent() {
  await loadAll();
}

export function get<T = any>(content: ContentMap, key: string, fallback: T): T {
  return (content?.[key] as T) ?? fallback;
}
