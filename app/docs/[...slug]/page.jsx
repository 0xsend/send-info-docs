import DocsLayout from '../../../components/DocsLayout';
import { getAllDocSlugs, readDocBySlug, renderMarkdownToHtml, extractTitle, buildSidebarTree } from '../../../lib/md';

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  const docs = slugs.map((s) => ({ slug: s.split('/') }));
  const sections = Array.from(new Set(slugs.map((s) => s.split('/')[0])));
  const sectionParams = sections.map((section) => ({ slug: [section] }));
  return [...docs, ...sectionParams];
}

export async function generateMetadata({ params }) {
  const p = await params;
  const segments = p?.slug || [];
  if (segments.length === 1) {
    const section = segments[0];
    const sectionLabels = {
      'welcome': 'Welcome',
      'send-token': 'Send Token',
      'send-mobile-apps': 'Send Mobile Apps',
      'canton-wallet': 'Canton Wallet',
      'cusd-stablecoin': 'CUSD Stablecoin',
      'finance': 'Finance',
      'miscellaneous': 'Miscellaneous',
      'legal': 'Legal'
    };
    const title = sectionLabels[section] || section.replace(/-/g, ' ');
    return { title };
  }

  const slugPath = segments.join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return { title: 'Not found' };
  const title = extractTitle(doc.content, doc.data) || slugPath.split('/').slice(-1)[0];
  return { title };
}

export default async function DocPage({ params }) {
  const p = await params;
  const sidebarTree = buildSidebarTree();
  const segments = p?.slug || [];

  if (segments.length === 1) {
    const section = segments[0];
    const sectionLabels = {
      'welcome': 'Welcome',
      'send-token': 'Send Token',
      'send-mobile-apps': 'Send Mobile Apps',
      'canton-wallet': 'Canton Wallet',
      'cusd-stablecoin': 'CUSD Stablecoin',
      'finance': 'Finance',
      'miscellaneous': 'Miscellaneous',
      'legal': 'Legal'
    };
    const label = sectionLabels[section] || section.replace(/-/g, ' ');
    return (
      <DocsLayout treeData={sidebarTree} headings={[]} />
    );
  }

  const slugPath = segments.join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) {
    return (
      <DocsLayout treeData={sidebarTree} headings={[]}>
        <div className="not-found-message">Not found</div>
      </DocsLayout>
    );
  }
  const { html, headings } = await renderMarkdownToHtml(doc.content);

  return (
    <DocsLayout treeData={sidebarTree} headings={headings}>
      <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </DocsLayout>
  );
}
