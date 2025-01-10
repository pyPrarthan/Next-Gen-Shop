import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@chakra-ui/react"],
  },
  server: {
    proxy: {
      "/api": "https://next-gen-shop.onrender.com", // Replace with actual backend URL
    },
  },
});
