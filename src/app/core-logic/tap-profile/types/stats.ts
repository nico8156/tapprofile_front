export type OwnerDashboard = {
  profile: {
    profileId: string;
    slug: string;
    displayName: string;
    status: "DRAFT" | "PUBLISHED";
    role: "EXHIBITOR" | "VISITOR";
  };
  badge: {
    badgeToken: string;
    publicBadgeUrl: string;
  };
  metrics: {
    scanCount: number;
    connectionCount: number;
  };
  recentConnections: Array<{
    connectionId: string;
    connectedProfile: {
      profileId: string;
      slug: string;
      displayName: string;
      headline: string;
      role: "EXHIBITOR" | "VISITOR";
    };
    createdAt: string;
  }>;
};
