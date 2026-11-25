// Fortune Cookie for the Liquidated Trader
// Reads the single fortune line from entry.txt in the repo root and
// writes it unchanged, with no trailing newline, to
// $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib only, no network, no wall clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir =
  process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw = readFileSync(join(repoDir, "entry.txt"), "utf8");
const fortune = raw.trim();

if (fortune.length === 0) {
  throw new Error("entry.txt is empty");
}
if (fortune.length > 160) {
  throw new Error(`fortune is ${fortune.length} characters, over the 160 limit`);
}
const words = fortune.split(/\s+/).filter(Boolean);
if (words.length > 20) {
  throw new Error(`fortune is ${words.length} words, over the 20-word limit`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), fortune, "utf8");
