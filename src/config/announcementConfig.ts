import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	title: "公告",
	content: "Hi，欢迎来到 Coldairboy'学习笔记。",
	closable: true,
	link: {
		enable: true,
		text: "了解更多",
		url: "/about/",
		external: false,
	},
};
