// Temporary final screenshots for docs and handoff.
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9336;
const PROFILE = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-final-prof';
const BASE = process.env.FOUNDRY_URL || 'http://127.0.0.1:4321/';
const OUT = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-qa';
fs.mkdirSync(OUT, { recursive: true });

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
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails?.exception?.description);
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
await S('Emulation.setDeviceMetricsOverride', { width: 1440, height: 980, deviceScaleFactor: 1, mobile: false });
await S('Page.navigate', { url: BASE });

async function evalJS(expression, awaitPromise = false) {
  const r = await S('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
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

await waitFor(`document.querySelectorAll('.card:not(.skeleton)').length >= 12 && [...document.querySelectorAll('.card-canvas')].every(c => c.width > 0)`);
await sleep(1000);
await S('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
// Clear any persisted theme choice from earlier QA.
await evalJS(`if (document.documentElement.dataset.theme !== 'day') document.getElementById('theme-toggle').click()`);
await sleep(600);

const clean = await evalJS(`(() => ({
  cards: document.querySelectorAll('.card:not(.skeleton)').length,
  cols: getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').filter(Boolean).length,
  toasts: document.querySelectorAll('.toast').length,
  tooltip: document.getElementById('tooltip').classList.contains('show'),
  theme: document.documentElement.dataset.theme
}))()`);
await shot('final-gallery');

await evalJS(`document.querySelector('.card[data-key="tree"]').click()`);
await sleep(900);
await shot('final-inspector');
const inspector = await evalJS(`(() => ({
  title: document.getElementById('ins-title').textContent,
  active: document.querySelector('#ins-views .view-btn.active')?.textContent,
  actionsVisible: (() => {
    const a = document.querySelector('.ins-actions').getBoundingClientRect();
    const d = document.getElementById('inspector').getBoundingClientRect();
    return a.bottom <= d.bottom + 1;
  })()
}))()`);
await evalJS(`document.getElementById('ins-close').click()`);
await sleep(350);

await evalJS(`document.getElementById('nav-guide').click()`);
await sleep(500);
await shot('final-guide');
const guide = await evalJS(`(() => {
  const g = document.getElementById('guide');
  const r = g.getBoundingClientRect();
  return { open: g.open, height: Math.round(r.height), viewport: window.innerHeight };
})()`);
await evalJS(`document.getElementById('guide-close').click()`);
await sleep(300);

await evalJS(`document.getElementById('theme-toggle').click()`);
await S('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
await sleep(700);
await shot('final-night');

console.log(JSON.stringify({ clean, inspector, guide, errors }, null, 2));
ws.close();
chrome.kill();
process.exit(0);
