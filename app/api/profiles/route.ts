import { NextResponse } from 'next/server';
import { profileService } from '@/lib/services';

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInsert'
 *     responses:
 *       201:
 *         description: Profile created
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('GET /api/profiles - Fetching all profiles...');
    const profiles = await profileService.getAll();
    console.log(`GET /api/profiles - Found ${profiles?.length || 0} profiles`);
    return NextResponse.json(profiles || []);
  } catch (error: any) {
    console.error('GET /api/profiles - Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile = await profileService.create(body);
    return NextResponse.json(profile, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
