import { createProfile, normalizeProfileSlug } from "@/app/core-logic/tap-profile/usecases/createProfile";
import { ok } from "@/app/lib/result";
import { describe, expect, it, vi } from "vitest";

describe("normalizeProfileSlug", () => {
	it("slugifies display names", () => {
		expect(normalizeProfileSlug(" Alex Martin ")).toBe("alex-martin");
	});

	it("removes accents", () => {
		expect(normalizeProfileSlug("Nicolas Maldinéy")).toBe("nicolas-maldiney");
	});
});

describe("createProfile", () => {
	it("rejects missing required fields", async () => {
		const gateway = {
			createProfile: vi.fn(),
		} as any;

		const result = await createProfile(gateway)({
			displayName: "   ",
			email: "lea@example.com",
			headline: "Participant",
			role: "VISITOR",
		});

		expect(result).toEqual({ ok: false, error: "INVALID_PROFILE" });
		expect(gateway.createProfile).not.toHaveBeenCalled();
	});

	it("normalizes payload before delegating", async () => {
		const gateway = {
			createProfile: vi.fn().mockResolvedValue(ok({ profileId: "profile-1" })),
		} as any;

		const result = await createProfile(gateway)({
			displayName: " Alex Martin ",
			email: " LEA@STARTUP.FR ",
			headline: " Startup ",
			bio: " ",
			role: "EXHIBITOR",
		});

		expect(gateway.createProfile).toHaveBeenCalledWith({
			slug: "alex-martin",
			displayName: "Alex Martin",
			email: "lea@startup.fr",
			headline: "Startup",
			bio: "",
			role: "EXHIBITOR",
		});
		expect(result).toEqual({ ok: true, value: { profileId: "profile-1" } });
	});
});
