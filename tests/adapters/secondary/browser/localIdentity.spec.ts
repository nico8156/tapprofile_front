import {
	LOCAL_IDENTITY_KEY,
	clearLocalIdentity,
	readLocalIdentity,
	storeLocalIdentity,
} from "@/app/adapters/secondary/browser/localIdentity";
import { beforeEach, describe, expect, it } from "vitest";

describe("localIdentity", () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	it("stores and reads the local identity", () => {
		storeLocalIdentity({
			profileId: "profile-1",
			slug: "alex-martin",
			role: "EXHIBITOR",
			displayName: "Alex Martin",
			email: "alex@example.com",
			status: "PUBLISHED",
		});

		expect(readLocalIdentity()).toEqual({
			profileId: "profile-1",
			slug: "alex-martin",
			role: "EXHIBITOR",
			displayName: "Alex Martin",
			email: "alex@example.com",
			status: "PUBLISHED",
		});
	});

	it("returns null for invalid stored values", () => {
		window.localStorage.setItem(LOCAL_IDENTITY_KEY, JSON.stringify({ profileId: "profile-1" }));

		expect(readLocalIdentity()).toBeNull();
	});

	it("clears the local identity", () => {
		storeLocalIdentity({
			profileId: "profile-1",
			slug: "alex-martin",
			role: "VISITOR",
		});

		clearLocalIdentity();

		expect(readLocalIdentity()).toBeNull();
	});
});
