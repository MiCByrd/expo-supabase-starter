import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { ApiResponse } from "../types.ts";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
};

interface UserInfo {
	id: string;
	email: string;
	role: string;
}

serve(async (req: Request): Promise<Response> => {
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		const supabaseClient = createClient(
			Deno.env.get("SUPABASE_URL") ?? "",
			Deno.env.get("SUPABASE_ANON_KEY") ?? "",
			{
				global: {
					headers: { Authorization: req.headers.get("Authorization")! },
				},
			},
		);

		const {
			data: { user },
			error: userError,
		} = await supabaseClient.auth.getUser();

		if (userError || !user) {
			const response: ApiResponse<null> = {
				error: userError?.message || "Unauthorized",
				status: 401,
			};
			return new Response(JSON.stringify(response), {
				headers: { ...corsHeaders, "Content-Type": "application/json" },
				status: 401,
			});
		}

		// Get additional user info from the database
		const { data: profile, error: profileError } = await supabaseClient
			.from("profiles")
			.select("role")
			.eq("id", user.id)
			.single();

		if (profileError) {
			const response: ApiResponse<null> = {
				error: profileError.message,
				status: 400,
			};
			return new Response(JSON.stringify(response), {
				headers: { ...corsHeaders, "Content-Type": "application/json" },
				status: 400,
			});
		}

		const userInfo: UserInfo = {
			id: user.id,
			email: user.email || "",
			role: profile?.role || "user",
		};

		const response: ApiResponse<UserInfo> = {
			data: userInfo,
			status: 200,
		};

		return new Response(JSON.stringify(response), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 200,
		});
	} catch (error) {
		const response: ApiResponse<null> = {
			error: error.message,
			status: 500,
		};
		return new Response(JSON.stringify(response), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 500,
		});
	}
});
