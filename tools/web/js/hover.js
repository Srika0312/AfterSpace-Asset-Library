// The Afterspace — hover contract
// 150 ms: what it is. 2 s: its name, with a filling dwell bar.

export function createHoverTooltip() {
  const el = document.getElementById('tooltip');
  const dot = document.getElementById('tip-dot');
  const cat = document.getElementById('tip-cat');
  const what = document.getElementById('tip-what');
  const name = document.getElementById('tip-name');
  const bar = document.getElementById('tip-bar');

  let asset = null;
  let meta = null;
  let anchor = null;
  let showTimer = 0;
  let nameTimer = 0;
  let raf = 0;
  let x = 0;
  let y = 0;
  let active = false;

  function place() {
    raf = 0;
    if (!active) return;
    const rect = el.getBoundingClientRect();
    const gap = 16;
    let left = x + gap;
    let top = y + gap;
    if (left + rect.width > window.innerWidth - 10) left = x - rect.width - gap;
    if (top + rect.height > window.innerHeight - 10) top = y - rect.height - gap;
    left = Math.max(10, Math.min(left, window.innerWidth - rect.width - 10));
    top = Math.max(10, Math.min(top, window.innerHeight - rect.height - 10));
    el.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
  }

  function queuePlace() {
    if (!raf) raf = requestAnimationFrame(place);
  }

  function reset() {
    clearTimeout(showTimer);
    clearTimeout(nameTimer);
    showTimer = 0;
    nameTimer = 0;
    active = false;
    el.classList.remove('show', 'is-name', 'bar-run');
    el.setAttribute('aria-hidden', 'true');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    // force a reflow so the next run animates from zero
    void bar.offsetWidth;
    bar.style.transition = '';
    bar.style.width = '';
  }

  function start(cardEl, entry) {
    reset();
    anchor = cardEl;
    asset = entry.asset;
    meta = entry.meta;
    active = true;

    dot.style.background = entry.color;
    el.style.setProperty('--cat', entry.color);
    cat.textContent = meta.categoryLabel;
    what.textContent = meta.what;
    name.textContent = meta.name;
    el.setAttribute('aria-hidden', 'false');

    const r = cardEl.getBoundingClientRect();
    x = r.left + r.width / 2;
    y = r.top + r.height * 0.35;
    queuePlace();

    showTimer = setTimeout(() => {
      if (!active) return;
      el.classList.add('show', 'bar-run');
      queuePlace();
    }, 140);

    nameTimer = setTimeout(() => {
      if (!active) return;
      el.classList.add('is-name');
      queuePlace();
    }, 2000);
  }

  function move(clientX, clientY) {
    x = clientX;
    y = clientY;
    queuePlace();
  }

  function stop() {
    reset();
    anchor = null;
    asset = null;
    meta = null;
  }

  return { start, move, stop, get active() { return active; } };
}
