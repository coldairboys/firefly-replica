import {
	getCategoryUrl,
	getDir,
	getFileDirFromPath,
	getPostUrlBySlug,
	getSearchUrl,
	getTagUrl,
	pathsEqual,
	removeFileExtension,
	url,
} from "@utils/url-utils";
import { describe, expect, it } from "vitest";

describe("removeFileExtension", () => {
	it("移除 markdown 系列扩展名", () => {
		expect(removeFileExtension("posts/hello.md")).toBe("posts/hello");
		expect(removeFileExtension("posts/hello.mdx")).toBe("posts/hello");
		expect(removeFileExtension("posts/hello.markdown")).toBe("posts/hello");
	});

	it("扩展名大小写不敏感", () => {
		expect(removeFileExtension("a.MD")).toBe("a");
		expect(removeFileExtension("a.Mdx")).toBe("a");
	});

	it("只移除结尾的扩展名，不误伤中间的 .md", () => {
		expect(removeFileExtension("a.md/b")).toBe("a.md/b");
	});

	it("非 markdown 扩展名保持不变", () => {
		expect(removeFileExtension("a.txt")).toBe("a.txt");
		expect(removeFileExtension("a.mdown")).toBe("a.mdown");
	});
});

describe("pathsEqual", () => {
	it("忽略首尾斜杠差异", () => {
		expect(pathsEqual("/posts/a/", "posts/a")).toBe(true);
		expect(pathsEqual("posts/a", "/posts/a")).toBe(true);
	});

	it("忽略大小写", () => {
		expect(pathsEqual("/Posts/A", "/posts/a")).toBe(true);
	});

	it("不同路径返回 false", () => {
		expect(pathsEqual("/posts/a", "/posts/b")).toBe(false);
	});
});

describe("getDir", () => {
	it("返回末级目录并保留结尾斜杠", () => {
		expect(getDir("posts/2024/hello.md")).toBe("posts/2024/");
	});

	it("先剥离扩展名再取目录", () => {
		// 若扩展名未剥离，结果会是 "posts/hello.md/" 之类
		expect(getDir("posts/hello.md")).toBe("posts/");
	});

	it("无斜杠时回退为根路径", () => {
		expect(getDir("hello.md")).toBe("/");
	});

	it("空字符串回退为根路径", () => {
		expect(getDir("")).toBe("/");
	});
});

describe("getFileDirFromPath", () => {
	it("去掉 src/ 前缀与文件名", () => {
		expect(getFileDirFromPath("src/pages/posts/a.md")).toBe("pages/posts");
	});

	it("无 src/ 前缀时仍去掉文件名", () => {
		expect(getFileDirFromPath("pages/a.md")).toBe("pages");
	});
});

describe("url 拼接", () => {
	it("BASE_URL 为根路径时生成根相对 URL", () => {
		expect(url("/posts/")).toBe("/posts/");
	});

	it("合并重复斜杠，不产生双斜杠", () => {
		expect(url("//posts//a/")).toBe("/posts/a/");
	});
});

describe("getPostUrlBySlug", () => {
	it("生成文章 URL 并补尾斜杠", () => {
		expect(getPostUrlBySlug("hello")).toBe("/posts/hello/");
	});

	it("先剥离 markdown 扩展名", () => {
		expect(getPostUrlBySlug("2024/hello.md")).toBe("/posts/2024/hello/");
	});
});

describe("getTagUrl", () => {
	it("对标签做 URL 编码", () => {
		expect(getTagUrl("前端")).toBe(
			`/archive/?tag=${encodeURIComponent("前端")}`,
		);
	});

	it("去除标签首尾空白", () => {
		expect(getTagUrl("  vue  ")).toBe("/archive/?tag=vue");
	});

	it("空标签回退到归档页", () => {
		expect(getTagUrl("")).toBe("/archive/");
	});

	it("对含 & 的标签转义，避免破坏查询串", () => {
		expect(getTagUrl("a&b")).toBe("/archive/?tag=a%26b");
	});
});

describe("getCategoryUrl", () => {
	it("正常分类生成 category 查询参数", () => {
		expect(getCategoryUrl("Tech")).toBe("/archive/?category=Tech");
	});

	it("去除分类首尾空白", () => {
		expect(getCategoryUrl("  Tech  ")).toBe("/archive/?category=Tech");
	});

	it("null / 空串 / 纯空白均视为未分类", () => {
		expect(getCategoryUrl(null)).toBe("/archive/?uncategorized=true");
		expect(getCategoryUrl("")).toBe("/archive/?uncategorized=true");
		expect(getCategoryUrl("   ")).toBe("/archive/?uncategorized=true");
	});

	it("分类名等于 i18n 的 uncategorized 文案时也归入未分类", () => {
		// 该分支依赖 siteConfig.lang，实测 zh_CN 下 i18n 值为「未分类」
		expect(getCategoryUrl("未分类")).toBe("/archive/?uncategorized=true");
		expect(getCategoryUrl("未分类").toLowerCase()).toBe(
			"/archive/?uncategorized=true",
		);
	});
});

describe("getSearchUrl", () => {
	it("编码查询词并去除首尾空白", () => {
		expect(getSearchUrl(" hello world ")).toBe("/search/?q=hello%20world");
	});

	it("编码中文与特殊字符", () => {
		expect(getSearchUrl("中文&x")).toBe("/search/?q=%E4%B8%AD%E6%96%87%26x");
	});
});
