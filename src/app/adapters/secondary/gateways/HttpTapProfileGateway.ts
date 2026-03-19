import type { TapProfileGateway } from "@/app/core-logic/tap-profile/gateway/tapProfile.gateway";
import type { LeadInput } from "@/app/core-logic/tap-profile/types/lead";
import { env } from "@/app/lib/env";
import { err, ok } from "@/app/lib/result";
import { readApiErrors } from "@/app/lib/utils";

type PublicProfileHttpResponse = {
  profileId: string;
  slug: string;
  displayName: string;
  headline: string;
  bio: string;
  publishedAt: string;
};

type DashboardHttpResponse = {
  profile: {
    profileId: string;
    slug: string;
    displayName: string;
    status: "DRAFT" | "PUBLISHED";
  };
  metrics: {
    viewCount: number;
    leadCount: number;
    conversionRate: number;
  };
  recentLeads: Array<{
    leadId: string;
    firstName: string;
    email: string;
    message: string;
    createdAt: string;
  }>;
};

type CaptureLeadHttpResponse = {
  leadId: string;
};

export class HttpTapProfileGateway implements TapProfileGateway {
  async loadPublicProfile(slug: string) {
    try {
      const response = await fetch(`${env.apiBaseUrl}/api/public/profiles/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (response.status === 404) {
        const errors = await readApiErrors(response);
        const hasNotPublished = errors.some((e) => e.code === "profile.not_published");
        return err(hasNotPublished ? "PROFILE_NOT_PUBLISHED" as const : "PROFILE_NOT_FOUND" as const);
      }

      if (!response.ok) return err("UNKNOWN_ERROR" as const);

      const json = (await response.json()) as PublicProfileHttpResponse;

      return ok({
        profileId: json.profileId,
        slug: json.slug,
        displayName: json.displayName,
        headline: json.headline,
        bio: json.bio,
        publishedAt: json.publishedAt,
      });
    } catch {
      return err("UNKNOWN_ERROR" as const);
    }
  }

  async registerView(slug: string) {
    try {
      const response = await fetch(`${env.apiBaseUrl}/api/public/profiles/${slug}/views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        const errors = await readApiErrors(response);
        const hasNotPublished = errors.some((e) => e.code === "profile.not_published");
        return err(hasNotPublished ? "PROFILE_NOT_PUBLISHED" as const : "PROFILE_NOT_FOUND" as const);
      }

      if (!response.ok) return err("UNKNOWN_ERROR" as const);

      return ok(undefined);
    } catch {
      return err("UNKNOWN_ERROR" as const);
    }
  }

  async captureLead(input: LeadInput) {
    try {
      const response = await fetch(`${env.apiBaseUrl}/api/public/profiles/${input.slug}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: input.firstName,
          email: input.email,
          message: input.message,
        }),
      });

      if (response.status === 404) {
        const errors = await readApiErrors(response);
        const hasNotPublished = errors.some((e) => e.code === "profile.not_published");
        return err(hasNotPublished ? "PROFILE_NOT_PUBLISHED" as const : "PROFILE_NOT_FOUND" as const);
      }

      if (response.status === 400) {
        const errors = await readApiErrors(response);

        if (errors.some((e) => e.field === "firstName")) {
          return err("INVALID_FIRST_NAME" as const);
        }

        if (errors.some((e) => e.field === "email")) {
          return err("INVALID_EMAIL" as const);
        }

        return err("UNKNOWN_ERROR" as const);
      }

      if (!response.ok) return err("UNKNOWN_ERROR" as const);

      const json = (await response.json()) as CaptureLeadHttpResponse;
      return ok({ leadId: json.leadId });
    } catch {
      return err("UNKNOWN_ERROR" as const);
    }
  }

  async loadOwnerDashboard(profileId: string) {
    try {
      const response = await fetch(`${env.apiBaseUrl}/api/profiles/${profileId}/dashboard`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (response.status === 404) return err("PROFILE_NOT_FOUND" as const);
      if (!response.ok) return err("UNKNOWN_ERROR" as const);

      const json = (await response.json()) as DashboardHttpResponse;
      return ok(json);
    } catch {
      return err("UNKNOWN_ERROR" as const);
    }
  }
}
