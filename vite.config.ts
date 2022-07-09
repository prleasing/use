import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
// @ts-ignore
import vue from '@vitejs/plugin-vue';

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
			formats: ['es', 'cjs', 'iife'],
			fileName: (format) => `index.${format}.js`
		},
		minify: 'terser',
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
});
