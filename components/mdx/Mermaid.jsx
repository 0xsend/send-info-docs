'use client';

import { useEffect, useRef, useState, useId } from 'react';

export default function Mermaid({ chart }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);
  const uniqueId = useId().replace(/:/g, '-');

  useEffect(() => {
    if (!chart || typeof window === 'undefined') return;

    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'inherit'
        });

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${uniqueId}`,
          chart.trim()
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to render diagram');
          setSvg('');
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId]);

  if (error) {
    return (
      <div className="mermaid-error" style={{
        padding: '1rem',
        backgroundColor: '#fee',
        border: '1px solid #c00',
        borderRadius: '4px',
        color: '#c00',
        fontFamily: 'monospace',
        fontSize: '0.875rem'
      }}>
        <strong>Mermaid Error:</strong> {error}
        <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="mermaid-loading" style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        textAlign: 'center',
        color: '#666'
      }}>
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram"
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1.5rem 0',
        overflow: 'auto'
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
