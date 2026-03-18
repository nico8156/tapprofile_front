export type PublicProfile = {
	id: string;
	slug: string;
	displayName: string;
	headline: string;
	bio: string;
	ctaLabel: string;
};

export type PublicProfileError =
	| "PROFILE_NOT_FOUND"
	| "PROFILE_UNAVAILABLE"
	| "UNKNOWN_ERROR";
