"use client";

import { useEffect, useMemo, useState } from "react";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { loadConnections } from "@/app/core-logic/tap-profile/usecases/loadConnections";
import type { ConnectionSummary } from "@/app/core-logic/tap-profile/types/connection";
import { loadOwnerDashboard } from "@/app/core-logic/tap-profile/usecases/loadOwnerDashboard";
import { loadProfileBadge } from "@/app/core-logic/tap-profile/usecases/loadProfileBadge";
import type { ProfileBadge } from "@/app/core-logic/tap-profile/types/profile";
import type { OwnerDashboard } from "@/app/core-logic/tap-profile/types/stats";

export function useOwnerDashboardVM(profileId: string) {
  const gateway = useMemo(() => new HttpTapProfileGateway(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connectionsError, setConnectionsError] = useState("");
  const [dashboard, setDashboard] = useState<OwnerDashboard | null>(null);
  const [badge, setBadge] = useState<ProfileBadge | null>(null);
  const [connections, setConnections] = useState<ConnectionSummary[]>([]);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");
    setConnectionsError("");
    setDashboard(null);
    setBadge(null);
    setConnections([]);

    (async () => {
      const [dashboardResult, badgeResult, connectionsResult] = await Promise.all([
        loadOwnerDashboard(gateway)(profileId),
        loadProfileBadge(gateway)(profileId),
        loadConnections(gateway)(profileId),
      ]);

      if (!active) return;

      if (!dashboardResult.ok) {
        setError(dashboardResult.error === "PROFILE_NOT_FOUND" ? "Profil introuvable." : "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      setDashboard(dashboardResult.value);
      setBadge(badgeResult.ok ? badgeResult.value : null);
      setConnections(connectionsResult.ok ? connectionsResult.value ?? [] : []);
      setConnectionsError(
        connectionsResult.ok
          ? ""
          : connectionsResult.error === "PROFILE_NOT_FOUND"
            ? "Profil introuvable."
            : "Impossible de charger les connexions pour le moment.",
      );
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [gateway, profileId]);

  return { loading, error, connectionsError, dashboard, badge, connections };
}
