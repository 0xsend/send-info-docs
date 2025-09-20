import DocsLayout from '../components/DocsLayout';
import { buildSidebarTree } from '../lib/md';

export const metadata = {
  openGraph: {
    title: 'Send Docs – Welcome Hub',
    images: [{ url: '/img/welcome-opengraph.png' }]
  }
};

export default function HomePage() {
  const sidebarTree = buildSidebarTree();
  return (
    <DocsLayout treeData={sidebarTree}>
      <></>
    </DocsLayout>
  );
}
