import { supabase } from './SupabaseClient';
import type { Profile, NewProfile } from "../types/Profile.ts";

const dbName = "profiles";

/**
 * Récupère tous les profils
 */
export const getProfiles = async (): Promise<Profile[]> => {
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .order("name", { ascending: true });

    if (error) throw error;
    return data ?? [];
}

/**
 * Créer un profil
 */
export const createProfil = async (profile: NewProfile): Promise<Profile> => {
    const { data, error } = await supabase
        .from(dbName)
        .insert(profile)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Applique les modifications d'un profil
 */
export const updateProfil = async (updatedProfile: Profile): Promise<Profile> => {
    const { data, error } = await supabase
        .from(dbName)
        .update(updatedProfile)
        .eq('id', updatedProfile.id)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Supprime un profil
 */
export const deleteProfil = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from(dbName)
        .delete()
        .eq('id', id);

    if (error) throw error;
}
