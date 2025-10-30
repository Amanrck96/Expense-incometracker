import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
  try {
    const greeting = await get<string>('greeting');
    // Fallback if key is missing in Edge Config
    return NextResponse.json(greeting ?? 'Hello from Edge Config');
  } catch (err) {
    return NextResponse.json({ error: 'Edge Config not available' }, { status: 500 });
  }
}
