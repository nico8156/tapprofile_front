import type { Metadata } from "next";
import { ProductLandingPage } from "@/app/adapters/primary/react/public/screens/ProductLandingPage";

export const metadata: Metadata = {
	title: "TapProfile | Ne perdez plus jamais un contact apres un meetup",
	description: "Un QR code suffit pour garder le lien apres l'evenement.",
};

export default function Page() {
	return <ProductLandingPage variant="pain" />;
}
