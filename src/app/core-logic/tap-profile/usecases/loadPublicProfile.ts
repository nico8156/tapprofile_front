import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const loadPublicProfile =
  (gateway: TapProfileGateway) =>
  async (slug: string) => {
    return gateway.loadPublicProfile(slug);
  };
