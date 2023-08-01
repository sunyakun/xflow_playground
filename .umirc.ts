import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/xflow", component: "xflow" },
  ],
  npmClient: 'pnpm',
  favicons: [
    '/favicons.svg'
  ],
  svgr: {},
});
