import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomeEntryPage } from "@/app/adapters/primary/react/owner/screens/HomeEntryPage";

vi.mock("@/app/adapters/secondary/view-model/useHomeEntryVM", () => ({
	useHomeEntryVM: vi.fn(),
}));

const { useHomeEntryVM } = await import("@/app/adapters/secondary/view-model/useHomeEntryVM");
const mockedUseHomeEntryVM = vi.mocked(useHomeEntryVM);

describe("HomeEntryPage", () => {
	it("shows the create CTA when no local identity exists", () => {
		mockedUseHomeEntryVM.mockReturnValue({
			ready: true,
			identity: null,
		});

		render(<HomeEntryPage />);

		expect(screen.getByText("Ton badge pour echanger tes contacts en 1 scan")).toBeTruthy();
		expect(screen.getByText("Montre ton QR → on te scanne → retrouve tes contacts apres l'evenement")).toBeTruthy();
		expect(screen.getByText("Creer mon badge")).toBeTruthy();
		expect(screen.queryByText("Voir mon dashboard")).toBeNull();
	});

	it("shows direct access CTAs when a local identity exists", () => {
		mockedUseHomeEntryVM.mockReturnValue({
			ready: true,
			identity: {
				profileId: "profile-1",
				slug: "alex-martin",
				role: "EXHIBITOR",
			},
		});

		render(<HomeEntryPage />);

		expect(screen.getByText("Voir mon dashboard")).toBeTruthy();
		expect(screen.getByText("Voir mon badge")).toBeTruthy();
		expect(screen.getByText("Voir mes contacts")).toBeTruthy();
	});
});
