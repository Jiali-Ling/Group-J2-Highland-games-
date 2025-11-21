import { defineConfig } from "vite";
import { remix } from "@remix-run/dev";
import path from "node:path";

// Ensure the '~' alias resolves to the 'app' directory in both dev and build
export default defineConfig({
  plugins: [remix()],
  resolve: {
    alias: {
      "~": path.resolve(process.cwd(), "app")
    }
  }
});
