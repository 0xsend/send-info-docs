'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SiteHeader from './SiteHeader';
import React from 'react';

const sectionIcons = {
  'welcome': (
    <svg width="20" height="20" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 12.5H3.5V7.5H8.5V12.5H10.5V5.25L6 1.875L1.5 5.25V12.5ZM0 14V4.5L6 0L12 4.5V14H7V9H5V14H0Z" fill="currentColor"/>
    </svg>
  ),
  'send-token': (
    <Image
      src="/img/sendtokenicon.svg"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'send-mobile-apps': (
    <Image
      src="/img/sendappicon.svg"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'canton-wallet': (
    <Image
      src="/img/cantonwalleticon.svg"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'cusd-stablecoin': (
    <Image
      src="/img/cusdicon.svg"
      alt=""
      width={20}
      height={20}
      className="sidebar-section-icon-image"
    />
  ),
  'finance': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66667 9.79175V6.25008C6.66667 5.90286 6.78833 5.60786 7.03167 5.36508C7.275 5.12231 7.57 5.00064 7.91667 5.00008C8.26333 4.99953 8.55861 5.12119 8.8025 5.36508C9.04639 5.60897 9.16778 5.90397 9.16667 6.25008V9.79175C9.16667 10.139 9.04528 10.4342 8.8025 10.6776C8.55972 10.9209 8.26444 11.0423 7.91667 11.0417C7.56889 11.0412 7.27389 10.9198 7.03167 10.6776C6.78944 10.4354 6.66778 10.1401 6.66667 9.79175ZM10.8333 9.60425V2.91675C10.8333 2.56953 10.955 2.27453 11.1983 2.03175C11.4417 1.78897 11.7367 1.66731 12.0833 1.66675C12.43 1.66619 12.7253 1.78786 12.9692 2.03175C13.2131 2.27564 13.3344 2.57064 13.3333 2.91675V9.60425C13.3333 10.0209 13.205 10.3334 12.9483 10.5417C12.6917 10.7501 12.4033 10.8542 12.0833 10.8542C11.7633 10.8542 11.4753 10.7501 11.2192 10.5417C10.9631 10.3334 10.8344 10.0209 10.8333 9.60425ZM2.5 12.4792V9.58342C2.5 9.23619 2.62167 8.94119 2.865 8.69842C3.10833 8.45564 3.40333 8.33397 3.75 8.33342C4.09667 8.33286 4.39194 8.45453 4.63583 8.69842C4.87972 8.9423 5.00111 9.23731 5 9.58342V12.4792C5 12.8959 4.87167 13.2084 4.615 13.4167C4.35833 13.6251 4.07 13.7292 3.75 13.7292C3.43 13.7292 3.14194 13.6251 2.88583 13.4167C2.62972 13.2084 2.50111 12.8959 2.5 12.4792ZM4.5 17.5417C4.13889 17.5417 3.88528 17.3717 3.73917 17.0317C3.59306 16.6917 3.65222 16.3895 3.91667 16.1251L7.33333 12.7084C7.48611 12.5556 7.67028 12.4723 7.88583 12.4584C8.10139 12.4445 8.29222 12.514 8.45833 12.6667L10.8333 14.7084L15.5 10.0417H15C14.7639 10.0417 14.5661 9.96175 14.4067 9.80175C14.2472 9.64175 14.1672 9.44397 14.1667 9.20842C14.1661 8.97286 14.2461 8.77508 14.4067 8.61508C14.5672 8.45508 14.765 8.37508 15 8.37508H17.5C17.7361 8.37508 17.9342 8.45508 18.0942 8.61508C18.2542 8.77508 18.3339 8.97286 18.3333 9.20842V11.7084C18.3333 11.9445 18.2533 12.1426 18.0933 12.3026C17.9333 12.4626 17.7356 12.5423 17.5 12.5417C17.2644 12.5412 17.0667 12.4612 16.9067 12.3017C16.7467 12.1423 16.6667 11.9445 16.6667 11.7084V11.2084L11.4583 16.4167C11.3056 16.5695 11.1214 16.6529 10.9058 16.6667C10.6903 16.6806 10.4994 16.6112 10.3333 16.4584L7.95833 14.4167L5.08333 17.2917C5.01389 17.3612 4.92722 17.4204 4.82333 17.4692C4.71944 17.5181 4.61167 17.5423 4.5 17.5417Z" fill="currentColor"/>
    </svg>
  ),
  'miscellaneous': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7083 15.625C12.875 15.625 13.0208 15.5625 13.1458 15.4375C13.2708 15.3125 13.3333 15.1667 13.3333 15C13.3333 14.8333 13.2708 14.6875 13.1458 14.5625C13.0208 14.4375 12.875 14.375 12.7083 14.375C12.5417 14.375 12.3958 14.4375 12.2708 14.5625C12.1458 14.6875 12.0833 14.8333 12.0833 15C12.0833 15.1667 12.1458 15.3125 12.2708 15.4375C12.3958 15.5625 12.5417 15.625 12.7083 15.625ZM15 15.625C15.1667 15.625 15.3125 15.5625 15.4375 15.4375C15.5625 15.3125 15.625 15.1667 15.625 15C15.625 14.8333 15.5625 14.6875 15.4375 14.5625C15.3125 14.4375 15.1667 14.375 15 14.375C14.8333 14.375 14.6875 14.4375 14.5625 14.5625C14.4375 14.6875 14.375 14.8333 14.375 15C14.375 15.1667 14.4375 15.3125 14.5625 15.4375C14.6875 15.5625 14.8333 15.625 15 15.625ZM17.2917 15.625C17.4583 15.625 17.6042 15.5625 17.7292 15.4375C17.8542 15.3125 17.9167 15.1667 17.9167 15C17.9167 14.8333 17.8542 14.6875 17.7292 14.5625C17.6042 14.4375 17.4583 14.375 17.2917 14.375C17.125 14.375 16.9792 14.4375 16.8542 14.5625C16.7292 14.6875 16.6667 14.8333 16.6667 15C16.6667 15.1667 16.7292 15.3125 16.8542 15.4375C16.9792 15.5625 17.125 15.625 17.2917 15.625ZM4.16667 17.5C3.70833 17.5 3.31611 17.3369 2.99 17.0108C2.66389 16.6847 2.50056 16.2922 2.5 15.8333V4.16667C2.5 3.70833 2.66333 3.31611 2.99 2.99C3.31667 2.66389 3.70889 2.50056 4.16667 2.5H15.8333C16.2917 2.5 16.6842 2.66333 17.0108 2.99C17.3375 3.31667 17.5006 3.70889 17.5 4.16667V8.33333C17.5 8.56944 17.42 8.7675 17.26 8.9275C17.1 9.0875 16.9022 9.16722 16.6667 9.16667C16.4311 9.16611 16.2333 9.08611 16.0733 8.92667C15.9133 8.76722 15.8333 8.56944 15.8333 8.33333V4.16667H4.16667V15.8333H8.33333C8.56944 15.8333 8.7675 15.9133 8.9275 16.0733C9.0875 16.2333 9.16722 16.4311 9.16667 16.6667C9.16611 16.9022 9.08611 17.1003 8.92667 17.2608C8.76722 17.4214 8.56944 17.5011 8.33333 17.5H4.16667ZM4.16667 15V15.8333V4.16667V9.22917V9.16667V15ZM5.83333 13.3333C5.83333 13.5694 5.91333 13.7675 6.07333 13.9275C6.23333 14.0875 6.43111 14.1672 6.66667 14.1667H8.39583C8.63194 14.1667 8.83 14.0867 8.99 13.9267C9.15 13.7667 9.22972 13.5689 9.22917 13.3333C9.22861 13.0978 9.14889 12.9 8.99 12.74C8.83111 12.58 8.63306 12.5 8.39583 12.5H6.66667C6.43056 12.5 6.23278 12.58 6.07333 12.74C5.91389 12.9 5.83389 13.0978 5.83333 13.3333ZM5.83333 10C5.83333 10.2361 5.91333 10.4342 6.07333 10.5942C6.23333 10.7542 6.43111 10.8339 6.66667 10.8333H10.8333C11.0694 10.8333 11.2675 10.7533 11.4275 10.5933C11.5875 10.4333 11.6672 10.2356 11.6667 10C11.6661 9.76444 11.5861 9.56667 11.4267 9.40667C11.2672 9.24667 11.0694 9.16667 10.8333 9.16667H6.66667C6.43056 9.16667 6.23278 9.24667 6.07333 9.40667C5.91389 9.56667 5.83389 9.76444 5.83333 10ZM5.83333 6.66667C5.83333 6.90278 5.91333 7.10083 6.07333 7.26083C6.23333 7.42083 6.43111 7.50056 6.66667 7.5H13.3333C13.5694 7.5 13.7675 7.42 13.9275 7.26C14.0875 7.1 14.1672 6.90222 14.1667 6.66667C14.1661 6.43111 14.0861 6.23333 13.9267 6.07333C13.7672 5.91333 13.5694 5.83333 13.3333 5.83333H6.66667C6.43056 5.83333 6.23278 5.91333 6.07333 6.07333C5.91389 6.23333 5.83389 6.43111 5.83333 6.66667ZM15 19.1667C13.8472 19.1667 12.8647 18.7603 12.0525 17.9475C11.2403 17.1347 10.8339 16.1522 10.8333 15C10.8328 13.8478 11.2392 12.8653 12.0525 12.0525C12.8658 11.2397 13.8483 10.8333 15 10.8333C16.1517 10.8333 17.1344 11.2397 17.9483 12.0525C18.7622 12.8653 19.1683 13.8478 19.1667 15C19.165 16.1522 18.7586 17.135 17.9475 17.9483C17.1364 18.7617 16.1539 19.1678 15 19.1667Z" fill="currentColor"/>
    </svg>
  ),
  'legal': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.9999 2.5C8.94157 2.5 7.9999 3.16667 7.6499 4.16667H2.4999V5.83333H4.1249L1.66657 11.6667C1.2749 13.3333 2.4999 14.1667 4.58324 14.1667C6.66657 14.1667 7.96657 13.3333 7.4999 11.6667L5.04157 5.83333H7.64157C7.91657 6.54167 8.45824 7.08333 9.16657 7.35833V16.6667H1.66657V18.3333H18.3332V16.6667H10.8332V7.35C11.5416 7.08333 12.0832 6.54167 12.3499 5.83333H14.9582L12.4999 11.6667C12.1082 13.3333 13.3332 14.1667 15.4166 14.1667C17.4999 14.1667 18.7999 13.3333 18.3332 11.6667L15.8749 5.83333H17.4999V4.16667H12.3582C11.9999 3.16667 11.0582 2.5 9.9999 2.5ZM9.9999 4.16667C10.2209 4.16667 10.4329 4.25446 10.5892 4.41074C10.7454 4.56702 10.8332 4.77899 10.8332 5C10.8332 5.22101 10.7454 5.43298 10.5892 5.58926C10.4329 5.74554 10.2209 5.83333 9.9999 5.83333C9.77889 5.83333 9.56693 5.74554 9.41065 5.58926C9.25437 5.43298 9.16657 5.22101 9.16657 5C9.16657 4.77899 9.25437 4.56702 9.41065 4.41074C9.56693 4.25446 9.77889 4.16667 9.9999 4.16667ZM4.58324 8.54167L5.83324 11.6667H3.33324L4.58324 8.54167ZM15.4166 8.54167L16.6666 11.6667H14.1666L15.4166 8.54167Z" fill="currentColor"/>
    </svg>
  )
};

const sectionLabels = {
  'welcome': 'Welcome',
  'send-token': 'Send Token',
  'send-mobile-apps': 'Send Apps',
  'features': 'Features',
  'canton-wallet': 'Canton Wallet',
  'cusd-stablecoin': 'CUSD Stablecoin',
  'finance': 'Finance',
  'miscellaneous': 'Miscellaneous',
  'legal': 'Legal'
};

export default function SidebarNav({ treeData, isMobileOpen = false, onClose }) {
  const tree = treeData;
  const pathname = usePathname();

  // Desired order
  const desiredOrder = [
    'welcome',
    'send-token',
    'send-mobile-apps',
    'canton-wallet',
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

  const featureIds = tree['features'] ? tree['features'].map((item) => item.id) : [];
  const isActiveFeature = featureIds.some((id) => pathname === `/docs/${id}`);

  const [featuresExpanded, setFeaturesExpanded] = useState(isActiveFeature);
  const prevSectionRef = useRef(currentSection);
  const prevPathRef = useRef(pathname);

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
    if (pathname === prevPathRef.current) {
      return;
    }

    setFeaturesExpanded(isActiveFeature);
    prevPathRef.current = pathname;
  }, [pathname, isActiveFeature]);

  useEffect(() => {
    if (isActiveFeature) {
      setExpandedSections((prev) => (
        prev.includes('send-mobile-apps') ? prev : [...prev, 'send-mobile-apps']
      ));
    }
  }, [isActiveFeature]);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActiveSection = (section) => {
    if (section === 'welcome') {
      return pathname === '/' || pathname.startsWith('/docs/welcome');
    }
    if (section === 'send-mobile-apps') {
      return pathname.startsWith('/docs/send-mobile-apps') || pathname.startsWith('/docs/features');
    }
    return pathname.startsWith(`/docs/${section}`);
  };

  const isActiveLink = (itemId) => {
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
                  {tree[section].map((item) => (
                    <li key={item.id} className="sidebar-item">
                      <Link
                        href={`/docs/${item.id}`}
                        className={`sidebar-link ${isActiveLink(item.id) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}

                  {section === 'send-mobile-apps' && tree['features'] && (
                    <>
                      <li className="sidebar-item">
                        <button
                          className={`sidebar-nested-toggle ${featuresExpanded ? 'expanded' : ''}`}
                          onClick={() => setFeaturesExpanded((v) => !v)}
                          aria-expanded={featuresExpanded}
                          type="button"
                        >
                          Features
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
                      </li>
                      {featuresExpanded && (
                        tree['features'].map((item) => (
                          <li key={item.id} className="sidebar-item nested">
                            <Link
                              href={`/docs/${item.id}`}
                              className={`sidebar-link ${isActiveLink(item.id) ? 'active' : ''}`}
                              onClick={handleLinkClick}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))
                      )}
                    </>
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
