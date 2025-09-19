import DocsLayout from '../../../components/DocsLayout';
import { getAllDocSlugs, readDocBySlug, renderMarkdownToHtml, extractTitle } from '../../../lib/md';

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((s) => ({ slug: s.split('/') }));
}

export async function generateMetadata({ params }) {
  const slugPath = (params.slug || []).join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return { title: 'Not found' };
  const title = extractTitle(doc.content, doc.data) || slugPath.split('/').slice(-1)[0];
  return { title };
}

export default async function DocPage({ params }) {
  const slugPath = (params.slug || []).join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return <div style={{ padding: '2rem' }}>Not found</div>;
  const html = await renderMarkdownToHtml(doc.content);
  return (
    <DocsLayout>
      <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </DocsLayout>
  );
}
