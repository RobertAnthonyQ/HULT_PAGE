import { NextResponse } from 'next/server';
import { dataStagingService } from '@/lib/services';

/**
 * @swagger
 * /api/data-staging:
 *   get:
 *     summary: Get all data staging entries
 *     tags: [DataStaging]
 *     responses:
 *       200:
 *         description: List of data staging entries
 *   post:
 *     summary: Create a new data staging entry
 *     tags: [DataStaging]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: 'string' }
 *     responses:
 *       201:
 *         description: Entry created
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('GET /api/data-staging - Fetching all entries...');
    const data = await dataStagingService.getAll();
    console.log(`GET /api/data-staging - Found ${data?.length || 0} entries`);
    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('GET /api/data-staging - Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await dataStagingService.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
