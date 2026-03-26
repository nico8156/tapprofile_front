import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMagicLinkVM } from "@/app/adapters/secondary/view-model/useMagicLinkVM";

const { replace, storeLocalIdentity, gateway } = vi.hoisted(() => ({
	replace: vi.fn(),
	storeLocalIdentity: vi.fn(),
	gateway: {
		consumeMagicLink: vi.fn(),
	},
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		replace,
	}),
}));

vi.mock("@/app/adapters/secondary/browser/localIdentity", () => ({
	storeLocalIdentity,
}));

vi.mock("@/app/adapters/secondary/gateways/HttpTapProfileGateway", () => ({
	HttpTapProfileGateway: vi.fn(function MockHttpTapProfileGateway() {
		return gateway;
	}),
}));

describe("useMagicLinkVM", () => {
	beforeEach(() => {
		replace.mockReset();
		storeLocalIdentity.mockReset();
		gateway.consumeMagicLink.mockReset();
	});

	it("hydrates identity from profile and redirects to the profile dashboard", async () => {
		gateway.consumeMagicLink.mockResolvedValue({
			ok: true,
			value: {
				profile: {
					profileId: "profile-1",
					slug: "lea-martin",
					displayName: "Lea Martin",
					email: "lea@example.com",
					role: "VISITOR",
					status: "PUBLISHED",
				},
				contacts: [
					{
						profileId: "profile-2",
						displayName: "Nina Rossi",
						headline: "Product designer",
						role: "EXHIBITOR",
						createdAt: "2026-03-21T10:00:00Z",
					},
				],
			},
		});

		renderHook(() => useMagicLinkVM("token-1"));

		await waitFor(() => {
			expect(storeLocalIdentity).toHaveBeenCalledWith({
				profileId: "profile-1",
				slug: "lea-martin",
				displayName: "Lea Martin",
				email: "lea@example.com",
				role: "VISITOR",
				status: "PUBLISHED",
			});
		});

		expect(replace).toHaveBeenCalledWith("/dashboard/profile-1");
	});

	it("shows a dedicated error for an invalid token", async () => {
		gateway.consumeMagicLink.mockResolvedValue({
			ok: false,
			error: "MAGIC_LINK_INVALID_OR_EXPIRED",
		});

		const { result } = renderHook(() => useMagicLinkVM("token-1"));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toBe("Lien invalide ou expiré");
		expect(storeLocalIdentity).not.toHaveBeenCalled();
		expect(replace).not.toHaveBeenCalled();
	});
});
