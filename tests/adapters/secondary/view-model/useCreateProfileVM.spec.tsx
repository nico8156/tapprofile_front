import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCreateProfileVM } from "@/app/adapters/secondary/view-model/useCreateProfileVM";

const { storeLocalIdentity, gateway } = vi.hoisted(() => ({
	storeLocalIdentity: vi.fn(),
	gateway: {
		createProfile: vi.fn(),
		requestMagicLink: vi.fn(),
		publishProfile: vi.fn(),
		getProfileBadge: vi.fn(),
	},
}));

vi.mock("@/app/adapters/secondary/browser/localIdentity", () => ({
	storeLocalIdentity,
}));

vi.mock("@/app/adapters/secondary/gateways/HttpTapProfileGateway", () => ({
	HttpTapProfileGateway: vi.fn(function MockHttpTapProfileGateway() {
		return gateway;
	}),
}));

describe("useCreateProfileVM", () => {
	beforeEach(() => {
		storeLocalIdentity.mockReset();
		gateway.createProfile.mockReset();
		gateway.requestMagicLink.mockReset();
		gateway.publishProfile.mockReset();
		gateway.getProfileBadge.mockReset();
	});

	it("returns success without waiting for the magic link email request", async () => {
		gateway.createProfile.mockResolvedValue({
			ok: true,
			value: { profileId: "profile-1" },
		});
		gateway.publishProfile.mockResolvedValue({
			ok: true,
			value: undefined,
		});
		gateway.getProfileBadge.mockResolvedValue({
			ok: true,
			value: { badgeToken: "badge-1", publicBadgeUrl: "/b/badge-1" },
		});
		gateway.requestMagicLink.mockImplementation(() => new Promise(() => undefined));

		const { result } = renderHook(() => useCreateProfileVM());

		const submission = result.current.submit({
			firstName: "Lea",
			lastName: "Martin",
			email: "LEA@STARTUP.FR ",
			organization: "",
			role: "VISITOR",
		});

		const outcome = await Promise.race([
			submission,
			new Promise<"timeout">((resolve) => {
				setTimeout(() => resolve("timeout"), 50);
			}),
		]);

		expect(outcome).not.toBe("timeout");
		expect(gateway.requestMagicLink).toHaveBeenCalledWith({
			profileId: "profile-1",
			email: "lea@startup.fr",
		});
		expect(gateway.createProfile).toHaveBeenCalledWith({
			slug: "lea-martin",
			displayName: "Lea Martin",
			email: "lea@startup.fr",
			headline: "Participant",
			bio: "",
			role: "VISITOR",
		});
		expect(storeLocalIdentity).toHaveBeenCalledWith({
			profileId: "profile-1",
			slug: "lea-martin",
			role: "VISITOR",
		});
		expect(outcome).toEqual({
			ok: true,
			value: {
				profileId: "profile-1",
				publicBadgeUrl: "/b/badge-1",
				redirectTo: "/dashboard/profile-1#badge",
			},
		});
		expect(gateway.createProfile.mock.calls[0][0]).toEqual({
			slug: "lea-martin",
			displayName: "Lea Martin",
			email: "lea@startup.fr",
			headline: "Participant",
			bio: "",
			role: "VISITOR",
		});
	});
});
