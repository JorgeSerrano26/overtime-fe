'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Profile = {
  id: string;
  supabaseUserId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: string[];
  hasPlayerProfile: boolean;
  playerId?: string;
  playerName?: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
  serverUser: User | null;
  serverProfile: Profile | null;
};

/**
 * AuthProvider que recibe datos del servidor (SSR)
 * La sesión se maneja server-side mediante cookies
 */
export function AuthProvider({
  children,
  serverUser,
  serverProfile,
}: AuthProviderProps) {
  // Use server data directly (no local state needed since we refresh from server)
  const user = serverUser;
  const profile = serverProfile;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Listen for auth changes (login/logout)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        // Refresh the page to get new server-side data
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error signing in:', error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      // Router will refresh automatically via onAuthStateChange
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signOut,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

