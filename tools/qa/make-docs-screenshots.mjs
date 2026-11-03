// Automated capture of finalized screenshots for README and documentation.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'H:\\DEV\\AFTERSPACE\\01 OPENCODE\\ASSET LIBRARY';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9340;
const PROFILE = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-docs-prof';
const SERVER_URL = 'http://127.0.0.1:4321/';
const DOCS_DIR = path.join(ROOT, 'docs');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Ensure docs directory exists
fs.mkdirSync(DOCS_DIR, { recursive: true });

// 1. Ensure Foundry server is running
let serverProcess = null;
let serverUrl = null;

console.log('[capture] Starting Foundry server on port 4380...');
serverProcess = spawn('node', ['tools/foundry/server.mjs'], {
  cwd: ROOT,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, PORT: '4380' },
});

serverProcess.stderr.on('data', (d) => console.error('[server err]', d.toString()));

await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Server start timeout')), 10000);
  serverProcess.stdout.on('data', (d) => {
    const text = d.toString();
    const match = text.match(/http:\/\/(127\.0\.0\.1|localhost):(\d+)\//);
    if (match) {
      serverUrl = `http://127.0.0.1:${match[2]}/`;
      console.log(`[capture] Foundry server listening at ${serverUrl}`);
      clearTimeout(timer);
      resolve();
    }
  });
  serverProcess.on('error', (err) => {
    clearTimeout(timer);
    reject(err);
  });
});

for (let i = 0; i < 20; i++) {
  try {
    const res = await fetch(`${serverUrl}api/health`);
    if (res.ok) break;
  } catch {}
  await sleep(200);
}

// 2. Generate the multi-view showcase HTML inside docs/showcase.html
const heroKeys = [
  { key: 'communication-satellite', cat: 'space', name: 'Communication Satellite', unit: 75, ox: 130, oy: 155 },
  { key: 'cargo-crane', cat: 'industrial', name: 'Cargo Crane', unit: 65, ox: 130, oy: 155 },
  { key: 'fusion-reactor-module', cat: 'energy', name: 'Fusion Reactor Module', unit: 60, ox: 130, oy: 150 },
  { key: 'atmospheric-monitoring-tower', cat: 'water-atmos', name: 'Atmospheric Tower', unit: 48, ox: 130, oy: 165 },
  { key: 'exploration-rover', cat: 'transport', name: 'Exploration Rover', unit: 75, ox: 130, oy: 145 },
  { key: 'modular-habitat-module', cat: 'residential', name: 'Modular Habitat', unit: 65, ox: 130, oy: 150 },
  { key: 'maintenance-robot', cat: 'inhabitants', name: 'Maintenance Robot', unit: 85, ox: 130, oy: 155 },
];

const showcaseHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Foundry — Canonical Four-View Showcase</title>
<style>
  @font-face { font-family: 'Nunito'; src: url('/fonts/nunito-600.woff2') format('woff2'); font-weight: 600; }
  @font-face { font-family: 'Nunito'; src: url('/fonts/nunito-700.woff2') format('woff2'); font-weight: 700; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #151311;
    color: #F5EFEB;
    font: 13px/1.4 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    padding: 28px 32px;
  }
  header {
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 14px;
  }
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #FFF;
    display: flex;
    align-items: center;
    gap: 12px;
    letter-spacing: -0.01em;
  }
  .tagline {
    color: #9C8B7A;
    font-size: 13px;
    margin-top: 4px;
  }
  .badge {
    background: #E87A38;
    color: #FFF;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 6px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }
  thead th {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8C7B66;
    padding: 0 10px 8px;
    text-align: center;
  }
  thead th:first-child { text-align: left; width: 200px; }
  tbody tr {
    background: #1E1B18;
    border-radius: 10px;
  }
  tbody td {
    padding: 10px;
    text-align: center;
    vertical-align: middle;
  }
  tbody td:first-child {
    text-align: left;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-left: 18px;
  }
  tbody td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .name { font-weight: 700; font-size: 15px; color: #FFF; }
  .meta { font-size: 11.5px; color: #E87A38; margin-top: 3px; font-weight: 600; }
  .tag { font-size: 10.5px; color: #8C7B66; margin-top: 2px; }
  .stage {
    width: 250px;
    height: 180px;
    margin: 0 auto;
    background: radial-gradient(circle at 50% 55%, #2C2622, #181513);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .stage canvas { width: 100%; height: 100%; display: block; }
</style>
</head>
<body>
<header>
  <div>
    <h1>THE AFTERSPACE / FOUNDRY <span class="badge">Canonical 4-View Engine Proof</span></h1>
    <p class="tagline">Zero SVG · 100% Canvas 2D Vector Primitives · Multi-Angle 3D Isometric Projection</p>
  </div>
  <div style="text-align:right; color:#8C7B66; font-size:12px;">
    <strong>178 Assets</strong> · 11 Categories · Zero Dependencies
  </div>
</header>
<table>
<thead>
  <tr>
    <th>Asset</th>
    <th>0° Front</th>
    <th>90° Right</th>
    <th>180° Back</th>
    <th>270° Left</th>
  </tr>
</thead>
<tbody>
${heroKeys
  .map(
    (h) => `<tr>
  <td>
    <div class="name">${h.name}</div>
    <div class="meta">${h.cat.toUpperCase()}</div>
    <div class="tag">${h.key}</div>
  </td>
  ${[0, 90, 180, 270]
    .map(
      (ang) => `<td><div class="stage"><canvas id="c-${h.key}-${ang}" width="250" height="180"></canvas></div></td>`,
    )
    .join('')}
</tr>`,
  )
  .join('\n')}
</tbody>
</table>
<script type="module">
import { drawAsset } from '/assets/lib/canvas.js';
${heroKeys
  .map(
    (h) => `
import a_${h.key.replace(/-/g, '_')} from '/assets/${h.cat}/${h.key}.js';
[0, 90, 180, 270].forEach(ang => {
  const c = document.getElementById('c-${h.key}-' + ang);
  if (c) {
    const ctx = c.getContext('2d');
    drawAsset(ctx, a_${h.key.replace(/-/g, '_')}, { angle: ang, ox: ${h.ox}, oy: ${h.oy}, unit: ${h.unit} });
  }
});`,
  )
  .join('\n')}
window.__CANVAS_RENDERED__ = true;
</script>
</body>
</html>`;

fs.writeFileSync(path.join(DOCS_DIR, 'showcase.html'), showcaseHtml, 'utf8');

// 3. Launch Chrome Headless
console.log('[capture] Launching headless Chrome...');
const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--no-first-run',
    '--hide-scrollbars',
    '--window-size=1440,920',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function getJSON(endpoint) {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}${endpoint}`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(250);
  }
  throw new Error('Chrome DevTools WebSocket not ready');
}

const version = await getJSON('/json/version');
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};

function send(method, params = {}, sessionId) {
  const mid = ++id;
  return new Promise((resolve, reject) => {
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params, sessionId }));
  });
}

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);

await S('Page.enable');
await S('Runtime.enable');
await S('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 920,
  deviceScaleFactor: 1.5,
  mobile: false,
});

async function evalJS(expression, awaitPromise = false) {
  const r = await S('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}

async function waitFor(expression, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      if (await evalJS(expression)) return true;
    } catch {}
    await sleep(200);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPTURE 1: Foundry Gallery (Day Mode)
// ─────────────────────────────────────────────────────────────────────────────
console.log('[capture] Navigating to Foundry gallery...');
await S('Page.navigate', { url: serverUrl });
await waitFor(`document.querySelectorAll('.card:not(.skeleton)').length >= 170 && [...document.querySelectorAll('.card-canvas')].every(c => c.width > 0)`);
await sleep(1500);

// Ensure theme is Day
await evalJS(`if (document.documentElement.dataset.theme !== 'day') document.getElementById('theme-toggle')?.click()`);
await sleep(600);

console.log('[capture] Capturing docs/foundry-gallery.png...');
const shotGallery = await S('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(DOCS_DIR, 'foundry-gallery.png'), Buffer.from(shotGallery.data, 'base64'));

// ─────────────────────────────────────────────────────────────────────────────
// CAPTURE 2: Foundry Inspector with Hero Asset
// ─────────────────────────────────────────────────────────────────────────────
console.log('[capture] Opening inspector for hero asset...');
await evalJS(`
  const card = document.querySelector('.card[data-key="exploration-rover"]') || document.querySelector('.card[data-key="communication-satellite"]');
  if (card) card.click();
`);
await sleep(1200);

// Turn on scale check
await evalJS(`
  const scaleCb = document.getElementById('ins-scale');
  if (scaleCb && !scaleCb.checked) scaleCb.click();
`);
await sleep(600);

console.log('[capture] Capturing docs/foundry-inspector.png...');
const shotInspector = await S('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(DOCS_DIR, 'foundry-inspector.png'), Buffer.from(shotInspector.data, 'base64'));

// Close inspector
await evalJS(`document.getElementById('ins-close')?.click()`);
await sleep(400);

// ─────────────────────────────────────────────────────────────────────────────
// CAPTURE 3: Night Mode
// ─────────────────────────────────────────────────────────────────────────────
console.log('[capture] Switching to Night Mode...');
await evalJS(`if (document.documentElement.dataset.theme !== 'night') document.getElementById('theme-toggle')?.click()`);
await sleep(800);

console.log('[capture] Capturing docs/foundry-night.png...');
const shotNight = await S('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(DOCS_DIR, 'foundry-night.png'), Buffer.from(shotNight.data, 'base64'));

// ─────────────────────────────────────────────────────────────────────────────
// CAPTURE 4: Canonical 4-View Showcase Table
// ─────────────────────────────────────────────────────────────────────────────
console.log('[capture] Navigating to Canonical 4-View Showcase...');
await S('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 1750,
  deviceScaleFactor: 1.5,
  mobile: false,
});
await S('Page.navigate', { url: `${serverUrl}docs/showcase.html` });
await waitFor(`window.__CANVAS_RENDERED__ === true`, 20000);
await sleep(2500);

console.log('[capture] Capturing docs/foundry-views.png...');
const shotViews = await S('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
fs.writeFileSync(path.join(DOCS_DIR, 'foundry-views.png'), Buffer.from(shotViews.data, 'base64'));

// Clean up showcase temp file
try {
  fs.unlinkSync(path.join(DOCS_DIR, 'showcase.html'));
} catch {}

console.log('[capture] All screenshots saved to docs/ successfully!');

// Teardown
ws.close();
chrome.kill();
if (serverProcess) {
  serverProcess.kill();
}
process.exit(0);
