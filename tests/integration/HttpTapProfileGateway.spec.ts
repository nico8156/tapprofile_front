import { HttpTapProfileGateway } from "@/app/adapters/secondary/gateways/HttpTapProfileGateway";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("HttpTapProfileGateway", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("loads a public badge", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(
				JSON.stringify({
					profileId: "profile-1",
					slug: "alex-martin",
					displayName: "Alex Martin",
					headline: "Backend developer",
					bio: "I build useful products.",
					role: "EXHIBITOR",
				}),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			),
		);

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.getPublicBadge("badge-1");

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/public/badges/badge-1"),
			expect.objectContaining({ method: "GET" }),
		);
		expect(result).toEqual({
			ok: true,
			value: {
				profileId: "profile-1",
				slug: "alex-martin",
				displayName: "Alex Martin",
				headline: "Backend developer",
				bio: "I build useful products.",
				role: "EXHIBITOR",
			},
		});
	});

	it("creates a connection", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(
				JSON.stringify({
					connectionId: "connection-1",
					scannerProfileId: "profile-1",
					scannedProfileId: "profile-2",
					createdAt: "2026-03-21T10:00:00Z",
				}),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			),
		);

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.createConnection({
			scannerProfileId: "profile-1",
			badgeToken: "badge-1",
		});

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/connections"),
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({
					scannerProfileId: "profile-1",
					badgeToken: "badge-1",
				}),
			}),
		);
		expect(result).toEqual({
			ok: true,
			value: {
				connectionId: "connection-1",
				scannerProfileId: "profile-1",
				scannedProfileId: "profile-2",
				createdAt: "2026-03-21T10:00:00Z",
			},
		});
	});

	it("loads the meetup dashboard shape", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(
				JSON.stringify({
					profile: {
						profileId: "profile-1",
						slug: "alex-martin",
						displayName: "Alex Martin",
						status: "PUBLISHED",
						role: "EXHIBITOR",
					},
					badge: {
						badgeToken: "badge-1",
						publicBadgeUrl: "https://tap.profile/b/badge-1",
					},
					metrics: {
						scanCount: 12,
						connectionCount: 9,
					},
					recentConnections: [
						{
							connectionId: "connection-1",
							connectedProfile: {
								profileId: "profile-2",
								slug: "nina-ross",
								displayName: "Nina Ross",
								headline: "Product designer",
								role: "VISITOR",
							},
							createdAt: "2026-03-21T10:00:00Z",
						},
					],
				}),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			),
		);

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.loadOwnerDashboard("profile-1");

		expect(result).toEqual({
			ok: true,
			value: {
				profile: {
					profileId: "profile-1",
					slug: "alex-martin",
					displayName: "Alex Martin",
					status: "PUBLISHED",
					role: "EXHIBITOR",
				},
				badge: {
					badgeToken: "badge-1",
					publicBadgeUrl: "https://tap.profile/b/badge-1",
				},
				metrics: {
					scanCount: 12,
					connectionCount: 9,
				},
				recentConnections: [
					{
						connectionId: "connection-1",
						connectedProfile: {
							profileId: "profile-2",
							slug: "nina-ross",
							displayName: "Nina Ross",
							headline: "Product designer",
							role: "VISITOR",
						},
						createdAt: "2026-03-21T10:00:00Z",
					},
				],
			},
		});
	});
});
