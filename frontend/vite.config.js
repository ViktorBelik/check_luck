import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "../backend/static/frontend",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: "app.js",
                chunkFileNames: "[name].js",
                assetFileNames: "[name][extname]",
            },
        },
    },
});