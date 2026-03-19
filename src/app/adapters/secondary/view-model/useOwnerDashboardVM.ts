"use client";

import { useEffect, useMemo, useState } from "react";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { loadOwnerDashboard } from "@/app/core-logic/tap-profile/usecases/loadOwnerDashboard";
import type { OwnerDashboard } from "@/app/core-logic/tap-profile/types/stats";

export function useOwnerDashboardVM(profileId: string) {
  const gateway = useMemo(() => new HttpTapProfileGateway(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState<OwnerDashboard | null>(null);

  useEffect(() => {
    (async () => {
      const result = await loadOwnerDashboard(gateway)(profileId);

      if (!result.ok) {
        setError(result.error === "PROFILE_NOT_FOUND" ? "Profil introuvable." : "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      setDashboard(result.value);
      setLoading(false);
    })();
  }, [gateway, profileId]);

  return { loading, error, dashboard };
}
