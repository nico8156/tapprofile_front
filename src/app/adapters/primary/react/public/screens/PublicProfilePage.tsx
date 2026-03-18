"use client";

import { LeadForm } from "@/app/adapters/primary/react/public/components/LeadForm";
import { ProfileHero } from "@/app/adapters/primary/react/public/components/ProfileHero";
import { ViewTracker } from "@/app/adapters/primary/react/public/components/ViewTracker";
import { usePublicProfileVM } from "@/app/adapters/secondary/view-model/usePublicProfileVM";
import { Card } from "@/app/components/ui/Card";

type Props = {
	slug: string;
};

export function PublicProfilePage({ slug }: Props) {
	const vm = usePublicProfileVM(slug);

	if (vm.loading) {
		return <main className="mx-auto max-w-md p-4">Chargement...</main>;
	}

	if (vm.error || !vm.profile) {
		return <main className="mx-auto max-w-md p-4">Profil introuvable.</main>;
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-4">
			<ViewTracker onTrack={vm.trackView} />

			<Card>
				<ProfileHero
					displayName={vm.profile.displayName}
					headline={vm.profile.headline}
					bio={vm.profile.bio}
				/>
			</Card>

			<Card>
				<LeadForm
					ctaLabel={vm.profile.ctaLabel || "Me contacter"}
					onSubmit={vm.submitLead}
					success={vm.leadSuccess}
					error={vm.leadError}
				/>
			</Card>
		</main>
	);
}
