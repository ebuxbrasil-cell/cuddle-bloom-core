import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async (authUser: User | null) => {
      if (!authUser) {
        if (mounted) setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (mounted) setIsAdmin(!error && !!data);
    };

    const applySession = async (s: Session | null, finishLoading = false) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);

      await checkAdmin(s?.user ?? null);

      if (finishLoading && mounted) setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      void applySession(s);
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      void applySession(s, true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading };
}
