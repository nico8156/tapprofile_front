import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";
import type { ConnectionSummary } from "@/app/core-logic/tap-profile/types/connection";
import type { LeadInput } from "@/app/core-logic/tap-profile/types/lead";
import { env } from "@/app/lib/env";
import { err, ok } from "@/app/lib/result";
import { readApiErrors } from "@/app/lib/utils";

type PublicProfileHttpResponse = {
	profileId: string;
	slug: string;
	displayName: string;
	headline: string;
	bio: string;
	publishedAt: string;
};

type PublicBadgeHttpResponse = {
	profileId: string;
	slug: string;
	displayName: string;
	headline: string;
	bio: string;
	role: "EXHIBITOR" | "VISITOR";
};

type DashboardHttpResponse = {
	profile: {
		profileId: string;
		slug: string;
		displayName: string;
		status: "DRAFT" | "PUBLISHED";
		role: "EXHIBITOR" | "VISITOR";
	};
	metrics: {
		viewCount?: number;
		scanCount?: number;
		leadCount?: number;
		connectionCount?: number;
		conversionRate?: number;
	};
	recentLeads?: Array<{
		leadId?: string;
		firstName?: string;
		email?: string;
		message?: string;
		createdAt?: string;
	}>;
};

type ProfileBadgeHttpResponse = {
	badgeToken: string;
	publicBadgeUrl: string;
};

type CreateProfileInput = {
	slug: string;
	displayName: string;
	headline: string;
	bio: string;
	role: "EXHIBITOR" | "VISITOR";
};

type CreateProfileHttpResponse = {
	profileId: string;
};

type CaptureLeadHttpResponse = {
	leadId: string;
};

type CreateConnectionHttpResponse = {
	connectionId: string;
	scannerProfileId: string;
	scannedProfileId: string;
	createdAt: string;
};

type ConnectionsHttpResponse = Array<{
	profileId?: string;
	displayName?: string;
	headline?: string;
	role?: "EXHIBITOR" | "VISITOR";
	createdAt?: string;
}>;

export class HttpTapProfileGateway implements TapProfileGateway {
	async loadPublicProfile(slug: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/public/profiles/${slug}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			});

			if (response.status === 404) {
				const errors = await readApiErrors(response);
				const hasNotPublished = errors.some((e) => e.code === "profile.not_published");
				return err(hasNotPublished ? "PROFILE_NOT_PUBLISHED" as const : "PROFILE_NOT_FOUND" as const);
			}

			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as PublicProfileHttpResponse;

			return ok({
				profileId: json.profileId,
				slug: json.slug,
				displayName: json.displayName,
				headline: json.headline,
				bio: json.bio,
				publishedAt: json.publishedAt,
			});
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async registerView(slug: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/public/profiles/${slug}/views`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (response.status === 404) {
				const errors = await readApiErrors(response);
				const hasNotPublished = errors.some((e) => e.code === "profile.not_published");
				return err(hasNotPublished ? "PROFILE_NOT_PUBLISHED" as const : "PROFILE_NOT_FOUND" as const);
			}

			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			return ok(undefined);
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async captureLead(input: LeadInput) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/public/profiles/${input.slug}/leads`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName: input.firstName,
					email: input.email,
					message: input.message,
				}),
			});

			if (response.status === 404) {
				const errors = await readApiErrors(response);
				const hasNotPublished = errors.some((e) => e.code === "profile.not_published");
				return err(hasNotPublished ? "PROFILE_NOT_PUBLISHED" as const : "PROFILE_NOT_FOUND" as const);
			}

			if (response.status === 400) {
				const errors = await readApiErrors(response);

				if (errors.some((e) => e.field === "firstName")) {
					return err("INVALID_FIRST_NAME" as const);
				}

				if (errors.some((e) => e.field === "email")) {
					return err("INVALID_EMAIL" as const);
				}

				return err("UNKNOWN_ERROR" as const);
			}

			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as CaptureLeadHttpResponse;
			return ok({ leadId: json.leadId });
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async getPublicBadge(badgeToken: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/public/badges/${badgeToken}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			});

			if (response.status === 404) return err("BADGE_NOT_FOUND" as const);
			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as PublicBadgeHttpResponse;

			return ok({
				profileId: json.profileId,
				slug: json.slug,
				displayName: json.displayName,
				headline: json.headline,
				bio: json.bio,
				role: json.role,
			});
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async loadOwnerDashboard(profileId: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/profiles/${profileId}/dashboard`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			});

			if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as DashboardHttpResponse;
			return ok({
				profile: json.profile,
				metrics: json.metrics,
				recentLeads: json.recentLeads,
			});
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async createProfile(input: CreateProfileInput) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/profiles`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(input),
			});

			if (!response.ok) {
				return err("UNKNOWN_ERROR" as const);
			}

			const json = (await response.json()) as CreateProfileHttpResponse;
			return ok({ profileId: json.profileId });
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async publishProfile(profileId: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/profiles/${profileId}/publish`, {
				method: "POST",
			});

			if (!response.ok) {
				return err("UNKNOWN_ERROR" as const);
			}

			return ok(undefined);
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async getProfileBadge(profileId: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/profiles/${profileId}/badge`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			});

			if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as ProfileBadgeHttpResponse;
			return ok(json);
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async createConnection(input: { scannerProfileId: string; badgeToken: string }) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/connections`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(input),
			});

			if (response.status === 404) {
				const errors = await readApiErrors(response);
				if (errors.some((error) => error.code === "badge.not_found")) {
					return err("BADGE_NOT_FOUND" as const);
				}

				return err("PROFILE_NOT_FOUND" as const);
			}

			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as CreateConnectionHttpResponse;
			return ok(json);
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}

	async getConnections(profileId: string) {
		try {
			const response = await fetch(`${env.apiBaseUrl}/api/profiles/${profileId}/connections`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				cache: "no-store",
			});

			if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
			if (!response.ok) return err("UNKNOWN_ERROR" as const);

			const json = (await response.json()) as ConnectionsHttpResponse;
			const connections: ConnectionSummary[] = Array.isArray(json)
				? json.map((connection) => ({
						profileId: connection.profileId ?? "",
						displayName: connection.displayName ?? "",
						headline: connection.headline ?? "",
						role: connection.role === "VISITOR" ? "VISITOR" : "EXHIBITOR",
						createdAt: connection.createdAt ?? "",
					}))
				: [];

			return ok(connections);
		} catch {
			return err("UNKNOWN_ERROR" as const);
		}
	}
}
