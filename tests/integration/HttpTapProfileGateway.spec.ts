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
					metrics: {
						viewCount: 15,
						scanCount: 12,
						leadCount: 3,
						connectionCount: 9,
						conversionRate: 0.75,
					},
					recentLeads: [
						{
							leadId: "lead-1",
							firstName: "Nina",
							email: "nina@example.com",
							message: "Lets talk soon",
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
				metrics: {
					viewCount: 15,
					scanCount: 12,
					leadCount: 3,
					connectionCount: 9,
					conversionRate: 0.75,
				},
				recentLeads: [
					{
						leadId: "lead-1",
						firstName: "Nina",
						email: "nina@example.com",
						message: "Lets talk soon",
						createdAt: "2026-03-21T10:00:00Z",
					},
				],
			},
		});
	});

	it("loads the profile connections", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(
				JSON.stringify([
					{
						profileId: "profile-1",
						displayName: "Alex Martin",
						headline: "Backend developer",
						role: "EXHIBITOR",
						createdAt: "2026-03-21T09:00:00Z",
					},
					{
						profileId: "profile-2",
						displayName: "Nina Rossi",
						headline: "Product designer",
						role: "VISITOR",
						createdAt: "2026-03-21T10:00:00Z",
					},
				]),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			),
		);

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.getConnections("profile-1");

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/profiles/profile-1/connections"),
			expect.objectContaining({ method: "GET" }),
		);
		expect(result).toEqual({
			ok: true,
			value: [
				{
					profileId: "profile-1",
					displayName: "Alex Martin",
					headline: "Backend developer",
					role: "EXHIBITOR",
					createdAt: "2026-03-21T09:00:00Z",
				},
				{
					profileId: "profile-2",
					displayName: "Nina Rossi",
					headline: "Product designer",
					role: "VISITOR",
					createdAt: "2026-03-21T10:00:00Z",
				},
			],
		});
	});

	it("requests a magic link email for a profile", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(new Response(null, { status: 204 }));

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.requestMagicLink({
			profileId: "profile-1",
			email: "lea@example.com",
		});

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/profiles/profile-1/magic-link"),
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({
					email: "lea@example.com",
				}),
			}),
		);
		expect(result).toEqual({
			ok: true,
			value: undefined,
		});
	});

	it("creates a profile with the backend payload contract", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(JSON.stringify({ profileId: "profile-1" }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			}),
		);

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.createProfile({
			slug: "lea-martin",
			displayName: "Lea Martin",
			email: "lea@example.com",
			headline: "Participant",
			bio: "",
			role: "VISITOR",
		});

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/profiles"),
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({
					slug: "lea-martin",
					displayName: "Lea Martin",
					email: "lea@example.com",
					headline: "Participant",
					bio: "",
					role: "VISITOR",
				}),
			}),
		);
		expect(result).toEqual({
			ok: true,
			value: {
				profileId: "profile-1",
			},
		});
	});

	it("hydrates a local identity from a magic link token", async () => {
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(
				JSON.stringify({
					profile: {
						profileId: "profile-1",
						slug: "lea-martin",
						displayName: "Lea Martin",
						email: "lea@example.com",
						role: "VISITOR",
						status: "PUBLISHED",
					},
					contacts: [
						{
							profileId: "profile-2",
							displayName: "Nina Rossi",
							headline: "Product designer",
							role: "EXHIBITOR",
							createdAt: "2026-03-21T10:00:00Z",
						},
					],
				}),
				{ status: 200, headers: { "Content-Type": "application/json" } },
			),
		);

		const gateway = new HttpTapProfileGateway();
		const result = await gateway.consumeMagicLink("token-1");

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/api/magic-link/token-1"),
			expect.objectContaining({ method: "GET" }),
		);
		expect(result).toEqual({
			ok: true,
			value: {
				profile: {
					profileId: "profile-1",
					slug: "lea-martin",
					displayName: "Lea Martin",
					email: "lea@example.com",
					role: "VISITOR",
					status: "PUBLISHED",
				},
				contacts: [
					{
						profileId: "profile-2",
						displayName: "Nina Rossi",
						headline: "Product designer",
						role: "EXHIBITOR",
						createdAt: "2026-03-21T10:00:00Z",
					},
				],
			},
		});
	});
});
