// Define environment types for type safety
export type Environment = "development" | "staging" | "production";

export interface EnvironmentConfig {
	env: Environment;
	supabaseUrl: string;
	supabaseAnonKey: string;
	apiBaseUrl: string;
	logLevel: "debug" | "info" | "warn" | "error";
}

// Environment-specific configurations
const development: EnvironmentConfig = {
	env: "development",
	supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
	supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
	apiBaseUrl: "http://localhost:54321",
	logLevel: "debug",
};

const staging: EnvironmentConfig = {
	env: "staging",
	supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
	supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
	apiBaseUrl: "https://staging-api.your-domain.com",
	logLevel: "info",
};

const production: EnvironmentConfig = {
	env: "production",
	supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
	supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
	apiBaseUrl: "https://api.your-domain.com",
	logLevel: "warn",
};

// Type-safe environment getter
export const getEnvironmentConfig = (): EnvironmentConfig => {
	const env = (process.env.NODE_ENV || "development") as Environment;

	switch (env) {
		case "production":
			return production;
		case "staging":
			return staging;
		case "development":
		default:
			return development;
	}
};
