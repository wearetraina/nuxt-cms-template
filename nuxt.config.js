export default {
  target: "static",
  mode: "universal",
  modules: ["@nuxt/content"],
  buildModules: ["@nuxt/image"],
  css: ["~/assets/css/main.scss"],
  components: true,
  generate: {
    async routes() {
      const { $content } = require("@nuxt/content");
      const files = await $content("pages", { deep: true }).only(["path", "slug"]).fetch();
      return files.map((file) => (file.path === "/index" ? "/" : file.slug));
    },
  },
  env:{
    SITE_TITLE: 'Nuxt CMS Template',
    BASE_URL: 'https://example.com',
  },
  content: {
    // Disable for security reason on CodeSandBox
    liveEdit: false,
  },
  head: {
    htmlAttrs: {
      lang: "en",
    },
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", content: "#000000" },
    ],
    meta: [
      { name: "msapplication-TileColor", content: "#000000" },
      { name: "theme-color", content: "#000000" },
    ],
  },
};
