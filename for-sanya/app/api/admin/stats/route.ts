import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db('sanya-proposal');
    
    // Get all responses
    const responses = await db.collection('responses')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Get visit statistics
    const totalVisits = await db.collection('visits').countDocuments();
    const uniqueIPs = await db.collection('visits').distinct('ipAddress');

    // Get page-wise visits
    const pageVisits = await db.collection('visits').aggregate([
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    return NextResponse.json({
      responses,
      totalVisits,
      uniqueVisits: uniqueIPs.length,
      pageVisits,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
