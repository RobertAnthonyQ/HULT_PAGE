import { NextResponse } from 'next/server';
import { profileService } from '@/lib/services';

/**
 * @swagger
 * /api/profiles/summary:
 *   get:
 *     summary: Get a summary of all profiles (name, career, linkedin)
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of profile summaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   first_name: { type: 'string' }
 *                   last_name: { type: 'string' }
 *                   career: { type: 'string' }
 *                   linkedin_url: { type: 'string' }
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('GET /api/profiles/summary - Fetching summaries...');
    const profiles = await profileService.getSummary();
    console.log(`GET /api/profiles/summary - Found ${profiles?.length || 0} summaries`);
    return NextResponse.json(profiles || []);
  } catch (error: any) {
    console.error('GET /api/profiles/summary - Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
