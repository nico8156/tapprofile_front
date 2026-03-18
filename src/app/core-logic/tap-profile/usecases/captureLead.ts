import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";
import { err } from "@/app/lib/result";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const captureLead =
	(gateway: TapProfileGateway) =>
		async (input: { slug: string; name: string; email: string }) => {
			if (!input.name.trim()) return err("INVALID_NAME" as const);
			if (!emailRegex.test(input.email.trim())) return err("INVALID_EMAIL" as const);

			return gateway.captureLead({
				slug: input.slug,
				name: input.name.trim(),
				email: input.email.trim().toLowerCase(),
			});
		};
