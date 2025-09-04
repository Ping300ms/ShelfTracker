export interface Profile {
    id: string;
    name: string;
}

export type NewProfile = Omit<Profile, "id">;
