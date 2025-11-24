'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import FlexSearch from 'flexsearch';

export default function SearchDialog({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState(null);
  const [documents, setDocuments] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  // Mount check for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load search index when dialog opens
  useEffect(() => {
    if (isOpen && !searchIndex) {
      setLoading(true);
      fetch('/api/search-index')
        .then(res => res.json())
        .then(data => {
          setDocuments(data.documents || []);

          // Create FlexSearch index
          const index = new FlexSearch.Document({
            document: {
              id: 'id',
              index: ['title', 'content', 'section'],
              store: ['title', 'section', 'url', 'excerpt']
            },
            tokenize: 'forward',
            cache: true
          });

          // Add documents to index
          data.documents.forEach(doc => {
            index.add(doc);
          });

          setSearchIndex(index);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to load search index:', error);
          setLoading(false);
        });
    }
  }, [isOpen, searchIndex]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Perform search
  useEffect(() => {
    if (!searchIndex || !query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults = searchIndex.search(query, {
      limit: 10,
      enrich: true
    });

    // Flatten results from different fields
    const flatResults = [];
    const seen = new Set();

    searchResults.forEach(fieldResult => {
      fieldResult.result.forEach(item => {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          flatResults.push(item.doc);
        }
      });
    });

    setResults(flatResults);
    setSelectedIndex(0);
  }, [query, searchIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const result = results[selectedIndex];
      if (result) {
        router.push(result.url);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [results, selectedIndex, router, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle result click
  const handleResultClick = (url) => {
    router.push(url);
    onClose();
  };

  if (!isOpen || !mounted) return null;

  const dialogContent = (
    <div className="search-dialog-backdrop" onClick={handleBackdropClick}>
      <div className="search-dialog">
        <div className="search-dialog-header">
          <input
            ref={inputRef}
            type="text"
            className="search-dialog-input"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <kbd className="search-dialog-kbd">ESC</kbd>
        </div>

        <div className="search-dialog-results">
          {loading && (
            <div className="search-dialog-loading">
              Loading search index...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="search-dialog-empty">
              No results found for "{query}"
            </div>
          )}

          {!loading && !query && (
            <div className="search-dialog-hint">
              Start typing to search documentation
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="search-dialog-list">
              {results.map((result, index) => (
                <li
                  key={result.url}
                  className={`search-dialog-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleResultClick(result.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="search-dialog-item-header">
                    <span className="search-dialog-item-title">{result.title}</span>
                    <span className="search-dialog-item-section">{result.section}</span>
                  </div>
                  <p className="search-dialog-item-excerpt">{result.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-dialog-footer">
          <div className="search-dialog-footer-hint">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>to navigate</span>
            <kbd>↵</kbd>
            <span>to select</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level, escaping sidebar's stacking context
  return createPortal(dialogContent, document.body);
}
