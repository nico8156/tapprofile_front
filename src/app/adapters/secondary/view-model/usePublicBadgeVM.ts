"use client";

import { useEffect, useMemo, useState } from "react";
import { readLocalIdentity, type LocalIdentity } from "@/app/adapters/secondary/browser/localIdentity";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { createConnection } from "@/app/core-logic/tap-profile/usecases/createConnection";
import { loadPublicBadge } from "@/app/core-logic/tap-profile/usecases/loadPublicBadge";

export function usePublicBadgeVM(badgeToken: string) {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [pageError, setPageError] = useState("");
	const [actionError, setActionError] = useState("");
	const [connectionAdded, setConnectionAdded] = useState(false);
	const [identity, setIdentity] = useState<LocalIdentity | null>(null);
	const [badge, setBadge] = useState<null | {
		profileId: string;
		slug: string;
		displayName: string;
		headline: string;
		bio: string;
		role: "EXHIBITOR" | "VISITOR";
	}>(null);

	useEffect(() => {
		let active = true;

		setIdentity(readLocalIdentity());

		(async () => {
			const result = await loadPublicBadge(gateway)(badgeToken);
			if (!active) return;

			if (!result.ok) {
				setPageError(result.error === "BADGE_NOT_FOUND" ? "Badge introuvable." : "Une erreur est survenue.");
				setLoading(false);
				return;
			}

			setBadge(result.value);
			setPageError("");
			setLoading(false);
		})();

		return () => {
			active = false;
		};
	}, [badgeToken, gateway]);

	const connect = async () => {
		if (!identity || submitting || connectionAdded) return;

		setSubmitting(true);
		setActionError("");

		const result = await createConnection(gateway)({
			scannerProfileId: identity.profileId,
			badgeToken,
		});

		if (!result.ok) {
			setActionError(
				result.error === "BADGE_NOT_FOUND" || result.error === "PROFILE_NOT_FOUND"
					? "Connexion impossible."
					: "Une erreur est survenue.",
			);
			setSubmitting(false);
			return result;
		}

		setActionError("");
		setConnectionAdded(true);
		setSubmitting(false);
		return result;
	};

	return {
		loading,
		submitting,
		pageError,
		actionError,
		connectionAdded,
		badge,
		identity,
		connect,
	};
}
