import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";

const links: NavBarLink[] = [
	{
		name: "首页",
		url: "/",
		icon: "material-symbols:home-outline-rounded",
	},
	{
		name: "关于",
		url: "/about/",
		icon: "material-symbols:person-outline-rounded",
	},
	{
		name: "Bilibili",
		url: "https://space.bilibili.com/9182171/upload/video",
		external: true,
		icon: "fa7-brands:bilibili",
	},
	{
		name: "GitHub",
		url: "https://github.com/coldairboys",
		external: true,
		icon: "fa7-brands:github",
	},
	{
		name: "留言板",
		url: "/guestbook/",
		icon: "material-symbols:forum-outline-rounded",
	},
];

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = { links };
