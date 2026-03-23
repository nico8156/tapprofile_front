import type {
	ProfileBadge,
	ProfileRole,
	PublicProfile,
	PublicProfileError,
	PublicBadge,
	PublicBadgeError,
} from "@/app/core-logic/tap-profile/types/profile";
import type {
	LeadCaptureError,
	LeadCaptureSuccess,
	LeadInput,
} from "@/app/core-logic/tap-profile/types/lead";
import type { OwnerDashboard } from "@/app/core-logic/tap-profile/types/stats";
import type { Result } from "@/app/lib/result";

export interface TapProfileGateway {
	loadPublicProfile(slug: string): Promise<Result<PublicProfile, PublicProfileError>>;
	registerView(slug: string): Promise<Result<void, "PROFILE_NOT_FOUND" | "PROFILE_NOT_PUBLISHED" | "UNKNOWN_ERROR">>;
	captureLead(input: LeadInput): Promise<Result<LeadCaptureSuccess, LeadCaptureError>>;
	getPublicBadge(badgeToken: string): Promise<Result<PublicBadge, PublicBadgeError>>;
	loadOwnerDashboard(profileId: string): Promise<Result<OwnerDashboard, "PROFILE_NOT_FOUND" | "UNKNOWN_ERROR">>;
	createProfile(input: {
		slug: string;
		displayName: string;
		headline: string;
		bio: string;
		role: ProfileRole;
	}): Promise<Result<{ profileId: string }, "UNKNOWN_ERROR">>;
	publishProfile(profileId: string): Promise<Result<void, "UNKNOWN_ERROR">>;
	getProfileBadge(profileId: string): Promise<Result<ProfileBadge, "PROFILE_NOT_FOUND" | "UNKNOWN_ERROR">>;
	createConnection(input: {
		scannerProfileId: string;
		badgeToken: string;
	}): Promise<
		Result<
			{
				connectionId: string;
				scannerProfileId: string;
				scannedProfileId: string;
				createdAt: string;
			},
			"PROFILE_NOT_FOUND" | "BADGE_NOT_FOUND" | "UNKNOWN_ERROR"
		>
	>;
	getConnections(profileId: string): Promise<
		Result<
			{
				profile: {
					profileId: string;
					slug: string;
					displayName: string;
				};
				connections: OwnerDashboard["recentConnections"];
			},
			"PROFILE_NOT_FOUND" | "UNKNOWN_ERROR"
		>
	>;
}
