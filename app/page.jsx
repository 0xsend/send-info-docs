import DocsLayout from '../components/DocsLayout';
import { readDocBySlug, renderMarkdownToHtml, buildSidebarTree } from '../lib/md';

export default async function HomePage() {
  const doc = readDocBySlug('welcome/send-overview');
  const html = doc ? await renderMarkdownToHtml(doc.content) : '';
  const sidebarTree = buildSidebarTree();

  return (
    <DocsLayout treeData={sidebarTree}>
      {doc ? (
        <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className="not-found-message">Not found</div>
      )}
    </DocsLayout>
  );
}
