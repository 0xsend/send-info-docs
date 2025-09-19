import DocsLayout from '../../../components/DocsLayout';
import { getAllDocSlugs, readDocBySlug, renderMarkdownToHtml, extractTitle } from '../../../lib/md';

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((s) => ({ slug: s.split('/') }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const slugPath = (p?.slug || []).join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return { title: 'Not found' };
  const title = extractTitle(doc.content, doc.data) || slugPath.split('/').slice(-1)[0];
  return { title };
}

function formatContentForFigmaDesign(html, slugPath) {
  // For the Send Overview page, format it to match the Figma design
  if (slugPath === 'welcome/send-overview') {
    return `
      <div class="content-section">
        <h1 class="section-title">Send: Global Money, Private by Design</h1>
        <div class="section-content">Send is a fintech platform that lets anyone, anywhere send, save, and earn on their money privately using just a smartphone. Built on the Canton Network, we combine global access with privacy-first blockchain technology.</div>
      </div>

      <div class="content-section">
        <h2 class="section-title">What we Do</h2>
        <div class="section-content">Input: A smartphone and internet connection.
Output: Instant cross-border payments, stablecoin savings, and access to financial services.
How: Canton's privacy-preserving blockchain keeps your transactions confidential while connecting you to the global economy.</div>
      </div>

      <div class="content-section">
        <h2 class="section-title">Why It Matters?</h2>
        <div class="section-content">1.4 billion people are excluded from traditional banking due to high fees, complex rules, or lack of access. Send removes these barriers.
Privacy is non-negotiable. Unlike public blockchains, Canton hides transaction details by default, protecting you from surveillance while meeting regulatory needs.</div>
      </div>

      <div class="content-section">
        <h2 class="section-title">What you Get</h2>
        <div class="section-content">Send Mobile App: Send money across borders instantly, save in stablecoins, and access DeFi—no bank account needed.
Canton Wallet: Secure, private wallet for advanced financial tools.
CUSD Stablecoin: A privacy-first currency for everyday and enterprise use.</div>
      </div>

      <div class="content-section">
        <h2 class="section-title">Why We're Different</h2>
        <div class="section-content">Traditional finance forces a choice: access or privacy. Send delivers both. Whether you're an individual seeking financial freedom or a business needing confidential transactions, Send works for you.</div>
      </div>
    `;
  }

  // For other pages, wrap in content sections
  return html.replace(/<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g, (match, level, attrs, content) => {
    const nextContentRegex = new RegExp(`${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(.*?)(?=<h[1-6]|$)`, 's');
    return `<div class="content-section"><h${level} class="section-title"${attrs}>${content}</h${level}>`;
  }).replace(/<p>/g, '<div class="section-content">').replace(/<\/p>/g, '</div></div>');
}

export default async function DocPage({ params }) {
  const p = await params;
  const slugPath = (p?.slug || []).join('/');
  const doc = readDocBySlug(slugPath);
  if (!doc) return <div className="not-found-message">Not found</div>;
  const html = await renderMarkdownToHtml(doc.content);
  const formattedHtml = formatContentForFigmaDesign(html, slugPath);

  return (
    <DocsLayout content={formattedHtml}>
      <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
    </DocsLayout>
  );
}
