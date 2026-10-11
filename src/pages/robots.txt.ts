import type { APIRoute } from "astro";
import { siteConfig } from "@/config";

/**
 * 由 siteConfig.pages 开关派生出的页面路由。
 * 键必须与 astro.config.mjs 中 sitemap 的 filter 判断保持一致，
 * 这样 robots.txt 与 sitemap 不会出现「一处收录、一处放行」的分歧。
 */
const gatedPages: Array<{ path: string; enabled: boolean }> = [
	{ path: "/friends/", enabled: siteConfig.pages.friends },
	{ path: "/sponsor/", enabled: siteConfig.pages.sponsor },
	{ path: "/guestbook/", enabled: siteConfig.pages.guestbook },
	{ path: "/gallery/", enabled: siteConfig.pages.gallery },
];

// 被关闭的页面不进 sitemap，此处同样禁止抓取，保持两处一致
const disallowRules = gatedPages
	.filter((page) => !page.enabled)
	.map((page) => `Disallow: ${page.path}`)
	.join("\n");

const sections = ["User-agent: *"];
if (disallowRules) {
	sections.push(disallowRules);
}

sections.push(
	`Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}`,
);

const robotsTxt = `${sections.join("\n\n")}\n`;

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
