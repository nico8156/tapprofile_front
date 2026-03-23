import { PublicBadgePage } from "@/app/adapters/primary/react/public/screens/PublicBadgePage";

type Props = {
	params: Promise<{ badgeToken: string }>;
};

export default async function Page({ params }: Props) {
	const { badgeToken } = await params;
	return <PublicBadgePage badgeToken={badgeToken} />;
}
