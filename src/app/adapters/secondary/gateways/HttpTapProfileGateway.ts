import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";
import type { LeadInput } from "@/app/core-logic/tap-profile/types/lead";
import { env } from "@/app/lib/env";
import { err, ok } from "@/app/lib/result";

export class HttpTapProfileGateway implements TapProfileGateway {
	async loadPublicProfile(slug: string) {
		const response = await fetch(`${env.apiBaseUrl}/api/profiles/${slug}/public`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			cache: "no-store",
		});

		if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
		if (!response.ok) return err("UNKNOWN_ERROR" as const);

		const json = await response.json();
		return ok(json);
	}

	async registerView(slug: string) {
		const response = await fetch(`${env.apiBaseUrl}/api/profiles/${slug}/views`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});

		if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
		if (!response.ok) return err("UNKNOWN_ERROR" as const);

		return ok(undefined);
	}

	async captureLead(input: LeadInput) {
		const response = await fetch(`${env.apiBaseUrl}/api/profiles/${input.slug}/leads`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: input.name,
				email: input.email,
			}),
		});

		if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
		if (response.status === 400) {
			const json = await response.json().catch(() => null);
			if (json?.code === "INVALID_NAME") return err("INVALID_NAME" as const);
			if (json?.code === "INVALID_EMAIL") return err("INVALID_EMAIL" as const);
		}
		if (!response.ok) return err("UNKNOWN_ERROR" as const);

		const json = await response.json();
		return ok(json);
	}

	async loadOwnerDashboard() {
		const response = await fetch(`${env.apiBaseUrl}/api/dashboard`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			cache: "no-store",
		});

		if (response.status === 401) return err("UNAUTHORIZED" as const);
		if (!response.ok) return err("UNKNOWN_ERROR" as const);

		const json = await response.json();
		return ok(json);
	}
}
