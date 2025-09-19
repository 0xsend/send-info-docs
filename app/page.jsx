import DocsLayout from '../components/DocsLayout';
import { buildSidebarTree } from '../lib/md';

export default function HomePage() {
  const sidebarTree = buildSidebarTree();
  return (
    <DocsLayout treeData={sidebarTree}>
      {/* Empty on purpose: root welcome page shows only banner + nav cards */}
    </DocsLayout>
  );
}
