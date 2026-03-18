"use client";

import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { captureLead } from "@/app/core-logic/tap-profile/usecases/captureLead";
import { loadPublicProfile } from "@/app/core-logic/tap-profile/usecases/loadPublicProfile";
import { registerView } from "@/app/core-logic/tap-profile/usecases/registerView";
import { useEffect, useMemo, useState } from "react";

export function usePublicProfileVM(slug: string) {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);
	const [state, setState] = useState({
		loading: true,
		error: "",
		profile: null as null | {
			id: string;
			slug: string;
			displayName: string;
			headline: string;
			bio: string;
			ctaLabel: string;
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
				setState((prev) => ({ ...prev, loading: false, error: result.error }));
				return;
			}

			setState((prev) => ({
				...prev,
				loading: false,
				profile: result.value,
				error: "",
			}));
		})();

		return () => {
			active = false;
		};
	}, [gateway, slug]);

	const trackView = async () => {
		await registerView(gateway)(slug);
	};

	const submitLead = async (input: { name: string; email: string }) => {
		const result = await captureLead(gateway)({ slug, ...input });

		if (!result.ok) {
			setState((prev) => ({
				...prev,
				leadSuccess: false,
				leadError: result.error,
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
		trackView,
		submitLead,
	};
}
