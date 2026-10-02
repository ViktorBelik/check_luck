import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/static/frontend/",

    plugins: [react()],

    build: {
        outDir: "../backend/static/frontend",
        emptyOutDir: true,

        rollupOptions: {
            input: "src/main.jsx",

            output: {
                entryFileNames: "app.js",
                chunkFileNames: "[name].js",

                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith(".css")) {
                        return "styles.css";
                    }

                    return "[name][extname]";
                },
            },
        },
    },
});