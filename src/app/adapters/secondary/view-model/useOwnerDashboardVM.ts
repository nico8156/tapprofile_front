"use client";

import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { loadOwnerDashboard } from "@/app/core-logic/tap-profile/usecases/loadOwnerDashboard";
import { useEffect, useMemo, useState } from "react";

export function useOwnerDashboardVM() {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [items, setItems] = useState<
		Array<{
			profileId: string;
			slug: string;
			views: number;
			leads: number;
			conversionRate: number;
		}>
	>([]);

	useEffect(() => {
		(async () => {
			const result = await loadOwnerDashboard(gateway)();

			if (!result.ok) {
				setError(result.error);
				setLoading(false);
				return;
			}

			setItems(result.value);
			setLoading(false);
		})();
	}, [gateway]);

	return { loading, error, items };
}
