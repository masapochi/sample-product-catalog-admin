/// <reference types="vitest" />
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "",
    plugins: [
        laravel({
            input: ["resources/assets/scss/app.scss", "resources/ts/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
});
