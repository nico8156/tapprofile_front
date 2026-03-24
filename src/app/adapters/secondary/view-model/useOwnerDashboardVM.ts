"use client";

import { useEffect, useMemo, useState } from "react";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { loadConnections } from "@/app/core-logic/tap-profile/usecases/loadConnections";
import { loadOwnerDashboard } from "@/app/core-logic/tap-profile/usecases/loadOwnerDashboard";
import { loadProfileBadge } from "@/app/core-logic/tap-profile/usecases/loadProfileBadge";
import type { ProfileBadge } from "@/app/core-logic/tap-profile/types/profile";
import type { OwnerDashboard } from "@/app/core-logic/tap-profile/types/stats";

export function useOwnerDashboardVM(profileId: string) {
  const gateway = useMemo(() => new HttpTapProfileGateway(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState<OwnerDashboard | null>(null);
  const [badge, setBadge] = useState<ProfileBadge | null>(null);
  const [connections, setConnections] = useState<
    Array<{
      connectionId: string;
      connectedProfile: {
        profileId: string;
        slug: string;
        displayName: string;
        headline: string;
        role: "EXHIBITOR" | "VISITOR";
      };
      createdAt: string;
    }>
  >([]);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");
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

      if (!connectionsResult.ok) {
        const failure = connectionsResult.error;
        setError(failure === "PROFILE_NOT_FOUND" ? "Profil introuvable." : "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      setDashboard(dashboardResult.value);
      setConnections(connectionsResult.value.connections ?? []);
      setBadge(badgeResult.ok ? badgeResult.value : null);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [gateway, profileId]);

  return { loading, error, dashboard, badge, connections };
}
