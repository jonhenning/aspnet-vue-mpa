import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },  
  build: {
    emptyOutDir: false,
    outDir: './wwwroot/js',
    lib: {
      entry: 'static/vue/myapp.js', //path.resolve(__dirname, 'static/vue/myapp.js'),
      name: 'myapp',
      fileName: (format) => `myapp.${format}.js`,
      formats: ['umd'],
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  },
  plugins: [
    vue()
  ]
});
