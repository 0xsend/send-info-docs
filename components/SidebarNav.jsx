import Link from 'next/link';
import { buildSidebarTree } from '../lib/md';

export default function SidebarNav() {
  const tree = buildSidebarTree();
  const sections = Object.keys(tree);
  return (
    <nav className="theme-doc-sidebar-container sidebar-panel">
      <ul className="menu__list" style={{ listStyle: 'none', margin: 0, padding: '1rem' }}>
        {sections.map((section) => (
          <li key={section} style={{ marginBottom: '0.75rem' }}>
            <div className="menu__link" style={{ fontWeight: 700, marginBottom: '0.25rem', display: 'block' }}>
              {section.replace(/-/g, ' ')}
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: '0.75rem', margin: 0 }}>
              {tree[section].map((item) => (
                <li key={item.id} style={{ margin: '0.2rem 0' }}>
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
