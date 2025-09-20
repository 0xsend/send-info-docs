import DocsLayout from '../../../components/DocsLayout';
import { getAllDocSlugs, readDocBySlug, renderMarkdownToHtml, extractTitle, buildSidebarTree } from '../../../lib/md';

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
      title: 'Send Token – Native Token of the Send Ecosystem',
      description: 'Dig into issuance, supply, and utility for the SEND token.'
    },
    'send-mobile-apps': {
      image: '/img/sendmobileapps-opengraph.png',
      title: 'Send Apps – Your global wallet',
      description: 'Learn how Send Apps deliver fast, private peer-to-peer transfers.'
    },
    'canton-wallet': {
      title: 'Canton Wallet – Secure account access for Canton',
      description: 'Understand passkeys, privacy, and workflows for the Canton Wallet.'
    },
    'cusd-stablecoin': {
      image: '/img/cusd-opengraph.png',
      title: 'CUSD – Privacy-Native Stablecoin',
      description: 'See how CUSD keeps balances private while remaining fully collateralized.'
    },
    'finance': {
      title: 'Send Finance – Treasury & Metrics',
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
      'send-mobile-apps': 'Send Apps',
      'canton-wallet': 'Canton Wallet',
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
      'send-mobile-apps': 'Send Apps',
      'canton-wallet': 'Canton Wallet',
      'cusd-stablecoin': 'CUSD Stablecoin',
      'finance': 'Finance',
      'miscellaneous': 'Miscellaneous',
      'legal': 'Legal'
    };
    const label = sectionLabels[section] || section.replace(/-/g, ' ');
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
  const { html, headings } = await renderMarkdownToHtml(doc.content);

  return (
    <DocsLayout treeData={sidebarTree} headings={headings}>
      <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </DocsLayout>
  );
}
