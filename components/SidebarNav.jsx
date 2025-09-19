import Link from 'next/link';
import { buildSidebarTree } from '../lib/md';

export default function SidebarNav() {
  const tree = buildSidebarTree();
  const sections = Object.keys(tree);
  return (
    <nav className="theme-doc-sidebar-container sidebar-panel">
      <ul className="menu__list sidebar-list">
        {sections.map((section) => (
          <li key={section} className="sidebar-section">
            <div className="menu__link sidebar-section-title">
              {section.replace(/-/g, ' ')}
            </div>
            <ul className="sidebar-sublist">
              {tree[section].map((item) => (
                <li key={item.id} className="sidebar-item">
                  <Link href={`/docs/${item.id}`} className="menu__link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
