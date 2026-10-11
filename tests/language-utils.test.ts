import { getLanguageDisplayName } from "@utils/language-utils";
import { describe, expect, it } from "vitest";

describe("getLanguageDisplayName", () => {
	it("返回配置格式语言代码的本地化名称", () => {
		expect(getLanguageDisplayName("zh_CN")).toBe("简体中文");
		expect(getLanguageDisplayName("zh_TW")).toBe("繁體中文");
		expect(getLanguageDisplayName("ja")).toBe("日本語");
		expect(getLanguageDisplayName("ko")).toBe("한국어");
	});

	it("返回翻译服务格式语言代码的本地化名称", () => {
		// 同一个显示名同时支持配置格式与翻译服务格式两种键
		expect(getLanguageDisplayName("chinese_simplified")).toBe("简体中文");
		expect(getLanguageDisplayName("chinese_traditional")).toBe("繁體中文");
		expect(getLanguageDisplayName("english")).toBe("English");
	});

	it("配置格式与翻译服务格式映射到同一显示名", () => {
		const pairs: [string, string][] = [
			["zh_CN", "chinese_simplified"],
			["zh_TW", "chinese_traditional"],
			["en", "english"],
			["ja", "japanese"],
			["ko", "korean"],
			["es", "spanish"],
			["fr", "french"],
			["de", "german"],
			["ru", "russian"],
			["ar", "arabic"],
		];
		for (const [configCode, serviceCode] of pairs) {
			expect(getLanguageDisplayName(configCode)).toBe(
				getLanguageDisplayName(serviceCode),
			);
		}
	});

	it("未知语言代码原样返回，不抛错也不返回 undefined", () => {
		expect(getLanguageDisplayName("xx_XX")).toBe("xx_XX");
		expect(getLanguageDisplayName("")).toBe("");
	});

	it("大小写敏感：'EN' 不在映射表中，原样返回", () => {
		// 锁定当前行为（调用方需保证传入小写代码），避免未来静默改变语义
		expect(getLanguageDisplayName("EN")).toBe("EN");
	});
});
