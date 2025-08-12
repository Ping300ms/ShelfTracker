export interface Profile {
    id: number;
    name: string;
}

export type NewProfile = Omit<Profile, "id">;
