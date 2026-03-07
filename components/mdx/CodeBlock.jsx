'use client';

import dynamic from 'next/dynamic';

const Mermaid = dynamic(() => import('./Mermaid'), {
  ssr: false,
  loading: () => (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      textAlign: 'center',
      color: '#666'
    }}>
      Loading diagram...
    </div>
  )
});

export default function CodeBlock({ className, children, ...props }) {
  const language = className?.replace('language-', '') || '';

  if (language === 'mermaid') {
    const code = typeof children === 'string' ? children : String(children);
    return <Mermaid chart={code} />;
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
