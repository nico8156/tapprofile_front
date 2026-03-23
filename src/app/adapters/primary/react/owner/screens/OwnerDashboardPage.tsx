"use client";

import Link from "next/link";
import { DashboardStats } from "@/app/adapters/primary/react/owner/components/DashboardStats";
import { ProfileQrCode } from "@/app/adapters/primary/react/owner/components/ProfileQrCode";
import { useOwnerDashboardVM } from "@/app/adapters/secondary/view-model/useOwnerDashboardVM";
import { Button } from "@/app/components/ui/Button";
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

  const dashboard = vm.dashboard;

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Card>
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div>
              <div className="text-lg font-semibold">{dashboard.profile.displayName}</div>
              <div className="text-sm text-neutral-500">@{dashboard.profile.slug}</div>
              <div className="text-xs text-neutral-500">Status : {dashboard.profile.status}</div>
              <div className="text-xs text-neutral-500">
                Role : {dashboard.profile.role === "EXHIBITOR" ? "Exposant" : "Visiteur"}
              </div>
            </div>

            <DashboardStats
              scans={dashboard.metrics.scanCount}
              connections={dashboard.metrics.connectionCount}
            />
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 p-4">
            <ProfileQrCode url={dashboard.badge.publicBadgeUrl} />
            <div className="w-full space-y-2 text-center">
              <div className="text-sm font-medium">Votre badge</div>
              <a
                className="block break-all text-xs text-neutral-500 underline"
                href={dashboard.badge.publicBadgeUrl}
                target="_blank"
                rel="noreferrer"
              >
                {dashboard.badge.publicBadgeUrl}
              </a>
              <Button
                className="w-full"
                onClick={() => {
                  void navigator.clipboard?.writeText(dashboard.badge.publicBadgeUrl);
                }}
              >
                Copier le lien
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Connexions recentes</h2>
          <Link className="text-sm underline" href={dashboard.badge.publicBadgeUrl}>
            Ouvrir mon badge
          </Link>
        </div>

        {dashboard.recentConnections.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucune connexion pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {dashboard.recentConnections.map((connection) => (
              <div key={connection.connectionId} className="rounded-xl border border-neutral-200 p-3">
                <div className="font-medium">{connection.connectedProfile.displayName}</div>
                <div className="text-sm text-neutral-600">{connection.connectedProfile.headline || "Sans headline"}</div>
                <div className="mt-1 text-xs text-neutral-500">@{connection.connectedProfile.slug}</div>
                <div className="mt-1 text-xs text-neutral-400">{connection.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
