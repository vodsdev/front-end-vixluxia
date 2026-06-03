const fs = require('fs');
const path = require('path');

const promptsData = fs.readFileSync(path.join(__dirname, 'lib/prompts-data.js'), 'utf8');
const previews1 = fs.readFileSync(path.join(__dirname, 'components/previews.js'), 'utf8');
const previews2 = fs.readFileSync(path.join(__dirname, 'components/previews-marketing.js'), 'utf8');

const previewNames = new Set();
const matchPreviews1 = previews1.matchAll(/export function ([A-Za-z0-9_]+Preview)\(/g);
for (const match of matchPreviews1) previewNames.add(match[1]);
const matchPreviews2 = previews2.matchAll(/export function ([A-Za-z0-9_]+Preview)\(/g);
for (const match of matchPreviews2) previewNames.add(match[1]);

const missing = [];
const matchPrompts = promptsData.matchAll(/preview:\s*'([A-Za-z0-9_]+Preview)'/g);
for (const match of matchPrompts) {
  if (!previewNames.has(match[1])) {
    missing.push(match[1]);
  }
}

console.log(JSON.stringify(missing, null, 2));
