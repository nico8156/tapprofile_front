import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductLandingPage } from "@/app/adapters/primary/react/public/screens/ProductLandingPage";

describe("ProductLandingPage", () => {
	it("renders the key product message and main CTAs", () => {
		render(<ProductLandingPage />);

		expect(screen.getByText("Echangez vos contacts en 1 scan")).toBeTruthy();
		expect(
			screen.getByText("Creez votre badge, montrez votre QR code, retrouvez vos connexions apres l'evenement."),
		).toBeTruthy();
		expect(screen.getAllByText("Creer mon badge").length).toBeGreaterThan(0);
		expect(screen.getByText("Voir la demo")).toBeTruthy();
		expect(screen.getByText("Trois etapes, rien de plus")).toBeTruthy();
		expect(screen.getByText("Meetups")).toBeTruthy();
	});
});
