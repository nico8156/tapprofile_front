import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CreateProfilePage } from "@/app/adapters/primary/react/owner/screens/CreateProfilePage";

const push = vi.fn();
const submit = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push,
	}),
	useSearchParams: () =>
		new URLSearchParams("eventName=Tech%20Meetup&role=visitor"),
}));

vi.mock("@/app/adapters/secondary/view-model/useCreateProfileVM", () => ({
	useCreateProfileVM: vi.fn(),
}));

const { useCreateProfileVM } = await import("@/app/adapters/secondary/view-model/useCreateProfileVM");
const mockedUseCreateProfileVM = vi.mocked(useCreateProfileVM);

describe("CreateProfilePage", () => {
	beforeEach(() => {
		push.mockReset();
		submit.mockReset();
		mockedUseCreateProfileVM.mockReturnValue({
			submit,
			error: "",
			submitting: false,
		});
	});

	afterEach(() => {
		cleanup();
		vi.useRealTimers();
	});

	function advanceToForm() {
		fireEvent.click(screen.getByRole("button", { name: "Continuer" }));
		fireEvent.click(screen.getByRole("button", { name: "Continuer" }));
		fireEvent.click(screen.getByRole("button", { name: "Continuer" }));
	}

	it("progresses through the onboarding before showing the activation form", () => {
		render(<CreateProfilePage />);

		expect(screen.getByText("Bienvenue a Tech Meetup")).toBeTruthy();

		fireEvent.click(screen.getByText("Continuer"));
		expect(screen.getByText("Rencontrez. Scannez.")).toBeTruthy();

		fireEvent.click(screen.getByText("Continuer"));
		expect(screen.getByText("Gardez le contact")).toBeTruthy();

		fireEvent.click(screen.getByText("Continuer"));
		expect(screen.getByText("Creez votre badge")).toBeTruthy();
		expect(screen.getByLabelText(/Prenom/)).toBeTruthy();
		expect(screen.getByLabelText(/Nom/)).toBeTruthy();
		expect(screen.getByLabelText(/Email/)).toBeTruthy();
	});

	it("keeps the submit CTA disabled until the minimum required fields are valid", () => {
		render(<CreateProfilePage />);

		advanceToForm();

		const submitButton = screen.getAllByRole("button", { name: "Activer mon badge" })[0] as HTMLButtonElement;
		expect(submitButton.disabled).toBe(true);

		fireEvent.change(screen.getByLabelText(/Prenom/), { target: { value: "Lea" } });
		fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: "Martin" } });
		fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "lea" } });

		expect(submitButton.disabled).toBe(true);

		fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "lea@startup.fr" } });
		expect(submitButton.disabled).toBe(false);
	});

	it("submits the activation payload and redirects after success", async () => {
		submit.mockResolvedValue({
			ok: true,
			value: {
				profileId: "profile-1",
				publicBadgeUrl: "/b/badge-1",
				redirectTo: "/dashboard/profile-1#badge",
			},
		});

		render(<CreateProfilePage />);

		advanceToForm();

		fireEvent.change(screen.getByLabelText(/Prenom/), { target: { value: "Lea" } });
		fireEvent.change(screen.getByLabelText(/Nom/), { target: { value: "Martin" } });
		fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "lea@startup.fr" } });

		fireEvent.click(screen.getAllByRole("button", { name: "Activer mon badge" })[0]);

		await waitFor(() => {
			expect(submit).toHaveBeenCalledWith(
				{
					firstName: "Lea",
					lastName: "Martin",
					email: "lea@startup.fr",
					organization: "",
					role: "VISITOR",
				},
				null,
			);
		});

		expect(screen.getByText("C'est pret")).toBeTruthy();

		await waitFor(
			() => {
				expect(push).toHaveBeenCalledWith("/dashboard/profile-1#badge");
			},
			{ timeout: 2000 },
		);
	}, 8000);
});
