import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const createConnection =
	(gateway: TapProfileGateway) =>
	async (input: { scannerProfileId: string; badgeToken: string }) => {
		return gateway.createConnection(input);
	};
