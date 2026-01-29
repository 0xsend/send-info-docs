'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SiteHeader from './SiteHeader';
import SearchDialog from './SearchDialog';
import React from 'react';

const sectionIcons = {
  'welcome': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" fill="currentColor"/>
    </svg>
  ),
  'send-token': (
    <Image
      src="/img/sendtoken.png"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'send-mobile-apps': (
    <Image
      src="/img/sendapps.png"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'send-safe': (
    <Image
      src="/img/cantonwallet.png"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'cusd-stablecoin': (
    <Image
      src="/img/cusdstablecoin.jpg"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'finance': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" fill="currentColor"/>
    </svg>
  ),
  'miscellaneous': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" fill="currentColor"/>
    </svg>
  ),
  'legal': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
      <path d="M2.3,20.28L11.9,10.68L10.5,9.26L9.78,9.97C9.39,10.36 8.76,10.36 8.37,9.97L7.66,9.26C7.27,8.87 7.27,8.24 7.66,7.85L13.32,2.19C13.71,1.8 14.34,1.8 14.73,2.19L15.44,2.9C15.83,3.29 15.83,3.92 15.44,4.31L14.73,5L16.15,6.43C16.54,6.04 17.17,6.04 17.56,6.43C17.95,6.82 17.95,7.46 17.56,7.85L18.97,9.26L19.68,8.55C20.07,8.16 20.71,8.16 21.1,8.55L21.8,9.26C22.19,9.65 22.19,10.29 21.8,10.68L16.15,16.33C15.76,16.72 15.12,16.72 14.73,16.33L14.03,15.63C13.63,15.24 13.63,14.6 14.03,14.21L14.73,13.5L13.32,12.09L3.71,21.7C3.32,22.09 2.69,22.09 2.3,21.7C1.91,21.31 1.91,20.67 2.3,20.28M20,19A2,2 0 0,1 22,21V22H12V21A2,2 0 0,1 14,19H20Z" fill="currentColor"/>
    </svg>
  )
};

const sectionLabels = {
  'welcome': 'Send Foundation',
  'send-token': 'Send Token',
  'send-mobile-apps': 'Send App',
  'features': 'Features',
  'send-safe': 'Send Canton Wallet',
  'cusd-stablecoin': 'CUSD Stablecoin',
  'finance': 'Finance',
  'miscellaneous': 'Miscellaneous',
  'legal': 'Legal'
};

export default function SidebarNav({ treeData, isMobileOpen = false, onClose }) {
  const tree = treeData;
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Desired order
  const desiredOrder = [
    'welcome',
    'send-mobile-apps',
    'send-token',
    'send-safe',
    'cusd-stablecoin',
    'finance',
    'miscellaneous',
    'legal'
  ];

  // Filter existing keys to desired order and drop "links" section
  const sections = desiredOrder.filter((key) => tree[key]);

  const pathSegments = pathname.split('/').filter(Boolean);
  const currentSection =
    pathSegments[0] === 'docs' ? pathSegments[1] ?? null : null;

  const [expandedSections, setExpandedSections] = useState(() => {
    if (currentSection && sections.includes(currentSection)) {
      return [currentSection];
    }
    return [];
  });

  const featureItems = tree['features'] || [];
  const isFeatureDetailPath = pathname.startsWith('/docs/features/');
  const isFeatureLandingPath = pathname === '/docs/send-mobile-apps/features';
  const shouldExpandFeatures = isFeatureDetailPath || isFeatureLandingPath;
  const [featuresExpanded, setFeaturesExpanded] = useState(shouldExpandFeatures);
  const prevSectionRef = useRef(currentSection);

  useEffect(() => {
    const prevSection = prevSectionRef.current;

    if (currentSection !== prevSection) {
      if (currentSection && sections.includes(currentSection)) {
        setExpandedSections((prev) => (
          prev.includes(currentSection) ? prev : [...prev, currentSection]
        ));
      }

      if (!currentSection) {
        setExpandedSections([]);
      }

      prevSectionRef.current = currentSection;
    }
  }, [currentSection, sections]);

  useEffect(() => {
    if (shouldExpandFeatures) {
      setExpandedSections((prev) => (
        prev.includes('send-mobile-apps') ? prev : [...prev, 'send-mobile-apps']
      ));
    }
  }, [shouldExpandFeatures]);

  useEffect(() => {
    setFeaturesExpanded(shouldExpandFeatures);
  }, [shouldExpandFeatures]);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActiveSection = (section) => {
    if (section === 'welcome') {
      return pathname.startsWith('/docs/welcome');
    }
    if (section === 'send-mobile-apps') {
      return pathname.startsWith('/docs/send-mobile-apps') || pathname.startsWith('/docs/features');
    }
    return pathname.startsWith(`/docs/${section}`);
  };

  const isActiveLink = (itemId) => {
    if (itemId === 'send-mobile-apps/features') {
      return pathname === `/docs/${itemId}` || isFeatureDetailPath;
    }
    return pathname === `/docs/${itemId}`;
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <nav className={`sidebar-panel ${isMobileOpen ? 'open' : ''}`}>
      <div className="sidebar-mobile-controls">
        <SiteHeader />
        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <button
        className="sidebar-search-button"
        onClick={() => setSearchOpen(true)}
        aria-label="Search documentation"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            fill="currentColor"
          />
        </svg>
        <span>Search</span>
      </button>
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ul className="sidebar-list">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section);
          const isActive = isActiveSection(section);
          const label = sectionLabels[section] || section.replace(/-/g, ' ');
          
          return (
            <li key={section} className={`sidebar-section ${isExpanded ? 'expanded' : ''}`}>
              <div className={`sidebar-section-header ${isActive ? 'active' : ''}`}>
                <Link
                  href={`/docs/${section}`}
                  className={`sidebar-section-link ${isActive ? 'active' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLinkClick();
                  }}
                >
                  <div className="sidebar-section-content">
                    <div className="sidebar-section-icon">
                      {sectionIcons[section] || sectionIcons['miscellaneous']}
                    </div>
                    <div className={`sidebar-section-title ${isActive ? 'active' : ''}`}>
                      {label}
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  className={`sidebar-section-toggle ${isExpanded ? 'expanded' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSection(section);
                  }}
                  aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
                  aria-expanded={isExpanded}
                >
                  <svg
                    className={`sidebar-arrow ${isExpanded ? 'expanded' : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 0.9375L10 5.9375L8.9375 7L5 3.0625L1.0625 7L9.28867e-08 5.9375L5 0.9375Z" fill="#666"/>
                  </svg>
                </button>
              </div>
              {isExpanded && (
                <ul className="sidebar-sublist expanded">
                  {tree[section].map((item) => {
                    const isFeaturesItem =
                      section === 'send-mobile-apps' && item.id === 'send-mobile-apps/features' && featureItems.length > 0;

                    if (isFeaturesItem) {
                      const isItemActive = isActiveLink(item.id);
                      return (
                        <li key={item.id} className={`sidebar-item sidebar-item-with-children${featuresExpanded ? ' expanded' : ''}`}>
                          <div className="sidebar-item-toggle-row">
                            <Link
                              href={`/docs/${item.id}`}
                              className={`sidebar-link ${isItemActive ? 'active' : ''}`}
                              onClick={handleLinkClick}
                            >
                              {item.title}
                            </Link>
                            <button
                              type="button"
                              className={`sidebar-item-toggle ${featuresExpanded ? 'expanded' : ''}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                setFeaturesExpanded((prev) => !prev);
                              }}
                              aria-expanded={featuresExpanded}
                              aria-label={featuresExpanded ? 'Collapse Features' : 'Expand Features'}
                            >
                              <svg
                                className={`sidebar-arrow ${featuresExpanded ? 'expanded' : ''}`}
                                width="20"
                                height="20"
                                viewBox="0 0 10 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M5 0.9375L10 5.9375L8.9375 7L5 3.0625L1.0625 7L9.28867e-08 5.9375L5 0.9375Z" fill="#666"/>
                              </svg>
                            </button>
                          </div>
                          <ul className={`sidebar-sublist nested-group ${featuresExpanded ? 'expanded' : ''}`}>
                            {featureItems.map((featureItem) => (
                              <li key={featureItem.id} className="sidebar-item nested">
                                <Link
                                  href={`/docs/${featureItem.id}`}
                                  className={`sidebar-link ${isActiveLink(featureItem.id) ? 'active' : ''}`}
                                  onClick={handleLinkClick}
                                >
                                  {featureItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li key={item.id} className="sidebar-item">
                        <Link
                          href={`/docs/${item.id}`}
                          className={`sidebar-link ${isActiveLink(item.id) ? 'active' : ''}`}
                          onClick={handleLinkClick}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
