"use client";

import Link from "next/link";
import { useConnectionsListVM } from "@/app/adapters/secondary/view-model/useConnectionsListVM";
import { Card } from "@/app/components/ui/Card";

type Props = {
	profileId: string;
};

function formatConnectionDate(value: string) {
	if (!value) return "Date indisponible";

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;

	return new Intl.DateTimeFormat("fr-FR", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

export function OwnerContactsPage({ profileId }: Props) {
	const vm = useConnectionsListVM(profileId);

	if (vm.loading) {
		return <main className="mx-auto max-w-md p-4">Chargement des connexions...</main>;
	}

	if (vm.error) {
		return <main className="mx-auto max-w-md p-4">{vm.error}</main>;
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-4">
			<div className="space-y-2">
				<Link className="text-sm text-neutral-500 underline" href={`/dashboard/${profileId}`}>
					Retour au dashboard
				</Link>
				<h1 className="text-2xl font-bold">Mes connexions</h1>
				<p className="text-sm text-neutral-600">Retrouvez tous les contacts scannes pendant l&apos;evenement.</p>
			</div>

			{vm.connections.length === 0 ? (
				<Card>
					<p className="text-sm text-neutral-500">Aucune connexion pour le moment.</p>
				</Card>
			) : (
				<div className="space-y-3">
					{vm.connections.map((connection) => (
						<Card key={`${connection.profileId}-${connection.createdAt}`}>
							<div className="space-y-2">
								<div className="text-base font-semibold">{connection.displayName || "Contact sans nom"}</div>
								<p className="text-sm text-neutral-600">{connection.headline || "Headline indisponible"}</p>
								<div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
									<span>{connection.role}</span>
									<span>{formatConnectionDate(connection.createdAt)}</span>
								</div>
							</div>
						</Card>
					))}
				</div>
			)}
		</main>
	);
}
