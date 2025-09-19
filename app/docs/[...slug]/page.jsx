import DocsLayout from '../../../components/DocsLayout';
import { getAllDocSlugs, readDocBySlug, renderMarkdownToHtml, extractTitle, buildSidebarTree } from '../../../lib/md';

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((s) => ({ slug: s.split('/') }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const slugPath = (p?.slug || []).join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return { title: 'Not found' };
  const title = extractTitle(doc.content, doc.data) || slugPath.split('/').slice(-1)[0];
  return { title };
}

export default async function DocPage({ params }) {
  const p = await params;
  const slugPath = (p?.slug || []).join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return <div className="not-found-message">Not found</div>;
  const { html, headings } = await renderMarkdownToHtml(doc.content);
  const sidebarTree = buildSidebarTree();

  return (
    <DocsLayout treeData={sidebarTree} headings={headings}>
      <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </DocsLayout>
  );
}
