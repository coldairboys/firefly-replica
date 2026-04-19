import type { SiteConfig } from "@/types/config";
import { fontConfig } from "./fontConfig";

const SITE_LANG = "zh_CN";

export const siteConfig: SiteConfig = {
	title: "Coldairboy学习笔记",
	subtitle: "用来记录学习笔记与折腾记录。",
	site_url: "https://blogboy.eu.cc",
	description:
		"Coldairboy 的个人博客样板，使用 Astro + Firefly 构建，用来记录学习笔记与折腾记录。",
	keywords: ["Coldairboy", "学习笔记", "Astro", "Firefly", "博客"],
	themeColor: {
		hue: 250,
		fixed: false,
		defaultMode: "system",
	},
	pageWidth: 100,
	card: {
		border: true,
		followTheme: false,
	},
	favicon: [
		{
			src: "/favicon/favicon.ico",
		},
	],
	navbar: {
		logo: {
			type: "icon",
			value: "material-symbols:auto-awesome-outline",
			alt: "Logo",
		},
		title: "Coldairboy学习笔记",
		widthFull: false,
		menuAlign: "center",
		followTheme: false,
		stickyNavbar: true,
	},
	siteStartDate: "2026-03-29",
	timezone: "Asia/Shanghai",
	rehypeCallouts: {
		theme: "github",
	},
	showLastModified: true,
	outdatedThreshold: 30,
	sharePoster: true,
	generateOgImages: false,
	bangumi: {
		userId: "9182171",
		categoryOrder: ["anime", "book", "music", "game"],
	},
	pages: {
		friends: false,
		sponsor: true,
		guestbook: true,
		bangumi: false,
		gallery: false,
	},
	categoryBar: true,
	postListLayout: {
		defaultMode: "list",
		mobileDefaultMode: "list",
		showTags: false,
		descriptionLines: 3,
		allowSwitch: true,
		grid: {
			masonry: false,
			columnWidth: 320,
		},
	},
	pagination: {
		postsPerPage: 10,
	},
	analytics: {
		googleAnalyticsId: "",
		microsoftClarityId: "",
		umamiAnalytics: {
			websiteId: "",
			scriptUrl: "https://cloud.umami.is/script.js",
			trackOutboundLinks: true,
			collectWebVitals: false,
			relpays: {
				enabled: false,
				sampleRate: 0.15,
				maskLevel: "moderate",
				maxDuration: 300000,
				blockSelector: "",
			},
		},
		la51Analytics: {
			Id: "",
			sdkUrl: "",
			ck: "",
			autoTrack: false,
			hashMode: false,
			screenRecord: true,
		},
	},
	imageOptimization: {
		formats: "webp",
		quality: 85,
		noReferrerDomains: [],
	},
	font: fontConfig,
	lang: SITE_LANG,
};
