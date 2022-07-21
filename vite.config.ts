import { isAbsolute, resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
// @ts-ignore
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	define: {
		__VUE_OPTIONS_API__: false,
		__VUE_PROD_DEVTOOLS__: false
	},
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'use',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format}.js`
		},
		minify: 'terser',
		rollupOptions: {
			preserveModules: true,
			// external: ['vue'],
			external: (id: string) => {
				return !id.startsWith('.') && !isAbsolute(id);
			}
		}
	}
});
