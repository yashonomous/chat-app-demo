import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// import type { UserConfig } from 'vite';
// import type { InlineConfig } from 'vitest';

// interface VitestConfigExport extends UserConfig {
//   test: InlineConfig;
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // test: {
  //   // 👋 add the line below to add jsdom to vite
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: './src/tests/setup.tsx', // assuming the test folder is in the root of our project
  // }
} 
// as VitestConfigExport
)
