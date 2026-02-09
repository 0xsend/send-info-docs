import { getSupabaseClient } from './supabase.js';
import { formatUnits } from 'viem';

export async function getRewardsCriteria() {
  const supabase = getSupabaseClient();
  // Defaults if env or query not available
  const defaults = { depositUsdc: '25', holdSend: '3000', distributionNumber: null };

  if (!supabase) return defaults;

  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('distributions')
    .select('number, hodler_min_balance::text, earn_min_balance::text, token_decimals, qualification_start, qualification_end')
    .lte('qualification_start', nowIso)
    .gte('qualification_end', nowIso)
    .order('qualification_end', { ascending: false })
    .limit(1).
    single();

  if (error) return defaults;
  if (!data) return defaults;

  const tokenDecimals = toInt(data.token_decimals, 18);
  const holdSend = formatUnits(BigInt(data.hodler_min_balance), tokenDecimals);
  const depositUsdc = formatUnits(BigInt(data.earn_min_balance), 6);
  return { depositUsdc, holdSend, distributionNumber: data.number ?? null };
}

export function formatNumberDisplay(val) {
  if (typeof val === 'number') return val.toLocaleString();
  const n = parseFloat(val);
  return Number.isFinite(n) ? n.toLocaleString() : String(val);
}

function toInt(v, fallback) {
  const n = typeof v === 'string' ? parseInt(v, 10) : (typeof v === 'number' ? v : NaN);
  return Number.isFinite(n) ? n : fallback;
}
