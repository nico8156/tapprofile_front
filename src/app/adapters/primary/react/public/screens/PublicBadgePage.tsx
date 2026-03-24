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
	const contactsHref = vm.identity ? `/dashboard/${vm.identity.profileId}/contacts` : "";
	const showPostSuccessActions = Boolean(vm.identity && (vm.connectionAdded || vm.alreadyConnected));

	if (vm.loading) {
		return <main className="mx-auto max-w-md p-4">Chargement...</main>;
	}

	if (vm.pageError || !vm.badge) {
		return <main className="mx-auto max-w-md p-4">{vm.pageError || "Badge introuvable."}</main>;
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
			<Card>
				<div className="space-y-6">
					<div className="space-y-3">
						<ProfileHero displayName={vm.badge.displayName} headline={vm.badge.headline} bio="" />
						<p className="text-sm text-neutral-600">Ne perdez pas ce contact apres l&apos;evenement</p>
					</div>

					{vm.identity ? (
						<div className="space-y-3">
							<Button
								className="w-full text-base"
								disabled={vm.submitting || vm.connectionAdded || vm.alreadyConnected}
								onClick={() => void vm.connect()}
							>
								{vm.connectionAdded
									? "Contact ajoute"
									: vm.alreadyConnected
										? "Deja dans vos contacts"
										: vm.submitting
											? "Ajout en cours..."
											: "Ajouter ce contact"}
							</Button>

							{vm.connectionAdded ? (
								<div className="space-y-2">
									<p className="text-center text-sm text-neutral-600">Retrouvez-le dans vos contacts</p>
									<Link
										className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white"
										href={contactsHref}
									>
										Voir mes contacts
									</Link>
								</div>
							) : showPostSuccessActions ? (
								<div className="space-y-2">
									<Link
										className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white"
										href={contactsHref}
									>
										Voir mes contacts
									</Link>
								</div>
							) : (
								<p className="text-center text-sm text-neutral-500">Ajout instantane</p>
							)}
						</div>
					) : (
						<div className="space-y-3">
							<Button
								className="w-full text-base"
								onClick={() => router.push(`/create?returnTo=${encodeURIComponent(returnTo)}`)}
							>
								Creer mon badge
							</Button>
							<p className="text-center text-sm text-neutral-500">
								Creez votre badge pour ajouter ce contact en un clic.
							</p>
						</div>
					)}

					{vm.actionError ? <p className="text-sm text-red-500">{vm.actionError}</p> : null}
				</div>
			</Card>
		</main>
	);
}
