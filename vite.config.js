import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
// import { defineConfig } from "vite";
// import svgSprite from "vite-plugin-svg-sprite";

// export default defineConfig({
//   plugins: [
//     svgSprite({
//       // шлях до папки з вашими SVG іконками
//       src: "src/assets/icons",
//     }),
//   ],
// });
