"use client";

import type { ProfileRole } from "@/app/core-logic/tap-profile/types/profile";

export const LOCAL_IDENTITY_KEY = "tapprofile.identity";

export type LocalIdentity = {
	profileId: string;
	slug: string;
	role: ProfileRole;
};

export function storeLocalIdentity(identity: LocalIdentity) {
	window.localStorage.setItem(LOCAL_IDENTITY_KEY, JSON.stringify(identity));
}

export function readLocalIdentity(): LocalIdentity | null {
	const rawValue = window.localStorage.getItem(LOCAL_IDENTITY_KEY);

	if (!rawValue) return null;

	try {
		const parsed = JSON.parse(rawValue) as Partial<LocalIdentity>;

		if (
			typeof parsed.profileId !== "string" ||
			typeof parsed.slug !== "string" ||
			(parsed.role !== "EXHIBITOR" && parsed.role !== "VISITOR")
		) {
			return null;
		}

		return {
			profileId: parsed.profileId,
			slug: parsed.slug,
			role: parsed.role,
		};
	} catch {
		return null;
	}
}

export function clearLocalIdentity() {
	window.localStorage.removeItem(LOCAL_IDENTITY_KEY);
}
