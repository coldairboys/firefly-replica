import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Vitest 配置
 *
 * 说明：
 * - 本项目是 Astro 站点，测试只覆盖 `src/utils/` 下的纯逻辑，
 *   因此这里刻意**不加载** astro 的 vite 插件（@astrojs/* 需要 astro 运行时上下文，
 *   在单元测试里会报 astro:content 等虚拟模块无法解析）。
 * - alias 手动与 `tsconfig.json` 的 `paths` 保持一致，保证源码里的 `@utils/x`
 *   这类绝对导入能在测试中直接解析。
 * - 使用 vite 的 `define` 注入 `import.meta.env.BASE_URL` 与 `SITE`，
 *   对应 Astro 构建时的行为（BASE_URL 为 "/"、SITE 为 siteConfig.site_url）。
 */
const baseUrl = process.env.BASE_URL ?? "/";
const siteUrl = process.env.SITE ?? "https://blogboy.eu.cc/";

export default defineConfig({
	resolve: {
		alias: {
			"@components": fileURLToPath(
				new URL("./src/components", import.meta.url),
			),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
			"@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
			"@i18n": fileURLToPath(new URL("./src/i18n", import.meta.url)),
			"@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	define: {
		"import.meta.env.BASE_URL": JSON.stringify(baseUrl),
		"import.meta.env.SITE": JSON.stringify(siteUrl),
	},
	test: {
		// 业务代码多为纯函数与配置读取，node 环境足够；
		// 需要 DOM 的模块（toc/icon-loader/sakura）本批次不纳入。
		environment: "node",
		include: ["tests/**/*.{test,spec}.ts"],
		globals: false,
		restoreMocks: true,
	},
});
