import { createContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../api/SupabaseClient.ts';
import type {User} from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session au chargement
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Écoute les changements de session (login/logout)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const signUp = async (email: string, password: string) => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setLoading(false);
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setLoading(false);
    };

    const signOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;