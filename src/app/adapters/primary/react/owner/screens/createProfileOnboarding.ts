import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ProfileRole } from "@/app/core-logic/tap-profile/types/profile";

export type ActivationFields = {
	firstName: string;
	lastName: string;
	email: string;
	organization: string;
	role: ProfileRole;
};

export type ActivationFieldErrors = Partial<Record<keyof ActivationFields, string>>;

export type ActivationContext = {
	brandName: string;
	eventName: string;
	role: ProfileRole;
	roleLocked: boolean;
	organizationRequired: boolean;
	organizationLabel: string;
	organizationPlaceholder: string;
};

export type ActivationIntroStep = {
	title: string;
	subtitle?: string;
	ctaLabel: string;
	visual: "none" | "connect" | "contact";
};

export function getActivationIntroSteps(eventName: string): ActivationIntroStep[] {
	return [
		{
			title: `Bienvenue a ${eventName}`,
			ctaLabel: "Continuer",
			visual: "none",
		},
		{
			title: "Rencontrez. Scannez.",
			subtitle: "Un geste simple, l'echange commence",
			ctaLabel: "Continuer",
			visual: "connect",
		},
		{
			title: "Gardez le contact",
			subtitle: "Meme apres l'evenement",
			ctaLabel: "Continuer",
			visual: "contact",
		},
	];
}

function readTextParam(searchParams: ReadonlyURLSearchParams, keys: string[]) {
	for (const key of keys) {
		const value = searchParams.get(key)?.trim();
		if (value) return value;
	}

	return "";
}

function readBooleanParam(searchParams: ReadonlyURLSearchParams, keys: string[]) {
	for (const key of keys) {
		const value = searchParams.get(key)?.trim().toLowerCase();
		if (!value) continue;
		return value === "1" || value === "true" || value === "yes";
	}

	return false;
}

function readRoleParam(searchParams: ReadonlyURLSearchParams): ProfileRole | null {
	const rawRole = readTextParam(searchParams, ["role", "badgeRole", "attendeeRole"]).toLowerCase();
	if (rawRole === "exhibitor" || rawRole === "staff") return "EXHIBITOR";
	if (rawRole === "visitor" || rawRole === "attendee") return "VISITOR";
	return null;
}

export function getActivationContext(searchParams: ReadonlyURLSearchParams): ActivationContext {
	const contextRole = readRoleParam(searchParams);
	const role = contextRole ?? "VISITOR";
	const roleLocked = contextRole !== null || readBooleanParam(searchParams, ["lockRole", "roleLocked"]);
	const organizationRequired =
		role === "EXHIBITOR" || readBooleanParam(searchParams, ["orgRequired", "organizationRequired"]);
	const eventName = readTextParam(searchParams, ["eventName", "event", "eventTitle"]) || "votre evenement";
	const brandName = readTextParam(searchParams, ["brandName", "brand"]) || "TapProfile";
	const organizationLabel = readTextParam(searchParams, ["organizationLabel"]) || "Organisation";
	const organizationPlaceholder =
		readTextParam(searchParams, ["organizationPlaceholder"]) ||
		(organizationRequired ? "Votre organisation" : "Organisation (optionnel)");

	return {
		brandName,
		eventName,
		role,
		roleLocked,
		organizationRequired,
		organizationLabel,
		organizationPlaceholder,
	};
}

function isEmailValid(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateActivationFields(
	fields: ActivationFields,
	context: Pick<ActivationContext, "organizationRequired">,
): ActivationFieldErrors {
	const errors: ActivationFieldErrors = {};

	if (!fields.firstName.trim()) {
		errors.firstName = "Indiquez votre prenom.";
	}

	if (!fields.lastName.trim()) {
		errors.lastName = "Indiquez votre nom.";
	}

	if (!isEmailValid(fields.email)) {
		errors.email = "Indiquez un email valide.";
	}

	if (context.organizationRequired && !fields.organization.trim()) {
		errors.organization = "Indiquez votre organisation.";
	}

	return errors;
}

export function isActivationFieldsValid(
	fields: ActivationFields,
	context: Pick<ActivationContext, "organizationRequired">,
) {
	return Object.keys(validateActivationFields(fields, context)).length === 0;
}
