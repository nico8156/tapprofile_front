import { OwnerContactsPage } from "@/app/adapters/primary/react/owner/screens/OwnerContactsPage";

type Props = {
	params: Promise<{ profileId: string }>;
};

export default async function Page({ params }: Props) {
	const { profileId } = await params;
	return <OwnerContactsPage profileId={profileId} />;
}
