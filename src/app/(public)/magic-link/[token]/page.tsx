import { MagicLinkPage } from "@/app/adapters/primary/react/public/screens/MagicLinkPage";

type Props = {
	params: Promise<{ token: string }>;
};

export default async function Page({ params }: Props) {
	const { token } = await params;

	return <MagicLinkPage token={token} />;
}
