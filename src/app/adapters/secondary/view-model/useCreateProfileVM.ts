"use client";

import { useMemo, useState } from "react";
import { storeLocalIdentity } from "@/app/adapters/secondary/browser/localIdentity";
import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { createProfile, normalizeProfileSlug } from "@/app/core-logic/tap-profile/usecases/createProfile";
import { loadProfileBadge } from "@/app/core-logic/tap-profile/usecases/loadProfileBadge";
import type { ProfileRole } from "@/app/core-logic/tap-profile/types/profile";
import { publishProfile } from "@/app/core-logic/tap-profile/usecases/publishProfile";

export type CreateProfileSubmission = {
	firstName: string;
	lastName: string;
	email: string;
	organization: string;
	role: ProfileRole;
};

export function useCreateProfileVM() {
	const gateway = useMemo(() => new HttpTapProfileGateway(), []);

	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const submit = async (input: CreateProfileSubmission, returnTo?: string | null) => {
		if (submitting) return;

		const firstName = input.firstName.trim();
		const lastName = input.lastName.trim();
		const displayName = `${firstName} ${lastName}`.trim();
		const email = input.email.trim().toLowerCase();
		const organization = input.organization.trim();
		const role = input.role;
		const headline = organization || (role === "EXHIBITOR" ? "Exposant" : "Participant");
		const slug = normalizeProfileSlug(displayName);

		setSubmitting(true);
		setError("");

		const createResult = await createProfile(gateway)({
			slug,
			displayName,
			email,
			headline,
			bio: "",
			role,
		});

		if (!createResult.ok) {
			setError("Impossible de creer votre badge. Reessayez.");
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
			slug,
			role,
		});

		void gateway.requestMagicLink({
			profileId: createResult.value.profileId,
			email,
		});

		setError("");
		setSubmitting(false);

		return {
			ok: true as const,
			value: {
				profileId: createResult.value.profileId,
				publicBadgeUrl: badgeResult.value.publicBadgeUrl,
				redirectTo: returnTo || `/dashboard/${createResult.value.profileId}#badge`,
			},
		};
	};

	return {
		submit,
		error,
		submitting,
	};
}
