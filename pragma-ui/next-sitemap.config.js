/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://pragmaoracle.com",
  // ...other options
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.6,
  exclude: ["/details/*"],
  generateIndexSitemap: false, // remove this line once we link to over 5000 urls

  transform: async (config, path) => {
    // Use default transformation
    // returning partial properties will result in generation of XML field with only returned values.
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: path === "/" ? 1 : config.priority, // Give homepage higher priority
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};

module.exports = config;
