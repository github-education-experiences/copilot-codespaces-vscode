import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { VisitLog } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;

    const client = await clientPromise;
    const db = client.db('sanya-proposal');
    
    const visitLog: VisitLog = {
      page: page || 'home',
      timestamp: new Date(),
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    };

    await db.collection('visits').insertOne(visitLog);

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
  try {
    const client = await clientPromise;
    const db = client.db('sanya-proposal');
    
    const totalVisits = await db.collection('visits').countDocuments();
    const uniqueVisits = await db.collection('visits').distinct('ipAddress');

    return NextResponse.json({
      totalVisits,
      uniqueVisits: uniqueVisits.length,
    });
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visits' },
      { status: 500 }
    );
  }
}
