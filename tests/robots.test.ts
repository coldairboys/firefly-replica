import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * robots.txt 路由的测试。
 *
 * 该路由的核心不变量是：**被关闭的页面必须 Disallow，且与 sitemap 的收录判断保持一致**。
 * 由于 robotsTxt 是在模块顶层基于 siteConfig.pages 求值的，这里通过 mock `@/config`
 * 并 `resetModules` 来覆盖各种开关组合，而不是依赖仓库当前的取值。
 */
type Pages = {
	friends: boolean;
	sponsor: boolean;
	guestbook: boolean;
	gallery: boolean;
};

async function loadRobots(pages: Pages) {
	vi.resetModules();
	vi.doMock("@/config", () => ({ siteConfig: { pages } }));
	const mod = await import("../src/pages/robots.txt.ts");
	return mod.GET({} as never);
}

async function getBody(pages: Pages): Promise<string> {
	const response = await loadRobots(pages);
	return await response.text();
}

const allEnabled: Pages = {
	friends: true,
	sponsor: true,
	guestbook: true,
	gallery: true,
};

const allDisabled: Pages = {
	friends: false,
	sponsor: false,
	guestbook: false,
	gallery: false,
};

describe("robots.txt 路由", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	it("返回 200 且 Content-Type 为 text/plain，声明 utf-8", async () => {
		const response = await loadRobots(allEnabled);
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe(
			"text/plain; charset=utf-8",
		);
	});

	it("始终以 User-agent 段开头，并以 sitemap 结尾", async () => {
		const body = await getBody(allEnabled);
		expect(body.startsWith("User-agent: *\n")).toBe(true);
		expect(body).toMatch(/^Sitemap: https?:\/\/\S+\/sitemap-index\.xml$/m);
	});

	it("以换行结尾，符合纯文本文件惯例", async () => {
		const body = await getBody(allEnabled);
		expect(body.endsWith("\n")).toBe(true);
	});

	it("全部页面开启时不产生任何 Disallow 规则", async () => {
		const body = await getBody(allEnabled);
		expect(body).not.toContain("Disallow:");
	});

	it("全部页面关闭时四个路径全部 Disallow", async () => {
		const body = await getBody(allDisabled);
		for (const path of ["/friends/", "/sponsor/", "/guestbook/", "/gallery/"]) {
			expect(body).toContain(`Disallow: ${path}`);
		}
	});

	it("只禁止被关闭的页面，已开启的页面不出现", async () => {
		const body = await getBody({
			friends: false,
			sponsor: true,
			guestbook: true,
			gallery: false,
		});
		expect(body).toContain("Disallow: /friends/");
		expect(body).toContain("Disallow: /gallery/");
		expect(body).not.toContain("Disallow: /sponsor/");
		expect(body).not.toContain("Disallow: /guestbook/");
	});

	it("真实配置下 friends 与 gallery 被禁止，sponsor 与 guestbook 放行", async () => {
		// 这条用真实 siteConfig 读取，防止未来有人改配置却忘了同步 robots/sitemap
		const { siteConfig } = await import("../src/config/siteConfig");
		const body = await getBody(siteConfig.pages);

		const expected: [string, boolean][] = [
			["/friends/", siteConfig.pages.friends],
			["/sponsor/", siteConfig.pages.sponsor],
			["/guestbook/", siteConfig.pages.guestbook],
			["/gallery/", siteConfig.pages.gallery],
		];
		for (const [path, enabled] of expected) {
			if (enabled) {
				expect(body).not.toContain(`Disallow: ${path}`);
			} else {
				expect(body).toContain(`Disallow: ${path}`);
			}
		}
	});

	it("每个 Disallow 单独成行，不拼成一整行", async () => {
		const body = await getBody(allDisabled);
		const lines = body.split("\n");
		const disallowLines = lines.filter((l) => l.startsWith("Disallow: "));
		expect(disallowLines).toHaveLength(4);
		// 不应出现同一行里包含两个路径的情况
		for (const line of disallowLines) {
			expect(line).toMatch(/^Disallow: \/[a-z]+\/$/);
		}
	});

	it("sitemap 的 URL 是绝对地址，不带重复斜杠", async () => {
		const body = await getBody(allEnabled);
		const match = body.match(/^Sitemap: (\S+)$/m);
		expect(match).not.toBeNull();
		const sitemapUrl = (match as RegExpMatchArray)[1];
		expect(sitemapUrl).toMatch(/^https?:\/\//);
		expect(sitemapUrl.endsWith("/sitemap-index.xml")).toBe(true);
		expect(sitemapUrl).not.toContain("//sitemap");
	});

	it("段落之间以空行分隔", async () => {
		const body = await getBody(allDisabled);
		expect(body).toContain("User-agent: *\n\nDisallow: /friends/");
		expect(body).toMatch(/\n\nSitemap: /);
	});
});
