import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";
import type { ProfileRole } from "@/app/core-logic/tap-profile/types/profile";
import { err } from "@/app/lib/result";

export const normalizeProfileSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

export const createProfile =
	(gateway: TapProfileGateway) =>
	async (input: {
		slug?: string;
		displayName: string;
		email: string;
		headline?: string;
		bio?: string;
		role?: ProfileRole;
	}) => {
		const displayName = input.displayName.trim();
		const slug = normalizeProfileSlug(input.slug?.trim() || displayName);
		const email = input.email.trim().toLowerCase();
		const headline = input.headline?.trim() || "";
		const bio = input.bio?.trim() || "";

		if (!displayName || !slug || !email || !headline) {
			return err("INVALID_PROFILE" as const);
		}

		return gateway.createProfile({
			slug,
			displayName,
			email,
			headline,
			bio,
			role: input.role,
		});
	};
