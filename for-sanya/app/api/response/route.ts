import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ProposalResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { response, message } = body;

    if (!response || (response !== 'YES' && response !== 'NO')) {
      return NextResponse.json(
        { error: 'Invalid response' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('sanya-proposal');
    
    const proposalResponse: ProposalResponse = {
      name: 'Sanya Tripathi',
      response,
      message: message || '',
      timestamp: new Date(),
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    };

    const result = await db.collection('responses').insertOne(proposalResponse);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error saving response:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sanya-proposal');
    
    const responses = await db.collection('responses')
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    return NextResponse.json({
      response: responses[0] || null,
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response' },
      { status: 500 }
    );
  }
}
