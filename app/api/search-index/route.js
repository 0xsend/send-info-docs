import { buildSearchIndex } from '../../../lib/search.js';
import { NextResponse } from 'next/server';

// Cache the search index in memory during development
let cachedIndex = null;

export async function GET() {
  try {
    // Build or use cached index
    if (!cachedIndex || process.env.NODE_ENV === 'development') {
      cachedIndex = buildSearchIndex();
    }

    return NextResponse.json({
      documents: cachedIndex,
      count: cachedIndex.length
    });
  } catch (error) {
    console.error('Error building search index:', error);
    return NextResponse.json({
      error: 'Failed to build search index',
      documents: [],
      count: 0
    }, { status: 500 });
  }
}
