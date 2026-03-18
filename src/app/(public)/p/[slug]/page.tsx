import { PublicProfilePage } from "@/app/adapters/primary/react/public/screens/PublicProfilePage";

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
	const { slug } = await params;
	return <PublicProfilePage slug={slug} />;
}
