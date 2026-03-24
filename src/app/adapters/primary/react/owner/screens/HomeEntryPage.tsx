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
				<h1 className="text-3xl font-bold">Ton badge pour echanger tes contacts en 1 scan</h1>
				<p className="text-sm text-neutral-600">Montre ton QR → on te scanne → retrouve tes contacts apres l&apos;evenement</p>
				<Link className="inline-flex text-sm font-medium text-neutral-700 underline underline-offset-4" href="/product">
					Voir la presentation produit
				</Link>
			</div>

			<Card>
				<div className="space-y-3">
					{!vm.ready ? (
						<p className="text-sm text-neutral-500">Chargement...</p>
					) : vm.identity ? (
						<>
							<p className="text-sm text-neutral-600">Retrouvez votre badge, vos contacts et votre dashboard.</p>
							<Link className="block rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium" href={`/dashboard/${profileId}#badge`}>
								Voir mon badge
							</Link>
							<Link className="block rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium" href={`/dashboard/${profileId}/contacts`}>
								Voir mes contacts
							</Link>
							<Link className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white" href={`/dashboard/${profileId}`}>
								Voir mon dashboard
							</Link>
						</>
					) : (
						<>
							<Link className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white" href="/create">
								Creer mon badge
							</Link>
						</>
					)}
				</div>
			</Card>
		</main>
	);
}
