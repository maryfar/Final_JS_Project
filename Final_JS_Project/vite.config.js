import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        signup: resolve(__dirname, "signup.html"),
        login: resolve(__dirname, "login.html"),
        shop: resolve(__dirname, "shop.html"),
        search: resolve(__dirname, "search.html"),
        singleproduct: resolve(__dirname, "singleproduct.html"),
        orderitem: resolve(__dirname, "orderitem.html")
      },
    },
  },
});
