'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';
import SiteHeader from './SiteHeader';

export default function DocsLayout({ children, treeData }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
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
  const currentId = `${section}/${page}`;
  const currentItem = (treeData && treeData[section]) ? treeData[section].find((it) => it.id === currentId) : null;
  const currentPageTitle = currentItem?.title || pageLabel;
  const sectionDefault = (treeData && treeData[section] && treeData[section][0]) ? treeData[section][0].id : null;

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className={`docs-shell ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
      <SidebarNav
        treeData={treeData}
        isMobileOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      {isMobileNavOpen && (
        <button
          type="button"
          className="mobile-nav-overlay"
          aria-label="Close menu"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
      <div className="content-panel">
        <div className="main-content">
          <div className="mobile-header">
            <SiteHeader />
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label="Open menu"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          {pathname === '/' && (
            <div className="welcome-header">
              <div className="welcome-title">{sectionLabel}</div>
            </div>
          )}
          {pathname === '/' ? (
            <>
              <WelcomeHero />
              <div className="divider"></div>
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
            </>
          ) : (
            <>
              <div className="breadcrumb-row">
                {sectionDefault ? (
                  <Link href={`/docs/${sectionDefault}`} className="breadcrumb-link breadcrumb-section">{sectionLabel}</Link>
                ) : (
                  <span className="breadcrumb-link breadcrumb-section">{sectionLabel}</span>
                )}
                <span className="breadcrumb-separator">&gt;</span>
                <span className="breadcrumb-current">{currentPageTitle}</span>
              </div>
              <div className="divider"></div>
            </>
          )}
          <div className="article-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
