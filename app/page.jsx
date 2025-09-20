import DocsLayout from '../components/DocsLayout';
import { buildSidebarTree } from '../lib/md';

export const metadata = {
  description: 'Explore Send’s core concepts, products, and roadmap from one home.',
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
