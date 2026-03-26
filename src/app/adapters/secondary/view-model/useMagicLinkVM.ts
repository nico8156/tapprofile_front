"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { storeLocalIdentity } from "@/app/adapters/secondary/browser/localIdentity";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";

export function useMagicLinkVM(token: string) {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		(async () => {
			const result = await gateway.consumeMagicLink(token);

			if (!active) return;

			if (!result.ok) {
				setError(
					result.error === "MAGIC_LINK_INVALID_OR_EXPIRED"
						? "Lien invalide ou expiré"
						: "Une erreur est survenue",
				);
				setLoading(false);
				return;
			}

			storeLocalIdentity(result.value.profile);
			router.replace(`/dashboard/${result.value.profile.profileId}`);
		})();

		return () => {
			active = false;
		};
	}, [gateway, router, token]);

	return {
		loading,
		error,
	};
}
