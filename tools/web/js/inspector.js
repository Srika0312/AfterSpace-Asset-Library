// The Afterspace — inspector dialog: four views, free orbit, Canvas 2D export, QA overlays.

import { assetToCanvasCode } from '/assets/lib/canvas.js';
import { CATEGORIES } from '/assets/lib/palette.js';
import { paintCanvas, paintSquint } from './scene.js';
import { copyText, downloadText, fetchSource } from './api.js';

const norm = (a) => ((a % 360) + 360) % 360;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));

function timeAgo(ms) {
  if (!ms) return '—';
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

export class Inspector {
  constructor({ getTheme, toast, onClosed, onAngle }) {
    this.opts = { getTheme, toast, onClosed, onAngle };
    this.dialog = document.getElementById('inspector');
    this.stage = document.getElementById('ins-stage');
    this.canvas = document.getElementById('ins-canvas');
    this.squintCanvas = document.getElementById('squint-canvas');
    this.titleEl = document.getElementById('ins-title');
    this.catEl = document.getElementById('ins-cat');
    this.subEl = document.getElementById('ins-sub');
    this.metaEl = document.getElementById('ins-meta');
    this.tagsEl = document.getElementById('ins-tags');
    this.codeEl = document.getElementById('ins-code');
    this.viewBtns = [...document.querySelectorAll('#ins-views .view-btn')];
    this.scaleBtn = document.getElementById('scale-toggle');
    this.squintBtn = document.getElementById('squint-toggle');
    this.sourceBtn = document.getElementById('ins-source');

    this.asset = null;
    this.meta = null;
    this.angle = 0;
    this.target = 0;
    this.animRaf = 0;
    this.motionRaf = 0;
    this.motionLast = 0;
    this.dragging = false;
    this.dragStartX = 0;
    this.dragStartAngle = 0;
    this.scaleOn = false;
    this.squintOn = false;
    this.suppressAngleNotify = false;

    this.bind();
  }

  get isOpen() {
    return this.dialog.open;
  }

  get currentKey() {
    return this.asset?.key || this.meta?.key || null;
  }

  bind() {
    document.getElementById('ins-close').addEventListener('click', () => this.dialog.close());
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) this.dialog.close();
    });
    this.dialog.addEventListener('close', () => {
      this.stopMotion();
      document.body.classList.remove('modal-open');
      this.opts.onClosed?.();
    });
    this.dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.step(-90);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.step(90);
      } else if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        this.setAngle((Number(e.key) - 1) * 90, { animate: true, notify: true });
      }
    });

    for (const btn of this.viewBtns) {
      btn.addEventListener('click', () => {
        this.setAngle(Number(btn.dataset.angle), { animate: true, notify: true });
      });
    }

    // Drag to orbit
    this.stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      this.dragging = true;
      this.dragStartX = e.clientX;
      this.dragStartAngle = this.angle;
      this.cancelAnim();
      this.stage.classList.add('dragging', 'dragged');
      this.stage.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    });
    this.stage.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      this.angle = this.dragStartAngle + (e.clientX - this.dragStartX) * 0.6;
      this.updateChips();
      this.paint();
    });
    const endDrag = (e) => {
      if (!this.dragging) return;
      this.dragging = false;
      this.stage.classList.remove('dragging');
      try {
        this.stage.releasePointerCapture?.(e.pointerId);
      } catch {
        /* noop */
      }
      const snapped = Math.round(this.angle / 90) * 90;
      this.setAngle(snapped, { animate: true, notify: true });
    };
    this.stage.addEventListener('pointerup', endDrag);
    this.stage.addEventListener('pointercancel', endDrag);

    document.getElementById('copy-canvas').addEventListener('click', () => this.copyCanvas());
    document.getElementById('download-png').addEventListener('click', () => this.downloadPNG());
    document.getElementById('copy-module').addEventListener('click', () => this.copyModule());
    document.getElementById('copy-code').addEventListener('click', () => this.copySnippet());
    this.sourceBtn.addEventListener('click', () => this.openSource());

    this.scaleBtn.addEventListener('click', () => {
      this.scaleOn = !this.scaleOn;
      this.scaleBtn.setAttribute('aria-pressed', String(this.scaleOn));
      this.stage.classList.toggle('is-scale', this.scaleOn);
      this.paint();
    });
    this.squintBtn.addEventListener('click', () => {
      this.squintOn = !this.squintOn;
      this.squintBtn.setAttribute('aria-pressed', String(this.squintOn));
      this.stage.classList.toggle('is-squint', this.squintOn);
      if (this.squintOn) this.paintSquint();
    });

    window.addEventListener('resize', () => {
      if (this.isOpen) {
        this.paint();
        if (this.squintOn) this.paintSquint();
      }
    });
  }

  open(asset, meta, angle = meta?.hero ?? 0) {
    this.asset = asset;
    this.meta = meta;
    this.angle = norm(Number(angle) || 0);
    this.target = this.angle;
    this.scaleOn = false;
    this.squintOn = false;
    this.stage.classList.remove('is-scale', 'is-squint', 'dragged');
    this.scaleBtn.setAttribute('aria-pressed', 'false');
    this.squintBtn.setAttribute('aria-pressed', 'false');
    this.renderChrome();
    this.updateChips();
    this.startMotion();

    if (!this.dialog.open) this.dialog.showModal();
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      this.paint();
      if (this.squintOn) this.paintSquint();
    });
  }

  refresh(asset, meta) {
    if (!this.isOpen) return;
    if (meta?.key !== this.currentKey) return;
    this.asset = asset;
    this.meta = meta;
    this.renderChrome();
    this.paint();
    if (this.squintOn) this.paintSquint();
    document.getElementById('inspector').classList.remove('refreshed');
    void document.getElementById('inspector').offsetWidth;
    document.getElementById('inspector').classList.add('refreshed');
  }

  close() {
    if (this.dialog.open) this.dialog.close();
  }

  renderChrome() {
    const { asset, meta } = this;
    if (!meta) return;
    const color = CATEGORIES[meta.category]?.color || 'var(--muted)';
    this.titleEl.textContent = meta.name;
    this.catEl.textContent = meta.categoryLabel || meta.category;
    this.catEl.style.color = color;
    this.subEl.textContent = `${meta.key} · ${meta.file || ''}`;
    this.sourceBtn.disabled = !meta.file;

    const rows = [];
    const row = (label, value, wide = false) => {
      const wrap = document.createElement('div');
      wrap.className = 'meta' + (wide ? ' wide' : '');
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      if (value instanceof Node) dd.append(value);
      else dd.textContent = value;
      wrap.append(dt, dd);
      rows.push(wrap);
    };

    const catSpan = document.createElement('span');
    catSpan.className = 'cat-inline';
    catSpan.innerHTML = `<i style="background:${color}"></i>`;
    catSpan.append(meta.categoryLabel || meta.category);
    row('Category', catSpan);

    const keyCode = document.createElement('code');
    keyCode.textContent = meta.key;
    row('Key', keyCode);

    const [fw, fd] = meta.footprint || [1, 1];
    row('Footprint', `${fmt(fw)} × ${fmt(fd)} tiles`);
    row('Height', `${fmt(meta.height)} tiles · ${fmt(meta.height * 2)} m`);

    const status = document.createElement('span');
    status.className = 'status-pill' + (meta.status === 'approved' ? '' : ' review');
    status.textContent = meta.status === 'approved' ? 'Approved' : 'In review';
    row('Status', status);

    row('Updated', timeAgo(meta.mtime));
    row('Source ref', meta.refs?.length ? meta.refs.join(' · ') : '—');
    row('Palette', meta.stats?.colors ? `${meta.stats.colors} colours · ${meta.stats.calls} shapes` : '—');

    if (meta.errors?.length) {
      row('Error', meta.errors.join('\n'), true);
    } else if (meta.warnings?.length) {
      row('Notes', meta.warnings.join('\n'), true);
    }

    this.metaEl.replaceChildren(...rows);

    this.tagsEl.replaceChildren(
      ...(meta.tags || []).map((t) => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        return span;
      }),
    );
    this.tagsEl.style.display = meta.tags?.length ? 'flex' : 'none';

    this.codeEl.textContent =
      typeof asset?.draw === 'function'
        ? String(asset.draw).trim()
        : (meta.errors?.[0] || '// no drawing routine');
  }

  paint() {
    if (!this.asset) return;
    if (!this.canvas.clientWidth) return;
    const plateWidth = Math.min(this.canvas.clientWidth * 0.68, 350);
    paintCanvas(this.canvas, this.asset, {
      angle: this.angle,
      theme: this.opts.getTheme(),
      plate: true,
      plateW: plateWidth,
      grid: this.scaleOn,
      human: this.scaleOn,
      fixedScale: this.scaleOn ? 64 : 0,
      pad: 18,
      originY: 0.72,
      time: this.asset.motion ? performance.now() / 1000 : 0,
    });
  }

  paintSquint() {
    if (!this.asset) return;
    paintSquint(this.squintCanvas, this.asset, this.angle, this.opts.getTheme());
  }

  updateChips() {
    const snapped = norm(Math.round(this.angle / 90) * 90);
    for (const b of this.viewBtns) {
      const a = Number(b.dataset.angle);
      const diff = norm(a - snapped);
      const active = Math.min(diff, 360 - diff) < 1;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    }
  }

  setAngle(angle, { animate = true, notify = true } = {}) {
    let target = Number(angle) || 0;
    const base = this.angle;
    target += 360 * Math.round((base - target) / 360);
    this.cancelAnim();
    if (!animate) {
      this.angle = target;
      this.target = target;
      this.updateChips();
      this.paint();
      if (notify) this.opts.onAngle?.(norm(target));
      return;
    }
    const from = this.angle;
    const started = performance.now();
    const duration = 280;
    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration);
      this.angle = from + (target - from) * easeOut(t);
      this.updateChips();
      this.paint();
      if (t < 1) {
        this.animRaf = requestAnimationFrame(tick);
      } else {
        this.animRaf = 0;
        this.angle = target;
        this.updateChips();
        this.paint();
        if (notify) this.opts.onAngle?.(norm(target));
      }
    };
    this.animRaf = requestAnimationFrame(tick);
  }

  step(delta) {
    const current = norm(Math.round(this.angle / 90) * 90);
    this.setAngle(current + delta, { animate: true, notify: true });
  }

  cancelAnim() {
    if (this.animRaf) cancelAnimationFrame(this.animRaf);
    this.animRaf = 0;
  }

  startMotion() {
    this.stopMotion();
    if (!this.asset?.motion) return;
    const loop = (now) => {
      if (!this.isOpen) return;
      if (now - this.motionLast > 75) {
        this.motionLast = now;
        this.paint();
      }
      this.motionRaf = requestAnimationFrame(loop);
    };
    this.motionRaf = requestAnimationFrame(loop);
  }

  stopMotion() {
    if (this.motionRaf) cancelAnimationFrame(this.motionRaf);
    this.motionRaf = 0;
  }

  makeCanvasCode() {
    return assetToCanvasCode(this.asset, {
      angle: norm(Math.round(this.angle / 90) * 90),
      unit: 100,
    });
  }

  async copyCanvas() {
    if (!this.asset) return;
    const ok = await copyText(this.makeCanvasCode());
    this.opts.toast?.(ok ? 'Canvas 2D code copied' : 'Could not copy Canvas code');
  }

  downloadPNG() {
    if (!this.canvas) return;
    const angle = Math.round(norm(this.angle) / 90) * 90;
    const key = this.meta?.key || this.asset.key;
    const dataUrl = this.canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${key}-${angle}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.opts.toast?.('PNG downloaded');
  }

  async copySnippet() {
    const ok = await copyText(this.codeEl.textContent || '');
    this.opts.toast?.(ok ? 'Drawing snippet copied' : 'Could not copy snippet');
  }

  async copyModule() {
    if (!this.meta?.key) return;
    try {
      const source = await fetchSource(this.meta.key);
      const ok = await copyText(source);
      this.opts.toast?.(ok ? 'Module source copied' : 'Could not copy source');
    } catch (err) {
      this.opts.toast?.(err.message || 'Source unavailable', { error: true });
    }
  }

  openSource() {
    if (!this.meta?.key) return;
    window.open(`/api/asset/${encodeURIComponent(this.meta.key)}/source`, '_blank', 'noopener');
  }
}
