"use client";

import { useEffect, useMemo, useState } from "react";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { loadConnections } from "@/app/core-logic/tap-profile/usecases/loadConnections";
import type { ConnectionSummary } from "@/app/core-logic/tap-profile/types/connection";

export function useConnectionsListVM(profileId: string) {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [connections, setConnections] = useState<ConnectionSummary[]>([]);

	useEffect(() => {
		let active = true;

		setLoading(true);
		setError("");
		setConnections([]);

		(async () => {
			const result = await loadConnections(gateway)(profileId);

			if (!active) return;

			if (!result.ok) {
				setError(result.error === "PROFILE_NOT_FOUND" ? "Profil introuvable." : "Une erreur est survenue.");
				setLoading(false);
				return;
			}

			setConnections(result.value ?? []);
			setLoading(false);
		})();

		return () => {
			active = false;
		};
	}, [gateway, profileId]);

	return { loading, error, connections };
}
