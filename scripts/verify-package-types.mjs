/* global console, process */

import { readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC_ROOT = 'src/lib';
const DIST_ROOT = 'dist';

function walk(dir) {
	const entries = readdirSync(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...walk(fullPath));
			continue;
		}
		files.push(fullPath);
	}
	return files;
}

const sourceTsFiles = walk(SRC_ROOT)
	.filter((file) => file.endsWith('.ts'))
	.filter((file) => !/\.(test|spec)\.ts$/.test(file));

const missingDts = [];
for (const sourceFile of sourceTsFiles) {
	const srcRelative = relative(SRC_ROOT, sourceFile);
	const distRelative = srcRelative.replace(/\.ts$/, '.d.ts');
	const distFile = join(DIST_ROOT, distRelative);
	if (!existsSync(distFile)) {
		missingDts.push({ sourceFile, distFile });
	}
}

if (missingDts.length > 0) {
	console.error('Declaration integrity check failed.');
	console.error('Missing generated .d.ts files:');
	for (const item of missingDts) {
		console.error(`- ${item.sourceFile} -> ${item.distFile}`);
	}
	process.exit(1);
}

console.log(`Declaration integrity check passed (${sourceTsFiles.length} source .ts files).`);
