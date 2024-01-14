import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [react()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	// prevent vite from obscuring rust errors
	clearScreen: false,

	server: {
		port: 3000,
		strictPort: false,
		watch: {
			ignored: ['**/src-tauri/**'],
		},
	},

	build: {
		// Tauri supports es2021
		//target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
}));
