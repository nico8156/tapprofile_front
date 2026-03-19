export type OwnerDashboard = {
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
