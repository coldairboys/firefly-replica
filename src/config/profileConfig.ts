import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	avatar: "https://github.com/coldairboys.png",
	name: "Coldairboy",
	bio: "记录学习笔记、折腾过程和日常灵感。",
	links: [
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/9182171/upload/video",
			showName: false,
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/coldairboys",
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
