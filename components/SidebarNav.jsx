'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SiteHeader from './SiteHeader';
import SearchDialog from './SearchDialog';
import React from 'react';

const SidebarIcon = ({ name }) => (
  <span className="material-symbols-outlined" style={{ fontSize: '20px' }} aria-hidden="true">{name}</span>
);

const sectionIcons = {
  'welcome': <SidebarIcon name="language" />,
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
  'finance': <SidebarIcon name="attach_money" />,
  'miscellaneous': <SidebarIcon name="more_horiz" />,
  'legal': <SidebarIcon name="gavel" />,
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
