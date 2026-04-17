import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	avatar: "https://github.com/10000ge10000.png",
	name: "Coldairboy",
	bio: "记录学习笔记与日常折腾。",
	links: [
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/59438380",
			showName: false,
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/10000ge10000",
			showName: false,
		},
		{
			name: "YouTube",
			icon: "fa7-brands:youtube",
			url: "https://www.youtube.com/channel/UCqgvZnCN9-9pZcL4SWxmnDw",
			showName: false,
		},
		{
			name: "Telegram",
			icon: "fa7-brands:telegram",
			url: "https://t.me/yiwanaishare",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};
