import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const loadPublicBadge =
	(gateway: TapProfileGateway) =>
	async (badgeToken: string) => {
		return gateway.getPublicBadge(badgeToken);
	};
