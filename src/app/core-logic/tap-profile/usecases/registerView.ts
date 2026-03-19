import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";

export const registerView =
  (gateway: TapProfileGateway) =>
  async (slug: string) => {
    return gateway.registerView(slug);
  };
