import { Database } from './database';

// Export base table types for direct use
export type Tables = Database['public']['Tables'];

// Strongly typed table rows (examples - will be populated with actual tables later)
export type UserRow = Tables['users']['Row'];
export type ProfileRow = Tables['profiles']['Row'];

// Define strongly typed insert and update payloads
export type UserInsert = Tables['users']['Insert'];
export type UserUpdate = Tables['users']['Update'];
export type ProfileInsert = Tables['profiles']['Insert'];
export type ProfileUpdate = Tables['profiles']['Update'];

// Define strongly typed relation responses
export interface UserWithProfile extends UserRow {
  profile: ProfileRow;
}

// Helper type for Supabase query responses
export type QueryResult<T> = T extends Array<infer U> ? U[] : T;