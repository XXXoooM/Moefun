import type {
	AiSummaryConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	UmamiStatsConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Moefun",
	subtitle: "My Personal Blog",
	lang: "zh_CN",
	themeColor: {
		hue: 250,
		fixed: false,
	},
	banner: {
		enable: true,
		src: "assets/images/banner.png",
		position: "center",
		credit: {
			enable: true,
			text: "AI Generated Banner",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 3,
	},
	music: {
		enable: true,
		server: "netease",
		type: "playlist",
		// Default playlist: 网易云热歌榜，请替换为您自己的歌单 ID
		id: "17910751956",
		autoPlay: false,
	},
	announcement: {
		enable: true,
		title: "站点公告",
		content: "欢迎来到我的个人博客！这里记录了我的技术学习与生活点滴。目前正在进行博客升级和重构，如有访问报错请谅解~",
		icon: "material-symbols:campaign-outline-rounded", //喇叭图标
		color: "text-amber-500", // 图标颜色
		link: "/about", // 可以添加一个点击跳转链接，如果不为空的话
	},
	favicon: [],
	umami: {
		enable: true,
		src: "https://moefun.yuia.fun/script.js",
		websiteId: "5bde94b1-0f15-4d9c-a39b-c366c1bae3ef",
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/XXXoooM/Yuiafun",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png",
	name: "Moefun",
	bio: "探索技术与生活的美好，记录每一次灵感的绽放。",
	links: [
		{
			name: "Twitter",
			icon: "fa6-brands:twitter",
			url: "https://twitter.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

export const umamiStatsConfig: UmamiStatsConfig = {
	enable: true,
	apiUrl: "https://moefun.yuia.fun",
};

export const aiSummaryConfig: AiSummaryConfig = {
	enable: true,
	apiUrl: "https://moefun.yuia.fun/api/ai-summary",
};
