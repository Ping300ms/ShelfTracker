import type {Equipment} from "./Equipment.ts";
import type {Profile} from "./Profile.ts";

export interface Booking {
    id: string;
    equipment: Equipment;
    booker: Profile;
    rent: boolean;
    start_time: string; // ISO date string (timestamp)
    end_time: string;   // ISO date string (timestamp)
    created_at: string; // ISO date string
}

export type NewBooking = Omit<Booking, "id" | "created_at">;
