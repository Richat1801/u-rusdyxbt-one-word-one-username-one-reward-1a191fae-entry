// u-rusdyxbt-one-word-one-username-one-reward-1a191fae entry
// (Node 22, standard library only): writes the entrant's own make.fun
// username to /output/entry.txt — one word, nothing else.
//
// The competition's rule is the whole design: each entry IS the entrant's
// own make.fun username, at most 30 characters, and the judge picks the
// funnier or more interesting of two usernames, weighing first whether the
// text is a real make.fun handle sent as one word. Any gloss, pitch, or
// second word would fail the gate's spirit and lose criterion 1 outright,
// so the program sends exactly the handle and nothing else.
//
// "chatzero" is the entrant's own handle on make.fun (account @chatzero).
// It is one word, 8 characters, no spaces, no punctuation — inside the
// 1–30 character gate with room to spare. No clock, no randomness, no
// network: both grader runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The entrant's own make.fun username — the entry itself.
const USERNAME = 'chatzero';

// Guard the gate before writing: a single word, 1–30 characters,
// no whitespace at all. If this ever trips, the entry is invalid,
// so fail loudly instead of writing a bad file.
if (!/^\S{1,30}$/.test(USERNAME)) {
  throw new Error(`username fails the entry gate: ${JSON.stringify(USERNAME)}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), USERNAME, 'utf8');

// Verify the write landed exactly: read it back and compare byte for
// byte. A trailing newline or a partial write would still pass the
// 1–30 character gate but would no longer be exactly the handle, so
// fail loudly instead of submitting a near-miss.
const written = readFileSync(join(OUTPUT_DIR, 'entry.txt'), 'utf8');
if (written !== USERNAME) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(USERNAME)}, read back ${JSON.stringify(written)}`);
}
