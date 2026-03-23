"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileHero } from "@/app/adapters/primary/react/public/components/ProfileHero";
import { usePublicBadgeVM } from "@/app/adapters/secondary/view-model/usePublicBadgeVM";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";

type Props = {
	badgeToken: string;
};

export function PublicBadgePage({ badgeToken }: Props) {
	const vm = usePublicBadgeVM(badgeToken);
	const router = useRouter();
	const returnTo = `/b/${badgeToken}`;

	if (vm.loading) {
		return <main className="mx-auto max-w-md p-4">Chargement...</main>;
	}

	if (vm.pageError || !vm.badge) {
		return <main className="mx-auto max-w-md p-4">{vm.pageError || "Badge introuvable."}</main>;
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-4">
			<Card>
				<div className="space-y-3">
					<ProfileHero displayName={vm.badge.displayName} headline={vm.badge.headline} bio="" />
				</div>
			</Card>

			<Card>
				<div className="space-y-4">
					<p className="text-sm text-neutral-600">
						Ajoute ce contact pour le retrouver apres l'evenement
					</p>

					{vm.identity ? vm.connectionAdded ? (
						<div className="w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
							✓ Contact ajoute
						</div>
					) : (
						<Button className="w-full" disabled={vm.submitting} onClick={() => void vm.connect()}>
							{vm.submitting ? "Ajout..." : "Ajouter ce contact"}
						</Button>
					) : (
						<div className="space-y-3">
							<Button
								className="w-full"
								onClick={() => router.push(`/create?returnTo=${encodeURIComponent(returnTo)}`)}
							>
								Creer mon badge
							</Button>
							<p className="text-center text-sm text-neutral-500">
								Cree ton badge pour echanger tes contacts
							</p>
						</div>
					)}

					{vm.actionError ? <p className="text-sm text-red-500">{vm.actionError}</p> : null}

					{vm.identity ? (
						<Link className="block text-center text-sm text-neutral-500 underline" href={`/dashboard/${vm.identity.profileId}`}>
							Voir mon dashboard
						</Link>
					) : null}
				</div>
			</Card>
		</main>
	);
}
