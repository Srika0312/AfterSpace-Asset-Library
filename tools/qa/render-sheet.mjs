// Visual QA: render every asset to a native Canvas 2D contact sheet.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '../..');
const outDir = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\afterspace-qa';
fs.mkdirSync(outDir, { recursive: true });

const rels = process.argv.slice(2);
const files = rels.length
  ? rels
  : fs
      .readdirSync(path.join(root, 'assets'), { recursive: true })
      .filter((f) => f.endsWith('.js') && !f.includes('lib'));

const cards = [];
for (const rel of files) {
  const abs = path.join(root, 'assets', rel);
  if (!fs.existsSync(abs)) continue;
  const mod = await import(pathToFileURL(abs).href + '?v=' + Date.now());
  const asset = mod.default;
  if (!asset?.draw) continue;
  cards.push({ asset, rel });
}

const html = `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:Nunito;src:url('${pathToFileURL(path.join(root, 'tools/web/fonts/nunito-600.woff2')).href}')}
  body{margin:0;padding:28px;background:#F7F4EC;font:14px/1.4 Nunito,sans-serif;color:#3A3026}
  h1{font:600 30px/1.1 'Segoe UI';margin:0 0 18px}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .cell{background:#FBF8F0;border:1px solid #E5DCC9;border-radius:14px;padding:10px;display:flex;flex-direction:column;align-items:center}
  .stage{width:100%;height:210px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 55%,#fff,#F6F2E8);border-radius:9px;overflow:hidden;position:relative}
  .stage canvas{width:100%;height:100%;display:block}
  .name{font-weight:700;margin-top:9px}
  .meta{font-size:11px;color:#7A6A57}
</style>
<h1>Foundry — Canvas 2D Engine Proof</h1>
<div class="grid">
${cards
  .map(
    ({ asset }) => `<div class="cell"><div class="stage"><canvas id="c-${asset.key}" width="280" height="210"></canvas></div><div class="name">${asset.name}</div><div class="meta">${asset.key} · ${asset.category}</div></div>`,
  )
  .join('\n')}
</div>
<script type="module">
import { drawAsset } from '${pathToFileURL(path.join(root, 'assets/lib/canvas.js')).href}';
${cards
  .map(
    ({ asset, rel }) => `
import a_${asset.key.replace(/[^a-zA-Z0-9]/g, '_')} from '${pathToFileURL(path.join(root, 'assets', rel)).href}';
{
  const c = document.getElementById('c-${asset.key}');
  if (c) {
    const ctx = c.getContext('2d');
    drawAsset(ctx, a_${asset.key.replace(/[^a-zA-Z0-9]/g, '_')}, { angle: ${asset.hero ?? 0}, ox: 140, oy: 155, unit: 65 });
  }
}`,
  )
  .join('\n')}
</script>`;

fs.writeFileSync(path.join(outDir, 'contact.html'), html);
console.log(`rendered ${cards.length} assets -> ${path.join(outDir, 'contact.html')}`);
