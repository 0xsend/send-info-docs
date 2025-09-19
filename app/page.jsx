import WelcomePage from '../components/WelcomePage';
import SidebarNav from '../components/SidebarNav';
import SiteHeader from '../components/SiteHeader';

export default function HomePage() {
  return (
    <div className="docs-shell">
      <SidebarNav />
      <div className="content-panel">
        <SiteHeader />
        <WelcomePage />
      </div>
    </div>
  );
}
