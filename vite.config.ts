import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import EnvironmentPlugin from 'vite-plugin-environment'
import * as path from 'path'
import { loadEnv } from 'vite'

const root = path.resolve(__dirname, './src')

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
	const env = loadEnv(mode, process.cwd())

	const processEnvValues = {
		'process.env': Object.entries(env).reduce((prev, [key, val]) => {
			return {
				...prev,
				[key]: val,
			}
		}, {}),
	}

	return {
		plugins: [
			react(),
			tsconfigPaths(),
			EnvironmentPlugin(['NEXT_PUBLIC_SERVER_URL']),
		],
		define: processEnvValues,
		resolve: {
			alias: {
				'@/*': path.resolve(root, '*'),
			},
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['src/setup-tests.ts'],
			coverage: {
				provider: 'istanbul',
				enabled: true,
				lines: 95,
				functions: 95,
				branches: 95,
				statements: 95,
				reporter: ['text', 'lcov'],
				reportsDirectory: 'coverage',
			},
		},
	}
})
