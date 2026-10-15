#!/usr/bin/env node
// Fails when an em-dash (U+2014) or en-dash (U+2013) appears.
// Usage:
//   node scripts/check-dashes.mjs --all            every tracked file
//   node scripts/check-dashes.mjs --staged         staged content (pre-commit hook)
//   node scripts/check-dashes.mjs --commits        every commit message in history
//   node scripts/check-dashes.mjs --message FILE   one commit message (commit-msg hook)
//   node scripts/check-dashes.mjs --paths A B ...  specific files
// Paths listed in .dash-allow (one path prefix per line) are skipped.
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';

const BANNED = [
  ['\u2014', 'em-dash'],
  ['\u2013', 'en-dash'],
];

const SKIP = [
  /(^|\/)node_modules\//, /(^|\/)\.tools\//, /(^|\/)\.next\//, /(^|\/)dist\//,
  /(^|\/)vendor\//, /(^|\/)third_party\//,
  /(^|\/)package-lock\.json$/, /(^|\/)pnpm-lock\.yaml$/, /(^|\/)yarn\.lock$/,
  /(^|\/)LICEN[CS]E[^/]*$/i, /\.min\.(js|css)$/,
  /\.(png|jpe?g|gif|webp|avif|ico|pdf|zip|gz|tgz|glb|gltf|bin|woff2?|ttf|otf|mp4|webm|mov|mp3|wav)$/i,
];

function git(args) {
  return execFileSync('git', args, { encoding: 'buffer', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'pipe'] });
}

const allow = existsSync('.dash-allow')
  ? readFileSync('.dash-allow', 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  : [];

function skipped(path) {
  return SKIP.some((re) => re.test(path)) || allow.some((prefix) => path.startsWith(prefix));
}

const findings = [];
let scanned = 0;

function scan(label, buf) {
  if (buf.includes(0)) return; // binary
  scanned += 1;
  const lines = buf.toString('utf8').split('\n');
  lines.forEach((line, i) => {
    for (const [ch, name] of BANNED) {
      let col = line.indexOf(ch);
      while (col !== -1) {
        findings.push(`${label}:${i + 1}:${col + 1}: ${name}`);
        col = line.indexOf(ch, col + 1);
      }
    }
  });
}

const [mode, ...rest] = process.argv.slice(2);

try {
  if (mode === '--all') {
    let names;
    try {
      names = git(['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
    } catch {
      // Not a git repo (for example an unzipped release package): walk the folder.
      names = readdirSync('.', { recursive: true }).map(String).filter((p) => !/(^|\/)\.git(\/|$)/.test(p));
    }
    for (const p of names) {
      if (skipped(p) || !existsSync(p) || !statSync(p).isFile()) continue;
      scan(p, readFileSync(p));
    }
  } else if (mode === '--staged') {
    const names = git(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']).toString('utf8').split('\0').filter(Boolean);
    for (const p of names) {
      if (skipped(p)) continue;
      scan(p, git(['show', `:${p}`]));
    }
  } else if (mode === '--commits') {
    let log = '';
    try {
      log = git(['log', '--format=%h%x00%B%x1e']).toString('utf8');
    } catch {
      log = ''; // no commits yet
    }
    for (const entry of log.split('\x1e')) {
      const [sha, body] = entry.replace(/^\n/, '').split('\0');
      if (sha && body !== undefined) scan(`commit ${sha}`, Buffer.from(body));
    }
  } else if (mode === '--message') {
    const text = readFileSync(rest[0], 'utf8').split('\n').filter((l) => !l.startsWith('#')).join('\n');
    scan('commit message', Buffer.from(text));
  } else if (mode === '--paths') {
    for (const p of rest) scan(p, readFileSync(p));
  } else {
    console.error('Usage: check-dashes.mjs --all | --staged | --commits | --message FILE | --paths FILES');
    process.exit(2);
  }
} catch (err) {
  console.error(`Dash check could not run: ${err.message}`);
  process.exit(2);
}

if (findings.length) {
  console.log(findings.join('\n'));
  console.log(`Dash check: ${findings.length} found. Use commas, colons, parentheses or full stops; write ranges with "to".`);
  process.exit(1);
}
console.log(`Dash check: clean (${scanned} checked)`);
