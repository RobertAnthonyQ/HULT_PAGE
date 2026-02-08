import { NextResponse } from 'next/server';
import { submissionService } from '@/lib/services';

/**
 * @swagger
 * /api/submissions:
 *   get:
 *     summary: Get all submissions
 *     tags: [Submissions]
 *     responses:
 *       200:
 *         description: List of submissions
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Submission'
 *     responses:
 *       201:
 *         description: Submission created
 */
export async function GET() {
  try {
    const submissions = await submissionService.getAll();
    return NextResponse.json(submissions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submission = await submissionService.create(body);
    return NextResponse.json(submission, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
