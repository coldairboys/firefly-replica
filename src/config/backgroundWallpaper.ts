import type { BackgroundWallpaperConfig } from "@/types/config";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	mode: "banner",
	switchable: true,
	src: {
		desktop: [
			"assets/images/DesktopWallpaper/d1.avif",
			"assets/images/DesktopWallpaper/d2.avif",
			"assets/images/DesktopWallpaper/d3.avif",
			"assets/images/DesktopWallpaper/d4.avif",
		],
		mobile: [
			"assets/images/MobileWallpaper/m1.avif",
			"assets/images/MobileWallpaper/m2.avif",
			"assets/images/MobileWallpaper/m3.avif",
			"assets/images/MobileWallpaper/m4.avif",
		],
	},
	banner: {
		position: "center",
		homeText: {
			enable: true,
			switchable: true,
			title: "Coldairboy'学习笔记",
			titleSize: "4rem",
			subtitle: ["欢迎来到我的博客，大家一起学习、成长吧！"],
			subtitleSize: "1.35rem",
			typewriter: {
				enable: true,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000,
			},
		},
		credit: {
			enable: {
				desktop: false,
				mobile: false,
			},
			text: {
				desktop: "",
				mobile: "",
			},
			url: {
				desktop: "",
				mobile: "",
			},
		},
		navbar: {
			transparentMode: "semi",
			enableBlur: true,
			blur: 8,
		},
		carousel: {
			enable: true,
			interval: 5000,
			switchable: true,
		},
		waves: {
			enable: {
				desktop: true,
				mobile: true,
			},
			switchable: true,
		},
	},
	overlay: {
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
		zIndex: -1,
		opacity: 0.8,
		blur: 10,
		cardOpacity: 0.5,
	},
};
