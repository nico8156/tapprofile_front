import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OwnerContactsPage } from "@/app/adapters/primary/react/owner/screens/OwnerContactsPage";

vi.mock("@/app/adapters/secondary/view-model/useConnectionsListVM", () => ({
	useConnectionsListVM: vi.fn(),
}));

const { useConnectionsListVM } = await import("@/app/adapters/secondary/view-model/useConnectionsListVM");
const mockedUseConnectionsListVM = vi.mocked(useConnectionsListVM);

describe("OwnerContactsPage", () => {
	it("shows an empty state", () => {
		mockedUseConnectionsListVM.mockReturnValue({
			loading: false,
			error: "",
			connections: [],
		});

		render(<OwnerContactsPage profileId="profile-1" />);

		expect(screen.getByText("Mes contacts")).toBeTruthy();
		expect(screen.getByText("Aucun contact pour l'instant. Scannez un badge pour commencer.")).toBeTruthy();
	});

	it("shows the full connections list", () => {
		mockedUseConnectionsListVM.mockReturnValue({
			loading: false,
			error: "",
			connections: [
				{
					profileId: "profile-2",
					displayName: "Nina Rossi",
					headline: "Product designer",
					role: "VISITOR",
					createdAt: "2026-03-21T10:00:00Z",
				},
			],
		});

		render(<OwnerContactsPage profileId="profile-1" />);

		expect(screen.getByText("Nina Rossi")).toBeTruthy();
		expect(screen.getByText("Product designer")).toBeTruthy();
		expect(screen.getByText("VISITOR")).toBeTruthy();
	});
});
