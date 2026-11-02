// Fails when a relative Markdown link points to a file that does not exist.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SKIPPED_DIRECTORIES = new Set(['node_modules', '.git', '.next', '.expo', '.turbo', 'dist']);
const MARKDOWN_LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (SKIPPED_DIRECTORIES.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(fullPath);
    return entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

function brokenLinks(file) {
  const withoutCode = readFileSync(file, 'utf8')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '');
  return [...withoutCode.matchAll(MARKDOWN_LINK)]
    .map((match) => match[1])
    .filter((target) => !/^(https?:|mailto:|#)/.test(target))
    .filter((target) => !existsSync(path.resolve(path.dirname(file), target.split('#')[0])))
    .map((target) => `${path.relative('.', file)} -> ${target}`);
}

const files = markdownFiles('.');
const broken = files.flatMap(brokenLinks);
if (broken.length > 0) {
  console.error(`Broken links:\n${broken.join('\n')}`);
  process.exit(1);
}
console.log(`Checked ${files.length} Markdown files. No broken relative links.`);
