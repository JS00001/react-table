import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
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
