/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./src/__tests__/setup.ts"],
    environment: "jsdom",
    globals: true,
  },
});
