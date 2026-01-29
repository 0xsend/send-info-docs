import DocsLayout from '../../../components/DocsLayout';
import SendAppsPage from '../../../components/SendAppsPage';
import { getAllDocSlugs, readDocBySlug, renderDocToComponent, extractTitle, buildSidebarTree } from '../../../lib/md';

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  const docs = slugs.map((s) => ({ slug: s.split('/') }));
  const sections = Array.from(new Set(slugs.map((s) => s.split('/')[0])));
  const sectionParams = sections.map((section) => ({ slug: [section] }));
  return [...docs, ...sectionParams];
}

export async function generateMetadata({ params }) {
  const p = await params;
  const segments = p?.slug || [];
  const sectionMeta = {
    'welcome': {
      image: '/img/welcome-opengraph.png',
      title: 'Send Info Docs – Your guide to the Send ecosystem',
      description: 'Start with Send’s mission, vision, team, and key storylines.'
    },
    'send-token': {
      title: 'Send Token Info Docs – Native Token of the Send Ecosystem',
      description: 'Dig into issuance, supply, and utility for the SEND token.'
    },
    'send-mobile-apps': {
      image: '/img/sendmobileapps-opengraph.png',
      title: 'Send App Info Docs – Your global wallet',
      description: 'Learn how the Send App delivers fast, private peer-to-peer transfers.'
    },
    'send-safe': {
      title: 'Send Canton Wallet Info Docs – Secure account access for Canton',
      description: 'Understand passkeys, privacy, and workflows for the Send Canton Wallet.'
    },
    'cusd-stablecoin': {
      image: '/img/cusd-opengraph.png',
      title: 'CUSD Info Docs – Privacy-Native Stablecoin',
      description: 'See how CUSD keeps balances private while remaining fully collateralized.'
    },
    'finance': {
      title: 'Send Finance Info Docs – Treasury & Metrics',
      description: 'Review treasury balances, revenue streams, and financial operations.'
    },
    'miscellaneous': {
      title: 'Send Info Docs – Additional Resources',
      description: 'Browse roadmaps, metrics, brand assets, and other helpful links.'
    },
    'legal': {
      title: 'Send Info Docs – Legal & Policies',
      description: 'Access terms, disclosures, and other legal documentation for Send.'
    }
  };
  if (segments.length === 1) {
    const section = segments[0];
    const sectionLabels = {
      'welcome': 'Welcome',
      'send-token': 'Send Token',
      'send-mobile-apps': 'Send App',
      'send-safe': 'Send Canton Wallet',
      'cusd-stablecoin': 'CUSD Stablecoin',
      'finance': 'Finance',
      'miscellaneous': 'Miscellaneous',
      'legal': 'Legal'
    };
    const title = sectionLabels[section] || section.replace(/-/g, ' ');
    const config = sectionMeta[section];
    const meta = { title };
    if (config) {
      meta.openGraph = {
        title: config.title || title,
      };
      if (config.image) {
        meta.openGraph.images = [{ url: config.image }];
      }
      if (config.description) {
        meta.description = config.description;
        meta.openGraph.description = config.description;
      }
    }
    return meta;
  }

  const slugPath = segments.join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return { title: 'Not found' };
  const title = extractTitle(doc.content, doc.data) || slugPath.split('/').slice(-1)[0];
  const section = segments[0];
  const config = sectionMeta[section];
  const meta = { title };
  if (config) {
    meta.openGraph = {
      title: config.title || title,
    };
    if (config.image) {
      meta.openGraph.images = [{ url: config.image }];
    }
    if (config.description) {
      meta.description = config.description;
      meta.openGraph.description = config.description;
    }
  }
  return meta;
}

export default async function DocPage({ params }) {
  const p = await params;
  const sidebarTree = buildSidebarTree();
  const segments = p?.slug || [];

  if (segments.length === 1) {
    const section = segments[0];
    const sectionLabels = {
      'welcome': 'Welcome',
      'send-token': 'Send Token',
      'send-mobile-apps': 'Send App',
      'send-safe': 'Send Canton Wallet',
      'cusd-stablecoin': 'CUSD Stablecoin',
      'finance': 'Finance',
      'miscellaneous': 'Miscellaneous',
      'legal': 'Legal'
    };
    const label = sectionLabels[section] || section.replace(/-/g, ' ');

    // Show custom page for send-mobile-apps section
    if (section === 'send-mobile-apps') {
      return (
        <DocsLayout treeData={sidebarTree} headings={[]}>
          <SendAppsPage />
        </DocsLayout>
      );
    }

    return (
      <DocsLayout treeData={sidebarTree} headings={[]} />
    );
  }

  const slugPath = segments.join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) {
    return (
      <DocsLayout treeData={sidebarTree} headings={[]}>
        <div className="not-found-message">Not found</div>
      </DocsLayout>
    );
  }
  const rendered = await renderDocToComponent(slugPath);
  if (!rendered) {
    return (
      <DocsLayout treeData={sidebarTree} headings={[]}>
        <div className="not-found-message">Not found</div>
      </DocsLayout>
    );
  }
  const { content, headings } = rendered;

  return (
    <DocsLayout treeData={sidebarTree} headings={headings}>
      <article className="markdown">
        {content}
      </article>
    </DocsLayout>
  );
}
