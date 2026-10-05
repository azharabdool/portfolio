import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
function walk(folder) { return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(folder, entry.name)) : [path.join(folder, entry.name)]); }
const pages = walk(root).filter((file) => file.endsWith('.html'));
const failures = [];
let checked = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const link = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|data:|javascript:)/.test(link)) continue;
    const [pathname, hash] = link.split('#');
    const urlPath = decodeURIComponent(pathname.split('?')[0]);
    let target = urlPath ? path.resolve(urlPath.startsWith('/') ? root : path.dirname(file), `.${urlPath.startsWith('/') ? urlPath : '/' + urlPath}`) : file;
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    checked++;
    if (!fs.existsSync(target)) failures.push(`${path.relative(root, file)} -> ${link}`);
    else if (hash && target.endsWith('.html') && !fs.readFileSync(target, 'utf8').includes(`id="${hash}"`)) failures.push(`${path.relative(root, file)} missing anchor -> ${link}`);
  }
}
console.log(`${pages.length} HTML pages; ${checked} local links/assets checked; ${failures.length} failures.`);
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
