import WelcomePage from '../components/WelcomePage';
import SidebarNav from '../components/SidebarNav';
import { buildSidebarTree } from '../lib/md';

export default function HomePage() {
  const sidebarTree = buildSidebarTree();

  return (
    <div className="docs-shell">
      <SidebarNav treeData={sidebarTree} />
      <div className="content-panel">
        <WelcomePage />
      </div>
    </div>
  );
}
