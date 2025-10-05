import { supabase } from "@/lib/supabase";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: string;
  phone?: string;
  email?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    [key: string]: any;
  };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  created_at?: string;
};

type SessionType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: UserType;
};

type AuthContextType = {
  session: SessionType | null;
  user: UserType | null;
  loading: boolean;
  signInWithPhone: (phone: string) => Promise<{ error: Error | null }>;
  verifyOtp: (phone: string, token: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setSession(session as SessionType);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: string, session: any) => {
        setSession(session as SessionType);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithPhone = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const verifyOtp = async (phone: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signInWithPhone,
    verifyOtp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
