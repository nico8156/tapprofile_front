import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MagicLinkPage } from "@/app/adapters/primary/react/public/screens/MagicLinkPage";

vi.mock("@/app/adapters/secondary/view-model/useMagicLinkVM", () => ({
	useMagicLinkVM: vi.fn(),
}));

const { useMagicLinkVM } = await import("@/app/adapters/secondary/view-model/useMagicLinkVM");
const mockedUseMagicLinkVM = vi.mocked(useMagicLinkVM);

describe("MagicLinkPage", () => {
	beforeEach(() => {
		mockedUseMagicLinkVM.mockReset();
	});

	it("shows the recovery message while the magic link is loading", () => {
		mockedUseMagicLinkVM.mockReturnValue({
			loading: true,
			error: "",
		});

		render(<MagicLinkPage token="token-1" />);

		expect(screen.getByText("Récupération de vos contacts…")).toBeTruthy();
	});

	it("shows the invalid or expired error", () => {
		mockedUseMagicLinkVM.mockReturnValue({
			loading: false,
			error: "Lien invalide ou expiré",
		});

		render(<MagicLinkPage token="token-1" />);

		expect(screen.getByText("Lien invalide ou expiré")).toBeTruthy();
	});
});
