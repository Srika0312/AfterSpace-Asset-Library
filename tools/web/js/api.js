// The Afterspace — browser API helpers

export async function fetchLibrary() {
  const res = await fetch('/api/assets', { cache: 'no-store' });
  if (!res.ok) throw new Error(`Library request failed (${res.status})`);
  return res.json();
}

export async function importRegistry() {
  const mod = await import(`/generated/registry.js?v=${Date.now()}`);
  return Array.isArray(mod.default) ? mod.default : [];
}

export function connectEvents({ onEvent, onStatus }) {
  let source;
  try {
    source = new EventSource('/api/events');
  } catch {
    onStatus?.('offline');
    return null;
  }
  source.onopen = () => onStatus?.('live');
  source.onerror = () => onStatus?.('offline');
  source.onmessage = (event) => {
    try {
      onEvent?.(JSON.parse(event.data));
    } catch {
      /* ignore malformed frames */
    }
  };
  return source;
}

export async function fetchSource(key) {
  const res = await fetch(`/api/asset/${encodeURIComponent(key)}/source`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Source unavailable (${res.status})`);
  return res.text();
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    area.style.pointerEvents = 'none';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function downloadText(text, filename, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
