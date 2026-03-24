"use client";

import Link from "next/link";
import { DashboardStats } from "@/app/adapters/primary/react/owner/components/DashboardStats";
import { ProfileQrCode } from "@/app/adapters/primary/react/owner/components/ProfileQrCode";
import { useOwnerDashboardVM } from "@/app/adapters/secondary/view-model/useOwnerDashboardVM";
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
  }).format(date);
}

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
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-neutral-600">Suivez vos scans et retrouvez rapidement vos derniers contacts.</p>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-lg font-semibold">{profile.displayName || "Profil"}</div>
              <div className="text-sm text-neutral-500">{profile.slug ? `@${profile.slug}` : "Votre profil meetup"}</div>
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
                  <p className="text-sm text-neutral-500">Scannez ce QR code pour echanger vos contacts.</p>
                </div>
              </>
            ) : (
              <div className="text-sm text-neutral-500">Badge indisponible pour le moment.</div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-4 space-y-1">
          <h2 className="text-lg font-semibold">Connexions recentes</h2>
          <p className="text-sm text-neutral-600">Les derniers contacts ajoutes a votre liste.</p>
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
                  <span>{formatConnectionDate(connection.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {vm.connectionsError ? (
          <p className="mt-3 text-sm text-neutral-500">{vm.connectionsError}</p>
        ) : null}

        <div className="mt-4">
          <Link
            className="block rounded-xl border border-black bg-black px-4 py-3 text-center text-sm font-medium text-white"
            href={`/dashboard/${profileId}/contacts`}
          >
            Voir tous mes contacts
          </Link>
        </div>
      </Card>
    </main>
  );
}
