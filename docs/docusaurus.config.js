const math = require('remark-math')
const katex = require('rehype-katex')

module.exports = {
	title: "Pragma",
	tagline: "Documentation and Guides",
	url: "https://docs.pragmaoracle.com",
	baseUrl: "/",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "ignore",
	favicon: "img/favicon.png",
	organizationName: "Astraly-Labs", // Usually your GitHub org/user name.
	projectName: "Pragma", // Usually your repo name.
	trailingSlash: false,
	themeConfig: {
		image: "img/background.jpg",
		metadata: [{ name: "twitter:card", content: "summary" }],
		prism: {
			additionalLanguages: ["solidity"],
		},
		algolia: {
			apiKey: "10bd5a4750327624845152ae40c0c9c0",
			indexName: "v3-docs",
			appId: "I2FJIAZ9PU",
		},
		navbar: {
			title: "Pragma Docs",
			logo: {
				alt: "Pragma Logo",
				src: "img/prg_dark_icon.png",
			},
			items: [
				{
					to: "/docs/introduction",
					label: "Protocol",
					position: "right",
					className: "persistent",
				},
				// {
				//   to: '/protocol/reference/smart-contracts',
				//   label: 'Contracts',
				//   position: 'right',
				//   className: 'persistent',
				// },
				// {
				//   to: '/protocol/context/governance/overview',
				//   label: 'Governance',
				//   position: 'right',
				//   className: 'persistent',
				// },
				{
					label: "Feedbacks",
					to: "https://kprem87muy4.typeform.com/to/ahJVbIeI",
					position: "right",
					className: "persistent",
				},
				{
					href: "https://github.com/Astraly-Labs",
					label: "GitHub",
					position: "right",
					className: "persistent",
				},
				// {
				//   href: 'https://unigrants.org/',
				//   label: 'Grants',
				//   position: 'right',
				//   className: 'persistent',
				// },
			],
		},
		colorMode: {
			// "light" | "dark"
			defaultMode: "dark",

			// Hides the switch in the navbar
			// Useful if you want to support a single color mode
			disableSwitch: false,

			// Should we use the prefers-color-scheme media-query,
			// using user system preferences, instead of the hardcoded defaultMode
			respectPrefersColorScheme: false,
		},
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					path: "docs",
					remarkPlugins: [math],
					rehypePlugins: [katex],
					routeBasePath: "/docs",
					sidebarPath: require.resolve("./sidebars.js"),
					// editUrl: 'https://github.com/Astraly-Labs/astraly-docs/tree/main/',
					includeCurrentVersion: false,
					versions: {
						V3: {
							banner: "none",
						},
					},
				},
				blog: {
					remarkPlugins: [math],
					rehypePlugins: [katex],
					path: "blog/",
					blogTitle: "Engineering Blog",
					blogSidebarCount: 0,
				},
				googleAnalytics: {
					trackingID: "UA-128182339-7",
					anonymizeIP: true,
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
					customCss2: require.resolve("./src/css/colors.css"),
				},
			},
		],
	],
	stylesheets: [
		{
			href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
			type: "text/css",
			integrity:
				"sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
			crossorigin: "anonymous",
		},
	],
};
