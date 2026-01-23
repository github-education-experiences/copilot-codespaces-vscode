import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;

    // Log the visit (without database for now)
    console.log(`Visit logged: ${page || 'home'}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json(
      { error: 'Failed to log visit' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return mock data
  return NextResponse.json({
    totalVisits: 0,
    uniqueVisits: 0,
  });
}
