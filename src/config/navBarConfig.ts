import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";

const links: NavBarLink[] = [
	{
		name: "主页",
		url: "/",
		icon: "material-symbols:home-outline-rounded",
	},
	{
		name: "哔哩哔哩",
		url: "https://space.bilibili.com/59438380",
		external: true,
		icon: "fa7-brands:bilibili",
	},
	{
		name: "YouTube",
		url: "https://www.youtube.com/channel/UCqgvZnCN9-9pZcL4SWxmnDw",
		external: true,
		icon: "fa7-brands:youtube",
	},
	{
		name: "GitHub",
		url: "https://github.com/10000ge10000",
		external: true,
		icon: "fa7-brands:github",
	},
	{
		name: "留言",
		url: "/guestbook/",
		icon: "material-symbols:forum-outline-rounded",
	},
];

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = { links };
