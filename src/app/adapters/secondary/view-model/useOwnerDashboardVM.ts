"use client";

import { useEffect, useMemo, useState } from "react";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
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

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");
    setDashboard(null);
    setBadge(null);

    (async () => {
      const result = await loadOwnerDashboard(gateway)(profileId);

      if (!active) return;

      if (!result.ok) {
        setError(result.error === "PROFILE_NOT_FOUND" ? "Profil introuvable." : "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      setDashboard(result.value);

      const badgeResult = await loadProfileBadge(gateway)(profileId);

      if (!active) return;

      setBadge(badgeResult.ok ? badgeResult.value : null);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [gateway, profileId]);

  return { loading, error, dashboard, badge };
}
