import { supabase } from './SupabaseClient';
import type { Equipment } from '../types/Equipment';

export const getEquipments = async (): Promise<Equipment[]> => {
    const { data, error } = await supabase
        .from("Equipments")
        .select("*")
        .order("name", { ascending: true });

    if (error) throw error;
    return data ?? [];
};

export const getEquipmentById = async (id: number): Promise<Equipment | null> => {
    const { data, error } = await supabase
        .from('Equipments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const createEquipment = async (
    equipment: Omit<Equipment, 'id' | 'created_at'>
): Promise<Equipment> => {
    const { data, error } = await supabase
        .from('Equipments')
        .insert(equipment)
        .single();

    if (error) throw error;
    return data;
};

export const updateEquipmentBooking = async (
    id: number,
    booking_start: string,
    booking_end: string,
    booker: string
): Promise<Equipment> => {
    const { data, error } = await supabase
        .from('Equipments')
        .update({ booking_start, booking_end, booker })
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const clearEquipmentBooking = async (id: number): Promise<Equipment> => {
    const { data, error } = await supabase
        .from('Equipments')
        .update({ booking_start: null, booking_end: null, booker: null })
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const deleteEquipment = async (id: number): Promise<void> => {
    const { error } = await supabase
        .from('Equipments')
        .delete()
        .eq('id', id);

    if (error) throw error;
};
