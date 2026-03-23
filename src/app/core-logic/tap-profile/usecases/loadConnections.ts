import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const loadConnections =
	(gateway: TapProfileGateway) =>
	async (profileId: string) => {
		return gateway.getConnections(profileId);
	};
