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
