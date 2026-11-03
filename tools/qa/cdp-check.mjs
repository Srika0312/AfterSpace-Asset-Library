// Temporary visual + behaviour QA for the Foundry.
// Captures the gallery, hover, inspector, deep links and the live reload cycle.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9334;
const PROFILE = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-prof';
const BASE = process.env.FOUNDRY_URL || 'http://127.0.0.1:4321/';
const OUT = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-qa';
const PROJECT = 'H:\\DEV\\AFTERSPACE\\01 OPENCODE\\ASSET LIBRARY';
const PROBE = path.join(PROJECT, 'assets', 'props', 'qa-probe.js');
const TREE = path.join(PROJECT, 'assets', 'nature', 'tree.js');
const TREE_SOURCE = fs.readFileSync(TREE, 'utf8');
let treeTouched = false;

fs.mkdirSync(OUT, { recursive: true });
if (fs.existsSync(PROBE)) fs.rmSync(PROBE);

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--no-first-run',
    '--hide-scrollbars',
    '--window-size=1440,980',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(p) {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}${p}`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(250);
  }
  throw new Error('devtools not ready');
}

const version = await getJSON('/json/version');
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text);
  }
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
    errors.push(msg.params.entry.text);
  }
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
await S('Log.enable');
await S('Emulation.setDeviceMetricsOverride', { width: 1440, height: 980, deviceScaleFactor: 1, mobile: false });
await S('Page.navigate', { url: BASE });

async function evalJS(expression, awaitPromise = false) {
  const r = await S('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  if (r.exceptionDetails) {
    throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception?.description || ''));
  }
  return r.result.value;
}

async function shot(name) {
  const s = await S('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${OUT}\\${name}.png`, Buffer.from(s.data, 'base64'));
}

async function waitFor(expression, timeout = 12000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      if (await evalJS(expression)) return true;
    } catch {}
    await sleep(180);
  }
  return false;
}

const report = {};

try {
  const ready = await waitFor(`document.querySelectorAll('.card:not(.skeleton)').length >= 12 && [...document.querySelectorAll('.card-canvas')].every(c => c.width > 0)`);
  await sleep(800);

  report.initial = await evalJS(`(() => {
    const cards = [...document.querySelectorAll('.card')];
    const canvases = [...document.querySelectorAll('.card-canvas')];
    return {
      title: document.title,
      cards: cards.length,
      painted: canvases.filter(c => c.width > 0).length,
      errors: document.querySelectorAll('.card-error').length,
      filterPills: document.querySelectorAll('.pill[data-cat]').length,
      catButtons: [...document.querySelectorAll('.cat-btn')].map(b => b.dataset.cat + ':' + b.querySelector('.cat-n').textContent),
      status: document.getElementById('status-text')?.textContent,
      count: document.getElementById('shown-count')?.textContent,
      fonts: document.fonts.status,
      follow: document.getElementById('follow-toggle').classList.contains('on'),
      gridCols: getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').filter(Boolean).length,
    };
  })()`);
  report.ready = ready;

  await shot('gallery-12');

  // Hover: 150 ms descriptor, 2 s full name and a completed dwell bar.
  const rect = await evalJS(`(() => {
    const c = document.querySelector('.card[data-key="tree"]');
    const r = c.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  })()`);
  await S('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y });
  await sleep(320);
  report.hoverEarly = await evalJS(`(() => ({
    shown: document.getElementById('tooltip').classList.contains('show'),
    nameVisible: getComputedStyle(document.getElementById('tip-name')).display !== 'none',
    what: document.getElementById('tip-what').textContent,
    bar: document.getElementById('tip-bar').getBoundingClientRect().width / document.querySelector('.tip-bar').getBoundingClientRect().width
  }))()`);
  await shot('hover-what');
  await sleep(2000);
  report.hoverLate = await evalJS(`(() => ({
    nameVisible: getComputedStyle(document.getElementById('tip-name')).display !== 'none',
    name: document.getElementById('tip-name').textContent,
    what: document.getElementById('tip-what').textContent,
    bar: document.getElementById('tip-bar').getBoundingClientRect().width / document.querySelector('.tip-bar').getBoundingClientRect().width
  }))()`);
  await shot('hover-name');

  // Inspector
  await evalJS(`document.querySelector('.card[data-key="tree"]').click()`);
  await sleep(900);
  report.inspector = await evalJS(`(() => {
    const d = document.getElementById('inspector');
    const actions = document.querySelector('.ins-actions').getBoundingClientRect();
    const box = d.getBoundingClientRect();
    return {
      open: d.open,
      title: document.getElementById('ins-title').textContent,
      activeView: document.querySelector('#ins-views .view-btn.active')?.textContent,
      metaRows: document.querySelectorAll('#ins-meta .meta').length,
      tags: [...document.querySelectorAll('#ins-tags .tag')].map(t => t.textContent),
      codeLines: document.getElementById('ins-code').textContent.split('\\n').length,
      codeHasBox: document.getElementById('ins-code').textContent.includes('g.box'),
      actionsVisible: actions.bottom <= box.bottom + 1 && actions.top >= box.top,
      hash: location.hash,
      bodyScroll: document.querySelector('.ins-body').scrollHeight > document.querySelector('.ins-body').clientHeight,
    };
  })()`);
  await shot('inspector-tree');

  // Squint overlay + scale grid
  await evalJS(`document.getElementById('squint-toggle').click()`);
  await evalJS(`document.getElementById('scale-toggle').click()`);
  await sleep(450);
  report.qaOverlays = await evalJS(`(() => ({
    scale: document.getElementById('ins-stage').classList.contains('is-scale'),
    squint: document.getElementById('ins-stage').classList.contains('is-squint'),
    squintPainted: document.getElementById('squint-canvas').width > 0,
    scaleLabel: getComputedStyle(document.getElementById('scale-note')).display
  }))()`);
  await shot('inspector-scale');

  // Views
  for (const angle of [90, 180, 270, 0]) {
    await evalJS(`document.querySelector('#ins-views .view-btn[data-angle="${angle}"]').click()`);
    await sleep(360);
  }
  report.views = await evalJS(`(() => ({
    active: document.querySelector('#ins-views .view-btn.active')?.textContent,
    hash: location.hash
  }))()`);

  // Drag to orbit: 120 px × 0.6 = 72°, snapped to 90°.
  const stageRect = await evalJS(`(() => {
    const r = document.getElementById('ins-stage').getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  })()`);
  await S('Input.dispatchMouseEvent', { type: 'mousePressed', x: stageRect.x, y: stageRect.y, button: 'left', buttons: 1, clickCount: 1 });
  await S('Input.dispatchMouseEvent', { type: 'mouseMoved', x: stageRect.x + 120, y: stageRect.y, button: 'left', buttons: 1 });
  await S('Input.dispatchMouseEvent', { type: 'mouseReleased', x: stageRect.x + 120, y: stageRect.y, button: 'left', buttons: 0, clickCount: 1 });
  await sleep(600);
  report.dragOrbit = await evalJS(`(() => ({
    active: document.querySelector('#ins-views .view-btn.active')?.textContent,
    hash: location.hash,
    dragged: document.getElementById('ins-stage').classList.contains('dragged'),
    hintOpacity: getComputedStyle(document.getElementById('orbit-hint')).opacity
  }))()`);

  // Edit the open asset: the inspector must stay open and keep its 270° view.
  await evalJS(`document.querySelector('#ins-views .view-btn[data-angle="270"]').click()`);
  await sleep(450);
  fs.writeFileSync(TREE, TREE_SOURCE + '\n// qa touch\n', 'utf8');
  treeTouched = true;
  await sleep(1600);
  report.liveRefresh = await evalJS(`(() => ({
    open: document.getElementById('inspector').open,
    title: document.getElementById('ins-title').textContent,
    active: document.querySelector('#ins-views .view-btn.active')?.textContent,
    hash: location.hash,
    updated: [...document.querySelectorAll('#ins-meta .meta')].find(m => m.querySelector('dt')?.textContent === 'Updated')?.querySelector('dd')?.textContent
  }))()`);
  fs.writeFileSync(TREE, TREE_SOURCE, 'utf8');
  treeTouched = false;
  await sleep(1200);
  report.liveRefreshRestored = await evalJS(`(() => ({
    open: document.getElementById('inspector').open,
    active: document.querySelector('#ins-views .view-btn.active')?.textContent,
    hash: location.hash
  }))()`);

  // SVG endpoint
  report.svg = await evalJS(`fetch('/api/asset/tree/svg?angle=90').then(r => r.text()).then(t => ({
    ok: t.startsWith('<svg'), length: t.length, hasPath: t.includes('<path'), hasTitle: t.includes('Procedural Tree')
  }))`, true);

  // Close & search
  await evalJS(`document.getElementById('ins-close').click()`);
  await sleep(400);
  await evalJS(`document.querySelector('.pill[data-cat="all"]').click()`);
  await evalJS(`(() => { const s = document.getElementById('search'); s.value = 'silo'; s.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await sleep(600);
  report.search = await evalJS(`(() => ({
    cards: [...document.querySelectorAll('.card:not(.skeleton)')].map(c => c.dataset.key),
    note: document.getElementById('result-note').textContent
  }))()`);

  await evalJS(`(() => { const s = document.getElementById('search'); s.value = ''; s.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await sleep(500);

  // Deep link
  await S('Page.navigate', { url: BASE + '#asset/windmill/90' });
  await waitFor(`document.getElementById('inspector')?.open === true`);
  await sleep(700);
  await S('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
  report.deepLink = await evalJS(`(() => ({
    open: document.getElementById('inspector').open,
    title: document.getElementById('ins-title').textContent,
    active: document.querySelector('#ins-views .view-btn.active')?.textContent,
    hash: location.hash
  }))()`);
  await shot('deep-link');

  // Theme
  await evalJS(`document.getElementById('ins-close').click()`);
  await sleep(300);
  await evalJS(`document.getElementById('theme-toggle').click()`);
  await S('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
  await sleep(700);
  report.night = await evalJS(`(() => ({
    theme: document.documentElement.dataset.theme,
    painted: [...document.querySelectorAll('.card-canvas')].filter(c => c.width > 0).length
  }))()`);
  await shot('night-12');
  await evalJS(`document.getElementById('theme-toggle').click()`);
  await sleep(500);

  // Guide dialog
  await evalJS(`document.getElementById('nav-guide').click()`);
  await sleep(500);
  report.guide = await evalJS(`(() => {
    const g = document.getElementById('guide');
    const body = document.querySelector('.guide-body');
    return {
      open: g.open,
      heading: document.getElementById('guide-title').textContent,
      scrollable: body.scrollHeight > body.clientHeight,
      hasPrimitives: body.textContent.includes('g.cyl')
    };
  })()`);
  await shot('guide');
  await evalJS(`document.getElementById('guide-close').click()`);
  await sleep(300);

  // Live cycle: follow on should open a newly saved asset.
  report.followOn = await evalJS(`document.getElementById('follow-toggle').classList.contains('on')`);
  const probeSource = (name, color) => `import { P } from '../lib/palette.js';

export default {
  key: 'qa-probe',
  name: '${name}',
  category: 'props',
  blurb: 'Temporary probe used to verify the live reload loop.',
  what: 'a live reload probe',
  footprint: [0.8, 0.8],
  height: 0.8,
  tags: ['qa', 'probe'],
  refs: ['QA'],
  hero: 0,
  status: 'review',
  draw(g) {
    g.box({ x: 0, y: 0, z: 0, w: 0.7, d: 0.7, h: 0.7, c: ${color} });
  },
};
`;
  fs.writeFileSync(PROBE, probeSource('QA Probe', 'P.brass'), 'utf8');
  const added = await waitFor(`document.querySelectorAll('.card:not(.skeleton)').length >= 13 && !!document.querySelector('.card[data-key="qa-probe"]')`, 15000);
  await sleep(1200);
  report.liveAdd = await evalJS(`(() => ({
    added: ${added},
    cards: document.querySelectorAll('.card:not(.skeleton)').length,
    probe: !!document.querySelector('.card[data-key="qa-probe"]'),
    toast: document.querySelector('.toast .t-msg')?.textContent || null,
    inspector: document.getElementById('inspector').open ? document.getElementById('ins-title').textContent : null
  }))()`);
  await shot('live-add');

  // Break it: the card must become an isolated error, page stays alive.
  fs.writeFileSync(PROBE, 'export default { this is not javascript', 'utf8');
  const broken = await waitFor(`!!document.querySelector('.card[data-key="qa-probe"].card-error')`, 15000);
  await sleep(600);
  report.liveBreak = await evalJS(`(() => ({
    broken: ${broken},
    errorCard: !!document.querySelector('.card[data-key="qa-probe"].card-error'),
    errorLabel: document.querySelector('.card[data-key="qa-probe"] .err-label')?.textContent,
    otherCards: document.querySelectorAll('.card:not(.skeleton):not(.card-error)').length,
    inspectorOpen: document.getElementById('inspector').open,
    toast: [...document.querySelectorAll('.toast .t-msg')].map(t => t.textContent)
  }))()`);
  await shot('live-error');

  // Remove it: back to the clean twelve.
  fs.rmSync(PROBE);
  const removed = await waitFor(`document.querySelectorAll('.card:not(.skeleton)').length === 12 && !document.querySelector('.card[data-key="qa-probe"]')`, 15000);
  await sleep(600);
  report.liveRemove = await evalJS(`(() => ({
    removed: ${removed},
    cards: document.querySelectorAll('.card:not(.skeleton)').length,
    probe: !!document.querySelector('.card[data-key="qa-probe"]')
  }))()`);

  await shot('gallery-final');
  report.final = await evalJS(`(() => ({
    cards: document.querySelectorAll('.card:not(.skeleton)').length,
    painted: [...document.querySelectorAll('.card-canvas')].filter(c => c.width > 0).length,
    status: document.getElementById('status-text').textContent,
    theme: document.documentElement.dataset.theme
  }))()`);
  report.consoleErrors = errors;
} finally {
  if (fs.existsSync(PROBE)) fs.rmSync(PROBE);
  if (treeTouched) fs.writeFileSync(TREE, TREE_SOURCE, 'utf8');
  console.log(JSON.stringify(report, null, 2));
  ws.close();
  chrome.kill();
  process.exit(0);
}
