export type LeadInput = {
	slug: string;
	name: string;
	email: string;
};

export type LeadCaptureSuccess = {
	leadId: string;
};

export type LeadCaptureError =
	| "INVALID_NAME"
	| "INVALID_EMAIL"
	| "PROFILE_NOT_FOUND"
	| "UNKNOWN_ERROR";
