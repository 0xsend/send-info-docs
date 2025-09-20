import DocsLayout from '../components/DocsLayout';
import { buildSidebarTree } from '../lib/md';

export const metadata = {
  openGraph: {
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
