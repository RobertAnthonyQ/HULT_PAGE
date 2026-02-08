import { NextResponse } from 'next/server';
import { teamService } from '@/lib/services';

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Team created
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('GET /api/teams - Fetching all teams...');
    const teams = await teamService.getAll();
    console.log(`GET /api/teams - Found ${teams?.length || 0} teams`);
    return NextResponse.json(teams || []);
  } catch (error: any) {
    console.error('GET /api/teams - Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const team = await teamService.create(body);
    return NextResponse.json(team, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
