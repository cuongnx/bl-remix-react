import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import esbuild from 'esbuild';

import * as node_fs from 'fs';
import path from 'node:path';

/**
 * This function is for resolving aliases defined in tsconfig
 * to be used for vite build process
 */
function getPathsFromTsconfig() {
  const tsconfig_s = node_fs
    .readFileSync('./tsconfig.json', 'utf-8')
    .replace(/\/\/.*$/gm, ''); // Removing comments
  const tsconfig = JSON.parse(tsconfig_s);
  const aliases: Record<string, string> = {};
  for (const [key, value] of Object.entries(tsconfig.compilerOptions.paths) as [
    string,
    string[],
  ][]) {
    const cleanKey = key.replace('/*', '');
    const cleanValue = value[0].replace('/*', '');
    const resolvedPath = path.resolve(__dirname, cleanValue);
    aliases[cleanKey] = resolvedPath;
  }
  return aliases;
}

export default defineConfig({
  resolve: {
    alias: getPathsFromTsconfig(),
  },
  plugins: [
    remix({
      appDirectory: 'src',
      serverModuleFormat: 'esm',
      buildDirectory: 'build',
      serverBuildFile: 'remix.js',
      buildEnd: async () => {
        await esbuild
          .build({
            alias: { '~': './src' },
            outfile: 'build/server/index.js',
            entryPoints: ['server.ts'],
            external: ['./build/server/*'],
            platform: 'node',
            format: 'esm',
            packages: 'external',
            bundle: true,
            logLevel: 'info',
          })
          .catch((error: unknown) => {
            console.error('Error building server:', error);
            process.exit(1);
          });
      },
    }),
  ],
});
