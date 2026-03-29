import { NextRequest, NextResponse } from 'next/server';
import db, { initDb } from '@/lib/db';

let initialized = false;

async function ensureDb() {
  if (!initialized) {
    await initDb();
    initialized = true;
  }
}

// GET /api/reviews?bottleId=xxx
export async function GET(request: NextRequest) {
  await ensureDb();

  const bottleId = request.nextUrl.searchParams.get('bottleId');
  if (!bottleId) {
    return NextResponse.json({ error: 'bottleId is required' }, { status: 400 });
  }

  const result = await db.execute({
    sql: 'SELECT * FROM reviews WHERE bottle_id = ? ORDER BY created_at DESC',
    args: [bottleId],
  });

  return NextResponse.json({ reviews: result.rows });
}

// POST /api/reviews
export async function POST(request: NextRequest) {
  await ensureDb();

  const body = await request.json();
  const { bottleId, authorName, rating, comment } = body;

  if (!bottleId || !authorName?.trim() || !rating || !comment?.trim()) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
  }

  if (authorName.trim().length > 50) {
    return NextResponse.json({ error: 'Name too long' }, { status: 400 });
  }

  if (comment.trim().length > 1000) {
    return NextResponse.json({ error: 'Comment too long' }, { status: 400 });
  }

  const result = await db.execute({
    sql: 'INSERT INTO reviews (bottle_id, author_name, rating, comment) VALUES (?, ?, ?, ?)',
    args: [bottleId, authorName.trim(), rating, comment.trim()],
  });

  return NextResponse.json({ id: Number(result.lastInsertRowid) }, { status: 201 });
}
