import Link from 'next/link';
import Image from 'next/image';
import WelcomeHero from './WelcomeHero';

const sectionCards = [
  { key: 'welcome', title: 'Welcome', href: '/docs/welcome' },
  { key: 'send-token', title: 'Send Token', href: '/docs/send-token' },
  { key: 'send-mobile-apps', title: 'Send Mobile Apps', href: '/docs/send-mobile-apps' },
  { key: 'canton-wallet', title: 'Canton Wallet', href: '/docs/canton-wallet' },
  { key: 'cusd-stablecoin', title: 'CUSD Stablecoin', href: '/docs/cusd-stablecoin' },
  { key: 'finance', title: 'Finance', href: '/docs/finance' },
  { key: 'miscellaneous', title: 'Miscellaneous', href: '/docs/miscellaneous' },
  { key: 'legal', title: 'Legal', href: '/docs/legal' },
];

function getInitials(title) {
  const parts = title.split(' ').filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export const navigationCards = sectionCards.map((section) => ({
  id: section.key,
  title: section.title,
  href: section.href,
  icon: (
    <span className="nav-card-initial" aria-hidden="true">
      {getInitials(section.title)}
    </span>
  )
}));

export default function WelcomePage() {
  return (
    <div className="main-content">
      <div className="welcome-header">
        <div className="welcome-title">Welcome</div>
      </div>

      <WelcomeHero />

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
    </div>
  );
}
