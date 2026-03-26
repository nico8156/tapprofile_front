"use client";

import { Card } from "@/app/components/ui/Card";
import { useMagicLinkVM } from "@/app/adapters/secondary/view-model/useMagicLinkVM";

type Props = {
	token: string;
};

export function MagicLinkPage({ token }: Props) {
	const vm = useMagicLinkVM(token);

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-4">
			<Card>
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-bold">Connexion</h1>
					{vm.error ? (
						<p className="text-sm text-red-600">{vm.error}</p>
					) : (
						<p className="text-sm text-neutral-600">Récupération de vos contacts…</p>
					)}
				</div>
			</Card>
		</main>
	);
}
