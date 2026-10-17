import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "127.0.0.1",
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      "@": decodeURIComponent(new URL("../src", import.meta.url).pathname),
    },
  },
});
