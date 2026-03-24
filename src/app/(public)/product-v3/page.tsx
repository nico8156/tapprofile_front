import type { Metadata } from "next";
import { ProductLandingPage } from "@/app/adapters/primary/react/public/screens/ProductLandingPage";

export const metadata: Metadata = {
	title: "TapProfile | Tous vos contacts de meetup, au meme endroit",
	description: "Scannez, connectez, retrouvez vos contacts sans carte de visite ni friction.",
};

export default function Page() {
	return <ProductLandingPage variant="outcome" />;
}
