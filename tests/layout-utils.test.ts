import {
	getBackgroundImages,
	getBannerOffset,
	getDefaultBackground,
	isBannerSrcObject,
	isHomePage,
} from "@utils/layout-utils";
import { describe, expect, it } from "vitest";
import { backgroundWallpaper } from "../src/config/backgroundWallpaper";

describe("getBannerOffset", () => {
	it("映射已支持的三个位置", () => {
		expect(getBannerOffset("top")).toBe("100vh");
		expect(getBannerOffset("center")).toBe("50vh");
		expect(getBannerOffset("bottom")).toBe("0");
	});

	it("缺省参数回退到 center", () => {
		expect(getBannerOffset()).toBe("50vh");
	});

	it("未知位置回退到 50vh 而不是 undefined", () => {
		expect(getBannerOffset("zzz")).toBe("50vh");
	});

	it("不存在的对象原型属性不会泄漏进来", () => {
		// 用 Record 查表 + 回退，'constructor' 不该命中原型链
		expect(getBannerOffset("constructor")).not.toBe("constructor");
	});
});

describe("isBannerSrcObject 类型守卫", () => {
	it("识别含 desktop/mobile 键的对象", () => {
		expect(isBannerSrcObject({ desktop: "a.jpg" })).toBe(true);
		expect(isBannerSrcObject({ mobile: "m.jpg" })).toBe(true);
		expect(isBannerSrcObject({ desktop: ["a"], mobile: ["b"] })).toBe(true);
	});

	it("拒绝字符串与数组", () => {
		expect(isBannerSrcObject("a.jpg")).toBe(false);
		expect(isBannerSrcObject(["a.jpg"])).toBe(false);
	});

	it("拒绝不含 desktop/mobile 键的对象", () => {
		expect(isBannerSrcObject({})).toBe(false);
		expect(isBannerSrcObject({ other: "x" })).toBe(false);
	});
});

describe("getBackgroundImages", () => {
	it("读取真实配置，桌面/移动各 4 张且判定为多图", () => {
		const result = getBackgroundImages();
		const cfg = backgroundWallpaper.src as {
			desktop: string[];
			mobile: string[];
		};

		expect(result.desktop).toEqual(cfg.desktop);
		expect(result.mobile).toEqual(cfg.mobile);
		expect(result.desktop).toHaveLength(4);
		expect(result.mobile).toHaveLength(4);
		expect(result.isMultiple).toBe(true);
	});

	it("desktop 与 mobile 是独立数组，互不共享引用", () => {
		const result = getBackgroundImages();
		expect(result.desktop).not.toBe(result.mobile);
		expect(result.desktop).not.toEqual(result.mobile);
	});
});

describe("getDefaultBackground", () => {
	it("返回桌面端第一张图作为默认背景", () => {
		const result = getDefaultBackground();
		expect(result).toBe(getBackgroundImages().desktop[0]);
		expect(result.endsWith(".avif")).toBe(true);
	});

	it("返回值非空，可安全用于 SEO meta", () => {
		const result = getDefaultBackground();
		expect(typeof result).toBe("string");
		expect(result.length).toBeGreaterThan(0);
	});
});

describe("isHomePage", () => {
	it("根路径与空路径视为首页", () => {
		expect(isHomePage("/")).toBe(true);
		expect(isHomePage("")).toBe(true);
	});

	it("列表页或文章页不是首页", () => {
		expect(isHomePage("/posts/")).toBe(false);
		expect(isHomePage("/archive/")).toBe(false);
		expect(isHomePage("/posts/hello/")).toBe(false);
	});

	it("大小写敏感，'/POSTS/' 不被当成首页", () => {
		expect(isHomePage("/POSTS/")).toBe(false);
	});
});
