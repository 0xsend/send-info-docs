import { redirect } from 'next/navigation';
import { getAllDocSlugs } from '../lib/md';

export default async function Home() {
  const slugs = await getAllDocSlugs();
  const preferred = slugs.find(s => s === 'welcome/send-overview') || slugs[0] || null;
  if (preferred) redirect(`/docs/${preferred}`);
  return null;
}
