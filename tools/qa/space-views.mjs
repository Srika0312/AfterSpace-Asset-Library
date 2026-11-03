// Visual QA: every Space asset at four canonical views plus the 32 px squint size in CSS.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { assetToHTML } from '../../assets/lib/css.js';

const root = path.resolve(import.meta.dirname, '../..');
const outDir = process.env.FOUNDRY_QA_OUT || 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-qa';
fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(path.join(root, 'assets', 'space'))
  .filter((f) => f.endsWith('.js'))
  .sort();

const rows = [];
for (const file of files) {
  const abs = path.join(root, 'assets', 'space', file);
  const mod = await import(pathToFileURL(abs).href + '?v=' + Date.now());
  const asset = mod.default;
  if (!asset?.draw) continue;
  rows.push({
    asset,
    views: [0, 90, 180, 270].map((angle) => ({
      angle,
      html: assetToHTML(asset, { angle, padding: 12, unit: 90 }),
    })),
    tiny: assetToHTML(asset, { angle: asset.hero ?? 0, padding: 1, unit: 1 }),
  });
}

const head = `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:Nunito;src:url('${pathToFileURL(path.join(root, 'tools/web/fonts/nunito-600.woff2')).href}')}
  body{margin:0;padding:24px;background:#F7F4EC;font:12px/1.4 Nunito,sans-serif;color:#3A3026}
  h1{font:600 26px/1.1 'Segoe UI';margin:0 0 4px}
  p.sub{margin:0 0 18px;color:#8C7B66}
  table{border-collapse:collapse;width:100%}
  th{font:800 9px Nunito;letter-spacing:.12em;text-transform:uppercase;color:#8C7B66;padding:0 0 7px;text-align:center}
  th:first-child{text-align:left;width:150px}
  th:last-child{width:58px}
  td{border-top:1px solid #E5DCC9;padding:6px 7px;text-align:center;vertical-align:middle}
  td:first-child{text-align:left;font-weight:700;font-size:11px}
  td:first-child span{display:block;font-weight:600;font-size:9.5px;color:#8C7B66;margin-top:2px}
  .stage{height:190px;display:flex;align-items:center;justify-content:center;background:#FBF8F0;border-radius:8px;overflow:hidden;position:relative}
  .stage .as-asset{max-width:92%;max-height:92%}
  .tiny{height:48px;display:flex;align-items:center;justify-content:center;background:#FBF8F0;border-radius:8px;overflow:hidden}
  .tiny .as-asset{width:32px !important;height:32px !important}
</style>
<h1>Foundry — Space category audit (CSS)</h1>
<p class="sub">Four canonical views plus the 32 px read. Rows 1-6.</p>
<table>
<thead><tr><th>Asset</th><th>0° Front</th><th>90° Right</th><th>180° Back</th><th>270° Left</th><th>32 px</th></tr></thead>
<tbody>`;

const rowHTML = ({ asset, views, tiny }) => `<tr>
  <td>${asset.name}<span>${asset.key}</span></td>
  ${views.map((v) => `<td><div class="stage">${v.html}</div></td>`).join('')}
  <td><div class="tiny">${tiny}</div></td>
</tr>`;

const chunks = [rows.slice(0, 6), rows.slice(6)];
for (let i = 0; i < chunks.length; i++) {
  const html = head + chunks[i].map(rowHTML).join('\n') + '</tbody></table>';
  fs.writeFileSync(path.join(outDir, `space-views-${i + 1}.html`), html);
}
console.log(`rendered ${rows.length} space assets -> ${outDir}\\space-views-1.html / space-views-2.html`);
