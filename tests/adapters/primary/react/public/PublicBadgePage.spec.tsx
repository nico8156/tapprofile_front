import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PublicBadgePage } from "@/app/adapters/primary/react/public/screens/PublicBadgePage";

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

vi.mock("@/app/adapters/secondary/view-model/usePublicBadgeVM", () => ({
	usePublicBadgeVM: vi.fn(),
}));

const { usePublicBadgeVM } = await import("@/app/adapters/secondary/view-model/usePublicBadgeVM");
const mockedUsePublicBadgeVM = vi.mocked(usePublicBadgeVM);

afterEach(() => {
	cleanup();
});

describe("PublicBadgePage", () => {
	it("shows a single success signal and a contacts action after adding a contact", () => {
		mockedUsePublicBadgeVM.mockReturnValue({
			loading: false,
			submitting: false,
			pageError: "",
			actionError: "",
			connectionAdded: true,
			alreadyConnected: false,
			identity: {
				profileId: "profile-1",
				slug: "alex-martin",
				role: "EXHIBITOR",
			},
			badge: {
				profileId: "profile-2",
				slug: "lea-bernard",
				displayName: "Lea Bernard",
				headline: "Founder",
				bio: "",
				role: "VISITOR",
			},
			connect: vi.fn(),
		});

		render(<PublicBadgePage badgeToken="badge-1" />);

		expect(screen.getAllByText("Contact ajoute")).toHaveLength(1);
		expect(screen.getByText("Retrouvez-le dans vos contacts")).toBeTruthy();
		expect(screen.getByText("Voir mes contacts")).toBeTruthy();
		expect(screen.queryByText("Retour au dashboard")).toBeNull();
	});

	it("shows a coherent already connected state without duplicate feedback", () => {
		mockedUsePublicBadgeVM.mockReturnValue({
			loading: false,
			submitting: false,
			pageError: "",
			actionError: "",
			connectionAdded: false,
			alreadyConnected: true,
			identity: {
				profileId: "profile-1",
				slug: "alex-martin",
				role: "EXHIBITOR",
			},
			badge: {
				profileId: "profile-2",
				slug: "lea-bernard",
				displayName: "Lea Bernard",
				headline: "Founder",
				bio: "",
				role: "VISITOR",
			},
			connect: vi.fn(),
		});

		render(<PublicBadgePage badgeToken="badge-1" />);

		expect(screen.getAllByText("Deja dans vos contacts")).toHaveLength(1);
		expect(screen.getByText("Voir mes contacts")).toBeTruthy();
		expect(screen.queryByText("Retrouvez-le dans vos contacts")).toBeNull();
	});
});
