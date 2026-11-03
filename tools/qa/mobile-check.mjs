// Temporary mobile QA for the Foundry.
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9335;
const PROFILE = 'C:\\Users\\SRIKANTH\\AppData\\Local\\Temp\\opencode\\foundry-mobile-prof';
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
await S('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await S('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
await S('Page.navigate', { url: BASE });

async function evalJS(expression, awaitPromise = false) {
  const r = await S('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception?.description || ''));
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
  await waitFor(`document.querySelectorAll('.card:not(.skeleton)').length >= 12`);
  await sleep(900);
  report.gallery = await evalJS(`(() => ({
    cards: document.querySelectorAll('.card:not(.skeleton)').length,
    painted: [...document.querySelectorAll('.card-canvas')].filter(c => c.width > 0).length,
    cols: getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').filter(Boolean).length,
    menuVisible: getComputedStyle(document.getElementById('menu-btn')).display !== 'none',
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    railOffscreen: document.getElementById('rail').getBoundingClientRect().right <= 0,
    innerWidth: window.innerWidth
  }))()`);
  await shot('mobile-gallery');

  await evalJS(`document.getElementById('menu-btn').click()`);
  await sleep(350);
  report.rail = await evalJS(`(() => ({
    open: document.getElementById('rail').classList.contains('open'),
    onscreen: document.getElementById('rail').getBoundingClientRect().left >= 0,
    scrim: document.getElementById('scrim').classList.contains('show')
  }))()`);
  await shot('mobile-rail');
  await evalJS(`document.getElementById('scrim').click()`);
  await sleep(250);

  await evalJS(`document.querySelector('.card[data-key="tree"]').click()`);
  await sleep(800);
  report.inspector = await evalJS(`(() => {
    const d = document.getElementById('inspector');
    const r = d.getBoundingClientRect();
    const actions = document.querySelector('.ins-actions').getBoundingClientRect();
    return {
      open: d.open,
      width: Math.round(r.width),
      fits: r.left >= 0 && r.right <= window.innerWidth + 1,
      actionsVisible: actions.top >= r.top && actions.bottom <= r.bottom + 1,
      stage: Math.round(document.getElementById('ins-stage').getBoundingClientRect().height),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1
    };
  })()`);
  await shot('mobile-inspector');

  await evalJS(`document.getElementById('squint-toggle').click()`);
  await evalJS(`document.getElementById('scale-toggle').click()`);
  await sleep(400);
  await shot('mobile-scale');
  await evalJS(`document.getElementById('ins-close').click()`);
  await sleep(300);

  report.consoleErrors = errors;
} finally {
  console.log(JSON.stringify(report, null, 2));
  ws.close();
  chrome.kill();
  process.exit(0);
}
