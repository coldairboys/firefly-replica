import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	title: "公告",
	content: "Hi，欢迎来到 Coldairboy学习笔记。",
	closable: true,
	link: {
		enable: true,
		text: "更多",
		url: "/about/",
		external: false,
	},
};
