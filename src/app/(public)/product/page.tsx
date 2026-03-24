import type { Metadata } from "next";
import { ProductLandingPage } from "@/app/adapters/primary/react/public/screens/ProductLandingPage";

export const metadata: Metadata = {
	title: "TapProfile | Echangez vos contacts en 1 scan",
	description: "Creez votre badge, montrez votre QR code et retrouvez vos connexions apres l'evenement.",
};

export default function Page() {
	return <ProductLandingPage />;
}
