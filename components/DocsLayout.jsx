'use client';

import { usePathname } from 'next/navigation';
import SidebarNav from './SidebarNav';

export default function DocsLayout({ children, treeData }) {
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
      <SidebarNav treeData={treeData} />
      <div className="content-panel">
        <div className="main-content">
          <div className="welcome-header">
            <div className="welcome-title">{sectionLabel}</div>
          </div>
          {section === 'welcome' && (
            <>
              {/** Banner on Welcome docs pages */}
              {require('./WelcomeHero') && null}
            </>
          )}
          {section === 'welcome' ? <div className="divider"></div> : <div className="divider"></div>}
          <div style={{ maxWidth: '734px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
