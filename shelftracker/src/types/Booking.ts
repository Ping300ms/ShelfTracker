export interface Booking {
    id: number;
    equipment_id: number;
    booker_id: number;
    rent: boolean;
    start_time: string; // ISO date string (timestamp)
    end_time: string;   // ISO date string (timestamp)
    created_at: string; // ISO date string
}

export type NewBooking = Omit<Booking, "id" | "created_at">;
