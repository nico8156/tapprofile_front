"use client";

import Link from "next/link";
import { useHomeEntryVM } from "@/app/adapters/secondary/view-model/useHomeEntryVM";
import { Card } from "@/app/components/ui/Card";

export function HomeEntryPage() {
	const vm = useHomeEntryVM();
	const profileId = vm.identity?.profileId ?? "";

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">TapProfile</h1>
				<p className="text-sm text-neutral-600">Echangez vos contacts en meetup aussi simplement qu&apos;un QR code.</p>
			</div>

			<Card>
				<div className="space-y-3">
					{!vm.ready ? (
						<p className="text-sm text-neutral-500">Chargement...</p>
					) : vm.identity ? (
						<>
							<p className="text-sm text-neutral-600">Accedez directement a votre espace.</p>
							<Link className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white" href={`/dashboard/${profileId}`}>
								Voir mon dashboard
							</Link>
							<Link className="block rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium" href={`/dashboard/${profileId}#badge`}>
								Voir mon badge
							</Link>
							<Link className="block rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium" href={`/dashboard/${profileId}/contacts`}>
								Voir mes contacts
							</Link>
						</>
					) : (
						<>
							<p className="text-sm text-neutral-600">Creez votre badge pour commencer a partager et retrouver vos connexions.</p>
							<Link className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white" href="/create">
								Creer mon profil
							</Link>
						</>
					)}
				</div>
			</Card>
		</main>
	);
}
