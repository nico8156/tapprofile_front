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

		expect(screen.getByText("Vous perdez vos contacts apres chaque meetup ?")).toBeTruthy();
		expect(
			screen.getByText("Cartes de visite oubliees, LinkedIn jamais retrouves. Gardez chaque contact en un scan."),
		).toBeTruthy();
		expect(screen.getByText("Ce qui se passe aujourd'hui")).toBeTruthy();
		expect(screen.getAllByText("Vous oubliez les noms").length).toBeGreaterThan(0);
		expect(screen.getByText("TapProfile remplace les oublis par une action claire")).toBeTruthy();
		expect(screen.getAllByText("Garder mes contacts").length).toBeGreaterThan(0);
	});

	it("renders the outcome-driven variant", () => {
		render(<ProductLandingPage variant="outcome" />);

		expect(screen.getByText("Un scan. Et le contact est enregistre.")).toBeTruthy();
		expect(screen.getByText("Pas de carte de visite. Pas d'effort. Juste une connexion instantanee.")).toBeTruthy();
		expect(screen.getByText("Imaginez un meetup")).toBeTruthy();
		expect(screen.getAllByText("Vous discutez").length).toBeGreaterThan(0);
		expect(screen.getByText("Zero carte de visite")).toBeTruthy();
	});
});
