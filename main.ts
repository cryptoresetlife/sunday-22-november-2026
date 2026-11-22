// Sunday 22 November 2026 in one picture.
// The page is hand-drawn as HTML/SVG in src/page.html and rendered once to entry.png by src/render.mjs.
// This program copies that PNG to $MAKEFUN_OUTPUT_DIR (default /output) unchanged, so two runs give identical bytes.
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
