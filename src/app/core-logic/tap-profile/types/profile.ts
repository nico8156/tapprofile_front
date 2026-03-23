export type ProfileRole = "EXHIBITOR" | "VISITOR";

export type PublicBadge = {
	profileId: string;
	slug: string;
	displayName: string;
	headline: string;
	bio: string;
	role: ProfileRole;
};

export type ProfileBadge = {
	badgeToken: string;
	publicBadgeUrl: string;
};

export type PublicBadgeError = "BADGE_NOT_FOUND" | "UNKNOWN_ERROR";

export type PublicProfile = {
	profileId: string;
	slug: string;
	displayName: string;
	headline: string;
	bio: string;
	publishedAt: string;
};

export type PublicProfileError =
	| "PROFILE_NOT_FOUND"
	| "PROFILE_NOT_PUBLISHED"
	| "UNKNOWN_ERROR";
