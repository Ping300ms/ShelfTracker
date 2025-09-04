export interface Equipment {
    id: string;
    name: string;
    note: string | null;
    rent_price: number;
    location: string | null;
    created_at: string; // ISO date string
    type: string | null;
}

export type NewEquipment = Omit<Equipment, "id" | "created_at">;
