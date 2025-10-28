import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pages': ['./src/pages/planner.tsx', './src/pages/history/index.tsx'],
          'components': ['./src/components/ItineraryDisplay.tsx', './src/components/TripForm.tsx'],
          'services': ['./src/services/geminiService.ts', './src/services/historyService.ts'],
          'ui': ['./src/components/ui/button.tsx', './src/components/ui/Card.tsx']
        }
      }
    }
  }
});
