import { getRewardsCriteria } from '../../../lib/rewardsCriteria.js';

export async function GET() {
  try {
    const { depositUsdc, holdSend, distributionNumber } = await getRewardsCriteria();
    return Response.json({ depositUsdc, holdSend, distributionNumber });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500 });
  }
}
