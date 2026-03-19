import { OwnerDashboardPage } from "@/app/adapters/primary/react/owner/screens/OwnerDashboardPage";

type Props = {
  params: Promise<{ profileId: string }>;
};

export default async function Page({ params }: Props) {
  const { profileId } = await params;
  return <OwnerDashboardPage profileId={profileId} />;
}
