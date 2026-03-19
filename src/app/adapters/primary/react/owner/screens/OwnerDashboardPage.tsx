"use client";

import { DashboardStats } from "@/app/adapters/primary/react/owner/components/DashboardStats";
import { ProfileQrCode } from "@/app/adapters/primary/react/owner/components/ProfileQrCode";
import { useOwnerDashboardVM } from "@/app/adapters/secondary/view-model/useOwnerDashboardVM";
import { Card } from "@/app/components/ui/Card";

type Props = {
  profileId: string;
};

export function OwnerDashboardPage({ profileId }: Props) {
  const vm = useOwnerDashboardVM(profileId);

  if (vm.loading) {
    return <main className="mx-auto max-w-3xl p-4">Chargement...</main>;
  }

  if (vm.error || !vm.dashboard) {
    return <main className="mx-auto max-w-3xl p-4">{vm.error || "Erreur dashboard."}</main>;
  }

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/p/${vm.dashboard.profile.slug}`
      : `/p/${vm.dashboard.profile.slug}`;

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-lg font-semibold">{vm.dashboard.profile.displayName}</div>
              <div className="text-sm text-neutral-500">@{vm.dashboard.profile.slug}</div>
              <div className="text-xs text-neutral-500">Status : {vm.dashboard.profile.status}</div>
            </div>

            <DashboardStats
              views={vm.dashboard.metrics.viewCount}
              leads={vm.dashboard.metrics.leadCount}
              conversionRate={vm.dashboard.metrics.conversionRate}
            />
          </div>

          <ProfileQrCode url={publicUrl} />
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Leads récents</h2>

        {vm.dashboard.recentLeads.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucun lead pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {vm.dashboard.recentLeads.map((lead) => (
              <div key={lead.leadId} className="rounded-xl border border-neutral-200 p-3">
                <div className="font-medium">{lead.firstName}</div>
                <div className="text-sm text-neutral-600">{lead.email}</div>
                <div className="mt-1 text-sm text-neutral-700">{lead.message || "—"}</div>
                <div className="mt-1 text-xs text-neutral-400">{lead.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
