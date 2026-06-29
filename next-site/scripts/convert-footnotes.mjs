import fs from 'node:fs/promises';
import path from 'node:path';

// Converts legacy WordPress "Easy Footnotes" markup into standard GFM footnotes.
//
// Body references:   `... text [13](#easy-footnote-bottom-13-1208)`
//   -> `... text[^13]`
// Definitions (an ordered list under a `#### Footnotes` heading), each item
// terminated by an empty back-anchor `[](#easy-footnote-13-1208)`:
//   `1.  Some note ...[](#easy-footnote-13-1208)`
//   -> `[^13]: Some note ...`
//
// The numeric id from the anchor (the original global footnote number) is
// reused as the GFM identifier. GFM renumbers footnotes sequentially by order
// of reference at render time, so the visible numbering comes out correct.

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

const BODY_REF_RE = / ?\[(\d+)\]\(#easy-footnote-bottom-\d+-\d+\)/g;
const DEF_ANCHOR_RE = /\[\]\(#easy-footnote-(\d+)-\d+\)/;
const FOOTNOTE_HEADING_RE = /^#{1,6}\s+Footnotes\s*$/im;

function convertDefinitions(block) {
  const lines = block.split('\n');
  const out = [];
  let item = null; // { id, lines: [] }

  const flush = () => {
    if (!item) return;
    const id = item.id;
    // Drop the empty back-anchor and tidy trailing whitespace.
    let text = item.lines
      .join('\n')
      .replace(DEF_ANCHOR_RE, '')
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{2,}\s*$/g, '')
      .replace(/\s+$/g, '');
    out.push(`[^${id}]: ${text}`);
    item = null;
  };

  for (const line of lines) {
    const start = line.match(/^(\d+)\.[ \t]+(.*)$/);
    if (start) {
      // A new top-level list item begins. The global id lives in this item's
      // back-anchor, so we resolve it when flushing isn't possible yet; instead
      // we scan the whole item for the anchor below.
      flush();
      item = { id: null, lines: [start[2]] };
    } else if (item) {
      item.lines.push(line);
    } else {
      out.push(line);
    }
    // Capture the id as soon as we see the anchor in the current item.
    if (item) {
      const m = line.match(DEF_ANCHOR_RE);
      if (m) item.id = m[1];
    }
  }
  flush();
  return out.join('\n');
}

async function main() {
  const entries = await fs.readdir(POSTS_DIR);
  let changed = 0;
  for (const entry of entries) {
    if (!entry.endsWith('.mdx')) continue;
    const full = path.join(POSTS_DIR, entry);
    const original = await fs.readFile(full, 'utf8');
    if (!original.includes('easy-footnote')) continue;

    // 1) Convert inline references everywhere.
    let next = original.replace(BODY_REF_RE, '[^$1]');

    // 2) Convert the definition list under the Footnotes heading.
    const headingMatch = next.match(FOOTNOTE_HEADING_RE);
    if (headingMatch) {
      const idx = next.indexOf(headingMatch[0]);
      const headingEnd = idx + headingMatch[0].length;
      const before = next.slice(0, headingEnd);
      const after = next.slice(headingEnd);
      next = before + convertDefinitions(after);
    }

    if (next !== original) {
      await fs.writeFile(full, next, 'utf8');
      changed += 1;
      console.log(`converted: ${entry}`);
    }
  }
  console.log(`\n${changed} file(s) converted`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
