import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

interface IProps {
  children: React.ReactNode;
}

export interface AuthenticationSession {
  fetching: boolean;
  isAuthenticated: boolean;
  session: Session | null;
}

export const AuthenticationContext = createContext<AuthenticationSession>({
  fetching: false,
  isAuthenticated: false,
  session: null,
});

export default function AuthenticationProvider({ children }: IProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setFetching(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ fetching, isAuthenticated: !!session, session }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
