import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import { Database } from "../types/database";
// Will be implemented in Step 9
// import { getEnvironmentConfig } from '../constants/config';

// const config = getEnvironmentConfig();
const supabaseUrl = process.env.EXPO_PUBLIC_API_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_API_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Type-safe database helpers
export const from = <T extends keyof Database['public']['Tables']>(
  table: T
) => supabase.from(table);

export const rpc = <T extends keyof Database['public']['Functions']>(
  fn: T,
  ...args: Parameters<Database['public']['Functions'][T]>
) => supabase.rpc(fn, ...args);

// Event listener for app state changes
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});