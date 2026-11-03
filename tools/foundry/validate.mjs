// The Afterspace — validate every asset without starting the server.
// Usage: node tools/foundry/validate.mjs [--json]

import { buildLibrary, ROOT } from './library.mjs';

const asJson = process.argv.includes('--json');
const lib = await buildLibrary();

const C = process.stdout.isTTY
  ? {
      reset: '\x1b[0m',
      dim: '\x1b[2m',
      bold: '\x1b[1m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      red: '\x1b[31m',
      gray: '\x1b[90m',
    }
  : { reset: '', dim: '', bold: '', green: '', yellow: '', red: '', gray: '' };

const errors = lib.filter((r) => r.errors.length);
const warnings = lib.filter((r) => r.warnings.length);

if (asJson) {
  console.log(JSON.stringify(lib.map(({ asset, ...rest }) => rest), null, 2));
} else {
  console.log('');
  console.log(`${C.bold}THE AFTERSPACE / FOUNDRY${C.reset}  ${C.dim}${lib.length} assets${C.reset}`);
  console.log('');

  let last = '';
  for (const r of lib) {
    if (r.category !== last) {
      console.log(`${C.gray}${r.category.toUpperCase()}${C.reset}`);
      last = r.category;
    }
    const state = r.errors.length ? `${C.red}error${C.reset}` : r.warnings.length ? `${C.yellow}note${C.reset}` : `${C.green}ok${C.reset}`;
    const size = `${r.stats.calls} calls · ${r.stats.colors} colours · ${r.stats.shapes} faces`;
    console.log(`  ${state.padEnd(12)} ${r.name.padEnd(22)} ${C.dim}${size}${C.reset}`);
    for (const w of r.warnings) console.log(`        ${C.yellow}·${C.reset} ${w}`);
    for (const e of r.errors) console.log(`        ${C.red}·${C.reset} ${e.split('\n')[0]}`);
  }

  console.log('');
  const summary = [];
  if (errors.length) summary.push(`${C.red}${errors.length} error${errors.length === 1 ? '' : 's'}${C.reset}`);
  if (warnings.length) summary.push(`${C.yellow}${warnings.length} note${warnings.length === 1 ? '' : 's'}${C.reset}`);
  if (!summary.length) summary.push(`${C.green}all clear${C.reset}`);
  console.log(`${summary.join(' · ')}  ${C.dim}${ROOT}${C.reset}`);
  console.log('');
}

process.exitCode = errors.length ? 1 : 0;
