"use client";

import Link from "next/link";
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

  const dashboard = vm.dashboard;
  const badgeUrl = vm.badge?.publicBadgeUrl ?? "";
  const profile = dashboard.profile ?? {
    profileId,
    slug: "",
    displayName: "Profil",
    status: "DRAFT" as const,
    role: "VISITOR" as const,
  };
  const metrics = dashboard.metrics ?? {};
  const recentConnections = (vm.connections ?? []).slice(0, 3);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-lg font-semibold">{profile.displayName || "Profil"}</div>
              <div className="text-sm text-neutral-500">{profile.slug ? `@${profile.slug}` : "Slug indisponible"}</div>
              <div className="text-xs text-neutral-500">Status : {profile.status}</div>
              <div className="text-xs text-neutral-500">Role : {profile.role}</div>
            </div>

            <DashboardStats
              scans={metrics.scanCount ?? 0}
              connections={metrics.connectionCount ?? 0}
            />
          </div>

          <div id="badge" className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 p-4">
            {badgeUrl ? (
              <>
                <ProfileQrCode url={badgeUrl} />
                <div className="w-full space-y-2 text-center">
                  <div className="text-sm font-medium">Votre badge</div>
                  <a className="break-all text-sm text-blue-600 underline" href={badgeUrl}>
                    {badgeUrl}
                  </a>
                </div>
              </>
            ) : (
              <div className="text-sm text-neutral-500">Badge indisponible pour le moment.</div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Aperçu des connexions</h2>
          <Link className="text-sm text-blue-600 underline" href={`/dashboard/${profileId}/contacts`}>
            Voir tout
          </Link>
        </div>

        {recentConnections.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucune connexion pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {recentConnections.map((connection) => (
              <div
                key={`${connection.profileId}-${connection.createdAt}`}
                className="rounded-xl border border-neutral-200 p-3"
              >
                <div className="font-medium">
                  {connection.displayName || "Connexion sans nom"}
                </div>
                {connection.headline ? (
                  <div className="text-sm text-neutral-600">{connection.headline}</div>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                  <span>{connection.role}</span>
                  <span>{connection.createdAt || "Date indisponible"}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {vm.connectionsError ? (
          <p className="mt-3 text-sm text-neutral-500">{vm.connectionsError}</p>
        ) : null}
      </Card>
    </main>
  );
}
