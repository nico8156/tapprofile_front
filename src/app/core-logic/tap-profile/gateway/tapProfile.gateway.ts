import type { Result } from "@/app/lib/result";
import type {
  LeadCaptureError,
  LeadCaptureSuccess,
  LeadInput,
} from "@/app/core-logic/tap-profile/types/lead";
import type {
  PublicProfile,
  PublicProfileError,
} from "@/app/core-logic/tap-profile/types/profile";
import type { OwnerDashboard } from "@/app/core-logic/tap-profile/types/stats";

export interface TapProfileGateway {
  loadPublicProfile(slug: string): Promise<Result<PublicProfile, PublicProfileError>>;
  registerView(slug: string): Promise<Result<void, "PROFILE_NOT_FOUND" | "PROFILE_NOT_PUBLISHED" | "UNKNOWN_ERROR">>;
  captureLead(input: LeadInput): Promise<Result<LeadCaptureSuccess, LeadCaptureError>>;
  loadOwnerDashboard(profileId: string): Promise<Result<OwnerDashboard, "PROFILE_NOT_FOUND" | "UNKNOWN_ERROR">>;
}
