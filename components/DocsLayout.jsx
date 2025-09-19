'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';

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
              <WelcomeHero />
              <div className="navigation-grid">
                {navigationCards.map((card) => (
                  <Link key={card.id} href={card.href} className="nav-card">
                    <div className="nav-card-icon">
                      {card.icon}
                    </div>
                    <div className="nav-card-title">
                      {card.title}
                    </div>
                    <svg
                      className="nav-card-arrow"
                      width="32"
                      height="32"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.89995 8L1.89995 16L0.199951 14.3L6.49995 8L0.199951 1.7L1.89995 1.83304e-06L9.89995 8Z" fill="#666666"/>
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="divider"></div>
            </>
          )}
          {section !== 'welcome' && <div className="divider"></div>}
          <div className="article-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
