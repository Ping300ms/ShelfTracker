import { supabase } from './SupabaseClient';
import type {Equipment, NewEquipment} from '../types/Equipment.ts';

const dbName = "equipments";

/**
 * Récupère tous les équipements
 */
export const getEquipments = async (): Promise<Equipment[]> => {
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .order("name", { ascending: true });

    if (error) throw error;
    return data ?? [];
};

/**
 * Récupère un équipement par id
 */
export const getEquipmentById = async (id: string): Promise<Equipment | null> => {
    const { data, error } = await supabase
        .from(dbName)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Créer un équipement
 */
export const createEquipment = async (
    equipment: NewEquipment
): Promise<Equipment> => {
    const { data, error } = await supabase
        .from(dbName)
        .insert(equipment)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Applique les modifications d'un équipement
 */
export const updateEquipment = async (
    updatedEquipment: Equipment
): Promise<Equipment> => {
    const { data, error } = await supabase
        .from(dbName)
        .update(updatedEquipment)
        .eq('id', updatedEquipment.id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Supprime un équipement
 */
export const deleteEquipment = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from(dbName)
        .delete()
        .eq('id', id);

    if (error) throw error;
};