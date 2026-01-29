'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';
import SiteHeader from './SiteHeader';

const HeroIcon = ({ name }) => (
  <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#1C1B1F' }} aria-hidden="true">{name}</span>
);

const heroItemIcons = {
  'welcome/send-overview': <HeroIcon name="dashboard" />,
  'welcome/problem-statement': <HeroIcon name="error" />,
  'welcome/mission-vision-values': <HeroIcon name="hub" />,
  'welcome/team': <HeroIcon name="group" />,
  'welcome/contact': <HeroIcon name="alternate_email" />,
  'send-token/send-token-overview': <HeroIcon name="dashboard" />,
  'send-token/tokenomics': <HeroIcon name="pie_chart" />,
  'send-token/distribution': <HeroIcon name="bar_chart" />,
  'send-token/faqs': <HeroIcon name="help" />,
  'send-token/bridge': <HeroIcon name="swap_vert" />,
  'send-token/upgrade': <HeroIcon name="upgrade" />,
  'send-mobile-apps/faqs': <HeroIcon name="help" />,
  'send-mobile-apps/features': <HeroIcon name="grid_view" />,
  'send-mobile-apps/overview': <HeroIcon name="dashboard" />,
  'send-safe/overview': <HeroIcon name="dashboard" />,
  'cusd-stablecoin/overview': <HeroIcon name="dashboard" />,
  'cusd-stablecoin/reserves-report': <HeroIcon name="description" />,
  'cusd-stablecoin/faqs': <HeroIcon name="help" />,
  'send-safe/passkeys': <HeroIcon name="fingerprint" />,
  'send-safe/wallet-maintenance': <HeroIcon name="build" />,
  'send-safe/safe': <HeroIcon name="shield" />,
  'send-safe/canton-coin-rewards': <HeroIcon name="star" />,
  'send-safe/pool-party-exchange': <HeroIcon name="pool" />,
  'finance/multisigs': <HeroIcon name="key" />,
  'finance/token-emissions': <HeroIcon name="swap_horiz" />,
  'finance/treasury': <HeroIcon name="account_balance" />,
  'finance/funding-rounds': <HeroIcon name="trending_up" />,
  'finance/revenue': <HeroIcon name="bar_chart" />,
  'finance/business-models': <HeroIcon name="adjust" />,
  'miscellaneous/roadmap': <HeroIcon name="arrow_forward" />,
  'miscellaneous/send-metrics': <HeroIcon name="bar_chart" />,
  'miscellaneous/intellectual-property': <HeroIcon name="verified" />,
  'miscellaneous/send-contract-addresses': <HeroIcon name="code" />,
  'miscellaneous/brand-links-assets': <HeroIcon name="campaign" />,
  'miscellaneous/glossary': <HeroIcon name="menu_book" />,
  'legal/affiliate-marketing-disclaimer': <HeroIcon name="handshake" />,
  'legal/disclaimer': <HeroIcon name="warning" />,
  'legal/licenses': <HeroIcon name="info" />,
  'legal/prohibited-activities': <HeroIcon name="block" />,
  'legal/terms-of-service': <HeroIcon name="gavel" />,
  'legal/privacy-policy': <HeroIcon name="lock" />,
};

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
    'welcome': 'Send Foundation',
    'send-token': 'Send Token',
    'send-mobile-apps': 'Send App',
    'send-safe': 'Send Canton Wallet',
    'cusd-stablecoin': 'CUSD Stablecoin',
    'finance': 'Finance',
    'miscellaneous': 'Miscellaneous',
    'legal': 'Legal'
  };
  
  const pageLabels = {
    'send-overview': 'Overview',
    'problem-statement': 'Problem Statement',
    'mission-vision-values': 'Core Values',
    'team': 'Team',
    'contact': 'Contact'
  };
  
  const sectionLabel = isRoot ? 'Welcome' : (sectionLabels[effectiveSection] || effectiveSection?.replace(/-/g, ' ') || 'Welcome');
  const pageLabel = page ? (pageLabels[page] || page.replace(/-/g, ' ')) : '';
  const currentId = page ? `${section}/${page}` : null;
  const currentSectionItems = (treeData && section && treeData[section]) ? treeData[section] : [];
  const currentItem = currentId ? currentSectionItems.find((it) => it.id === currentId) : null;
  const currentPageTitle = currentItem?.title || pageLabel;
  const effectiveSectionItems = (treeData && effectiveSection && treeData[effectiveSection]) ? treeData[effectiveSection] : [];
  const sectionLandingPath = section ? `/docs/${section}` : null;
  const shouldShowHero = isRoot || isSectionLanding;
  const heroConfigMap = {
    root: { image: '/img/yourprivateneobank.png', aria: 'Your private neobank - Send' },
    welcome: { image: '/img/privatebydefault.png', aria: 'Private by default - Send Foundation' },
    'send-token': { image: '/img/send-token-banner.png', aria: 'Send Token documentation banner' },
    'send-mobile-apps': { image: '/img/globalbynature.png', aria: 'Global by nature - Send App' },
    'send-safe': { image: '/img/theprivacyfirstwallet.png', aria: 'The privacy first wallet - Send Canton Wallet' },
    'cusd-stablecoin': { image: '/img/cusd-banner.png', aria: 'CUSD stablecoin overview banner' },
    finance: { image: '/img/futurecash.png', aria: 'Future cash - Finance' },
    miscellaneous: { image: '/img/thefutureofmoney.png', aria: 'The future of money - Miscellaneous' },
    legal: { image: '/img/stayingtransparent.png', aria: 'Staying transparent - Legal' }
  };
  const heroConfig = isRoot ? heroConfigMap.root : (heroConfigMap[effectiveSection] || { image: '/img/globalwallet.png', aria: `${sectionLabel} hero` });

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
          heroItemIcons[item.id] || (
            <span className="nav-card-initial" aria-hidden="true">
              {initial}
            </span>
          )
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
                <div className={`navigation-grid ${isRoot ? 'grid-2-col' : 'grid-3-col'}`}>
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
