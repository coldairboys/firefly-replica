import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

const fontData = fs.readFileSync("C:\\Windows\\Fonts\\Deng.ttf");
const fontBoldData = fs.readFileSync("C:\\Windows\\Fonts\\Dengb.ttf");

const POST_METAS = {
	0: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "新手入门：项目目录、配置文件与发布流程",
		keywords: ["# 目录架构", "# 配置速查", "# 发布脚本"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	1: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "从零开始部署 Firefly 博客并上线 GitHub Pages",
		keywords: ["# 从零部署", "# pnpm 工作流", "# GitHub Pages"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	2: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "博客首页横幅壁纸与多端轮播配置",
		keywords: ["# 横幅壁纸", "# 多端适配", "# 轮播间隔"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	3: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "博客首页动态打字机文案配置",
		keywords: ["# 打字机特效", "# 动态文案", "# 速度调优"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	4: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "评论系统配置：Giscus、Twikoo 与 Waline",
		keywords: ["# Giscus 讨论", "# Twikoo", "# Waline"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	5: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "音乐播放器配置与本地/Meting歌单集成",
		keywords: ["# 音乐播放器", "# 本地歌单", "# Meting API"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	6: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "博客樱花飘落视觉特效与动画参数配置",
		keywords: ["# 樱花飘落", "# Canvas 动画", "# 性能调节"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	7: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "文章封面图与随机封面 API 规则配置",
		keywords: ["# 文章封面", "# 随机图 API", "# 默认壁纸"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	8: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "关于页、留言板与赞助页配置指南",
		keywords: ["# 关于本站", "# 留言互动", "# 赞助收款码"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	9: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "Spine 与 Live2D 桌面看板娘交互配置",
		keywords: ["# Spine 骨骼", "# Live2D 模型", "# 交互动画"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	10: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "导航栏布局、站点滚动公告与页脚版权配置",
		keywords: ["# 顶部导航", "# 滚动公告", "# 页脚版权"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	11: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "主题颜色定制与 OKLCH 色相调节实战",
		keywords: ["# 主题色相", "# OKLCH 配色", "# 暗黑模式"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	12: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "自定义字体引入与 Google Fonts / MiSans 加载",
		keywords: ["# 字体引入", "# Google Fonts", "# MiSans CDN"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	13: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "Pagefind 本地静态全文搜索功能配置",
		keywords: ["# Pagefind", "# 本地索引", "# 毫秒级搜索"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	14: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "站点统计与 Umami / Google Analytics 分析",
		keywords: ["# Umami 统计", "# 访问量分析", "# 隐私友好"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	15: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "文章分类与标签层级管理规则配置",
		keywords: ["# 分类归档", "# 标签聚合", "# 结构设计"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	16: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "国际化多语言 i18n 配置与翻译键管理",
		keywords: ["# i18n 国际化", "# 多语言包", "# 枚举映射"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	17: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "Markdown 文章排版规范与写作实战指南",
		keywords: ["# Markdown 语法", "# 代码高亮", "# 排版实战"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	18: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "博客图片上传规范与本地/图床管理指南",
		keywords: ["# 图片规范", "# 存储路径", "# WebP 优化"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	19: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "Git 仓库备份、快照保存与数据迁移恢复",
		keywords: ["# 数据备份", "# 灾备恢复", "# 仓库克隆"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	20: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "常见报错排查、pnpm 锁定与网络问题解决",
		keywords: ["# 常见报错", "# pnpm 锁定", "# 构建排查"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	21: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "B站高清视频卡片与 iframe 嵌入配置",
		keywords: ["# B站视频", "# 响应式容器", "# iframe 嵌入"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	22: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "文章置顶设置与主页展示权重排序指南",
		keywords: ["# 文章置顶", "# 权重排序", "# pinned 属性"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	23: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "侧边栏布局、悬浮目录与组件配置指南",
		keywords: ["# 侧边栏布局", "# 悬浮 TOC", "# 小部件排列"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	24: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "文章加密保护、CC 版权与分享海报配置",
		keywords: ["# AES 加密", "# 知识共享", "# 分享海报"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	25: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "独立相册画廊配置与图片网格展示指南",
		keywords: ["# 相册画廊", "# 图片网格", "# 目录映射"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	26: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "搜索引擎 SEO 优化、Sitemap 与 RSS 订阅",
		keywords: ["# 搜索引擎 SEO", "# Sitemap", "# RSS 订阅"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	27: {
		category: "博客搭建",
		subCategory: "GUIDE",
		cleanTitle: "首页框体微调、网格栅格与布局切换指南",
		keywords: ["# 首页框体", "# 响应式栅格", "# 布局切换"],
		series: "Astro + Firefly 博客搭建实战",
		badgeColor: "#38bdf8",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(129, 140, 248, 0.16) 0%, transparent 45%)",
	},
	28: {
		category: "Hermes Agent",
		subCategory: "DEPLOY",
		cleanTitle: "Hermes Agent 完整安装部署与多平台实战",
		keywords: ["# Nous Research", "# WSL2 / Linux", "# AI Agent"],
		series: "Hermes Agent 自主成长实战",
		badgeColor: "#f59e0b",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(245, 158, 11, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(249, 115, 22, 0.16) 0%, transparent 45%)",
	},
	29: {
		category: "GitHub周刊",
		subCategory: "WEEKLY",
		cleanTitle: "本周 GitHub 热门 AI 开源项目盘点（8月第4周）",
		keywords: ["# GitHub 趋势", "# AI 开源热榜", "# 周报盘点"],
		series: "GitHub 趋势雷达 · 周刊专栏",
		badgeColor: "#10b981",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(16, 185, 129, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(20, 184, 166, 0.16) 0%, transparent 45%)",
	},
	30: {
		category: "GitHub周刊",
		subCategory: "WEEKLY",
		cleanTitle: "本周 GitHub 热门 AI 开源项目盘点（9月第1周）",
		keywords: ["# GitHub 趋势", "# AI 开源热榜", "# 周报盘点"],
		series: "GitHub 趋势雷达 · 周刊专栏",
		badgeColor: "#10b981",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(16, 185, 129, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(20, 184, 166, 0.16) 0%, transparent 45%)",
	},
	31: {
		category: "GitHub周刊",
		subCategory: "WEEKLY",
		cleanTitle: "本周 GitHub 热门 AI 开源项目盘点（9月第2周）",
		keywords: ["# ponytail", "# Wan2.2 视频", "# Agent 记忆层"],
		series: "GitHub 趋势雷达 · 周刊专栏",
		badgeColor: "#10b981",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(16, 185, 129, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(20, 184, 166, 0.16) 0%, transparent 45%)",
	},
	32: {
		category: "GitHub周刊",
		subCategory: "WEEKLY",
		cleanTitle: "本周 GitHub 热门 AI 开源项目盘点（9月第3周）",
		keywords: ["# Cline", "# OpenCode", "# RAG 检索增强"],
		series: "GitHub 趋势雷达 · 周刊专栏",
		badgeColor: "#10b981",
		gradient:
			"radial-gradient(circle at 85% 18%, rgba(16, 185, 129, 0.22) 0%, transparent 45%), radial-gradient(circle at 12% 82%, rgba(20, 184, 166, 0.16) 0%, transparent 45%)",
	},
};

async function renderCard(id, date) {
	const meta = POST_METAS[id];
	if (!meta) return;

	const paddedId = String(id).padStart(2, "0");
	const badgeText = `${meta.category} · ${meta.subCategory}`;

	const template = {
		type: "div",
		props: {
			style: {
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				backgroundColor: "#0b0f19",
				backgroundImage: meta.gradient,
				color: "#f0f6fc",
				fontFamily: "DengXian",
				padding: "56px 64px",
			},
			children: [
				// Top Header
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
						},
						children: [
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										alignItems: "center",
										gap: "10px",
										padding: "6px 16px",
										backgroundColor: "rgba(255, 255, 255, 0.05)",
										border: `1px solid ${meta.badgeColor}55`,
										borderRadius: "999px",
									},
									children: [
										{
											type: "div",
											props: {
												style: {
													width: "8px",
													height: "8px",
													borderRadius: "50%",
													backgroundColor: meta.badgeColor,
												},
											},
										},
										{
											type: "span",
											props: {
												style: {
													fontSize: "19px",
													fontWeight: 700,
													color: meta.badgeColor,
													letterSpacing: "1px",
												},
												children: badgeText,
											},
										},
									],
								},
							},
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										alignItems: "center",
										fontSize: "20px",
										color: "rgba(240, 246, 252, 0.45)",
										fontWeight: 700,
										letterSpacing: "1.5px",
									},
									children: "COLDAIRBOY NOTEBOOK",
								},
							},
						],
					},
				},

				// Middle Body
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "22px",
							margin: "auto 0",
						},
						children: [
							{
								type: "div",
								props: {
									style: {
										fontSize: "48px",
										fontWeight: 700,
										lineHeight: 1.28,
										color: "#ffffff",
										letterSpacing: "-0.5px",
									},
									children: meta.cleanTitle,
								},
							},
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										gap: "12px",
										alignItems: "center",
									},
									children: meta.keywords.map((kw) => ({
										type: "span",
										props: {
											style: {
												padding: "6px 16px",
												backgroundColor: "rgba(255, 255, 255, 0.06)",
												border: "1px solid rgba(255, 255, 255, 0.12)",
												borderRadius: "8px",
												fontSize: "19px",
												color: "rgba(240, 246, 252, 0.85)",
											},
											children: kw,
										},
									})),
								},
							},
						],
					},
				},

				// Bottom Footer
				{
					type: "div",
					props: {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							borderTop: "1px solid rgba(255, 255, 255, 0.08)",
							paddingTop: "24px",
							width: "100%",
							fontSize: "19px",
							color: "rgba(240, 246, 252, 0.5)",
						},
						children: [
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										alignItems: "center",
										gap: "8px",
									},
									children: [
										{
											type: "span",
											props: {
												style: {
													color: "rgba(240, 246, 252, 0.9)",
													fontWeight: 700,
												},
												children: "Coldairboy",
											},
										},
										{
											type: "span",
											props: {
												children: `· ${meta.series}`,
											},
										},
									],
								},
							},
							{
								type: "div",
								props: {
									style: {
										fontFamily: "monospace",
										color: meta.badgeColor,
										fontSize: "20px",
										fontWeight: 700,
									},
									children: `${date} · #${paddedId}`,
								},
							},
						],
					},
				},
			],
		},
	};

	const svg = await satori(template, {
		width: 1200,
		height: 675,
		fonts: [
			{ name: "DengXian", data: fontData, weight: 400, style: "normal" },
			{ name: "DengXian", data: fontBoldData, weight: 700, style: "normal" },
		],
	});

	const outDir = path.join("src", "content", "posts", "images", "cards");
	if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

	const fileName = `cover-${id}.webp`;
	const outPath = path.join(outDir, fileName);
	await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(outPath);
	return fileName;
}

async function main() {
	console.log("🎨 开始批量生成 33 篇博文极简卡片封面图...");
	const postsDir = path.join("src", "content", "posts");
	const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
	files.sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

	for (const file of files) {
		const id = path.basename(file, ".md");
		const filePath = path.join(postsDir, file);
		let postContent = fs.readFileSync(filePath, "utf-8");
		const dateMatch = postContent.match(/^published:\s*(\S+)/m);
		const date = dateMatch ? dateMatch[1] : "2026-04-01";

		const fileName = await renderCard(id, date);
		if (fileName) {
			// 替换文章中的 image
			postContent = postContent.replace(
				/^image:\s*.*$/m,
				`image: ./images/cards/${fileName}`,
			);
			fs.writeFileSync(filePath, postContent, "utf-8");
			console.log(`✅ [#${id}] 已生成并替换: ./images/cards/${fileName}`);
		}
	}

	console.log("\n🎉 全量博文封面图生成并替换完成！");
}

main().catch(console.error);
