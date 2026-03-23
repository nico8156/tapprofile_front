import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const publishProfile =
  (gateway: TapProfileGateway) =>
  async (profileId: string) => {
    return gateway.publishProfile(profileId);
  };
