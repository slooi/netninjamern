import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const proxyTarget = process.env.PROXY_TARGET || '127.0.0.1';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		proxy: { "/api": "http://" + proxyTarget + ":8000" }
	}, build: {
		outDir: "../dist/client"
	}
})
