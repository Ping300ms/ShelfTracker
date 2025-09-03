import { supabase } from './SupabaseClient';
import type { Booking, NewBooking } from "../types/Booking.ts";

const dbName: string = "bookings";

/**
 * Récupère toutes les réservations
 */
export const getAllBookings = async (): Promise<Booking[]> => {
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .order("start_time", { ascending: true });

    if (error) throw error;
    return data ?? [];
}

/**
 * Récupère toutes les réservations passées
 */
export const getPastBookings = async (): Promise<Booking[]> => {
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .lt("end_time", new Date().toISOString()) // end_time < NOW
        .order("start_time", { ascending: false });

    if (error) throw error;
    return data ?? [];
}

/**
 * Récupère toutes les réservations en cours
 */
export const getCurrentBookings = async (): Promise<Booking[]> => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .lte("start_time", now) // start_time <= NOW
        .gte("end_time", now)   // end_time >= NOW
        .order("start_time", { ascending: true });

    if (error) throw error;
    return data ?? [];
}

/**
 * Récupère toutes les réservations à venir
 */
export const getUpcomingBookings = async (): Promise<Booking[]> => {
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .gt("start_time", new Date().toISOString()) // start_time > NOW
        .order("start_time", { ascending: true });

    if (error) throw error;
    return data ?? [];
}

/**
 * Récupère toutes les réservations non terminées
 */
export const getActiveBookings = async (): Promise<Booking[]> => {
    const { data, error } = await supabase
        .from(dbName)
        .select("*")
        .gt("end_time", new Date().toISOString()) // end_time > NOW
        .order("end_time", { ascending: true });

    if (error) throw error;
    return data ?? [];
}

/**
 * Créer une réservation
 */
export const createBooking = async (booking: NewBooking): Promise<Booking> => {
    const { data, error } = await supabase
        .from(dbName)
        .insert(booking)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Applique les modifications d'une réservation
 */
export const updateBooking = async (
    updatedBooking: Booking
): Promise<Booking> => {
    const { data, error } = await supabase
        .from(dbName)
        .update(updatedBooking)
        .eq('id', updatedBooking.id)
        .single();

    if (error) throw error;
    return data;
};

/**
 * Supprime une réservation
 */
export const deleteBooking = async (id: number): Promise<void> => {
    const { error } = await supabase
        .from(dbName)
        .delete()
        .eq('id', id);

    if (error) throw error;
};
