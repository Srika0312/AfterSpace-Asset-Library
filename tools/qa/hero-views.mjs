// Visual QA: large four-view crops for hero assets in native Canvas 2D.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '../..');
const outDir = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\afterspace-qa';
const keys = ['communication-satellite', 'radio-telescope', 'satellite-dish', 'modular-warehouse', 'cargo-crane', 'material-storage-tank'];
fs.mkdirSync(outDir, { recursive: true });

const rows = [];
for (const key of keys) {
  const files = fs
    .readdirSync(path.join(root, 'assets'), { recursive: true })
    .filter((f) => path.basename(f) === `${key}.js`);
  if (!files.length) continue;
  const abs = path.join(root, 'assets', files[0]);
  const mod = await import(pathToFileURL(abs).href + '?v=' + Date.now());
  const asset = mod.default;
  rows.push({ asset, rel: files[0] });
}

const html = `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:Nunito;src:url('${pathToFileURL(path.join(root, 'tools/web/fonts/nunito-600.woff2')).href}')}
  body{margin:0;padding:24px;background:#F7F4EC;font:12px/1.4 Nunito,sans-serif;color:#3A3026}
  h1{font:600 26px/1.1 'Segoe UI';margin:0 0 16px}
  table{border-collapse:collapse}
  th{font:800 9px Nunito;letter-spacing:.12em;text-transform:uppercase;color:#8C7B66;padding:0 0 7px;text-align:center;width:300px}
  th:first-child{text-align:left;width:130px}
  td{border-top:1px solid #E5DCC9;padding:8px;text-align:center}
  td:first-child{text-align:left;font-weight:700}
  .stage{height:260px;width:280px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:#FBF8F0;border-radius:10px;position:relative;overflow:hidden}
  .stage canvas{width:100%;height:100%;display:block}
</style>
<h1>Foundry — Hero Four-View Crops (Canvas 2D)</h1>
<table>
<thead><tr><th>Asset</th><th>0° Front</th><th>90° Right</th><th>180° Back</th><th>270° Left</th></tr></thead>
<tbody>
${rows
  .map(
    ({ asset }) =>
      `<tr><td>${asset.name}<br><span style="font-weight:600;color:#8C7B66">${asset.key}</span></td>${[0, 90, 180, 270]
        .map((ang) => `<td><div class="stage"><canvas id="c-${asset.key}-${ang}" width="280" height="260"></canvas></div></td>`)
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
    drawAsset(ctx, a_${asset.key.replace(/[^a-zA-Z0-9]/g, '_')}, { angle: ang, ox: 140, oy: 190, unit: 95 });
  }
});`,
  )
  .join('\n')}
</script>`;

fs.writeFileSync(path.join(outDir, 'hero-views.html'), html);
console.log('wrote hero-views.html (Canvas 2D)');
