'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';
import SiteHeader from './SiteHeader';

export default function DocsLayout({ children, treeData, headings = [] }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Extract page info from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const section = pathParts[1] || 'welcome';
  const page = pathParts[2] || 'send-overview';
  const isFeaturePage = section === 'features';
  const effectiveSection = isFeaturePage ? 'send-mobile-apps' : section;
  
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
  
  const sectionLabel = sectionLabels[effectiveSection] || effectiveSection.replace(/-/g, ' ');
  const pageLabel = pageLabels[page] || page.replace(/-/g, ' ');
  const currentId = `${section}/${page}`;
  const currentSectionItems = (treeData && treeData[section]) ? treeData[section] : [];
  const currentItem = currentSectionItems.find((it) => it.id === currentId);
  const currentPageTitle = currentItem?.title || pageLabel;
  const effectiveSectionItems = (treeData && treeData[effectiveSection]) ? treeData[effectiveSection] : [];
  const sectionDefault = effectiveSectionItems.length ? effectiveSectionItems[0].id : null;

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
                  <Link
                    key={card.id}
                    href={card.href}
                    className="nav-card"
                  >
                    <div className="nav-card-icon">
                      {card.icon}
                    </div>
                    <div className="nav-card-title">
                      {card.title}
                    </div>
                    <span className="nav-card-arrow" aria-hidden="true">
                      <Image
                        className="nav-card-arrow-icon"
                        src="/img/arrow.svg"
                        alt=""
                        width={10}
                        height={10}
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="breadcrumb-row">
                {sectionDefault ? (
                  <Link
                    href={`/docs/${sectionDefault}`}
                    className="breadcrumb-link breadcrumb-section"
                  >
                    {sectionLabel}
                  </Link>
                ) : (
                  <span className="breadcrumb-link breadcrumb-section">{sectionLabel}</span>
                )}
                {isFeaturePage && (
                  <>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-subsection">Features</span>
                  </>
                )}
                <span className="breadcrumb-separator">&gt;</span>
                <span className="breadcrumb-current">{currentPageTitle}</span>
              </div>
              <div className="divider"></div>
            </>
          )}
          <div className={`article-layout${pathname !== '/' && headings.length ? ' has-toc' : ''}`}>
            <div className="article-container">
              {children}
            </div>
            {pathname !== '/' && headings.length > 0 && (
              <aside className="article-toc" aria-label="On this page">
                <ul className="toc-list">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={`toc-item toc-item-depth-${heading.level}`}
                    >
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
