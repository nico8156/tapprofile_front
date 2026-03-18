"use client";

import { DashboardStats } from "@/app/adapters/primary/react/owner/components/DashboardStats";
import { ProfileQrCode } from "@/app/adapters/primary/react/owner/components/ProfileQrCode";
import { useOwnerDashboardVM } from "@/app/adapters/secondary/view-model/useOwnerDashboardVM";
import { Card } from "@/app/components/ui/Card";

export function OwnerDashboardPage() {
	const vm = useOwnerDashboardVM();

	if (vm.loading) {
		return <main className="mx-auto max-w-3xl p-4">Chargement...</main>;
	}

	if (vm.error) {
		return <main className="mx-auto max-w-3xl p-4">Erreur dashboard : {vm.error}</main>;
	}

	return (
		<main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			{vm.items.map((item) => {
				const publicUrl =
					typeof window !== "undefined"
						? `${window.location.origin}/p/${item.slug}`
						: `/p/${item.slug}`;

				return (
					<Card key={item.profileId}>
						<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div className="flex-1 space-y-4">
								<div>
									<div className="text-lg font-semibold">@{item.slug}</div>
									<div className="text-sm text-neutral-500">{publicUrl}</div>
								</div>

								<DashboardStats
									views={item.views}
									leads={item.leads}
									conversionRate={item.conversionRate}
								/>
							</div>

							<ProfileQrCode url={publicUrl} />
						</div>
					</Card>
				);
			})}
		</main>
	);
}
