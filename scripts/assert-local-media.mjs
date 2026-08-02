import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = process.cwd();
const scanRoots = ['index.html', 'css', 'data', 'js'];
const extensions = new Set(['.html', '.css', '.js']);
const forbiddenHost = 'res.' + ['cloud', 'inary'].join('') + '.com';
const matches = [];

async function scanPath(relativePath) {
  const fullPath = join(root, relativePath);
  const entries = await readdir(fullPath, { withFileTypes: true }).catch(() => null);

  if (!entries) {
    await scanFile(relativePath);
    return;
  }

  for (const entry of entries) {
    if (entry.name === '.git') continue;
    await scanPath(join(relativePath, entry.name));
  }
}

async function scanFile(relativePath) {
  if (!extensions.has(extname(relativePath))) return;

  const content = await readFile(join(root, relativePath), 'utf8');
  content.split(/\r?\n/).forEach((line, index) => {
    if (line.includes(forbiddenHost)) {
      matches.push(`${relativePath}:${index + 1}`);
    }
  });
}

for (const entry of scanRoots) {
  await scanPath(entry);
}

if (matches.length) {
  console.error(`External media host found:\n${matches.join('\n')}`);
  process.exit(1);
}

console.log('No external media host references found in app source.');
