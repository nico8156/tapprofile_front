import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const loadProfileBadge =
	(gateway: TapProfileGateway) =>
	async (profileId: string) => {
		return gateway.getProfileBadge(profileId);
	};
