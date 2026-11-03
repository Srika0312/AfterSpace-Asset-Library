// The Afterspace — Foundry application shell

import { CATEGORIES, CATEGORY_ORDER } from '/assets/lib/palette.js';
import { fetchLibrary, importRegistry, connectEvents } from './api.js';
import { paintCanvas } from './scene.js';
import { createHoverTooltip } from './hover.js';
import { Inspector } from './inspector.js';

const $ = (id) => document.getElementById(id);
const norm = (a) => ((a % 360) + 360) % 360;
const catColor = (cat) => CATEGORIES[cat]?.color || '#8C7B66';
const catLabel = (cat) => CATEGORIES[cat]?.label || cat.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
const catShort = (cat) => CATEGORIES[cat]?.short || catLabel(cat);

const state = {
  meta: [],
  modules: new Map(),
  visible: [],
  filter: 'all',
  status: 'all',
  search: '',
  sort: 'category',
  theme: 'day',
  follow: true,
  selected: null,
  loading: true,
  refreshing: false,
  pendingRefresh: false,
  signature: '',
  fresh: new Set(),
  observer: null,
  suppressHashPush: false,
  lastRefresh: 0,
};

const el = {
  grid: $('grid'),
  filters: $('filters'),
  cats: $('cat-list'),
  allCount: $('all-count'),
  shownCount: $('shown-count'),
  pageTitle: $('page-title'),
  crumb: $('crumb'),
  subNote: $('sub-note'),
  resultNote: $('result-note'),
  search: $('search'),
  searchWrap: $('search-wrap'),
  searchClear: $('search-clear'),
  sort: $('sort'),
  statusFilter: $('status-filter'),
  status: $('status'),
  statusText: $('status-text'),
  statusMeta: $('status-meta'),
  railMeta: $('rail-meta'),
  navCount: $('nav-count'),
  rail: $('rail'),
  scrim: $('scrim'),
  menuBtn: $('menu-btn'),
  themeBtn: $('theme-toggle'),
  followBtn: $('follow-toggle'),
  guide: $('guide'),
  toasts: $('toasts'),
};

const hover = createHoverTooltip();

const inspector = new Inspector({
  getTheme: () => state.theme,
  toast,
  onClosed: handleInspectorClosed,
  onAngle: handleAngle,
});

let changeTimer = 0;
let searchTimer = 0;
let resizeTimer = 0;
let eventSource = null;
let pollTimer = null;

// ── Boot ─────────────────────────────────────────────────────────────────────

init();

async function init() {
  try {
    const savedTheme = localStorage.getItem('as.theme');
    if (savedTheme === 'night') state.theme = 'night';
  } catch {
    /* ignore */
  }
  try {
    state.follow = localStorage.getItem('as.follow') !== '0';
  } catch {
    /* ignore */
  }
  try {
    const savedSort = localStorage.getItem('as.sort');
    if (['newest', 'az', 'category'].includes(savedSort)) state.sort = savedSort;
    const savedStatus = localStorage.getItem('as.status');
    if (['all', 'review', 'approved'].includes(savedStatus)) state.status = savedStatus;
  } catch {
    /* ignore */
  }

  applyTheme(state.theme);
  el.sort.value = state.sort;
  el.statusFilter.value = state.status;
  syncFollow();

  el.subNote.textContent = 'warm habitat palette · 1 tile = 2 m';
  renderSkeletons(12);
  bindEvents();
  await refresh({ initial: true });
  applyHash();
  connectLive();
}

// ── Data ─────────────────────────────────────────────────────────────────────

async function refresh({ initial = false, reason = '' } = {}) {
  if (state.refreshing) {
    state.pendingRefresh = true;
    return;
  }
  state.refreshing = true;
  try {
    const [lib, modules] = await Promise.all([fetchLibrary(), importRegistry()]);
    const nextMeta = Array.isArray(lib.assets) ? lib.assets : [];
    const nextSignature = nextMeta.map((m) => `${m.key}:${m.mtime}`).join('|');

    if (!initial && nextSignature === state.signature) {
      setStatus('live');
      return;
    }

    const prevMeta = new Map(state.meta.map((m) => [m.key, m]));
    const prevKeys = new Set(state.meta.map((m) => m.key));
    const nextKeys = new Set(nextMeta.map((m) => m.key));
    const added = initial ? [] : nextMeta.filter((m) => !prevKeys.has(m.key));
    const changed = initial ? [] : nextMeta.filter((m) => prevMeta.has(m.key) && prevMeta.get(m.key).mtime !== m.mtime);
    const removed = initial ? [] : state.meta.filter((m) => !nextKeys.has(m.key));

    const focusedKey = document.activeElement?.closest?.('.card')?.dataset.key || null;

    state.meta = nextMeta;
    state.modules = new Map(modules.filter((a) => a && a.key).map((a) => [a.key, a]));
    state.signature = nextSignature;
    state.loading = false;
    state.lastRefresh = Date.now();

    rebuildNav();
    renderGrid();
    setStatus('live');
    updateRailMeta();

    if (focusedKey) {
      const card = el.grid.querySelector(`.card[data-key="${cssEscape(focusedKey)}"]`);
      card?.focus({ preventScroll: true });
    }

    if (!initial) {
      const openMeta = state.selected ? state.meta.find((m) => m.key === state.selected) : null;
      if (openMeta) {
        const module = state.modules.get(openMeta.key);
        if (module) inspector.refresh(module, openMeta);
        else {
          toast(`"${openMeta.name}" failed to load. Open its card for the error.`, { error: true, timeout: 8000 });
          suppressNextClosePush();
          inspector.close();
        }
      }
      announce({ added, changed, removed });
    }
  } catch (err) {
    setStatus('offline');
    if (initial) renderFatal(err);
    else toast(`Update failed: ${err.message}`, { error: true, timeout: 7000 });
  } finally {
    state.refreshing = false;
    if (state.pendingRefresh) {
      state.pendingRefresh = false;
      refresh({ reason: 'queued' });
    }
  }
}

function connectLive() {
  if (eventSource) eventSource.close();
  eventSource = connectEvents({
    onStatus: (s) => {
      setStatus(s);
      if (s === 'offline') startPolling();
      else stopPolling();
      if (s === 'live' && Date.now() - state.lastRefresh > 5000 && !state.loading) {
        refresh({ reason: 'reconnect' });
      }
    },
    onEvent: (event) => {
      if (event.type === 'hello') setStatus('live');
      if (event.type === 'change') {
        clearTimeout(changeTimer);
        changeTimer = setTimeout(() => refresh({ reason: 'sse' }), 160);
      }
    },
  });
}

function startPolling() {
  if (pollTimer) return;
  pollTimer = setInterval(() => {
    if (document.visibilityState === 'visible') refresh({ reason: 'poll' });
  }, 5000);
}
function stopPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = null;
}

// ── Rendering ────────────────────────────────────────────────────────────────

function renderSkeletons(n) {
  el.grid.setAttribute('aria-busy', 'true');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const card = document.createElement('div');
    card.className = 'card skeleton';
    card.innerHTML = '<div class="sk-stage"></div><div class="sk-body"><div class="sk-line w85"></div><div class="sk-line w60"></div></div>';
    frag.append(card);
  }
  el.grid.replaceChildren(frag);
}

function renderGrid() {
  if (state.observer) state.observer.disconnect();
  hover.stop();
  const items = getVisible();
  state.visible = items;

  if (!state.meta.length) {
    el.grid.replaceChildren(emptyState('No assets yet', 'Create a file in assets/ and it will appear here.', 'Read the guide', () => el.guide.showModal()));
  } else if (!items.length) {
    el.grid.replaceChildren(emptyState('No assets match', 'Try another search, category or review status.', 'Clear filters', clearFilters));
  } else {
    const frag = document.createDocumentFragment();
    for (const meta of items) frag.append(createCard(meta, state.modules.get(meta.key)));
    el.grid.replaceChildren(frag);
    observeCards();
  }

  el.grid.setAttribute('aria-busy', 'false');
  updateCounts(items);
  syncActive();
}

function createCard(meta, module) {
  const color = catColor(meta.category);
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.key = meta.key;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Inspect ${meta.name}, ${meta.categoryLabel}`);

  if (meta.errors?.length || !module) {
    card.classList.add('card-error');
    card.innerHTML = `<div class="card-stage"><span class="err-label">${meta.hasPreview ? 'Draw error' : 'Load error'}</span></div>
      <div class="card-body"><div class="card-line"><h3 class="card-name"></h3></div><p class="card-blurb"></p></div>`;
    card.querySelector('.card-name').textContent = meta.name;
    card.querySelector('.card-blurb').textContent = (meta.errors?.[0] || 'Asset module missing').split('\n')[0];
    card.addEventListener('click', () => {
      toast((meta.errors?.[0] || 'Asset module missing').split('\n')[0], { error: true, timeout: 9000 });
    });
    card.style.setProperty('--cat', color);
    return card;
  }

  card.innerHTML = `<div class="card-stage">
      <canvas class="card-canvas"></canvas>
      <span class="badge"></span>
      ${meta.status === 'approved' ? '<span class="card-check" aria-hidden="true">✓</span>' : ''}
    </div>
    <div class="card-body">
      <div class="card-line"><h3 class="card-name"></h3></div>
      <p class="card-blurb"></p>
    </div>`;

  const badge = card.querySelector('.badge');
  badge.textContent = catShort(meta.category);
  badge.title = meta.categoryLabel;
  badge.style.setProperty('--cat', color);
  card.style.setProperty('--cat', color);
  card.querySelector('.card-name').textContent = meta.name;
  card.querySelector('.card-blurb').textContent = meta.blurb;
  card._asset = module;
  card._meta = meta;

  const hasError = meta.errors?.length > 0;
  const hasWarning = !hasError && meta.warnings?.length > 0;
  if (hasError || hasWarning || state.fresh.has(meta.key)) {
    const dot = document.createElement('span');
    dot.className = 'card-dot' + (hasError ? ' err' : hasWarning ? ' warn' : '');
    dot.title = hasError ? meta.errors.join(' · ') : hasWarning ? meta.warnings.join(' · ') : 'New asset';
    card.querySelector('.card-stage').append(dot);
  }

  card.addEventListener('mouseenter', () => {
    hover.start(card, { asset: module, meta, color });
  });
  card.addEventListener('mousemove', (e) => hover.move(e.clientX, e.clientY));
  card.addEventListener('mouseleave', () => hover.stop());
  card.addEventListener('click', () => openAsset(meta, meta.hero, { history: true }));
  return card;
}

function observeCards() {
  const cards = [...el.grid.querySelectorAll('.card:not(.card-error)')];
  if (!('IntersectionObserver' in window)) {
    for (const card of cards) paintCard(card);
    return;
  }
  if (state.observer) state.observer.disconnect();
  state.observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        paintCard(entry.target);
        state.observer.unobserve(entry.target);
      }
    },
    { rootMargin: '200px 0px' },
  );
  for (const card of cards) state.observer.observe(card);
}

function paintCard(card) {
  if (!card._asset || card.dataset.painted === '1') return;
  const canvas = card.querySelector('.card-canvas');
  if (!canvas) return;
  const ok = paintCanvas(canvas, card._asset, {
    angle: card._meta.hero ?? 0,
    theme: state.theme,
    plate: true,
    pad: 10,
    originY: 0.74,
  });
  if (ok) card.dataset.painted = '1';
}

function repaintCards({ reset = true } = {}) {
  for (const card of el.grid.querySelectorAll('.card[data-painted]')) {
    if (reset) card.dataset.painted = '0';
    paintCard(card);
  }
}

function updateCounts(items) {
  const total = state.meta.length;
  const shown = items.length;
  el.shownCount.textContent = String(shown);
  el.allCount.textContent = String(total);
  el.navCount.textContent = String(total);
  el.statusMeta.textContent = `${total} asset${total === 1 ? '' : 's'}`;

  const label = state.filter === 'all' ? 'All assets' : catLabel(state.filter);
  el.pageTitle.textContent = label;
  el.crumb.textContent = label;

  if (state.search) {
    const q = state.search.length > 18 ? state.search.slice(0, 18) + '…' : state.search;
    el.resultNote.textContent = `${shown} result${shown === 1 ? '' : 's'} for “${q}”`;
  } else {
    el.resultNote.textContent = `${shown} shown`;
  }
}

function rebuildNav() {
  const counts = new Map();
  for (const meta of state.meta) counts.set(meta.category, (counts.get(meta.category) || 0) + 1);

  const cats = CATEGORY_ORDER.filter((c) => counts.has(c)).concat(
    [...counts.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  );

  const frag = document.createDocumentFragment();
  for (const cat of cats) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cat-btn' + (state.filter === cat ? ' active' : '');
    btn.dataset.cat = cat;
    btn.style.setProperty('--cat', catColor(cat));
    btn.innerHTML = '<span class="cat-dot"></span><span class="cat-name"></span><span class="cat-n"></span>';
    btn.querySelector('.cat-name').textContent = catShort(cat);
    btn.title = catLabel(cat);
    btn.querySelector('.cat-n').textContent = String(counts.get(cat));
    btn.addEventListener('click', () => {
      setFilter(cat);
      if (window.innerWidth <= 1060) toggleRail(false);
    });
    frag.append(btn);
  }
  el.cats.replaceChildren(frag);

  const existing = [...el.filters.querySelectorAll('.pill[data-cat]')];
  for (const pill of existing) {
    if (pill.dataset.cat !== 'all') pill.remove();
  }
  const spacer = el.filters.querySelector('.spacer');
  for (const cat of cats) {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'pill' + (state.filter === cat ? ' active' : '');
    pill.dataset.cat = cat;
    pill.style.setProperty('--cat', catColor(cat));
    pill.innerHTML = '<span class="dot"></span><span class="p-label"></span><span class="n"></span>';
    pill.querySelector('.p-label').textContent = catShort(cat);
    pill.title = catLabel(cat);
    pill.querySelector('.n').textContent = String(counts.get(cat));
    pill.addEventListener('click', () => setFilter(cat));
    el.filters.insertBefore(pill, spacer);
  }

  const allPill = el.filters.querySelector('.pill[data-cat="all"]');
  allPill.classList.toggle('active', state.filter === 'all');
  el.allCount.textContent = String(state.meta.length);
}

function syncActive() {
  for (const b of el.cats.querySelectorAll('.cat-btn')) {
    b.classList.toggle('active', b.dataset.cat === state.filter);
  }
  for (const p of el.filters.querySelectorAll('.pill[data-cat]')) {
    p.classList.toggle('active', p.dataset.cat === state.filter);
  }
}

function emptyState(title, text, buttonLabel, onClick) {
  const box = document.createElement('div');
  box.className = 'empty';
  box.innerHTML = `<div class="empty-ring">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="8.5" ry="4" transform="rotate(-24 12 12)"/>
        <circle cx="19" cy="7" r="1.6" fill="currentColor" stroke="none"/>
      </svg>
    </div><h2></h2><p></p><button type="button"></button>`;
  box.querySelector('h2').textContent = title;
  box.querySelector('p').textContent = text;
  const btn = box.querySelector('button');
  btn.textContent = buttonLabel;
  btn.addEventListener('click', onClick);
  return box;
}

// ── Filtering / sorting ──────────────────────────────────────────────────────

function getVisible() {
  const q = state.search.trim().toLowerCase();
  let items = state.meta.filter((m) => {
    if (state.filter !== 'all' && m.category !== state.filter) return false;
    if (state.status !== 'all' && m.status !== state.status) return false;
    if (q && score(m, q) === 0) return false;
    return true;
  });

  if (q) {
    const scores = new Map(items.map((m) => [m.key, score(m, q)]));
    items = items.slice().sort((a, b) => scores.get(b.key) - scores.get(a.key) || a.name.localeCompare(b.name));
  } else if (state.sort === 'newest') {
    items = items.slice().sort((a, b) => b.mtime - a.mtime || a.name.localeCompare(b.name));
  } else if (state.sort === 'az') {
    items = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === 'category') {
    const order = new Map(CATEGORY_ORDER.map((c, i) => [c, i]));
    items = items.slice().sort(
      (a, b) => (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99) || a.name.localeCompare(b.name),
    );
  }
  return items;
}

function score(meta, q) {
  const terms = q.split(/\s+/).filter(Boolean);
  let total = 0;
  const name = meta.name.toLowerCase();
  const key = meta.key.toLowerCase();
  const what = (meta.what || '').toLowerCase();
  const tags = (meta.tags || []).join(' ').toLowerCase();
  const blurb = (meta.blurb || '').toLowerCase();
  for (const term of terms) {
    let best = 0;
    if (name.startsWith(term)) best = 100;
    else if (name.includes(term)) best = 72;
    else if (key.includes(term)) best = 62;
    else if (what.includes(term)) best = 50;
    else if (tags.includes(term)) best = 40;
    else if (blurb.includes(term)) best = 20;
    if (!best) return 0;
    total += best;
  }
  return total;
}

function setFilter(cat) {
  state.filter = cat;
  state.selected = state.selected || null;
  renderGrid();
}

function clearFilters() {
  state.filter = 'all';
  state.status = 'all';
  state.search = '';
  el.search.value = '';
  el.searchWrap.classList.remove('has-value');
  el.statusFilter.value = 'all';
  renderGrid();
}

// ── Inspector / routing ──────────────────────────────────────────────────────

function openAsset(meta, angle = meta.hero, { history = true } = {}) {
  const module = state.modules.get(meta.key);
  if (!module) {
    toast(meta.errors?.[0] || 'Asset failed to load', { error: true, timeout: 8000 });
    return;
  }
  state.selected = meta.key;
  inspector.open(module, meta, angle ?? meta.hero);
  if (history) {
    const a = Math.round(norm(Number(angle ?? meta.hero) || 0));
    const suffix = a ? `/${a}` : '';
    historyPush(`#asset/${encodeURIComponent(meta.key)}${suffix}`, { key: meta.key, angle: a });
  }
}

function closeInspector({ history = true } = {}) {
  if (!inspector.isOpen) return;
  state.suppressHashPush = !history;
  inspector.close();
}

function handleInspectorClosed() {
  state.selected = null;
  if (state.suppressHashPush) {
    state.suppressHashPush = false;
    return;
  }
  if (location.hash.startsWith('#asset/')) {
    historyPush(location.pathname + location.search, {});
  }
}

function handleAngle(angle) {
  if (!state.selected) return;
  const a = Math.round(norm(angle)) % 360;
  const suffix = a ? `/${a}` : '';
  historyReplace(`#asset/${encodeURIComponent(state.selected)}${suffix}`, { key: state.selected, angle: a });
}

function suppressNextClosePush() {
  state.suppressHashPush = true;
}

function parseHash() {
  const match = location.hash.match(/^#asset\/([^/]+)(?:\/(\d+))?/);
  if (!match) return null;
  return { key: decodeURIComponent(match[1]), angle: match[2] != null ? Number(match[2]) : null };
}

function applyHash() {
  const parsed = parseHash();
  if (!parsed) {
    if (inspector.isOpen) closeInspector({ history: false });
    return;
  }
  const meta = state.meta.find((m) => m.key === parsed.key);
  if (!meta) {
    toast(`No asset called “${parsed.key}”`, { error: true });
    return;
  }
  openAsset(meta, parsed.angle ?? meta.hero, { history: false });
}

function historyPush(url, data) {
  try {
    window.history.pushState(data, '', url);
  } catch {
    /* noop */
  }
}
function historyReplace(url, data) {
  try {
    window.history.replaceState(data, '', url);
  } catch {
    /* noop */
  }
}

// ── Live change announcements ────────────────────────────────────────────────

function announce({ added, changed, removed }) {
  if (added.length) {
    for (const m of added) state.fresh.add(m.key);
    setTimeout(() => {
      for (const m of added) state.fresh.delete(m.key);
      for (const m of added) {
        const card = el.grid.querySelector(`.card[data-key="${cssEscape(m.key)}"]`);
        card?.querySelector('.card-dot:not(.warn):not(.err)')?.remove();
      }
    }, 12_000);

    const first = added[0];
    toast(`New asset: ${first.name}`, {
      action: 'View',
      onAction: () => openAsset(first, first.hero, { history: true }),
      timeout: 7000,
    });

    if (
      state.follow &&
      !inspector.isOpen &&
      !location.hash.startsWith('#asset/') &&
      document.visibilityState === 'visible' &&
      !isTyping()
    ) {
      setTimeout(() => openAsset(first, first.hero, { history: true }), 500);
    }
  }

  if (changed.length === 1) toast(`${changed[0].name} updated`);
  else if (changed.length > 1) toast(`${changed.length} assets updated`);

  if (removed.length === 1) toast(`${removed[0].name} removed`, { error: true });
  else if (removed.length > 1) toast(`${removed.length} assets removed`, { error: true });
}

function isTyping() {
  const a = document.activeElement;
  return a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.tagName === 'SELECT' || a.isContentEditable);
}

// ── Status / theme / follow ─────────────────────────────────────────────────

function setStatus(mode) {
  el.status.className = 'status ' + (mode === 'live' ? 'live' : mode === 'offline' ? 'offline' : '');
  el.statusText.textContent = mode === 'live' ? 'watching' : mode === 'offline' ? 'reconnecting' : 'connecting…';
  updateRailMeta();
}

function updateRailMeta() {
  const port = location.port || (location.protocol === 'https:' ? '443' : '80');
  el.railMeta.textContent = `port ${port} · ${state.meta.length} file${state.meta.length === 1 ? '' : 's'}`;
}

function applyTheme(theme) {
  state.theme = theme === 'night' ? 'night' : 'day';
  document.documentElement.dataset.theme = state.theme;
  try {
    localStorage.setItem('as.theme', state.theme);
  } catch {
    /* ignore */
  }
  const color = state.theme === 'night' ? '#12181B' : '#F7F4EC';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
  repaintCards();
  if (inspector.isOpen) {
    inspector.paint();
    if (inspector.squintOn) inspector.paintSquint();
  }
}

function syncFollow() {
  el.followBtn.classList.toggle('on', state.follow);
  el.followBtn.setAttribute('aria-pressed', String(state.follow));
}

function toggleRail(open) {
  el.rail.classList.toggle('open', open);
  el.scrim.classList.toggle('show', open);
  el.menuBtn.setAttribute('aria-expanded', String(open));
}

// ── Toasts ───────────────────────────────────────────────────────────────────

function toast(message, opts = {}) {
  const box = document.createElement('div');
  box.className = 'toast';
  box.innerHTML = `<span class="t-dot${opts.error ? ' err' : ''}"></span><span class="t-msg"></span>`;
  box.querySelector('.t-msg').textContent = message;

  let timer = 0;
  const dismiss = () => {
    clearTimeout(timer);
    if (box.classList.contains('out')) return;
    box.classList.add('out');
    setTimeout(() => box.remove(), 220);
  };

  if (opts.action && opts.onAction) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = opts.action;
    btn.addEventListener('click', () => {
      opts.onAction();
      dismiss();
    });
    box.append(btn);
  }

  el.toasts.append(box);
  timer = setTimeout(dismiss, opts.timeout ?? 4200);
  box.addEventListener('mouseenter', () => clearTimeout(timer));
  return box;
}

// ── Fatal error ──────────────────────────────────────────────────────────────

function renderFatal(err) {
  el.grid.setAttribute('aria-busy', 'false');
  const box = emptyState('Could not reach the Foundry', err.message || 'The local server is not responding.', 'Retry', () => location.reload());
  el.grid.replaceChildren(box);
}

// ── Events ───────────────────────────────────────────────────────────────────

function bindEvents() {
  el.search.addEventListener('input', () => {
    const value = el.search.value;
    el.searchWrap.classList.toggle('has-value', Boolean(value));
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = value.trim().toLowerCase();
      renderGrid();
    }, 90);
  });
  el.search.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      el.grid.querySelector('.card')?.focus();
    }
  });
  el.searchClear.addEventListener('click', () => {
    el.search.value = '';
    el.searchWrap.classList.remove('has-value');
    state.search = '';
    el.search.focus();
    renderGrid();
  });

  el.sort.addEventListener('change', () => {
    state.sort = el.sort.value;
    try {
      localStorage.setItem('as.sort', state.sort);
    } catch {
      /* ignore */
    }
    renderGrid();
  });

  el.statusFilter.addEventListener('change', () => {
    state.status = el.statusFilter.value;
    try {
      localStorage.setItem('as.status', state.status);
    } catch {
      /* ignore */
    }
    renderGrid();
  });

  el.filters.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill[data-cat]');
    if (!pill) return;
    setFilter(pill.dataset.cat);
  });

  el.themeBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'night' ? 'day' : 'night');
  });

  el.followBtn.addEventListener('click', () => {
    state.follow = !state.follow;
    syncFollow();
    try {
      localStorage.setItem('as.follow', state.follow ? '1' : '0');
    } catch {
      /* ignore */
    }
    toast(state.follow ? 'Follow edits on' : 'Follow edits off');
  });

  el.menuBtn.addEventListener('click', () => toggleRail(!el.rail.classList.contains('open')));
  el.scrim.addEventListener('click', () => toggleRail(false));

  $('nav-library').addEventListener('click', () => {
    toggleRail(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('nav-guide').addEventListener('click', () => {
    toggleRail(false);
    el.guide.showModal();
    document.body.classList.add('modal-open');
  });
  $('guide-close').addEventListener('click', () => el.guide.close());
  el.guide.addEventListener('click', (e) => {
    if (e.target === el.guide) el.guide.close();
  });
  el.guide.addEventListener('close', () => {
    if (!inspector.isOpen) document.body.classList.remove('modal-open');
  });

  el.grid.addEventListener('keydown', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
      return;
    }
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const cards = [...el.grid.querySelectorAll('.card')];
    const index = cards.indexOf(card);
    if (index < 0) return;
    const cols = Math.max(1, getComputedStyle(el.grid).gridTemplateColumns.split(' ').filter(Boolean).length);
    let next = index;
    if (e.key === 'ArrowRight') next = index + 1;
    else if (e.key === 'ArrowLeft') next = index - 1;
    else if (e.key === 'ArrowDown') next = index + cols;
    else if (e.key === 'ArrowUp') next = index - cols;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = cards.length - 1;
    if (cards[next]) {
      e.preventDefault();
      cards[next].focus();
    }
  });

  window.addEventListener('popstate', () => applyHash());
  window.addEventListener('hashchange', () => {
    // pushState does not fire hashchange, but manual edits / external links do.
    applyHash();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && !isTyping() && !inspector.isOpen) {
      e.preventDefault();
      el.search.focus();
      el.search.select();
    } else if (e.key === 'Escape' && el.rail.classList.contains('open')) {
      toggleRail(false);
    }
  });

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => repaintCards(), 180);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Date.now() - state.lastRefresh > 15_000) {
      refresh({ reason: 'visible' });
    }
  });
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}
