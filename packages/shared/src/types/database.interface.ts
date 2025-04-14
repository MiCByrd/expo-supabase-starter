import { Database } from "./database";

// Export base table types for direct use
export type TablesBase = Database["public"]["Tables"];

// Helper type for Supabase query responses
export type QueryResult<T> = T extends (infer U)[] ? U[] : T;

// Basic placeholder types for tables that don't exist yet
// These will be replaced by actual schema types once tables are created
export type UserRow = {
	id: string;
	email: string;
	created_at?: string;
};

export type ProfileRow = {
	id: string;
	user_id: string;
	name?: string;
	avatar_url?: string;
};

// Placeholder insert/update types
export type UserInsert = Omit<UserRow, "id"> & { id?: string };
export type UserUpdate = Partial<UserInsert>;
export type ProfileInsert = Omit<ProfileRow, "id"> & { id?: string };
export type ProfileUpdate = Partial<ProfileInsert>;

// Define strongly typed relation responses
export interface UserWithProfile extends UserRow {
	profile: ProfileRow;
}
