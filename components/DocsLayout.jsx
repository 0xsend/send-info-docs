'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';

export default function DocsLayout({ children, treeData }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
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

  return (
    <div className="docs-shell">
      <SidebarNav treeData={treeData} />
      <div className="content-panel">
        <div className="mobile-header">
          <div className="mobile-header-left">
            <Link href="/" aria-label="Go to home" className="brand-link">
              <svg width="88" height="32" viewBox="0 0 88 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17137_10184)">
                  <path d="M0 32L9.13386 0H13.392L4.25812 32H0Z" fill="#122023"/>
                  <path d="M20.0657 28.5185C18.4393 28.5185 17.0256 28.2589 15.8247 27.7395C14.6238 27.2202 13.6768 26.4959 12.9871 25.5666C12.294 24.6373 11.8891 23.5679 11.769 22.3584H16.137C16.2571 22.8675 16.4767 23.3321 16.7923 23.7524C17.108 24.176 17.5369 24.5074 18.0859 24.75C18.6314 24.9926 19.2799 25.1122 20.0314 25.1122C20.7828 25.1122 21.3524 25.0097 21.8156 24.8047C22.2754 24.5997 22.6151 24.3263 22.8347 23.9881C23.0543 23.6499 23.1606 23.2877 23.1606 22.9016C23.1606 22.3208 23.0028 21.8766 22.6871 21.5623C22.3715 21.248 21.9151 21.002 21.3215 20.8209C20.7279 20.6398 20.0177 20.4656 19.1907 20.2947C18.3158 20.1273 17.4751 19.9155 16.6619 19.6593C15.8487 19.4064 15.1213 19.0853 14.4797 18.6992C13.8381 18.3131 13.3268 17.8177 12.9528 17.213C12.5754 16.6082 12.3901 15.8736 12.3901 15.0024C12.3901 13.9398 12.6749 12.9866 13.2445 12.1393C13.814 11.2954 14.641 10.6223 15.7184 10.1269C16.7992 9.63149 18.0893 9.3855 19.5956 9.3855C21.7298 9.3855 23.4351 9.87407 24.7081 10.8512C25.9811 11.8284 26.7291 13.2019 26.9452 14.9648H22.7969C22.6768 14.2883 22.3371 13.7622 21.7779 13.3898C21.2186 13.0174 20.4809 12.8294 19.5579 12.8294C18.6349 12.8294 17.8903 13.0037 17.3928 13.3556C16.8953 13.7075 16.6482 14.1722 16.6482 14.7496C16.6482 15.1357 16.7992 15.4739 17.1046 15.7643C17.4065 16.0547 17.8491 16.3041 18.4324 16.5057C19.0157 16.7107 19.7294 16.9089 20.5804 17.1036C21.9391 17.3701 23.14 17.6845 24.1831 18.0466C25.2262 18.4088 26.0497 18.9418 26.657 19.6422C27.2643 20.3426 27.5663 21.002 27.5663 21.002C27.5663 21.002 27.5663 21.002 27.5663 21.002Z" fill="#122023"/>
                </g>
                <defs>
                  <clipPath id="clip0_17137_10184">
                    <rect width="88" height="32" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="docs-badge bubble">docs</span>
            </Link>
          </div>
          <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMobileNavOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {mobileNavOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true">
            <div className="mobile-drawer-header">
              <span>Menu</span>
              <button className="mobile-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>×</button>
            </div>
            <SidebarNav treeData={treeData} />
          </div>
        )}
        <div className="main-content">
          {pathname === '/' && (
            <div className="welcome-header">
              <div className="welcome-title">{sectionLabel}</div>
            </div>
          )}
          {pathname === '/' ? (
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
