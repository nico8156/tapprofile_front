import type {
	LeadCaptureError,
	LeadCaptureSuccess,
	LeadInput,
} from "@/app/core-logic/tap-profile/types/lead";
import type {
	PublicProfile,
	PublicProfileError,
} from "@/app/core-logic/tap-profile/types/profile";
import type { OwnerDashboardStats } from "@/app/core-logic/tap-profile/types/stats";
import type { Result } from "@/app/lib/result";

export interface TapProfileGateway {
	loadPublicProfile(slug: string): Promise<Result<PublicProfile, PublicProfileError>>;
	registerView(slug: string): Promise<Result<void, "PROFILE_NOT_FOUND" | "UNKNOWN_ERROR">>;
	captureLead(input: LeadInput): Promise<Result<LeadCaptureSuccess, LeadCaptureError>>;
	loadOwnerDashboard(): Promise<Result<OwnerDashboardStats[], "UNAUTHORIZED" | "UNKNOWN_ERROR">>;
}
