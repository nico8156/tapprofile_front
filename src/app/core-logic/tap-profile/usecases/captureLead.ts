import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";
import { err } from "@/app/lib/result";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const captureLead =
  (gateway: TapProfileGateway) =>
  async (input: {
    slug: string;
    firstName: string;
    email: string;
    message: string;
  }) => {
    if (!input.firstName.trim()) return err("INVALID_FIRST_NAME" as const);
    if (!emailRegex.test(input.email.trim())) return err("INVALID_EMAIL" as const);

    return gateway.captureLead({
      slug: input.slug,
      firstName: input.firstName.trim(),
      email: input.email.trim().toLowerCase(),
      message: input.message.trim(),
    });
  };
