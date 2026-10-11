import {
	getDefaultHue,
	getDefaultTheme,
	getSystemTheme,
	resolveTheme,
} from "@utils/setting-utils";
import { describe, expect, it } from "vitest";
import { siteConfig } from "../src/config/siteConfig";

/**
 * 这些函数在非浏览器环境（vitest 的 node environment）下有显式守卫，
 * 因此可以在不引入 jsdom 的前提下验证「降级路径」的确定性行为。
 * 带 localStorage / matchMedia 的分支属于浏览器运行时，不在本批次覆盖范围。
 */
describe("getDefaultTheme", () => {
	it("返回 siteConfig.themeColor.defaultMode", () => {
		expect(getDefaultTheme()).toBe(siteConfig.themeColor.defaultMode);
		expect(getDefaultTheme()).toBe("system");
	});
});

describe("resolveTheme", () => {
	it("非 system 模式原样返回", () => {
		expect(resolveTheme("dark")).toBe("dark");
		expect(resolveTheme("light")).toBe("light");
	});

	it("system 模式在 node 环境降级为 light", () => {
		// node 下没有 window，getSystemTheme 返回 LIGHT_MODE
		expect(resolveTheme("system")).toBe("light");
	});

	it("返回值始终是 light 或 dark，不含 system", () => {
		for (const mode of ["light", "dark", "system"] as const) {
			expect(["light", "dark"]).toContain(resolveTheme(mode));
		}
	});
});

describe("getSystemTheme", () => {
	it("无 window 时返回 light", () => {
		expect(getSystemTheme()).toBe("light");
	});
});

describe("getDefaultHue", () => {
	it("无 document 时回退为 250 而不是 NaN", () => {
		const hue = getDefaultHue();
		expect(hue).toBe(250);
		expect(Number.isNaN(hue)).toBe(false);
	});
});
