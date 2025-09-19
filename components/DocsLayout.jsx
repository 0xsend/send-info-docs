import SidebarNav from './SidebarNav';

export default function DocsLayout({ children }) {
  return (
    <div className="docs-shell">
      <SidebarNav />
      <div className="content-panel">
        {children}
      </div>
    </div>
  );
}
