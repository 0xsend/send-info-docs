import { getAllDocFilePaths, readDocBySlug, extractTitle } from './md.js';
import path from 'path';
import { toString } from 'mdast-util-to-string';
import { unified } from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';

const DOCS_DIR = path.join(process.cwd(), 'docs');

/**
 * Builds a search index from all documentation files
 * Returns an array of searchable documents with title, content, and metadata
 */
export function buildSearchIndex() {
  const files = getAllDocFilePaths();
  const index = [];

  for (const full of files) {
    const rel = path.relative(DOCS_DIR, full).replace(/\\/g, '/');
    const slug = rel.replace(/\.mdx$/i, '');

    const doc = readDocBySlug(slug);
    if (!doc) continue;

    const { content, data } = doc;
    const title = extractTitle(content, data) || 'Untitled';

    // Extract plain text from markdown for search
    const plainText = extractPlainText(content);

    // Get section from slug (first part)
    const section = slug.split('/')[0] || '';
    const sectionLabel = formatSectionName(section);

    // Remove title from the beginning of plainText for the excerpt
    let excerptText = plainText;
    if (excerptText.toLowerCase().startsWith(title.toLowerCase())) {
      excerptText = excerptText.substring(title.length).trim();
    }

    index.push({
      id: slug,
      title,
      section: sectionLabel,
      content: plainText,
      url: `/docs/${slug}`,
      // First 200 chars as excerpt (with title filtered out)
      excerpt: excerptText.substring(0, 200).trim() + (excerptText.length > 200 ? '...' : '')
    });
  }

  return index;
}

/**
 * Extracts plain text from markdown content
 */
function extractPlainText(markdown) {
  try {
    // Remove frontmatter if present
    const withoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n/, '');

    // Remove callout/admonition blocks
    const withoutCallouts = withoutFrontmatter.replace(/^:::\w+[\s\S]*?:::\s*$/gm, '');

    // Parse markdown to AST and extract text
    const tree = unified().use(parse).use(gfm).parse(withoutCallouts);

    // Extract text from each block element and join with spaces
    const blockTexts = [];
    for (const node of tree.children) {
      const text = toString(node).trim();
      if (text) {
        blockTexts.push(text);
      }
    }

    // Join blocks with spaces and clean up whitespace
    return blockTexts.join(' ').replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error extracting plain text:', error);
    return '';
  }
}

/**
 * Formats section names for display
 */
function formatSectionName(section) {
  const sectionNames = {
    'welcome': 'Welcome',
    'send-token': 'Send Token',
    'send-mobile-apps': 'Send App',
    'send-safe': 'Send Safe',
    'pool-party': 'Pool Party Exchange',
    'cusd-stablecoin': 'CUSD Stablecoin',
    'features': 'Features',
    'finance': 'Finance',
    'miscellaneous': 'Miscellaneous',
    'legal': 'Legal'
  };

  return sectionNames[section] || section
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
