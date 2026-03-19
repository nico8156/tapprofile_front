"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { loadPublicProfile } from "@/app/core-logic/tap-profile/usecases/loadPublicProfile";
import { captureLead } from "@/app/core-logic/tap-profile/usecases/captureLead";
import { registerView } from "@/app/core-logic/tap-profile/usecases/registerView";

export function usePublicProfileVM(slug: string) {
  const gateway = useMemo(() => new HttpTapProfileGateway(), []);
  const didTrackRef = useRef(false);

  const [state, setState] = useState({
    loading: true,
    error: "",
    profile: null as null | {
      profileId: string;
      slug: string;
      displayName: string;
      headline: string;
      bio: string;
      publishedAt: string;
    },
    leadSuccess: false,
    leadError: "",
  });

  useEffect(() => {
    let active = true;

    (async () => {
      const result = await loadPublicProfile(gateway)(slug);
      if (!active) return;

      if (!result.ok) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            result.error === "PROFILE_NOT_FOUND" || result.error === "PROFILE_NOT_PUBLISHED"
              ? "Profil introuvable."
              : "Une erreur est survenue.",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        profile: result.value,
        error: "",
      }));

      if (!didTrackRef.current) {
        didTrackRef.current = true;
        void registerView(gateway)(slug);
      }
    })();

    return () => {
      active = false;
    };
  }, [gateway, slug]);

  const submitLead = async (input: { firstName: string; email: string; message: string }) => {
    const result = await captureLead(gateway)({ slug, ...input });

    if (!result.ok) {
      let leadError = "Une erreur est survenue.";

      if (result.error === "INVALID_FIRST_NAME") leadError = "Le prénom est requis.";
      if (result.error === "INVALID_EMAIL") leadError = "L'email est invalide.";
      if (result.error === "PROFILE_NOT_FOUND" || result.error === "PROFILE_NOT_PUBLISHED") {
        leadError = "Profil introuvable.";
      }

      setState((prev) => ({
        ...prev,
        leadSuccess: false,
        leadError,
      }));
      return result;
    }

    setState((prev) => ({
      ...prev,
      leadSuccess: true,
      leadError: "",
    }));

    return result;
  };

  return {
    ...state,
    submitLead,
  };
}
