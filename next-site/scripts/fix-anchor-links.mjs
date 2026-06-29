import fs from 'node:fs/promises';
import path from 'node:path';

// Fixes legacy WordPress-style in-page anchor links left over from the import.
//
// WordPress TOC anchors keep the heading's original case and use underscores
// for spaces (e.g. `#Where_is_the_sun`, `#Footnotes`). The render pipeline
// generates heading ids with `rehype-slug` (github-slugger), which lowercases
// and uses hyphens (`where-is-the-sun`, `footnotes`). The mismatch leaves every
// table-of-contents / "jump to" link pointing at a non-existent id.
//
// For these headings (which contain spaces, not literal underscores) the
// github-slugger id is exactly the WordPress anchor lowercased with `_` -> `-`.
// Verified against the built HTML: every transformed anchor resolves to a real
// heading id. Only in-page `](#...)` links are touched; external links and
// already-correct anchors are left unchanged.

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

const ANCHOR_LINK_RE = /\]\(#([A-Za-z0-9][A-Za-z0-9_]*)\)/g;

async function main() {
  const entries = await fs.readdir(POSTS_DIR);
  let changed = 0;
  for (const entry of entries) {
    if (!entry.endsWith('.mdx')) continue;
    const full = path.join(POSTS_DIR, entry);
    const original = await fs.readFile(full, 'utf8');

    const next = original.replace(ANCHOR_LINK_RE, (match, anchor) => {
      const fixed = anchor.toLowerCase().replace(/_/g, '-');
      return fixed === anchor ? match : `](#${fixed})`;
    });

    if (next !== original) {
      await fs.writeFile(full, next, 'utf8');
      changed += 1;
      console.log(`fixed anchors: ${entry}`);
    }
  }
  console.log(`\n${changed} file(s) updated`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
