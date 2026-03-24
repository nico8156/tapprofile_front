import type { ProfileRole } from "@/app/core-logic/tap-profile/types/profile";

export type ConnectionSummary = {
	profileId: string;
	displayName: string;
	headline: string;
	role: ProfileRole;
	createdAt: string;
};
