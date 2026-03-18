import { generateProfileUrl } from "@/app/core-logic/tap-profile/usecases/generateProfileUrl";
import { describe, expect, it } from "vitest";

describe("generateProfileUrl", () => {
	it("builds public url from origin and slug", () => {
		expect(generateProfileUrl("https://tapprofile.app", "john-doe"))
			.toBe("https://tapprofile.app/p/john-doe");
	});

	it("removes ending slash from origin", () => {
		expect(generateProfileUrl("https://tapprofile.app/", "john-doe"))
			.toBe("https://tapprofile.app/p/john-doe");
	});
});
