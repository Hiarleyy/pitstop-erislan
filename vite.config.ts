import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3001,
  },
  preview: {
    port: 3001, // Mantém a mesma porta para preview
    host: true  // Permite acesso externo durante preview
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.jpeg'],
  build: {
    outDir: 'dist', // Diretório de saída para os arquivos buildados
    emptyOutDir: true, // Limpa o diretório antes de cada build
    sourcemap: mode === 'development', // Gera sourcemaps apenas em desenvolvimento
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  // Configuração base para o deploy
  base: '/', // Altere para '/caminho/' se estiver deployando em subdiretório
}));