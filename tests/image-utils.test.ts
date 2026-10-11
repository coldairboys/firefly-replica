import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * 这些函数的结果完全由 siteConfig.imageOptimization 决定，
 * 因此用 mock 覆盖配置来覆盖各分支，而不是依赖仓库里的当前取值。
 */
const mockImageOptimization = {
	formats: "both" as "both" | "avif" | "webp",
	quality: 70,
	noReferrerDomains: ["*.example.com", "cdn.test.com"],
};

async function loadImageUtils() {
	vi.resetModules();
	vi.doMock("../src/config/siteConfig", () => ({
		siteConfig: { imageOptimization: mockImageOptimization },
	}));
	return await import("@utils/image-utils");
}

describe("getImageFormats", () => {
	beforeEach(() => {
		mockImageOptimization.formats = "both";
	});

	it("formats 为 both 时返回 avif + webp（顺序固定）", async () => {
		const { getImageFormats } = await loadImageUtils();
		expect(getImageFormats()).toEqual(["avif", "webp"]);
	});

	it("formats 为 avif 时只返回 avif", async () => {
		mockImageOptimization.formats = "avif";
		const { getImageFormats } = await loadImageUtils();
		expect(getImageFormats()).toEqual(["avif"]);
	});

	it("formats 为 webp 时只返回 webp", async () => {
		mockImageOptimization.formats = "webp";
		const { getImageFormats } = await loadImageUtils();
		expect(getImageFormats()).toEqual(["webp"]);
	});
});

describe("getImageQuality", () => {
	it("返回配置中的质量值", async () => {
		const { getImageQuality } = await loadImageUtils();
		expect(getImageQuality()).toBe(70);
	});
});

describe("getFallbackFormat", () => {
	it("formats 非 avif 时回退为 webp", async () => {
		mockImageOptimization.formats = "both";
		let utils = await loadImageUtils();
		expect(utils.getFallbackFormat()).toBe("webp");

		mockImageOptimization.formats = "webp";
		utils = await loadImageUtils();
		expect(utils.getFallbackFormat()).toBe("webp");
	});

	it("formats 为 avif 时回退为 avif", async () => {
		mockImageOptimization.formats = "avif";
		const { getFallbackFormat } = await loadImageUtils();
		expect(getFallbackFormat()).toBe("avif");
	});

	it("回退格式始终是 getImageFormats 中的成员", async () => {
		mockImageOptimization.formats = "avif";
		const utils = await loadImageUtils();
		expect(utils.getImageFormats()).toContain(utils.getFallbackFormat());
	});
});

describe("shouldAddNoReferrer", () => {
	it("匹配通配符域名", async () => {
		const { shouldAddNoReferrer } = await loadImageUtils();
		expect(shouldAddNoReferrer("https://a.example.com/x.jpg")).toBe(true);
		expect(shouldAddNoReferrer("https://deep.a.example.com/x.jpg")).toBe(true);
	});

	it("匹配完整域名", async () => {
		const { shouldAddNoReferrer } = await loadImageUtils();
		expect(shouldAddNoReferrer("https://cdn.test.com/x.jpg")).toBe(true);
	});

	it("未命中域名列表返回 false", async () => {
		const { shouldAddNoReferrer } = await loadImageUtils();
		expect(shouldAddNoReferrer("https://evil.com/x.jpg")).toBe(false);
	});

	it("通配符按整串锚定，不允许后缀伪造", async () => {
		const { shouldAddNoReferrer } = await loadImageUtils();
		// 若正则未锚定尾部，"xexample.com" / 后缀追加都会误命中
		expect(shouldAddNoReferrer("https://evil-example.com/x.jpg")).toBe(false);
		expect(shouldAddNoReferrer("https://a.example.com.evil.net/x.jpg")).toBe(
			false,
		);
	});

	it("非 http(s) 的 URL 直接返回 false", async () => {
		const { shouldAddNoReferrer } = await loadImageUtils();
		expect(shouldAddNoReferrer("/local/image.jpg")).toBe(false);
		expect(shouldAddNoReferrer("assets/image.jpg")).toBe(false);
		expect(shouldAddNoReferrer("")).toBe(false);
	});

	it("以 http 开头但无法解析成 URL 时返回 false，不抛错", async () => {
		const { shouldAddNoReferrer } = await loadImageUtils();
		expect(() => shouldAddNoReferrer("http://")).not.toThrow();
		expect(shouldAddNoReferrer("http://")).toBe(false);
	});

	it("域名列表为空时一律返回 false", async () => {
		const saved = mockImageOptimization.noReferrerDomains;
		mockImageOptimization.noReferrerDomains = [];
		const { shouldAddNoReferrer } = await loadImageUtils();
		expect(shouldAddNoReferrer("https://cdn.test.com/x.jpg")).toBe(false);
		mockImageOptimization.noReferrerDomains = saved;
	});
});
