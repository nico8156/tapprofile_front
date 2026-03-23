import { captureLead } from "@/app/core-logic/tap-profile/usecases/captureLead";
import { ok } from "@/app/lib/result";
import { describe, expect, it, vi } from "vitest";

describe("captureLead", () => {
	it("rejects blank name", async () => {
		const gateway = {
			captureLead: vi.fn(),
		} as any;

		const result = await captureLead(gateway)({
			slug: "john-doe",
			firstName: "   ",
			email: "john@mail.com",
			message: "",
		});

		expect(result).toEqual({ ok: false, error: "INVALID_FIRST_NAME" });
		expect(gateway.captureLead).not.toHaveBeenCalled();
	});

	it("rejects invalid email", async () => {
		const gateway = {
			captureLead: vi.fn(),
		} as any;

		const result = await captureLead(gateway)({
			slug: "john-doe",
			firstName: "John",
			email: "bad-email",
			message: "",
		});

		expect(result).toEqual({ ok: false, error: "INVALID_EMAIL" });
		expect(gateway.captureLead).not.toHaveBeenCalled();
	});

	it("normalizes and delegates valid input", async () => {
		const gateway = {
			captureLead: vi.fn().mockResolvedValue(ok({ leadId: "lead-1" })),
		} as any;

		const result = await captureLead(gateway)({
			slug: "john-doe",
			firstName: " John ",
			email: "JOHN@MAIL.COM ",
			message: " Hello ",
		});

		expect(gateway.captureLead).toHaveBeenCalledWith({
			slug: "john-doe",
			firstName: "John",
			email: "john@mail.com",
			message: "Hello",
		});
		expect(result).toEqual({ ok: true, value: { leadId: "lead-1" } });
	});
});
