export type LeadInput = {
  slug: string;
  firstName: string;
  email: string;
  message: string;
};

export type LeadCaptureSuccess = {
  leadId: string;
};

export type LeadCaptureError =
  | "INVALID_FIRST_NAME"
  | "INVALID_EMAIL"
  | "PROFILE_NOT_FOUND"
  | "PROFILE_NOT_PUBLISHED"
  | "UNKNOWN_ERROR";
