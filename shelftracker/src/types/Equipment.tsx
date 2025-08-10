export interface Equipment {
    id: number;
    created_at: string; // ISO timestamp
    name: string;
    location: string;
    booking_start: string | null; // timestamp ou null si non réservé
    booking_end: string | null;
    booker: string | null; // uuid de l'utilisateur ou null
}
