import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		include: ["tests/**/*.spec.ts", "tests/**/*.spec.tsx"],
		coverage: {
			provider: "v8",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
