export type OwnerDashboard = {
  profile: {
    profileId: string;
    slug: string;
    displayName: string;
    status: "DRAFT" | "PUBLISHED";
    role: "EXHIBITOR" | "VISITOR";
  };
  metrics: {
    viewCount?: number;
    scanCount?: number;
    leadCount?: number;
    connectionCount?: number;
    conversionRate?: number;
  };
  recentLeads?: Array<{
    leadId?: string;
    firstName?: string;
    email?: string;
    message?: string;
    createdAt?: string;
  }>;
};
