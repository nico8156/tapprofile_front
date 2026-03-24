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

	it("renders the pain-driven variant", () => {
		render(<ProductLandingPage variant="pain" />);

		expect(screen.getByText("Ne perdez plus jamais un contact apres un meetup")).toBeTruthy();
		expect(screen.getByText("Un QR code suffit pour garder le lien apres l'evenement.")).toBeTruthy();
		expect(screen.getByText("Evite les oublis")).toBeTruthy();
	});

	it("renders the outcome-driven variant", () => {
		render(<ProductLandingPage variant="outcome" />);

		expect(screen.getByText("Tous vos contacts de meetup, au meme endroit")).toBeTruthy();
		expect(screen.getByText("Scannez, connectez, retrouvez vos contacts sans carte de visite ni friction.")).toBeTruthy();
		expect(screen.getByText("Un point d'entree unique")).toBeTruthy();
	});
});
