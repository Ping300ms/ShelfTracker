export interface Equipment {
    id: number;
    name: string;
    note: string | null;
    rent_price: number;
    location: string | null;
    created_at: string; // ISO date string
}

export type NewEquipment = Omit<Equipment, "id" | "created_at">;
