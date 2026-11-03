// Visual QA: every asset at all four canonical views in native Canvas 2D.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '../..');
const outDir = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\afterspace-qa';
fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(path.join(root, 'assets'), { recursive: true })
  .filter((f) => f.endsWith('.js') && !f.includes('lib'))
  .sort();

const rows = [];
for (const rel of files) {
  const abs = path.join(root, 'assets', rel);
  if (!fs.existsSync(abs)) continue;
  const mod = await import(pathToFileURL(abs).href + '?v=' + Date.now());
  const asset = mod.default;
  if (!asset?.draw) continue;
  rows.push({ asset, rel });
}

const html = `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:Nunito;src:url('${pathToFileURL(path.join(root, 'tools/web/fonts/nunito-600.woff2')).href}')}
  body{margin:0;padding:24px;background:#F7F4EC;font:12px/1.4 Nunito,sans-serif;color:#3A3026}
  h1{font:600 26px/1.1 'Segoe UI';margin:0 0 16px}
  table{border-collapse:collapse;width:100%}
  th{font:800 9px Nunito;letter-spacing:.12em;text-transform:uppercase;color:#8C7B66;padding:0 0 7px;text-align:center}
  th:first-child{text-align:left;width:150px}
  td{border-top:1px solid #E5DCC9;padding:6px 8px;text-align:center;vertical-align:middle}
  td:first-child{text-align:left;font-weight:700}
  .stage{height:102px;width:140px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:#FBF8F0;border-radius:8px;overflow:hidden;position:relative}
  .stage canvas{width:100%;height:100%;display:block}
  .meta{display:block;font-weight:600;font-size:10px;color:#8C7B66;margin-top:2px}
</style>
<h1>Foundry — Four-View Audit (Canvas 2D)</h1>
<table>
<thead><tr><th>Asset</th><th>0° Front</th><th>90° Right</th><th>180° Back</th><th>270° Left</th></tr></thead>
<tbody>
${rows
  .map(
    ({ asset }) => `<tr><td>${asset.name}<span class="meta">${asset.key} · ${asset.category}</span></td>${[0, 90, 180, 270]
      .map((ang) => `<td><div class="stage"><canvas id="c-${asset.key}-${ang}" width="140" height="102"></canvas></div></td>`)
      .join('')}</tr>`,
  )
  .join('\n')}
</tbody></table>
<script type="module">
import { drawAsset } from '${pathToFileURL(path.join(root, 'assets/lib/canvas.js')).href}';
${rows
  .map(
    ({ asset, rel }) => `
import a_${asset.key.replace(/[^a-zA-Z0-9]/g, '_')} from '${pathToFileURL(path.join(root, 'assets', rel)).href}';
[0, 90, 180, 270].forEach(ang => {
  const c = document.getElementById('c-${asset.key}-' + ang);
  if (c) {
    const ctx = c.getContext('2d');
    drawAsset(ctx, a_${asset.key.replace(/[^a-zA-Z0-9]/g, '_')}, { angle: ang, ox: 70, oy: 75, unit: 38 });
  }
});`,
  )
  .join('\n')}
</script>`;

fs.writeFileSync(path.join(outDir, 'views.html'), html);
console.log(`rendered ${rows.length} assets x 4 views -> ${path.join(outDir, 'views.html')}`);
