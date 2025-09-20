'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';
import SiteHeader from './SiteHeader';

export default function DocsLayout({ children, treeData, headings = [] }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Extract page info from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const isRoot = pathParts.length === 0;
  const isDocsRoute = pathParts[0] === 'docs';
  const section = isRoot ? 'welcome' : (isDocsRoute ? pathParts[1] : 'welcome');
  const pageParts = isDocsRoute ? pathParts.slice(2) : [];
  const page = pageParts.length ? pageParts.join('/') : null;
  const isSectionLanding = isDocsRoute && pathParts.length === 2;
  const isFeaturePage = section === 'features';
  const effectiveSection = isFeaturePage ? 'send-mobile-apps' : section;
  
  const sectionLabels = {
    'welcome': 'Welcome',
    'send-token': 'Send Token',
    'send-mobile-apps': 'Send Apps',
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
  
  const sectionLabel = sectionLabels[effectiveSection] || effectiveSection?.replace(/-/g, ' ') || 'Welcome';
  const pageLabel = page ? (pageLabels[page] || page.replace(/-/g, ' ')) : '';
  const currentId = page ? `${section}/${page}` : null;
  const currentSectionItems = (treeData && section && treeData[section]) ? treeData[section] : [];
  const currentItem = currentId ? currentSectionItems.find((it) => it.id === currentId) : null;
  const currentPageTitle = currentItem?.title || pageLabel;
  const effectiveSectionItems = (treeData && effectiveSection && treeData[effectiveSection]) ? treeData[effectiveSection] : [];
  const sectionLandingPath = section ? `/docs/${section}` : null;
  const shouldShowHero = isRoot || isSectionLanding;
  const heroConfigMap = {
    welcome: { image: '/img/welcome-banner.png', aria: 'Welcome to Send documentation' },
    'cusd-stablecoin': { image: '/img/cusd-banner.png', aria: 'CUSD stablecoin overview banner' }
  };
  const heroConfig = heroConfigMap[effectiveSection] || { image: '/img/globalwallet.png', aria: `${sectionLabel} hero` };

  const heroCards = useMemo(() => {
    if (!shouldShowHero) return [];
    if (isRoot) return navigationCards;
    return effectiveSectionItems.map((item) => {
      const titleText = item.title;
      const href = `/docs/${item.id}`;
      const initial = titleText.charAt(0).toUpperCase();
      return {
        id: item.id,
        href,
        title: titleText,
        icon: (
          <span className="nav-card-initial" aria-hidden="true">
            {initial}
          </span>
        )
      };
    });
  }, [shouldShowHero, isRoot, effectiveSectionItems]);

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
          {shouldShowHero && (
            <>
              <div className="welcome-header">
                <div className="welcome-title">{sectionLabel}</div>
              </div>
              <WelcomeHero backgroundImage={heroConfig.image} ariaLabel={heroConfig.aria} />
              {heroCards.length > 0 && (
                <div className="navigation-grid">
                  {heroCards.map((card) => (
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
              )}
            </>
          )}
          {!shouldShowHero && (
            <>
              <div className="breadcrumb-row">
                {sectionLandingPath ? (
                  <Link
                    href={sectionLandingPath}
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
          {!shouldShowHero && (
            <div className={`article-layout${headings.length ? ' has-toc' : ''}`}>
              <div className="article-container">
                {children}
              </div>
              {headings.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}
