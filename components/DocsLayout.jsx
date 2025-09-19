'use client';

import { usePathname } from 'next/navigation';
import SidebarNav from './SidebarNav';
import SiteHeader from './SiteHeader';

// Extract headings for table of contents
function extractHeadings(content) {
  if (typeof content !== 'string') return [];
  
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]*)</g;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3];
    
    if (level <= 3) { // Only show h1, h2, h3 in TOC
      headings.push({ level, id, text });
    }
  }
  
  return headings;
}

function TableOfContents({ content }) {
  const headings = extractHeadings(content);
  
  if (headings.length === 0) {
    // Default TOC for Send Overview page
    const defaultToc = [
      { id: 'what-we-do', text: 'What We Do' },
      { id: 'why-it-matters', text: 'Why It Matters' },
      { id: 'what-you-get', text: 'What You Get' },
      { id: 'why-were-different', text: 'Why We\'re Different' }
    ];
    
    return (
      <div className="toc-panel">
        {defaultToc.map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            className="toc-item"
          >
            {item.text}
          </a>
        ))}
      </div>
    );
  }
  
  return (
    <div className="toc-panel">
      {headings.map((heading) => (
        <a 
          key={heading.id} 
          href={`#${heading.id}`} 
          className="toc-item"
          style={{ paddingLeft: `${(heading.level - 1) * 8}px` }}
        >
          {heading.text}
        </a>
      ))}
    </div>
  );
}

export default function DocsLayout({ children, content }) {
  const pathname = usePathname();
  
  // Extract page info from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const section = pathParts[1] || 'welcome';
  const page = pathParts[2] || 'send-overview';
  
  const sectionLabels = {
    'welcome': 'Welcome',
    'send-token': 'Send Token',
    'send-mobile-apps': 'Send Mobile Apps',
    'canton-wallet': 'Canton Wallet',
    'cusd-stablecoin': 'CUSD Stablecoin',
    'finance': 'Finance',
    'miscellaneous': 'Miscellaneous',
    'legal': 'Legal'
  };
  
  const pageLabels = {
    'send-overview': 'Send Overview',
    'problem-statement': 'Problem Statement',
    'mission-vision-values': 'Mission, Vision and Values',
    'team': 'Team',
    'contact': 'Contact'
  };
  
  const sectionLabel = sectionLabels[section] || section.replace(/-/g, ' ');
  const pageLabel = pageLabels[page] || page.replace(/-/g, ' ');
  
  return (
    <div className="docs-shell">
      <SidebarNav />
      <div className="content-panel">
        <div className="main-content">
          <div className="page-header">
            <div className="page-title">{sectionLabel}</div>
            <svg 
              className="breadcrumb-arrow"
              width="20" 
              height="20" 
              viewBox="0 0 7 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.0625 5L1.0625 10L-4.64434e-08 8.9375L3.9375 5L-3.90671e-07 1.0625L1.0625 -4.64434e-08L6.0625 5Z" fill="white"/>
            </svg>
            <div className="page-subtitle">{pageLabel}</div>
          </div>
          <div className="page-divider"></div>
          {children}
        </div>
        <TableOfContents content={content} />
      </div>
    </div>
  );
}
