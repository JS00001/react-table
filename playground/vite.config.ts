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
      "@sencorp/react-ui/modal/styles.css": decodeURIComponent(new URL("../src/modal/styles.css", import.meta.url).pathname),
      "@sencorp/react-ui/modal": decodeURIComponent(new URL("../src/modal/index.ts", import.meta.url).pathname),
      "@sencorp/react-ui/table/styles.css": decodeURIComponent(new URL("../src/table/styles.css", import.meta.url).pathname),
      "@sencorp/react-ui/table": decodeURIComponent(new URL("../src/table/index.ts", import.meta.url).pathname),
      "@": decodeURIComponent(new URL("../src", import.meta.url).pathname),
    },
  },
});
