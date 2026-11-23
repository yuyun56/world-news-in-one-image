// make.fun news-image-20261122 entry: a one-image front page of Sunday,
// November 22, 2026's world news. The program copies the bundled
// entry.png to the output path (MAKEFUN_OUTPUT_DIR, default /output).
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const header = readFileSync(source).subarray(0, 4);
if (header[0] !== 0x89 || header[1] !== 0x50 || header[2] !== 0x4e || header[3] !== 0x47) {
  throw new Error("entry.png is not a PNG");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "entry.png"));

if (statSync(source).size !== statSync(join(outputDir, "entry.png")).size) {
  throw new Error("copy size mismatch");
}
