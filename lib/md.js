import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { compileMDX } from 'next-mdx-remote/rsc';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import Callout from '../components/mdx/Callout.jsx';
import TokenEmissions from '../components/TokenEmissions.tsx';
import FundingRounds from '../components/FundingRounds.tsx';
import Treasury from '../components/Treasury.tsx';
import Revenue from '../components/Revenue.tsx';
import BusinessModels from '../components/BusinessModels.tsx';
import Multisigs from '../components/Multisigs.tsx';
import PoolParty from '../components/PoolParty.tsx';
import { getRewardsCriteria, formatNumberDisplay } from './rewardsCriteria.js';

const DOCS_DIR = path.join(process.cwd(), 'docs');
const SUPPORTED_EXTENSIONS = ['.mdx'];

const mdxComponents = {
  Callout,
  TokenEmissions,
  FundingRounds,
  Treasury,
  Revenue,
  BusinessModels,
  Multisigs,
  PoolParty
};

export function getAllDocFilePaths() {
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && isDocFile(entry.name)) {
        results.push(full);
      }
    }
  }
  walk(DOCS_DIR);
  return results;
}

export async function getAllDocSlugs() {
  return getAllDocFilePaths()
    .map((full) => path.relative(DOCS_DIR, full).replace(/\\/g, '/'))
    .map(stripDocExtension)
    .sort();
}

export function getDocAbsolutePathFromSlug(slug) {
  for (const ext of SUPPORTED_EXTENSIONS) {
    const relPath = `${slug}${ext}`;
    const full = path.join(DOCS_DIR, relPath);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

export function readDocBySlug(slug) {
  const full = getDocAbsolutePathFromSlug(slug);
  if (!full) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { content, data } = matter(raw);
  return { content, data };
}

export async function renderDocToComponent(slug) {
  const doc = readDocBySlug(slug);
  if (!doc) return null;

  const headings = extractHeadings(doc.content);
  let source = convertAdmonitionsToCallouts(doc.content);
  source = await resolveDynamicTokens(source);

  const mdx = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [gfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'append' }]
        ]
      }
    }
  });

  return {
    content: mdx.content,
    data: doc.data,
    headings
  };
}

function extractHeadings(markdown) {
  const tree = unified().use(parse).use(gfm).parse(markdown);
  const slugger = new GithubSlugger();
  const headings = [];
  visit(tree, 'heading', (node) => {
    if (node.depth < 2 || node.depth > 3) return;
    const text = toString(node).trim();
    if (!text) return;
    headings.push({
      id: slugger.slug(text),
      text,
      level: node.depth
    });
  });
  return headings;
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
    const id = stripDocExtension(rel);
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
        'send-token/distribution',
        'send-token/bridge',
        'send-token/upgrade',
        'send-token/faqs'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'send-mobile-apps') {
      // Custom order for send-mobile-apps
      const order = [
        'send-mobile-apps/overview',
        'send-mobile-apps/features',
        'send-mobile-apps/faqs'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'send-safe') {
      // Custom order for send-safe
      const order = [
        'send-safe/overview',
        'send-safe/passkeys',
        'send-safe/wallet-maintenance',
        'send-safe/safe',
        'send-safe/canton-coin-rewards',
        'send-safe/pool-party-exchange'
      ];
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    if (k === 'cusd-stablecoin') {
      // Custom order for cusd-stablecoin
      const order = [
        'cusd-stablecoin/overview',
        'cusd-stablecoin/reserves-report',
        'cusd-stablecoin/faqs'
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
        'miscellaneous/brand-links-assets',
        'miscellaneous/glossary'
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
        'legal/prohibited-activities',
        'legal/terms-of-service',
        'legal/privacy-policy'
      ];
      // Filter out hidden pages (still accessible via direct URL)
      items = items.filter((it) => it.id !== 'legal/mica-whitepaper');
      const index = new Map(order.map((v, i) => [v, i]));
      items.sort((a, b) => (index.has(a.id) ? index.get(a.id) : 999) - (index.has(b.id) ? index.get(b.id) : 999));
    }
    obj[k] = items;
  });
  return obj;
}

function isDocFile(filename) {
  return SUPPORTED_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));
}

function stripDocExtension(relPath) {
  return relPath.replace(/\.mdx$/i, '');
}

const ADMONITION_TYPE_MAP = new Map([
  ['info', 'info'],
  ['tip', 'tip'],
  ['warning', 'warning'],
  ['caution', 'warning'],
  ['danger', 'error'],
  ['note', 'default'],
  ['important', 'important'],
  ['error', 'error']
]);

function convertAdmonitionsToCallouts(markdown) {
  const admonitionRegex = /^:::(\w+)\s*(.*)?\n([\s\S]*?)\n:::\s*$/gim;
  return markdown.replace(admonitionRegex, (match, rawType, rawTitle, body) => {
    const normalizedType = ADMONITION_TYPE_MAP.get(rawType.toLowerCase());
    if (!normalizedType) return match; // leave unchanged if we don't recognize it
    const title = (rawTitle || '').trim();
    const titleAttr = title ? ` title="${escapeAttribute(title)}"` : '';
    const calloutType = normalizedType;
    const trimmedBody = body.trim();
    return `\n<Callout type="${calloutType}"${titleAttr}>\n${trimmedBody}\n</Callout>\n`;
  });
}

function escapeAttribute(str) {
  return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;');
}

async function resolveDynamicTokens(markdown) {
  // Only fetch when tokens appear; avoids unnecessary calls
  const needsRewards = /\{\{REWARDS_(DEPOSIT_USDC|HOLD_SEND)\}\}/.test(markdown);
  if (!needsRewards) return markdown;

  try {
    const { depositUsdc, holdSend } = await getRewardsCriteria();
    const map = new Map();
    map.set('{{REWARDS_DEPOSIT_USDC}}', formatNumberDisplay(depositUsdc));
    map.set('{{REWARDS_HOLD_SEND}}', formatNumberDisplay(holdSend));

    let out = markdown;
    for (const [token, value] of map.entries()) {
      out = out.split(token).join(String(value));
    }
    return out;
  } catch {
    return markdown;
  }
}
