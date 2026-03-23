"use client";

import { useMemo, useState } from "react";
import { storeLocalIdentity } from "@/app/adapters/secondary/browser/localIdentity";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { createProfile, normalizeProfileSlug } from "@/app/core-logic/tap-profile/usecases/createProfile";
import { loadProfileBadge } from "@/app/core-logic/tap-profile/usecases/loadProfileBadge";
import { publishProfile } from "@/app/core-logic/tap-profile/usecases/publishProfile";

export function useCreateProfileVM() {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);

	const [slug, setSlug] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [headline, setHeadline] = useState("");
	const [role, setRole] = useState<"EXHIBITOR" | "VISITOR">("VISITOR");

	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const submit = async (returnTo?: string | null) => {
		setSubmitting(true);

		const createResult = await createProfile(gateway)({
			slug,
			displayName,
			headline,
			role,
		});

		if (!createResult.ok) {
			setError("Erreur creation badge");
			setSubmitting(false);
			return createResult;
		}

		const publishResult = await publishProfile(gateway)(createResult.value.profileId);

		if (!publishResult.ok) {
			setError("Erreur publication badge");
			setSubmitting(false);
			return publishResult;
		}

		const badgeResult = await loadProfileBadge(gateway)(createResult.value.profileId);

		if (!badgeResult.ok) {
			setError("Erreur chargement badge");
			setSubmitting(false);
			return badgeResult;
		}

		storeLocalIdentity({
			profileId: createResult.value.profileId,
			slug: normalizeProfileSlug(slug || displayName),
			role,
		});

		setError("");
		setSubmitting(false);

		return {
			ok: true as const,
			value: {
				profileId: createResult.value.profileId,
				publicBadgeUrl: badgeResult.value.publicBadgeUrl,
				redirectTo: returnTo || `/dashboard/${createResult.value.profileId}`,
			},
		};
	};

	return {
		slug,
		displayName,
		email,
		headline,
		role,
		setSlug,
		setDisplayName,
		setEmail,
		setHeadline,
		setRole,
		submit,
		error,
		submitting,
	};
}
