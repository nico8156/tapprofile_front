import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OwnerDashboardPage } from "@/app/adapters/primary/react/owner/screens/OwnerDashboardPage";

vi.mock("@/app/adapters/secondary/view-model/useOwnerDashboardVM", () => ({
	useOwnerDashboardVM: vi.fn(),
}));

vi.mock("@/app/adapters/primary/react/owner/components/ProfileQrCode", () => ({
	ProfileQrCode: ({ url }: { url: string }) => <div>QR:{url}</div>,
}));

const { useOwnerDashboardVM } = await import("@/app/adapters/secondary/view-model/useOwnerDashboardVM");
const mockedUseOwnerDashboardVM = vi.mocked(useOwnerDashboardVM);

describe("OwnerDashboardPage", () => {
	it("shows connection count and tolerates empty connections", () => {
		mockedUseOwnerDashboardVM.mockReturnValue({
			loading: false,
			error: "",
			connectionsError: "",
			badge: null,
			connections: [],
			dashboard: {
				profile: {
					profileId: "profile-1",
					slug: "alex-martin",
					displayName: "Alex Martin",
					status: "PUBLISHED",
					role: "EXHIBITOR",
				},
				metrics: {
					scanCount: 12,
					connectionCount: 9,
				},
			},
		});

		render(<OwnerDashboardPage profileId="profile-1" />);

		expect(screen.getByText("Connexions")).toBeTruthy();
		expect(screen.getByText("9")).toBeTruthy();
		expect(screen.getByText("Aucune connexion pour le moment.")).toBeTruthy();
	});

	it("does not crash when metrics are missing", () => {
		mockedUseOwnerDashboardVM.mockReturnValue({
			loading: false,
			error: "",
			connectionsError: "Impossible de charger les connexions pour le moment.",
			badge: null,
			connections: [],
			dashboard: {
				profile: {
					profileId: "profile-1",
					slug: "alex-martin",
					displayName: "Alex Martin",
					status: "PUBLISHED",
					role: "EXHIBITOR",
				},
				metrics: {},
			},
		});

		render(<OwnerDashboardPage profileId="profile-1" />);

		expect(screen.getAllByText("0")).toHaveLength(2);
		expect(screen.getByText("Impossible de charger les connexions pour le moment.")).toBeTruthy();
	});
});
