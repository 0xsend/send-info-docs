import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const DOCS_DIR = path.join(process.cwd(), 'docs');

export function getAllDocFilePaths() {
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.md')) results.push(full);
    }
  }
  walk(DOCS_DIR);
  return results;
}

export async function getAllDocSlugs() {
  return getAllDocFilePaths()
    .map((full) => path.relative(DOCS_DIR, full).replace(/\\/g, '/'))
    .map((rel) => rel.replace(/\.md$/i, ''))
    .sort();
}

export function getDocAbsolutePathFromSlug(slug) {
  const relPath = `${slug}.md`;
  return path.join(DOCS_DIR, relPath);
}

export function readDocBySlug(slug) {
  const full = getDocAbsolutePathFromSlug(slug);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { content, data } = matter(raw);
  return { content, data };
}

async function renderBasicMarkdown(md) {
  const file = await unified()
    .use(parse)
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

async function transformAdmonitions(markdown) {
  const re = /^:::(info|tip)\s*(.*)?\n([\s\S]*?)\n:::\s*$/gmi;
  let out = '';
  let lastIndex = 0;
  let m;
  while ((m = re.exec(markdown)) !== null) {
    out += markdown.slice(lastIndex, m.index);
    const type = m[1].toLowerCase();
    const title = (m[2] || '').trim();
    const body = (m[3] || '').trim();
    const bodyHtml = await renderBasicMarkdown(body);
    const displayTitle = title || (type === 'tip' ? 'Tip' : 'Info');
    out += `\n<div class="admonition admonition-${type}">` +
           `<div class="admonition-header">` +
             `<span class="admonition-icon" aria-hidden="true"></span>` +
             `<span class="admonition-title">${displayTitle}</span>` +
           `</div>` +
           `<div class="admonition-content">${bodyHtml}</div>` +
         `</div>\n`;
    lastIndex = re.lastIndex;
  }
  out += markdown.slice(lastIndex);
  return out;
}

export async function renderMarkdownToHtml(markdown) {
  const withAdmonitions = await transformAdmonitions(markdown);
  const file = await unified()
    .use(parse)
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'append' })
    .use(rehypeStringify)
    .process(withAdmonitions);
  return String(file);
}

export function extractTitle(markdown, frontmatter) {
  if (frontmatter && frontmatter.title) return frontmatter.title;
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

export function buildSidebarTree() {
  const files = getAllDocFilePaths();
  const tree = new Map();
  for (const full of files) {
    const rel = path.relative(DOCS_DIR, full).replace(/\\/g, '/');
    const [section, ...rest] = rel.split('/');
    const id = rel.replace(/\.md$/i, '');
    const raw = fs.readFileSync(full, 'utf8');
    const { content, data } = matter(raw);
    const title = extractTitle(content, data) || rest.slice(-1)[0].replace(/-/g, ' ');
    if (!tree.has(section)) tree.set(section, []);
    tree.get(section).push({ id, title });
  }
  // Sort entries by id to keep stable ordering
  const obj = {};
  [...tree.keys()].sort().forEach((k) => {
    let items = tree.get(k).sort((a, b) => a.id.localeCompare(b.id));
    if (k === 'welcome') {
      // Remove deprecated or unwanted entries
      items = items.filter((it) => !it.id.endsWith('why-send'));
      // Custom order for welcome pages
      const order = [
        'welcome/send-overview',
        'welcome/problem-statement',
        'welcome/mission-vision-values',
        'welcome/team',
        'welcome/contact'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'send-token') {
      // Custom order for send-token
      const order = [
        'send-token/send-token-overview',
        'send-token/tokenomics',
        'send-token/bridge',
        'send-token/upgrade'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'finance') {
      // Custom order for finance
      const order = [
        'finance/multisigs',
        'finance/funding-rounds',
        'finance/business-models',
        'finance/token-emissions',
        'finance/treasury',
        'finance/revenue'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'miscellaneous') {
      // Custom order for miscellaneous
      const order = [
        'miscellaneous/roadmap',
        'miscellaneous/send-metrics',
        'miscellaneous/intellectual-property',
        'miscellaneous/send-contract-addresses',
        'miscellaneous/brand-links-assets'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'legal') {
      // Custom order for legal
      const order = [
        'legal/affiliate-marketing-disclaimer',
        'legal/disclaimer',
        'legal/licenses',
        'legal/terms-of-service',
        'legal/privacy-policy'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    obj[k] = items;
  });
  return obj;
}
