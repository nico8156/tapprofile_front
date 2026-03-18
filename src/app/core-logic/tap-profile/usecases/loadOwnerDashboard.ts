import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const loadOwnerDashboard =
	(gateway: TapProfileGateway) =>
		async () => {
			return gateway.loadOwnerDashboard();
		};
