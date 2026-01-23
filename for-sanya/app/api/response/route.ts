import { NextRequest, NextResponse } from 'next/server';

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

    // Log the response (without database for now)
    console.log(`Proposal response: ${response}`, message ? `Message: ${message}` : '');

    return NextResponse.json({
      success: true,
      id: Date.now().toString(),
      message: 'Response recorded successfully!'
    });
  } catch (error) {
    console.error('Error processing response:', error);
    return NextResponse.json(
      { error: 'Failed to process response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return mock data
  return NextResponse.json({
    response: null,
    message: 'Frontend/Backend mode (no database)'
  });
}
