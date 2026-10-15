#!/usr/bin/env node
// Validates state/project.json and every gate record in gates/.
// A gate record is gates/<gate-id>.json; files starting with "_" are templates.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const STATUSES = ['PASS', 'FAIL', 'BLOCKED'];
const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
const isNonEmptyString = (s) => typeof s === 'string' && s.trim().length > 0;

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    errors.push(`${path}: not valid JSON (${err.message})`);
    return null;
  }
}

// Project state
const state = readJson('state/project.json');
if (state) {
  for (const key of ['client', 'project', 'agency_version', 'phase']) {
    if (!isNonEmptyString(state[key])) errors.push(`state/project.json: "${key}" must be a non-empty string`);
  }
  if (!state.repos || typeof state.repos !== 'object' || !state.repos.hub) errors.push('state/project.json: "repos.hub" is required');
  if (!state.budgets || typeof state.budgets !== 'object') errors.push('state/project.json: "budgets" must be an object');
  if (!Array.isArray(state.usage)) errors.push('state/project.json: "usage" must be an array');
  if (!Array.isArray(state.tasks)) errors.push('state/project.json: "tasks" must be an array');
}

// Gate records
let count = 0;
if (existsSync('gates')) {
  for (const name of readdirSync('gates')) {
    if (!name.endsWith('.json') || name.startsWith('_')) continue;
    count += 1;
    const path = join('gates', name);
    const g = readJson(path);
    if (!g) continue;
    if (!isNonEmptyString(g.gate)) errors.push(`${path}: "gate" is required`);
    if (!STATUSES.includes(g.status)) errors.push(`${path}: "status" must be one of ${STATUSES.join(', ')}`);
    if (!Array.isArray(g.criteria) || g.criteria.length === 0) errors.push(`${path}: "criteria" must list at least one criterion`);
    if (!isNonEmptyString(g.reviewer)) errors.push(`${path}: "reviewer" is required`);
    if (!isDate(g.date)) errors.push(`${path}: "date" must be YYYY-MM-DD`);
    for (const key of ['evidence', 'findings', 'actions']) {
      if (!Array.isArray(g[key])) errors.push(`${path}: "${key}" must be an array`);
    }
    if (Array.isArray(g.evidence)) {
      if (g.status === 'PASS' && g.evidence.length === 0) errors.push(`${path}: a PASS needs at least one evidence file`);
      for (const ev of g.evidence) {
        if (!isNonEmptyString(ev) || !existsSync(ev)) errors.push(`${path}: evidence file not found: ${ev}`);
      }
    }
    if ((g.status === 'FAIL' || g.status === 'BLOCKED') && Array.isArray(g.actions) && g.actions.length === 0) {
      errors.push(`${path}: a ${g.status} needs at least one action`);
    }
  }
}

if (errors.length) {
  console.log(errors.join('\n'));
  console.log(`State and gates: ${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`State and gates: valid (${count} gate record(s)).`);
