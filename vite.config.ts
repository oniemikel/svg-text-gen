// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    root: "src/demo",        // デモ画面用のルート
    server: {
        port: 5173,
        proxy: {
            "/api": "http://localhost:3000"
        }
    },
    build: {
        outDir: "../../dist/demo",
        emptyOutDir: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
});
