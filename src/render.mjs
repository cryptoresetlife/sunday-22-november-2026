// Renders src/page.html to entry.png (1024x1024) with headless Chrome.
// Usage: node src/render.mjs [chrome-path]
// Run on the author's machine only; the entry program itself just copies entry.png.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const chrome = process.argv[2] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const page = pathToFileURL(join(here, 'page.html')).href;
const out = resolve(here, '..', 'entry.png');
const profile = mkdtempSync(join(tmpdir(), 'chrome-render-'));

execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  `--user-data-dir=${profile}`, '--force-device-scale-factor=1', '--window-size=1024,1024',
  '--virtual-time-budget=3000', `--screenshot=${out}`, page,
], { stdio: 'inherit', timeout: 60000 });

console.log(`wrote ${out} (${statSync(out).size} bytes)`);
